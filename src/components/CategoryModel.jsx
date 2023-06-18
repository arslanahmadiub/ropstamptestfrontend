/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { useEffect, useState } from "react";
import { sendRQApiJson } from "../api/service";
import { localGet } from "../api/storage";

const CategoryModel = ({ open, onClose, data, reCallCategory }) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
  });

  const [category, setCategory] = useState("");

  useEffect(() => {
    if (data) {

      setCategory(data.name);
    }
  }, [data]);



  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    if(data && data._id){
      try {
        await sendRQApiJson("PUT", `/api/update-categories/${data._id}`, localGet("token"), {
          name: values.category,
        });
        reCallCategory();
        onClose();
      } catch (error) {
        console.error("API call failed: ", error);
      }
    }
    else{
      try {
        await sendRQApiJson("POST", "/api/create-categories", localGet("token"), {
          name: values.category,
        });
        reCallCategory();
        onClose();
      } catch (error) {
        console.error("API call failed: ", error);
      }
    }

  
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Category Modal</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ category: category }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                component={TextField}
                name="category"
                required
                fullWidth
                id="category"
                label="Category"
              />
              <ErrorMessage name="category" component="div" />

              <DialogActions sx={{ p: "1.25rem" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Create new Cateory
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModel;
