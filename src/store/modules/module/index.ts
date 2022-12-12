import {Actions, Getters, Module, Mutations, registerModule} from 'vuex-smart-module'
import Api from "@/api";

import {IAppSettings, IMessage, IRoom} from "@/types";


class ModuleState {
    rooms: IRoom[] = [];
    roomHistory: IMessage[] = [];
    roomName: string = '';
    username: string = "Козьма Прутков";
    settings: IAppSettings = {
        maxMessageLength: 50,
        maxRoomTitleLength: 50,
        maxUsernameLength: 50,
        uptime: 0,
    };
}

class ModuleGetters extends Getters<ModuleState> {
    get nameRoom(): string {
        return this.state.roomName
    }

    get username(): string {
        return this.state.username;
    }

    get history(): IMessage[] {
        return this.state.roomHistory;
    }

    get rooms(): IRoom[] {
        return this.state.rooms;
    }
}

class ModuleMutations extends Mutations<ModuleState> {
    updateRoomsList(rooms: any) {
        this.state.rooms = rooms;
    }

    updateRoomHistory(history: any) {
        this.state.roomHistory = history;
    }

    updateRoomName(name: string) {
        this.state.roomName = name;
    }

    updateUserName(name: string) {
        this.state.username = name;
    }

    updateSettings(settings: any) {
        this.state.settings = settings;
    }
}

class ModuleActions extends Actions<
    ModuleState,
    ModuleGetters,
    ModuleMutations,
    ModuleActions
    > {
    async fetchRoomsList() {
        const data = await Api.getRooms();
        this.commit('updateRoomsList', data);
    }

    async fetchRoomHistory() {
        const data = await Api.getRoomHistory(this.state.roomName);

        this.commit('updateRoomHistory', data);
    }

    fetchRoomName(roomName: string) {
        this.commit('updateRoomName', roomName);
    }

    fetchUserName(newName: string) {
        this.commit('updateUserName', newName);
    }

    async fetchSettings() {
        const data = await Api.getSettings();

        let settings = {
            maxMessageLength: data.max_message_length,
            maxRoomTitleLength: data.max_room_title_length,
            maxUsernameLength: data.max_username_length,
            uptime: data.uptime,
        };
        this.commit(`updateSettings`, settings);
    }

    connectWS() {
        Api.connectWebsocket(this.state.username);
    }

    sendMsgToWS(message: IMessage) {
        Api.sendMessageToWebsocket(message)
    }

    resetRoomHistoryAndName() {
        this.commit('updateRoomHistory', [])
        this.commit('updateRoomName', '' )
    }
}


const storeModule = new Module({
    state: ModuleState,
    getters: ModuleGetters,
    mutations: ModuleMutations,
    actions: ModuleActions
})

export default storeModule
