import { createStore } from "vuex";
import questions from "../store/data.json";

export default createStore({
  state: {
    questionsAll: questions,

    currentPlayer: {
      name: "Anton",
      currentCoinsCounter: 1000,
      playerAnswers: [],
    },

  },
  getters: {
    getPlayer(state) {
      return state.currentPlayer;
    },
    getQuestions(state) {
      return state.questionsAll;
    },
  },
  mutations: {
    UpdatePlayerStatus(state, info) {
      state.currentPlayer.playerAnswers.push(info);
    },
  },

  modules: {},
  actions: {},
});
