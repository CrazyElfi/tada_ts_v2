<template>
  <v-app>
    <nav class="pa-3 blue-grey">
      <v-row>
        <v-col cols="5" class="d-flex justify-start">
          <v-btn class="mr-1">
            <router-link class="menu-item" to="/">
              {{ $t('formPage') }}
            </router-link>
          </v-btn>
          <v-btn class="mr-1">
            <router-link class="menu-item"  to="/chats">
              {{ $t('chatsList') }}
            </router-link>
          </v-btn>
          <v-btn class="mr-1">
            <router-link class="menu-item"  to="/newChat">
              {{ $t('createNewChat') }}
            </router-link>
          </v-btn>
        </v-col>

      </v-row>
    </nav>
      <router-view/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default class App extends Vue {}
</script>

<style lang="scss">
.menu-item {
  text-decoration: none;
}
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

