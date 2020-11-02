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
                       
                        <img src={imgPhoto}></img>       
                        <div className="item">
                            <label className="titleItemCard">instituição </label>
                            <label id="instituicao" >ONG Pet Patas</label>
                        </div>   
                        <div className="item">
                            <label className="titleItemCard">nome </label>
                            <label id="name">nome</label>
                          
                        </div> 
                        <div className="item">
                        <label className="titleItemCard">espécie </label>
                            <label id="species"></label>
                        </div> 
                        <div className="item">
                            <label className="titleItemCard">Nascimento </label>
                            <label id="bithday">01/01/2000</label>
                        </div> 
                        <div className="item">
                            <label className="titleItemCard">raça </label>
                            <label id="breed"></label>
                        </div> 
                        <div className="item">
                            <label className="titleItemCard">Sexo </label>
                            <label id="gender"></label>
                        </div> 
                        <div className="item">
                            <label className="titleItemCard">Pelagem </label>
                            <label id="coat">Tricolor</label>
                        </div> 
                        <div className="item">
                            <label className="titleItemCard">Informações </label>
                            <label id="info"></label>
                        </div> 
                        <div className="item">
                        <div className="button" >
                        <Link to="/listagemPets" >voltar</Link></div>
                        <div className="button" >
                            <Link to="/cadastroPet">editar</Link>                        
                        </div></div>
                        {/* 
                      {
        
o    Botões candidatar, excluir candidatura, favorito, voltar para listagem;
o    Links para card instituição.
                         */}
                      
                       
                </AnimationContainer>
            </Content>
            <Background />

        </Container>
    );

};
export default CadastroInstituicao;
