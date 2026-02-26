import type { Lottery, LotteryCreateRequest } from '../types';

const API_URL =
  (typeof process !== 'undefined' &&
    process.env?.EXPO_PUBLIC_API_URL) ||
  'http://localhost:3000';

export async function createLottery(
  data: LotteryCreateRequest
): Promise<Lottery> {
  const response = await fetch(`${API_URL}/lotteries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getAllLotteries(): Promise<Lottery[]> {
  const response = await fetch(`${API_URL}/lotteries`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
