var express = require('express');
var router = express.Router();

var AuthMiddleware = require('../middleware/AuthMiddleware')
var postController = require('../controllers/postController')


router.use( AuthMiddleware.isAuth )
router.post('/create-post', postController.createPost)
router.get('/allpost', postController.allpost)
router.get('/mypost', postController.mypost)
router.put('/like', postController.like)
router.put('/unlike', postController.unlike)
router.put('/comment', postController.comment)
router.delete('/deletepost/:postId', postController.delete)
router.get('/subpost', postController.getsubpost)
module.exports = router;