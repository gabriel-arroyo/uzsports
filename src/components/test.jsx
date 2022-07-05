import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
const Test = () => {
  const [newName, setNewName] = useState("");
  const [players, setPlayers] = useState([]);
  const playersCollectionRef = collection(db, "Players");

  const createPlayer = async () => {
    await addDoc(playersCollectionRef, { name: newName });
  };

  const changeName = async (id, name) => {
    const playerDoc = doc(db, "Players", id);
    const newName = name + "x";
    await updateDoc(playerDoc, { name: newName });
  };

  const deletePlayer = async (id) => {
    const playerDoc = doc(db, "Players", id);
    await deleteDoc(playerDoc);
  };

  useEffect(() => {
    const getPlayers = async () => {
      const data = await getDocs(playersCollectionRef);
      console.log(data);
      setPlayers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPlayers();
  }, []);
  return (
    <>
      <h1>Players</h1>
      <input
        type="text"
        placeholder="name"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <button onClick={createPlayer}>Create</button>
      {players.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name:{user.name}</h1>
            <button onClick={() => changeName(user.id, user.name)}>
              Change
            </button>
            <button onClick={() => deletePlayer(user.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};

export default Test;
