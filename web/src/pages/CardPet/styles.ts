import styled, { keyframes } from 'styled-components';
import cadastroInBG from '../../assets/cat-login.jpg';


import { shade } from 'polished';
export const Container = styled.div`    
    margin: 0 auto 0;
    max-width: 550px;
    width 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Content = styled.div`
    img {
        width: 100%;
        height: 150px;
        border-radius: 10px;
        background-size: cover;
    }

      width: 100%;
      background:#fff; 
      border-radius:4px;
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

export const Background = styled.div`
    flex: 1;
    background: url(${cadastroInBG});
    background-size: cover;
`;
