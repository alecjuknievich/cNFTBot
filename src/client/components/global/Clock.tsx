import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import theme from '../theme';
const Wrapper = styled.div`
    position: fixed;
    top: 88px;
    background-color: ${theme.bg};
    background-repeat: no-repeat;
    background-size: 10px 10px;
    padding: 5px;
    z-index: 1;
    font-size:8pt;
    right: 25px; 
    margin-right: 0.5rem;
    justify-content: flex-end;
    text-align: right !important;
`;

const Clock = () => {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        let timerID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timerID);
        };
    });
      
    function tick() {
    setDate(new Date());
    }
    return (
        <Wrapper>{date.toLocaleTimeString()}</Wrapper>
    )
}

export default Clock;
