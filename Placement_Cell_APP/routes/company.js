const express = require('express');
const router = express.Router();
const passport = require('passport');

const companyController = require('../controller/company_controller');

router.get('/home',passport.checkAuthentication,  companyController.companyPage);
router.get('/allocate', passport.checkAuthentication, companyController.allocateInterview);

router.post('/schedule-interview', passport.checkAuthentication, companyController.scheduleInterview);
router.post('/update-status/:id', passport.checkAuthentication, companyController.updateStatus);

module.exports = router;
