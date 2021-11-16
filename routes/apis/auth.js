const app = require('express').Router();
// const { requireLogin } = require('../../middlewares/loginrequired');
const authentication=require('../../controllers/authetication');
const multer = require("../../middlewares/multer");

/**
 *  @description for user login
 *  @method POST /userlogin
 */
app.post('/userlogin', multer.none() ,authentication.userlogin);

/**
 *  @description for user logout
 *  @method GET /userlogin
 */
app.get("/logout", multer.none() ,authentication.logout);

/**
 *  @description for user login
 *  @method POST /register
 */
app.post('/register', multer.none() ,authentication.postUserRegister);

/**
 *  @description for user login
 *  @method POST /userupdate
 */
// app.post('/userupdate/:id', requireLogin ,authentication.postUserUpdate);

/**
 *  @description for user login
 *  @method POST /userupdate
//  */
// app.post('/userdelete/:id', requireLogin ,authentication.postUserDelete);

/**
 *  @description for user login
 *  @method POST /forgotpassword
 */
//  app.post('/forgotpassword/:id', requireLogin ,authentication.postForgotPaasword);

module.exports = app;