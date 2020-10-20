const express = require('express');
const { addData } = require('../../controllers/surveyControllers');

const router = express();

router.route('/')
  .post(addData);

module.exports = router;