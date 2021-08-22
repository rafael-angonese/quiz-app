import { createContext, ReactNode, useEffect, useState } from "react";

import { IQuestions } from "../types/index";

type QuestionsContextType = {
  questions: IQuestions[];
  addQuestions: (questions: IQuestions[]) => void;
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
  const [quantityQuestions, setQuantityQuestions] = useState<number>(3);
  const [questions, setQuestions] = useState<IQuestions[]>([]);

  useEffect(() => {
    async function getStoragedQuestions() {
      try {
        const storagedQuestions = await JSON.parse(
          localStorage.getItem("questions") || "[]"
        );

        setQuestions(storagedQuestions.questions);
      } catch (e) {
        console.log(e);
      }
    }
    getStoragedQuestions();
  }, []);

  const addQuestions = async (questions: IQuestions[]) => {
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
