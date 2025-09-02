import { TTagId, TZmTransaction } from "../types/zen-money-entities";
import { TUnits } from "../types/zen-money-types";

export interface ITotalByTag { tag: TTagId, sum: TUnits }

export const getTotalByTag = (transactions: TZmTransaction[]): ITotalByTag[] => {
    const total: Record<TTagId, TUnits> = {};
    const result: ITotalByTag[] = [];
    transactions.forEach(transaction => {
        if (transaction.tag) {
            if (!total[transaction.tag[0]]) {
                total[transaction.tag[0]] = 0;
            }
            total[transaction.tag[0]] += transaction.outcome;
        }
    })

    for (const key in total) {
        if (total.hasOwnProperty(key)) { // Проверяем, что свойство принадлежит объекту, а не его прототипу
            result.push({ tag: key, sum: total[key] })
        }
    }

    return result;
}