import styled from 'styled-components';
import theme from '../theme';
import Clock from './Clock';
import { faBookmark, faUsers, faCog, faSlidersH, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LogoContainer = styled.div`
    grid-row: span 2;
    display: flex;
    justify-content: center;    
    align-items: flex-start;

    & > img {
        max-width: 100%;
    }
    
`;

export const Navigation = styled.div`
    /* grid-row-start: span 3;
    grid-column-start: span 1; */

    display: flex;
    flex-direction: column;

    min-width:50px;
    min-height:50px;
    
    
    text-align: center;
    
    
   

    & > a {
        margin: 1.5em 0;
        opacity: 0.5;
        color: ${theme.brightB};
        -webkit-user-select: none;
    }

    & > a:hover, & > a.active {
        opacity: 1;
        color: ${theme.brightA};
    }

`;

const StyledSidebar = styled.div`
    grid-row: span 100;

    display: grid;
    grid-template-rows: minmax(0, 5fr) minmax(0, 10fr) minmax(0, 80fr) minmax(0, 5fr);
    grid-template-columns: minmax(0, 1fr);

    border-right: 2.5px solid ${theme.accent};

`;

const Version = styled.div`
    grid-row-start: 4;
    font-size: 0.6rem;
    text-align: center;
    div {
        margin: 0.25em 0;
    }
`;

type SideBarProps = {
    page: string;
}

const Sidebar = ({ page }: SideBarProps) => {
    
    return (
        <StyledSidebar>
            <LogoContainer>
                <img alt="" draggable={false} src="/assets/logo.svg"/>
            </LogoContainer>
            <Navigation>
                <Link draggable={false} className={page === 'tasks' ? 'active': ''} to="/tasks"><FontAwesomeIcon icon={faBookmark}/></Link>
                <Link draggable={false} className={page === 'profiles' ? 'active': ''} to="/profiles"><FontAwesomeIcon icon={faUsers}/></Link>
                <Link draggable={false} className={page === 'proxies' ? 'active': ''} to="/proxies"><FontAwesomeIcon icon={faSlidersH}/></Link>
                <Link draggable={false} className={page === 'settings' ? 'active': ''} to="/settings"><FontAwesomeIcon icon={faCog}/></Link>
            </Navigation>

            <Clock />
            <Version>
                <div>Connected <FontAwesomeIcon icon={faCircle} color={theme.success}/></div>
            </Version>
          
        </StyledSidebar>
    )
};

export default Sidebar;


