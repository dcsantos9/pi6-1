import React from 'react';
import logoImg from '../../assets/logo.svg';
import {FiLogIn , FiMail , FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
<Container>
    <Content>
        <img src={logoImg} alt="QueroPet"/>
        <form>
            <h1>Faça seu Logon</h1>

            <Input icon={FiMail} name="email" placeholder="E-Mail"/>
            <Input icon={FiLock} name="password" placeholder="Senha" />
            <Button type="submit">Entrar</Button>
            <a href="forgot">Esqueci minha senha</a>

        </form>

        <a href="forgot"><FiLogIn/> Criar conta</a>
    </Content>
    <Background />
</Container>

);
export default SignIn;
