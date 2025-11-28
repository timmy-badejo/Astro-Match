import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import MessageThreadItem from '../components/MessageThreadItem';
import theme from '../color/style';

const MessagesScreen = ({ route }) => {
  const [threads] = useState([
    {
      id: '1',
      signName: route?.params?.signName || 'Leo',
      lastMessage: 'Hey, how are you feeling about this week’s energy?',
    },
    {
      id: '2',
      signName: 'Aquarius',
      lastMessage: 'We should plan something spontaneous soon 🌌',
    },
  ]);

  const [search, setSearch] = useState('');
  const filtered = threads.filter((t) =>
    t.signName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search messages..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageThreadItem
            signName={item.signName}
            lastMessage={item.lastMessage}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={{ paddingBottom: theme.spacing.large }}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  search: {
    margin: theme.spacing.medium,
    padding: 10,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.cardBackground,
    color: theme.colors.text,
  },
});
