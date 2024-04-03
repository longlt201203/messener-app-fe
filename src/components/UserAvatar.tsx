import styled from "styled-components";

interface UserAvatarProps {
    avt?: string;
}

const UserAvatar = styled.div<UserAvatarProps>`
    width: 48px;
    height: 48px;
    background: ${props => props.theme.neutral[0]} url(${props => props.avt}) no-repeat center center;
    background-size: cover;
    border-radius: 50%;
`;

export default UserAvatar;