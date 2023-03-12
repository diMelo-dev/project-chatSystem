import { useContext } from "react";
import { useEffect } from 'react';
import { UserType } from './types/UserType';
import { ContentArea } from "./Components/ContentArea";
import { Login } from "./Components/Login";
import { SideBar } from "./Components/SideBar";
import { Context } from "./context/Context";
import { User } from "firebase/auth";
import api from './api';

function App() {

  const { state, dispatch } = useContext(Context);
  
  
  

    async function handleLoginData(u: User) {
        let newUser: UserType = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        }
        await api.addUser(newUser);
        dispatch({
            type: 'CHANGE_ID',
            payload: {
                id: newUser.id
            }
        });
        dispatch({
            type: 'CHANGE_USERAVATAR',
            payload: {
                avatar: newUser.avatar
            }
        });
        dispatch({
            type: 'CHANGE_NAME',
            payload: {
                name: newUser.name
            }
        });
    }

    if(state.user == null) {
        return( <Login onReceive={handleLoginData}/> )
    }
  

  return (
    <div className={`h-screen flex ${state.theme.colors.bgColor} ${state.theme.colors.textPrimaryColor}`}>
        <SideBar />
        <ContentArea />
    </div>
  )
}

export default App
