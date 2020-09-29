import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import { AuthProvider } from './hooks/AuthContext';
import ToastContainer from './components/ToastContainer';

import AppProvider from './hooks';

const App: React.FC = () => (
    <>
        <AppProvider>
            <SignIn></SignIn>
        </AppProvider>

        <GlobalStyle/>
    </>
);

export default App;
