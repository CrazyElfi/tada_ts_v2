export interface IRoom {
    name: string,
    last_message: IMessage,
}

export interface IMessage {
    room: string | symbol,
    created?: string,
    sender?: ISender,
    text: string
}

export interface ISender {
    username: string | symbol
}

export interface IAppSettings {
    maxMessageLength: number,
    maxRoomTitleLength: number,
    maxUsernameLength: number,
    uptime: number,
}
