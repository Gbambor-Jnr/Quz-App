import React from "react";
import classes from "./QuestionCard.module.css";

const Button: React.FC<{
  item: any;
  userAnswer: any;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  correct: boolean;
  userClicked: boolean;
}> = (props) => {
  return (
    <button
      className={`${
        props.correct ? classes.qcard__button : classes.qcard__but
      }`}
      disabled={props.userAnswer ? true : false}
      onClick={props.callback}
      value={props.item}
    >
      <span>{props.item}</span>
    </button>
  );
};

export default Button;
