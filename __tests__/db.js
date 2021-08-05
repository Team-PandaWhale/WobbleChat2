const path = require('path');
// pathway to the server files where we are doing the unit testing

// might need to add delete functionality in the backend to run after we run each unit test to not crowd the database

const pool = require("../server/db/connect");
const db = require('../server/controllers/answers');
const { hasUncaughtExceptionCaptureCallback } = require('process');

describe('answers controllers unit tests', () => {
    //define data like id 
    const testId = {query: {questionId: 35}};

    //describe - getanswers here
        //check edge cases:
            //do we get an error if id is undefined/not valid - 
            //if get anything back at all with a correct ID - checking length of data.rows - res.locals.answers
        //check if data coming back is correct
    describe('getAnswers unit test', () => {
        it('should not accept a false id', () => {
            expect(db.getAnswers('not an id')).toBeInstanceOf(Error);
        })
    })


})


//db.getAnswers
//db.postAnswers

