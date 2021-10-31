import styled from 'styled-components';
import ContentWrapper from '../../global/ContentWrapper';
import UserPanel from './UserPanel';
import ChangeLog from './ChangeLog';
import CaptchaPanel from './CaptchaPanel';
import WebhookPanel from './WebhookPanel';

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 4fr);
  grid-template-rows: minmax(0, 1fr);
  max-height: calc(100% - 2em);
  margin: 1em;

`;

const Content = () => (
  <ContentWrapper style={{maxHeight: '100%'}}>
    <SettingsGrid>
      <UserPanel/>
      <ChangeLog/>

      <CaptchaPanel/>
 
      <WebhookPanel/>
    </SettingsGrid>
  </ContentWrapper>
)

export default Content;