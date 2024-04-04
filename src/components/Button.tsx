import { MouseEventHandler, PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonProps {
    height?: number;
    type?: "submit" | "reset" | "button";
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const PrimaryButton = styled.button<ButtonProps>`
    outline: none;
    border: none;
    padding: 0 16px;
    height: ${props => props.height || 48}px;
    border-radius: 8px;
    background-color: ${props => props.theme.primary.original};
    color: white;
`;

function Button(props: PropsWithChildren<ButtonProps>) {
    return <PrimaryButton {...props} type={props.type} onClick={props.onClick}></PrimaryButton>;
}

export default Button;