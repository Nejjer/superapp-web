import { FC } from "react";
import styles from './styles.module.scss';
import { Form } from "./Components/Form";
import { Card } from "../../components/Card";


export const RetroWeek: FC = () => {
    return <div className={styles.container}>
        <Card radius="24px" className={styles.card}>
            <Form />
        </Card>
    </div>
}