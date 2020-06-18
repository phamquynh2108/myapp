var express = require('express');
var router = express.Router();

var AuthMiddleware = require('../middleware/AuthMiddleware')
var userController = require('../controllers/userController')

router.use( AuthMiddleware.isAuth )
router.get('/:id', userController.user)
router.get('/alluser', userController.allusers)
router.put('/follow', userController.follow)
router.put('/unfollow', userController.unfollow)

module.exports = router;