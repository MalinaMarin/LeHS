
const { parse } = require('dotenv');
const fs = require('fs')

// function jsonReader(filePath, callback) {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             return callback && callback(err)
//         }
//         try {
//             const object = JSON.parse(data)
//             return callback && callback(null, object)
//         } catch(err) {
//             return callback && callback(err)
//         }
//     })
// }
function jsonReader(filePath) {
    let object;
    try {
        const data = fs.readFileSync(filePath)
        object = JSON.parse(data)
    } catch (err) {
        console.log(err)
        return "error"
    }
    return object;
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

function parseCookies(request)  {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}







module.exports = {
    jsonReader,
    writeDataToFile,
    getPostData,
    parseCookies
}
