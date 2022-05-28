import { shuffleArray } from "./Uilities";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] }; //this uses the type of Question and then adds the answer property to it
// const api="https://opentdb.com/api.php?amount=10&type=multiple"

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`
  );
  const data = await response.json();

  return data.results.map((question: Question) => {
    return {
      ...question,
      //   answers: [...question.incorrect_answers, question.correct_answer],
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    };
  });

  //   try {
  //     const response = await fetch("https://opentdb.com/api.php", {
  //       method: "POST",
  //       body: JSON.stringify({ amount: amount, difficulty: difficulty }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
};
