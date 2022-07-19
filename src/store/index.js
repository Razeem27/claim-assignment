import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableData: {},
    netAmountPayable: 0,
    tableColumns: [
      "GA Contributions*",
      "Salvage Contribution",
      "Any Other",
      "Net Amount Payable*",
    ],
  },
  getters: {
    getTableDataForPDF(state) {
      let arr = Object.values(state.tableData);
      console.log(arr);
      arr.push(state.netAmountPayable);
      return { column: state.tableColumns, arr: [arr] };
    },
    getTableDataForExcel(state) {
      return { ...state.tableData, netAmountPayable: state.netAmountPayable };
    },
    getTableDataForPrint(state) {
      let tableData = Object.values(state.tableData);
      tableData.push(state.netAmountPayable);
      return [tableData, state.tableColumns];
    },
  },
  mutations: {
    setTableData(state, payload) {
      state.tableData = payload;
    },
    setNetAmount(state, payload) {
      state.netAmountPayable = payload;
    },
  },
  actions: {},
  modules: {},
});
