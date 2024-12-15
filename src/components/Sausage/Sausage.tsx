import { FC } from 'react';
import styles from './style.module.scss';

interface Props {
  icon: string;
  text: string;
  suffix: string;
  percentage: number;
}

export const Sausage: FC<Props> = ({ text, suffix, percentage }) => {
  return (
    <div className={styles.item}>
      <div
        style={{
          width: `${percentage}%`,
        }}
        className={styles.sausage}
      />
      <div className={styles.text}>
        <div>{text}</div>
        <div>{suffix}</div>
      </div>
    </div>
  );
};
