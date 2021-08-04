import React from "react";
import { useState, useEffect } from "react";
// import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const QuestionCard = (props) => {
  //props from QuestionsContainer get assigned to each instance of QuestionCard
  const { id, title, description, url, creator, isOpen } = props;
  const [dropDownVisible, setDropDownVisible] = useState(false);

  function renderDropDown() {
    console.log("TESTING RENDER DROP DOWN");
    return (
      <div className="dropdown-body">
        <input type="text" />
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
        <div className="answerButton">
          <Button
            variant="primary"
            className="min-button"
            onClick={(e) => setDropDownVisible(!dropDownVisible)}
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
