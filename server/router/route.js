import  { Router} from "express";
import * as controller from '../controller/appcontroller.js'

const router = Router();






//post methids
router.route('/register').post(controller.register);//register user
// router.route('/registerMail').post();//send the email
router.route('/authenticate').post((req,res) => res.end());// authenticate user
router.route('/login').post(controller.login);//login app






//get methods
router.route('/user/:username').get(controller.getUser);
router.route('generateOTP').get(controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('createResetSession').get(controller.createResetSession);



//put methods
router.route('/updateuser').put(controller.updateUser);
router.route('/resetPassword').put(controller.resetPassword);




export  default router