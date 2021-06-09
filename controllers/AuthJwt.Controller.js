const {verify, JsonWebTokenError} = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs');
const { getPostData } = require('../helpers/utils_fct');
const { create, createGithub } = require("../services/user.service.js")
const {User, UserCredentials} = require('../models/user_credentials');
const {createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken} = require('../services/token.service');
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
    // Grab the email, password from the request body
  //const { email, password } = req.body;
  let body = await getPostData(req)
  body = JSON.parse(body)

  
    // 1. Find user in array. If not exist send error
    //  OR make a DB call using your favorite client library
    //const user = fakeDB.find(user => user.email === email);
    const user = await UserCredentials.findOne({ username: body.username }).exec();
    
    // 2. If unable to find the user throw the error
    if (!user){
     res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end("User does not exist!")
    }
   // if (!user) throw createError.NotFound('User not registered')

    // Compare encrypted password and see if it checks out. 
    // Send error if not valid
    // NOTE: We are using the compare function from bcryptjs library
    
    const valid = await compare(body.password, user.password);

    if (!valid){
        res.writeHead(500, { 'Content-Type': 'application/json' })
       return res.end("Password is not correct!")
       }
    
    // 3. Create Refresh- and Accesstoken using our helper method which
    //    in turn uses the sign() method of the jsonwebtoken package.
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    
    // 4. Store Refreshtoken with user in "db"
    user.refreshtoken = refreshtoken;
    
    // 5. Send token. Refreshtoken as a cookie and 
    //    accesstoken as a regular response.  We will take a look at
    //    the two methods shortly.
    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken);
  } catch (err) {
   console.log(err);
  }
}

}
