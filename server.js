const http = require('http')
const fs = require('fs')
const https = require('https');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const localStorage = require('node-localstorage');
const {UserCredentials} = require('./models/user_credentials');
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
const { isAdmin, getUserById, getAllUsers, findAndUpdateUser, deleteUser, getAllData, findAndUpdateData } = require('./services/admin.service');
const {getPostData} = require('./helpers/utils_fct');
const { getUserDataById } = require('./services/user.service');

const server = http.createServer( async (req, res) => {
    console.log(req.url);
    var newurl = req.url;
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers','*');


    if(newurl.startsWith('/login/github/callback')){
        let baseURI = url.parse(req.url, true);
        let path = baseURI.pathname.split('/');
        let queryParameter = baseURI.query;
        const codee = queryParameter.code;
        console.log("tHE CODE serverside" + codee);
         callbackGithub(res, codee);
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
    if(newurl.startsWith('/admin/get_user_by_id')){
        let check = await isAdmin(req.url);
        console.log(check);

        if(check === true){
            let body = await getPostData(req)
            body = JSON.parse(body)
           let user = await getUserById(body.id);
           res.writeHead(201, { 'Content-Type': 'application/json' })
           res.end(JSON.stringify({ userfound: user }))
        }
        else{
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: " not admin" }));
        }
    }
    else

    if(newurl.startsWith('/admin/get_all_users')){
        let check = await isAdmin(req.url);
        console.log(check);

        if(check === true){
           let users = await getAllUsers();
           res.writeHead(201, { 'Content-Type': 'application/json' })
           res.end(JSON.stringify({ users_found: users }))
        }
        else{
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: " not admin" }));
        }
    }

    if(newurl.startsWith('/admin/delete_user')){
        let check = await isAdmin(req.url);
        console.log(check);

        if(check === true){
            let body = await getPostData(req)
            body = JSON.parse(body)
           let answer = await deleteUser(body.id);
           res.writeHead(201, { 'Content-Type': 'application/json' })
           res.end(JSON.stringify({ answer: answer }))
        }
        else{
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: " not admin" }));
        }
    }

    else
    if(newurl.startsWith('/admin/update_user')){
        let check = await isAdmin(req.url);
        console.log(check);

        if(check === true){
           let updated_user = await findAndUpdateUser(req);
           res.writeHead(201, { 'Content-Type': 'application/json' })
           res.end(JSON.stringify(updated_user));
        }
        else{
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: " not admin" }));
        }
    }

    else

    if(newurl.startsWith('/admin/get_data_by_id')){
        let check = await isAdmin(req.url);
        console.log(check);

        if(check === true){
            let body = await getPostData(req)
            body = JSON.parse(body)
           let answer = await getUserDataById(body.id);
           res.writeHead(201, { 'Content-Type': 'application/json' })
           res.end(JSON.stringify({ answer: answer }))
        }
        else{
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: " not admin" }));
        }
    }

    else

    if(newurl.startsWith('/admin/get_all_data')){
        let check = await isAdmin(req.url);
        console.log(check);
        if(check === true){
           let answer = await getAllData();
           res.writeHead(201, { 'Content-Type': 'application/json' })
           res.end(JSON.stringify({ answer: answer }))
        }
        else{
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: " not admin" }));
        }
    }

    else
    if(newurl.startsWith('/admin/update_data')){
        let check = await isAdmin(req.url);
        console.log(check);

        if(check === true){
            //let body = await getPostData(req)
            //body = JSON.parse(body)
           let answer = await findAndUpdateData(req);
           res.writeHead(201, { 'Content-Type': 'application/json' })
           res.end(JSON.stringify({ answer: answer }))
        }
        else{
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: " not admin" }));
        }
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
        let body = await getPostData(req)
        //console.log(body.login);
        //body = JSON.parse(body)
        const userDb = await UserCredentials.findOne({ username: body.login }).exec();
        console.log(userDb);
        if(userDb === null){
        //registerGithubUser(req, res);
        }
        else{
            res.writeHead(302,  {Location: `http://localhost:5000/mainpage` })
            res.end();
        }
    }

    else if(newurl === '/loginn'){
        JwtLogin(req, res);
    }
     else {
       // res.writeHead(404, { 'Content-Type': 'application/json' })
        //res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

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


const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!!!`))

//exports.access_token = access_token;