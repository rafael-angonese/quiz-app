import type { NextPage } from "next";
import Link from "next/link";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { useQuestionsContext } from "../hooks/useQuestions";

const Home: NextPage = () => {
  const { quantityQuestions, setQuantityQuestions } = useQuestionsContext();

  return (
    <>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h1" component="h2" align="center">
            Quick Quiz App
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8} md={4} lg={4} xl={4}>
          <TextField
            label="Number of questions"
            type="number"
            variant="outlined"
            fullWidth
            value={quantityQuestions}
            onChange={(e) => {
              setQuantityQuestions(Number(e.target.value));
            }}
          />
        </Grid>
      </Grid>

      <Box textAlign="center" p={5}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <Link href="/quiz">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
              >
                Start
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
