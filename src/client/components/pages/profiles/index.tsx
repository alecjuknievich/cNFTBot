import React, { useState } from "react";
import {faTimesCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import theme from "../../theme";
import Button from "../../global/Button";
import SideBar from "../../global/SideBar";
import TopBar, {
  CounterWrapper,
  PrimaryControls,
  SecondaryControls,
} from "../../global/TopBar";

import ProfileDisplay from "./ContentDB";
import NewProfileModal from "./NewProfileModal";
import {deleteAllProfiles} from "../../db/db";
import ProfileCount from "../../db/profileCount";
import TitleBar from "../../global/TitleBar";
import AppControls from "../../global/AppControls";






const Profiles = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  function toggleProfileModal() {
    setShowProfileModal(!showProfileModal);
  }
  return (
    <>
      <SideBar page="profiles" />
        <TitleBar />
      <TopBar>
        <CounterWrapper><ProfileCount /> Profiles</CounterWrapper>
        <PrimaryControls>
          <Button
            style={{ maxWidth: "2.3em" }}
            onClick={toggleProfileModal}
            icon={faPlus}
            color={theme.success}
          />
          <Button text="Clear All" icon={faTimesCircle} color={theme.error} onClick={deleteAllProfiles} />
        </PrimaryControls>

        <SecondaryControls>
          <AppControls />
        </SecondaryControls>
      </TopBar>
      <ProfileDisplay />
      {showProfileModal && <NewProfileModal toggleModal={toggleProfileModal} />}
    </>
  );
};

export default Profiles;
