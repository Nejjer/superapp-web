import { Time } from './components/Time';
import './index.scss';
import { useEffect, useRef, useState } from 'react';
import { api, IPCInfo } from './api/api.ts';
import { Card } from './components/Card';
import styles from './components/PCInfo/style.module.scss';
import { Sausage } from './components/Sausage';

function App() {
  const [pcInfo, setPCInfo] = useState<IPCInfo>();
  const timeoutId = useRef<number>();

  useEffect(() => {
    handleSetTimeout();
    return () => {
      clearTimeout(timeoutId.current);
      console.log('CLEAR TIMEOUT');
    };
  }, []);

  const handleSetTimeout = () => {
    timeoutId.current = window.setTimeout(() => {
      fetchInfo().then(() => {
        handleSetTimeout();
      });
    }, 800);
  };

  const fetchInfo = async () => {
    await api.getPCInfo().then(setPCInfo);
  };

  if (!pcInfo) {
    return null;
  }
  const { gpu, cpu, ram } = pcInfo;
  return (
    <div className="App">
      <Time />
      <Card radius={'44px'}>
        <div className={styles.list}>
          <div className={'center'}>СPU</div>
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
        </div>
      </Card>
      <Card radius={'44px'}>
        <div className={styles.list}>
          <div className={'center'}>GPU</div>
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
    </div>
  );
}

export default App;
