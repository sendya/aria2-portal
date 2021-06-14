import { createStore } from 'vuex';
import worker from './modules/worker';

export type RootState = {
  [key: string]: any;
};

const store = createStore({
  modules: {
    worker,
  },
});

export default store;
