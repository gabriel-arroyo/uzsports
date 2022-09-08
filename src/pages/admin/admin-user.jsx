import React from "react";
import FormPaper from "../../components/form-paper/form-paper";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Field from "../../components/form-fields/field";
import FileField from "../../components/form-fields/file-field";
import FormFooter from "../../components/form-fields/form-footer";
import FormRow from "../../components/form-fields/form-row";
// import { Collection } from "../../database/collections";

// Firebase
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../../database/firebase";
import usePersistentContext from "../../hooks/usePersistentContext";
import FormColumn from "../../components/form-fields/form-column";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

// crear tab de administracion de usuarios para root
// dar permisos por ligas
// niveles admin
// general
// torneo
// arbitro -> score app
// coach / capitán / admin de equipo

// loggin facebook o gmail o microsoft

// error cuando ya exista

// detectar login
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
      phone: "", // verificar que no exista
      social: "",
      password: "",
      passwordConfirm: "",
      user: "", // ---------------agregar usuario y verificar que no exista  ----//
    },
  });

  if (!userStr || !uid) {
    return <div>Not logged in</div>;
  }
  const user = JSON.parse(userStr);
  console.log(user);

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
              setEdit={setEdit}
              value={user}
              name={"firstName"}
              label={"Nombre"}
            />
            <EditableField
              edit={edit}
              setEdit={setEdit}
              value={user}
              name={"lastName"}
              label={"Apellido"}
            />
            <EditableField
              edit={edit}
              setEdit={setEdit}
              value={user}
              name={"birthday"}
              label={"Fecha de nacimiento"}
              type="date"
            />
            <EditableField
              edit={edit}
              setEdit={setEdit}
              value={user}
              name={"address"}
              label={"Dirección"}
            />
            <EditableField
              edit={edit}
              setEdit={setEdit}
              value={user}
              name={"city"}
              label={"Ciudad"}
            />
            <EditableField
              edit={edit}
              setEdit={setEdit}
              value={user}
              name={"email"}
              label={"Correo electrónico"}
              type={"email"}
            />

            <EditableField
              edit={edit}
              setEdit={setEdit}
              value={user}
              name={"phone"}
              label={"Teléfono"}
              type={"phone"}
            />
            <EditableField
              edit={edit}
              setEdit={setEdit}
              value={user}
              name={"social"}
              label={"Facebook"}
            />
            <EditableField
              edit={edit}
              setEdit={setEdit}
              value={user}
              name={"password"}
              label={"Contraseña"}
              type={"password"}
            />
            <EditableField
              edit={edit}
              setEdit={setEdit}
              value={user}
              name={"passwordConfirm"}
              label={"Confirma tu contraseña"}
              type={"password"}
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

const EditButton = ({ edit, setEdit, name }) => {
  return (
    <Button
      variant={edit !== name ? "text" : "contained"}
      onClick={() => setEdit(name)}
    >
      {edit !== name ? "Editar" : "Guardar"}
    </Button>
  );
};

EditButton.propTypes = {
  edit: PropTypes.string.isRequired,
  setEdit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

const EditableField = ({ edit, setEdit, name, label, value, type }) => {
  return (
    <FormRow>
      <Field
        standard
        disabled={
          name === "passwordConfirm" ? edit !== "password" : edit !== name
        }
        name={name}
        label={label}
        required={true}
        value={name === "passwordConfirm" ? "" : value[name]}
        type={type}
      />
      {name !== "passwordConfirm" && (
        <EditButton edit={edit} setEdit={setEdit} name={name} />
      )}
    </FormRow>
  );
};

EditableField.propTypes = {
  edit: PropTypes.string.isRequired,
  setEdit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  type: PropTypes.string,
};

EditableField.defaultProps = {
  type: "text",
};
