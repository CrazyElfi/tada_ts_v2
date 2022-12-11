import axios from "axios";
import {IMessage} from "@/types";

let ws: any = null;

export default {
    async getRooms() {
        const data = await axios.get('https://nane.tada.team/api/rooms');
        return data.data?.result;
    },

    async getRoomHistory(nameRoom: string) {
        const data = await axios.get(`https://nane.tada.team/api/rooms/${nameRoom}/history`);
        return data.data?.result;
    },

    async getSettings() {
        const data = await axios.get(`https://nane.tada.team/api/settings`);
        return data.data?.result;
    },

    connectWebsocket(userName: string) {
        ws = new WebSocket(`wss://nane.tada.team/ws?username=${userName}`);
        ws.addEventListener('open', () => {
            console.log("connected to WS!");
        });
    },

    sendMessageToWebsocket(msg: IMessage) {
        ws.send(JSON.stringify(msg));
    }
}
