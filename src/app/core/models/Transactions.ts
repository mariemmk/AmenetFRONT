
export interface Transaction {
  transactionId: number;
    accountNumber: string;
    typeTransaction: string;
    devise: string;
    amount: number;
    status: string;
    createdAt: Date;
    modifiedAt: Date;
  }