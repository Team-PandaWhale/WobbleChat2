import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";

//There will only be one instance of this component on the page
//Requirements: one inherited prop: userId, must interact with DB and consequently update state upon confirmation of 
//  successful post to db

const CreateQuestionForm = (props) => {
  //using useState hook to enable state in component
  //first item = current value, second item = a setter function, to update value, destrctured via [] and initialized to empty string
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  

  const handleSubmit = async (e) => {
    // console.log('title', title);
    // console.log('description', description)
    // e.preventDefault();
    // alert(`This is what was submitted: ${title}`);
    // console.log(`sending an axios post method with ${title} and ${description}`);
    try {
      await axios ({
        method: 'post',
        url: '/api/questions',
        data: {
          title: title,
          description: description,
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label id = 'title'>
        <input
        type="text" 
        value={title} 
        placeholder="Subject"
        onChange={e => setTitle(e.target.value )}
        />
      </label>
      <br/>
      <label id = 'description'>
        <input
        type="text" 
        value={description} 
        placeholder="Question"
        onChange={e => setDescription(e.target.value )}
        />
      </label>
      <br/>
      <input type="submit" value="Submit" />

      {/* <li>Question title is: { title } </li> */}
    </form>
  );
}

export default CreateQuestionForm;