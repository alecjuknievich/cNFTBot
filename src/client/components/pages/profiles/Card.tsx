import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import theme from '../../theme';
import {db} from "../../db/db";
import {profile} from "../../db/interfaces";

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, 1fr);
  background-image: -webkit-linear-gradient(30deg, ${theme.cardA} 55%, ${theme.cardB} 45%);
  box-shadow: 2px 2px 5px 0 black;
  border-radius: 10px;
  border: 2px solid ${theme.accent};
  box-sizing: content-box;
  margin: 1em;
  padding: 1em;
  opacity: 0.8;

  &:hover {
      border-color: white;
      transition: border 0.25s linear;
      opacity: 1;
  }

  div {
      margin: 0 0.2em;
      font-size: 0.7rem;
  }

  h4 {
      margin: 0.5em 0;
  }
`


const Card = (profile: profile) => (
  <StyledCard>

    <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
      <FontAwesomeIcon style={{ marginRight: '1em' }} icon={faEdit} color={theme.info} />
      <FontAwesomeIcon icon={faTimes} color={theme.error} onClick={() => db.profiles.delete(profile.id)} />
    </div>
    <div>
      <h4>{profile.profileName}</h4>
      <span>{profile.email}</span>
      <span> {profile.password}</span>
    </div>

  </StyledCard>
)

export default Card;
