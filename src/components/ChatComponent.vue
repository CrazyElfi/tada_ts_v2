<template>
  <v-col cols="8" class="ma-0 pa-0">
    <v-container>
      <div class="chat-header d-flex justify-space-between align-center">
        <h4 class="pa-3">{{ nameRoom }}</h4>
        <v-btn
            class="ma-2"
            color="darkblue"
            icon
            x-small
            @click="closeRooms()"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="chat-messages-wrapper">
        <div  v-for="(item, index) in history" :key="index"  class="message mt-4">
          <c-message-card
              :message = item
          />
          <v-divider v-if="index !== (history.length - 1)" class="mt-4"></v-divider>
        </div>
        <div id="hidden-block"></div>
      </div>

      <v-row class="d-flex align-center mt-3">
        <v-col cols="10">
          <!--              v-model="$v.message.$model"-->
          <input
              v-model="message"
              class="input pa-1"
              type="text"
              :placeholder='$t("typeYourMsg")'
          />
        </v-col>
        <v-col cols="2">
          <v-btn
              class="ma-2"
              outlined
              color="indigo"
              @click="sendMessage(message)"
          >
            {{ $t('send') }}
          </v-btn>
        </v-col>
      </v-row>
<!--      <div class="error&#45;&#45;text" v-if="!$v.message.maxLength">-->
<!--      {{ $t('errSizeMsg',{-->
<!--      countSymbols: validationRules.maxMessageLength,-->
<!--    }-->
<!--        '}}-->
<!--      </div>-->
    </v-container>
  </v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {IMessage} from "@/types";
import MessageCard from '@/components/ui/MessageCard.vue';
import {smartModule} from "@/store";
import Api from "@/api";

@Component({
  components: {
    'c-message-card': MessageCard,
  },
})

export default class ChatComponent extends Vue {
  message: string = '';

  get history() {
    return smartModule.getters.history;
  }

  get nameRoom() {
    return smartModule.getters.nameRoom;
  }

  get username()  {
    return smartModule.getters.username;
  }

  // validationRules() {
  //   return this.$store.state?.settings;
  // }

  async mounted() {
    await smartModule.actions.fetchRoomHistory();
    // this.scrollToLastMessage();
    smartModule.actions.connectWS()
  }

  async closeRooms() {
    smartModule.actions.resetRoomHistoryAndName()
  }

  async sendMessage(msg: string) {
    let message: IMessage  = {
      room: String(this.nameRoom),
      text: msg,
    };

    console.log('message', message)

    if (msg !== "") {
      await smartModule.actions.sendMsgToWS(message);
      this.message = ""; // есть ли сценарий обезопасить себя от удаления сообщения если в сокете будет ошибка?
      await smartModule.actions.fetchRoomsList();
    }

    await smartModule.actions.fetchRoomHistory();
  }

  // scrollToLastMessage() {
  //   const hiddenElem = document.getElementById('hidden-block');
  //   hiddenElem.scrollIntoView({block: "end"});
  // }
}
</script>


<style  lang="scss" scoped>
.chat-header {
  background-color: rgba(0,0, 139,0.1);
}

.chat-messages-wrapper {
  height: calc(90vh - 50px);
  overflow-y: auto;
  .msg-time {
    font-size: 12px;
    color: rgba(0, 0, 139, 0.4);
  }
}

</style>
