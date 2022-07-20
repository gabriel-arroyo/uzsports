import React from "react";
import FormPaper from "../../components/form-paper/form-paper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";
import SelectField from "../../components/form-fields/select-field";
import FileField from "../../components/form-fields/file-field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
import { Collection } from "../../../database/collections";
import { auth } from "../../../database/firebase-config";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const RegisterCoach = () => {
  const register = new Collection("Coaches");
  const form = useForm({
    defaultValues: {
      user: "",
      team: "ND",
      experience: "",
      speciality: "",
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

  const teams = ["team 1", "team 2", "team3"];

  return (
    <>
      <FormPaper
        title={"Registro de Coach"}
        handleSubmit={onSubmit}
        form={form}
      >
        <FormRow>
          <Field name={"experience"} label={"Experiencia"} />
          <Field name={"speciality"} label={"Especialidad"} />
        </FormRow>
        <FormRow>
          <SelectField
            name={"team"}
            label={"Equipo"}
            options={teams}
            default={"ND"}
          />
        </FormRow>
        <FormRow center={true}>
          <FileField name={"photoUrl"} label={"Foto"} />
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

export default RegisterCoach;
