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
import usePersistentContext from "../../hooks/usePersistentContext";

// Firebase
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { collection, doc, query, limit, where } from "firebase/firestore";
import { firestore } from "../../database/firebase";

const RegisterPlayer = () => {
  const [uid] = usePersistentContext("uid");
  const [, setRoles] = usePersistentContext("roles");
  // Players
  const playersCollection = collection(firestore, "Players");
  const playersMutation = useFirestoreCollectionMutation(playersCollection);

  // Teams
  const teamsCollection = collection(firestore, "Teams");
  const teamsRef = query(teamsCollection);
  const teamsQuery = useFirestoreQuery(["Teams"], teamsRef);

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
      number: 0,
      position: 0,
      team: "ND",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    if (uid && docId) {
      playersMutation.mutate({ ...data, uid: uid });
      const roles = new Set(user.roles);
      roles.add("player");
      const newRoles = [...roles];
      userMutation.mutate({ ...user, roles: newRoles });
      setRoles(newRoles);
      console.log(user);
    }
  };
  const positions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  if (playersMutation.isSuccess) {
    return (
      <div>
        <Typography variant="h4">Jugador Registrado</Typography>
        <Link to="/">Regresar</Link>
      </div>
    );
  }
  if (teamsQuery.isLoading) {
    return <div>Loading teams...</div>;
  }
  const teams = [];
  // teamsQuery.data.docs.map((docSnapshot) => {
  //   const data = docSnapshot.data();
  //   teams.push(data.teamName);
  // });
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
