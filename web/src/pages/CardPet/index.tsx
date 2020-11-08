import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Container, Content, AnimationContainer, Menu } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import InputFormulario from '../../components/InputFormulario';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import imgPhoto from '../../assets/cat-login.jpg';
import  api from '../../services/api';

interface User {
    id: string;
    name: string;
}

interface Institution {
    id: string;
    name: string;
}


interface Pet {
    id: string;
    name: string;
    has_faved_by: User[];
    has_asked_for_adoption: User[];
    info: string;
    header_name: string;
    image: string;
    institution: Institution;
    species: string;
    gender: string;
    birth_day: string;
    breed: string;
    coat: string;
}

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
    const location = useLocation();
    const pet_id = location.pathname.split('/')[2];

    const [ pets, setPets ] = useState<Pet[]>(() => {
        const storagedPets = localStorage.getItem('@QueroPet:pets');
        if (storagedPets){
            return JSON.parse(storagedPets);
        }
        return [];
    });

    useEffect(()=> {
        localStorage.setItem('@QueroPet:pets', JSON.stringify(pets) );
    }, [pets]);

    useEffect(()=>{
        api.get(`pets/`).then(response => {
            setPets(response.data);
        });

    },[]);

    const pet = pets.filter( (p) => (p.id === pet_id) )[0];

    return (
        <Container>
            <Menu>
            <h1>Home</h1>
            </Menu>
            <Content>
                <AnimationContainer>
                    <img className="logo" src={logoImg} alt="QueroPet" />


                        <div className="item">
                            <label className="titleItemCard">instituição </label>
                            <label id="instituicao" >{ pet.institution.name }</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">nome </label>
                            <label id="name">{ pet.name }</label>

                        </div>
                        <div className="item">
                        <label className="titleItemCard">espécie </label>
                            <label id="species">{ pet.species }</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Nascimento </label>
                            <label id="bithday">{ pet.birth_day }</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">raça </label>
                            <label id="breed">{ pet.breed }</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Sexo </label>
                            <label id="gender">{ pet.gender }</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Pelagem </label>
                            <label id="coat">{ pet.coat }</label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Informações </label>
                            <label id="info">{ pet.info }</label>
                        </div>
                        <div className="item">
                        <div className="button" >
                        <Link to="/home" >voltar</Link></div>
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
            <Content>
                <img src={'https://source.unsplash.com/user/erondu/600x400'} alt="QueroPet" />
            </Content>
        </Container>
    );

};
export default CadastroInstituicao;
