const express = require("express");
const answersController = require("../controllers/answers.js");
const router = express.Router();

//create new message where body comes from websocket
router.post("/", 
answersController.postAnswers, 
answersController.getAnswers,
(req, res) => {
  // console.log(
  //   "we made it back to the router after the answersController.postAnswers", res.locals.newAnswers
  // );
  return res.status(200).json(res.locals.answers);
});

module.exports = router;
