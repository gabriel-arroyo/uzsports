import React, { createContext } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export const FormContext = createContext({});

const FormPaper = (props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        m: "5%",
        p: 2,
        width: "90%",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{ textAlign: "center", mt: 5, mb: 0 }}
      >
        {props.title}
      </Typography>
      <Box
        component="form"
        sx={{
          m: "5%",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          "& .MuiTextField-root": { m: 1, color: "#D00" },
          "& .MuiButton-root[type=submit]": {
            maxWidth: "250px",
            mt: 3,
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={props.form.handleSubmit(props.handleSubmit)}
      >
        <FormContext.Provider value={props.form}>
          {props.children}
        </FormContext.Provider>
      </Box>
    </Paper>
  );
};

export default FormPaper;

FormPaper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  handleSubmit: PropTypes.func,
  form: PropTypes.object.isRequired,
};
