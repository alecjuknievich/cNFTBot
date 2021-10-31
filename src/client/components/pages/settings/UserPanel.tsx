import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import Panel from "../../global/Panel";
import theme from "../../theme";


const StyledPanel = styled(Panel)`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  background-image: -webkit-linear-gradient(
    10deg,
    ${theme.brightA} 40%,
    ${theme.brightB} 60%
  );

  & > * {
    flex: 1 1;
    text-align: center;
    margin: 0.5em 0;
  }

  div {
    font-size: 0.8rem;
    margin: 0.5em 0;
  }

  img {
    border-radius: 50%;
    max-width: 25%;
  }
`;

const UserPanel = () => {
  const [keyVisable, setKeyVisible] = useState(false);
  return (
    <StyledPanel>
      <div>
        <h3>Membership Type</h3>
      </div>
      <div>
        <h3>Key Details</h3>
        <div>
          {keyVisable ? (
            <>
              <FontAwesomeIcon
                icon={faEyeSlash}
                onClick={() => {
                  setKeyVisible(!keyVisable);
                }}
              />{" "}
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faEye}
                onClick={() => {
                  setKeyVisible(!keyVisable);
                }}
              />{" "}
            </>
          )}{" "}
        </div>
      </div>
    </StyledPanel>
  );
};

export default UserPanel;
