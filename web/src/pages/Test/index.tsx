import React  from 'react';

import { Container, Content, Background } from './styles';

import Button from '../../components/Button';


const Test: React.FC = () => {

    return (
        <Container>
            <Content>
                    <Button type="submit">Cadastrar</Button>
            </Content>
            <Background />

        </Container>
    );

};
export default Test;
