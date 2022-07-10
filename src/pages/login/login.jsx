import React from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import FormPaper from "../../components/form-paper/form-paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";

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
    <FormPaper title={"Login"} handleSubmit={handleSubmit(onSubmit)}>
      <div>
        <Field
          name={"username"}
          label={"Usuario"}
          register={register}
          errors={errors}
          required={true}
        />
      </div>
      <div>
        <Field
          name={"password"}
          label={"Contraseña"}
          register={register}
          type="password"
          errors={errors}
          required={true}
        />
      </div>
      <Button type="submit" variant="contained">
        Login
      </Button>
      <Typography mt={1} variant="body1">
        ¿No tienes cuenta?
        <Link to={"/account/register"}> Regístrate</Link>
      </Typography>
    </FormPaper>
  );
};

export default Login;
