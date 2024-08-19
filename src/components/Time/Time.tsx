import { Card } from '../Card';
import styles from './style.module.scss';
import moment from 'moment';
import 'moment/dist/locale/ru';
import { useEffect, useRef, useState } from 'react';

const getDate = () => moment().locale('ru').format('ddd, D MMM');
const getTime = () => moment().format('HH:mm');

export const Time = () => {
  const [date, setDate] = useState(() => getDate());
  const [time, setTime] = useState(() => getTime());
  const intervalId = useRef(0);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTime(getTime());
      setDate(getDate());
    }, 1000);
    return () => clearInterval(intervalId.current);
  }, []);

  return (
    <Card radius={'9999px'} className={styles.card}>
      <div className={styles.container}>
        <div className={styles.date}>{date}</div>
        <div className={styles.time}>{time}</div>
      </div>
    </Card>
  );
};
