import React from "react";
import FormPaper from "../../components/form-paper/form-paper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";
import FileField from "../../components/form-fields/file-field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
import { Collection } from "../../../database/collections";
import { auth } from "../../../database/firebase-config";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const RegisterLeague = () => {
  const register = new Collection("Leagues");
  const form = useForm({
    defaultValues: {
      leagueName: "",
      description: "",
      address: "",
      city: "",
      photoUrl: "",
      birthday: "",
      email: "",
      phone: "",
      social: "",
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
      <p>
        Actualmente no te encuetras logueado, ¿Ya tienes cuenta?{" "}
        <a href="/account/login">Login</a> (Pop up)
      </p>
      <FormPaper title={"Registro de Liga"} handleSubmit={onSubmit} form={form}>
        <FormRow>
          <Field name="leagueName" label="Nombre de la liga" required={true} />
          <Field name="description" label="Descripción" />
        </FormRow>

        <FormRow center={true}>
          <FileField name={"photoUrl"} label={"Foto"} />
        </FormRow>
        <FormRow>
          <Field name={"address"} label={"Dirección"} />
          <Field name={"city"} label={"Ciudad"} />
        </FormRow>
        <FormRow>
          <Field name={"email"} type={"email"} label={"Correo electrónico"} />
          <Field name={"phone"} type={"phone"} label={"Teléfono"} />
          <Field name={"social"} label={"Facebook"} />
        </FormRow>

        <FormFooter>
          <Button type="submit" variant="contained">
            Registrar
          </Button>
          <Typography mt={1} variant="body1">
            ¿Ya te haz registrado?
            <Link to={"/account/login"}> Ingresa con tu cuenta</Link>
          </Typography>
        </FormFooter>
      </FormPaper>
    </>
  );
};

export default RegisterLeague;
