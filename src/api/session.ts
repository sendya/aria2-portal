/* eslint no-shadow: "off" */
export type PROTOCOL = 'http' | 'https' | 'ws' | 'wss';
export type REQUEST_METHOD = 'get' | 'post';

export type RPCSession = {
  protocol: PROTOCOL;
  method?: REQUEST_METHOD;
  key: string;
  host: string;
  token: string;
};
