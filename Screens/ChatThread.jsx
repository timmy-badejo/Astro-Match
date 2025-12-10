import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../color/style';

const QUICK_REPLIES = [
  'That sounds great!',
  'Tell me more about your week.',
  'Let’s plan something this weekend.',
  'I love that energy.',
];

const ChatThread = ({ route }) => {
  const { thread } = route.params || {};
  const [messages, setMessages] = useState(thread?.history || []);
  const [input, setInput] = useState('');

  const addMessage = (text, from = 'you') => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: `${from}-${Date.now()}`, from, text: text.trim() }]);
    setInput('');
  };

  const handleSend = () => addMessage(input);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.from === 'you' ? styles.bubbleRight : styles.bubbleLeft,
      ]}
    >
      <Text style={styles.bubbleText}>{item.text}</Text>
    </View>
  );

  const threadTitle = useMemo(() => thread?.signName || 'Chat', [thread]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>{threadTitle}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.quickRow}>
        {QUICK_REPLIES.map((reply) => (
          <TouchableOpacity key={reply} style={styles.quick} onPress={() => addMessage(reply)}>
            <Text style={styles.quickText}>{reply}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={theme.textStyles.subtitle.color}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Icon name="send" type="feather" color="#fff" size={18} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatThread;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderColor,
  },
  headerText: {
    ...theme.textStyles.header,
  },
  listContent: {
    padding: theme.spacing.medium,
    paddingBottom: theme.spacing.large,
    gap: theme.spacing.small,
  },
  bubble: {
    maxWidth: '78%',
    padding: 12,
    borderRadius: 16,
  },
  bubbleLeft: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.cardBackground,
  },
  bubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
  },
  bubbleText: {
    ...theme.textStyles.body,
    color: '#fff',
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.medium,
    gap: 8,
    marginBottom: 8,
  },
  quick: {
    backgroundColor: theme.colors.overlay,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  quickText: {
    ...theme.textStyles.subtitle,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderColor,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.small,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: theme.colors.text,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: theme.borderRadius.small,
  },
});
