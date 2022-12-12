<template>
 <v-col cols="4">
   <c-add-new-chat />

   <v-row  class="d-flex justify-space-between align-center mb-2">
     <v-col cols="4">
       {{$t('yourName')}}
     </v-col>
     <v-col cols="8">
       <!--      v-model="$v.username.$model"-->
       <input
           v-model="username"
           class="input pa-1"
           type="text"
           :placeholder='$t("typeYourName")'
       />
       <!--      <div class="error&#45;&#45;text" v-if="!$v.username.maxLength">-->
      <!--       {{ $t('errSizeName',{
                      countSymbols: validationRules.maxUsernameLength,
                    }
      '}}-->
       <!--      </div>-->
     </v-col>
   </v-row>

     <v-row v-if="roomsList" class="rooms-list" dense>
       <v-col v-for="(item, index) in roomsList" :key="index" cols="12">
         <!--      <room-card :room="item" @open="openChat(item.name)"/>-->
         <v-card>
           <v-card-title class="subtitle-1">
             {{$t("room")}}: {{ item.name }}
           </v-card-title>

           <v-card-subtitle class="pb-0">
             <div>{{$t("lastMsg")}}:</div>
             <c-message-card
                 class="last-msg pa-1"
                 :message = item.last_message
             />
           </v-card-subtitle>

           <v-card-actions>
             <v-btn
                 class="ma-2"
                 outlined
                 small
                 color="indigo"
                 @click="openChat(item.name)">
               {{ $t('enter') }}
             </v-btn>
           </v-card-actions>
         </v-card>
       </v-col>

     </v-row>

     <v-row v-else>
       <v-col>
         <h3 class="d-flex justify-space-between align-center mt-5">
           {{ $t('emptyList') }}
         </h3>
       </v-col>
     </v-row>

 </v-col>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {smartModule} from "@/store";
import AddNewChat from '@/components/ui/AddNewChat.vue';
import MessageCard from "@/components/ui/MessageCard.vue";
import {IRoom} from "@/types";

@Component({
  components: {
    'c-add-new-chat': AddNewChat,
    'c-message-card': MessageCard,
  },
})

export default class RoomsList extends Vue {

  get roomsList(): IRoom[] {
    return smartModule.getters.rooms
  }

  get username(): string {
    return smartModule.state.username;
  }
  set username(newName: string) {
    smartModule.actions.resetRoomHistoryAndName();
    smartModule.actions.fetchUserName(newName);
  }

  async mounted() {
    await smartModule.actions.fetchRoomsList();
    await smartModule.actions.fetchSettings();
  }

  openChat(nameRoom:string) {
    smartModule.actions.fetchRoomName(nameRoom);
    smartModule.actions.fetchRoomHistory();
  }
}
</script>


<style lang="scss" scoped>
.rooms-list {
  //overflow-y: auto;
}

.last-msg {
  width: 100%;
  border: 1px solid darkblue;
  outline: none;
  border-radius: 4px;
}
</style>
