import ContentWrapper from '../../global/ContentWrapper';
import TextInput, { TextArea } from '../../global/TextInput';
import Button from '../../global/Button';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useState } from 'react';
import { addProxyList } from '../../db/db';
import { ProxyTableDB } from "./ProxyTableDB";

const Wrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const NewProxyWrapper = styled.div`
  margin: 2.5% 0 2.5% 2.5%;
  height: 95%;
  display: flex;
  flex-direction: column;
  flex: 1 1 25%;
  justify-self: center;
  align-self: center;

  & > textarea {
    padding: 0;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    & > * {
      margin-left: 0;
      margin-right: 0;

    }
  }
`;

const Content = () => {
  const [ proxyInput, setProxyInput ] = useState(`ip:port:user:pass`)
    const [ listName, setListName ] = useState("Proxy List Name")
  return (
    <Wrapper>
      <NewProxyWrapper>
        {/*@ts-ignore */}
        <TextArea secondary style={{ width: '100%', marginTop: '2.5%' }} value={proxyInput} onChange={(e) => setProxyInput(e.target.value)}/>

        <div>
          <TextInput secondary placeholder="Proxy List Name" value={listName} onChange={(e) => setListName(e.target.value)} />
          <Button bright icon={faSave} text="Save" onClick={() => (addProxyList(proxyInput, listName))} />
        </div>

      </NewProxyWrapper>
        <ProxyTableDB style={{ flex: '1 1 75%' }} />
    </Wrapper>
  )
}

export default Content;
