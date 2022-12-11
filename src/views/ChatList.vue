<template>
  <v-main>
    <v-row class="app-wrapper pa-2">
      <c-rooms-list />
      <c-chat-component
        v-if="isShowChat"
    />
    </v-row>
  </v-main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RoomsList from '@/components/RoomsList.vue';
import ChatComponent from '@/components/ChatComponent.vue';
import {smartModule} from "@/store";
import Api from "@/api";

@Component({
  components: {
    'c-rooms-list': RoomsList,
    'c-chat-component': ChatComponent,
  },
})

export default class ChatList extends Vue {
  @Prop() private msg!: string;

  get isShowChat() {
    return !!smartModule.getters.nameRoom
  }
  mounted() {
    console.log('mounted')

    smartModule.actions.connectWS()
  }
}
</script>

<style lang="scss">
.app-wrapper {
  font-family: "Open Sans", sans-serif;

  //font-size: 16px;
}

</style>


