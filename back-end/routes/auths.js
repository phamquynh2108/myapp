var express = require('express');
var router = express.Router();

var AuthMiddleware = require('../middleware/AuthMiddleware')
var authController = require('../controllers/authController')


router.post('/signup', authController.signup)
router.post('/signin', authController.signin)

router.use(AuthMiddleware.isAuth)
router.get('/home',  authController.home)

module.exports = router;
