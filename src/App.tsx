import React from 'react';

import { RightSide } from './features/rightSide/RightSide';
import { LeftSide } from './features/leftSide/LeftSide';
import { Header } from './features/header/Header';
import styles from './App.module.css';

function App() {
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

export default App;
