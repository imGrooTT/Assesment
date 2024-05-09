const fileurl=require("../models/image")

exports.uploadImages = async (req, res, next) => {
    try {
      var data = new fileurl({
        url: req.fileurl,
        name:req.files?.image?.name||Math.random().toString().substr(2, 8)
      })
      let dbResponse= await data.save()
     
          res.status(200).json({message: dbResponse})
       
    } catch (error) {
      res.status(401).send("message error: " + error)
    }
    
  }

exports.getAllImages = async (req, res, next) => {
    try {
      var data = await fileurl.find()
     
          res.status(200).send(data)
       
    } catch (error) {
      res.status(401).send("message error: " + error)
    }
    
  }