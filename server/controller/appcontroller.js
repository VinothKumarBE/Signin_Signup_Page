import  UserModel from '../model/user.model.js';
import bcrypt from 'bcrypt';
//import userModel from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import otpGenerator from 'otp-generator'


//middle ware
export async function verifyUser(req,res,next) {
    try{
         const  { username } =  req.method == "GET" ? req.query: req.body;


         let exist = await UserModel.findOne({username})
         if(!exist) return  res.status(404).send ({error: "can't find User!"});
         next();

    }catch(error){
        return res.status(404).send({ error: "Aurthentication Error"})

    }
}
//register
export  async function register(req, res){
 try{
    const  { username, password, profile, email} = req.body

    const  exitUsername = new Promise((resolve, reject)=>{
        UserModel.findOne({username},function(err,user){
            if(err) reject(new Error(err))
            if(user) reject({error: "please use unique username"})
            resolve();
        })
    });

    const  exitEmail = new Promise((resolve, reject)=>{
        UserModel.findOne({email},function(err,email){
            if(err) reject(new Error(err))
            if(email) reject({error: "please use unique username"})
            resolve();
        })
    });

    Promise.all([exitUsername,exitEmail])
      .then(()=>{
            if(password){
               bcrypt.hash(password, 10)
                 .then(hashedPassword =>{

                const user  = new UserModel({
                    username,
                    password: hashedPassword,
                    profile: profile  || '',
                    email

                })

                user.save()
                     .then(result => res.status(201).send({msg: "User Register Successfully"}))
                     .catch(error => res.status(500).send({error}))

               }).catch(error =>{ return res.status(500).send({
                   error : "Enable to hashed password"
                   })

               })
            }
      }).catch(error =>{
        return res.status(500).send({ error})
      })






 }catch(error) {
    return res.status(500).send(error)
 }
}

//login
export  async function login(req, res){
   
    const { username, password} = req.body;
        try{
            UserModel.findOne({username})
              .then(user =>{
                bcrypt.compare(password, user.password)
                   .then(passwordCheck =>{
                      if(!passwordCheck) return res.status (400).send({ error: "Dont't have a password"})

                        const token= jwt.sign({
                                          userId: user._id, 
                                         username :user.username
                                     }, ENV.JWT_SECRET, { expiresIn : "24h"});
                            return res.status(200).send({
                                msg:"Login sucessfully...!",
                                username: user.username,
                                token
            
                            });
                    })
                   .catch(error =>{
                    return res.status(400).send({error: "Password does not match"})                 
                  })
              }) 
                .catch(error =>{
                    return res.status(404).send ({error : "Username not Found"});


                })


        }catch(error){
            return res.status(500).send({error});
        }
 


}

//get user
export  async function getUser(req, res){


    const  { username } = req.params;
     
    try{

        if(!username) return res.status(501).send({ error: "Invalid Username"});

        UserModel.findOne({ username }, function (err, user){
            if(err) return res.status(500).send ({err});
            if(!user) return res.status(501).send ({error :"could not find user"});

            const  { password, ...rest} = Object.assign({}, user.toJSON()) ;
            return res.status(201).send(rest);

      
        })

      }catch(error){
        return res.status(404).send({ error : "connot find  user data"})

    }
}

//update user
export  async function updateUser(req, res){
   try{

       //const id = req.query.id;
       const { userId } = req.user;

       if(userId){
        const body=req.body

        UserModel.updateOne({ _id : userId },body , function (err, data){
            if(err) throw err;

            return res.status(201).send({ msg : "Recorded Updated..!"});
        })
       }
       else{
        return res.status(401).send({error: "User Not  Found...!"});
       }

   }catch(error){
    return res.status(401).send({ error })
   }
}

export  async function generateOTP(req, res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
    res.status(201).send({ code: req.app.locals.OTP })
}

export  async function verifyOTP(req, res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}



export  async function createResetSession(req, res){
    res.json('createResetSession route')
}

// export  async function resetPassword(req, res){
//     res.json('resetPassword route')
// } 

