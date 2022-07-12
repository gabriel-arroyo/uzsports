import React from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import FormPaper from "../../components/form-paper/form-paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
import { Collection } from "../../../database/collections";

const Login = () => {
  const login = new Collection("Login");
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    login.insert(data);
  };
  console.log(login.mutation.isError);
  return (
    <FormPaper title={"Login"} handleSubmit={onSubmit} form={form}>
      <FormRow center={true}>
        <Field name={"username"} label={"Usuario"} required={true} />
      </FormRow>
      <FormRow center={true}>
        <Field
          name={"password"}
          label={"Contraseña"}
          type="password"
          required={true}
        />
      </FormRow>
      <FormFooter>
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Typography mt={1} variant="body1">
          ¿No tienes cuenta?
          <Link to={"/account/register"}> Regístrate</Link>
        </Typography>
      </FormFooter>
    </FormPaper>
  );
};

export default Login;
