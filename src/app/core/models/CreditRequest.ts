import { Client } from "./Client";

export interface Credit {
     status: string;
     id: number;
     loanType: string;
     amount: number;
     duration: number;
     interestRate: number;
     monthlyPayment: number;
     requestDate: string;
     user: Client | null;
     amortizationSchedule: any[];
     carPrise?:number;
     horsePower?:number;
   }
   