import { FC } from "react";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";

export const Form: FC = () => {
    return (
        <form>
            <Input label="Описание" />
            <Button>Отправить</Button>
        </form>
    );
};