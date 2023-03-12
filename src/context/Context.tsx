import { createContext, PropsWithChildren, useReducer } from "react";
import { chatActiveReducer } from "../reducers/chatActiveReducer";
import { themeInitialState, themeReducer } from '../reducers/themeReducer';
import { reducerActionType } from "../types/ReducerActionType";
import { ThemeType } from "../types/ThemeType";
import { chatActiveInitialState } from "../reducers/chatActiveReducer";
import { ChatActiveType } from "../types/ChatActiveType";
import { UserType } from "../types/UserType";
import { userInitialState, userReducer } from "../reducers/userReducer";

type initialStateType = {
    theme: ThemeType,
    active: ChatActiveType,
    user: UserType
}

type ContextType = {
    state: initialStateType,
    dispatch: React.Dispatch<any>
}

const initialState = {
    theme: themeInitialState,
    active: chatActiveInitialState,
    user: userInitialState
}

export const Context = createContext<ContextType>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (state: initialStateType, action: reducerActionType) => ({
    theme: themeReducer(state.theme, action),
    active: chatActiveReducer(state.active, action),
    user: userReducer(state.user, action)
});


export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return(
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
}

