import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../context/Context";
import { MessageType } from "../types/MessageType";
import './ChatWindow.css';
import { MessageItem } from "./MessageItem";
import api from '../api';
import { UserType } from "../types/UserType";

export function ChatWindow() {

    const { state, dispatch } = useContext(Context)

    const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
    const [text, setText] = useState('');
    const [list, setList] = useState<MessageType[]>();
    const body = useRef<HTMLDivElement>(null);
    const [users, setUsers] = useState<string[]>([]);


    useEffect(() => {
        setList([]);
        let unsub = api.onChatContent(state.active.chatId, setList, setUsers);
        return unsub;
    }, [state.active.chatId]);

    useEffect(() => {
        if(body.current) {
            if(body.current.scrollHeight > body.current.offsetHeight) {
                body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
            }
        }
        
    }, [list, state.active.chatId]);

    function handleEmojiClick(emoji: EmojiClickData, event: MouseEvent) {
        setText( text + emoji.emoji);
    }

    function handleOpenEmoji() {
        setEmojiOpen(true);
    }

    function handleCloseEmoji() {
        setEmojiOpen(false);
    }

    function handleInputKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') {
            handleSendClick();
        }
    }

    function handleSendClick() {
        if(text !== '') {
            api.sendMessage(state.active, state.user.id, 'text', text, users);
            setText('');
            setEmojiOpen(false);
        }
    }


    return(
        <div className="h-full flex flex-col">
            
            <div className="p-3 border-b-2 border-slate-200/50 shadow-sm flex justify-between">
            
                <div className="flex items-center gap-5">

                    <div className="w-[40px] bg-green-500 rounded-full overflow-hidden">
                        <img src={state.active.avatar} />
                    </div>

                    <span className="text-lg">{state.active.title}</span>

                </div>
                <div className="flex items-center gap-2">

                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>

                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                        </svg>
                    </div>

                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </div>

                </div>

            </div>{/* HEADER */}

            <div ref={body} className="flex-1 bg-hero-pattern bg-cover bg-center overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-300/50">
                {list && 
                    list.map((item, index) => (
                        <MessageItem key={index} data={item}/>
                    ))
                }
            </div>{/* BODY */}


            <div className={`${emojiOpen ? 'h-[220px]' : 'h-[0px]'} transition-all`}>
                <EmojiPicker onEmojiClick={handleEmojiClick} skinTonesDisabled searchDisabled previewConfig={{showPreview: false}} height='100%' width='100%'/>
            </div>

            <div className="p-3 border-t-2 border-slate-200/50 flex items-center gap-5">
                
                <div className="flex gap-2">

                    <div className="cursor-pointer" onClick={handleCloseEmoji}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${emojiOpen ? 'w-6 h-6' : 'w-0'} transition-all`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <div className='cursor-pointer' onClick={handleOpenEmoji}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${emojiOpen ? ' stroke-blue-500' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                        </svg>
                    </div>
 
                </div>

                <div className="flex-1">
                    <input value={text} onChange={(e) => setText(e.target.value)} onKeyUp={(e) => handleInputKeyUp(e)} className='w-full py-2 px-5 shadow-lg bg-slate-200/30 rounded-full outline-none' type='text' placeholder="Type Message..." />
                </div>

                <div className="">

                    {text !== '' && 
                        <div className="cursor-pointer" onClick={handleSendClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </div>
                    }

                    {text === '' &&
                        <div className="cursor-pointer" onClick={handleSendClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                    }{/* Send Button */}

                </div>

            </div>{/* FOOTER */}

        </div>
    );
}