const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentsController = require('../controller/students_controller');

router.get('/create', passport.checkAuthentication, studentsController.createStudentPage);
router.get('/delete/:id', passport.checkAuthentication, studentsController.deleteStudent);

router.post('/create-student', passport.checkAuthentication, studentsController.createStudent);

module.exports = router;
