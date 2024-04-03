import styled from 'styled-components'
import Navbar from './components/Navbar';
import MessageInput from './components/MessageInput';
import MessageCard from './components/MessageCard';
import furinaAvt from "./assets/furina-avt.jpg";
import UserAvatar from './components/UserAvatar';
import UploadButton from './components/UploadButton';
import TextInput from './components/TextInput';
import { ChangeEventHandler, useState } from 'react';

const RoomsContainer = styled.div`
  grid-column: span 4;
  padding: 16px 16px;
  background-color: ${props => props.theme.neutral[0]};
`;

function Rooms() {
  return (
    <RoomsContainer>

    </RoomsContainer>
  );
}

const MessageCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  justify-content: end;
`;

function MessageCards() {
  return (
    <MessageCardsContainer>
      <MessageCard messages={["Hi!"]} profile={{ id: "", name: "Le Thanh Long", avt: furinaAvt }} />
      <MessageCard variant='primary' position='right' messages={["Hello", "I'm Long"]} profile={{ id: "", name: "Le Thanh Long", avt: furinaAvt }} />
    </MessageCardsContainer>
  );
}

const MessagesContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  height: 100%;
  justify-content: end;
`;

function Messages() {
  return (
    <MessagesContainer>
      <MessageCards/>
      <MessageInput/>
    </MessagesContainer>
  );
}

const AvatarInputContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

function AvatarInput(props: { onAvtChange?: (newAvtUrl: string) => void }) {
  const [avt, setAvt] = useState("");

  const handleUploadAvt: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const newAvtUrl = URL.createObjectURL(file);
      setAvt(newAvtUrl);
      props.onAvtChange && props.onAvtChange(newAvtUrl);
    }
  }

  return (
    <AvatarInputContainer>
      <UserAvatar avt={avt} />
      <UploadButton id="avt" name='avt' onChange={handleUploadAvt} />
    </AvatarInputContainer>
  );
}

const InformationBarContainer = styled.div`
  background-color: white;
  padding: 8px 16px;
  border-bottom-left-radius: 8px;
  box-shadow: 0px 4px 24px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: sticky; */
  /* top: 0; */
`;

function InformationBar() {
  return (
    <InformationBarContainer>
      <AvatarInput/>
      <TextInput id='name' name='name' label='Name' placeholder='Enter Your Name...'/>
    </InformationBarContainer>
  );
}

const MessageBoxContainer = styled.div`
  grid-column: span 8;
  padding-bottom: 32px;
  background-color: ${props => props.theme.primary.light[0]};
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  justify-content: start;
`;

function MessageBox() {
  return (
    <MessageBoxContainer>
      <InformationBar/>
      <Messages/>
    </MessageBoxContainer>
  )
}

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => Array.from({ length: 12 }, _ => `1fr`).join(" ")};
  height: 100vh;
`;

function App() {
  return (
    <>
      <Navbar />
      <AppContainer>
        <Rooms />
        <MessageBox />
      </AppContainer>
    </>
  )
}

export default App
