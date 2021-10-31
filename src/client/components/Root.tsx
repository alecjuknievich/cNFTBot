import { createGlobalStyle } from "styled-components";
import theme from "./theme";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: Montserrat, sans-serif;
    
    font-weight: 500;
  }

  strong, button, h1, h2, h3, h4, h5 {
    font-weight: 600;
  }

  h1 {
    color: white;
    font-size: 1.75rem;
  }

  a {
    width: 100%;
    text-decoration: none;
    text-align: center;
    padding: 0 0 1em 0 !important;
  }

  label, a, h1, h2, h3, h4, h5, div, img {
    -webkit-user-select: none;
    user-select: none;
  } 

  #root {
    display: grid;
    grid-template-columns: minmax(0, 8fr) minmax(0, 92fr);
    grid-template-rows: 5fr 10fr 80fr 5fr; 
  
    height: 100vh;
    overflow: hidden;
    background: ${theme.bg};
    color: ${theme.text};
  }
`;
