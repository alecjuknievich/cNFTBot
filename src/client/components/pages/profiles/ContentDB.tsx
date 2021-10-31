import styled from 'styled-components';
import Card from './Card';
import ContentWrapper from '../../global/ContentWrapper';
import scrollbar from '../../global/scrollbar';
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../db/db"

const ProfileGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 2fr);
    grid-template-rows: repeat(3, 1fr);
    overflow-y: auto;
    max-height: calc(100% - 4em);
    margin: 2em;

    ${scrollbar}
`;

export function ProfileDisplay() {
    const profiles = useLiveQuery(
        () => db.profiles
            .toArray()
    );

    if (!profiles) return null;
    return (
        <ContentWrapper>
            <ProfileGrid>
                {
                    profiles.map(p => (
                        <Card key={p.id} id={p.id}
                              profileName={p.profileName}
                              email={p.email}
                              password={p.password}/>
                    ))
                }
            </ProfileGrid>
        </ContentWrapper>
    )
}
export default ProfileDisplay;
