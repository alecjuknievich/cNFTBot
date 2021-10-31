import TextInput from "../../global/TextInput";
import styled from "styled-components";
import Button from "../../global/Button";
import Panel from "../../global/Panel";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import React from "react";



let productKey = ""
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;

  input,
  button {
    margin: 0.5em 0;
    max-height: 30px;
  }

  input {
    text-align: center;
  }

  & > :not(img) {
    min-width: 100%;
    text-align: center;
  }
`;

const Login = () => {
  return (
    <Wrapper>
      <StyledPanel>
        <TextInput 
          placeholder="Enter Licence Key"
          onChange={(e) => productKey=e.target.value}/>
        <Button bright icon={faKey} onClick={() => login()} text="Login" />
      </StyledPanel>
    </Wrapper>
  );
};

async function login(){
    localStorage.clear();
    localStorage.setItem('botKey', productKey);
    window.location.pathname = "/tasks";
}



export default Login;
