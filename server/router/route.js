import  { Router} from "express";

const router = Router();
import * as controller from '../controller/appcontroller.js';
import  { registerMail } from '../controller/mailer.js';
import Auth, {localVariables} from '../middleware/auth.js';








//post methids
router.route('/register').post(controller.register);//register user
router.route('/registerMail').post(registerMail);//send the email
router.route('/authenticate').post(controller.verifyUser,(req,res) => res.end());// authenticate user
router.route('/login').post(controller.verifyUser,controller.login);//login app






//get methods
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);



//put methods
router.route('/updateuser').put(Auth,controller.updateUser);
router.route('/resetPassword').put( controller.verifyUser, controller.resetPassword);




export  default router;