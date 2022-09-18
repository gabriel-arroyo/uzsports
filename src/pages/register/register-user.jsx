import React from "react";
import FormPaper from "../../components/form-paper/form-paper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";
import SelectField from "../../components/form-fields/select-field";
import FileField from "../../components/form-fields/file-field";
import DateField from "../../components/form-fields/date-field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
// import { Collection } from "../../database/collections";

// Firebase
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../../database/firebase";
import { auth } from "../../database/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
} from "@firebase/auth";
import usePersistentContext from "../../hooks/usePersistentContext";

import "./register.css";

const RegisterUser = () => {
  const ref = collection(firestore, "Users");
  const mutation = useFirestoreCollectionMutation(ref);

  const [, setUID] = usePersistentContext("uid");
  const [, setUser] = usePersistentContext("user");
  const [error, setError] = React.useState("");

  const provider = new FacebookAuthProvider();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      photoUrl: "",
      birthday: "",
      email: "",
      phone: "",
      social: "",
      password: "",
      passwordConfirm: "",
      user: "",
      test: "",
      gender: "",
    },
  });

  const genders = [
    { label: "Hombre", value: "male" },
    { label: "Mujer", value: "female" },
  ];

  const signInWithFacebook = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const user = result.user;
        const displayName = user.displayName;
        const separated = displayName.split(" ");
        const facebookData = {
          firstName: separated[0],
          lastName: separated[1] ?? "",
          email: user.email,
          photoUrl: user.photoURL,
          phone: user.phoneNumber,
          uid: user.uid,
        };
        console.log(form.getValues());
        setUser({ ...form.getValues(), ...facebookData });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((d) => {
        console.log("logged", d);
        mutation.mutate({ ...data, uid: d.user.uid });
        setUID(d.user.uid);
        setUser(JSON.stringify(data));
        console.log("uid:", d.user.uid);
        setError("");
        form.reset();
      })
      .catch((e) => {
        console.log("error", e);
        setError(
          e.message.includes("email-already-in-use")
            ? "El email ya está en uso"
            : e.message
        );
      });
  };

  return (
    <>
      <FormPaper
        title={"Registro de Usuario"}
        handleSubmit={onSubmit}
        form={form}
      >
        <FormRow>
          <Field name={"firstName"} label={"Nombre"} required={true} />
          <Field name={"lastName"} label={"Apellido"} />
          <DateField name={"birthday"} label={"Fecha de nacimiento"} />
          <SelectField
            name={"gender"}
            label={"Género"}
            options={genders}
            default={0}
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
            label={"Confirma tu contraseña"}
            type="password"
          />
        </FormRow>
        <FormFooter>
          {error && (
            <Alert sx={{ mt: "20px" }} severity="error">
              {error}
            </Alert>
          )}
          {mutation.isError && (
            <Alert sx={{ mt: "20px" }} severity="error">
              {mutation.error.message}
            </Alert>
          )}
          <Button type="submit" variant="contained">
            Registrar
          </Button>
          <hr />
          <button
            className="loginBtn loginBtn--facebook"
            type="submit"
            onClick={signInWithFacebook}
          >
            Ingresa con Facebook
          </button>
          <Typography mt={1} variant="body1">
            ¿Ya te haz registrado?
            <Link to={"/account/login"}> Ingresa con tu cuenta</Link>
          </Typography>
        </FormFooter>
      </FormPaper>
    </>
  );
};

export default RegisterUser;
