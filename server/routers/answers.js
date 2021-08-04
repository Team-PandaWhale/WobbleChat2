const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answers.js');


router.get('/', answerController.getQuestions, (req,res) => {
  return res.status(200).json();
})

//create new question ----> needs websockets
router.post('/', answerController.postQuestion, answerController.getQuestions, (req,res) => {
  return res.status(200).json();
})


module.exports = router;