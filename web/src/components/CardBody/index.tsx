import React , { ButtonHTMLAttributes } from 'react';
import { Container, Date , BodyContent, Name, ButtonPanel} from './styles';
import Button from '../Button';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> ;

interface CardBodyProps {
    date?: string;
    name: string;
    info: string;
    user: string;
    species: string;
    gender: string;
}

const CardBody: React.FC<CardBodyProps> = ({date, name, info, user, species, gender,...rest}) => (

    <Container>
    <Date>{date}</Date>

    <Name>{name}</Name>
    espécie:  <BodyContent> <strong>{species}</strong></BodyContent>
    sexo:  <BodyContent> <strong>{gender}</strong></BodyContent>
    instituição:  <BodyContent> <strong>{user}</strong></BodyContent>

    informações: <BodyContent> {info}</BodyContent>
    <ButtonPanel>
        <Button>Favoritar</Button>
        <Button>Quero Adotar</Button>
    </ButtonPanel>
    </Container>
    );

export default CardBody;


/*class CardHeader extends React.Component {
    render() {
      const { image } = this.props;
      var style = {
          backgroundImage: 'url(' + image + ')',
      };
      return (

      )
    }
  }*/
