import React , { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';
import Button from '../Button';
import CardHeader from '../CardHeader';
import CardBody from '../CardBody';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> ;

interface CardProps {
    image: string;

}

const Card: React.FC<CardProps> = ({image, ...rest}) => (
        <Container>
            <CardHeader image={image}/>
            <CardBody />
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
