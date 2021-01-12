const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);
const userController=require(`${__dirname}/../controllers/userController`);
// const scheduleController=require("../controllers/scheduleController");

router.route('/login').post(authController.login);
router.get('/logout',authController.logout);
router.route('/signup').post(authController.signup);
router.use(authController.protect);
// router.get('/',userController.getUsers);

router.get('/',userController.getMe);
router.get('/:userId',userController.getUserById);
router.patch('/changePassword',userController.changePassword);
router.patch('/updateMe',userController.updateMe);
router.delete('/deleteMe',userController.deleteMe);
// router.patch("/addSchedule",userController.addSchedule);
// router.get('/schedule',scheduleController.get);

module.exports=router;