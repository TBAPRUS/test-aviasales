import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import styles from "./TransferSort.module.css";
import { selectTransferSort, cheapest, fastest } from "./transferSortSlice";

export function TransferSort() {
  const state = useAppSelector(selectTransferSort);
  const dispatch = useAppDispatch();

  return (
    <aside className={styles.container}>
      <button
        onClick={() => dispatch(cheapest())}
        className={`${styles.btn} ${state.cheapest && styles.btnActive}`}
      >
        {"Самый дешёвый".toUpperCase()}
      </button>
      <button
        onClick={() => dispatch(fastest())}
        className={`${styles.btn} ${state.fastest && styles.btnActive}`}
      >
        {"Самый быстрый".toUpperCase()}
      </button>
    </aside>
  );
}
