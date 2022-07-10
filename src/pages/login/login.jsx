import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);
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
        sx={{ textAlign: "center" }}
      >
        Login
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
          "& .MuiTextField-root": { m: 1 },
          "& .MuiButton-root": {
            maxWidth: "250px",
            m: 3,
          },
          "& div": {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <TextField
            error={errors.username ? true : false}
            label="Nombre de usuario"
            helperText={!errors.username ? "" : "Favor de colocar un nombre"}
            {...register("username", { required: true })}
          />
        </div>
        <div>
          <TextField
            error={errors.password ? true : false}
            label="Contraseña"
            type="password"
            helperText={!errors.password ? "" : "Favor de colocar un nombre"}
            {...register("password", { required: true })}
          />
        </div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
