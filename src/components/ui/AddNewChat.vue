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
          new chat
        </v-btn>
      </v-col>

      <v-spacer />

      <v-col cols="6">
        <!--            v-model="$v.newRoomName.$model"-->
        <input
            v-model="newRoomName"
            class="input pa-1"
            type="text"
            placeholder="Type new room name"
        />
<!--        <div class="error&#45;&#45;text" v-if="!$v.newRoomName.maxLength">-->
<!--          Максимальный размер имени комнаты {{ validationRules.maxRoomTitleLength }}-->
<!--        </div>-->
      </v-col>
    </v-row>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {smartModule} from "@/store";

@Component({
  components: {},
})

export default class AddNewChat extends Vue {
  newRoomName: string = "";

  async createNewRoom() {
    await smartModule.actions.fetchRoomName(this.newRoomName);
    await this.$store.commit('updateRoomHistory', null);
    this.newRoomName = "";
  }
}
</script>

