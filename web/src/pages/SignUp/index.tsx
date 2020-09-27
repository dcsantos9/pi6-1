import React, { useCallback} from 'react';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft, FiUser , FiMail , FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';
import * as Yup from 'yup';

const SignUp: React.FC = () => {
    const handleSubmit = useCallback( async (data: object) => {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email("Digite um e-mail válido"),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

        } catch (err) {
            console.log(err);
        }

    },[]);
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
