import styled from 'styled-components';
import theme from '../theme';

export default styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 4.5fr);
  grid-template-rows: minmax(0, 2fr) minmax(0, 2fr);;
  
  align-items: center;
  text-align: center;

  /* display: flex;
  flex-direction: column;
  justify-content: space-between;//center; */
  -webkit-app-region: drag;
  overflow: hidden;   
  padding: 0 0.5em 0.5em 0.5em;

  & > div > h1 {
    margin: 0 0.5em;
  }

  & > *{  
    -webkit-app-region: no-drag;
  }

`;

export const CounterWrapper = styled.div`
  grid-row: 2;
  text-align: left;
  white-space: nowrap;
  font-size: 0.65em;
  margin-left: 1.25em;
  position: fixed;
  top: 88px;
  background-color: ${theme.bg};
  background-repeat: no-repeat;
  background-size: 10px 10px;
  padding: 5px;
  z-index: 1;
  position: fixed;
`;

export const PrimaryControls = styled.div`
  display: flex;
  align-items: center;
  grid-column: span 2;
  top: 16px;
  position: relative;
`;

export const SecondaryControls = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-row: span 2;
`;
