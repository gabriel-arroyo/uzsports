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

const RegisterPlayer = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      <FormPaper title={"Registro"} handleSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field
            name={"firstName"}
            label={"Nombre"}
            register={register}
            errors={errors}
            required={true}
          />
          <Field
            name={"lastName"}
            label={"Apellido"}
            register={register}
            errors={errors}
          />

          <SelectField
            name={"position"}
            label={"Posición"}
            watch={watch}
            register={register}
            errors={errors}
            options={positions}
            default={0}
          />

          <SelectField
            name={"team"}
            label={"Equipo"}
            watch={watch}
            register={register}
            errors={errors}
            options={teams}
            default={"ND"}
          />
        </div>
        <div>
          <DateField
            name={"birthday"}
            label={"Fecha de nacimiento"}
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <FileField
            name={"photoUrl"}
            label={"Foto"}
            watch={watch}
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <Field
            name={"address"}
            label={"Dirección"}
            register={register}
            errors={errors}
          />
          <Field
            name={"city"}
            label={"Ciudad"}
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <Field
            name={"email"}
            type={"email"}
            label={"Correo electrónico"}
            register={register}
            errors={errors}
          />
          <Field
            name={"phone"}
            type={"phone"}
            label={"Teléfono"}
            register={register}
            errors={errors}
          />
          <Field
            name={"social"}
            label={"Facebook"}
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <Field
            name={"password"}
            label={"Contraseña"}
            register={register}
            type="password"
            errors={errors}
          />
          <Field
            name={"passwordConfirm"}
            label={"Confirma tu ontraseña"}
            register={register}
            type="password"
            errors={errors}
            watch={watch}
          />
        </div>
        <Button type="submit" variant="contained">
          Registrar
        </Button>
        <Typography mt={1} variant="body1">
          ¿Ya te haz registrado?
          <Link to={"/account/login"}> Ingresa con tu cuenta</Link>
        </Typography>
      </FormPaper>
    </>
  );
};

export default RegisterPlayer;
