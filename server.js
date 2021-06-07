const http = require('http')
const fs = require('fs')
const https = require('https');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
//const cookieSession =require('cookie-session');
require('dotenv').config()
require('./helpers/init_mongodb')
const fetch = require('node-fetch');
//import fetch from 'node-fetch';
// const { verifyAccessToken } = require('./helpers/jwt_helper')
// require('./helpers/init_redis')

const app_id  = process.env.GITHUB_APP_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const client_id = process.env.GITHUB_CLIENT_ID;
const cookie_secret = process.env.COOKIE_SECRET;
const hostname = 'localhost';
const registerPath = 'register';

// const AuthRoute = require('./routes/user_credentials');
// const AuthController = require('./controllers/Auth.Controller');

 
const { getAllUserCredentials, createUserCredentials} = require('./controllers/Try.Controller')
const  {createUser} = require('./controllers/user.controller');
const { string } = require('joi');
const { match } = require('assert');

const{getAccessToken, fetchGitHubUser} = require('./services/github.service');

// cookieSession({
//     secret: cookie_secret
// });


const server = http.createServer(async (req, res) => {
    console.log(req.url);
    var newurl = req.url;


    //var check = new RegExp("^login/github\\/callback(?:$|/)");
    //console.log(check);
   //var newurl = req.url.replace('%0A', "");
   // console.log(newurl);
    // if(req.method === 'GET') {
    //     //res.writeHead(req.url);
    //     getAllUserCredentials(req, res);
    //     var urll = req.url;
    //     var x = encodeURIComponent(req.url);
    //     console.log(x);
    //     const urlData = url.parse(req.url, true);
    //     res.end(JSON.stringify({urldata: newurl}));
    // } 
    // else if(newurl === '/register' && req.method === 'POST') {
    //     createUser(req, res)
    // }


     if(newurl === '/login/github'){
        // console.log(client_id);
        // console.log(client_secret);
         
        const redirect_uri = 'http://localhost:5000/login/github/callback';
        var urll = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
        res.writeHead(302,  {Location: `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}` })
        res.end();
    }

    else if(newurl === '/mainpage'){
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Mainpage!!!' }))
    } 

    else if(newurl.startsWith('/login/github/callback')){
        console.log("url gasit: " + newurl);
       // var url_parts = url.parse(req.url, true);
        //var query = url_parts.query;

        let baseURI = url.parse(req.url, true);
        let path = baseURI.pathname.split('/');
        let queryParameter = baseURI.query;
        const codee = queryParameter.code;
        console.log("tHE CODE " + codee);

  const access_token = await getAccessToken(codee);
  const user = await fetchGitHubUser(access_token);
  if (user) {
    //req.session.access_token = access_token;
    //req.session.githubId = user.id;
    res.writeHead(302,  {Location: `http://localhost:5000/mainpage` })
    res.end();

    
  } else{
    res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Login did not succeed' }))
  }
}
   
  
  else if(newurl === '/logout'){
        if(req.session) req.session = null;
        res.writeHead(302,  {Location: `http://localhost:5000` })
        res.end();

    } else {
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
