import nodemailer from 'nodemailer';
import mailgen from 'mailgen';

import ENV  from  '../config.js';
import Mailgen from 'mailgen';


let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
        },
}

let transporter = nodemailer.createTransport(nodeConfig);

let  MailGenerator = new Mailgen({
    theme:"default",
    product:{
        name:"Mailgen",
        link:'https://mailgen.js'
    }
})

export  const  registerMail = async(req, res) =>{
    const  { username, userEmail, text, subject} = req.body;


    var email = {
        body:{
            name: username,
            intro: text || 'welcome  to   eclipton! we are excited  to have  you on board.',
            outro: 'need any help  or any question? just search eclipton.com we will help you'

        }
    }

    var emailBody =MailGenerator.generate(email);

    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successfully",
        html: emailBody

    }
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg: " you should receive an email from us."})
    })
    .catch(error => res.status(500).send({error}))
}