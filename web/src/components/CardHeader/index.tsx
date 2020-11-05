import { backgroundImages } from 'polished';
import React , { ButtonHTMLAttributes } from 'react';
import { Container, HeaderTitle } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> ;

interface CardHeaderProps {
    image: string;

}


const CardHeader: React.FC<CardHeaderProps> = ({image, ...rest}) => {
    var style=
    {
        background: 'url(' + image + ')',
        height: '350px',
    };
    return (

        <Container  style={style} >
        <HeaderTitle>News</HeaderTitle>
    </Container>
    );
}

export default CardHeader;


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
