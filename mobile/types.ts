export type Status = 'running' | 'finished';

export interface Lottery {
  id: string;
  name: string;
  prize: string;
  type: string;
  status: Status;
}

export interface LotteryCreateRequest {
  name: string;
  prize: string;
  type: 'simple';
}
