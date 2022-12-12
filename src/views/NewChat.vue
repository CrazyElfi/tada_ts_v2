<template>
  <v-container
      class="form-wrapper ma-auto"
  >
  <c-add-new-chat />
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import AddNewChat from '@/components/ui/AddNewChat.vue';

@Component({
  components: {
    'c-add-new-chat': AddNewChat,
  },
})

export default class NewChat extends Vue {

}
</script>
