const mongoose = require('mongoose');
const multer=require("multer")
const path=require("path")
const crypto=require("crypto")
const AVATAR_PATH=path.join('/uploads/users/avatars')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
   
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken:{
        type:String,
        expireToken:Date,
    },
  
    name: {
        type: String,
       
    },
    avatar:{
        type:String,

    },
    friendship:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Friendship"
    }]
}, {
    timestamps: true
});
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

//static path
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;