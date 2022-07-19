<template>
  <v-card width="50%" class="ml-8" elevation="0">
    <v-simple-table width="40%" class="claimTable" dense>
      <template v-slot:default>
        <thead>
          <tr class="teal accent-4">
            <th class="text-left white--text body-2 text-capitalize">
              perticulars
            </th>
            <th class="text-right white--text body-2 text-capitalize">
              amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in tableItem" :key="index">
            <td class="w-75 py-1">{{ value }}</td>
            <td class="py-1">
              <div class="form-group d-flex justify-end align-center">
                <input
                  v-if="index !== tableItem.length - 1"
                  type="number"
                  class="form-control no-border"
                  v-model.number="tableData[getFromData(value)]"
                />
                <input
                  v-else
                  type="number"
                  disabled
                  class="form-control no-border"
                  v-model.number="netAmountPayable"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tableItem: [
        "GA Contributions*",
        "Salvage Contribution",
        "Any Other",
        "Net Amount Payable*",
      ],
      tableData: {
        gaContributions: "",
        salvageContribution: "",
        anyOther: "",
      },
      netAmountPayable: 0,
    };
  },
  methods: {
    getFromData(columns) {
      let arr = columns.split(" ");
      arr[0] = arr[0].toLowerCase();
      arr = arr.join("");
      if (arr[arr.length - 1] == "*") arr = arr.substr(0, arr.length - 1);
      return arr;
    },
  },
  watch: {
    tableData: {
      handler(newValue) {
        this.netAmountPayable = Object.keys(this.tableData).reduce(
          (acc, val) => {
            return acc + newValue[val];
          },
          0
        );
        this.$store.commit("setTableData", newValue);
      },
      deep: true,
    },
    netAmountPayable() {
      this.$store.commit("setNetAmount", this.netAmountPayable);
    },
  },
};
</script>

<style scoped>
.no-border:focus {
  outline: none;
  box-shadow: none;
}
.no-border {
  margin-left: 0.7rem;
  height: 1.8rem !important;
  width: 80%;
}
td {
  border-left: gray solid 0.5 !important;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
