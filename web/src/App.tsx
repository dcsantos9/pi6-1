import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import { AuthProvider } from './hooks/auth';
import ToastContainer from './components/ToastContainer';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
    <BrowserRouter>
        <AppProvider>
                <Routes />
        </AppProvider>
        <GlobalStyle/>
    </BrowserRouter>
);

export default App;
