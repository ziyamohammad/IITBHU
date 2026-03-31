import React from "react";
import styles from "../CSS/LoaderDots.module.css";

const LoaderDots = ({ text = "Signing you in" }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderBox}>
        <p className={styles.text}>{text}</p>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoaderDots;
