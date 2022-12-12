<template>
  <v-container
      class="form-wrapper ma-auto"
  >
    <v-row  class="d-flex justify-space-between align-center mb-2">
      <v-col cols="4">
        {{$t('yourName')}}
      </v-col>
      <v-col cols="8">
        <input
            v-model="username"
            class="input pa-1"
            type="text"
            :placeholder='$t("typeYourName")'
        />
        <div
            v-if="username.length > validationRules.maxUsernameLength"
            class="error--text"
        >
         {{ $t('errSizeName',{
                        countSymbols: validationRules.maxUsernameLength,
                      })
        }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {smartModule} from "../store";

@Component({
  components: {
  },
})

export default class FormPage extends Vue {
  get username(): string {
    return smartModule.state.username;
  }
  set username(newName: string) {
    smartModule.actions.resetRoomHistoryAndName();
    smartModule.actions.fetchUserName(newName);
  }

  get validationRules() {
    return smartModule.state.settings;
  }
}
</script>

<style lang="scss">
.form-wrapper {
  //width: ;
}
</style>
