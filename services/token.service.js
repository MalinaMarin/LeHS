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
    return sign({ msg: "expired" }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '0s',
    });
};


const sendAccessToken =  (res, req, accesstoken) => {

    return  accesstoken;

};


const sendRefreshToken = (res, token) => {

  res.writeHead(301, {
    'Set-Cookie': 'refreshtoken=' + token,
    //'Location': '/loginn'
    'Content-Type': 'text/plain'
  });


};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  clearRefreshToken
};