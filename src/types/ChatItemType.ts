import { Timestamp } from "firebase/firestore"

export type ChatItemType = {
    chatId: string,
    image: string,
    title: string,
    lastMessage: string,
    lastMessageDate: Timestamp | Date
}