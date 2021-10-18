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


 function deleteImage(req, res) {
    console.log("input",req.params['key'])
   

    console.log("---------------------")
    var resonseObj = {
        success: false,
        error: true,
        data: {}
    }
    if (!req.params['key']) {
        res.status(400)
        resonseObj.error = 'key is mandatory';
        res.send(resonseObj)
        return
    }

    var responseBodey =  deleteFile(req.params['key']);
    if (responseBodey > 0) {
        console.log("inside",responseBodey)
        resonseObj.data = {};
        resonseObj.error = false;
        resonseObj.success = true;
        res.json(resonseObj);
    } else {
        resonseObj.data = {};
        resonseObj.error = "does not exists";
        resonseObj.success = false;
        res.json(resonseObj);
    }

}


 function deleteFile(file) {
    s3.deleteObject({
        Bucket: bucketName,
        Key:file
    
      },function (err,data){

if(err){
return err


}
console.log("data",data)
return data

      })

    
}
exports.deleteImage = deleteImage

