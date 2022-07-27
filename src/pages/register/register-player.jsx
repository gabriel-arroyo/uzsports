import React from "react";
import FormPaper from "../../components/form-paper/form-paper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";
import SelectField from "../../components/form-fields/select-field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
import { Collection } from "../../database/collections";
import { auth } from "../../database/firebase-config";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const RegisterPlayer = () => {
  const register = new Collection("Players");
  const form = useForm({
    defaultValues: {
      number: 0,
      position: 0,
      team: "ND",
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
  const positions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];
  const teams = ["team 1", "team 2", "team3"];

  return (
    <>
      <FormPaper
        title={"Registro de Jugador"}
        handleSubmit={onSubmit}
        form={form}
      >
        <FormRow center>
          <Field name={"number"} label={"Numero"} type={"number"} />
        </FormRow>
        <FormRow center>
          <SelectField
            name={"position"}
            label={"Posición"}
            options={positions}
            default={0}
          />
        </FormRow>
        <FormRow center>
          <SelectField
            name={"team"}
            label={"Equipo"}
            options={teams}
            default={"ND"}
          />
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

export default RegisterPlayer;
