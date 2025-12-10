import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, Avatar, SearchBar, Icon } from 'react-native-elements';
import theme from '../color/style';
import MessageThreadItem from '../components/MessageThreadItem';

const MessagesScreen = ({ route, navigation }) => {
  const baseThreads = useMemo(
    () => [
      {
        id: '1',
        signName: route?.params?.signName || 'Leo',
        lastMessage: 'Hey, how are you feeling about this week’s energy?',
        history: [
          { id: 'm1', from: 'them', text: 'Hey! Feeling optimistic this week.' },
          { id: 'm2', from: 'you', text: 'Love that. Want to grab coffee Friday?' },
          { id: 'm3', from: 'them', text: 'Yes! Friday works.' },
        ],
      },
      {
        id: '2',
        signName: 'Aquarius',
        lastMessage: 'We should plan something spontaneous soon 🌌',
        history: [
          { id: 'm4', from: 'them', text: 'Let’s catch a meteor shower this weekend.' },
          { id: 'm5', from: 'you', text: 'I’m in. Saturday night?' },
        ],
      },
      {
        id: '3',
        signName: 'Pisces',
        lastMessage: 'Remember to take time for yourself today.',
        history: [
          { id: 'm6', from: 'them', text: 'How’s your week going?' },
          { id: 'm7', from: 'you', text: 'Busy but excited to chat later!' },
        ],
      },
    ],
    [route?.params?.signName],
  );

  const [search, setSearch] = useState('');
  const filtered = baseThreads.filter((t) =>
    t.signName.toLowerCase().includes(search.toLowerCase())
  );

  const openThread = (thread) => {
    navigation.navigate('ChatThread', { thread });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search messages..."
        onChangeText={setSearch}
        value={search}
        platform="default"
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInput}
        inputStyle={{ color: theme.colors.text }}
        placeholderTextColor={theme.textStyles.subtitle.color}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            containerStyle={styles.listItem}
            onPress={() => openThread(item)}
          >
            <Avatar
              rounded
              title={item.signName.charAt(0)}
              containerStyle={styles.avatar}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{item.signName}</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                {item.lastMessage}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Icon name="chevron-right" type="feather" color={theme.colors.highlight} />
          </ListItem>
        )}
        contentContainerStyle={{ paddingBottom: theme.spacing.large }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    paddingHorizontal: theme.spacing.medium,
  },
  searchInput: {
    backgroundColor: theme.colors.cardBackground,
  },
  listItem: {
    backgroundColor: theme.colors.cardBackground,
    borderColor: theme.colors.borderColor,
    borderWidth: 1,
    marginHorizontal: theme.spacing.medium,
    marginBottom: 8,
    borderRadius: theme.borderRadius.medium,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  title: {
    ...theme.textStyles.body,
    fontWeight: 'bold',
  },
  subtitle: {
    ...theme.textStyles.subtitle,
  },
});

export default MessagesScreen;
