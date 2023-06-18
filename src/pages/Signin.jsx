/* eslint-disable react/no-unescaped-entities */
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { TextField } from "formik-material-ui";
import { sendRQApiJson } from "../api/service";
import { useNavigate } from "react-router-dom";
import { localPut } from "../api/storage";

const FormFields = () => (
  <Box sx={{ mt: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Field
          component={TextField}
          name="email"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
        />
        <ErrorMessage name="email" component="div" />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <ErrorMessage name="password" component="div" />
      </Grid>
    </Grid>
  </Box>
);

const SignIn = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    try {
      const {token} = await sendRQApiJson("POST", "/api/auth", null, values);
      localPut("token", token);
      navigate("/dashboard");
    } catch (error) {
      console.error("API call failed: ", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormFields />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/signup" variant="body2">
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignIn;
