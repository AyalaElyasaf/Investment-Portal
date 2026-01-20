export interface ActiveInvestment {
  id: string;
  name: string;
  amountInvested: number;
  expectedReturn: number;
  endTime: string;
}

export interface InvestmentHistory {
  name: string;
  invested: number;
  returned: number;
  completedAt: string;
}

export interface UserState {
  userName: string;
  balance: number;
  activeInvestments: ActiveInvestment[];
  history: InvestmentHistory[];
  lastUpdated: string;
}
