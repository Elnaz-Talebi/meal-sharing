"use client";
import React from "react";
import styles from './components.module.css';

function Button({ children }) {
  return (
    <button className={`${styles.btn} ${styles.btnPrimary}`}>Click Me
      {children}
    </button>
  );
}

export default Button;
