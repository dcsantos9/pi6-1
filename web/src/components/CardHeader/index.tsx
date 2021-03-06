import React , { ButtonHTMLAttributes } from 'react';
import { Container, HeaderTitle } from './styles';

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
