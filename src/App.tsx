import { Time } from './components/Time';
import { useEffect, useRef, useState } from 'react';
import { api, IPCInfo } from './api/api.ts';
import { PCInfo } from './components/PCInfo';
import styles from './index.module.scss';

function App() {
  const [pcInfo, setPCInfo] = useState<IPCInfo>();
  const [serverInfo, setServerInfo] = useState<IPCInfo>();
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
    try {
      setPCInfo(await api.getPCInfo());
    } catch (err) {
      console.log(err);
    }
    try {
      setServerInfo(await api.getServerInfo());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.App}>
      <Time />
      <PCInfo pcInfo={pcInfo} className={styles.pcInfo} />
      <PCInfo pcInfo={serverInfo} className={styles.serverInfo} />
    </div>
  );
}

export default App;
