import { BankAccount } from "./BankAccount";

export interface Transaction {
  transactionId: number;
    bankAccount: BankAccount;
    typeTransaction: string;
    devise: string;
    amount: number;
    status: string;
    createdAt: Date;
    modifiedAt: Date;
  }