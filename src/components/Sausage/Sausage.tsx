import { FC } from 'react';
import styles from './style.module.scss';

interface Props {
  icon: string;
  text: string;
  suffix: string;
  percentage: number;
}

export const Sausage: FC<Props> = ({ text, suffix, percentage }) => {
  const width = (260 / 100) * percentage < 48 ? 48 : (260 / 100) * percentage;
  return (
    <div className={styles.item}>
      <div
        style={{
          width: `${width}px`,
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
