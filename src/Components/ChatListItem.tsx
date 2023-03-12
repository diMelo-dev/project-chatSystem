import { Context } from "../context/Context";
import { useContext, useState, useEffect } from 'react';
import { ChatItemType } from "../types/ChatItemType";
import { Timestamp } from "firebase/firestore";

type Props = {
    data: ChatItemType,
    active: boolean,
    onClick: () => void
}

export function ChatListItem({data, active, onClick}: Props) {

    const { state, dispatch } = useContext(Context);
    const [time, setTime] = useState('');

    useEffect(() => {

        if(!(data.lastMessageDate instanceof Date) && data.lastMessageDate) {
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            let sHours = hours < 10 ? '0'+hours : hours.toString();
            let sMinutes = minutes < 10 ? '0'+minutes : minutes.toString();
            setTime(`${sHours}:${sMinutes}`);
        }
    }, [data]);

    return(
        <div className={`px-2 rounded-2xl flex items-center gap-2 cursor-pointer transition-all duration-400 ${active === true ? 'bg-blue-500/80 text-white' : ''} hover:bg-blue-500/80 hover:text-white ${state.theme.colors.textSecondaryColor}`} onClick={onClick}>
            
            <div className="w-[40px] flex items-center bg-green-500 rounded-full overflow-hidden">
                <img src={data.image} />
            </div>

            <div className="py-4 border-b-[1px] h-full border-slate-200/50 flex-1 flex flex-col min-w-0">

                <div className="flex justify-between">
                    <div className={`font-bold ${state.theme.colors.textPrimaryColor}`}>{data.title}</div>
                    <span className={``}>{time}</span>
                </div>

                <div className="">
                    <p className={`w-full whitespace-nowrap overflow-hidden text-ellipsis `}>{data.lastMessage}</p>
                </div>
            </div>

        </div>
    );
}