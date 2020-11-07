import React , { ButtonHTMLAttributes } from 'react';
import { Container, Date , BodyContent, Name, ButtonPanel} from './styles';
import Button from '../Button';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> ;

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
}
const user = JSON.parse(localStorage.getItem('@QueroPet:user') || '{}');

const CardBody: React.FC<CardBodyProps> = ({pet_id, date, name, info, institution, species, gender,...rest}) => (

    <Container>
    <Date>{date}</Date>

    <Name>{name}</Name>
    espécie:  <BodyContent> <strong>{species}</strong></BodyContent>
    sexo:  <BodyContent> <strong>{gender}</strong></BodyContent>
    instituição:  <BodyContent> <strong>{institution.name}</strong></BodyContent>

    informações: <BodyContent> {info}</BodyContent>
    <ButtonPanel>
        <Button onClick={() => (console.log(pet_id, user.id))}>Favoritar</Button>
        <Button onClick={() => (console.log(pet_id, user.id))}>Quero Adotar</Button>
        <Button onClick={() => (console.log(pet_id))}>Saiba Mais</Button>

    </ButtonPanel>
    </Container>
    );

export default CardBody;
