const pool = require("../db/connect");

const answersController = {};

//openChat should... send a req to Websockets?
//gets details from messages
//puts details into question
answersController.getAnswers = (req, res, next) => {
  //needs to pull existing Messages related to Questions (join tables)
  const prevAnswers = `SELECT answers.*, questions.url FROM answers INNER JOIN questions ON answers.questionId = questions.id AND questions.id = $1`;
  const params = [req.params.id];
  pool
    .query(prevAnswers, params)
    .then((data) => {
      res.locals.answers = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        status: 500,
        message: "Error grabbing messages",
      });
    });
};

//postMessage should create a Message from the websockets call
answersController.postAnswers = (req, res, next) => {
  // ------> needs to GET data from websockets
  const dateCreated = "1/1/1990";
  const questionId = "1";
  const content = "test";
  const params = [dateCreated, questionId, content];
  const insertAnswers =
    "INSERT INTO answers (dateCreated, questionId, content) VALUES ($1,$2,$3) RETURNING *";
  if (!dateCreated || !questionId || !content)
    return next({ status: 401, message: "Invalid answers data" });
  pool
    .query(insertAnswers, params)
    .then((newAnswers) => {
      // console.log(newMessage);
      res.locals.newAnswers = newAnswers;
    })
    .catch((err) => {
      return next({
        status: 500,
        message: "Error creating messages",
        error: err,
      });
    });
  return next();
};

module.exports = answersController;
