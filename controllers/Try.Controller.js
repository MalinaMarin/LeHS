const UserCredentials = require('../models/user_credentials');

const {getPostData} = require('../helpers/utils_fct');

async function getAllUserCredentials(req, res) {
    try {
        const credentials = await UserCredentials.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(credentials))
    } catch (error) {
        console.log(error)
    }
}


async function createUserCredentials(req, res) {
    try {
        const body = await getPostData(req)

        const { id, username, email, password, role} = JSON.parse(body)

        const credentials = {
           id,
           username,
           email,
           password,
           role
        }

        const newCredentials = await UserCredentials.create(credentials)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newCredentials))  

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllUserCredentials,
    createUserCredentials
}