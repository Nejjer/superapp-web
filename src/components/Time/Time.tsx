import { Card } from '../Card';
import styles from './style.module.scss';

export const Time = () => {
  return (
    <Card radius={'9999px'} className={styles.card}>
      <div className={styles.container}>
        <div className={styles.date}>сб, 27 июл.</div>
        <div className={styles.time}>14:33</div>
      </div>
    </Card>
  );
};
