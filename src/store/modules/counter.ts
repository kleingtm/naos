export interface CounterState {
  count: number;
}

const state: CounterState = {
  count: 0
};

const mutations = {
  decrement(state: CounterState) {
    state.count--;
  },
  increment(state: CounterState) {
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
