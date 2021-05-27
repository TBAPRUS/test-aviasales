import React from "react";
import TicketsList from "../TicketsList/TicketsList";
import TransferSort from "../TransferSort/TransferSort";
import styles from "./RightSide.module.css";

export default function RightSide() {
  return (
    <div className={styles.container}>
      <TransferSort />
      <TicketsList />
    </div>
  );
}
