import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { LotteryCard } from './LotteryCard';
import type { Lottery } from '../types';

interface LotteryListProps {
  lotteries: Lottery[];
  loading?: boolean;
  selectedIds?: string[] | null;
  registeredIds?: string[];
  onSelect?: (id: string) => void;
  onRegisterPress?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const HEADER_FULL_HEIGHT = 120;
const SCROLL_RANGE = 120;

export default function LotteryList({
  lotteries,
  loading = false,
  selectedIds = null,
  registeredIds = [],
  onSelect,
  onRegisterPress,
  onRefresh,
  refreshing = false,
}: LotteryListProps) {
  const [filter, setFilter] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const hasSelection = (selectedIds?.length ?? 0) > 0;
  const isRegisterDisabled = !hasSelection;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_RANGE],
    outputRange: [HEADER_FULL_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_RANGE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, SCROLL_RANGE],
    outputRange: [1, 0.75],
    extrapolate: 'clamp',
  });

  const onListScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const filteredLotteries = lotteries.filter(
    (lottery) =>
      lottery.name.toLowerCase().includes(filter.toLowerCase()) ||
      lottery.prize.toLowerCase().includes(filter.toLowerCase())
  );

  function renderItem({ item }: { item: Lottery }) {
    const isRegistered = registeredIds?.includes(item.id);
    return (
      <View style={styles.cardWrapper}>
        <LotteryCard
          lottery={item}
          selected={selectedIds?.includes(item.id)}
          registered={isRegistered}
          onSelect={onSelect ? () => onSelect(item.id) : undefined}
        />
      </View>
    );
  }

  const isInitialLoad = loading && lotteries.length === 0;

  if (isInitialLoad) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading lotteries...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.registerRow}>
        <Pressable
          style={({ pressed }) => [
            styles.registerButton,
            isRegisterDisabled && styles.registerButtonDisabled,
            !isRegisterDisabled && pressed && styles.registerButtonPressed,
          ]}
          onPress={onRegisterPress}
          disabled={isRegisterDisabled}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>
      </View>
      <Animated.View style={[styles.headerCollapse, { height: headerHeight }]}>
        <Animated.View
          style={[
            styles.headerInner,
            {
              opacity: headerOpacity,
              transform: [{ scale: headerScale }],
            },
          ]}
        >
          <View style={styles.titleRow}>
            <Text style={styles.heading}>Lotteries 🎲</Text>
          </View>
          <View style={styles.filterWrapper}>
            <TextInput
              style={styles.filterInput}
              value={filter}
              onChangeText={setFilter}
              placeholder="Filter lotteries"
              placeholderTextColor="#999"
            />
            <View style={styles.filterIconWrap}>
              <Text style={styles.filterIcon}>⌕</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>

      {filteredLotteries.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            {filter
              ? `No search results for "${filter}"`
              : 'No lotteries yet. Add one to get started.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredLotteries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onScroll={onListScroll}
          scrollEventThrottle={16}
          onRefresh={onRefresh}
          refreshing={refreshing ?? loading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  registerButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  registerButtonDisabled: {
    backgroundColor: '#b0b0b0',
    opacity: 0.8,
  },
  registerButtonPressed: {
    opacity: 0.8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  headerCollapse: {
    overflow: 'hidden',
  },
  headerInner: {
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {
    color: '#6200ee',
    fontWeight: '700',
    fontSize: 20,
  },
  filterWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  filterInput: {
    borderWidth: 2,
    borderColor: '#6200ee',
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 40,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  filterIconWrap: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingRight: 12,
  },
  filterIcon: {
    fontSize: 30,
    color: '#6200ee',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 100,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
});
