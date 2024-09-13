'use client';

import { ReactElement } from 'react';
import styles from './index.module.scss';

interface Props {
  onClick: () => void;
  icon: ReactElement;
}

export default function IconButton({ onClick, icon }: Props) {
  return (
    <button onClick={onClick} className={styles.button}>
      {icon}
    </button>
  );
}
