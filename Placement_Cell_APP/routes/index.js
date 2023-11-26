const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));

router.use('/students', require('./students'));
router.use('/company', require('./company'));

// for any further routers, access from here
// router.use('/routerName, require('./routerfile));


module.exports = router;