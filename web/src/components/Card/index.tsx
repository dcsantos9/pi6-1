import React , { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';
import CardHeader from '../CardHeader';
import CardBody from '../CardBody';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> ;

interface Institution {
    id: string;
    name: string;
}

interface CardProps {
    item_id: string;
    image: string;
    header_name?: string;
    date?: string;
    name: string;
    info: string;
    institution: Institution;
    species: string;
    gender: string;
}

const Card: React.FC<CardProps> = ({item_id, image, header_name, date, name, info, institution, species, gender, ...rest}) => (
        <Container>
            <CardHeader header_name={header_name} image={image}/>
            <CardBody pet_id={item_id} date={date} name={name} info={info} institution={institution} species={species} gender={gender} />
        </Container>
    );

export default Card;
