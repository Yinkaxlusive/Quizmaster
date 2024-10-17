import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams(); // Get the quiz ID from the URL
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch the quiz by ID
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`/api/quizzes/${id}`);
        setQuiz(res.data);
      } catch (err) {
        console.error('Error fetching quiz', err);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers({ ...userAnswers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`/api/quizzes/${id}/submit`, userAnswers);
      setResult(res.data);
    } catch (err) {
      console.error('Error submitting quiz', err);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      <form>
        {quiz.questions.map((question, index) => (
          <div key={question._id}>
            <h3>{index + 1}. {question.text}</h3>
            <ul>
              {question.options.map((option, i) => (
                <li key={i}>
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value={option}
                    onChange={() => handleAnswerChange(question._id, option)}
                  />
                  {option}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </form>
      <button onClick={handleSubmit}>Submit Quiz</button>
      {result && (
        <div>
          <h3>Your Result: {result.score} / {quiz.questions.length}</h3>
          <h4>Correct Answers:</h4>
          <ul>
            {quiz.questions.map(question => (
              <li key={question._id}>
                {question.text} - Correct answer: {question.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;
