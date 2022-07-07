import React from "react";
import { Collection } from "../../database/collections";

const TestQuery = () => {
  const players = new Collection("Players");
  const product = players.document("02mZXDqEp5bop4yvu1cJ");

  if (product.isLoading) {
    return <div>Loadding gabo</div>;
  }
  const snapshot = product.data;
  return <div>{snapshot?.data()?.name}</div>;
};

export default TestQuery;
