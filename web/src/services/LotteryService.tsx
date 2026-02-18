import type { Lottery, LotteryCreateRequest } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export async function createLottery(data: LotteryCreateRequest): Promise<Lottery> {
    try {
        const response = await fetch(`${API_URL}/lotteries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating lottery:', error);
        throw error;
    }
}   

export async function getAllLotteries(): Promise<Lottery[]> {
    try {
        const response = await fetch(`${API_URL}/lotteries`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching lotteries:', error);
        throw error;
    }
}


export async function registerForTheLottery(lotteryId: string, name: string): Promise<{ status: 'Success' }>
{
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lotteryId, name })
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${text}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering for lottery:', error);
        throw error;
    }
}


