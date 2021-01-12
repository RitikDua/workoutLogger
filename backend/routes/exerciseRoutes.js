const express = require('express');
const router=express.Router();
const authController=require(`${__dirname}/../controllers/authController`);

const exerciseController=require("../controllers/exerciseController");
router.use(authController.protect);
// console.log("rpites");
router.route('/').post(exerciseController.updateExercise);

module.exports=router;