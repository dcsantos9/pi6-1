import React, { useState, useEffect } from 'react';
import { View , Button } from 'react-native';
import { Container } from './styles';
import  api from '../../services/api';

import { useAuth } from '../../hooks/auth';


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

const Dashboard: React.FC = () => {
    const { signOut } = useAuth();
    const [ pets, setPets ] = useState<Pet[]>([]);

    useEffect(()=>{
        api.get(`pets/`).then(response => {
            setPets(response.data);
        });

    },[]);

    return (
        <Container>
                { pets.map( pet => (
                    <Container
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
            <View style={{ flex:1 , justifyContent: 'center'} }>
                <Button title="sair" onPress={signOut}>Sair</Button>
            </View>
        </Container>

    );
}
export default Dashboard;