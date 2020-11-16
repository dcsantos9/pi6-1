import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Link, useHistory,useLocation } from 'react-router-dom';
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
import { FaBirthdayCake, FaCat, FaDog } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import MainMenu from '../../components/MainMenu';
import { AiOutlineFieldNumber, AiOutlineInfoCircle } from "react-icons/ai";


interface User {
    id: string;
}
interface Pet {
    id: string;
    name: string;
    has_faved_by: User[];
    has_asked_for_adoption: User[];
    info: string;
    header_name: string;
    image: string;
    species: string;
    gender: string;
    birth_day: string;
    breed: string;
    coat: string;
}

const CadastroPet: React.FC = () => {
     const formRef = useRef  <FormHandles>(null);
     const { addToast } = useToast();
     const history = useHistory();
     const location = useLocation();
     const user = JSON.parse(localStorage.getItem('@QueroPet:user') || "{}");
     const pet_id = location.pathname.split('/')[2];

// esta fixo oq salvar
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

////////////////////// editar pet
const [ pets, setPet ] = useState<Pet[]>(() => {
    const storagedPets = localStorage.getItem('@QueroPet:pets');
    if (storagedPets){
        return JSON.parse(storagedPets);
    }
    return [];
});



useEffect(()=> {
    localStorage.setItem('@QueroPet:pets', JSON.stringify(pets));
}, [pets]);

useEffect(()=>{
    api.get(`pets/`).then(response => {
        setPet(response.data);
    });

},[]);


const pet =  pets.filter( (p) => (p.id === pet_id) )[0]; 
  
/////////////////////////

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
                <h1 className="title">Cadastro</h1>
                
                <ul>
                    <li><Link to='/cadastroInstituicao'>Meu Cadastro</Link></li>
                    <li><Link to='/cadastroInstituicao'>Alterar Senha</Link></li>
                </ul>
                <h1>Pets</h1>
                <ul>
                    <li><Link to='/cadastropet'>Adicionar Novo Pet</Link></li>
                    <li><Link to='/'>Meus Pets</Link></li>
                    <li><Link to='/home/pedidosadocao'>Pedidos de Adoção</Link></li>
                </ul>


            </MainMenu>
            <Content>
                <AnimationContainer>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1><span>Cadastro pet</span></h1>
                        <div className="item">
                            <Image src={'https://source.unsplash.com/user/erondu/600x400'}></Image>
                            <input type="file" id="file" name="filename" value="" />
                            <Button type="submit" name="sendPhoto" className="button button2">enviar</Button>
                        </div>                   
                        <div className="item" style={{ maxWidth: '600px' }}>
                            <span className="titleItemCard">nome </span>
                            <Input name="name" placeholder="Nome" icon={MdPets} defaultValue={pet.name} />
                        </div>
                        <div className="item divRadioButton">
                            <span className="titleItemCard">espécie:</span>
                            <label>
                                <input type="radio" name="species" value="dog" onChange={setSpecies} className="radio" checked={speciesCanina}/> canina
                            </label>
                            <label>
                                <input type="radio" name="species" value="cat" onChange={setSpecies} className="radio"  checked={speciesFelina}/> felina
                            </label>
                        </div>
                        <div className="item divRadioButton">
                            <span className="titleItemCard">gênero:</span>
                            <label>
                                <input type="radio" name="gender" value="F" className="radio" onChange={setGender}  /> Fêmea
                            </label>
                            <label>
                                <input type="radio" name="gender" value="M" className="radio" onChange={setGender}  /> Macho
                            </label>
                        </div>
                        <div className="item" style={{ maxWidth: '300px' }}>
                            <span className="titleItemCard">Nascimento </span>
                            <Input name="birth_day" placeholder="XX/XX/XXXX" icon={FaBirthdayCake} defaultValue={pet.birth_day}/>
                        </div>
                        <div className="item" style={{ maxWidth: '600px' }}>

                            <span className="titleItemCard">raça </span>
                            <Input name="breed" placeholder="Dálmata, SRD, outros." icon={FaDog}  defaultValue={pet.breed}/>
                        </div>
                        <div className="item" style={{ maxWidth: '600px' }}>

                            <span className="titleItemCard">Pelagem </span>
                            <Input name="coat" placeholder="Curta, Tricolor, Característica" icon={FaCat} defaultValue={pet.coat}/>
                        </div>
                        <div className="item" style={{ maxWidth: '600px' }}>
                            <span className="titleItemCard">Informações </span>
                            <TextArea name="info" placeholder=""   icon={AiOutlineInfoCircle} defaultValue={pet.info}/>
                        </div>
                        <div className="divButtons">
                            <Button type="submit" className="button">salvar</Button>
                            <div className="button" style={{ float: "right" }}>
                                <Link to="/home">excluir</Link>
                            </div>
                        </div>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />

        </Container >
    );

};
export default CadastroPet;
