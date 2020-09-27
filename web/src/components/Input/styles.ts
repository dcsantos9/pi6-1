import styled from 'styled-components';

export const Container = styled.div`

    margin-top: 24px;
    background: #FFFFFF;
    border-radius: 10px;
    border: 2px solid #FFFFFF;
    color: #333333;
    padding: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    & + div {
        margin-top: 16px;
    }

    input {
        background: transparent;
        flex:1 ;
        border: 0;
        color: #F4EDE8;

        &::placeholder {
            color: #666360;
        }

    }
    svg {
        margin-right: 16px;
    }
`;
