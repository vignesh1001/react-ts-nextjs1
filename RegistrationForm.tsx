import React from "react";
import Button from "@material-ui/core/Button";
import Textfield from "../formfields/Textfield";
import FileField from "../formfields/FileField";
import { DialogActions, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import axios from "axios";

export default function CreateCandidateForm(props) {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    resumes: [],
  };

  const validationSchema = yup.object({
    name: yup.string("Enter a name").required("Name is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    phone: yup
      .string("Enter your phone number")
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g)
      .required("Phone is required"),
  });

  const handleClose = (formikProps) => {
    console.log(formikProps);
    formikProps.resetForm();
    props.handleClose();
  };

  const onSubmit = (values, actions) => {
    const candidateInfo = { ...values };
    delete candidateInfo.resumes;

    axios
      .post("http://localhost:3030/candidates", candidateInfo)
      .then((response) => {
        if (values.resumes.length > 0) {
          let formData = new FormData();

          for (let x = 0; x < values.resumes.length; x++) {
            formData.append("resumes", values.resumes[x]);
          }

          return axios.post(
            `http://localhost:3030/candidates/${response.data.id}/resumes`,
            formData,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          );
        } else {
          return false;
        }
      })
      .then((response) => {
        console.log("Resumes submitted", response);
        actions.setSubmitting(false);
        props.handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikProps) => {
        return (
          <form onSubmit={formikProps.handleSubmit}>
            <Textfield
              autoFocus={true}
              id="name"
              name="name"
              label="Name"
              fullWidth
              required
            />
            <Textfield
              id="email"
              name="email"
              label="Email"
              fullWidth
              required
            />
            <Textfield
              id="phone"
              name="phone"
              label="Phone"
              fullWidth
              required
            />
            <FileField
              accept=".pdf,.docx,.doc"
              id="resumes"
              name="resumes"
              label="Upload Resumes"
              type="file"
              multiple
            />
            <Box mx={-3} mb={-1} mt={1}>
              <DialogActions>
                <Button
                  onClick={() => handleClose(formikProps)}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={!formikProps.isValid && formikProps.isSubmitting}
                  onClick={formikProps.onSubmit}
                >
                  Submit
                </Button>
              </DialogActions>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
}

CreateCandidateForm.defaultProps = {
  handleClose: () => {},
};

CreateCandidateForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
