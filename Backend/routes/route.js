const express = require('express');
const router=express.Router();
 const {uploadFileToAws} = require('../services/imageupload')
const fileupload = require('express-fileupload')
const {uploadImages,getAllImages}= require('../controller/uploadimage')
router.use(fileupload({
    limits: {fileSize:5 * 1024 * 1024 }}
    ));

router.route("/uploadimage").post(uploadFileToAws,uploadImages);    
router.route("/getimages").get(getAllImages);    

module.exports= router;