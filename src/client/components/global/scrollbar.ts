import theme from "../theme";

const scrollbar = `
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.brightA};
    cursor: pointer;
    max-width: 5px;
    border-radius: 1000px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.primary};
    border-radius: 1000px;
  }
`;

export default scrollbar;