import React from 'react';
import logo from '../../logo.svg';
import styles from './Header.module.css';


export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="logo" />
    </header>
  );
}