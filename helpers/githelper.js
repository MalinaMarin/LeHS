const{getAccessToken, fetchGitHubUser} = require('../services/github.service');
const {UserCredentials} = require("../models/user_credentials.js");


module.exports =
{
callbackGithub: async(codee, res) =>{

console.log("tHE CODE controller side" + codee);
var access_token = await getAccessToken(codee);

// localStorage.setItem("token", access_token)
console.log("githelper token " + access_token);
const user =  await fetchGitHubUser(access_token);
console.log("hola " + user.login);
if (user) {
res.writeHead(302, {
    'Location': 'http://localhost:5000/success',
    'Set-Cookie': 'gittoken=' + access_token + "; path=/success",
    //'Location': '/loginn'
    //'Content-Type': 'text/plain'
    'Content-Type': 'application/json' 
  });   
  return res.end(JSON.stringify({"login" : user.login}));


// res.writeHead(302, {
//     'Location': 'http://localhost:5000/mainpage',
//     'Set-Cookie': 'token=' + access_token + '; Path=/'
//   });

}
else{
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end("An error occurred...")
}

}

}