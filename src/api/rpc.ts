/* eslint no-shadow: "off" */
import request from '@/utils/request';

export type RPCVersion = '1.0' | '2.0' | string;
export type RequestParams = Record<string, any> | any[];

enum RPC {
  addUri = 'aria2.addUri',
  tellActive = 'aria2.tellActive',
  getGlobalStat = 'aria2.getGlobalStat',
  tellWaiting = 'aria2.tellWaiting',
  getVersion = 'aria2.getVersion',
}

const reqKey = () => {
  const t = new Date();
  return window.btoa(`Aria2_Portal_${t.getTime()}_${t.getMilliseconds()}`);
};

export type JSONRPC = {
  id?: string;
  jsonrpc: RPCVersion;
  method: RPC;
  params: RequestParams;
};

export type JSONRPCResult<T = Record<string, any>[]> = {
  id?: string;
  jsonrpc: RPCVersion;
  result: T;
};

export type OriginDownloadItem = {
  bittorrent: Record<string, any>;
  completedLength: string;
  connections: string;
  downloadSpeed: string;
  files: Record<string, any>[];
  gid: string;
  infoHash: string;
  numSeeders: string;
  seeder: string;
  status: 'active' | 'paused';
  totalLength: string;
  uploadSpeed: string;
};

export const gen = (method: RPC, params?: RequestParams): JSONRPC => {
  const token = localStorage.getItem('__token') || '';
  return {
    id: reqKey(),
    jsonrpc: '2.0',
    method,
    params: [`token:${window.atob(token)}`, params],
  };
};

export const genPager = (
  method: RPC,
  begin: number,
  end: number,
  params?: RequestParams,
): JSONRPC => {
  const token = localStorage.getItem('__token') || '';
  return {
    id: reqKey(),
    jsonrpc: '2.0',
    method,
    params: [`token:${window.atob(token)}`, begin, end, params],
  };
};

export const getKeys = [
  'gid',
  'totalLength',
  'completedLength',
  'uploadSpeed',
  'downloadSpeed',
  'connections',
  'numSeeders',
  'seeder',
  'status',
  'errorCode',
  'verifiedLength',
  'verifyIntegrityPending',
  'files',
  'bittorrent',
  'infoHash',
];

export const addDownload = (urls: string[]): Promise<JSONRPCResult> => {
  return request.post<JSONRPC, JSONRPCResult>('', gen(RPC.addUri, urls || []));
};

export const tellActive = (): Promise<JSONRPCResult<OriginDownloadItem[]>> => {
  return request.post<JSONRPC, JSONRPCResult<OriginDownloadItem[]>>(
    '',
    gen(RPC.tellActive, getKeys),
  );
};

export const tellWaiting = (): Promise<JSONRPCResult<OriginDownloadItem[]>> => {
  return request.post<JSONRPC, JSONRPCResult<OriginDownloadItem[]>>(
    '',
    genPager(RPC.tellWaiting, 0, 100, getKeys),
  );
};

export const tellDownloadList = (): Promise<OriginDownloadItem[]> => {
  return new Promise((resolve, reject) => {
    Promise.all([tellActive(), tellWaiting()])
      .then(res => {
        const dataList = res.map(item => item.result).reduce((cur, arr) => [...cur, ...arr], []);
        console.log('dataList', dataList);
        resolve(dataList);
      })
      .catch(reject);
  });
};

type GlobalStat = {
  downloadSpeed: string;
  numActive: string;
  numStopped: string;
  numStoppedTotal: string;
  numWaiting: string;
  uploadSpeed: string;
};

export const getGlobalStat = (): Promise<JSONRPCResult<GlobalStat>> => {
  return request.post<JSONRPC, JSONRPCResult<GlobalStat>>('', gen(RPC.getGlobalStat));
};

type RPCInfo = {
  version: string;
  enabledFeatures: string[];
};

export const getVersion = (): Promise<JSONRPCResult<RPCInfo>> => {
  return request.post<JSONRPC, JSONRPCResult<RPCInfo>>('', gen(RPC.getVersion));
};
