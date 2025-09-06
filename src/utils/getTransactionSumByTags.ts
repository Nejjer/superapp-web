import { TTagId, TZmTag, TZmTransaction } from '../types/zen-money-entities';
import { TUnits } from '../types/zen-money-types';

export interface ITotalByTag {
  tagId: TTagId;
  spent: TUnits;
}

export const getTransactionSumByTags = (
  tags: TZmTag[] = [],
  transactions: TZmTransaction[] = []
): ITotalByTag[] => {
  const total: Record<TTagId, TUnits> = {};
  const result: ITotalByTag[] = [];
  tags.forEach((tag) => {
    if (!total[tag.id]) {
      total[tag.id] = 0;
    }
    total[tag.id] = transactions.reduce((previousValue, currentValue) => {
      if (currentValue.tag?.includes(tag.id)) {
        previousValue += currentValue.outcome;
      }
      return previousValue;
    }, 0);
  });

  for (const key in total) {
    if (Object.prototype.hasOwnProperty.call(total, key)) {
      // Проверяем, что свойство принадлежит объекту, а не его прототипу
      result.push({ tagId: key, spent: total[key] });
    }
  }

  return result;
};
