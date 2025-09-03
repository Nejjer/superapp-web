import { TTagId, TZmTransaction } from "../types/zen-money-entities";
import { TUnits } from "../types/zen-money-types";

export interface ITotalByTag { tagId: TTagId, spent: TUnits }

export const getTotalByTag = (transactions?: TZmTransaction[]): ITotalByTag[] => {
    if (!transactions) {
        throw new Error('transactions must be provided')
    }
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
        if (Object.prototype.hasOwnProperty.call(total, key)) { // Проверяем, что свойство принадлежит объекту, а не его прототипу
            result.push({ tagId: key, spent: total[key] })
        }
    }

    return result;
}
