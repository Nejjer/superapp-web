import { makeAutoObservable, runInAction } from "mobx";

import { zenMoneyApi } from "../api/zenMoneyApi";
import { DataEntity, TZmDiff, TZmTag } from "../types/zen-money-entities";
import { TUnits } from "../types/zen-money-types";
import { getTagById } from "../utils/getTagName";
import { getTotalByTag } from "../utils/getTotalByTag";
import { getZMToken } from "../utils/ZMToken";



const getFirstDayINmonthTimestamp = () => {
    // Получаем текущую дату
    const now = new Date();

    // Создаём новый объект Date для 1-го числа текущего месяца
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Получаем timestamp (в миллисекундах)
    const timestamp = firstDayOfMonth.getTime();
    return timestamp / 1000;
}

/** Тип для рендера элемента плана */
export type TRenderPlanItem = { tag: TZmTag, spent: TUnits }

export class EuroDollarStore {
    diff: TZmDiff | null = null;
    loaded = false;

    get safeDiff() {
        if (!this.diff) {
            throw new Error('diff is not loaded yet');
        }
        return this.diff;
    }

    constructor() {
        makeAutoObservable(this);
        this.update()
    }

    async update() {
        const diff = await zenMoneyApi.getDiff(getZMToken(), {
            serverTimestamp: getFirstDayINmonthTimestamp(),
            forceFetch: [DataEntity.Tag]
        })
        runInAction(() => {
            this.loaded = true;
            this.diff = diff;
        })
    }

    get planItems(): TRenderPlanItem[] {
        if (!this.loaded) return []

        const totals = getTotalByTag(this.safeDiff.transaction)

        return totals.map(({ spent, tagId }) => ({ tag: getTagById(tagId, this.safeDiff.tag,), spent }))
    }

}