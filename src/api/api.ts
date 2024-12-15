export interface IPCInfo {
  cpu: { load: number; temperature: number; fanSpeed: number };
  gpu?: {
    load: number;
    temperature: number;
    memory: { total: number; used: number };
    fanSpeed: number;
  };
  ram: { total: number; used: number };
}

class Api {
  public async getServerInfo(): Promise<IPCInfo> {
    return await (await fetch('api/getPcStatus')).json();
  }

  public async getPCInfo(): Promise<IPCInfo> {
    return await (
      await fetch('http://192.168.1.164:8080/api/getPcStatus')
    ).json();
  }
}

export const api = new Api();
