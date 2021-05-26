import React from 'react';

import RightSide from '../RightSide/RightSide';
import LeftSide from '../LeftSide/LeftSide';
import Header from '../Header/Header';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <LeftSide />
        <RightSide />
      </main>
    </div>
  );
}
