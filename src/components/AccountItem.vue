<script setup lang="ts">
import { defineProps, type PropType } from "vue";
import type { Account } from "@/models.js";

const props = defineProps({
  account: {
    type: Object as PropType<Account>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "edit", account: Account): void;
  (e: "delete", account: Account): void;
}>();
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div>
        <h3>
          {{ account.label }}
        </h3>
        <!-- <small>{{ account.type }}</small> -->
      </div>

      <div>
        <button @click="$emit('edit', account)" class="button">✏</button>
        <button @click="$emit('delete', account)" class="button">🗑</button>
      </div>
    </div>
    <div class="card-content">
      <span> PHP {{ account.balance.toLocaleString() }} </span>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid lightblue;
  background-color: cadetblue;
  color: whitesmoke;
}

.card-header {
  display: flex;
  justify-content: space-between;
}
</style>
