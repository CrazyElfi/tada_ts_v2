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
        console.log('connectWebsocket!')
        ws = new WebSocket(`wss://nane.tada.team/ws?username=${userName}`);
        // ws.addEventListener('open', () => {
        //     console.log("connected to WS!");
        // });

        ws.onopen = function(e: any) {
            console.log("[open] Соединение установлено");
        };

        ws.onmessage = function(event: any) {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };

        ws.onclose = function(event: any ) {
            console.log()
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                console.log('[close] Соединение прервано');
            }
        };

        ws.onerror = function(error: any) {
            console.log(`[error]`);
        };
    },

    pingWS() {
        let ping = ws.send(JSON.stringify({"ping": true}));
        console.log('1', ping)
        // if() {
        //
        // }
    },

    sendMessageToWebsocket(msg: IMessage) {
        console.log('msg ws', msg)
        ws.send(JSON.stringify(msg));
    }
}
