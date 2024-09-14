import { ReactElement } from 'react';

import styles from './styles.module.scss';

type Props = {
  disabled: boolean;
  children: string;
  onClick: () => void;
};

function ConfirmButton({ disabled, children, onClick }: Props): ReactElement {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

export default ConfirmButton;
