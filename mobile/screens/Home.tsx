import { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigationTypes';
import AddLotteryFab from '../components/AddLotteryFab';
import LotteryList from '../components/LotteryList';
import useLotteries from '../hooks/useLotteries';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lotteries, loading, refreshLotteries } = useLotteries();

  useFocusEffect(
    useCallback(() => {
      refreshLotteries();
    }, [refreshLotteries])
  );

  return (
    <View style={{ flex: 1 }}>
      <LotteryList
        lotteries={lotteries}
        loading={loading}
        onRefresh={refreshLotteries}
        refreshing={loading}
      />
      <AddLotteryFab onPress={() => navigation.navigate('AddLottery')} />
    </View>
  );
}
