import React from "react";
import styles from './LeftSide.module.css';
import TransferFilter from "../TransferFilter/TransferFilter";

export default function LeftSide() {
  return (
    <div className={styles.container}>
      <TransferFilter />
    </div>
  );
}
