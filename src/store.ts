import { reactive } from "vue";
import { TransactionType, type Account, type Transaction } from "@/models";

// interface AppState {
//     accounts: Account[],
//     addAccount(account: Account): void,
//     editAccount(account: Account): void,
//     deleteAccount(account: Account): void,
//
//     // Transactions
//     transactions: { [key: string]: Transaction[] }
//     getTransactionByDate: (date: Date) => Transaction[],
//     addTransaction: (tx: Transaction, date: Date) => void,
// }

const store = reactive({
  // Accounts
  accounts: [] as Account[],
  addAccount(account: Account): void {
    this.accounts.push({
      id: Math.random(),
      ...account,
    });
  },
  editAccount(newAccount: Account): void {
    const idx = this.accounts.findIndex((a: Account) => a.id === newAccount.id);
    this.accounts[idx] = newAccount;
  },
  deleteAccount(account: Account): void {
    const idx = this.accounts.findIndex((a: Account) => a.id === account.id);
    if (idx >= 0) {
      this.accounts.splice(idx, 1);
    } else {
      throw "";
    }
  },

  // Transactions
  transactions: {} as { [key: string]: Transaction[] },
  getTransactionByDate(date: Date): Transaction[] {
    const key = _getTxDateKey(date);

    if (!(key in this.transactions)) {
      this.transactions[key] = [];
    }

    return this.transactions[key];
  },
  addTransaction(tx: Transaction, date: Date): void {
    const typeMultiplier = tx.type == TransactionType.INCOME ? 1 : -1;
    const account = tx.account;

    if (account) {
      const amountAfter = account.balance + tx.amount * typeMultiplier;

      this.getTransactionByDate(date).push({
        ...tx,
        id: Math.random(),
        timestamp: new Date(),
        account: account,
        amountBefore: account.balance,
        amountAfter: amountAfter,
      });

      account.balance = amountAfter;
    }
  },
});

function _getTxDateKey(date: Date): string {
  return `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
}

export default store;
