import React from "react";
import { collection, doc } from "firebase/firestore";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { db } from "../../firebase-config";

const SetDocument = () => {
  const coll = collection(db, "Players");
  const ref = doc(coll, "J8C4tUZL8ZX5rB17WuqQ");
  const mutation = useFirestoreDocumentMutation(ref, { merge: true });

  return (
    <>
      <button
        disabled={mutation.isLoading}
        onClick={() => {
          mutation.mutate({ name: "test", address: "bbb" });
        }}
      >
        Set Docuent
      </button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </>
  );
};

export default SetDocument;
