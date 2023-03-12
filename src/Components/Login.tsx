import { User } from 'firebase/auth';
import api from '../api';

type Props = {
    onReceive: (u: User) => void
}

export function Login({onReceive}: Props) {

    async function handleFacebookLogin() {
        let result = await api.fbPopup();

        if(result) {
            onReceive(result.user);
            console.log(result.user);
        } else {
            alert('Erro!')
        }
    }

    return(
        <div className="h-screen flex items-center justify-center bg-blue-500">
            <button className="px-4 py-2 rounded text-white border-2 border-slate-200 font-bold transition-all hover:bg-slate-200 hover:text-black" onClick={handleFacebookLogin}>Login</button>
        </div>
    );
}