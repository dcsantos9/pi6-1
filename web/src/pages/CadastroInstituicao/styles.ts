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
        width: 75%;
        height: 150px;
        margin-left: 25%;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${appearFromLeft} 1s;

    body{
        background: #000;
    }
    form {
        margin: 50px 0;
        width: 100%;
        text-align: left;
        h1 {
            margin-bottom: 24px;
        }
        a {
            color: #666;
            display: block;
            margin-bottom: 5px;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.2s;
            text-decoration: underline;
            text-align: right;
            font-size:12px;
            &:hover{
                color: ${shade(0.2, '#FF9000')};
            }            
        }

    }
    
    > a {

        color: #FF9FF;        
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        &:hover{
            color: ${shade(0.2, '#FF9000')};

        }
        svg {
            margin-right: 16px;
        }
    }

    .radio{
        margin-right: 10px;
    }

    h3{
        margin: 15px 5px;
        color:#FF9000;
        
    }
    .button{
        width: 45%;    
        height: 50px;
        padding: 0px;              
    }
    .button2{
        width: 150px;    
        height: 30px;
        padding: 0px;              
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
    textarea
    {
        background: #FFFFFF;
        border-radius: 10px;
        border: 1px solid #ccc;
        color: #777;
        padding: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        & + div {
            margin-top: 16px;
        }
        height: 100px;
        resize: vertical;
    }
    span{
        text-transform: lowercase;
    }
    select{
        font-size: 16px;
        padding: 10px;
        border-radius:10px;
        border: 1px solid #ccc;
        color: #333;
        margin-left:5px;
    }

    input[type='file'] {
        font-family: initial;
      } 
     div{
        border-radius: 10px;
        border: 1px solid #ccc;
      }
      .button{
        border: none;
      }

       
`;

export const Background = styled.div`
    flex: 1;
    background: url(${cadastroInBG});
    background-size: cover;
`;
