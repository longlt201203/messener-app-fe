import UserDto from "./user.dto";

export default interface ChatMessageDto {
    from: UserDto;
    message: string;
}