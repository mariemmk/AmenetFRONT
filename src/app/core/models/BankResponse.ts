export interface BankResponse {
    responseCode: string;
    responseMessage: string;
    accountInfo: AccountInfo | null;
  }
  export interface AccountInfo {
    accountName: string;
    accountBalance: number;
    accountNumber: string;
    RIB: string;
    cin: string;
  }