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
import { FiUser } from 'react-icons/fi';
import { FaBirthdayCake, FaCat, FaDog } from "react-icons/fa";
// import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import MainMenu from '../../components/MainMenu';

interface CadastroPetFormData {
    name: string;
    species: string;
    //particulars: string; //excluimos esse campo, trocamos por specie, peso, etc.
    birth_day: string;
    coat: string;
    gender: string;
    breed: string;
    info: string;
    avatar: string;

    user_id: string;
    created_at: Date;
    updated_at: Date;
}


const CadastroPet: React.FC = () => {
    const formRef = useRef  <FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('@QueroPet:user') || "{}");

    localStorage.setItem('@QueroPet:pet_species', JSON.stringify("dog"));
    localStorage.setItem('@QueroPet:pet_gender', JSON.stringify("F"));

    const [speciesFelina, setSpeciesFelina] = useState( () => {
           return localStorage.getItem('@QueroPet:pet_species') === 'dog' ? true : false
        }
    );

    const [speciesCanina, setSpeciesCanina] = useState( () => {
        return localStorage.getItem('@QueroPet:pet_species') === 'cat' ? true : false
        }
    );

    const setSpecies = (ele: any) => {
        localStorage.setItem('@QueroPet:pet_species', ele.target.value)
        console.log(ele.target.value)
        setSpeciesFelina(localStorage.getItem('@QueroPet:pet_species') === 'cat' ? true : false)
        setSpeciesCanina(localStorage.getItem('@QueroPet:pet_species') === 'dog' ? true : false)
        return
    }

    useEffect(() => {
        if(speciesFelina){
            localStorage.setItem('@QueroPet:pet_species','cat');
        } else {
            localStorage.setItem('@QueroPet:pet_species','dog');
        }
    },[speciesFelina]);

    const [speciesFemale, setSpeciesFemale] = useState( () => {
           return localStorage.getItem('@QueroPet:pet_gender') === 'F' ? true : false
        }
    );

    const [speciesMale, setSpeciesMale] = useState( () => {
            return localStorage.getItem('@QueroPet:pet_species') === 'M' ? true : false
        }
    );

    const setGender = (ele: any) => {
        localStorage.setItem('@QueroPet:pet_gender', ele.target.value)
        console.log(ele.target.value)
        setSpeciesFemale(localStorage.getItem('@QueroPet:pet_species') === 'F' ? true : false)
        setSpeciesMale(localStorage.getItem('@QueroPet:pet_species') === 'M' ? true : false)
        return
    }

    useEffect(() => {
        if(speciesFelina){
            localStorage.setItem('@QueroPet:pet_species','cat');
        } else {
            localStorage.setItem('@QueroPet:pet_species','dog');
        }
    },[speciesFelina]);



    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                birth_day: Yup.string().required('Nascimento obrigatório'),
                coat: Yup.string().required('Pelagem obrigatória'),
                breed: Yup.string().required('Raça obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            localStorage.getItem('@QueroPet:pet_gender')

            const merged = { ...{
                "user_id": user.id,
                "gender": JSON.parse(localStorage.getItem('@QueroPet:pet_gender') || "{}"),
                "species": JSON.parse(localStorage.getItem('@QueroPet:pet_species') || "{}")
            }, ...data }
            await api.post(`/pets`, merged);
            localStorage.setItem('@QueroPet:pet', JSON.stringify(merged));
            console.log(merged)
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
                description: 'preencha corretamente todos os campos obrigatórios'+err,
            });
        }

    }, [addToast, history]);

    return (
        <Container>
            <MainMenu>

            <img className="logo" src={logoImg} alt="QueroPet" />
                <h1>Cadastro</h1>
                <ul>
                    <li><Link to='/cadastroInstituicao'>Meu Cadastro</Link></li>
                    <li><Link to='/alterarSenha'>Alterar Senha</Link></li>
                </ul>
                <h1>Pets</h1>
                <ul>
                    <li><Link to='/'>Adicionar Novo Pet</Link></li>
                    <li><Link to='/'>Meus Pets</Link></li>
                    <li><Link to='/'>Pedidos de Adoção</Link></li>
                </ul>

            </MainMenu>
            <Content>
                <AnimationContainer>
                    <Form ref={formRef} onSubmit={handleSubmit}>

                        <div className="item">
                            <Image src={'https://source.unsplash.com/user/erondu/600x400'}></Image>
                            <input type="file" id="file" name="filename" value="" />
                            <Button type="submit" name="sendPhoto" className="button button2">enviar</Button>
                        </div>
                        <h1><span>Cadastro</span></h1>

                        <div className="item">
                            <label className="titleItemCard">nome </label>
                            <Input name="name" placeholder="Nome" icon={MdPets} />
                        </div>
                        <div className="item">
                            <label className="titleItemCard">espécie:</label>
                            <label>
                                <input type="radio" name="species" value="dog" onChange={setSpecies} className="radio" checked={speciesCanina}/> canina
                            </label>
                            <label>
                                <input type="radio" name="species" value="cat" onChange={setSpecies} className="radio"  checked={speciesFelina}/> felina
                            </label>
                        </div>
                        <div className="item">gênero:<label>
                            <input type="radio" name="gender" value="F" className="radio" onChange={setGender}  /> Fêmea
                            </label>
                            <label>
                                <input type="radio" name="gender" value="M" className="radio" onChange={setGender}  /> Macho
                            </label>
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Nascimento </label>
                            <Input name="birth_day" placeholder="XX/XX/XXXX" icon={FaBirthdayCake} />
                        </div>
                        <div className="item">
                            <label className="titleItemCard">raça </label>
                            <Input name="breed" placeholder="Dálmata, SRD, outros." icon={FaDog} />
                        </div>
                        <div className="item">
                            <label className="titleItemCard">Pelagem </label>
                            <Input name="coat" placeholder="Curta, Tricolor, Característica" icon={FaCat} />
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

        </Container >
    );

};
export default CadastroPet;
