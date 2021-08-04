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
  // console.log("We have made it into the postAnswers middleware: ", req.body);
  const { dateCreated, questionId, content } = req.body;
  const params = [dateCreated, questionId, content];
  const insertAnswers =
    "INSERT INTO answers (dateCreated, questionId, content) VALUES ($1,$2,$3) RETURNING *";
  if (!dateCreated || !questionId || !content) {
    // console.log("error in data input");
    return next({ status: 401, message: "Invalid answers data" });
  }
  pool
    .query(insertAnswers, params)
    .then((newAnswers) => {
      // console.log("The quere was made, here are the newAnswers: ", newAnswers);
      res.locals.newAnswers = newAnswers;
    })
    .catch((err) => {
      // console.log(
      //   "we made it into the catch statement in the postAnswers middleware",
      //   err
      // );
      return next({
        status: 500,
        message: "Error creating messages",
        error: err,
      });
    });
  // console.log(
  //   "we skipped the rest of query and made it to the end of the postAnswers middleware"
  // );
  return next();
};

module.exports = answersController;
