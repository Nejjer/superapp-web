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

class CompuuMonApi {
  public async getServerInfo(): Promise<IPCInfo> {
    return await (await fetch('/mon/getLinuxStat')).json();
  }

  public async getPCInfo(): Promise<IPCInfo> {
    return await (await fetch('/mon/getWinStat')).json();
  }
}

export const compuuMonApi = new CompuuMonApi();
