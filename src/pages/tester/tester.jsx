import { useAuthSignOut } from "@react-query-firebase/auth";
import { auth } from "../../database/firebase";
import React from "react";
// import usePersistentContext from "../../hooks/usePersistentContext";

const Tester = () => {
  const mutation = useAuthSignOut(auth, {
    onSuccess(user) {
      console.log("yeii");
      console.log(user);
      if (user) {
        console.log("user logged out: ", user);
      }
    },
  });

  if (mutation.isError) {
    console.log("error");
  }

  if (mutation.isIdle) {
    console.log("idle");
  }

  if (mutation.isLoading) {
    console.log("loading");
  }
  if (mutation.isPaused) {
    console.log("Paused");
  }
  if (mutation.isSuccess) {
    console.log("success");
  }

  const onSubmit = () => {
    console.log("test");
    mutation.mutate();
  };
  return (
    <>
      <div>test</div>
      <button onClick={onSubmit}>logout</button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </>
  );
};

export default Tester;
