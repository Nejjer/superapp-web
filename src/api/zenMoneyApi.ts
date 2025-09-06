import { CategorizeTags } from '../stores/EuroDollarStore.ts';
import { TZmDiff, TZmRequest } from '../types/zen-money-entities';
import { TToken, TUnits } from '../types/zen-money-types';
import { TPlanByTagId } from '../utils/getPlanByTagId.ts';

class ZenMoneyApi {
  public async getDiff(
    token: TToken,
    diff: Omit<TZmRequest, 'currentClientTimestamp'> = { serverTimestamp: 0 }
  ): Promise<TZmDiff> {
    if (!token) throw Error('No token');

    const url = 'https://api.zenmoney.ru/v8/diff/';
    const body: TZmRequest = {
      ...diff,
      currentClientTimestamp: Math.floor(Date.now() / 1000),
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    if (json.error) throw Error(JSON.stringify(json.error));

    return json as TZmDiff;
  }

  public async getPlansByTagId(): Promise<TPlanByTagId> {
    return JSON.parse(
      localStorage.getItem('planByTagId') || '{}'
    ) as TPlanByTagId;
  }

  public async sendPlanByTag(plansByTagIds: TPlanByTagId) {
    localStorage.setItem('planByTagId', JSON.stringify(plansByTagIds));
  }

  public async sendCategorizeTags(tagIds: CategorizeTags): Promise<void> {
    localStorage.setItem('categorizedTagIds', JSON.stringify(tagIds));
  }

  public async getCategorizeTags(): Promise<CategorizeTags> {
    return JSON.parse(localStorage.getItem('categorizedTagIds') || '{}');
  }

  public async sendPodushkaTarget(val: TUnits): Promise<void> {
    localStorage.setItem('podushka', JSON.stringify(val));
  }

  public async getPodushkaTarget(): Promise<TUnits> {
    return JSON.parse(localStorage.getItem('podushka') || '0');
  }
}

export const zenMoneyApi = new ZenMoneyApi();
