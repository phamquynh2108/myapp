const express = require('express');
const multer = require('multer');
const router = express();
const uploadController = require('../controllers/uploadController')

const upload=multer({
    dest:'public/'
})

router.post('/image',upload.single('image'),uploadController.upload)
module.exports = router;