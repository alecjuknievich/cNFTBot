import Content from "./Content";
import SideBar from "../../global/SideBar";
import TopBar, {CounterWrapper, PrimaryControls, SecondaryControls} from "../../global/TopBar";
import TitleBar from '../../global/TitleBar';
import Button from "../../global/Button";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import theme from "../../theme";
import {db} from "../../db/db";
import {ProxyCount} from "../../db/proxyCount";
import React from "react";
import AppControls from "../../global/AppControls";


const Proxies = () => {


    return (
        <>
            <SideBar page="proxies"/>
            <TitleBar/>
            <TopBar>
                <CounterWrapper><ProxyCount/> Proxy Lists</CounterWrapper>
                <PrimaryControls>
                    <Button text="Clear All" icon={faTimesCircle} color={theme.error}
                            onClick={() => db.proxies.clear()}/>
                </PrimaryControls>
                <SecondaryControls>
                    <AppControls />
                </SecondaryControls>
            </TopBar>
            <Content/>
        </>
    );
}

export default Proxies;
