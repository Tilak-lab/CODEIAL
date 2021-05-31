const FacebookStrategy=require("passport-facebook").Strategy
const passport=require("passport")
const User=require("../models/user")
const express=require("express")
const crypto=require("crypto")
passport.use(new FacebookStrategy({
    clientID: "114347214074574",
    clientSecret: "063972d998bb558db298d6c418a48c4d",
    callbackURL: "http://localhost:8000/users/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile) ;
   
    User.findOne({email:profile.profileUrl}).exec((err,user)=>{
      if(err){
          console.log("err",err)
        //   wait a min let me check one thing
          return
      }
   
     if(user){
         //find user
         return done(null,user)
     }else{
         User.create({
             name:profile.displayName,
             email:profile.profileUrl,
             password:crypto.randomBytes(20).toString('hex'),
         },(err,user)=>{
             if(err){
                 console.log("err in creating user")
                 return
             }
             return done(null,user)
         })
     }
  })

    
  }
));