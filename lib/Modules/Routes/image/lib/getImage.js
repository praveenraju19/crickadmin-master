const multer=require('multer')
const AWS=require('aws-sdk')
require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const bucketName = ""
const ID = '';
const SECRET = '';

const s3 = new S3({
    accessKeyId: ID,
    secretAccessKey: SECRET

})

function getFileStream(fileKey) {
    // const downloadParams = {
    // Key: fileKey,
    // Bucket: bucketName
    // }
    const signedUrl = s3.getSignedUrl("getObject", {
       
        Key: fileKey,
        Bucket: bucketName
        // Expires: expires || 900, // S3 default is 900 seconds (15 minutes)
      });
    
      return signedUrl;
    // return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream