var express = require('express');
var studentController = require('../controllers/student');

var router = express.Router();

router.get('/init', studentController.init);
router.post('/saveStudent', studentController.saveStudent);
router.get('/getStudents', studentController.getStudents);

module.exports = router;