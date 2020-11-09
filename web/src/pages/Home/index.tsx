import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Menu } from './styles';
import  Card  from '../../components/Card';
import  api from '../../services/api';
import logoImg from '../../assets/logo.svg';

interface PetParams {
    pet: string;
}

interface Institution {
    id: string;
    name: string;
}

interface User {
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
}

const Home: React.FC = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('@QueroPet:user') || "{}");

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

    return(

        <Container>
            <Menu>
            <img className="logo" src={logoImg} alt="QueroPet" />
            <h1>Home</h1>
            </Menu>

            <Content>
                { pets.map( pet => (
                    <Card
                    key={pet.id}
                    item_id={pet.id}
                    name={pet.name}
                    info={pet.info}
                    header_name={pet.name}
                    institution={pet.institution}
                    image={'https://source.unsplash.com/user/erondu/600x400'}
                    species={pet.species}
                    gender={pet.gender}
                    has_faved_by={!!pet.has_faved_by.filter((user_pet) => (user_pet.id === user.id ))[0]}
                    has_asked_for_adoption={!!pet.has_asked_for_adoption.filter((user_pet) => (user_pet.id === user.id ))[0]}
                    />
                ))}
            </Content>

        </Container>
    )
}
export default Home;
