import React from "react";
import { Collection } from "../../database/collections";

const DeleteDocument = () => {
  const players = new Collection("Players");
  const deletion = players.deleteMutation("02mZXDqEp5bop4yvu1cJ");

  return (
    <>
      <button
        onClick={() => {
          deletion.mutate();
        }}
      >
        Delete Docuent
      </button>
      {deletion.isError && <p>{deletion.error.message}</p>}
    </>
  );
};

export default DeleteDocument;
