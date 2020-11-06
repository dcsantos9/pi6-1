import { backgroundImages } from 'polished';
import React , { ButtonHTMLAttributes } from 'react';
import { Container, HeaderTitle } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> ;

interface CardHeaderProps {
    image: string;
    header_name?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({image,header_name, ...rest}) => {
    var style=
    {
        background: 'url(' + image + ')',
        height: '350px',
    };
    return (

        <Container  style={style} >
        <HeaderTitle>{header_name}</HeaderTitle>
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
