import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, addDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth'

import firebaseConfig from './firebaseConfig';
import { UserType } from "./types/UserType";
import React from "react";
import { ChatItemType } from "./types/ChatItemType";
import { MessageType } from "./types/MessageType";
import { ChatActiveType } from "./types/ChatActiveType";

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);

export default {
    fbPopup: async () => {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        try {
            let result = await signInWithPopup(auth, provider);
            return result;
        } catch(error) {
            alert('Erro!')
        }
    },
    addUser: async (u: UserType) => {
        await setDoc(doc(db, 'users', u.id), {
            name: u.name,
            avatar: u.avatar
        }, {merge:true});
    },
    getContactList: async (userId: string) => {
        let list: UserType[] = [];

        let results = await getDocs(collection(db, 'users'));
        results.forEach((result) => {
            let data = result.data();

            if(result.id !== userId) {
                list.push({
                    id: result.id,
                    name: data.name,
                    avatar: data.avatar
                })
            }
        });
        return list;
    },
    //Estou criando um novo documento na coleção chats(se ela n existe, vai ser criada)
    addNewChat: async (user: UserType, user2: UserType) => {
        let newChat = await addDoc(collection(db, 'chats'), {
            messages: [],
            users: [user.id, user2.id]
        });

        //Estou atualizando a lista de chats do usuário para conter o newChat
        await updateDoc(doc(db, 'users', user.id), {
            chats: arrayUnion({
                chatId: newChat.id,
                title: user2.name,
                image: user2.avatar,
                with: user2.id
            })
        });

        await updateDoc(doc(db, 'users', user2.id), {
            chats: arrayUnion({
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            })
        });
    },
    //Estou detectando alterações o documento 'userId' da coleção users
    onChatList: (userId: string, setChatList: React.Dispatch<React.SetStateAction<ChatItemType[]>>) => {
        return onSnapshot(doc(db, 'users', userId), (doc) => {
            if(doc.exists()) {
                let data = doc.data();

                if(data.chats) {
                    let chats = [...data.chats];

                    chats.sort((a: ChatItemType,b: ChatItemType) => {
                        if(!(a.lastMessageDate instanceof Date) && !(b.lastMessageDate instanceof Date)) {
                            if(a.lastMessageDate === undefined) {
                                return -1;
                            }
                            if(a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                                return 1;
                            } else {
                                return -1
                            }
                        } else {
                            return 1;
                        }
                    });
                    setChatList(chats);
                }
            }
        })
    },
    //Checa atualizações no chat, se tiver, altero as mensagens e os usuários evnolvidos
    onChatContent: (chatId: string, setList: React.Dispatch<React.SetStateAction<MessageType[] | undefined>>, setUsers: React.Dispatch<React.SetStateAction<string[]>>) => {
        return onSnapshot(doc(db, 'chats', chatId), (doc) => {
            if(doc.exists()) {
                let data = doc.data();
                setList(data.messages);
                setUsers(data.users);
            }
        })
    },
    //Quando envio a msg, atualizo as mensagens no chat e no registro dos usuários
    sendMessage: async (chatData: ChatActiveType, userId: string, type: string, body: string, users: string[]) => {
        let now = new Date();

        //Primeiro atualizo as msg no banco de dados do chat, isso faz com que o onChatContent pegue a mudança
        updateDoc(doc(db, 'chats', chatData.chatId), {
            messages: arrayUnion({
                type,
                author: userId,
                body,
                date: now
            })
        });

        //Para atualizar last message preciso atualizar o bd dos users
        for(let i in users) {
            let u = await getDoc(doc(db, 'users', users[i]));
            let uData = u.data();
            if(uData) {
                if(uData.chats) {
                    let chats: ChatItemType[] = [...uData.chats];

                    for(let e in chats) {
                        if(chats[e].chatId === chatData.chatId) {
                            chats[e].lastMessage = body;
                            chats[e].lastMessageDate = now;
                        }
                    }

                    await updateDoc(doc(db, 'users', users[i]), {
                        chats
                    })
                }
            }
        }
    }
}