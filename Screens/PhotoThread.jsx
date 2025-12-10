import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../color/style';

const PhotoThread = ({ route }) => {
  const { thread } = route.params || {};
  const [messages, setMessages] = useState(thread?.history || []);
  const [input, setInput] = useState('');
  const partnerImage = thread?.partnerImage;

  const addMessage = (text, from = 'you') => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: `${from}-${Date.now()}`, from, text: text.trim() }]);
    setInput('');
  };

  const addPhoto = () => {
    const photoMessage = {
      id: `photo-${Date.now()}`,
      from: 'you',
      photo: partnerImage,
      caption: input.trim() || 'Shared a photo',
    };
    setMessages((prev) => [...prev, photoMessage]);
    setInput('');
  };

  const threadTitle = useMemo(() => thread?.signName || 'Photos', [thread]);

  const renderItem = ({ item }) => {
    const bubbleTextStyle =
      item.from === 'you' ? styles.bubbleTextRight : styles.bubbleTextLeft;
    if (item.photo) {
      return (
        <View style={[styles.bubble, item.from === 'you' ? styles.bubbleRight : styles.bubbleLeft]}>
          {item.photo ? (
            <Image source={item.photo} style={styles.photo} />
          ) : null}
          <Text style={bubbleTextStyle}>{item.caption || 'Photo shared'}</Text>
        </View>
      );
    }
    return (
      <View style={[styles.bubble, item.from === 'you' ? styles.bubbleRight : styles.bubbleLeft]}>
        <Text style={bubbleTextStyle}>{item.text}</Text>
      </View>
    );
  };

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
        <TouchableOpacity style={styles.quick} onPress={() => addMessage('Here are a few shots I love.')}>
          <Text style={styles.quickText}>Send note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.quick, styles.quickPrimary]} onPress={addPhoto}>
          <Icon name="image" type="feather" color="#fff" size={16} />
          <Text style={[styles.quickText, { color: '#fff', marginLeft: 6 }]}>Send photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a caption..."
          placeholderTextColor={theme.textStyles.subtitle.color}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={addPhoto}>
          <Icon name="upload" type="feather" color="#fff" size={18} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PhotoThread;

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
    maxWidth: '82%',
    padding: 12,
    borderRadius: 16,
    gap: 8,
  },
  bubbleLeft: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.cardBackground,
  },
  bubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
  },
  bubbleTextLeft: {
    ...theme.textStyles.body,
    color: theme.colors.text,
  },
  bubbleTextRight: {
    ...theme.textStyles.body,
    color: '#fff',
  },
  photo: {
    width: 220,
    height: 160,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.medium,
    gap: 10,
    marginBottom: 8,
  },
  quick: {
    backgroundColor: theme.colors.overlay,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickPrimary: {
    backgroundColor: theme.colors.secondary,
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
