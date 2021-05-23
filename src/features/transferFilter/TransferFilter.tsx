import React from 'react';

import styles from './TransferFilter.module.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTransferFilter, TransferFilterItem, changeTransfers, changeAllTransfers } from './transferFilterSlice'

export function TransferFilter() {
  const state = useAppSelector(selectTransferFilter);
  const dispatch = useAppDispatch();
  const values = Object.values(state);
  const all = values.reduce((acc: boolean, cur: TransferFilterItem) => acc && cur.checked, true);

  return (
    <aside className={styles.container} >
      <h2 className={styles.title} >{'Количество пересадок'.toUpperCase()}</h2>
      <ul>
        <li className={styles.li} onClick={() => dispatch(changeAllTransfers(!all))}>
          <input
            name="Все"
            type="checkbox"
            checked={all}
            readOnly
          />
          <label htmlFor="Все">
            Все
          </label>
        </li>
        {values.map((item: TransferFilterItem) => (
          <li key={item.name} onClick={() => dispatch(changeTransfers(item.name))} className={styles.li}>
            <input
              name={item.name}
              type="checkbox"
              checked={item.checked}
              readOnly
            />
            <label htmlFor={item.name}>
              {item.title}
            </label>
          </li>
        )
        )}
      </ul>
    </aside>
  )
}