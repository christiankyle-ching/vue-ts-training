import { reactive, watchEffect } from "vue";
import { TransactionType, type Account, type Transaction } from "@/models";

interface AppState {
  accounts: Account[];

  // Transactions
  transactions: { [key: string]: Transaction[] };
}

const DEFAULT_STATE: AppState = {
  // Accounts
  accounts: [] as Account[],

  // Transactions
  transactions: {} as { [key: string]: Transaction[] },
};

const STATE = JSON.parse(
  localStorage.getItem("APP_STATE") ?? JSON.stringify(DEFAULT_STATE)
);

const STATE_WITH_OPS = {
  ...(STATE as AppState),
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
};

console.log(JSON.stringify(STATE_WITH_OPS));

const store = reactive(STATE_WITH_OPS);

watchEffect(() => {
  localStorage.setItem("APP_STATE", JSON.stringify(store));
});

function _getTxDateKey(date: Date): string {
  return `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
}

export default store;
