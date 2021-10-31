import styled from 'styled-components';
import theme from '../theme';
import scrollbar from './scrollbar';

export const PanelWrapper = styled.div`
  border-radius: 10px;
  background-color: ${theme.primary};
  box-shadow: 2px 2px 5px 0 black;
  margin: 1em;
  padding: 1em;
  overflow: hidden;
  -webkit-user-select: none;
  ${scrollbar}
  
  h3 {
    color: white;
    padding: 0 0 0.25em 0;
  }
`;

type PanelProps = {
  header?: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Panel = ({ header, className, children, style }: PanelProps) => {
  return (
    <PanelWrapper className={className}>
      {(header) && <h3>{header}</h3>}
      {children}
    </PanelWrapper>
  )
}

export default Panel;