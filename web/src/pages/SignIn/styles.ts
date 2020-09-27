import styled from 'styled-components';
import signInBG from '../../assets/cat-login.jpg';
import {shade} from 'polished';
export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    width: 100%;
    max-width: 700px;
    img {
        max-width: 340px;
    }
    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        h1 {
            margin-button: 24px;
        }

        input {
            margin-top: 24px;
            background: #FFFFFF;
            border-radius: 10px;
            border: 2px solid #FFFFFF;
            color: #333333;
            padding: 16px;
            width: 100%;
            & + input {
                margin-top: 8px;
            }



        }

        button {
            background: #FF9000;
            border-radius: 10px;
            border: 0;
            color: #FFFFFF;
            padding: 16px;
            width: 100%;
            margin-top: 16px;
            font-weight: 500;
            transition: background-color 0.2s;
            &:hover{
                background: ${shade(0.2, '#FF9000')};
            }
        }
        a {
            color: #666;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            &:hover{
                color: ${shade(0.2, '#666')};
            }
        }

    }
    > a {

        color: #FF9000;
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
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signInBG}) no-repeat center;
    background-size: cover;
`;

