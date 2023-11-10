import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { SendIcon } from 'lucide-react-native';

import { Colors } from '../../../styles/custom';
import socketManager from '../../../lib/socketManager';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppContext } from '../../../store/AppContext';
import { getChat } from '../../../api-clients/apiServices';

// socket.emit("joinRoom",{token:token,jobId:1})
interface Params {
  orderId: string;
  orderName: string;
  completed?: boolean;
  accepted?: boolean;
  cancelled?: boolean;
}




const ChatInput = () => {

  type message = {
    createdAt: string,
    message: string,
    sender: {
      name: string,
      id: number,
    }

  }

  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const [messages, setMessages] = useState<message | []>([]);
  const [inputText, setInputText] = useState('');

  const { state } = useAppContext();
  const { token } = state;



  const handleSend = async () => {
    if (inputText.trim() !== '') {
      socketManager.emit("chatMessage", { token: token, jobId: params?.orderId, message: inputText })
      setInputText('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        multiline
        style={styles.input}
        placeholderTextColor={Colors.Brown}
        placeholder="Type a message..."
        value={inputText}
        onChangeText={text => setInputText(text)}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.sendButton}
        onPress={handleSend}>
        <SendIcon
          size={19}
          color="#fff"
          style={{ alignSelf: 'center', marginRight: 2 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.Brown,
    marginHorizontal: 15,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 11,
  },
  sendButton: {
    backgroundColor: Colors.Brown,
    borderRadius: 100,
    width: 30,
    height: 30,
    justifyContent: 'center',
    marginRight: 14,
    transform: [{ rotate: '40deg' }],
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatInput;
