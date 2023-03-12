import { useContext } from 'react';
import introLogo from '../assets/images/chatLogo.png';
import { Context } from '../context/Context';

export function ChatIntro() {

    const { state, dispatch } = useContext(Context);

    return(
        <div className="h-full flex flex-col items-center justify-center gap-4">

            <div className=" w-80 p-11 rounded-full bg-blue-500/80">
                <img src={introLogo} />
            </div>

            <h1 className=" text-4xl">
                Chat easily from anywhere.
            </h1>

            <h2 className={`text-xl ${state.theme.colors.textSecondaryColor}`}>
                Communicate with your friends in a simple and fast way.
            </h2>

        </div>
    );
}