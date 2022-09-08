import React from "react";
import FormPaper from "../../components/form-paper/form-paper";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Field from "../../components/form-fields/field";
import FileField from "../../components/form-fields/file-field";
import DateField from "../../components/form-fields/date-field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
import TimeField from "../../components/form-fields/time-field";
import CheckboxField from "../../components/form-fields/checkbox-field";
import usePersistentContext from "../../hooks/usePersistentContext";

// Firebase
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { collection, doc, query, limit, where } from "firebase/firestore";
import { firestore } from "../../database/firebase";

const RegisterTournament = () => {
  const [uid] = usePersistentContext("uid");

  const [, setRoles] = usePersistentContext("roles");
  // Players
  const tournamentsCollection = collection(firestore, "Tournaments");
  const torunamentsMutation = useFirestoreCollectionMutation(
    tournamentsCollection
  );

  // Users
  const usersCollection = collection(firestore, "Users");
  const refUsersQuery = query(
    usersCollection,
    limit(1),
    where("uid", "==", uid)
  );
  const userQuery = useFirestoreQuery(["Users"], refUsersQuery, {
    enabled: !!uid,
  });

  const snapshot = userQuery.data;
  const document = snapshot.docs[0];
  const docId = document.id;
  const user = document.data();

  const usersRef = doc(usersCollection, docId);
  const userMutation = useFirestoreDocumentMutation(usersRef, {
    merge: true,
    enabled: !!docId,
  });

  const form = useForm({
    defaultValues: {
      tournamentName: "",
      description: "",
      startDate: "",
      endDate: "",
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      startTime: "",
      endTime: "",
      address: "",
      city: "",
      photoUrl: "",
      email: "",
      phone: "",
      social: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    if (uid && docId) {
      torunamentsMutation.mutate({
        ...data,
        uid: uid,
        photoUrl: data.photoUrl[0]?.name ?? "",
      });
      const roles = new Set(user.roles);
      roles.add("tournamentAdmin");
      const newRoles = [...roles];
      userMutation.mutate({ ...user, roles: newRoles });
      setRoles(newRoles);
      console.log(user);
    }
  };

  return (
    <>
      <p>
        Actualmente no te encuetras logueado, ¿Ya tienes cuenta?{" "}
        <a href="/account/login">Login</a> (Pop up)
      </p>
      <FormPaper
        title={"Registro de Torneo"}
        handleSubmit={onSubmit}
        form={form}
      >
        <FormRow>
          <Field name="tournamentName" label="Nombre del torneo" />
          <Field name="description" label="Descripción" />
        </FormRow>

        <FormRow>
          <p>Días de juego</p>
          <FormRow>
            <CheckboxField name={"monday"} label={"Lunes"} />
            <CheckboxField name={"tuesday"} label={"Martes"} />
            <CheckboxField name={"wednesday"} label={"Miercoles"} />
            <CheckboxField name={"thursday"} label={"Jueves"} />
            <CheckboxField name={"friday"} label={"Viernes"} />
            <CheckboxField name={"saturday"} label={"Sabado"} />
            <CheckboxField name={"sunday"} label={"Domingo"} />
          </FormRow>
        </FormRow>
        <FormRow>
          <DateField name="startDate" label="Fecha de inicio" />
          <DateField name="endDate" label="Fecha de fin" />
        </FormRow>
        <FormRow>
          <TimeField name="startTime" label="Hora de inicio" />
          <TimeField name="endTime" label="Hora de fin" />
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
            Si no haz registrado tu usuario, por favor
            <Link to={"/account/register"}> Regístrate</Link> primero
          </Typography>
        </FormFooter>
      </FormPaper>
    </>
  );
};

export default RegisterTournament;
