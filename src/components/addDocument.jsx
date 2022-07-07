import React from "react";
import { Collection } from "../../database/collections";

const AddDocument = () => {
  const players = new Collection("Players");
  const mutation = players.mutation();
  return (
    <>
      <button
        disabled={mutation.isLoading}
        onClick={() => {
          mutation.mutate({ name: "testasdf" });
        }}
      >
        Add document
      </button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </>
  );
};

export default AddDocument;
