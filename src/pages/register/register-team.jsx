import React from "react";
import FormPaper from "../../components/form-paper/form-paper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";
import SelectField from "../../components/form-fields/select-field";
import FileField from "../../components/form-fields/file-field";
import DateField from "../../components/form-fields/date-field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
import { Collection } from "../../database/collections";
import { auth } from "../../database/firebase-config";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const RegisterTeam = () => {
  const register = new Collection("Teams");
  const form = useForm({
    defaultValues: {
      teamName: "",
      logoUrl: "",
      photoUrl: "",
      category: "ND",
      birthday: "",
      city: "",
      capitain: "",
      players: "ND",
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
  const jugadores = [
    { value: 1, label: "jugador 1" },
    { value: 2, label: "jugador 2" },
    { value: 3, label: "jugador 3" },
    { value: 4, label: "jugador 4" },
    { value: 5, label: "jugador 5" },
  ];
  const categories = [
    { value: 1, label: "categoria 1" },
    { value: 2, label: "categoria 2" },
    { value: 3, label: "categoria 3" },
  ];

  return (
    <>
      <FormPaper
        title={"Registro de Equipo"}
        handleSubmit={onSubmit}
        form={form}
      >
        <FormRow>
          <Field
            name={"teamName"}
            label={"Nombre del equipo"}
            required={true}
          />
          <SelectField
            name={"category"}
            label={"Categoría"}
            options={categories}
            default={"ND"}
          />
          <DateField name={"birthday"} label={"Fecha de nacimiento"} />
        </FormRow>

        <FormRow center={true}>
          <FileField name={"logoUrl"} label={"Logo"} />
          <FileField name={"photoUrl"} label={"Foto"} />
        </FormRow>
        <FormRow>
          <Field name={"city"} label={"Ciudad"} />
        </FormRow>
        <FormRow>
          <Field name={"capitain"} label={"Email del capitán"} />
          <SelectField
            name={"players"}
            label={"Jugadores"}
            options={jugadores}
            default={"ND"}
          />
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
            Si no haz registrado tu usuario, por favor
            <Link to={"/account/register"}> Regístrate</Link> primero
          </Typography>
        </FormFooter>
      </FormPaper>
    </>
  );
};

export default RegisterTeam;
