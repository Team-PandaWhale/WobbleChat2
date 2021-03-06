// const path = require('path');
// const { ModuleFilenameHelpers } = require('webpack');
const pool = require("../db/connect");

const questionController = {};
let dummyCounter = 100;


//


//getQuestions should return an array of Questions
questionController.getQuestions = (req, res, next) => {
  const questionQuery =
    "SELECT id,title,description,url,isOpen,isAnswered,creator FROM questions WHERE isAnswered = false ORDER BY id DESC";
  pool
    .query(questionQuery)
    .then((data) => {
      res.locals.questions = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        status: 500,
        message: "Error querying Questions",
      });
    });
};

// postQuestion should create a Question and next() will call openChat
questionController.postQuestion = (req, res, next) => {
  // ----------> url comes from websockets -
  //userid comes from user controller (prev step in create question).
  dummyCounter++;
  const url = `testLucas${dummyCounter}`;
  // const { ssid } = req.cookies; // { id: 7 }

  const ssid = 1;
  const { title, description } = req.body;
  const params = [url, title, description, ssid];
  const insertQuestion =
    "INSERT INTO questions (url, title, description, creator) VALUES ($1,$2,$3,$4) RETURNING questions";

  console.log("SSID", ssid);

  console.log(dummyCounter, "DUMMY COUNTER");
  pool
    .query(insertQuestion, params)
    .then(data => {
      return next();
    })
    .catch(err => {
      console.log(err);
      return next({
        status: 500,
        message: "Error creating Questions.",
      });
    });
};


questionController.deleteQuestion = (req, res, next) => {

  const id = [req.query.questionId];
  const deleteQuestions = "DELETE FROM questions WHERE questions.id = $1"
  console.log('Successfully entered delete Questions')
  pool
  .query(deleteQuestions, id)
  .then(data => {
    console.log('data!!!: ', data);
    return next();
  })
  .catch(err => {
    console.log(err);
    return next ({
      status: 500,
      message: "Error deleting Question."
    })
  })
  

}













questionController.setInactive = (req, res, next) => {
  // Grab the user ID from cookies
  const { ssid } = req.cookies;
  // Make DB query, setting question(s) of that user to be inactive.
  const query = `UPDATE questions SET isOpen = false WHERE creator = $1`;
  // Calling next (no need to return anything)
  const params = [ssid];
  pool
    .query(query, params)
    .then((result) => {
      return next();
    })
    .catch((err) => {
      return next({
        message: "Could not set user questions to inactive",
        status: 500,
      });
    });
};

//isAnswered should update (put) isAnswered field to True
questionController.putAnswered = (req, res, next) => {
  //query -> update question req.params.id isAnswered = true
  const updateQuestion = `UPDATE questions SET isAnswered = true WHERE id = ${req.params.id} RETURNING Id`;
  pool
    .query(updateQuestion)
    .then((id) => {
      res.locals.id = id;
      // console.log(id);
    })
    .catch((err) => {
      return next({
        status: 500,
        message: "Error setting isAnswered to true",
      });
    });
  return next();
};

module.exports = questionController;
