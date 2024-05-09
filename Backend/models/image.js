const mongoose = require('mongoose');


const fileurl = mongoose.Schema({ 
    url: { type:String },
    name:{ type:String }
},
{ timestamps: true });

module.exports = mongoose.model('fileurl', fileurl);