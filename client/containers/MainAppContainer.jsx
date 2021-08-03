import React, { Component } from "react";
import { Link } from "react-router-dom";

import QuestionsContainer from "./QuestionsContainer";
import CreateQuestionForm from "../components/CreateQuestionForm";
import Chat from "../components/Chat";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

class MainAppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionBool: true,
      fetchedData: false,
      questions: [],
    };
  }

  componentDidMount() {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((questionData) => {
        if (!Array.isArray(questionData)) questionData = [];
        this.setState({ fetchedData: true, questions: questionData });
      })
      .catch((err) =>
        console.log(
          "MainAppContainer.componentDidMount has error when making fetch request for questionsData: ERROR: ",
          err
        )
      );
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    if (!this.state.fetchedData)
      return (
        <div>
          <h2>Loading data, please wait...</h2>
        </div>
      );

    const { questions } = this.state;
    //if fetch request retrieved nothing, there is nothing to display
    if (!questions) return null;
    if (!questions.length) {
      // console.log(this.state);
      return <div>Sorry, no questions to display</div>;
    }

    return (
      <>
        <div className="top-menu-container">
          <Link to={"/"} className="brandname">
            Wobblechat
          </Link>
          <div>
            <Link to={"/create"}>
              <Button variant="primary">Ask a question</Button>
            </Link>
            &nbsp;&nbsp;
            <Link to={"/logout"}>
              <Button variant="secondary">Sign out</Button>
            </Link>
          </div>
        </div>

        {/* <Card className="chat-style">
          <Chat />
        </Card> */}
        <br />

        <QuestionsContainer questions={this.state.questions} />
        <CreateQuestionForm />
      </>
    );
  }
}

export default MainAppContainer;
