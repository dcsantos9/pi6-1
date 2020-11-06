import React, { useState, useEffect } from 'react';
import { Container, Content, Menu } from './styles';
import  Card  from '../../components/Card';
import  api from '../../services/api';

interface PetParams {
    pet: string;
}

interface Pet {
    name: string;
    info: string;
    header_name: string;
    image: string;
    user_id: string;
    species: string;
    gender: string;
}

const Home: React.FC = () => {

    const [ pets, setPets ] = useState<Pet[]>(() => {
        const storagedPets = localStorage.getItem('@QueroPet:Pets');
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
                    name={pet.name}
                    info={pet.info}
                    header_name={pet.name}
                    user={pet.user_id}
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
