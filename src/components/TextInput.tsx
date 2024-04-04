import styled from "styled-components";

interface TextInputProps {
    id?: string;
    name?: string;
    placeholder?: string;
    label?: string;
    onTextChange?: (text: string) => void;
}

const TextInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 4px;
`;

const TextInputLabel = styled.label`
    font-size: 0.875rem;
    font-weight: 300;
`;

const TextInputInput = styled.input`
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
    font-size: 0.875rem;
    padding: 8px;
    border: none;
    border-bottom: 1px solid;
    background-color: ${props => props.theme.primary.light[1]};
`;

function TextInput(props: TextInputProps) {
    return (
        <TextInputContainer>
            {props.label && <TextInputLabel htmlFor={props.id}>{props.label}</TextInputLabel>}
            <TextInputInput type="text" id={props.id} name={props.name} placeholder={props.placeholder} onChange={(e) => props.onTextChange && props.onTextChange(e.target.value)} />
        </TextInputContainer>
    );
}

export default TextInput;