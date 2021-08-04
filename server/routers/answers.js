const express = require("express");
const answersController = require("../controllers/answers.js");
const router = express.Router();

//create new message where body comes from websocket
router.post("/", answersController.postAnswers, (req, res) => {
  console.log(
    "we made it back to the router after the answersController.postAnswers"
  );
  return res.status(200).json(res.locals.newAnswers);
});

module.exports = router;
