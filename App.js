import React, { useState, useEffect } from 'react';
import PollList from './PollList';
import PollForm from './PollForm';

import './App.css';
import axios from 'axios';

const App = () => {
  
  const initialPolls = JSON.parse(localStorage.getItem('polls')) || [
    { id: 1, question: 'Favorite Programming Language?', options: ['JavaScript', 'Python', 'Java'], voted: false },
    { id: 2, question: 'Best Frontend Framework?', options: ['React', 'Angular', 'Vue'], voted: false },
  ];

  const [polls, setPolls] = useState(initialPolls);
  const [editingPoll, setEditingPoll] = useState(null);

  useEffect(() => {
    
    axios.get('http://localhost:5000/polls')
      .then(response => setPolls(response.data))
      .catch(error => console.error('Error fetching polls:', error));
  }, []); 

  useEffect(() => {
    
    localStorage.setItem('polls', JSON.stringify(polls));
  }, [polls]);

  const createPoll = (newPoll) => {
    setPolls([...polls, { ...newPoll, id: polls.length + 1 }]);
    setEditingPoll(null);
  };

  const editPoll = (poll) => {
    setEditingPoll(poll);
  };

  const updatePoll = (updatedPoll) => {
    const updatedPolls = polls.map((p) => (p.id === updatedPoll.id ? updatedPoll : p));
    setPolls(updatedPolls);
    setEditingPoll(null);
  };

  const vote = (pollId, optionIndex) => {
    const updatedPolls = polls.map((poll) =>
      poll.id === pollId
        ? {
            ...poll,
            options: poll.options.map((option, index) =>
              index === optionIndex ? { ...option, votes: option.votes + 1 } : option
            ),
            voted: true,
          }
        : poll
    );
    setPolls(updatedPolls);
  };

  const deletePoll = (pollId) => {
    const updatedPolls = polls.filter((poll) => poll.id !== pollId);
    setPolls(updatedPolls);
  };

  return (
    <>
    <div className="container">
      <h1><u>Polling App</u></h1>
      <PollList polls={polls} onEdit={editPoll} onVote={vote} onDelete={deletePoll} />
      <PollForm
        editingPoll={editingPoll}
        onCreate={createPoll}
        onUpdate={updatePoll}
        onCancel={() => setEditingPoll(null)}
      />
    </div>
  
    </>
  );
};

export default App;






