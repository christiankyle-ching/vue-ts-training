<script setup lang="ts">
import { AccountType, type Account } from "@/models.js";
import Modal from "@/components/Modal.vue";
import AccountItem from "@/components/AccountItem.vue";
import { ref, type Ref } from "vue";
import store from "@/store.js";

enum ModalAction {
  ADD,
  EDIT,
  DELETE,
}

// Opening modals
const onAddAccount = () => {
  selectedAccount.value = {
    balance: 0,
    label: "",
    type: AccountType.DEBIT,
  };
  accountModalAction.value = ModalAction.ADD;
  showAccountModal.value = true;
};
const onEditAccount = (account: Account) => {
  selectedAccount.value = { ...account };
  accountModalAction.value = ModalAction.EDIT;
  showAccountModal.value = true;
};
const onDeleteAccount = (account: Account) => {
  selectedAccount.value = { ...account };
  accountModalAction.value = ModalAction.DELETE;
  showAccountModal.value = true;
};

// When submitted
const onSubmitAccountModal = () => {
  switch (accountModalAction.value) {
    case ModalAction.ADD:
      store.addAccount(selectedAccount.value);
      break;
    case ModalAction.EDIT:
      store.editAccount(selectedAccount.value);
      break;
    case ModalAction.DELETE:
      store.deleteAccount(selectedAccount.value);
      break;
  }

  showAccountModal.value = false;
};

const accountModalAction = ref<ModalAction>(ModalAction.ADD);
const showAccountModal = ref(false);
const selectedAccount: Ref<Account> = ref({
  balance: 0,
  label: "",
  type: AccountType.DEBIT,
});
</script>

<template>
  <div class="accounts">
    <header>
      <h2>Accounts</h2>
      <button class="button" @click="onAddAccount">Add Account +</button>
    </header>
    <main>
      <AccountItem
        v-for="account in store.accounts"
        :account="account"
        @edit="onEditAccount"
        @delete="onDeleteAccount"
      />
      <span v-if="!store.accounts.length">
        No accounts yet.
        <a @click.prevent="onAddAccount" href="">Add one.</a>
      </span>
    </main>
  </div>

  <Modal :show="showAccountModal" @close="showAccountModal = false">
    <template #header>
      <span>
        <span v-if="accountModalAction == ModalAction.ADD">Add </span>
        <span v-else-if="accountModalAction == ModalAction.EDIT">Edit </span>
        <span v-else-if="accountModalAction == ModalAction.DELETE">
          Delete
        </span>
        Account
      </span>
    </template>
    <div>
      <div
        v-if="
          accountModalAction == ModalAction.ADD ||
          accountModalAction == ModalAction.EDIT
        "
      >
        <form @submit.prevent="onSubmitAccountModal">
          <label for="">Type: </label>
          <select v-model="selectedAccount.type">
            <option v-for="type in AccountType" :value="type">
              {{ type }}
            </option>
          </select>

          <label for="">Label: </label>
          <input type="text" v-model="selectedAccount.label" />

          <label for="">
            <span v-if="selectedAccount.type == AccountType.DEBIT">
              Balance
            </span>
            <span v-else-if="selectedAccount.type == AccountType.CREDIT">
              Limit
            </span>
            :
          </label>
          <input
            type="number"
            v-model.number="selectedAccount.balance"
            :readonly="accountModalAction == ModalAction.EDIT"
          />
        </form>
      </div>
      <div v-else-if="accountModalAction == ModalAction.DELETE">
        Delete account {{ selectedAccount.label }}?
      </div>
    </div>
    <template #footer>
      <div style="display: flex">
        <div style="margin-left: auto">
          <button @click="showAccountModal = false" class="button">
            Cancel
          </button>
          <button @click="onSubmitAccountModal" class="button">Submit</button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.accounts > header {
  display: flex;
  justify-content: space-between;
}

.accounts > main {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
</style>
