import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';
import { sizeUnits } from '@/utils/file';
import { getGlobalStat } from '@/api/rpc';
import type { RootState } from '../index';

type WorkerState = {
  downloadSpeed: number;
  uploadSpeed: number;
};

const worker: WorkerState = {
  downloadSpeed: 0,
  uploadSpeed: 0,
};

const getters: GetterTree<WorkerState, RootState> = {
  speeds: s => {
    const d = sizeUnits(s.downloadSpeed);
    const u = sizeUnits(s.uploadSpeed);
    return {
      down: {
        speed: d[0],
        unit: d[1],
      },
      up: {
        speed: u[0],
        unit: u[1],
      },
    };
  },
};

type UpdateSpeed = {
  down: number;
  up: number;
};

const mutations: MutationTree<WorkerState> = {
  update(state, stats: UpdateSpeed) {
    state.downloadSpeed = stats.down;
    state.uploadSpeed = stats.up;
  },
};

const actions: ActionTree<WorkerState, RootState> = {
  update({ commit }) {
    return new Promise((resolve, reject) => {
      getGlobalStat()
        .then(res => {
          commit('update', {
            down: Number(res.result.downloadSpeed),
            up: Number(res.result.uploadSpeed),
          });
          resolve(true);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
};

export default {
  namespaced: true,
  state: worker,
  getters,
  actions,
  mutations,
} as Module<WorkerState, RootState>;
