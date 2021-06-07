const http = require('http')
const fs = require('fs')
const https = require('https');
const url = require('url');
const path = require('path');
require('dotenv').config()
require('./helpers/init_mongodb')

// const { verifyAccessToken } = require('./helpers/jwt_helper')
// require('./helpers/init_redis')


const hostname = 'localhost';
const registerPath = 'register';

// const AuthRoute = require('./routes/user_credentials');
// const AuthController = require('./controllers/Auth.Controller');

 
const { getAllUserCredentials, createUserCredentials} = require('./controllers/Try.Controller')
const  {createUser} = require('./controllers/user.controller')

const server = http.createServer((req, res) => {
    if(req.method === 'GET') {
        getAllUserCredentials(req, res)
    } else if(req.method === 'POST') {
        createUser(req, res)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
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
