const nodemailer=require("../config/nodemailer")



exports.newComment=(comment)=>{
   let htmlStrings=nodemailer.renderTemplate({comment:comment},'/comments/newcomments.ejs')
   console.log('email**',comment.user.email);
    nodemailer.transporter.sendMail({
        from:'ssritilak@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:`<h1>WELCOME TO CODEIAL`
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
            return
        }
        console.log("Message Sent",info)
        return
    })
}


