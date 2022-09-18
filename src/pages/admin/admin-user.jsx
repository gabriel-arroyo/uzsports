import React from "react";
import PropTypes from "prop-types";
import usePersistentContext from "../../hooks/usePersistentContext";

import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { query as fbQuery, collection, limit, where } from "firebase/firestore";
import { firestore } from "../../database/firebase";

const AdminUser = () => {
  // Users
  const [uid] = usePersistentContext("uid");

  if (!uid)
    return (
      <>
        <p>Loading</p>
      </>
    );

  return (
    <>
      <DBUser id={uid} />
    </>
  );
};

export default AdminUser;

const DBUser = ({ id }) => {
  const ref = fbQuery(
    collection(firestore, "Users"),
    limit(10),
    where("uid", "==", id)
  );

  const query = useFirestoreQueryData(["Users"], ref);

  if (query.isLoading || query.isIdle || !query.data) {
    return <div>Loading...</div>;
  }
  const snapshot = query.data;
  const docs = snapshot.docs;
  if (docs.length === 0) {
    return <div>No user found</div>;
  }
  const doc = docs[0];
  const data = doc.data();
  console.log(data);
  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();
    return <div key={docSnapshot.id}>{data.firstName}</div>;
  });
};

DBUser.propTypes = {
  id: PropTypes.string.isRequired,
};
