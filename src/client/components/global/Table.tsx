import styled from 'styled-components';
import theme from '../theme';
import { FixedSizeList as List } from "react-window";
import scrollbar from './scrollbar';


export const Table = styled.div`
    width: 97.5%;
    height: 95%;
    margin: 2.5% 1.25%;
    -webkit-user-select: none;
`;
export const TableBody = styled(List)`
    font-size: 0.75rem;
    flex: 1 0;
    overflow-x: hidden;
    margin: 1em 0;

    ${scrollbar}
`;

export const TableBodyRowWrapper = styled.div`
`;

export const TableBodyRow = styled.div`   
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    text-align: center;
    align-items: center;
    margin: 0 1em;
    min-height: 2.5rem;
    background: ${theme.tasks};
    box-shadow: 2px 2px 5px 0 black;
    border-radius: 7.5px;
    &:hover {
        border: #656B8F solid 1px;
        background: #5B6082;
    };

    /* &:hover {
        transform: scale(1.01) translateY(-1px) translateZ(0);
    } */
`;

export const TableBodyCell = styled.div`
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;

`;

export const TableHeader = styled.div`
    width: 100%;
    color: white;
    font-size: 0.9rem;
    margin: 0;
`;
export const TableHeaderRow = styled.div`
      display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    text-align: center;
    align-items: center;
    margin: 0 1em 0 1em;
    min-height: 2.75rem;
    background-color: ${theme.brightA};
    box-shadow: 2px 2px 5px 0 black;
    border-radius: 7.5px;

   
`;
export const TableHeaderCell = styled(TableBodyCell)`
    font-weight: 600;
`;


