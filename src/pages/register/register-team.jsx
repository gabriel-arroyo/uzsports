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
import usePersistentContext from "../../hooks/usePersistentContext";

// Firebase
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { collection, doc, query, limit, where } from "firebase/firestore";
import { firestore } from "../../database/firebase";

const RegisterTeam = () => {
  const [uid] = usePersistentContext("uid");

  const [, setRoles] = usePersistentContext("roles");
  // Teams
  const teamsCollection = collection(firestore, "Teams");
  const teamsMutation = useFirestoreCollectionMutation(teamsCollection);

  // Categories
  const categoriesCollection = collection(firestore, "Categories");
  const categoriesRef = query(categoriesCollection);
  const categoriesQuery = useFirestoreQuery(["Categories"], categoriesRef);
  // SubCategories

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
      teamName: "",
      logoUrl: "",
      photoUrl: "",
      category: "ND",
      subCategory: "ND",
      age: "ND",
      birthday: "",
      city: "",
      players: "ND",
      social: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    if (uid && docId) {
      teamsMutation.mutate({
        ...data,
        uid: uid,
        capitain: uid,
        photoUrl: data.photoUrl[0]?.name ?? "",
        logoUrl: data.logoUrl[0]?.name ?? "",
      });
      const roles = new Set(user.roles);
      roles.add("capitain");
      const newRoles = [...roles];
      userMutation.mutate({ ...user, roles: newRoles });
      setRoles(newRoles);
      console.log(user);
    }
  };
  const jugadores = [
    { value: 1, label: "jugador 1" },
    { value: 2, label: "jugador 2" },
    { value: 3, label: "jugador 3" },
    { value: 4, label: "jugador 4" },
    { value: 5, label: "jugador 5" },
  ];
  const categories = [];
  const subCategories = ["A", "B"];
  const ages = ["98", "99", "00"];

  if (categoriesQuery.isLoading) {
    return <div>Loading categories...</div>;
  }
  return (
    <>
      {categoriesQuery.data.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        categories.push(data.name);
      })}
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
          <SelectField
            name={"subCategory"}
            label={"Sub Categoría"}
            options={subCategories}
            default={"ND"}
          />
          <SelectField
            name={"age"}
            label={"Rango de edades"}
            options={ages}
            default={"ND"}
          />
        </FormRow>
        <FormRow>
          <DateField name={"birthday"} label={"Fecha de nacimiento"} />
        </FormRow>
        <FormRow center={true}>
          <FileField name={"logoUrl"} label={"Logo"} />
          <FileField name={"photoUrl"} label={"Foto"} />
        </FormRow>
        <FormRow>
          <Field name={"city"} label={"Ciudad"} />
          <Field name={"social"} label={"Facebook"} />
        </FormRow>
        <FormRow>
          <SelectField
            name={"players"}
            label={"Jugadores"}
            options={jugadores}
            default={"ND"}
          />
        </FormRow>

        <FormFooter>
          <Typography variant="body2" color="text.secondary" align="center">
            El usuario que realiza el registro será considerado como capitán del
            equipo. Si desea nombrar un capitán diferente podrá hacerlo en la
            página de administración de su equipo.
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

export default RegisterTeam;
