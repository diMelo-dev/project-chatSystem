import { Toogler } from "./Toggler";
import { useContext, useState, useEffect } from 'react';
import { ChatListItem } from './ChatListItem';
import { ChatItemType } from "../types/ChatItemType";
import { chatListData } from "../helpers/data";
import { Context } from "../context/Context";
import { NewChat } from "./NewChat";
import api from '../api';

export function SideBar() {

    const [chatList, setChatList] = useState<ChatItemType[]>([]);
    const [activeChat, setActiveChat] = useState<string>();
    const { state, dispatch } = useContext(Context);
    const [showNewChat, setShowNewChat] = useState(false);

    useEffect(() => {
        if(state.user !== null) {
            let unsub = api.onChatList(state.user.id, setChatList);
            return unsub;
        }
    }, [state.user]);

    function handleClick(clickedChat: ChatItemType) {
        dispatch({
            type: 'CHANGE_ACTIVE',
            payload: {
                active: true
            }
        });
        dispatch({
            type: 'CHANGE_CHATID',
            payload: {
                chatId: clickedChat.chatId
            }
        });
        dispatch({
            type: 'CHANGE_TITLE',
            payload: {
                title: clickedChat.title
            }
        });
        dispatch({
            type: 'CHANGE_CHATAVATAR',
            payload: {
                avatar: clickedChat.image
            }
        });

    }

    function handleShowNewChat() {
        setShowNewChat(false);
    }

    return(
        <div className=" max-w-[415px] w-1/3 border-r-2 border-slate-300/50 flex flex-col gap-3">

            <header className="p-3 rounded flex justify-between">
                <div className="w-[40px] bg-green-500 rounded-full overflow-hidden">
                    {state.user.avatar &&
                        <img src={state.user.avatar} />
                    }
                    {!state.user.avatar &&
                        <div className="w-full bg-blue-500"></div>
                    }
                </div>

                <div className="flex items-center gap-2">

                    <Toogler />

                    <div className="cursor-pointer" onClick={() => setShowNewChat(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </div>

                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </div>

                </div>
                
            </header>

            <NewChat show={showNewChat} setShow={handleShowNewChat} chatList={chatList}/>

            <div className="p-3">
                <div className="py-2 px-5 bg-slate-200/30 rounded-full flex gap-2">

                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>

                    <input type='search' className=" bg-transparent outline-none flex-1" placeholder="Search message..."/>

                </div>
            </div>

            <div className="flex flex-col gap-2 p-3 pr-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300/50 ">
                {chatList.map((item, index) => (
                    <ChatListItem key={index} active={state.active.chatId === item.chatId} data={item} onClick={() => handleClick(item)}/>
                ))}
            </div>

        </div>
    );
}