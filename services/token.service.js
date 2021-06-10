const { sign } = require('jsonwebtoken');
const { getPostData } = require('../helpers/utils_fct');

const createAccessToken = userId => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};


const createRefreshToken = userId => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};


const clearRefreshToken = () => {
    return sign({ msg: "logout" }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '0',
    });
};


const sendAccessToken = (res, req, accesstoken) => {

    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify( {token: accesstoken, email: req.username})) 
};


const sendRefreshToken = (res, token) => {

  res.writeHead(302, {
    'Set-Cookie': 'refreshtoken=' + token,
    'Location': '/refresh_token'
  });

};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  clearRefreshToken
};