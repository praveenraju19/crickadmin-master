const express = require('express');
const router = express.Router();
const app=express()
const fs = require('fs')
const util = require('util')
const routerDebug = require('debug')('Routermodule');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const getFileStream=require('./lib/getImage').getFileStream
const  uploadFile  = require('./lib/imageupload').uploadFile
const deleteFile=require('./lib/deleteImage').deleteImage

router.post('/upload', upload.single('image'), async (req, res) => {
 
  

  
    const result = await uploadFile(req, res)
    
    
    // console.log("res",result)
    // const description = req.body.description
    // res.json(result)
});
router.get('/images/:key', (req, res) => {
    console.log(req.params)
    const key = req.params.key
    const readStream = getFileStream(key)
    res.send({imageUrl:readStream})
    // return readStream
  
    // readStream.pipe(res)
  })

  router.delete('/removeimage/:key', async (req, res) => {
    
    const readStream = await deleteFile(req,res)
   
  
  })

module.exports.s3fileupload = router;