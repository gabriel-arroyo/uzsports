import React from "react";
import { Routes, Route, useParams } from "react-router-dom";

const Register = () => {
  const params = useParams();
  return (
    <div>
      Register {params.id}
      <Routes>
        <Route path="/" element={<Test1 />} />
        <Route path="test" element={<Test2 />} />
      </Routes>
    </div>
  );
};

export default Register;

const Test1 = () => {
  return <div>test1</div>;
};

const Test2 = () => {
  return <div>test2</div>;
};
