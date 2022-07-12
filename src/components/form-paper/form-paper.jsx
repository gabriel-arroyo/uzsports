import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

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
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, color: "#D00" },
          "& .MuiButton-root[type=submit]": {
            maxWidth: "250px",
            mt: 3,
          },
          "& div": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={props.handleSubmit}
      >
        {props.children}
      </Box>
    </Paper>
  );
};

export default FormPaper;

FormPaper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  handleSubmit: PropTypes.func,
};
