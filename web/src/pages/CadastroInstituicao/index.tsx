import React, { useCallback, useRef, useContext } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, AnimationContainer, Background } from './styles';
//import { Container, Content, AnimationContainer } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import InputFormulario from '../../components/InputFormulario';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import imgPhoto from '../../assets/cat-login.jpg';
interface CadastroInstituicaoFormData {
    nome: string;
    social_id: string;
    info: string;
    email: string;
    phone: string;
    PhoneType: string;
    street: string;
    number: string;
    complement: string;
    neightborhood: string;
    city: string;
    state: string;
    zipcode: string;
    password: string;
}

const CadastroInstituicao: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast, removeToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: CadastroInstituicaoFormData) => {

        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email("Digite um e-mail válido"),
                password: Yup.string().required('Senha obrigatória'),
            });


            history.push('/dashboard');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                console.log(errors);
            }
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Occorreu um erro ao fazer login, cheque as credenciais',
            });

        }
    }, [addToast, history]);
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="QueroPet" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1><span>Cadastro</span></h1>
                        <h3><span>Dados</span></h3>
                        <img src={imgPhoto}></img>
                        <div className="item">
                            <label></label>
                            <input type="file" id="file" name="filename" value="" />
                            <Button type="submit" name="sendPhoto" className="button button2">enviar</Button>
                        </div>
                        <div className="item">
                            <label>nome</label>
                            <InputFormulario name="name" />
                        </div>

                        <div className="item divMargin">
                            <label>
                                <input type="radio" value="CNPJ" className="radio" />
                                CNPJ
                            </label>
                            <label>
                                <input type="radio" value="CPF" className="radio" />
                                CPF
                            </label>
                        </div>

                        <div className="item">
                            <label>documento</label>
                            <InputFormulario name="social_id" placeholder="00.000.000/0000-00" />
                        </div>

                        <div className="item">
                            <label>informações</label>
                            <textarea name="info" />

                        </div>
                        <h3><span>Contato</span></h3>
                        <div className="item">
                            <label>e-mail</label>
                            <InputFormulario name="email" placeholder="email@email.com.br" />
                        </div>
                        <div className="item">
                            <label>telefone</label>
                            <InputFormulario name="phone" placeholder="(XX) XXXXX-XXXX" />
                            <select>
                                <option key="MOBILE" value="MOBILE" >celular</option>
                                <option key="HOME" value="HOME">residencial</option>
                                <option key="WORK" value="WORK" >trabalho</option>
                            </select>
                        </div>
                        <a href="">adicionar outro telefone</a>
                        <h3><span>Endereço</span></h3>
                        <div className="item">
                            <label>rua</label>
                            <InputFormulario name="street" placeholder="" />
                        </div>  <div className="item">
                            <label>número</label>
                            <InputFormulario name="number" placeholder="" />
                        </div>
                        <div className="item">
                            <label>complemento</label>
                            <InputFormulario name="complement" placeholder="" />
                        </div>
                        <div className="item">
                            <label>bairro</label>
                            <InputFormulario name="neightborhood" placeholder="" />
                        </div>
                        <div className="item">
                            <label>cidade</label>
                            <InputFormulario name="city" placeholder="" />
                        </div>
                        <div className="item">
                            <label>uf</label>
                            <InputFormulario name="state" placeholder="" />
                        </div>
                        <div className="item">
                            <label>cep</label>
                            <InputFormulario name="zipcode" placeholder="" />
                        </div>
                        <h3><span>Senha</span></h3>
                        <div className="item">
                            <label>Senha</label>
                            <InputFormulario type="password" name="password" placeholder="senha" />
                        </div>
                        <div className="item">
                            <label>Confirmar Senha</label>
                            <InputFormulario type="password" name="password" placeholder="confirmar senha" />
                        </div>
                        <div className="divMargin">
                            <Button type="submit" className="button">salvar</Button>
                            <div className="button" style={{ float: "right" }}>
                                <Link to="/dashboard">voltar</Link>
                            </div>
                        </div>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />

        </Container>
    );

};
export default CadastroInstituicao;
