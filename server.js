const http = require('http')
const fs = require('fs')
require('dotenv').config()
require('./helpers/init_mongodb')

const { verifyAccessToken } = require('./helpers/jwt_helper')
require('./helpers/init_redis')

const AuthRoute = require('./routes/user_credentials')

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    // const routeMap = {
        
	// 	'login': 'login.html',
		// 'about': 'about.html',
		// 'services': 'index.html'
	// }
     res.write('<h1>Hello</h1>')
     res.end()
    //render(res, routeMap[req.url.slice(1)]);
})

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