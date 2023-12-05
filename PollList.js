import React ,{useEffect , useState}from 'react';
import axios from 'axios'
const PollList = () => {
  return (
    <div>
      <h4>"Poll, Participate, Influence. Your opinion, your impact on the pulse of change."</h4>
      <Results/>
    </div>
  );
};

const Results = () => {
  const [students, setStudents] = useState();
 useEffect(() => {
       
		async function fetchData() {
			try {
				const response = await axios.get('http://localhost:4500/getusers');

				// const response =await instance({
				//   method:'get',
				//   url:"/getUsers/"
				// })
				setStudents(response.data);

			} catch (err) {
				console.error(err);
				
			}
		}

		fetchData();
	}, []);
  return (
  <div className="poll-content">
    <h4>  </h4>

  </div>
);
      }
const VotingOptions = ({ poll, onVote }) => (
  <div className="poll-content">
    <ul>
      {poll.options.map((option, index) => (
        <li key={index}>
          {option.text}{' '}
          <button onClick={() => onVote(poll.id, index)}>Vote</button>
        </li>
      ))}
    </ul>
  </div>
);

export default PollList;





