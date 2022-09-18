import { useQuery } from "react-query";
import React from "react";
// Firebase
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, query, limit, where } from "firebase/firestore";
import { firestore } from "../database/firebase";

/**
 * Fetches data from local store.
 * @return {[any, function]} fetched data and function to set it.
 */
export function useLocalUser() {
  const [isSuccess, setSuccess] = React.useState(false);
  const { data, onLoading } = useQuery(
    "uid",
    () => localStorage.getItem("uid"),
    {
      onSuccess: (localId) => {
        console.log("localId:", localId);
        setSuccess(true);
      },
    }
  );

  return [data, onLoading, isSuccess];
}

/**
 * Fetches data from local store.
 * @return {[any, function]} fetched data and function to set it.
 */
export function useUser() {
  const [isSuccess, setSuccess] = React.useState(false);
  const [uid, , isUserSuccess] = useLocalUser();

  console.log(uid);
  // Users
  const usersCollection = collection(firestore, "Users");
  const refUsersQuery = query(
    usersCollection,
    limit(1),
    where("uid", "==", uid)
  );
  const userQuery = useFirestoreQuery(
    ["Users"],
    refUsersQuery,
    {
      enabled: isUserSuccess,
    },
    {
      onSuccess: () => {
        setSuccess(true);
      },
    }
  );

  const snapshot = userQuery.data;

  return [snapshot, userQuery.isLoading, isSuccess];
}
