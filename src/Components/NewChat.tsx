import { Context } from "../context/Context";
import { useContext, useState, useEffect } from 'react';
import { ChatItemType } from "../types/ChatItemType";
import api from '../api';
import { UserType } from "../types/UserType";

type Props = {
    show: boolean,
    setShow: () => void,
    chatList: ChatItemType[]
}

export function NewChat({show, setShow, chatList}: Props) {

    const { state, dispatch } = useContext(Context);
    

    const [list, setList] = useState<UserType[]>();

    useEffect(() => {
        const getList = async () => {
            if(state.user !== null) {
                let results = await api.getContactList(state.user.id);
                setList(results);
            }
        }
        getList();
    }, [state.user]);

    async function addNewChat(user2: UserType) {
        await api.addNewChat(state.user, user2);

        setShow();
    }

    return(
        <div className={`w-1/3 max-w-[415px] fixed border-r-2 border-slate-300/50 top-0 bottom-0 flex flex-col transition-all ${state.theme.colors.bgColor} ${show ? 'left-0' : 'left-[-415px]'}`}>
            <div className="p-4 pt-14 flex items-center gap-3 bg-blue-500 text-white">

                <div className="cursor-pointer" onClick={setShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </div>
                
                <h1 className="font-bold text-lg">
                    New Chat
                </h1>

            </div>{/* HEADER */}

            <div className="flex-1 flex flex-col gap-2 p-3 pr-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300/50">
                {list && 
                    list.map((item, index) => (
                        <div onClick={() => addNewChat(item)} key={index} className={`px-2 py-4 rounded-2xl flex items-center gap-2 cursor-pointer transition-all duration-400 hover:bg-blue-500`}>
                            <div className="w-[40px] bg-green-500 rounded-full overflow-hidden">
                            {item.avatar &&
                                <img src={item.avatar} />
                            }
                            {!state.user.avatar &&
                                <div className="w-full bg-blue-500"></div>
                            }
                            </div>
                            <span className="">{item.name}</span>
                        </div>
                    ))
                }
                
            </div>{/* CONTACTS */}
        </div>
    );
}