import { useContext } from "react";
import { Context } from "../context/Context";
import { ChatIntro } from "./ChatIntro";
import { ChatWindow } from "./ChatWindow";


export function ContentArea() {

    const { state, dispatch } = useContext(Context);

    return(
        <div className="flex-1">

            {state.active.chatId === '' && 
                <ChatIntro />
            }

            {state.active.chatId !== '' && 
                <ChatWindow />
            }   
            
        </div>
    );
}