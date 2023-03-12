import { useContext, useEffect, useState } from "react";
import { Context } from '../context/Context';


export function Toogler() {

    const { state, dispatch } = useContext(Context);



    useEffect(() => {
        document.documentElement.classList.toggle('dark');
    }, [state.theme.status]);

    function switchTheme() {
        if(state.theme.status === 'dark') {
            dispatch({
                type: 'CHANGE_STATUS',
                payload: {
                    status: 'light'
                }
            });
            dispatch({
                type: 'CHANGE_COLORS',
                payload: {
                    colors: {
                        bgColor: 'bg-[#ece8de]',
                        textPrimaryColor: 'text-[#18122B]',
                        textSecondaryColor: 'text-[#808da2]'
                    }
                }
            });
        } else {
            dispatch({
                type: 'CHANGE_STATUS',
                payload: {
                    status: 'dark'
                }
            });
            dispatch({
                type: 'CHANGE_COLORS',
                payload: {
                    colors: {
                        bgColor: 'bg-[#0f172a]',
                        textPrimaryColor: 'text-[#e2e8f0]',
                        textSecondaryColor: 'text-[#808da2]'
                    }
                }
            });
        }
        
    }

    return(
        <div 
        className=" p-[3px] border-[2px] border-slate-400/20 rounded cursor-pointer"
        onClick={switchTheme}
        >
            {state.theme.status === 'light' &&
                <svg width="25" height="25" fill="#0e87c0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.977 6.977 0 0 0 10 7Zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12Z"></path>
                </svg>
            }
            {state.theme.status === 'dark' && 
                <svg width="25" height="25" fill="#0e87c0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93v-.001ZM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121Zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121v-.001ZM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121ZM23 11v2h-3v-2h3ZM4 11v2H1v-2h3Z"></path>
                </svg>
            }
        </div>
    );

}