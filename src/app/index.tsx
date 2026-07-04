import { router } from 'expo-router';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Contact, getAvatarColor, getContactSections, getInitials } from '@/data/contacts';

const C = {
  bg:        '#000000',
  text:      '#FFFFFF',
  secondary: '#8E8E93',
  separator: 'rgba(84, 84, 88, 0.65)',
} as const;

const SECTIONS = getContactSections();

function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: getAvatarColor(name) },
      ]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.38 }]}>{getInitials(name)}</Text>
    </View>
  );
}

function ContactRow({ contact }: { contact: Contact }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={() => router.push(`/contact/${contact.id}`)}>
      <Avatar name={contact.name} />
      <View style={styles.rowBody}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
    </Pressable>
  );
}

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SectionList
      style={styles.list}
      contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      sections={SECTIONS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ContactRow contact={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLetter}>{title}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      stickySectionHeadersEnabled
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: C.bg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: C.bg,
    gap: 12,
  },
  rowPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  rowBody: {
    flex: 1,
  },
  name: {
    color: C.text,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  phone: {
    color: C.secondary,
    fontSize: 14,
    marginTop: 2,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: C.separator,
    marginLeft: 68,
  },
  sectionHeader: {
    backgroundColor: C.bg,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 4,
  },
  sectionLetter: {
    color: C.secondary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
});
