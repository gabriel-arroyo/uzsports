import React from "react";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import FormPaper from "../../components/form-paper/form-paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
import { useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth } from "../../database/firebase";
import usePersistentContext from "../../hooks/usePersistentContext";
// import { useQueryClient } from "react-query";

const Login = () => {
  const [, setUID] = usePersistentContext("uid");
  const [error, setError] = React.useState("");

  // const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);

    mutation.mutate(data);
  };

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onSuccess(user) {
      if (user) {
        const uid = user.user.uid;
        console.log("User is authenticated!", user);
        setUID(uid);
        console.log("uid:", uid);
        // queryClient.invalidateQueries(["uid"]);

        setError("");
      }
    },
    onError(error) {
      console.log("Error signing in", error);
      setError(
        error.message.includes("wrong-password")
          ? "Contrasena incorrecta"
          : error.message
      );
      if (error.message.includes("wrong-password")) {
        form.resetField("password");
      } else {
        form.reset();
      }
    },
  });

  return (
    <FormPaper title={"Login"} handleSubmit={onSubmit} form={form}>
      <FormRow center={true}>
        <Field name={"email"} label={"Email"} required={true} />
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
        {error && (
          <Alert sx={{ mt: "20px" }} severity="error">
            {error}
          </Alert>
        )}
        <Button type="submit" variant="contained">
          Login
        </Button>
        {mutation.isError && <p>{mutation.error.message}</p>}
        <Typography mt={1} variant="body1">
          ¿No tienes cuenta?
          <Link to={"/account/register"}> Regístrate</Link>
        </Typography>
      </FormFooter>
    </FormPaper>
  );
};

export default Login;
