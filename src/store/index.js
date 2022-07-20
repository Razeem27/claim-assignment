import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function convertNormalCase(arr) {
  return (arr = arr.map(item => {
    let result = item[0].replace(/([A-Z])/g, " $1");
    result = result.charAt(0).toUpperCase() + result.slice(1);
    item[0] = result;
    return item;
  }));
}

export default new Vuex.Store({
  state: {
    tableData: {},
    netAmountPayable: 0,
    tableColumns: ["Perticulars", "Amount"],
  },
  getters: {
    getTableDataForPDF(state) {
      let arr = state.tableData;
      arr.netAmountPayable = state.netAmountPayable;
      arr = Object.entries(arr);
      arr = convertNormalCase(arr);
      return { column: state.tableColumns, arr };
    },
    getTableDataForExcel(state) {
      return { ...state.tableData, netAmountPayable: state.netAmountPayable };
    },
    getTableDataForPrint(state) {
      let tableData = state.tableData;
      tableData.netAmountPayable = state.netAmountPayable;
      tableData = Object.entries(tableData);
      tableData = convertNormalCase(tableData);
      console.log([tableData, state.tableColumns]);
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
