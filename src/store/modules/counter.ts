export interface ICounterState {
  count: number;
}

const state: ICounterState = {
  count: 0
};

const mutations = {
  decrement(state: ICounterState) {
    state.count--;
  },
  increment(state: ICounterState) {
    state.count++;
  }
};

const actions = {
  increment: ({ commit }: { commit: Function }) => commit("increment"),
  decrement: ({ commit }: { commit: Function }) => commit("decrement")
};

export default {
  state,
  mutations,
  actions
};
