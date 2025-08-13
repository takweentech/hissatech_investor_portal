export interface Portfolio {
    totalBalance: number;
    earnedReturns: number;
    expectedReturns: number;
    withdrawableProfits: number;
    growthRate: number;
    referral: string | null;
}