import { createContext, ReactNode, useEffect, useState } from "react";

type questionsProps = {
  category: number;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  user_answer: string;
};

type QuestionsContextType = {
  questions: questionsProps[];
  addQuestions: (questions: questionsProps[]) => void;
  quantityQuestions: number;
  setQuantityQuestions: (value: number) => void;
};

type QuestionContextProviderProps = {
  children: ReactNode;
};

export const QuestionsContext = createContext<QuestionsContextType>(
  {} as QuestionsContextType
);

export function QuestionContextProvider(
  props: QuestionContextProviderProps
): JSX.Element {
  const [quantityQuestions, setQuantityQuestions] = useState<number>(1);
  const [questions, setQuestions] = useState<questionsProps[]>([]);

  useEffect(() => {
    async function getStoragedPokemons() {
      try {
        const storagedPokemons = await JSON.parse(
          localStorage.getItem("questions") || "[]"
        );

        setQuestions(storagedPokemons);
      } catch (e) {
        console.log(e);
      }
    }
    getStoragedPokemons();
  }, []);

  const addQuestions = async (questions: questionsProps[]) => {
    localStorage.setItem("questions", JSON.stringify(questions));
    setQuestions(questions);
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        addQuestions,
        quantityQuestions,
        setQuantityQuestions,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  );
}
