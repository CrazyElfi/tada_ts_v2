<template>
  <v-app>
<!--    <v-btn @click="ping()">-->
<!--      chek-->
<!--    </v-btn>-->
      <router-view/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Api from "@/api";

export default class App extends Vue {
 // ping() {
 //   // console.log(12123123123)
 //   Api.pingWS()
 // }
}
</script>

<style lang="scss">
.user-name {
  color: #00008b;
}

.input {
  width: 100%;
  border: 1px solid darkblue;
  outline: none;
  border-radius: 4px;
}
</style>

