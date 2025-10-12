import { CategorizeTags } from '../stores/EuroDollarStore.ts';
import { TZmDiff, TZmRequest } from '../types/zen-money-entities';
import { TToken, TUnits } from '../types/zen-money-types';
import { TPlanByTagId } from '../utils/getPlanByTagId.ts';
import { axiosInstance } from './axiosInstance.ts';

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
    return (await axiosInstance.get('planByTagId')).data;
  }

  public async sendPlanByTag(plansByTagIds: TPlanByTagId) {
    await axiosInstance.post('planByTagId', JSON.stringify(plansByTagIds));
  }

  public async sendCategorizeTags(tagIds: CategorizeTags): Promise<void> {
    await axiosInstance.post('categorizedTagIds', JSON.stringify(tagIds));
  }

  public async getCategorizeTags(): Promise<CategorizeTags> {
    return (await axiosInstance.get('categorizedTagIds')).data;
  }

  public async sendPodushkaTarget(val: TUnits): Promise<void> {
    await axiosInstance.post('podushka', JSON.stringify(val));
  }

  public async getPodushkaTarget(): Promise<TUnits> {
    return (await axiosInstance.get('podushka')).data;
  }
}

export const zenMoneyApi = new ZenMoneyApi();
