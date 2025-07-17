"use client";
import React from "react";
import styles from './components.module.css';

function DangerButton({ children }) {
  return (
    <button className={`${styles.btn} ${styles.btnDanger}`}>Scary
      {children}
    </button>
  );
}

export default DangerButton;
