import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./components/API";
import { Difficulty } from "./components/API";
import { QuestionState } from "./components/API";

const TOTAL__QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setgameOver] = useState(true);
  const [finished, setFinished] = useState<boolean>(false);
  // console.log(fetchQuizQuestions(TOTAL__QUESTIONS, Difficulty.EASY));

  const startTrivia = async () => {
    setLoading(true);
    setgameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL__QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  console.log(questions);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      //check answer against the correct answer

      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct
      if (correct) {
        setFinished(true);
        setScore((prevState) => prevState + 1);
      }
      //save answer in the array for user answer
      const answerObj = {
        question: questions[number].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prevState) => {
        return [...prevState, answerObj];
      });
    }
  };
  console.log(userAnswer);

  const nextQuestion = () => {
    //move onto the next question if no the last one

    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL__QUESTIONS) {
      setgameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div className="App">
      <h1>React QUIZ</h1>{" "}
      {gameOver || userAnswer.length === TOTAL__QUESTIONS ? (
        <button onClick={startTrivia} className="start">
          Start
        </button>
      ) : null}
      {!gameOver && <p className="score">Score:{score}</p>}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL__QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
          isFinished={finished}
        />
      )}
      {!gameOver &&
        // !loading &&
        userAnswer.length === number + 1 &&
        number !== TOTAL__QUESTIONS - 1 && (
          <button onClick={nextQuestion} className="next">
            Next Question
          </button>
        )}
    </div>
  );
};

export default App;
