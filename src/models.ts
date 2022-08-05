export enum AccountType {
    DEBIT = 'DEBIT', CREDIT = 'CREDIT'
}

export enum TransactionType {
    INCOME, EXPENSE
}

export interface Account {
    readonly id?: number,
    label: string,
    type: AccountType,
    balance: number,
}

export interface Transaction {
    readonly id?: number,
    timestamp?: Date,
    label: string,
    type: TransactionType,
    amount: number,
    account?: Account,
    amountBefore?: number,
    amountAfter?: number,
}

export interface AppState {
    accounts: Account[];
    transactions: { [key: string]: Transaction };
};