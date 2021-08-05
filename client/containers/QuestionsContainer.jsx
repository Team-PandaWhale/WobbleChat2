import React from "react";
// import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
// import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

const QuestionsContainer = ({ refreshQuestions, questions }) => {
  //questions object passed down as prop from MainAppContainer
  //  const [{ questionId, isActive, title, description, chatURL }] = questions;
  console.log("QUESTIONS", questions);
  const questionObjects = questions.map(
    ({ id, title, description, url, creator, isopen }) => {
      // chrome dev tools is showing "isopen" as lowercase for some reason
      if (!isopen) {
        return (
          <QuestionCard
            key={id}
            title={title}
            description={description}
            creator={creator}
            chatURL={url}
            id={id}
            refreshQuestions={refreshQuestions}
          />
        );
      }
    }
  );

  return (
    <div className="question-window">
      <h2>Questions </h2>
      {questionObjects}
    </div>
  );
};

export default QuestionsContainer;
