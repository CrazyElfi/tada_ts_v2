<template>
    <v-container class="pa-0">
      <div>
        <div class="user-name">{{ message.sender.username }}</div>
        <div class="msg-time">
          {{ $moment(message.created).format('HH:mm:ss DD/MM/YYYY') }}
        </div>
      </div>

      <div class="mt-2"> {{message.text}}</div>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IMessage } from "@/types";

@Component({
  components: {
    // 'c-test': test2comp,
  },
})

export default class MessageCard extends Vue {
  @Prop() private message!: IMessage;
}
</script>

<style lang="scss" scoped>
.user-name {
  color: #00008b;
}

.msg-time {
  font-size: 10px;
  color: rgba(0, 0, 139, 0.4);
}

</style>
