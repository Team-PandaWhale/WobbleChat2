import React from "react";
import { useState, useEffect } from "react";
// import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import regeneratorRuntime from "regenerator-runtime";

const QuestionCard = (props) => {
  //props from QuestionsContainer get assigned to each instance of QuestionCard
  const { id, title, description, url, creator, isOpen } = props;
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [answerBoxVisible, setAnswerBoxVisible] = useState(false);
  const [posted, setPosted] = useState(false);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    console.log('TESTING USE EFFECT')
    return function cleanup() {
      setAnswerBoxVisible(false);
    }
  }, posted);


  const handleClick = (e) => {
    console.log(answer);
    // e.preventDefault();
    // try {
    //   await axios({
    //     method: 'post',
    //     url: '/api/answer',
    //     data: {
    //       answer: answer,
    //     }
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
    return (
      <div className="answerText">
        <p>{answer}</p>
      </div>
    )
  }

  function renderDropDown() {
    console.log("TESTING RENDER DROP DOWN");
    return (

      <div className="dropdown-body">
        <input type="text"
        value = {answer}
        placeholder='Answer'
        onChange={e => {
          if (posted) return;
          setAnswer(e.target.value)
        }}
        />
        <button onClick={() => {
          if (answerBoxVisible) return;
          setDropDownVisible(false);
          setPosted(!posted)
          setAnswerBoxVisible(!answerBoxVisible)
        }}> Post Answer </button>
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
        <div className="answersBox">{answerBoxVisible && handleClick()}</div>
        <div className="answerButton">
          <Button
            variant="primary"
            className="min-button"
            onClick={() => setDropDownVisible(!dropDownVisible)}
          >
            Answer question
          </Button>
          
          <div className="answerInput">{dropDownVisible && renderDropDown()}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
