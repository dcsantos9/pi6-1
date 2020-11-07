import React, { useState, useEffect } from 'react';
import { Container, Content, Menu } from './styles';
import  Card  from '../../components/Card';
import  api from '../../services/api';

interface PetParams {
    pet: string;
}

interface Institution {
    id: string;
    name: string;
}

interface Pet {
    id: string;
    name: string;
    info: string;
    header_name: string;
    image: string;
    institution: Institution;
    species: string;
    gender: string;
}

const Home: React.FC = () => {

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
                    />
                ))}
            </Content>

        </Container>
    )

}
export default Home;
