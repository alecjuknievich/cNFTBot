import Button from "../../global/Button";
import TextInput from "../../global/TextInput";
import Modal from "../../global/Modal";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {db} from "../../db/db";
import {profile} from "../../db/interfaces";

type NewTaskModalProps = {
    toggleModal: React.MouseEventHandler<HTMLDivElement> | undefined;
    profile?: profile;
};

const NewProfileModal = ({toggleModal}: NewTaskModalProps) => {
    const [profileName, setProfileName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function createNewProfile(e: any) {
        let lastProfile = await db.profiles.orderBy('id').last();
        let id: number = lastProfile?.id || 0;
        let profile: profile = {
            id: id + 1,
            profileName: profileName,
            email: email,
            password: password
        };
        console.log(profile);
        db.profiles.add(profile, profile.id);
    }

    const footer = () => {
        return (
            <>
                <TextInput placeholder="Profile Name" onChange={(e) => setProfileName(e.target.value)}/>
                <Button
                    bright
                    icon={faSave}
                    style={{gridColumn: "span 2"}}
                    text="Save"
                    onClick={(e) => createNewProfile(e)}
                />
            </>
        );
    };

    return (
        <Modal title="New Profile" footer={footer()} toggleModal={toggleModal}>

            <TextInput
                label="Email"
                placeholder=""
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <TextInput
                label="Password"
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

        </Modal>
    );
};
export default NewProfileModal;
