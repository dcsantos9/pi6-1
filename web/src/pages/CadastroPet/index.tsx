import React, { useCallback, useRef, useContext } from 'react';
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
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaLessThan, FaRegAddressCard } from "react-icons/fa";
import { AiOutlineFieldNumber } from "react-icons/ai";
import MainMenu from '../../components/MainMenu';

interface CadastroPetFormData {
    name: string;
    Species: string;
    // particulars: string; //excluimos esse campo, trocamos por specie, peso, etc.
    birth_day: string;
    coat: string;
    gender: string;
    breed: string;
    info: string;
    avatar: string;
    user: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}


const CadastroPet: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const pet = JSON.parse(localStorage.getItem('@QueroPet:pet') || "{}");

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                Species: Yup.string().required('Documento obrigatório'),
                birth_day: Yup.string().required('Nascimento obrigatório'),
                coat: Yup.string().required('Pelagem obrigatória'),
                gender: Yup.string().required('Sexo obrigatório'),
                breed: Yup.string().required('Raça obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            await api.put(`/users/${pet.id}`, data);
            const merged = { ...pet, ...data }
            localStorage.setItem('@QueroPet:pet', JSON.stringify(merged));
            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro salvo!',
                description: 'dados salvos com sucesso.'
            });

        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
            addToast({
                type: 'error',
                title: 'Erro ao salvar',
                description: 'preencha corretamente todos os campos obrigatórios',
            });
        }

    }, [addToast, history]);

    const Species_felina = pet.species === 'dog' ? true : false;
    const Species_canina = pet.species === 'cat' ? true : false;

    const gender_female = pet.gender === 'female' ? true : false;
    const gender_male = pet.species === 'male' ? true : false;

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


                        <Image src={'https://source.unsplash.com/user/erondu/600x400'}></Image>
                        <input type="file" id="file" name="filename" value="" />
                        <Button type="submit" name="sendPhoto" className="button button2">enviar</Button>

                        <h1><span>Cadastro</span></h1>
                        <div className="item">
                            <label className="titleItemCard">Nome </label>
                            <Input name="name" placeholder="Nome" icon={FiUser} />
                        </div>
                        <div className="item">
                            <label className="titleItemCard">espécie </label>
                            <label>
                                <input type="radio" defaultValue="female" className="radio" checked={Species_canina} /> canina
                            </label>
                            <label>
                                <input type="radio" defaultValue="male" className="radio" checked={Species_felina} /> felina
                            </label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Nascimento </label>
                            <Input name="birth_day" placeholder="XX/XX/XXXX" icon={FiUser} />
                        </div>
                        <div className="item">
                            <label className="titleItemCard">raça </label>
                            <Input name="breed" placeholder="Dálmata, SRD, outros." icon={FiUser} />
                        </div>
                        <div className="item">
                            <label>
                                <input type="radio" defaultValue="female" className="radio" checked={gender_female} /> Fêmea
                            </label>
                            <label>
                                <input type="radio" defaultValue="male" className="radio" checked={gender_male} /> Macho
                            </label>

                        </div>
                        <div className="item">
                            <label className="titleItemCard">Pelagem </label>
                            <Input name="coat" placeholder="Curta, Tricolor, Característica" icon={FiUser} />
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Informações </label>
                            <TextArea name="info" placeholder="" />
                        </div>
                        <Button type="submit" className="button">salvar</Button>
                        <div className="button" style={{ float: "right" }}>
                            <Link to="/Dashboard">voltar</Link>
                        </div>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />

        </Container>
    );

};
export default CadastroPet;
