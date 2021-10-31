import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import theme from '../theme';

type StyledButtonProps = {
    text?: string;
    title?: string;
    icon?: IconDefinition;
    color?: string;
    bright?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    style?: React.CSSProperties | undefined;
};

const StyledButton = styled.button`

    width: 30px;
    height: 25px;

    flex: 0 0 80px;
    max-width: 100px;

    top:15px;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    background-color: ${({ bright }: StyledButtonProps) => bright ? theme.brightA : theme.primary};
    color: white;
    margin: 0.5em;

    border-radius: 5px;

    color: ${({ bright }: StyledButtonProps) => bright ? 'white' : theme.text};
    font-size: 0.75rem;
 
    
    box-shadow: 1px 1px 5px black;
    -webkit-appearance: none;
    border: 2px solid transparent;
    opacity: 0.8;
    
    &:hover {
        opacity: 1;
        cursor: pointer;
    }

    &:focus {
        outline: 0;
    }

    & > span {
        margin-left: 0.3em;
    }
`;

const Button = ({ icon, text, color, onClick, bright, style, title }: StyledButtonProps) => {
    return (
        <StyledButton bright={bright} onClick={onClick} style={style} title={title}>
            {icon ? <>
                <FontAwesomeIcon style={{ color }} icon={icon} />
                {text && <span>{text}</span>}
            </> : text}
        </StyledButton>
    )
}

export default Button;
