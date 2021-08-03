const { Pool } = require("pg");

// Connect to our database and assign the result of that connection to a new object
// Then export that object so that we can make queries to our DB.
// This object is used inside of our controllers.
//postgres://pjtqiuob:sbbbIBrmwahaBwTEdj1IK4gg7QBU4ypw@chunee.db.elephantsql.com/pjtqiuob
const uri =
  // "postgres://pjtqiuob:sbbbIBrmwahaBwTEdj1IK4gg7QBU4ypw@chunee.db.elephantsql.com/pjtqiuob"; //- Nate
  // "postgres://pyrlesph:y49KNIFGACz5VEWNtTL8QH8auBdno8ha@chunee.db.elephantsql.com/pyrlesph"; //- Harrison??
  "postgres://zrusaaod:hCG6U1Ax0LW9F9N38RkgKPjqjHwbS8tb@chunee.db.elephantsql.com/zrusaaod"; //Gal
const pool = new Pool({
  connectionString: uri,
});

module.exports = pool;
