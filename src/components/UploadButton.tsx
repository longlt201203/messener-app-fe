import styled from "styled-components";
import AddImageIcon from "../assets/AddImageIcon.png";
import { ChangeEventHandler } from "react";

interface UploadButtonProps {
    id?: string;
    name?: string;
    label?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const UploadButtonContainer = styled.div``;

const UploadButtonLabel = styled.label`
    font-size: 0.75rem;
    font-weight: 300;
    display: flex;
    column-gap: 4px;
    align-items: center;
    height: 32px;
    padding: 0 8px;
    background-color: ${props => props.theme.primary.original};
    color: white;
    border-radius: 4px;
`;

const UploadButtonInput = styled.input`
    display: none;
`;

function UploadButton(props: UploadButtonProps) {
    return (
        <UploadButtonContainer>
            <UploadButtonLabel htmlFor={props.id}>
                <img src={AddImageIcon} alt="" />
                <span>{props.label || "Choose Your Image"}</span>
            </UploadButtonLabel>
            <UploadButtonInput type="file" onChange={props.onChange} id={props.id} name={props.name} />
        </UploadButtonContainer>
    );
}

export default UploadButton;