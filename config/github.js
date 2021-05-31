var GitHubStrategy = require('passport-github').Strategy;
const User=require("../models/user")
const crypto=require("crypto")
const passport=require("passport")

const express=require("express")
const app=express()
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user,cb)=>{
    cb(null,user.id)
})
passport.deserializeUser((id,cb)=>{
    cb(null,id)
})
passport.use(new GitHubStrategy({
    clientID:"206799f3e7d97a2cf1c3",
    clientSecret: "d2520abbdd243aa6585bbf7f71c14818c1671667",
    callbackURL: "http://localhost:8000/users/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile) ;
    User.findOne({email:profile.profileUrl}).exec((err,user)=>{
      if(err){
          console.log("err",err)
          return
      }
     //console.log(profile)
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