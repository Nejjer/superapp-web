import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';

interface Card {
  children?: ReactNode;
  radius?: '44px' | '9999px' | '0px' | '24px';
  className?: string;
}

export const Card: FC<Card> = ({ children, radius, className }) => {
  return (
    <div
      style={{ borderRadius: radius }}
      className={clsx(styles.container, className)}
    >
      {children}
    </div>
  );
};
