import styled from 'styled-components';
import theme from '../theme';
import scrollbar from './scrollbar';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  data-backdrop="static"
  width: 100vw;
  height: 75vh;
  background-color: transparent;
  top: 140px;
  left: 400px;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const ModalBox = styled.div`
 width: 400px;
  height: 425px;
  background-color: ${theme.primary};
  border: 2px solid ${theme.accent};
  border-radius: 10px;
  
  box-shadow: 0 0 5px 2.5px black;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const ExitButton = styled.div`
    position: relative;
    top:2px;
    left: 383px;

`;

const ModalBody = styled.div`
  max-width: 100%;
  max-height: 75%;
  flex: 0 1 75%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  position: relative;
  overflow: auto;
  padding: 0.25em 1.5rem;
  margin: 0.5em;

  & > * {
    flex-grow: 0;
  }

  ${scrollbar}
`;

const ModalFooter = styled.div`
  display: flex;
  height: 10%;
  flex: 0 0 10%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 2px solid ${theme.accent};
  padding: 0 1.5rem;
`;

const ModalTitle = styled.div`
  position: relative;
  top:3px;
  border-bottom: 2px solid ${theme.accent};
`;

type ModalProps = {
  toggleModal: React.MouseEventHandler<HTMLDivElement> | undefined;
  title: string;
  footer: React.ReactNode;
  children: React.ReactNode;
}

const Modal = ({ toggleModal, title, footer, children }: ModalProps) => {
  return (
      <ModalWrapper onClick={toggleModal}>
        <ModalBox>
          <ExitButton>
            <FontAwesomeIcon icon={faTimes} color={theme.error} />
          </ExitButton>
          <ModalTitle>
          </ModalTitle>
          <ModalBody onClick={(e) => { e.stopPropagation() }}>
            {children}
          </ModalBody>
          <ModalFooter onClick={(e) => { e.stopPropagation() }}>
            { footer }
          </ModalFooter>
        </ModalBox>
      </ModalWrapper>
  )
}
export default Modal;
