import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { Lottery } from '../types';

interface LotteryCardProps {
  lottery: Lottery;
  selected?: boolean;
  registered?: boolean;
  onSelect?: () => void;
}

export function LotteryCard({
  lottery,
  selected = false,
  registered = false,
  onSelect,
}: LotteryCardProps) {
  const isDisabled = registered;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        registered && styles.cardRegistered,
        !isDisabled && pressed && styles.cardPressed,
      ]}
      onPress={isDisabled ? undefined : onSelect}
      disabled={isDisabled}
    >
      <Text style={[styles.title, registered && styles.textMuted]}>
        {lottery.name}
      </Text>
      <Text style={[styles.prize, registered && styles.textMuted]}>
        Prize: {lottery.prize}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '100%',
    minHeight: 100,
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    borderColor: '#6200ee',
  },
  cardRegistered: {
    backgroundColor: '#e0e0e0',
    borderColor: '#bdbdbd',
    opacity: 1,
  },
  cardPressed: {
    opacity: 0.9,
  },
  title: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
  },
  prize: {
    color: '#666',
    marginTop: 8,
    fontSize: 14,
  },
  textMuted: {
    color: '#757575',
  },
});
