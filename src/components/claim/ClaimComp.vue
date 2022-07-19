<template>
  <div>
    <claim-header />
    <claim-from  />
    <claim-table />
    <footer-comp />
  </div>
</template>

<script>
import ClaimHeader from "../Header/ClaimHeader.vue";
import ClaimFrom from "../ClaimForm/ClaimForm.vue";
import ClaimTable from "../ClaimTable/ClaimTable.vue";
import FooterComp from "../Footer/FooterComp.vue";
export default {
  data() {
    return {
    };
  },
  components: { ClaimHeader, ClaimFrom, ClaimTable, FooterComp },
  methods: {
    getAllData(val) {
      console.log(val);
    },
    setCollect(val) {
      this.getData=val
    }
  },
};
</script>

<style scoped></style>
