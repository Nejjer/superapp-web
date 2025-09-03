import { TTagId } from '../types/zen-money-entities.ts';
import { TUnits } from '../types/zen-money-types.ts';

export type TPlanByTagId = Record<TTagId, TUnits>;

export const getPlanByTagId = (tagId: TTagId, plansByTagIds: TPlanByTagId) => {
  return plansByTagIds[tagId] || 0;
};
