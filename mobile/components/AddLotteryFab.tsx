import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

type AddLotteryFabProps = {
  onPress: () => void;
};

export default function AddLotteryFab({ onPress }: AddLotteryFabProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.fab, pressed && { opacity: 0.8 }]}
      onPress={onPress}
    >
      <Text style={styles.fabLabel}>Add Lottery +</Text>
    </Pressable>
  );
}
