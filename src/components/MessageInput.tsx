import styled from "styled-components";
import Button from '../components/Button';
import SendIcon from "../assets/SendIcon.png";
import { useState } from "react";

interface MessageInputProps {
    onChange?: (text: string) => void;
    onSubmit?: (text: string) => void;
    value?: string;
}

const MessageInputContainer = styled.div`
    padding: 8px 8px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 24px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    column-gap: 16px;
`;

const MessageInputInput = styled.input`
    padding: 0;
    margin: 0;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
    width: 100%;
    height: 32px;
    overflow-wrap: break-word;
    resize: none;
    border: none;
    outline: none;
`;

function MessageInput(props: MessageInputProps) {
    const [text, setText] = useState<string>(props.value || "");

    return (
        <MessageInputContainer>
            <MessageInputInput placeholder="Enter your message..." value={props.value} onChange={(e) => {
                setText(e.target.value);
                props.onChange && props.onChange(e.target.value);
            }} onKeyDown={(e) => {
                if (e.key == "Enter") {
                    props.onSubmit && props.onSubmit(text);
                }
            }} />
            <Button type='button' height={32} onClick={() => props.onSubmit && props.onSubmit(text)}><img src={SendIcon} /></Button>
        </MessageInputContainer>
    );
}

export default MessageInput;