import React , { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';
import Button from '../Button';
import CardHeader from '../CardHeader';
import CardBody from '../CardBody';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> ;

interface CardProps {
    image: string;
    header_name?: string;
    date?: string;
    name: string;
    info: string;
    user: string;
    species: string;
    gender: string;
}

const Card: React.FC<CardProps> = ({image, header_name, date, name, info, user, species, gender, ...rest}) => (
        <Container>
            <CardHeader header_name={header_name} image={image}/>
            <CardBody date={date} name={name} info={info} user={user} species={species} gender={gender} />
        </Container>
    );

export default Card;


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
