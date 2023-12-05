import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Result.css'
const PollForm = ({ editingPoll, onCreate, onUpdate, onCancel, voted }) => {
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState();

  useEffect(() => {
    if (editingPoll) {
      setQuestion(editingPoll.question);
      setOptions(editingPoll.options.map((option) => option.text).join(', '));
    } else {
      setQuestion('');
      setOptions('');
    }
  }, [editingPoll]);

  const handleCreate = () => {
    const newPoll = {
      question,
      options: options.split(',').map((option) => ({ text: option.trim(), votes: 0 })),
    };
    onCreate(newPoll);
  };

  const handleUpdate = () => {
    const updatedPoll = {
      ...editingPoll,
      question,
      options: options.split(',').map((option) => ({ text: option.trim(), votes: 0 })),
    };
    onUpdate(updatedPoll);
  };

  const showResults = () => {
    return (
      <div>
        <h3>Results:</h3>
        <ul>
          {editingPoll.options.map((option, index) => (
            <li key={index}>
              {option.text}: {option.votes} votes
            </li>
          ))}
        </ul>
      </div>


    );
  };
const [ques,setQues]=useState();
const [opt,setOpt]=useState();

  const handleSubmit =  (e) => {
    console.log(ques)
    e.preventDefault();
     axios.post('http://localhost:4500/register',{ques,opt})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
  };

  return (
    <div>
      <h2><u>Create Poll</u></h2>
      <div className='img-cont'>
    
      </div>
      <a href='/result'>Result </a>
        <div>
          <form onSubmit={handleSubmit}>
          <label htmlFor="question">Questions:</label>
          <input
            type="text"
            id="question"
            onChange={(e) => setQues(e.target.value)}
          />

          <label htmlFor="options">Options (comma-separated):</label>
          <input
            type="text"
            id="options"
            onChange={(e) => setOpt(e.target.value)}
          />

          <button type='submit'>
            
            Create Poll
          </button>
          </form>
        </div>
    
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default PollForm;


