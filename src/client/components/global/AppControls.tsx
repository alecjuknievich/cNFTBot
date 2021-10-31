import React from "react";
import '../../../App.css';
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCompressAlt, faTimes} from "@fortawesome/free-solid-svg-icons";
import theme from "../theme";

const electron = window.require("electron");

const StyledTitleBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.8rem;
  & > * {
    margin: 0 1em 0 0;
  }
`

const AppControls = () => (
    <StyledTitleBar>
        <FontAwesomeIcon icon={faCompressAlt}
                         color={theme.warn}
                         onClick={() => appControl('minimize')}/>

        <FontAwesomeIcon icon={faTimes}
                         color={theme.error}
                         onClick={() => appControl('close')}/>
    </StyledTitleBar>

)

function appControl(msg: string) {
    electron.ipcRenderer.send('app-control', msg);
}

export default AppControls;
