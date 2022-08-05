<script setup lang="ts">
import { ref } from "vue";
import Accounts from "@/components/Accounts.vue";
import Expenses from "@/components/Expenses.vue";
</script>

<template>
  <nav>
    <h1>Expense Tracker</h1>
  </nav>

  <div class="container">
    <Accounts />
    <hr style="margin: 1rem 0" />
    <Expenses />
  </div>
</template>

<style scoped></style>
