import React, { useState, useEffect } from 'react';

import { View, StyleSheet, FlatList, Keyboard } from 'react-native';

import ChatInput from '../../../components/screens/chat/ChatInput';
import OutgoingMessage from '../../../components/screens/chat/OutGoingMessage';
import ReceivedMessage from '../../../components/screens/chat/ReceivedMessage';

import LogoBackground from '../../../components/general/LogoBackground';
import { getChat } from '../../../api-clients/apiServices';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { useAppContext } from '../../../store/AppContext';
import socketManager from '../../../lib/socketManager';
import { DatabaseBackup } from 'lucide-react-native';

interface Params {
  orderId: string;
  orderName: string;
  completed?: boolean;
  accepted?: boolean;
  cancelled?: boolean;
}


const ChatComponent = () => {

  type message = {
    createdAt: string,
    message: string,
    sender: {
      name: string,
      id: number,
    }

  }

  const { state } = useAppContext();
  const { userId, token } = state;


  const [messagess] = useState([
    {
      text: 'Hi thereasda dsad sadsa dsa dsa dsad !',
      dateTime: '06:35 PM',
      sender: 'me',
    },
    {
      text: 'Hello! there Hello! there Hello! there Hello! there',
      dateTime: '06:36 PM',
      sender: 'other',
    },
    { text: 'Hello!', dateTime: '06:37 PM', sender: 'other' },
    { text: 'Hello!', dateTime: '06:38 PM', sender: 'other' },
    { text: 'Hello!', dateTime: '06:39 PM', sender: 'me' },
    { text: 'Hello!', dateTime: '06:34 PM', sender: 'other' },
    { text: 'Hello!', dateTime: '06:34 PM', sender: 'me' },
    { text: 'Hello!', dateTime: '06:34 PM', sender: 'other' },
    { text: 'Hello!', dateTime: '06:34 PM', sender: 'other' },
    { text: 'Hello!', dateTime: '06:34 PM', sender: 'me' },
    { text: 'Hello!', dateTime: '06:34 PM', sender: 'other' },
    { text: 'Hello!', dateTime: '06:34 PM', sender: 'other' },
    { text: 'Hello!', dateTime: '06:34 PM', sender: 'other' },
    { text: 'Hello!', dateTime: '06:45 PM', sender: 'other' },
  ]);

  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const [messages, setMessages] = useState<message | any>([]);
  const [data, setData] = useState<[]>([])

  const keyboardDidHide = () => {
    Keyboard.dismiss();
  };

  const getChatHandle = async () => {
    try {
      const res = await getChat(params?.orderId)
      console.log(res, "chat messagessssssssssssssssss")

      setMessages(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);


  useEffect(() => {
    getChatHandle()
  }, [])

  useEffect(() => {
    socketManager.initializeSocket()
    if (token) {
      socketManager.emit("joinRoom", { token: token, jobId: params?.orderId })
    }
  }, [])

  useEffect(() => {
    socketManager.on("message", (data: any) => {
      setMessages((prevMessages: any) => [data,...prevMessages]);
    })
  },[])

  console.log(params?.orderId,"in chat group page")

  return (
    <View style={styles.container}>
      <LogoBackground />
      <FlatList
        style={styles.chatArea}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }: any) =>
          item?.sender?.id === userId ? (
            <OutgoingMessage message={item} />
          ) : (
            <ReceivedMessage message={item} />
          )
        }
        inverted
      />
      <ChatInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatArea: {
    flex: 1,
  },
});

export default ChatComponent;
