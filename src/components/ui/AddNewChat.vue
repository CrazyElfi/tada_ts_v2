<template>
    <v-row>
      <v-col cols="4">
        <v-btn
            :disabled="newRoomName === ''"
            outlined
            color="indigo"
            @click="createNewRoom()"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
          {{ $t('newChat') }}
        </v-btn>
      </v-col>

      <v-spacer />

      <v-col cols="6">
        <input
            v-model="newRoomName"
            class="input pa-1"
            type="text"
            :placeholder='$t("typeRoomName")'
        />
        <div
            v-if="newRoomName.length > validationRules.maxRoomTitleLength"
            class="error--text"
        >
              {{ $t('errSizeRoomName',{
              countSymbols: validationRules.maxRoomTitleLength,
            })
                }}
        </div>
      </v-col>
    </v-row>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {smartModule} from "@/store";
import {IMessage} from "@/types";
import Api from "@/api";

@Component({
  components: {},
})

export default class AddNewChat extends Vue {
  newRoomName: string = "";

  get username()  {
    return smartModule.getters.username;
  }

  get validationRules() {
    return smartModule.state.settings;
  }

  async createNewRoom() {
    await smartModule.actions.fetchRoomName(this.newRoomName);
    await this.sendFirstMessage(this.newRoomName)
    await smartModule.actions.fetchRoomHistory()
    // await this.$store.commit('updateRoomHistory', []);

    this.newRoomName = "";
  }

  async sendFirstMessage(nameRoom: string) {
    let firstMsg = String(this.$t("firstRoomMsg", {
      nameUser: this.username,
      nameRoom: nameRoom
    }))

    let message: IMessage = {
      room: nameRoom,
      text: firstMsg,
    };

    console.log('msg', message);

    await smartModule.actions.sendMsgToWS(message);
    await smartModule.actions.fetchRoomsList();

    // await smartModule.actions.fetchRoomHistory();
  }
}
</script>

