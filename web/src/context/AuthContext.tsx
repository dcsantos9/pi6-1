import React, { createContext , useCallback } from 'react';
import api from '../services/api';

interface SignIntCredendials {
    email: string;
    password: string;
}

interface AuthContextData {
    name: string;
    signIn(credentials: SignIntCredendials): Promise<void>;
}

 const AuthContext = createContext<AuthContextData>(
     {} as AuthContextData,
 );

 const AuthProvider: React.FC = ({ children }) => {
     const signIn = useCallback(async ({ email, password })=>{
         const response = await api.post('sessions', {
             email,
             password
         });
         console.log(response.data);

         console.log('signIn');
     },[]);

    return(
        <AuthContext.Provider value={{ name: 'fooo' , signIn }} >
            {children}
        </AuthContext.Provider>
    );
 };

 export  { AuthContext, AuthProvider }
