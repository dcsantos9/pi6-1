import React , { useEffect, useState } from 'react';
import { Container, Date , BodyContent, Name, ButtonPanel} from './styles';
import Button from '../Button';
import  api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { Link, useHistory } from 'react-router-dom';

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
    has_asked_for_adoption: boolean;
}

const CardBody: React.FC<CardBodyProps> = ({pet_id, date, name, info, has_faved_by, has_asked_for_adoption, institution, species, gender,...rest}) => {
    const history = useHistory();
    const {user} = useAuth();

    const [ fave , setFave ] = useState(false);
    const [ faveText , setFaveText ] = useState("Favoritar");
    const [ faveBgColor , setFaveBgColor ] = useState({ backgroundColor: "orange" });

    const [ askForAdoption , setAskForAdoption ] = useState(false);
    const [ askForAdoptionText , setAskForAdoptionText ] = useState("Quero Adotar");
    const [ askForAdoptionBgColor , setAskForAdoptionBgColor ] = useState({ backgroundColor: "orange" });

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
    }, []);



    const handleAskForAdoption = () => {
        if(askForAdoption){
            setAskForAdoption(false);
            api.post(`/users/unaskadoption/${pet_id}`, {} , { headers: { Authorization: `Bearer ${localStorage.getItem('@QueroPet:token')}`, }}).then(response => {
                setAskForAdoptionText("Quero Adotar");
                setAskForAdoptionBgColor({backgroundColor: "orange"})
            });

        } else {
            setAskForAdoption(true);
            api.post(`/users/askadoption/${pet_id}`,  {} ,  { headers: { Authorization: `Bearer ${localStorage.getItem('@QueroPet:token')}`, }}).then(response => {
                setAskForAdoptionText("Desistir da Adoção");
                setAskForAdoptionBgColor({backgroundColor: "brown"})
            });

        }
    }
    useEffect( () => {
        if(!has_asked_for_adoption){
            setAskForAdoption(false);
            setAskForAdoptionText("Quero Adotar");
            setAskForAdoptionBgColor({ backgroundColor: "orange" });
        }else {
            setAskForAdoption(true);
            setAskForAdoptionText("Desistir da Adoção");
            setAskForAdoptionBgColor({ backgroundColor: "brown" });
        }
    }, []);

    return (

    <Container>
    <Date>{date}</Date>

    <Name>{name}</Name>
    espécie:  <BodyContent> <strong>{species}</strong></BodyContent>
    sexo:  <BodyContent> <strong>{gender}</strong></BodyContent>
    instituição:  <BodyContent> <strong>{institution.name}</strong></BodyContent>

    informações: <BodyContent> {info}</BodyContent>
    <ButtonPanel>
        <Button onClick={() => (handleFave())} style={faveBgColor}>{faveText}</Button>
        <Button onClick={() => (handleAskForAdoption())} style={askForAdoptionBgColor}>{askForAdoptionText}</Button>
        <Button onClick={() => (history.push(`/cardPet/${pet_id}`))}>Saiba Mais</Button>

    </ButtonPanel>
    </Container>
    )};

export default CardBody;
