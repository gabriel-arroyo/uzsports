import React from "react";
import FormPaper from "../../components/form-paper/form-paper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
import { Collection } from "../../../database/collections";
import { auth } from "../../../database/firebase-config";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const RegisterReferee = () => {
  const register = new Collection("Referees");
  const form = useForm({
    defaultValues: {
      experience: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((d) => {
        console.log("logged", d);
        register.insert({ ...data, uid: d.user.uid });
      })
      .catch((e) => console.log("error", e));
  };

  return (
    <>
      <FormPaper
        title={"Registro de Referee"}
        handleSubmit={onSubmit}
        form={form}
      >
        <FormRow center>
          <Field name={"experience"} label={"Experiencia"} />
        </FormRow>

        <FormFooter>
          <Button type="submit" variant="contained">
            Registrar
          </Button>
          <Typography mt={1} variant="body1">
            Si no haz registrado tu usuario, por favor
            <Link to={"/account/register"}> Regístrate</Link> primero
          </Typography>
        </FormFooter>
      </FormPaper>
    </>
  );
};

export default RegisterReferee;
