import styled, { css } from "styled-components";
import Headings from "./Headings";
import UserAvatar from "./UserAvatar";
import UserDto from "../dto/user.dto";

interface MessageCardProps {
    position?: "left" | "right";
    variant?: "primary" | "default";
    profile?: UserDto;
    messages?: string[];
}

const UserInfoContainer = styled.div<MessageCardProps>`
    flex-basis: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props => (props.position && props.position === "right") ? "end" : "start"};
    flex-direction: ${props => (props.position && props.position === "right") ? "row-reverse" : "row"};
    column-gap: 8px;
`;

function UserInfo(props: MessageCardProps) {
    return (
        <UserInfoContainer {...props}>
            <UserAvatar avt={props.profile?.avt} />
            <Headings.h5>{props.profile?.name}</Headings.h5>
        </UserInfoContainer>
    );
}

interface MessageProps extends MessageCardProps {
    content?: string;
}

const MessageContainer = styled.div<MessageProps>`
    flex-basis: 60%;
    display: flex;
    justify-content: ${props => (props.position && props.position === "right") ? "end" : "start"};
`;

const MessageSpanAdditionalStyles = {
    primary: css`
        background-color: ${props => props.theme.primary.original};
        color: white;
    `,
    default: css`
        background-color: white;
        color: ${props => props.theme.primary.dark[0]};
    `
};

const MessageSpan = styled.span<MessageProps>`
    font-size: 0.875rem;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    line-height: 1rem;
    ${props => MessageSpanAdditionalStyles[props.variant || "default"]}
    border-radius: 8px;
    padding: 8px;
`;

function Message(props: MessageProps) {
    return (
        <MessageContainer {...props}>
            <MessageSpan {...props}>
                {props.content}
            </MessageSpan>
        </MessageContainer>
    );
}

const MessageCardContainer = styled.div<MessageCardProps>`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    row-gap: 16px;
    justify-content: ${props => (props.position && props.position === "right") ? "end" : "start"};
`;

function MessageCard(props: MessageCardProps) {
    return (
        <MessageCardContainer {...props}>
            <UserInfo {...props} />
            {props.messages?.map(message => <Message {...props} content={message} />)}
        </MessageCardContainer>
    );
}

export default MessageCard;