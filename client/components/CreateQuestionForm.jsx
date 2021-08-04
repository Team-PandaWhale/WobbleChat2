import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import regeneratorRuntime from "regenerator-runtime";

//There will only be one instance of this component on the page
//Requirements: one inherited prop: userId, must interact with DB and consequently update state upon confirmation of
//  successful post to db

const CreateQuestionForm = (props) => {
  //using useState hook to enable state in component
  //first item = current value, second item = a setter function, to update value, destrctured via [] and initialized to empty string
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    // console.log('title', title);
    // console.log('description', description)
    e.preventDefault();
    // alert(`This is what was submitted: ${title}`);
    // console.log(`sending an axios post method with ${title} and ${description}`);
    try {
      const data = await axios({
        method: "post",
        url: "/api/questions",
        data: {
          title: title,
          description: description,
        },
      });

      console.log("DATA IS ", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="topForm" onSubmit={handleSubmit}>
      <label id="title">
        <textarea
          type="text"
          value={title}
          placeholder="Subject"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label id="description">
        <textarea
          type="text"
          value={description}
          placeholder="Question"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <div className="submitQuestion">
        <input type="submit" value="Submit" />
      </div>

      {/* <li>Question title is: { title } </li> */}
    </form>
  );
};

export default CreateQuestionForm;
