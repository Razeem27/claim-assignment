<template>
  <v-card elevation="0" width="95%" class="ma-auto mt-2" height="auto">
    <!-- heading , print and export button section -->

    <v-row justify="space-between" w>
      <v-col cols="3" class="title font-weight-bold"
        >GA Claim Assessment Sheet</v-col
      >
      <v-col cols="3" class="d-flex justify-end align-center">
        <v-btn
          color="#E46A25"
          class="mr-4 white--text body-2 text-capitalize"
          @click="handlePrint"
        >
          <v-icon>mdi-printer</v-icon>
          <v-divider vertical class="mx-1 grey lighten-5"></v-divider>
          print</v-btn
        >

        <template>
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#E46A25"
                  class="white--text body-2 text-capitalize"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-file-export</v-icon>
                  <v-divider vertical class="mx-1 bg-white"> </v-divider>
                  Export As
                </v-btn>
              </template>
              <v-list>
                <v-list-item link @click="exportToPDF">
                  <v-icon color="red" class="mr-2">mdi-file-pdf-box</v-icon>

                  <v-list-item-content class="font-weight-bold body-2"
                    >PDF Document</v-list-item-content
                  >
                </v-list-item>
                <v-divider class="ma-0 pa-0"></v-divider>
                <v-list-item link @click="exportToExcel">
                  <v-icon color="#1D813F" class="mr-2">mdi-file-excel</v-icon>

                  <v-list-item-content class="font-weight-bold body-2"
                    >Excel Document</v-list-item-content
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-col>
    </v-row>

    <!-- claim sheet Forms -->
    <v-form class="mt-2">
      <v-row>
        <v-col class="mr-1">
          <span class="caption font-weight-bold text-capitalize grey-text"
            >type of settlement*</span
          >
          <v-select
            outlined
            height="20"
            class="mt-2"
            label="Select"
            single-line
            solo
            dense
            v-model="formData.typeOfSettlement"
            :items="settlementTypeItems"
          >
          </v-select>
        </v-col>
        <v-col class="mr-1">
          <span class="caption font-weight-bold text-capitalize grey-text"
            >reason for settlement</span
          >
          <v-select
            outlined
            height="20"
            class="mt-2"
            label="Select"
            single-line
            solo
            dense
            :items="settlementReasonItems"
            v-model="formData.ReasonForSettlement"
          >
          </v-select>
        </v-col>
        <v-col class="mr-1">
          <span class="caption font-weight-bold text-capitalize grey-text"
            >payment processing*</span
          >
          <v-select
            outlined
            height="20"
            class="mt-2"
            label="Select"
            single-line
            dense
            solo
            v-model="formData.paymentProcessing"
            :items="paymentProcressItems"
          >
          </v-select>
        </v-col>
        <v-col class="mr-1">
          <span class="caption font-weight-bold text-capitalize grey-text"
            >payment to</span
          >
          <v-select
            outlined
            height="20"
            class="mt-2"
            label="Select"
            single-line
            solo
            dense
            v-model="formData.paymentTo"
            :items="paymentToItems"
          >
          </v-select>
        </v-col>
        <v-col class="mr-1">
          <span class="caption font-weight-bold text-capitalize grey-text"
            >transaction type*</span
          >
          <v-select
            outlined
            height="20"
            class="mt-2"
            label="Select"
            single-line
            dense
            solo
            v-model="formData.transactionType"
            :items="transactionTypeItems"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row class="mt-0 row-2">
        <v-col class="mr-1">
          <span class="caption font-weight-bold text-capitalize grey-text"
            >Amount Paid till date</span
          >
          <v-text-field
            :disabled="false"
            hide-spin-buttons
            type="number"
            outlined
            solo
            height="20"
            class="mt-2"
            label="Enter..."
            single-line
            v-model="formData.amountPaidTillDate"
            dense
          >
          </v-text-field>
        </v-col>
        <v-col class="mr-1">
          <span class="caption font-weight-bold text-capitalize grey-text"
            >currency*</span
          >
          <v-select
            outlined
            solo
            height="20"
            class="mt-2"
            label="Select"
            single-line
            dense
            v-model="formData.currency"
            :items="currencyItems"
          >
          </v-select>
        </v-col>
        <v-col class="mr-1">
          <span class="caption font-weight-bold text-capitalize grey-text"
            >exchange rate*</span
          >
          <v-text-field
            outlined
            hide-spin-buttons
            type="number"
            solo
            height="20"
            class="mt-2"
            label="Enter..."
            single-line
            v-model="formData.exchangeRate"
            dense
          >
          </v-text-field>
        </v-col>
        <v-col class="mr-1">
          <span class="caption font-weight-bold text-capitalize grey-text"
            >agreed value%*</span
          >
          <v-text-field
            outlined
            hide-spin-buttons
            type="number"
            height="20"
            class="mt-2"
            label="Enter..."
            single-line
            dense
            v-model="formData.agreedValue"
            :items="['item1', 'item2', 'item3', 'item4']"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { JSONToEXcel, JSONTOPDF, PrintPdf } from "./helperFunctions";
export default {
  data() {
    return {
      props: ["getAllData", "setCollect"],
      settlementTypeItems: [
        "settlement type1",
        "settlement type2",
        "settlement type2",
        "settlement type2",
      ],
      settlementReasonItems: [
        "Reason 1",
        "Reason 2",
        "Reason 3",
        "Reason 4",
        "Reason 5",
      ],
      paymentProcressItems: [
        "Partial payment",
        "Process 2",
        "Process 3",
        "Process 4",
      ],
      columnsArray: [
        "Type Of Settlement",
        "Reason For Settlement",
        "Payment Processing",
        "Payment To",
        "Transaction Type",
        "Amount Paid Till Date",
        "Currency",
        "Exchange Rate",
        "Agreed Value",
      ],
      paymentToItems: ["shippment 1", "shippment 2", "shippment 3"],
      transactionTypeItems: ["Type 1", "Type 2", "Type 3"],
      currencyItems: ["€-EUR", "$-USD", "₹-INR"],
      formData: {
        typeOfSettlement: "",
        ReasonForSettlement: "",
        paymentProcessing: "",
        paymentTo: "",
        partialPayment: "",
        transactionType: "",
        amountPaidTillDate: "",
        currency: "",
        exchangeRate: null,
        agreedValue: null,
      },
    };
  },
  methods: {
    ...mapGetters([
      "getTableDataForPDF",
      "getTableDataForExcel",
      "getTableDataForPrint",
    ]),
    exportToExcel() {
      let tableData = this.getTableDataForExcel();
      JSONToEXcel(
        [this.formData, this.getTableDataForExcel],
        "ClaimUserDetails"
      );
    },
    exportToPDF() {
      let newArray = Object.values(this.formData);

      // JSONTOPDF(this.columnsArray, [newArray], "Claim Settlement");
      let tableData = this.getTableDataForPDF();
      JSONTOPDF(
        [{ column: this.columnsArray, arr: [newArray] }, tableData],
        "Claim Settlement"
      );
    },
    handlePrint() {
      let newArray = Object.values(this.formData);
      console.log(newArray)
      let tableData=this.getTableDataForPrint()
      PrintPdf([this.columnsArray,tableData[1]], [[newArray],[tableData[0]]], "Claim Settlement");

    },
  },
};
</script>

<style scoped>
.row-2 {
  width: 81.5%;
}
</style>
