import React from "react";
import FormPaper from "../../components/form-paper/form-paper";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import FileField from "../../components/form-fields/file-field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";

// Firebase
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../../database/firebase";
import usePersistentContext from "../../hooks/usePersistentContext";
import FormColumn from "../../components/form-fields/form-column";
import EditableField from "../../components/form-fields/editable-field";

const AdminUser = () => {
  // Users
  const ref = collection(firestore, "Users");
  const mutation = useFirestoreCollectionMutation(ref);

  const [uid] = usePersistentContext("uid");
  const [userStr] = usePersistentContext("user");
  const [error] = React.useState("");
  const [edit, setEdit] = React.useState("none");

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
    },
  });

  if (!userStr || !uid) {
    return <div>Not logged in</div>;
  }
  const user = JSON.parse(userStr);

  const onSubmit = (name) => {
    if (edit === name) {
      setEdit("none");
      console.log("edit", name);
    } else {
      setEdit(name);
    }
  };

  return (
    <>
      <FormPaper title={"Administrar perfil de Usuario"} form={form}>
        <FormRow wrap={false}>
          <FormColumn center>
            <img src="https://via.placeholder.com/250" alt="profile" />
            <FileField name={"photoUrl"} label={"Foto"} />
          </FormColumn>
          <FormColumn>
            <EditableField
              edit={edit}
              value={user}
              name={"firstName"}
              label={"Nombre"}
              handleSubmit={onSubmit}
            />
            <EditableField
              edit={edit}
              value={user}
              name={"lastName"}
              label={"Apellido"}
              handleSubmit={onSubmit}
            />
            <EditableField
              edit={edit}
              value={user}
              name={"birthday"}
              label={"Fecha de nacimiento"}
              type="date"
              handleSubmit={onSubmit}
              shrink={true}
            />
            <EditableField
              edit={edit}
              value={user}
              name={"address"}
              label={"Dirección"}
              handleSubmit={onSubmit}
            />
            <EditableField
              edit={edit}
              value={user}
              name={"city"}
              label={"Ciudad"}
              handleSubmit={onSubmit}
            />
            <EditableField
              edit={edit}
              value={user}
              name={"email"}
              label={"Correo electrónico"}
              type={"email"}
              handleSubmit={onSubmit}
            />

            <EditableField
              edit={edit}
              value={user}
              name={"phone"}
              label={"Teléfono"}
              type={"phone"}
              handleSubmit={onSubmit}
            />
            <EditableField
              edit={edit}
              value={user}
              name={"social"}
              label={"Facebook"}
              handleSubmit={onSubmit}
            />
            <EditableField
              edit={edit}
              value={user}
              name={"password"}
              label={"Contraseña"}
              type={"password"}
              handleSubmit={onSubmit}
            />
            <EditableField
              edit={edit}
              value={user}
              name={"passwordConfirm"}
              label={"Confirma tu contraseña"}
              type={"password"}
              handleSubmit={onSubmit}
            />
          </FormColumn>
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
        </FormFooter>
      </FormPaper>
    </>
  );
};

export default AdminUser;
