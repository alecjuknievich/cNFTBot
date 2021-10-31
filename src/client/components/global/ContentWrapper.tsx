import styled from 'styled-components';
import scrollbar from './scrollbar';

const Wrapper = styled.div`
    grid-row: span 2;
    overflow:hidden;
   
    ${scrollbar}
`;

export default Wrapper;