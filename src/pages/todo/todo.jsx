import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentDeletion,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { firestore } from "../../database/firebase";
import FormRow from "../../components/form-fields/form-row";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Box, Button, Container, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";

const ToDoList = () => {
  const ref = collection(firestore, "ToDo");
  const query = useFirestoreQuery(["ToDo"], ref, {
    subscribe: true,
  });

  if (query.isLoading || query.isIdle || !query.data) {
    return <div>Loading...</div>;
  }

  const snapshot = query.data;

  return (
    <Paper
      elevation={3}
      sx={{
        m: "5%",
        p: 2,
        width: "90%",
      }}
    >
      <Container>
        {snapshot.docs
          .sort((a, b) => b.data().done - a.data().done)
          .map((doc) => {
            const data = doc.data();
            return (
              <ToDo
                key={doc.id}
                id={doc.id}
                taskId={doc.id}
                task={data.task}
                comment={data.comment}
                done={data.done}
              />
            );
          })}

        <NewToDo />
        {query.isError && <p>{query.error.message}</p>}
      </Container>
    </Paper>
  );
};

export default ToDoList;

const ToDo = ({ taskId, task, comment, done }) => {
  const ref = collection(firestore, "ToDo");
  const docRef = doc(ref, taskId);
  const updateMutation = useFirestoreDocumentMutation(docRef, { merge: true });
  const removeMutation = useFirestoreDocumentDeletion(docRef);
  const update = (done) => {
    updateMutation.mutate({
      done: !done,
    });
  };

  return (
    <>
      <FormRow wrap={false}>
        <FormControlLabel
          control={<Checkbox checked={done} />}
          label={task}
          onChange={() => {
            update(done);
          }}
        />
        <p>{comment}</p>
        <IconButton
          color="primary"
          aria-label="add task"
          component="label"
          onClick={() => removeMutation.mutate()}
        >
          <DeleteIcon />
        </IconButton>
      </FormRow>
    </>
  );
};

ToDo.propTypes = {
  task: PropTypes.string,
  comment: PropTypes.string,
  done: PropTypes.bool,
  taskId: PropTypes.string.isRequired,
};

const NewToDo = () => {
  const form = useForm({
    defaultValues: {
      task: "",
      comment: "",
      done: false,
    },
  });
  const {
    register,
    formState: { errors },
  } = form;

  const ref = collection(firestore, "ToDo");
  const mutation = useFirestoreCollectionMutation(ref);
  const addTask = (event) => {
    event.preventDefault();

    mutation.mutate({
      ...form.getValues(),
    });
    form.reset();
  };
  return (
    <Box component="form" autoComplete="off" onSubmit={addTask}>
      <TextField
        variant="standard"
        type="text"
        label="Tarea"
        error={errors && errors["task"] ? true : false}
        helperText={errors && errors["task"] ? errors["task"].message : ""}
        {...register("task", {
          required: true,
        })}
      />
      <TextField
        variant="standard"
        type="text"
        label="Comentario"
        error={errors && errors["comment"] ? true : false}
        helperText={
          errors && errors["comment"] ? errors["comment"].message : ""
        }
        {...register("comment", {
          required: false,
        })}
      />
      <Button type="submit" variant="standard">
        <SendIcon />
      </Button>
    </Box>
  );
};
