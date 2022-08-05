<script setup lang="ts">
import type { Transaction } from "@/models.js";
import { TransactionType } from "@/models.js";
import store from "@/store.js";
import { ref, computed } from "vue";

const date = ref(new Date());

const transactions = computed<Transaction[]>(() => {
  return store.getTransactionByDate(date.value);
});

const currentTx = ref<Transaction>({
  amount: 0,
  label: "",
  type: TransactionType.EXPENSE,
});
const onSaveTransaction = () => {
  store.addTransaction(currentTx.value, new Date());
  currentTx.value = {
    amount: 0,
    label: "",
    type: TransactionType.EXPENSE,
  };
};

const allowSave = computed(() => {
  return (
    !!currentTx.value.account &&
    (currentTx.value.type == TransactionType.EXPENSE
      ? currentTx.value.account.balance > currentTx.value.amount
      : true) &&
    currentTx.value.amount &&
    currentTx.value.label.length
  );
});
</script>

<template>
  <form @submit.prevent="onSaveTransaction">
    <!-- Label -->
    <div>
      <label for="">Label: </label>
      <input type="text" v-model="currentTx.label" required />
    </div>

    <!-- Amount -->
    <div>
      <label for="">Amount: </label>
      <input type="number" v-model="currentTx.amount" min="1" />
    </div>

    <!-- Transaction Type -->
    <div>
      <label for="">Type: </label>
      <select v-model="currentTx.type">
        <option :value="TransactionType.INCOME">In (Income, Deposit)</option>
        <option :value="TransactionType.EXPENSE">
          Out (Expense, Withdraw)
        </option>
      </select>
    </div>

    <!-- Account -->
    <div>
      <label for="">Account: </label>
      <select v-model="currentTx.account" required>
        <option v-for="acc in store.accounts" :value="acc">
          {{ acc.label }} ({{ acc.balance.toLocaleString() }})
        </option>
      </select>
    </div>

    <button
      type="submit"
      class="button"
      :disabled="!allowSave"
      style="grid-column: span 2 / span 2"
    >
      Add Transaction
    </button>
  </form>

  <hr style="margin: 1rem 0" />

  <h2 style="text-align: center">Expenses for {{ date.toDateString() }}</h2>

  <table>
    <thead>
      <tr>
        <th>Time</th>
        <th>Label</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Account</th>
        <th>Balance Before</th>
        <th>Balance After</th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="transactions.length" v-for="tx in transactions">
        <td>{{ tx.timestamp?.toLocaleTimeString() }}</td>
        <td>{{ tx.label }}</td>
        <td>{{ tx.type == TransactionType.INCOME ? "In" : "Out" }}</td>
        <td>PHP {{ tx.amount.toLocaleString() }}</td>
        <td>{{ tx.account.label }}</td>
        <td>PHP {{ tx.amountBefore.toLocaleString() }}</td>
        <td>PHP {{ tx.amountAfter.toLocaleString() }}</td>
      </tr>
      <tr v-else>
        <td
          colspan="99"
          style="text-align: center; width: 100%; padding: 1rem 0"
        >
          No transactions yet.
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin-top: 1rem;
  width: 100%;
  border-collapse: collapse;
}

table td,
table th {
  border: 1px solid var(--color-border);
}
</style>
