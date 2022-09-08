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
import usePersistentContext from "../../hooks/usePersistentContext";

// Firebase
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { collection, doc, query, limit, where } from "firebase/firestore";
import { firestore } from "../../database/firebase";

const RegisterLeague = () => {
  const [uid] = usePersistentContext("uid");
  const [, setRoles] = usePersistentContext("roles");
  // Leagues
  const leaguesCollection = collection(firestore, "Leagues");
  const leaguesMutation = useFirestoreCollectionMutation(leaguesCollection);

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
    console.log("register", data);
    if (uid && docId) {
      leaguesMutation.mutate({
        ...data,
        uid: uid,
        photoUrl: data.photoUrl[0]?.name ?? "",
      });
      const roles = new Set(user.roles);
      roles.add("leagueAdmin");
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
      <FormPaper title={"Registro de Liga"} handleSubmit={onSubmit} form={form}>
        <FormRow>
          <Field name="leagueName" label="Nombre de la liga" required={true} />
          <Field name="description" label="Descripción" />
        </FormRow>

        <FormRow center={true}>
          <FileField name={"photoUrl"} label={"Foto"} />
        </FormRow>
        <FormRow>
          <Field name={"address"} label={"Dirección"} required={true} />
          <Field name={"city"} label={"Ciudad"} required={true} />
        </FormRow>
        <FormRow>
          <Field name={"email"} type={"email"} label={"Correo electrónico"} />
          <Field name={"phone"} type={"phone"} label={"Teléfono"} />
          <Field name={"social"} label={"Facebook"} />
        </FormRow>

        <FormFooter>
          <Typography variant="body2" color="text.secondary" align="center">
            El usuario que realiza el registro será considerado como responsable
            de la liga. Si desea nombrar un responsable diferente podrá hacerlo
            en la página de administración.
          </Typography>
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

export default RegisterLeague;
