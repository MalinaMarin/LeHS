const {verify, JsonWebTokenError} = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs');
const { getPostData, parseCookies } = require('../helpers/utils_fct');
const { create, createGithub } = require("../services/user.service.js")
const {User, UserCredentials} = require('../models/user_credentials');
const {clearRefreshToken, createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken} = require('../services/token.service');
module.exports =
{

JwtRegister: async (req, res) => {
try {
    let body = await getPostData(req)
    body = JSON.parse(body)

   // const doesExist = await User.findOne({ email: body.email })

    //if (doesExist){
    //res.writeHead(500, { 'Content-Type': 'application/json' })
    //  return res.end(`${result.email} has already been registered`)
   // }

    if (body.password != body.confirmPassword) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        return res.end("passwords don't match") 
        // return res.status(500).json({
        //     success: 0,
        //     message: "passwords don't match"
        // });
    }
    //const {email, password} = req.body;
    
        //let user = fakeDB.find(user => user.email === email);
        //console.log(user);
        //if (user) throw new Error('User already exist');
        body.password = await hash(body.password,10);
        //console.log(hashPassword);

        create(body, (err, result) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                return res.end("An error occurred...") 
                // return res.status(500).json({
                //     success: 0,
                //     message: "Database connection errror"
                // });
            }
            
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(result))  
            // return res.status(200).json({
            //     success: 1,
            //     message: "user successfully created"
            // });
        });
  
    } catch(err) {
     console.log(err);
      
    }
  }
  ,

  JwtLogin:   async (req, res) => 
  {
    try {
  let body = await getPostData(req)
  body = JSON.parse(body)

  
    const user = await UserCredentials.findOne({ username: body.username }).exec();
  
    if (!user){
     res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end("User does not exist!")
    }
   // if (!user) throw createError.NotFound('User not registered')

    
    const valid = await compare(body.password, user.password);

    if (!valid){
        res.writeHead(500, { 'Content-Type': 'application/json' })
       return res.end("Password is not correct!")
       }
    

    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    
    user.refreshtoken = refreshtoken;
    console.log(refreshtoken);
    // Send token. Refreshtoken as a cookie and 
    //accesstoken as a regular response.
    sendRefreshToken(res, refreshtoken);
    //const access_token = sendAccessToken(res, req, accesstoken);
    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({user: user, access_token: accesstoken}));
  } catch (err) {
   console.log(err);
  }
}
,

JwtLogout: (_req, res) => 
  {
      try {
       const clearedToken = clearRefreshToken();
       sendRefreshToken(res, clearedToken);
      res.end("logged out");
  
} catch (err) {
   console.log(err);
  }
}
,

JwtRefresh : async (req, res) => {

  //console.log("try " + req.headers.cookie);
       // const token = req.headers.cookie;
        const token = parseCookies(req).refreshtoken;
        console.log("token is" + token);
        //console.log("token is " + token);
        if (!token){
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({accesstoken: ''})) 
        }
        
         let payload = null;
         try {
           payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
         } catch (err) {
         
           res.writeHead(201, { 'Content-Type': 'application/json' })
             return res.end(JSON.stringify({accesstoken: ''})) 
       }
    
        const user = await UserCredentials.findOne({id:payload.userId});
        

        if (!user){
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({accesstoken: ''})) 
        }
        
        const accesstoken = createAccessToken(user.id);
        const refreshtoken = createRefreshToken(user.id);
        
      
        user.refreshtoken = refreshtoken;
       
        sendRefreshToken(res, refreshtoken);
        
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({accesstoken: accesstoken}))  
      }
}

