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
        <div className="indivQuestion"key={i}>
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
        <textarea
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
    <div className="question-container">
      <div className="topQuestionBox">
        <h2>Subject: {title}</h2>
        <h4>Question: {description}</h4>
      </div>
      <div className="answersBox">{answerArray}</div>
      <div className="answerButton">
        <button
          className="min-button"
          onClick={() => setDropDownVisible(!dropDownVisible)}
        >
          Answer question
        </button>

        <div className="answerInput">
          {[dropDownVisible && renderDropDown()]}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
