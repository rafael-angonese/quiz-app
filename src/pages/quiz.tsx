import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@material-ui/core";
import { RadioGroup } from "formik-material-ui";
import { Field, FormikHelpers } from "formik";

import { IQuestions } from "../types/index";

import FormikStepper from "../components/FormikStepper";
import FormikStep from "../components/FormikStep";

import { useQuestionsContext } from "../hooks/useQuestions";

import axios from "../services/axios";
import router from "next/router";

const Quiz: NextPage = () => {
  const { quantityQuestions, addQuestions } = useQuestionsContext();
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState<IQuestions[]>([]);

  async function handleSubmit(
    data: IQuestions[],
    actions: FormikHelpers<any>
  ): Promise<void> {
    try {
      addQuestions(data);
      actions.setSubmitting(false);
      router.push("/score");
    } catch (error) {
      actions.setSubmitting(false);
    }
  }

  useEffect(() => {
    async function getQuestions() {
      setLoading(true);
      try {
        const response = await axios.get(`?amount=${quantityQuestions}`);

        const { results } = response.data;

        const newQuestions = results.map((item: IQuestions) => {
          let answers = item.incorrect_answers.concat(item.correct_answer);
          answers = answers.sort(() => Math.random() - 0.5);
          return {
            ...item,
            answers: answers,
            user_answer: "",
          };
        });

        setQuestions(newQuestions);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getQuestions();
  }, [quantityQuestions]);

  return (
    <>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h1" component="h2" align="center">
            Quick Quiz App
          </Typography>
        </Grid>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <FormikStepper
              initialValues={{
                questions: questions,
              }}
              onSubmit={(values, actions) => {
                const { questions } = values;
                handleSubmit(questions, actions);
              }}
            >
              {questions.map((item, index) => {
                return (
                  <FormikStep key={item.question} label="Personal Data">
                    <Box paddingBottom={2}>
                      <Field
                        component={RadioGroup}
                        name={`questions.${index}.user_answer`}
                      >
                        {item.answers.map((item) => {
                          return (
                            <FormControlLabel
                              value={item}
                              key={item}
                              control={<Radio />}
                              label={item}
                            />
                          );
                        })}
                      </Field>
                    </Box>
                  </FormikStep>
                );
              })}
            </FormikStepper>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Quiz;
