import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { MessageType } from "../types/MessageType";

type Props = {
    data: MessageType
}

export function MessageItem({data}: Props) {

    const {state, dispatch} = useContext(Context);

    const [time, setTime] = useState('');

    useEffect(() => {

        if(!(data.date instanceof Date) && data.date) {
            let d = new Date(data.date.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            let sHours = hours < 10 ? '0'+hours : hours.toString();
            let sMinutes = minutes < 10 ? '0'+minutes : minutes.toString();
            setTime(`${sHours}:${sMinutes}`);
        }
    }, [data]);

    return(
        <div className={`px-4 py-1 flex ${data.author === state.user.id ? 'justify-end' : ''}`}>
            <div className={`p-3 max-w-[60%] rounded-lg flex flex-col shadow ${data.author === state.user.id ? 'bg-blue-500' : 'bg-slate-100'}`}>
                <div className="pr-11 text-base text-black">{data.body}</div>
                <span className={`mt-[-15px] text-right text-xs ${state.theme.colors.textSecondaryColor} ${data.author === state.user.id ? 'text-white' : ''}`}>{time}</span>
            </div>
        </div>
    );
}