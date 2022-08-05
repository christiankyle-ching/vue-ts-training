import { reactive } from "vue";
import { TransactionType, type Account, type Transaction } from "@/models";

interface AppState {
    accounts: Account[],
    transactions: { [key: string]: Transaction[] }

    // Methods
    getTransactionByDate: (date: Date) => Transaction[],
    addTransaction: (tx: Transaction, date: Date) => void,
}

const store = reactive<AppState>({
    accounts: [],
    transactions: {},

    getTransactionByDate(date: Date): Transaction[] {
        const key = _getTxDateKey(date)

        if (!(key in this.transactions)) {
            this.transactions[key] = []
        }

        return this.transactions[key]
    },

    addTransaction(tx: Transaction, date: Date): void {
        const typeMultiplier = tx.type == TransactionType.INCOME ? 1 : -1;
        const account = tx.account

        if (account) {
            const amountAfter = account.balance + (tx.amount * typeMultiplier)

            this.getTransactionByDate(date).push({
                ...tx,
                id: Math.random(),
                timestamp: new Date(),
                account: account,
                amountBefore: account.balance,
                amountAfter: amountAfter
            })

            account.balance = amountAfter
        }
    },

})

function _getTxDateKey(date: Date): string {
    return `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`
}

export default store;
