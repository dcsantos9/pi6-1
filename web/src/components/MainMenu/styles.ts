import styled from 'styled-components';

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 800px) {
        display: none;
        flex-direction: column;
        position: relative;
    }

    width: 100%;
    max-width: 300px;
    padding: 50px;
    color: #FFF;
    background-color: #FF9000;

    img {
        max-width: 340px;
        height: 90vh;
        border-radius: 10px;
        background-size: cover;
    }
    .logo{
        width: 250px;
        height: 120px;
    }

`;

