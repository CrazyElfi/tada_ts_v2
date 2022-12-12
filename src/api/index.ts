import axios from "axios";
import {IMessage} from "@/types";
import {smartModule} from "@/store";
import i18n from "@/i18n";

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
        ws = new WebSocket(`wss://nane.tada.team/ws?username=${encodeURIComponent(userName)}`);
        // ws.addEventListener('open', () => {
        //     console.log("connected to WS!");
        // });

        ws.onopen = async function (e: object) {
            console.log(`${i18n.t('wsConnectOpen')}`);
            await this.pingWS
        };

        ws.onmessage = async function (event: object) {
            // console.log(`[message] Данные получены с сервера: ${event.data}`);
            await smartModule.actions.fetchRoomsList();
        };

        ws.onclose = function(event: any) {
            if (event.wasClean) {
                console.log(`${i18n.t('wsConnectCloseWithReason', {
                    code: event.code,
                    reason: event.reason
                })}`);
            } else {
                console.log(`${i18n.t('wsConnectClose')}`);
            }
        };

        ws.onerror = function(error: any) {
            console.log(`${i18n.t('wsError')}`);
        };
    },

    pingWS() {
        if (!this.isOpen(ws)) return
        ws.send(JSON.stringify({"ping": true}));

        ws.onmessage = async function (event: any) {
            if(event.data.pong !== true) {
                console.log(`${i18n.t('wsReconnect')}`);

                this.connectWebsocket(smartModule.state.username)
            }
        };
    },

    sendMessageToWebsocket(msg: IMessage) {
        if (!this.isOpen(ws)) return
        ws.send(JSON.stringify(msg));
    },

    isOpen(ws: any) { return ws.readyState === ws.OPEN },
}
