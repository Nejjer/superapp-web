import { Card } from '../Card';
import 'moment/dist/locale/ru';
import { FC } from 'react';
import { Sausage } from '../Sausage';
import styles from './style.module.scss';
import { IPCInfo } from '../../api/api.ts';

export const PCInfo: FC<IPCInfo> = ({ cpu, gpu, ram }) => {
  return (
    <Card radius={'44px'}>
      <div className={styles.list}>
        <Sausage
          icon={''}
          text={'CPU temperature'}
          suffix={`${cpu.temperature}°C`}
          percentage={cpu.temperature}
        />
        <Sausage
          icon={''}
          text={'CPU usage'}
          suffix={`${cpu.load}%`}
          percentage={cpu.load}
        />
        <Sausage
          icon={''}
          text={'CPU fan'}
          suffix={`${cpu.fanSpeed} rpm`}
          percentage={(gpu.temperature / 1800) * 100}
        />
        <Sausage
          icon={''}
          text={'Memory usage'}
          suffix={`${ram.used} Gb`}
          percentage={(ram.used / ram.total) * 100}
        />
        <Sausage
          icon={''}
          text={'GPU usage'}
          suffix={`${gpu.load}%`}
          percentage={gpu.load}
        />
        <Sausage
          icon={''}
          text={'GPU temp'}
          suffix={`${gpu.temperature}°C`}
          percentage={gpu.temperature}
        />
        <Sausage
          icon={''}
          text={'GPU fan'}
          suffix={`${gpu.fanSpeed} rpm`}
          percentage={(gpu.temperature / 2500) * 100}
        />
      </div>
    </Card>
  );
};
