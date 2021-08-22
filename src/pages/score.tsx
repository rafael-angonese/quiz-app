import type { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";

import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
  FormControl,
  RadioGroup,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useQuestionsContext } from "../hooks/useQuestions";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  success: {
    color: theme.palette.success.main,
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const Quiz: NextPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const { questions } = useQuestionsContext();

  return (
    <>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h1" component="h2" align="center">
            Quick Quiz App
          </Typography>

          <Box textAlign="center" p={2}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => router.push("/")}
                >
                  Home
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          {questions &&
            questions.length > 0 &&
            questions.map((item) => {
              return (
                <div key={item.question}>
                  <h1
                    style={{
                      color: `${
                        item.correct_answer === item.user_answer
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }`,
                    }}
                  >
                    {item.question}
                  </h1>
                  <p>Category: {item.category}</p>
                  <p>Difficulty: {item.difficulty}</p>

                  <Box paddingBottom={2}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name="user_answer"
                        defaultValue={item.user_answer}
                      >
                        {item.answers.map((item) => {
                          return (
                            <FormControlLabel
                              disabled
                              value={item}
                              key={item}
                              control={<Radio />}
                              label={item}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box paddingBottom={2}>
                    {item.correct_answer === item.user_answer && (
                      <p className={classes.success}>
                        Your answer: {item.user_answer}
                      </p>
                    )}
                    {item.correct_answer !== item.user_answer && (
                      <p>
                        Your answer:{" "}
                        <span className={classes.error}>
                          {item.user_answer}
                        </span>{" "}
                        and the correct answer is:{" "}
                        <span className={classes.success}>
                          {item.correct_answer}
                        </span>
                      </p>
                    )}
                  </Box>
                </div>
              );
            })}
        </Grid>
      </Grid>
    </>
  );
};

export default Quiz;
