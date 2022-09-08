import React from "react";
// import usePersistentContext from "../../hooks/usePersistentContext";
import { collection, doc, query, limit, where } from "firebase/firestore";
import {
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";
import { firestore } from "../../database/firebase";
import PropTypes from "prop-types";

const Tester = () => {
  // const [uid2] = usePersistentContext("uid");
  const uid = "0pP6nirR3UTCdk4p8hIqLLFjQfs2";
  const fbcollection = collection(firestore, "Users");
  const ref = doc(fbcollection, uid);
  const mutation = useFirestoreDocumentMutation(ref, { merge: true });

  if (!uid) return <div>Loading...</div>;

  return (
    <>
      <Fetcher uid={uid} />
      <button
        disabled={mutation.isLoading}
        onClick={() => {
          mutation.mutate({
            name: "New product!1",
            price: 20,
          });
        }}
      >
        Set document
      </button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </>
  );
};

export default Tester;

const Fetcher = ({ uid }) => {
  console.log("id", uid);
  const ref = query(
    collection(firestore, "Users"),
    limit(1),
    where("uid", "==", uid)
  );

  const data = useFirestoreQuery(["Users"], ref);

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  const snapshot = data.data;
  const doc = snapshot.docs[0];
  const user = doc.data();

  return (
    <div key={doc.id}>
      {user.email} {doc.id}
    </div>
  );
};

Fetcher.propTypes = {
  uid: PropTypes.string.isRequired,
};
