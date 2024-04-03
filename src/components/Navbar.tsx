import styled from "styled-components";
import MessageAppLogo from "../assets/MessageAppLogo.png";
import Headings from "./Headings";

const BrandingContainer = styled.div`
    display: flex;
    /* flex-direction: row; */
    column-gap: 32px;
    align-items: center;
`;

function Branding() {
    return (
        <BrandingContainer>
            <div>
                <img src={MessageAppLogo} alt="" />
            </div>
            <Headings.h1>Messenger App</Headings.h1>
        </BrandingContainer>
    );
}

const NavbarContainer = styled.div`
    padding: 32px;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid;
    /* position: absolute; */
    background-color: white;
    /* width: 100%; */
`;

function Navbar() {
    return (
        <NavbarContainer>
            <Branding/>
        </NavbarContainer>
    );
}

export default Navbar;