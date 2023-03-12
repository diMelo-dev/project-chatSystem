import { reducerActionType } from "../types/ReducerActionType";
import { UserType } from "../types/UserType";

export const userInitialState: UserType | null = null;

export function userReducer(state: UserType, action: reducerActionType ) {
    
    switch(action.type) {
        case 'CHANGE_ID':
            return {...state, id: action.payload.id};
        break;
        case 'CHANGE_USERAVATAR':
            return {...state, avatar: action.payload.avatar}
        break;
        case 'CHANGE_NAME':
            return {...state, name: action.payload.name};
        break;
    }
    
    return state;
}