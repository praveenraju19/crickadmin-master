const multer = require('multer')
const AWS = require('aws-sdk')
require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const bucketName = ""
const ID = '';
const SECRET = '';

// const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_KEY


var resonseObj = {
    success: false,
    error: true,
    data: {}
}
const s3 = new S3({
    accessKeyId: ID,
    secretAccessKey: SECRET

})

// uploads a file to s3
async function uploadFile(req, res) {

    const fileStream = fs.createReadStream(req.path)
    const file = req.file
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    const send_data = await imageUpload(uploadParams)
    resonseObj.data = send_data.key
    resonseObj.error = false;
    resonseObj.success = true;
    res.json(resonseObj);
}

async function imageUpload(uploadParams) {


    return await s3.upload(uploadParams).promise()


}
exports.uploadFile = uploadFile


// downloads a file from s3

