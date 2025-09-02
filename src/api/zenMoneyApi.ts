import { TZmDiff, TZmRequest } from "../types/zen-money-entities";
import { TToken } from "../types/zen-money-types";

class ZenMoneyApi {
    public async getDiff(token: TToken,
        diff: TZmDiff = { serverTimestamp: 0 }): Promise<TZmDiff> {
        if (!token) throw Error('No token')


        const url = 'https://api.zenmoney.ru/v8/diff/'
        const body: TZmRequest = {
            ...diff,
            currentClientTimestamp: Math.floor(Date.now() / 1000),
        }

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        const json = await response.json()
        if (json.error) throw Error(JSON.stringify(json.error))

        return json as TZmDiff
    }
}

export const zenMoneyApi = new ZenMoneyApi();
