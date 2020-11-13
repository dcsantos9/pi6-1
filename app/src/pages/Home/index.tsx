import React, {useEffect, useState} from 'react';

import  api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { 
    Text,
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView ,
    Platform,
    TextInput, 
    Alert
} from 'react-native';

import {
    Container,
    PetContainer,
    PetImage,
    PetList,
    Pet,
    PetTitle,
  } from './styles';

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
    const { signOut } = useAuth();
    const [ pets, setPets ] = useState<Pet[]>(() => {
        /*const storagedPets = localStorage.getItem('@QueroPet:pets');
        if (storagedPets){
            return JSON.parse(storagedPets);
        }*/
        return [];
    });

    useEffect(()=>{
        async function loadPets(): Promise<void> {
            const response = await api.get(`pets/`);
            setPets(response.data);
            
        }
        
       
        loadPets();

    },[]);

    return (
        <Container>
        <PetContainer>
          <PetList
            data={pets}
            keyExtractor={item => item.id}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{
              height: 80,
            }}
            renderItem={({item}) => (
              <Pet>
                
                <PetTitle>{item.name}</PetTitle>
              </Pet>
            )}
          />
        </PetContainer>
      </Container>
    );
}
export default Home;