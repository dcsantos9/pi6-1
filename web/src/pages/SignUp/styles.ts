import styled from 'styled-components';
import signUpBG from '../../assets/dog-signup2.jpg';
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
            margin-bottom: 24px;
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
    background: url(${signUpBG}) no-repeat center;
    background-size: cover;
`;

