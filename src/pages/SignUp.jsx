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

const FormFields = () => (
  <Box sx={{ mt: 3 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Field
          component={TextField}
          autoComplete="given-name"
          name="name"
          required
          fullWidth
          id="name"
          label="Name"
          autoFocus
        />
        <ErrorMessage name="name" component="div" />
      </Grid>
      <Grid item xs={12}>
        <Field
          component={TextField}
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <ErrorMessage name="email" component="div" />
      </Grid>
    </Grid>
  </Box>
);

const SignUp = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    try {
      await sendRQApiJson("POST", "/api/register", null, values);
      navigate("/")
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
          Sign up
        </Typography>
        <Formik
          initialValues={{ name: "", email: "" }}
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
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

export default SignUp;
