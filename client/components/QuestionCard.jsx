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

  useEffect(async () => {
    try {
      const result = await axios({
        method: "get",
        url: "/api/answers/getAnswers",
        params: {
          questionId: id,
        },
      });
      console.log('USE EFFECT RAN AGAIN');
      // console.log('result in use effect axios call is: ', result);
      const array = [];
      for (let i = result.data.length - 1; i > result.data.length - 6; i--) {
        const el = result.data[i];
        // console.log("What is being put in our el var", el);
        array.push(
          <div key={i}>
            <p>{el.content}</p>
          </div>
        );
      }
      setAnswerArray(array);
    } catch (error) {
      console.log("there was an error getting errors: ", error);
    }

    // return function cleanup() {
    //   setAnswer("");
    //   setAnswerBoxVisible(false);
    // };
  }, []);

  const handleClick = async (e) => {
    // console.log("ANSWER IS", answer);
    // e.preventDefault();
    try {
      const test = await axios({
        method: "post",
        url: "/api/answers",
        data: {
          dateCreated: "1/1/2020",
          questionId: id,
          content: answer,
        },
      });
      // console.log('TEST VARIABLE IS', test);
    } catch (error) {
      console.log(error);
    }
    return (
      <div className="answerText">
        <p>{"placeHolder"}</p>
      </div>
    );
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
            if (answerBoxVisible) return;
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
    <Card key={id}>
      <Card.Body>
        <div className="question-container">
          <Card.Title>Subject: {title}</Card.Title>
        </div>
        <Card.Text>Question: {description}</Card.Text>
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
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
