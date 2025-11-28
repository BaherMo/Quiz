import React, { useEffect, useState } from 'react';
import Quiz from './components/Quiz.jsx';
import Result from './components/Result.jsx';
import StartPage from './components/StartPage.jsx';

function App() {
  const [quizData, setQuizData] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/questions')
      .then((res) => res.json())
      .then((data) => setQuizData(data));
  }, []);

  const handleStart = () => {
    if (!userName.trim()) return;
    setStarted(true);
  };

  const handleAnswerClick = (answer) => {
    const updatedAnswers = [...userAnswers, answer];
    setUserAnswers(updatedAnswers);

    if (currentQ < quizData.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      submitAnswers(updatedAnswers);
    }
  };

  const submitAnswers = (answers) => {
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, answers }),
    })
      .then((res) => res.json())
      .then((data) => setScore(data));
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setUserAnswers([]);
    setScore(null);
    setStarted(false);
    setUserName('');
  };

  return (
    <div>
      {!started ? (
        <StartPage
          onStart={handleStart}
          name={userName}
          setName={setUserName}
        />
      ) : score !== null ? (
        <Result
          score={score.score}
          total={score.total}
          onRestart={handleRestart}
        />
      ) : quizData.length > 0 ? (
        <Quiz
          quizData={quizData}
          questionIndex={currentQ}
          handleAnswerClick={handleAnswerClick}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
