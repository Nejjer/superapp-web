import { makeAutoObservable, runInAction } from 'mobx';

import { zenMoneyApi } from '../api/zenMoneyApi';
import {
  DataEntity,
  TTagId,
  TZmDiff,
  TZmTag,
} from '../types/zen-money-entities';
import { TUnits } from '../types/zen-money-types';
import { getPlanByTagId, TPlanByTagId } from '../utils/getPlanByTagId.ts';
import { getTagById } from '../utils/getTagName';
import { getTransactionSumByTags } from '../utils/getTransactionSumByTags.ts';
import { getZMToken } from '../utils/ZMToken';

const getFirstDayINmonthTimestamp = () => {
  // Получаем текущую дату
  const now = new Date();

  // Создаём новый объект Date для 1-го числа текущего месяца
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Получаем timestamp (в миллисекундах)
  const timestamp = firstDayOfMonth.getTime();
  return timestamp / 1000;
};

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
  diff: TZmDiff | null = null;
  loaded = false;
  plansByTagIds: TPlanByTagId = {};
  categorizeTags: CategorizeTags = {};

  get safeDiff() {
    if (!this.diff) {
      throw new Error('diff is not loaded yet');
    }
    return this.diff;
  }

  constructor() {
    makeAutoObservable(this);
    this.update();
  }

  async update() {
    const diff = await zenMoneyApi.getDiff(getZMToken(), {
      serverTimestamp: getFirstDayINmonthTimestamp(),
      forceFetch: [DataEntity.Tag],
    });
    const plans = await zenMoneyApi.getPlansByTagId();
    const categorizeTagIds = await zenMoneyApi.getCategorizeTags();
    runInAction(() => {
      this.loaded = true;
      this.diff = diff;
      this.plansByTagIds = plans;
      this.categorizeTags = categorizeTagIds;
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

  async setPlanByTagId(tagId: string, plane: TUnits): Promise<void> {
    this.plansByTagIds[tagId] = plane;
    await zenMoneyApi.sendPlanByTag(this.plansByTagIds);
  }

  async setCategoryByTagId(tagId: string, category: TCategory): Promise<void> {
    this.categorizeTags[tagId] = category;
    await zenMoneyApi.sendCategorizeTags(this.categorizeTags);
  }
}
