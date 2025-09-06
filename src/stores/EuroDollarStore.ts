import { makeAutoObservable, runInAction } from 'mobx';

import { zenMoneyApi } from '../api/zenMoneyApi';
import { DataEntity, TTagId, TZmDiff, TZmTag, } from '../types/zen-money-entities';
import { TUnits } from '../types/zen-money-types';
import { getPlanByTagId, TPlanByTagId } from '../utils/getPlanByTagId.ts';
import { getTagById } from '../utils/getTagName';
import { getTransactionSumByTags } from '../utils/getTransactionSumByTags.ts';
import { getZMToken } from '../utils/ZMToken';

// const getFirstDayINmonthTimestamp = () => {
//   // Получаем текущую дату
//   const now = new Date();
//
//   // Создаём новый объект Date для 1-го числа текущего месяца
//   const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//
//   // Получаем timestamp (в миллисекундах)
//   const timestamp = firstDayOfMonth.getTime();
//   return Math.floor(timestamp / 1000);
// };

const PODUSHKA_ID = '3b1e084a-b892-421d-9df5-e63f7b2dee3e';

const getFirstDayINLastMonthTimestamp = () => {
  // Получаем текущую дату
  const now = new Date();
  // Создаём новый объект Date для 1-го числа предыдущего месяца
  const firstDayOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  // Получаем timestamp (в миллисекундах)
  const timestamp = firstDayOfLastMonth.getTime();
  return Math.floor(timestamp / 1000);
};

const TOTAL_INCOME = 210000;

/** Тип для рендера элемента плана */
export type TRenderPlanItem = {
  tag: TZmTag;
  spent: TUnits;
  plane: TUnits;
  category: TCategory;
};

export type CategorizeTags = Record<TTagId, TCategory>;

export type TCategory = 'optional' | 'necessary' | 'archive';

export class EuroDollarStore {
  currentMonthDiff: TZmDiff | null = null;
  lastMonthDiff: TZmDiff | null = null;
  loaded = false;
  plansByTagIds: TPlanByTagId = {};
  categorizeTags: CategorizeTags = {};
  podushkaTarget: TUnits = 0;

  get totalIncome() {
    return TOTAL_INCOME;
  }

  getTotalOutcome(diff: TZmDiff = this.safeDiff) {
    return (
      diff.transaction?.reduce(
        (prevVal, currentVal) =>
          currentVal.income === 0 ? prevVal + currentVal.outcome : prevVal,
        0
      ) || 0
    );
  }

  get safeDiff() {
    if (!this.currentMonthDiff) {
      throw new Error('diff is not loaded yet');
    }
    return this.currentMonthDiff;
  }

  get safeLastMonthDiff() {
    if (!this.lastMonthDiff) {
      throw new Error('diff is not loaded yet');
    }
    return this.lastMonthDiff;
  }

  constructor() {
    makeAutoObservable(this);
    this.update();
  }

  async update() {
    const [diff, plans, categorizeTagIds, podushkaTarget] = await Promise.all([
      zenMoneyApi.getDiff(getZMToken(), {
        serverTimestamp: getFirstDayINLastMonthTimestamp(),
        forceFetch: [DataEntity.Tag],
      }),
      zenMoneyApi.getPlansByTagId(),
      zenMoneyApi.getCategorizeTags(),
      zenMoneyApi.getPodushkaTarget(),
    ]);
    runInAction(() => {
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-01`;
      const lastMonth = `${now.getFullYear()}-${(now.getMonth() - 1).toString().padStart(2, '0')}-01`;
      this.currentMonthDiff = {
        ...diff,
        transaction: diff.transaction?.filter(
          ({ date }) => date >= currentMonth
        ),
      };
      this.lastMonthDiff = {
        ...diff,
        transaction: diff.transaction?.filter(
          ({ date }) => date < currentMonth && date >= lastMonth
        ),
      };
      this.loaded = true;
      this.plansByTagIds = plans;
      this.categorizeTags = categorizeTagIds;
      this.podushkaTarget = podushkaTarget;
    });
  }

  get planItems(): TRenderPlanItem[] {
    if (!this.loaded) return [];

    const totals = getTransactionSumByTags(
      this.safeDiff.tag,
      this.safeDiff.transaction
    );

    return totals.map(({ spent, tagId }) => ({
      tag: getTagById(tagId, this.safeDiff.tag),
      plane: getPlanByTagId(tagId, this.plansByTagIds),
      category: this.categorizeTags[tagId] || 'optional',
      spent,
    }));
  }

  getRequiredOutcome(diff: TZmDiff = this.safeDiff) {
    const totals = getTransactionSumByTags(diff.tag, diff.transaction);
    return totals.reduce(
      (prevVal, currentVal) =>
        this.categorizeTags[currentVal.tagId] !== 'necessary'
          ? prevVal + currentVal.spent
          : prevVal,
      0
    );
  }

  get podushka() {
    return (
      this.currentMonthDiff?.account?.find((acc) => acc.id === PODUSHKA_ID)
        ?.balance || 0
    );
  }

  get podushkaIncome() {
    return (
      this.safeDiff.transaction?.reduce((prev, current) => {
        if (current.incomeAccount === PODUSHKA_ID) {
          return prev + current.income;
        } else if (current.outcomeAccount === PODUSHKA_ID) {
          return prev - current.outcome;
        }
        return prev;
      }, 0) || 0
    );
  }

  async setPodushkaTarget(val: TUnits) {
    this.podushkaTarget = val;
    await zenMoneyApi.sendPodushkaTarget(val);
  }

  async setPlanByTagId(tagId: TTagId, plane: TUnits): Promise<void> {
    this.plansByTagIds[tagId] = plane;
    await zenMoneyApi.sendPlanByTag(this.plansByTagIds);
  }

  async setCategoryByTagId(tagId: TTagId, category: TCategory): Promise<void> {
    this.categorizeTags[tagId] = category;
    await zenMoneyApi.sendCategorizeTags(this.categorizeTags);
  }
}
