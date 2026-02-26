import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigationTypes';
import AddLotteryFab from '../components/AddLotteryFab';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1 }}>
      <Text>Home</Text>
      <AddLotteryFab onPress={() => navigation.navigate('AddLottery')} />
    </View>
  );
}