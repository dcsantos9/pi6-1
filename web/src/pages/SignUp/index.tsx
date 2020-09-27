import React from 'react';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft, FiUser , FiMail , FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

const SignUp: React.FC = () => {
    function handleSubmit(data: object): void {
        console.log(data);
    }
    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="QueroPet"/>
                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome"/>
                    <Input icon={FiMail} name="email" placeholder="E-Mail"/>
                    <Input icon={FiLock} name="password" placeholder="Senha" />
                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="forgot"><FiArrowLeft/>Voltar para Logon</a>
            </Content>

        </Container>
    );
};
export default SignUp;
