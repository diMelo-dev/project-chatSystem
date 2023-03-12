import { Timestamp } from "firebase/firestore"

export type MessageType = {
    author: string,
    body: string,
    date: Timestamp |Date
}