import React from 'react';
import { Switch  } from 'react-router-dom';
import Route from './Route';
import Dashboard from '../pages/Dashboard';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Test from '../pages/Test';
import CadastroInstituicao from '../pages/CadastroInstituicao';


const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/test" exact component={Test} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/dashboard" exact component={Dashboard} isPrivate />
       
        {/*Necessario voltar telas a seguir para private */}
        <Route path="/cadastroInstituicao" exact component={CadastroInstituicao}  />
    </Switch>
);

export default Routes;
