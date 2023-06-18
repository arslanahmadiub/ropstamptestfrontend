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
import { Select, MenuItem } from "@mui/material";

const VehicialModel = ({ open, onClose, data, reCallVechical, categories }) => {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Required"),
    color: Yup.string().required("Required"),
    model: Yup.string().required("Required"),
    make: Yup.string().required("Required"),
    registrationNumber: Yup.string().required("Required"),
  });

  const [initialValues, setInitialValues] = useState({
    category: "",
    color: "",
    model: "",
    make: "",
    registrationNumber: "",
  });



  useEffect(() => {
    if (data) {
      setInitialValues({
        category: data.category._id || "",
        color: data.color || "",
        model: data.model || "",
        make: data.make || "",
        registrationNumber: data.registrationNumber || "",
      });
    } else {
      setInitialValues({
        category: "",
        color: "",
        model: "",
        make: "",
        registrationNumber: "",
      });
    }
  }, [data]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(false);

    if (data && data._id) {
      try {
        await sendRQApiJson(
          "PUT",
          `/api/vehical/${data._id}`,
          localGet("token"),
          values
        );
        reCallVechical();
        onClose();
      } catch (error) {
        console.error("API call failed: ", error);
      }
    } else {
      try {
        console.log("Values", values);
        await sendRQApiJson(
          "POST",
          "/api/create-vehical",
          localGet("token"),
          values
        );
        reCallVechical();
        onClose();
      } catch (error) {
        console.error("API call failed: ", error);
      }
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Vehicle Modal</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <Field
                name="category"
                as={Select}
                fullWidth
                required
                value={values.category}
                onChange={(event) =>
                  setFieldValue("category", event.target.value)
                }
                label="Category"
                style={{ margin: "10px" }}
              >
                {categories.map((category) => (
                  <MenuItem value={category._id} key={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Field>

              <Field
                component={TextField}
                name="color"
                required
                fullWidth
                id="color"
                label="Color"
                style={{ margin: "10px" }}
              />
              <Field
                component={TextField}
                name="model"
                required
                fullWidth
                id="model"
                label="Model"
                style={{ margin: "10px" }}
              />
              <Field
                component={TextField}
                name="make"
                required
                fullWidth
                id="make"
                label="Make"
                style={{ margin: "10px" }}
              />
              <Field
                component={TextField}
                name="registrationNumber"
                required
                fullWidth
                id="registrationNumber"
                label="Registration Number"
                style={{ margin: "10px" }}
              />
              <ErrorMessage name="category" component="div" />
              <ErrorMessage name="color" component="div" />
              <ErrorMessage name="model" component="div" />
              <ErrorMessage name="make" component="div" />
              <ErrorMessage name="registrationNumber" component="div" />

              <DialogActions sx={{ p: "1.25rem" }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {data ? "Update Vehicial" : "Create new Vehicial"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default VehicialModel;
