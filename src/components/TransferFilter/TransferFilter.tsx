import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './TransferFilter.module.css';
import { changeAllTransfers, changeTransfers } from '../../store/actions/transferFilterActions';
import { selectTransferFilter, TransferFilterItem } from '../../store/reducers/transferFilterReducer';

export default function TransferFilter() {
  const state = useSelector(selectTransferFilter);
  const dispatch = useDispatch();
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