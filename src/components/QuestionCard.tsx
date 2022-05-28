import React from "react";
import { AnswerObject } from "../../src/App";
import classes from "./QuestionCard.module.css";
import Button from "./Button";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
  isFinished: boolean;
};

const QuestionCard: React.FC<Props> = (props) => {
  return (
    <div className={classes.qcard__div}>
      <p className="number">
        Question:{props.questionNr}/{props.totalQuestions}
      </p>
      <p
        dangerouslySetInnerHTML={{ __html: props.question }}
        className={classes.qcard__question}
      />
      {/* <p>{props.question}</p> */}
      <div className={classes.qcard__div_div}>
        {props.answers.map((answer) => {
          return (
            <div key={Math.random()}>
              {/* <button
                disabled={props.userAnswer ? true : false}
                onClick={props.callback}
                value={answer} */}
              {/* // correct={props.userAnswer?.correctAnswer === answer}
                // userClicked={props.userAnswer?.answer}
                className={`${classes.qcard__button}`} */}
              {/* > */}
              {/* <span dangerouslySetInnerHTML={{ __html: answer }} />
                <span>{answer}</span>
                {/* <button disabled={props.userAnswer} onClick={props.callback}>
              <span>{answer}</span> */}
              {/* </button> */}

              <Button
                item={answer}
                userAnswer={props.userAnswer}
                callback={props.callback}
                correct={props.userAnswer?.correctAnswer === answer}
                userClicked={props.userAnswer?.answer === answer}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
