import React from "react";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase-config";

const AddDocument = () => {
  const ref = collection(db, "Players");
  const mutation = useFirestoreCollectionMutation(ref);

  return (
    <>
      <button
        disabled={mutation.isLoading}
        onClick={() => {
          mutation.mutate({ name: "test" });
        }}
      >
        Add document
      </button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </>
  );
};

export default AddDocument;
