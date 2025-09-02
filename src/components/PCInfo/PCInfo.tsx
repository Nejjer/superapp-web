import { Card } from '../Card';
import 'moment/dist/locale/ru';
import { FC } from 'react';
import { Sausage } from '../Sausage';
import styles from './style.module.scss';
import { IPCInfo } from '../../api/compumonApi.ts';
import clsx from 'clsx';
import { Center, Spinner } from '@chakra-ui/react';

interface Props {
  pcInfo?: IPCInfo;
  className?: string;
  deviveName?: string;
}

export const PCInfo: FC<Props> = ({ pcInfo, className, deviveName }) => {
  if (!pcInfo)
    return (
      <div className={clsx(styles.container, className)}>
        <Card radius={'24px'}>
          <Center>
            <Spinner size={'xl'} />
          </Center>
        </Card>
      </div>
    );

  const { cpu, gpu, ram } = pcInfo;
  return (
    <div className={clsx(styles.container, className)}>
      <Card radius={'24px'}>
        <div className={styles.list}>
          <div className={styles.center}>
            {deviveName}
            {deviveName ? ' - ' : ''}Common
          </div>
          <Sausage
            text={'CPU temperature'}
            suffix={`${cpu.temperature}°C`}
            percentage={cpu.temperature}
          />
          <Sausage
            text={'CPU usage'}
            suffix={`${cpu.load}%`}
            percentage={cpu.load}
          />
          <Sausage
            text={'CPU fan'}
            suffix={`${cpu.fanSpeed} rpm`}
            percentage={(cpu.fanSpeed / 1800) * 100}
          />
          <Sausage
            text={'Memory usage'}
            suffix={`${ram.used} Gb`}
            percentage={(ram.used / ram.total) * 100}
          />
        </div>
      </Card>
      {gpu && (
        <Card radius={'24px'}>
          <div className={styles.list}>
            <div className={styles.center}>
              {deviveName}
              {deviveName ? ' - ' : ''}GPU
            </div>
            <Sausage
              text={'GPU usage'}
              suffix={`${gpu.load}%`}
              percentage={gpu.load}
            />
            <Sausage
              text={'GPU temp'}
              suffix={`${gpu.temperature}°C`}
              percentage={gpu.temperature}
            />
            <Sausage
              text={'GPU fan'}
              suffix={`${gpu.fanSpeed} rpm`}
              percentage={(gpu.fanSpeed / 2500) * 100}
            />
            <Sausage
              text={'Memory usage'}
              suffix={`${gpu.memory.used} Gb`}
              percentage={(gpu.memory.used / gpu.memory.total) * 100}
            />
          </div>
        </Card>
      )}
    </div>
  );
};
