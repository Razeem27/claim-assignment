<template>
  <v-card flat width="95%" class="ma-auto">
    <v-layout class="py-4">
      <v-btn class="red--text mr-4 btnDanger" outlined
        ><v-icon class="icon">mdi-backspace-outline</v-icon
        ><v-divider vertical class="red mx-2 lighten-4"></v-divider>
        <span class="textField">Reset</span></v-btn
      >
      <v-spacer></v-spacer>
      <v-btn class="white--text btnSuccess mr-4" color="#152F39"
        ><v-icon class="icon">mdi-checkbox-marked-circle</v-icon
        ><v-divider vertical class="green mx-1 lighten-4"></v-divider>
        <span class="textField text-capitalize">Save</span>
      </v-btn>
      <v-btn class="white--text btnSuccess" color="#23b1a9"
        ><v-icon class="icon">mdi-arrow-right-circle</v-icon
        ><v-divider vertical class="green mx-1 lighten-4"></v-divider>
        <span class="textField text-capitalize">Submit</span>
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {};
</script>

<style scoped></style>
