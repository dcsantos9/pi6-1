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
import api from '../../services/api';
interface CadastroInstituicaoFormData {
    name: string;
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
    const {addToast} = useToast();
    const history = useHistory();

    const handleSubmit = useCallback( async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                social_id: Yup.string().required('Documento obrigatório'),
                email: Yup.string().required('Email obrigatório').email("Digite um e-mail válido"),
                phone: Yup.string().required('Telefone obrigatório'),
                street: Yup.string().required('Endereço obrigatório'),
                number: Yup.string().required('Número obrigatório'),
                neightborhood: Yup.string().required('Bairro obrigatório'),
                city: Yup.string().required('Cidade obrigatória'),
                state: Yup.string().required('Estado obrigatório'),
                zipcode: Yup.string().required('CEP obrigatório'),
                //password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            await api.post('/users', data);
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro atualizado!',
                description: 'Dados salvos com sucesso.'
            });

        } catch (err) {
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                console.log(errors);
            }
            addToast({
                type: 'error',
                title: 'Erro ao salvar',
                description: 'preencha corretamente todos os campos obrigatórios',
            });
        }

    },[addToast, history]);
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="QueroPet" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1><span>Cadastro</span></h1>
                        <img src={imgPhoto}></img>
                            <input type="file" id="file" name="filename" value="" />
                            <Button type="submit" name="sendPhoto" className="button button2">enviar</Button>
                            <InputFormulario name="name" />

                            <h3><span>Dados</span></h3>

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

                            <InputFormulario name="social_id" placeholder="00.000.000/0000-00" />

                            <textarea name="info" placeholder="informações" />
                        <h3><span>Contato</span></h3>
                            <InputFormulario name="email" placeholder="email@email.com.br" />
                            <InputFormulario name="phone" placeholder="(XX) XXXXX-XXXX" />
                            <select>
                                <option key="MOBILE" value="MOBILE" >celular</option>
                                <option key="HOME" value="HOME">residencial</option>
                                <option key="WORK" value="WORK" >trabalho</option>
                            </select>
                        <a href="">adicionar outro telefone</a>
                        <h3><span>Endereço</span></h3>
                            <InputFormulario name="street" placeholder="rua, avenida" />
                            <InputFormulario name="number" placeholder="número" />
                            <InputFormulario name="complement" placeholder="complemento, bloco, apartamento, casa" />
                            <InputFormulario name="neightborhood" placeholder="bairro" />
                            <InputFormulario name="city" placeholder="cidade" />
                            <InputFormulario name="state" placeholder="uf" />
                            <label></label>
                            <InputFormulario name="zipcode" placeholder="cep" />
                        <h3><span>Senha</span></h3>
                            <InputFormulario type="password" name="password" placeholder="senha" />
                            <InputFormulario type="password" name="password" placeholder="confirmar senha" />
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
