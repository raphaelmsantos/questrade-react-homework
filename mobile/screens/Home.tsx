import { useCallback, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigationTypes';
import AddLotteryFab from '../components/AddLotteryFab';
import LotteryList from '../components/LotteryList';
import RegisterModal from '../components/RegisterModal';
import useLotteries from '../hooks/useLotteries';
import {
  getRegistrations,
  addRegistrations,
  getRegisteredLotteryIds,
} from '../storage/registrations';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { lotteries, loading, refreshLotteries } = useLotteries();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshLotteries();
    }, [refreshLotteries])
  );

  useEffect(() => {
    getRegistrations().then((regs) => {
      setRegisteredIds(getRegisteredLotteryIds(regs));
    });
  }, []);

  const handleSelect = useCallback((lotteryId: string) => {
    setSelectedIds((ids) => {
      if (ids.includes(lotteryId)) {
        return ids.filter((id) => id !== lotteryId);
      }
      return [...ids, lotteryId];
    });
  }, []);

  const handleRegisterSubmit = useCallback(
    async (userName: string) => {
      const items = selectedIds.map((lotteryId) => ({
        lotteryId,
        userName,
      }));
      await addRegistrations(items);
      setRegisteredIds((prev) => [...prev, ...selectedIds]);
      setSelectedIds([]);
    },
    [selectedIds]
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <LotteryList
        lotteries={lotteries}
        loading={loading}
        selectedIds={selectedIds}
        registeredIds={registeredIds}
        onSelect={handleSelect}
        onRegisterPress={() => setRegisterModalVisible(true)}
        onRefresh={refreshLotteries}
        refreshing={loading}
      />
      <RegisterModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
        onSubmit={handleRegisterSubmit}
      />
      <AddLotteryFab onPress={() => navigation.navigate('AddLottery')} />
    </View>
  );
}
