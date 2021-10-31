import Content from "./Content";
import SideBar from "../../global/SideBar";
import TopBar, {
    PrimaryControls, SecondaryControls,
} from "../../global/TopBar";
import TitleBar from "../../global/TitleBar";
import AppControls from "../../global/AppControls";
import theme from "../../theme";
import Button from "../../global/Button";
import { faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Settings = () => {

  return (
    <>
      <SideBar page="settings" />
      <TitleBar />
      <TopBar>
        <PrimaryControls>
          <Button style={{ maxWidth: '2em'}} icon={faSignOutAlt} color={theme.error}/>
        </PrimaryControls>
          <SecondaryControls>
             <AppControls />
          </SecondaryControls>

      </TopBar>
      <Content />
    </>
  );
};

export default Settings;
