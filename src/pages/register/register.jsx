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

const RegisterPlayer = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      number: 0,
      position: 0,
      team: "ND",
      address: "",
      city: "",
      photoUrl: "",
      birthday: "",
      email: "",
      phone: "",
      social: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const onSubmit = (data) => console.log(data);
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
      <FormPaper title={"Registro"} handleSubmit={onSubmit} form={form}>
        <FormRow>
          <Field name={"firstName"} label={"Nombre"} required={true} />
          <Field name={"lastName"} label={"Apellido"} />
          <DateField name={"birthday"} label={"Fecha de nacimiento"} />
        </FormRow>
        <FormRow>
          <Field name={"number"} label={"Numero"} type={"number"} />
          <SelectField
            name={"position"}
            label={"Posición"}
            options={positions}
            default={0}
          />

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
        <FormRow>
          <Field name={"address"} label={"Dirección"} />
          <Field name={"city"} label={"Ciudad"} />
        </FormRow>
        <FormRow>
          <Field name={"email"} type={"email"} label={"Correo electrónico"} />
          <Field name={"phone"} type={"phone"} label={"Teléfono"} />
          <Field name={"social"} label={"Facebook"} />
        </FormRow>
        <FormRow>
          <Field name={"password"} label={"Contraseña"} type="password" />
          <Field
            name={"passwordConfirm"}
            label={"Confirma tu ontraseña"}
            type="password"
          />
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

export default RegisterPlayer;
