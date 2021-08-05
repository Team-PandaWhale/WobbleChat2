const pool = require("../db/connect");

const answersController = {};

//openChat should... send a req to Websockets?
//gets details from messages
//puts details into question
answersController.getAnswers = (req, res, next) => {
  // check if the id exist
  // if (req.query === undefined) return next({error: 'please input a valid req.query'});
  // if (req.query.questionId === undefined || typeof req.query.questionId !== 'number') {
  //   return next({error: 'please input a valid questionId'});
  // }
  const prevAnswers = `SELECT answers.*, questions.url FROM answers INNER JOIN questions ON answers.questionId = questions.id AND questions.id = $1`;
  const params = [req.query.questionId];
  pool
    .query(prevAnswers, params)
    .then((data) => {
      //check if data.rows has length
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
  // console.log('REQ BODY', req.body);
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
      res.locals.newAnswers = newAnswers.rows[0];
      return next();
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
};

answersController.deleteAnswers = (req, res, next) => {

  const id = [req.query.questionId];
  const deleteAnswers = 'DELETE FROM answers WHERE answers.questionId = $1';
  pool 
    .query(deleteAnswers, id)
    .then((data) => {
      console.log('we have successfully deleted the answers: ', data);
      return next();
    })
    .catch((err) => {
      console.log('there was an error in deleting answers: ', err);
      return next(err);
    })
}

module.exports = answersController;
