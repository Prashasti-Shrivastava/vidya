const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/test/get', testController.getTest);
router.post('/test/post',testController.postTest);

module.exports = router;