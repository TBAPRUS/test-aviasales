import React from 'react';
import { TicketsList } from '../ticketsList/TicketsList';

import { TransferSort } from "../transferSort/TransferSort";
import styles from './RightSide.module.css';

export function RightSide() {
  return (
    <div className={styles.container} >
      <TransferSort />
      <TicketsList />
    </div>
  )
}