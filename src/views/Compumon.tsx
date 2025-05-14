import { FC, useEffect, useRef, useState } from 'react';
import styles from '../index.module.scss';
import { api, IPCInfo } from '../api/api.ts';
import { Time } from '../components/Time';
import { PCInfo } from '../components/PCInfo';

export const Compumon: FC = () => {
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
        }, 2000);
    };

    const fetchInfo = async () => {
        try {
            api.getPCInfo().then((res) => {
                setPCInfo(res);
            });
        } catch (err) {
            console.log(err);
        }
        try {
            api.getServerInfo().then((res) => {
                setServerInfo(res);
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.AppContainer}>
            <div className={styles.App}>
                <Time />
                <PCInfo pcInfo={pcInfo} deviveName="PC" />
                <PCInfo
                    pcInfo={serverInfo}
                    deviveName="Server"
                />
            </div>
        </div>
    );
}
