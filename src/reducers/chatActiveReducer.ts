import { ChatActiveType } from "../types/ChatActiveType";
import { reducerActionType } from "../types/ReducerActionType";

export const chatActiveInitialState: ChatActiveType = {
    active: false,
    chatId: '',
    title: '',
    avatar: ''
}

export function chatActiveReducer(state: ChatActiveType, action: reducerActionType ) {
    
    switch(action.type) {
        case 'CHANGE_ACTIVE':
            return {...state, active: action.payload.active};
        break;
        case 'CHANGE_CHATID':
            return {...state, chatId: action.payload.chatId};
        break;
        case 'CHANGE_TITLE':
            return {...state, title: action.payload.title};
        break;
        case 'CHANGE_CHATAVATAR':
            return {...state, avatar: action.payload.avatar};
        break;
    }
    
    return state;
}