import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/PageNotFound.png";
import styles from "./404.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <img className={styles.image} src={image} alt="404" />
      <p style={{ textAlign: "center" }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
