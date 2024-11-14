// screens/MessageScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';


const MessageScreen = ({ route }) => {
  const { userId } = route.params;
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.100.232:3000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleSendMessage = async () => {
    if (!recipientId || !message) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.232:3000/api/messages', {
        msgId: `msg-${Date.now()}`,
        message,
        senderId: userId,
        recipientId,
      });

      if (response.data) {
        Alert.alert('Success', 'Message sent');
        setMessage('');
        setRecipientId('');
      } else {
        Alert.alert('Error', 'Failed to send message');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Select Recipient</Text>
      <Picker
        selectedValue={recipientId}
        onValueChange={(itemValue) => setRecipientId(itemValue)}
        style={{ height: 50, width: 200 }}
      >
        {users.map((user) => (
          <Picker.Item key={user._id} label={user.username} value={user._id} />
        ))}
      </Picker>

      <Text>Message</Text>
      <TextInput
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Send Message" onPress={handleSendMessage} />
    </View>
  );
};

export default MessageScreen;
