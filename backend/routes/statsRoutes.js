const express = require('express');
const router=express.Router();
const statsController=require("../controllers/statsController");
const authController=require(`${__dirname}/../controllers/authController`);

router.use(authController.protect);

// router.route('/count')
// 	  .get(Stats.countAttempts);


router.route('/month').get(statsController.getMonthData);
router.route('/lastweek').get(statsController.getLastWeekData);
router.route('/lastmonth').get(statsController.getLastMonthData);
router.route('/month').get(statsController.getMonthData);

// router.route("/user/dateRange")
	   // .get(Stats.getData)

// router.route("/lastweek")
// 	   .get(Stats.getLastWeekData)


module.exports=router;
