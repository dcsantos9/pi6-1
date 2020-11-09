import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, AnimationContainer, Background, Image } from './styles';
import { useAuth, AuthProvider } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { FiUser , FiMail , FiLock, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaLessThan, FaRegAddressCard } from "react-icons/fa";
import { AiOutlineFieldNumber } from "react-icons/ai";
import  MainMenu  from '../../components/MainMenu';

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
    const user = JSON.parse(localStorage.getItem('@QueroPet:user') || "{}");
    localStorage.setItem('@QueroPet:user_tmp_phone_type', user.phone_type);
    const [ phoneType, setPhoneType ] = useState(user.phone_type);

    const [ cnpj_radio_selected, set_cnpj_radio_selected ] = useState(() => {
        return user.social_id_type === 'cnpj' ? true : false;
    });
    const [ cpf_radio_selected, set_cpf_radio_selected ] = useState(() => {
        return user.social_id_type === 'cpf' ? true : false;
    });

    const [ phone_type_work, set_phone_type_work ] = useState(() => {
        return user.phone_type === 'work' ? true : false;
    });
    const [ phone_type_mobile, set_phone_type_mobile ] = useState(() => {
        return user.phone_type === 'mobile' ? true : false;
    });
    const [ phone_type_home, set_phone_type_home ] = useState(() => {
        return user.phone_type === 'home' ? true : false;
    });

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
                info: Yup.string(),
                // O usuário não deveria ser obrigado a alterar a senha nesse
                // formulário. Talvez seja o caso de criar um fluxo só para
                // alteração de senha.

                //password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            const merged = {...user,...data}

            merged.phone_type = localStorage.getItem('@QueroPet:user_tmp_phone_type') ;

            await api.put(`/users/${user.id}`, merged);
            localStorage.setItem('@QueroPet:user', JSON.stringify(merged));

            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro atualizado!',
                description: 'dados salvos com sucesso.'
            });

        } catch (err) {
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
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
            <MainMenu>

            <img className="logo" src={logoImg} alt="QueroPet" />

            <h1>Pets</h1>
            <ul>
                <li><Link to='/'>Adicionar Novo Pet</Link></li>
                <li><Link to='/'>Meus Pets Favoritos</Link></li>
                <li><Link to='/'>Meus Pedidos de Adoção</Link></li>
            </ul>

            <h1>Cadastro</h1>
            <ul>
                <li><Link to='/cadastroInstituicao'>Meu Cadastro</Link></li>
            </ul>

            </MainMenu>
            <Content>
                <AnimationContainer>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1><span>Cadastro</span></h1>
                        <Image src={'https://source.unsplash.com/user/erondu/600x400'}></Image>
                            <input type="file" id="file" name="filename" value="" />
                            <Button type="submit" name="sendPhoto" className="button button2">enviar</Button>
                            <Input name="name" defaultValue={user.name} placeholder="Nome" icon={FiUser}/>

                            <h3><span>Dados</span></h3>
                            <label>
                                <input type="radio" defaultValue="CNPJ" className="radio" checked={cnpj_radio_selected}/> CNPJ
                            </label>
                            <label>
                                <input type="radio" defaultValue="CPF" className="radio" checked={cpf_radio_selected}/> CPF
                            </label>

                            <Input name="social_id" defaultValue={user.social_id} placeholder="00.000.000/0000-00" icon={FaRegAddressCard}/>
                            <TextArea name="info" defaultValue={user.info} placeholder="informações" />
                        <h3><span>Contato</span></h3>
                            <Input name="email" defaultValue={user.email} placeholder="email@email.com.br" icon={FiMail} />
                            <Input name="phone" defaultValue={user.phone} placeholder="(XX) XXXXX-XXXX" icon={FiPhone} />
                            <select onChange={(obj) => { localStorage.setItem('@QueroPet:user_tmp_phone_type', obj.target.value) }}>
                                <option key="MOBILE" defaultValue="MOBILE" value="mobile" selected={phone_type_mobile}>celular</option>
                                <option key="HOME" defaultValue="HOME" value="home" selected={phone_type_home}>residencial</option>
                                <option key="WORK" defaultValue="WORK" value="work" selected={phone_type_work}>trabalho</option>
                            </select>
                        <a href="">adicionar outro telefone</a>
                        <h3><span>Endereço</span></h3>
                            <Input name="street" defaultValue={user.street} placeholder="rua, avenida" icon={FiMapPin} />
                            <Input name="number" defaultValue={user.number} placeholder="número" icon={AiOutlineFieldNumber} />
                            <Input name="complement"defaultValue={user.complement}  placeholder="complemento, bloco, apartamento, casa" icon={FiMapPin} />
                            <Input name="neightborhood" defaultValue={user.neightborhood} placeholder="bairro" icon={FiMapPin} />
                            <Input name="city" defaultValue={user.city} placeholder="cidade" icon={FiMapPin} />
                            <Input name="state" defaultValue={user.state} placeholder="uf" icon={FiMapPin}  />
                            <label></label>
                            <Input name="zipcode" defaultValue={user.zipcode}  placeholder="cep"icon={FiMapPin}  />
                        <h3><span>Senha</span></h3>
                            <Input type="password" name="password" placeholder="senha" icon={FiLock} />
                            <Input type="password" name="password" placeholder="confirmar senha" icon={FiLock} />
                            <Button type="submit" className="button">salvar</Button>
                            <div className="button" style={{ float: "right" }}>
                                <Link to="/">voltar</Link>


                            </div>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />

        </Container>
    );

};
export default CadastroInstituicao;
