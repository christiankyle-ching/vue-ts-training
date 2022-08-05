<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
  },
});

const emit = defineEmits(["close", "enter"]);
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="modal" v-if="show" @keyup.esc="$emit('close')">
        <div class="modal-background"></div>
        <div class="modal-container">
          <header class="modal-header">
            <slot name="header"></slot>
            <button @click="$emit('close')" class="button">❌</button>
          </header>
          <main class="modal-content">
            <slot></slot>
          </main>
          <footer class="modal-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.modal .modal-background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
}

.modal .modal-container {
  margin: auto;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--color-background-mute);
}

.modal-container .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-container .modal-content {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
