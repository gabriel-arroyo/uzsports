import React from "react";
import { Collection } from "../../database/collections";
import { limit, where } from "firebase/firestore";

const TestQuery = () => {
  const players = new Collection("Players");
  const query = players.query(limit(10), where("name", "!=", "active"));
  const news = new Collection("News");
  const newsquery = news.query();

  if (query.isLoading | newsquery.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {query.data?.map((document) => (
        <div key={document.id}>{document.name}</div>
      ))}
      {newsquery.data?.map((newsdocument) => (
        <div key={newsdocument.id}>{newsdocument.content}</div>
      ))}
    </>
  );
};

export default TestQuery;
