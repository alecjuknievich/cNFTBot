import styled from "styled-components";
import Panel from "../../global/Panel";
import scrollbar from "../../global/scrollbar";

import theme from "../../theme";
import { changelog } from "./mock-data";

const StyledPanel = styled(Panel)`
  grid-row: span 3;
`;

const InnerPanel = styled(Panel)`
  background-color: ${theme.bg};
  border: 2px solid ${theme.brightB};

 
  p {
    font-size: 0.6rem;
  }
`;

const InnerWrapper = styled.div`
  height: 95%;
  width: 100%;
  overflow: auto;
  padding: 0 0.25em 0.25em 0.25em;
  ${scrollbar}
`;

const ChangelogPanel = () => {
  const newCL = [...changelog].reverse();

  return (
    <StyledPanel header="Changelog">
      <InnerWrapper>
        {newCL.map((d: any, i: number) => (
          <InnerPanel key={i}>
            <h4>Version {d.version}</h4>
            <p>{d.info}</p>
          </InnerPanel>
        ))}
      </InnerWrapper>
    </StyledPanel>
  );
};

export default ChangelogPanel;
