import React from "react";
import { collection, doc } from "firebase/firestore";
import { useFirestoreDocumentDeletion } from "@react-query-firebase/firestore";
import { db } from "../../firebase-config";

const DeleteDocument = () => {
  const coll = collection(db, "Players");
  const ref = doc(coll, "J8C4tUZL8ZX5rB17WuqQ");
  const mutation = useFirestoreDocumentDeletion(ref);

  return (
    <>
      <button
        disabled={mutation.isLoading}
        onClick={() => {
          mutation.mutate();
        }}
      >
        Set Docuent
      </button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </>
  );
};

export default DeleteDocument;
