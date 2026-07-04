import { router, Stack, useLocalSearchParams } from 'expo-router';
import type { ReactNode } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';
import Svg, { Path } from 'react-native-svg';

import { getAvatarColor, getContactById, getInitials } from '@/data/contacts';

const C = {
  bg:        '#000000',
  surface:   '#1C1C1E',
  text:      '#FFFFFF',
  secondary: '#8E8E93',
  separator: 'rgba(84, 84, 88, 0.65)',
  accent:    '#0A84FF',
} as const;

function PhoneIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      />
    </Svg>
  );
}

function EnvelopeIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
      />
    </Svg>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <View
      style={[
        styles.avatar,
        { backgroundColor: getAvatarColor(name) },
      ]}>
      <Text style={styles.avatarText}>{getInitials(name)}</Text>
    </View>
  );
}

function BackButton() {
  return (
    <Pressable
      onPress={() => router.back()}
      style={styles.backBtn}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 20 }}
      accessibilityRole="button"
      accessibilityLabel="返回聯絡人清單">
      <SymbolView name={'chevron.left' as any} size={20} tintColor={C.accent} />
      <Text style={styles.backBtnText}>聯絡人</Text>
    </Pressable>
  );
}

function ActionRow({
  icon,
  label,
  value,
  onPress,
  isLast,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  onPress: () => void;
  isLast?: boolean;
}) {
  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.actionRow, pressed && styles.actionRowPressed]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value}`}>
        <View style={styles.actionIconWrap}>{icon}</View>
        <View style={styles.actionBody}>
          <Text style={styles.actionLabel}>{label}</Text>
          <Text style={styles.actionValue} numberOfLines={1}>{value}</Text>
        </View>
        <SymbolView name={'chevron.right' as any} size={13} tintColor={C.secondary} />
      </Pressable>
      {!isLast && <View style={styles.actionSeparator} />}
    </>
  );
}

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contact = getContactById(id);
  const insets = useSafeAreaInsets();

  if (!contact) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>找不到聯絡人</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: contact.name, headerLeft: () => <BackButton /> }} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}>
        <View style={styles.hero}>
          <Avatar name={contact.name} />
          <Text style={styles.heroName}>{contact.name}</Text>
        </View>

        <View style={styles.card}>
          <ActionRow
            icon={<PhoneIcon size={17} color={C.accent} />}
            label="電話"
            value={contact.phone}
            onPress={() => Linking.openURL(`tel:${contact.phone.replace(/\s/g, '')}`)}
          />
          <ActionRow
            icon={<EnvelopeIcon size={17} color={C.accent} />}
            label="電子郵件"
            value={contact.email}
            onPress={() => Linking.openURL(`mailto:${contact.email}`)}
            isLast
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    paddingTop: 36,
    paddingHorizontal: 16,
    gap: 36,
  },
  hero: {
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  heroName: {
    color: C.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: C.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  actionRowPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  actionIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 132, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBody: {
    flex: 1,
  },
  actionLabel: {
    color: C.secondary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.4,
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  actionValue: {
    color: C.text,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  actionSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: C.separator,
    marginLeft: 64,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backBtnText: {
    color: C.accent,
    fontSize: 17,
  },
  notFound: {
    flex: 1,
    backgroundColor: C.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: C.secondary,
    fontSize: 16,
  },
});
