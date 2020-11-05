import React from 'react';
import { Container, Content, AnimationContainer, Background, Menu } from './styles';
import  Card  from '../../components/Card';

const Home: React.FC = () => {

    return(

        <Container>
            <Menu>
            <h1>Home</h1>
            </Menu>
            <Content>
                <Card image={'https://source.unsplash.com/user/erondu/600x400'}/>
                <Card image={'https://source.unsplash.com/user/erondu/600x400'}/>
                <Card image={'https://source.unsplash.com/user/erondu/600x400'}/>
                <Card image={'https://source.unsplash.com/user/erondu/600x400'}/>

            </Content>

        </Container>
    )

}
export default Home;
