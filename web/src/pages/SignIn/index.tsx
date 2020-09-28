import React, { useCallback, useRef} from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {FiLogIn , FiMail , FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const handleSubmit = useCallback( async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email("Digite um e-mail válido"),
                password: Yup.string().required('Senha obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

        } catch (err) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
            console.log(errors);
        }

    },[]);
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="QueroPet"/>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Logon</h1>

                    <Input icon={FiMail} name="email" placeholder="E-Mail"/>
                    <Input icon={FiLock} name="password" placeholder="Senha" />
                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>

                </Form>

                <a href="forgot"><FiLogIn/> Criar conta</a>
            </Content>
            <Background />
        </Container>
    );

};
export default SignIn;
