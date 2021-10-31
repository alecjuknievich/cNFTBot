import Panel from '../../global/Panel';
import TextInput from '../../global/TextInput';

const CaptchaPanel = () => (
  <Panel header="Captcha">
    <TextInput label="2Captcha API Key" placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"/>
    <TextInput label="CapMonster API Key" placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"/>
  </Panel>
);

export default CaptchaPanel;