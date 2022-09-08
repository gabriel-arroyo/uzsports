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
import usePersistentContext from "../../hooks/usePersistentContext";

// Firebase
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { collection, doc, query, limit, where } from "firebase/firestore";
import { firestore } from "../../database/firebase";

const RegisterCoach = () => {
  const [uid] = usePersistentContext("uid");

  const [, setRoles] = usePersistentContext("roles");
  // Coaches
  const coachesCollection = collection(firestore, "Coaches");
  const coachesMutation = useFirestoreCollectionMutation(coachesCollection);

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
      team: "ND",
      experience: "",
      speciality: "",
      photoUrl: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    if (uid && docId) {
      coachesMutation.mutate({
        ...data,
        uid: uid,
        photoUrl: data.photoUrl[0]?.name ?? "",
      });
      const roles = new Set(user.roles);
      roles.add("coach");
      const newRoles = [...roles];
      userMutation.mutate({ ...user, roles: newRoles });
      setRoles(newRoles);
    }
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
            Si no haz registrado tu usuario, por favor
            <Link to={"/account/register"}> Regístrate</Link> primero
          </Typography>
        </FormFooter>
      </FormPaper>
    </>
  );
};

export default RegisterCoach;
