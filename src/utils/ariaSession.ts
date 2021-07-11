import { onMounted, ref, reactive, watch, inject } from 'vue';
import type { App, Ref } from 'vue';

const SESSION_KEY = '__global_sessions';
const SESSION_CURRENT_KEY = '__global_current_session';

export type PROTOCOL = 'http' | 'https' | 'ws' | 'wss';
export type REQUEST_METHOD = 'get' | 'post';

export class Session {
  protocol: PROTOCOL;

  method: REQUEST_METHOD;

  key: string;

  host: string;

  token: string;

  constructor(
    protocol: PROTOCOL,
    method: REQUEST_METHOD,
    key: string,
    host: string,
    token: string,
  ) {
    this.protocol = protocol;
    this.method = method;
    this.key = key;
    this.host = window.btoa(host);
    this.token = window.btoa(token);
  }
}

export const createRPCSessions = () => {
  // eslint-disable-next-line
  const __globalSessions = reactive<Record<string, Session>>({});
  // eslint-disable-next-line
  const __globalCurrentSession = ref<string>('default');

  const load = (): Record<string, Session> => {
    const jsonStr = localStorage.getItem(SESSION_KEY) || '';

    try {
      const obj = JSON.parse(jsonStr) as Record<string, Session>;
      Object.keys(obj).forEach(key => {
        console.log('item', obj[key]);
      });
      return obj;
    } catch {
      //
    }
    return {};
  };

  const save = () => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(__globalSessions));
  };

  console.log('sessions mounted...');
  // merge ls data
  Object.assign(__globalSessions, load());

  // onMounted(() => {
  //   watch(
  //     () => __globalSessions,
  //     () => {
  //       // if session update, save to ls
  //       save();
  //     },
  //   );
  // });

  return {
    install: (app: App) => {
      app.provide(SESSION_KEY, __globalSessions);
      app.provide(SESSION_CURRENT_KEY, __globalCurrentSession);
      return app;
    },
  };
};

export const useSession = () => {
  const sessions = inject<Record<string, Session>>(SESSION_KEY, {});
  const currentKey = inject<Ref<string>>(SESSION_CURRENT_KEY, '');
  return {
    current: sessions[currentKey.value],
    update: (s: Session) => {
      sessions[s.key] = s;
    },
  };
};
