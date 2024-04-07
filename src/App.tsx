import styled from 'styled-components'
import Navbar from './components/Navbar';
import MessageInput from './components/MessageInput';
import MessageCard from './components/MessageCard';
import furinaAvt from "./assets/furina-avt.jpg";
import UserAvatar from './components/UserAvatar';
import UploadButton from './components/UploadButton';
import TextInput from './components/TextInput';
import { ChangeEventHandler, useEffect, useState } from 'react';
import Button from './components/Button';
import CreateUserDto from './dto/create-user.dto';
import axios, { AxiosResponse } from 'axios';
import UserDto from './dto/user.dto';
import useAuth from './hooks/useAuth';
import Globals from './etc/globals';
import useSocket from './hooks/useSocket';

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
  const { profile } = useAuth();
  const { chatData } = useSocket();

  return (
    <MessageCardsContainer>
      {
        chatData.length > 0 && chatData.map((item, index) => profile && item.from.id == profile.id ? (
          <MessageCard variant='primary' position='right' key={index} messages={item.messages} profile={item.from} />
        ) : (
          <MessageCard variant='default' position='left' key={index} messages={item.messages} profile={item.from} />
        ))
      }
      {/* <MessageCard messages={["Hi!"]} profile={{ id: "", name: "Le Thanh Long", avt: furinaAvt }} />
      <MessageCard variant='primary' position='right' messages={["Hello", "I'm Long"]} profile={{ id: "", name: "Le Thanh Long", avt: furinaAvt }} /> */}
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
  const [message, setMessage] = useState("");

  const { accessToken } = useAuth();
  const { sendMessage } = useSocket();

  const handleSubmitMessage = (text: string) => {
    // Message Logic Here
    if (accessToken && text) sendMessage(text, accessToken);
    // ------------------
    setMessage("");
  }

  return (
    <MessagesContainer>
      <MessageCards />
      <MessageInput value={message} onChange={(text) => setMessage(text)} onSubmit={handleSubmitMessage} />
    </MessagesContainer>
  );
}

const AvatarInputContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

function AvatarInput(props: { onAvtChange?: (newAvtUrl: string, newAvtFile: File) => void }) {
  const [avt, setAvt] = useState("");

  const handleUploadAvt: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const newAvtUrl = URL.createObjectURL(file);
      setAvt(newAvtUrl);
      props.onAvtChange && props.onAvtChange(newAvtUrl, file);
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
  const { changeUserId } = useAuth();

  const [avtFile, setAvtFile] = useState<File | undefined>();
  const [userData, setUserData] = useState<CreateUserDto>({
    avt: "",
    name: ""
  });

  const handleAvtChange = (newAvtUrl: string, newAvtFile: File) => {
    setUserData({ ...userData, avt: newAvtUrl });
    setAvtFile(newAvtFile);
  }

  const handleNameChange = (newName: string) => {
    setUserData({ ...userData, name: newName });
  }

  const handleEnterRoom = async () => {
    if (avtFile) {
      const formData = new FormData();
      formData.set("file", avtFile);
      try {
        const res = await axios.post<{ url: string }>(`${Globals.API_URL}/local-files/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        userData.avt = res.data.url;
      } catch (err) {
        console.log(err);
      }
    }

    try {
      let res = await axios.post<UserDto>(`${Globals.API_URL}/users/`, userData);
      changeUserId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <InformationBarContainer>
      <AvatarInput onAvtChange={handleAvtChange} />
      <TextInput id='name' name='name' label='Name' placeholder='Enter Your Name...' onTextChange={handleNameChange} />
      <Button type='button' height={32} onClick={(e) => handleEnterRoom()}>Enter Room</Button>
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
  const { userId } = useAuth();

  return (
    <MessageBoxContainer>
      {!userId && <InformationBar />}
      <Messages />
    </MessageBoxContainer>
  )
}

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => Array.from({ length: 12 }, _ => `1fr`).join(" ")};
  height: 100vh;
  overflow: auto;
`;

function App() {
  const { userId, login, accessToken, profile, fetchProfile } = useAuth();
  const { connect, disconnect } = useSocket();

  useEffect(() => {
    if (userId && !accessToken) login();
    if (accessToken) {
      fetchProfile();
    }
  }, [userId, accessToken]);

  useEffect(() => {
    if (profile) {
      disconnect();
      connect();
    }
  }, [profile]);

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
