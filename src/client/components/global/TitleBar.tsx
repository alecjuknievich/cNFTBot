import React from "react";
import '../../../App.css';
import styled from "styled-components";

const DragTitleBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  -webkit-app-region: drag;
  font-size: 0.8rem;
`

const TitleBar = () => (
        <DragTitleBar>
        </DragTitleBar>

)

export default TitleBar;
