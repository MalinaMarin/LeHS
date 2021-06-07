const app_id  = process.env.GITHUB_APP_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const client_id = process.env.GITHUB_CLIENT_ID;
const fetch = require('node-fetch');
async function getAccessToken(code) {
    const request = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code
      })
    });
    const text = await request.text();
    const params = new URLSearchParams(text);
    return params.get("access_token");
  }

  async function fetchGitHubUser(token) {
    const request = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
    return await request.json();
  }
  
  module.exports = {getAccessToken, fetchGitHubUser}