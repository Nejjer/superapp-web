import { zenMoneyApi } from "../../api/zenMoneyApi";
import { useEffect, useState } from "react";
import { getTotalByTag, ITotalByTag } from "../../utils/getTotalByTag";
import { Sausage } from "./Sausage";
import { Stack } from "@chakra-ui/react";
import { getTagName } from "../../utils/getTagName";
import { getZMToken } from "../../utils/ZMToken";
import { Drawer } from "./Drawer";

export const EuroDollars = () => {
    const [total, setTotal] = useState<ITotalByTag[]>([])

    useEffect(() => {
        Promise.all([zenMoneyApi.getDiff(getZMToken(), {
            serverTimestamp: getFirstDayINmonthTimestamp()
        }), zenMoneyApi.getDiff(getZMToken(),)]).then(([responseMonth, responseAll]) => {
            if (!responseMonth.transaction || !responseAll.tag) return;

            setTotal(getTotalByTag(responseMonth.transaction).map(totalItem => ({ tag: getTagName(responseAll.tag!, totalItem.tag), sum: totalItem.sum })));
        })
    }, [])

    const getFirstDayINmonthTimestamp = () => {
        // Получаем текущую дату
        const now = new Date();

        // Создаём новый объект Date для 1-го числа текущего месяца
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Получаем timestamp (в миллисекундах)
        const timestamp = firstDayOfMonth.getTime();
        return timestamp / 1000;
    }

    return <div>
        <Drawer />
        <Stack gap={4}>
            {total.map(({ sum, tag }) => <Sausage percentage={(sum / 10000) * 100} suffix={`${sum} ₽`} text={tag} key={tag} />)}
        </Stack>
    </div>
}