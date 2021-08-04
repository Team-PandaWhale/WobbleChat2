const express = require("express");
const answersController = require("../controllers/answers.js");
const router = express.Router();

//create new message where body comes from websocket
router.post("/", answersController.postAnswers, (req, res) => {
  return res.status(200).json(res.locals.newAnswers);
});

module.exports = router;
