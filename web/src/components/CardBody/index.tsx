import React , { ButtonHTMLAttributes } from 'react';
import { Container, Date , BodyContent} from './styles';
import Button from '../Button';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> ;

const CardBody: React.FC = () => (

    <Container>
    <Date>March 20 2015</Date>

    <h2>Title</h2>

    <BodyContent>Kayaks crowd Three Sister Springs, where people and manatees maintain controversial coexistence</BodyContent>

    <Button>Favoritar</Button>
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
