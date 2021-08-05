import React from "react";
import { useState, useEffect } from "react";
// import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import regeneratorRuntime from "regenerator-runtime";

const QuestionCard = (props) => {
  //props from QuestionsContainer get assigned to each instance of QuestionCard
  const { id, title, description, url, creator, isOpen } = props;
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [answerBoxVisible, setAnswerBoxVisible] = useState(false);
  const [posted, setPosted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerArray, setAnswerArray] = useState([]);

  // console.log("id equals: ", id);

  const setArrays = (result) => {
    const array = [];
    for (let i = result.data.length - 1; i >= 0; i--) {
      const el = result.data[i];
      if (!el) return;
      // console.log("What is being put in our el var", el);
      array.unshift(
        <div key={i}>
          <p>Answer: {el.content}</p>
        </div>
      );
    }
    setAnswerArray(array);
  };

  useEffect(async () => {
    try {
      const result = await axios({
        method: "get",
        url: "/api/answers/getAnswers",
        params: {
          questionId: id,
        },
      });
      console.log("USE EFFECT RAN AGAIN");
      setArrays(result);
    } catch (error) {
      console.log("there was an error getting errors: ", error);
    }
  }, []);

  const handleClick = async (e) => {
    // console.log("ANSWER IS", answer);
    // e.preventDefault();
    try {
      const result = await axios({
        method: "post",
        url: "/api/answers/",
        data: {
          dateCreated: "1/1/2020",
          questionId: id,
          content: answer,
        },
        params: {
          questionId: id,
        },
      });
      console.log("BEFORE SET ARRAYS, AFTER TRY IN POST: ", result);
      setArrays(result);
    } catch (error) {
      console.log(error);
    }
  };

  function renderDropDown() {
    // console.log("TESTING RENDER DROP DOWN");
    return (
      <div className="dropdown-body">
        <input
          type="text"
          value={answer}
          placeholder="Answer"
          onChange={(e) => {
            // if (posted) return;
            setAnswer(e.target.value);
          }}
        />
        <button
          onClick={() => {
            // if (answerBoxVisible) return;
            setDropDownVisible(false);
            setPosted(!posted);
            setAnswerBoxVisible(true);
            handleClick();
          }}
        >
          Post Answer
        </button>
      </div>
    );
  }

  return (
    <div className="cardBox">
      <div className="question-container">
        <p>Subject: {title}</p>
        <p>Question: {description}</p>
      </div>
      <div className="answersBox">{answerArray}</div>
      <div className="answerButton">
        <Button
          variant="primary"
          className="min-button"
          onClick={() => setDropDownVisible(!dropDownVisible)}
        >
          Answer question
        </Button>

        <div className="answerInput">
          {[dropDownVisible && renderDropDown()]}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
