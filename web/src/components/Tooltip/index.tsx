import React from 'react';
import { Container } from './styles';

interface TooltopProps {
    title: string;
    className?: string;
}

const Tooltip: React.FC<TooltopProps> = ({title, className ='',  children }) => {
    return(

        <Container className={className}>
            {children}
            <span>{ title } </span>
        </Container>
    )
};
export default Tooltip;


