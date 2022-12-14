import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Open Sans", sans-serif;
    }

    body {
        background-color: ${({ theme }) => theme.primary};
    }   


    a {
    text-decoration: none;
    color: black;
    }

    ::-webkit-scrollbar {
    width: 0px;
    height: 5px;
    }

    ::-webkit-scrollbar-thumb {
    background-color: rgb(114, 113, 113);
    border-radius: 10px;
    height: 200px;
    }

    ::-webkit-scrollbar-track {
    background-color: transparent;
    }
`;

export default GlobalStyle;
