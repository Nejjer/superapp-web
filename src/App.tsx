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
    await api.getPCInfo().then(setPCInfo);
    try {
      await api.getServerInfo().then(setServerInfo);
    } catch (err) {
      console.log(err);
    }
  };

  if (!pcInfo) {
    return null;
  }
  return (
    <div className={styles.App}>
      <Time />
      <PCInfo {...pcInfo} className={styles.pcInfo} />
      {serverInfo && <PCInfo {...serverInfo} className={styles.serverInfo} />}
    </div>
  );
}

export default App;
