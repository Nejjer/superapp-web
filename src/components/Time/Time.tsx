import { Card } from '../Card';
import styles from './style.module.scss';
import moment from 'moment';
import 'moment/dist/locale/ru';

export const Time = () => {
  return (
    <Card radius={'9999px'} className={styles.card}>
      <div className={styles.container}>
        <div className={styles.date}>
          {moment().locale('ru').format('ddd, D MMM')}
        </div>
        <div className={styles.time}>{moment().format('HH:mm')}</div>
      </div>
    </Card>
  );
};
