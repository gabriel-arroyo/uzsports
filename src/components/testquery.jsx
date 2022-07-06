import React from "react";
import {
  useFirestoreQuery,
  useFirestoreDocument,
} from "@react-query-firebase/firestore";
import {
  collection,
  limit,
  query as fbQuery,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase-config";

const TestQuery = () => {
  const referenceQuery = fbQuery(
    collection(db, "Players"),
    limit(10),
    where("name", "!=", "gabo")
  );
  // const ref = collection(db, "Players");
  const ref = doc(db, "Players", "SazCK1a2GODWEAvyCYPT");
  const product = useFirestoreDocument(["Players"], ref);

  const query = useFirestoreQuery(
    ["Players", "SazCK1a2GODWEAvyCYPT"],
    referenceQuery,
    {
      subscribe: true,
    }
  );

  if (query.isLoading || (query.isSuccess && !query.data?.docs)) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error.</div>;
  }
  if (product.isLoading) {
    return <div>Loadding gabo</div>;
  }
  const snapshot = product.data;
  console.log("snapshot", snapshot.data());
  return <div>{snapshot.data().name}</div>;
  // if (query.isSuccess && query.data?.docs) {
  //   return query.data.docs.map((doc) => {
  //     const fdata = doc.data();
  //     const id = doc.id;
  //     return (
  //       <div key={doc.id}>
  //         {fdata.name}-{fdata.mail}-{id}

  //       </div>
  //     );
  //   });
  // }

  // return <div>ND {query.status}</div>;
};

export default TestQuery;
