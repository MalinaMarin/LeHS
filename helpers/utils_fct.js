
const fs = require('fs')

function jsonReader(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback && callback(err)
        }
        try {
            const object = JSON.parse(data)
            return callback && callback(null, object)
        } catch(err) {
            return callback && callback(err)
        }
    })
}
function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(err)
        }
    })
}







module.exports = {
    jsonReader,
    writeDataToFile,
    getPostData
}
