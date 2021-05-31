const nodemailer=require("nodemailer")


exports.newEmail=(email)=>{
    console.log('inside new email mailer')
    nodemailer.transporter.sendMail({
        from:'ssritilak@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:'<h1>yup,your comment is published</h1>'
    },(err,info)=>{
        if(err){
            console.log("error in sending mail")
            return
        }
        console.log("Message Sent",info)
        return
    })
}



