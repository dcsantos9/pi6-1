import styled, { keyframes } from 'styled-components';
import HomeBg from '../../assets/dog-home.jpg';
import cadastroInBG from '../../assets/cat-login.jpg';


import { shade } from 'polished';
export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    img {
        width: 640px;
        height: 90vh;
        border-radius: 10px;
        background-size: cover;
    }
    .logo{
        width: 250px;
        height: 120px;
    }
    display: flex;
    flex: 1;
    width: 100%;
    height: 100vh;
    background:#fff;
    border-radius:10px;
    padding:25px;

`;

const appearFromLeft = keyframes`
    from {
        opacity:0;
        transform: translateX(-50px);

    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`


    animation: ${appearFromLeft} 1s;

    body{
        background: #000;
    }
    .item{
        margin-bottom: 10px;
       display: flex;
   align-items: baseline;
   }
   .titleItemCard{
    font-weight: bold;
    padding-right:10px;
    text-transform: lowercase;
   }
.item .button{
    margin-top: 20px;
}
    .button a {
        text-decoration: none;
        background: #FF9000;
        border-radius: 10px;
        border: 0;
        color: #FFFFFF;
        padding: 16px;
        width: 100%;
        margin-top: 16px !important;
        margin-left: 20px;
        font-weight: 500;
        height: 56px;
        transition: background-color 0.2s;
        &:hover{
            background: ${shade(0.2, '#FF9000')};
            color: #FFFFFF;
        }
        text-align: center;
        font-size: initial;
        margin-bottom: 0px;
        height: 50px;
    }

    span{
        text-transform: lowercase;
    }


`;

export const Menu = styled.div`
    display: flex;
    place-content: center;
    width: 100%;
    max-width: 300px;
    padding: 50px;
    color: #FFF;
    background-color: #FF9000;
    img {
        max-width: 340px;
    }

`;
