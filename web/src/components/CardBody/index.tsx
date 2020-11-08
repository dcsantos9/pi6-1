import React , { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { Container, Date , BodyContent, Name, ButtonPanel} from './styles';
import Button from '../Button';
import  api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface Institution {
    id: string;
    name: string;
}

interface CardBodyProps {
    pet_id: string;
    date?: string;
    name: string;
    info: string;
    institution: Institution;
    species: string;
    gender: string;
    has_faved_by: boolean;
}

const CardBody: React.FC<CardBodyProps> = ({pet_id, date, name, info, has_faved_by, institution, species, gender,...rest}) => {
    const {user} = useAuth();

    const [ fave , setFave ] = useState(false);
    const [ faveText , setFaveText ] = useState("Favoritar");
    const [ faveBgColor , setFaveBgColor ] = useState({ backgroundColor: "orange" });

    const handleFave = () => {
        if(fave){
            setFave(false);
            api.post(`/users/unfave/${pet_id}`, {} , { headers: { Authorization: `Bearer ${localStorage.getItem('@QueroPet:token')}`, }}).then(response => {
                setFaveText("Favoritar");
                setFaveBgColor({backgroundColor: "orange"})
            });

        } else {
            setFave(true);
            api.post(`/users/fave/${pet_id}`,  {} ,  { headers: { Authorization: `Bearer ${localStorage.getItem('@QueroPet:token')}`, }}).then(response => {
                setFaveText("DesFavoritar");
                setFaveBgColor({backgroundColor: "brown"})
            });

        }
    }
    useEffect( () => {
        if(!has_faved_by){
            setFave(false);
            setFaveText("Favoritar");
            setFaveBgColor({ backgroundColor: "orange" });
        }else {
            setFave(true);
            setFaveText("DesFavoritar");
            setFaveBgColor({ backgroundColor: "brown" });
        }
    }, [fave]);

    const check = () => {
        console.log('sdf')
        if(!has_faved_by){
            setFave(false);
            setFaveText("Favoritar");
            setFaveBgColor({ backgroundColor: "orange" });
        } else {
            setFave(true);
            setFaveText("DesFavoritar");
            setFaveBgColor({ backgroundColor: "brown" });
        }
    };

    return (

    <Container>
    <Date>{date}</Date>

    <Name>{name}</Name>
    espécie:  <BodyContent> <strong>{species}</strong></BodyContent>
    sexo:  <BodyContent> <strong>{gender}</strong></BodyContent>
    instituição:  <BodyContent> <strong>{institution.name}</strong></BodyContent>

    informações: <BodyContent> {info}</BodyContent>
    <ButtonPanel>
        <Button onLoad={() => (check()) } onClick={() => (handleFave())} style={faveBgColor}>{faveText}</Button>
        <Button onClick={() => (console.log(pet_id, user))}>Quero Adotar</Button>
        <Button onClick={() => (console.log(pet_id))}>Saiba Mais</Button>

    </ButtonPanel>
    </Container>
    )};

export default CardBody;
