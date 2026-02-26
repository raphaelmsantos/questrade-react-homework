import AsyncStorage from '@react-native-async-storage/async-storage';

const REGISTRATIONS_KEY = 'lottery_registrations';

export interface LotteryRegistration {
  lotteryId: string;
  userName: string;
}

export async function getRegistrations(): Promise<LotteryRegistration[]> {
  try {
    const raw = await AsyncStorage.getItem(REGISTRATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LotteryRegistration[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addRegistrations(
  items: LotteryRegistration[]
): Promise<void> {
  const existing = await getRegistrations();
  const combined = [...existing, ...items];
  await AsyncStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(combined));
}

export function getRegisteredLotteryIds(registrations: LotteryRegistration[]): string[] {
  return registrations.map((r) => r.lotteryId);
}
