import styled, { StyledComponent } from 'styled-components';
import theme from '../theme';
import scrollbar from './scrollbar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 1 1;
`;

const Label = styled.label`
  font-size: 0.7rem;
  min-width: 0;
  flex: 0 0;
`;
const Input: StyledComponent<"input", any, TextInputProps, never> = styled.input`

  box-shadow: 1px 1px 5px black;

  border: 2px solid transparent;
  border-radius: 5px;
  box-sizing: border-box;

  white-space: nowrap;
  text-overflow: ellipsis;

  font-size: 0.75rem;
  color: ${theme.text};
  background-color: ${(props: any) => props.secondary ? theme.primary : theme.bg};

  max-height: 28px;
  padding: 0.5em;
  margin: 0.5em;
  flex: 0 0;
  min-width: 0;
  opacity: 0.8;
  -webkit-appearance: none;
  
  &::-webkit-outer-spin-button, ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:hover, &:focus {
    opacity: 1;
    transition: 0.15s ease-in;
  }

  &:focus {
    outline: 0;
    
    border-color: ${theme.brightB};
    transition: 0.15s ease-in;
  }
`;

const Select: StyledComponent<"select", any, TextInputProps, never> = styled.select`
  /* grid-row-start: 2; */
  box-shadow: 1px 1px 5px black;

  border: 2px solid transparent;
  border-radius: 5px;
  box-sizing: border-box;

  max-height: 28px;
  font-size: 0.75rem;
  color: ${theme.text};
  background-color: ${(props: any) => props.secondary ? theme.primary : theme.bg};

  padding: 0.5em;
  margin: 0.5em;
  flex: 0 0;
  min-width: 0;
  opacity: 0.8;
  -webkit-appearance: none;
  
  &::-webkit-outer-spin-button, ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:hover, &:focus {
    opacity: 1;
    transition: 0.15s ease-in;
  }

  &:focus {
    outline: 0;
    border-color: ${theme.brightB};
    transition: 0.15s ease-in;
  }
`;

type TextInputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> | undefined;
  secondary?: boolean | undefined;
  children?: React.ReactNode;
}

const TextInput = (props: TextInputProps) => {
  if (props.type && props.type === 'select') {
    return  (
      <Wrapper>
        {props.label ? <Label>{props.label}</Label> : null }
        <Select secondary={ props.secondary } 
          onChange={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
        >{props.children}</Select>
      </Wrapper>
    )
  }


  return  (
    <Wrapper>
      {props.label ? <Label>{props.label}</Label> : null }
      <Input secondary={ props.secondary ? true: false } 
        type={props.type ? props.type : 'text'}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
       
      />
    </Wrapper>
  )
};

export default TextInput;

export const TextArea = styled.textarea`
  

  border: 2px solid transparent;
  border-radius: 5px;
  box-shadow: 1px 1px 5px black;
  box-sizing: border-box;

  font-size: 0.75rem;
  color: ${theme.text};
  background-color: ${(props: any) => props.secondary ? theme.primary : theme.bg};
  padding: 0.5em !important;
  margin: 0.5em;

  resize: none;
  flex: 1 1;
  min-width: 0;
  opacity: 0.8;
  -webkit-appearance: none;

  &::-webkit-outer-spin-button, ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:hover, &:focus {
    opacity: 1;
    transition: 0.15s ease-in;
  }

&:focus {
  outline: 0;

  border-color: ${theme.brightB};
  transition: 0.15s ease-in;
}
${scrollbar}
`;
