import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./TransferSort.module.css";
import { cheapest, fastest } from "../../store/actions/transferSortActions";
import { selectTransferSort } from "../../store/reducers/transferSortReducer";

export default function TransferSort() {
  const state = useSelector(selectTransferSort);
  const dispatch = useDispatch();

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
