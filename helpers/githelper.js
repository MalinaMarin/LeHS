const{getAccessToken, fetchGitHubUser} = require('../services/github.service');
const {registerGithubUser} = require('../controllers/user.controller');
const {parseCookies} = require('../helpers/utils_fct');
module.exports =
{
callbackGithub: async(res, codee) =>{

console.log("tHE CODE controller side" + codee);
var access_token = await getAccessToken(codee);

// localStorage.setItem("token", access_token)
console.log("githelper token " + access_token);
const user =  await fetchGitHubUser(access_token);
console.log(user);
if (user) {
res.writeHead(302, {
    'Location': 'http://localhost:5000/success',
    'Set-Cookie': 'gittoken=' + access_token + "; path=/success",
    //'Location': '/loginn'
    'Content-Type': 'text/plain'
  });   
  return res.end();


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