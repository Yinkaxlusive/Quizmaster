import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch the list of quizzes from the backend
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get('/api/quizzes');
        setQuizzes(res.data);
      } catch (err) {
        console.error('Error fetching quizzes', err);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Available Quizzes</h2>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz._id}>
            <Link to={`/quiz/${quiz._id}`}>
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
