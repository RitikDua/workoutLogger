const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);

const scheduleController=require("../controllers/scheduleController");
router.use(authController.protect);
// console.log("rpites");
router.route('/').patch(scheduleController.updateSchedule);
router.route('/today').get(scheduleController.getTodaySchedule);
router.route('/create').post(scheduleController.createTodaySchedule);

module.exports=router;