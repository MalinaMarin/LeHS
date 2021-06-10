const http = require('http')
const fs = require('fs')
const https = require('https');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const localStorage = require('node-localstorage');
//var gitdata = require('./services/user.service');
//var access_token;
//const cookieSession =require('cookie-session');
require('dotenv').config()
require('./helpers/init_mongodb')
const fetch = require('node-fetch');
// const google = require('googleapis');
// var OAuth2 = google.auth.OAuth2;
// const ClientId = "YourGoogleAppClientId";
// const ClientSecret = "YourGoogleAppClientSecret";
// const RedirectionUrl = "http://localhost:5000/oauthCallback";

//import fetch from 'node-fetch';
// const { verifyAccessToken } = require('./helpers/jwt_helper')
// require('./helpers/init_redis')

const app_id  = process.env.GITHUB_APP_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const client_id = process.env.GITHUB_CLIENT_ID;
const cookie_secret = process.env.COOKIE_SECRET;
const hostname = 'localhost';
const registerPath = 'register';
var gitdata;
// const AuthRoute = require('./routes/user_credentials');
// const AuthController = require('./controllers/Auth.Controller');

const { getAllUserCredentials, createUserCredentials} = require('./controllers/Try.Controller')
const  {createUser, registerGithubUser} = require('./controllers/user.controller');
const { JwtRegister, JwtLogin, JwtLogout} = require('./controllers/AuthJwt.Controller');
const{getAccessToken, fetchGitHubUser} = require('./services/github.service');
const { register, login } = require('./controllers/Auth.Controller');
const{getAllPractice,submitAnswer} = require('./controllers/practice.controller.js');
const{getLeaderboard} = require('./controllers/leaderboard.controller.js');
const{callbackGithub, callbackGithubLogin, pass} = require('./helpers/githelper');
const { getLevels } = require('./controllers/map.controller');
const { getLevel, submitLevel, clickOnHint } = require('./controllers/play.controller');


// cookieSession({
//     secret: cookie_secret
// });

const server = http.createServer( async (req, res) => {
    console.log(req.url);
    var newurl = req.url;
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers','*');

     if(newurl.startsWith('/register/github/callback')){
        let baseURI = url.parse(req.url, true);
        let path = baseURI.pathname.split('/');
        let queryParameter = baseURI.query;
        const codee = queryParameter.code;
        console.log("tHE CODE serverside" + codee);
         callbackGithub(res, codee);
    }
    else

    if(newurl.startsWith('/login/github/callback')){
        let baseURI = url.parse(req.url, true);
        let path = baseURI.pathname.split('/');
        let queryParameter = baseURI.query;
        const codee = queryParameter.code;
        console.log("tHE CODE serverside" + codee);
         callbackGithubLogin(res, codee);
    } 
    else

    if(newurl === '/register/github'){
       // console.log(client_id);
       // console.log(client_secret);
        
       const redirect_uri2 = 'http://localhost:5000/register/github/callback';
       var urll = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri2}`;
       res.writeHead(302,  {Location: `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri2}` })
       res.end();
   }

    else

    if(newurl === '/login/github'){
        const redirect_uri = 'http://localhost:5000/login/github/callback';
        var urll = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
        res.writeHead(302,  {Location: `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}` })
        res.end();
    } 
    else

    if(newurl === '/mainpage'){
     res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Mainpage Route.' }))
    }

    else

    if(newurl === '/register'){
        JwtRegister(req, res);
       //register(req, res);
       //createUser(req, res);
    }
     else if(newurl === '/get/leaderboard' && req.method === 'GET'){
        getLeaderboard(req,res);
    }
    else if(newurl === '/all/practice' && req.method === 'GET'){
        getAllPractice(req,res);
    }
    else if(newurl === '/all/levels' && req.method === 'GET'){
        getLevels(req,res);
    }


     else if(newurl === '/practice/submit' && req.method === 'POST'){
        submitAnswer(req,res);
    }
    else if(newurl === '/play/submit' && req.method === 'PUT'){
        submitLevel(req,res);
    }
    else if(newurl === '/play/hint' && req.method === 'PUT'){
        clickOnHint(req,res);
    }
    else if(newurl.startsWith('/get/level')){
        console.log(newurl);
        let queryParams = newurl.split('?');
        let path = queryParams[1];
        let value = path.split('=');
        const level_id = decodeURIComponent(value[1]);
        console.log(level_id);
         getLevel(res, level_id);
    } 
    else
    if(newurl === '/logout'){
        JwtLogout(req, res);
    }
      
    else if(newurl === '/success'){
        registerGithubUser(req, res);
    
    }

    else if(newurl === '/loginn'){
        JwtLogin(req, res);
    }
     else {
       // res.writeHead(404, { 'Content-Type': 'application/json' })
        //res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})





// const {getPostData} = require('../helpers/utils_fct');

// async function getAllUserCredentials(req, res) {
//     try {
//         const credentials = await UserCredentials.findAll()

//         res.writeHead(200, { 'Content-Type': 'application/json' })
//         res.end(JSON.stringify(credentials))
//     } catch (error) {
//         console.log(error)
//     }
// }


// const server = http.createServer(async function (req, res) {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/html')
//     let parsedURL = url.parse(req.url, true);
//     let requestPath = parsedURL.pathname;
//     requestPath = requestPath.replace(/^\/+|\/+$/g, "");
//     let queryString = parsedURL.query;
//     let headers = req.headers;
//     let method = req.method;
//     let data = {
//         requestPath: requestPath,
//         headers: headers,
//         method: method,
//         queryString: queryString,
//         buffer: '',
//         request: req
//     }

//     if (requestPath.startsWith(registerPath)) {
//         requestPath = requestPath.substr(registerPath.length + 1);
//         if (data.method === 'POST') {
//             data.buffer = await getData(req);
//             AuthController.register(req, res)
//             return;
//         }
//     }
// })

function getData(req) {
    return new Promise(function(rez, rej) {
        let buffer = '';
        req.on('data', chunk => {
            buffer += chunk.toString(); 
            console.log(chunk.toString())
        });
        req.on('end', () => {
            rez(buffer);
        });
    })
}



    // const routeMap = {
        
	// 	'login': 'login.html',
		// 'about': 'about.html',
		// 'services': 'index.html'
	// }
    //render(res, routeMap[req.url.slice(1)]);
// })

// function render(res, htmlFile) {
//     fs.stat(`./${htmlFile}`,  (err, stats) => {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/html');

//         if(stats) {
//             fs.createReadStream(htmlFile).pipe(res);
//         } else {
//             res.statusCode = 404;
//             res.end('Sorry, page not found');
//         }
//     });
// }

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!!!`))

//exports.access_token = access_token;