<script setup lang="ts">
defineProps({
  isDarkMode: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['toggle']);

const toggleTheme = () => {
  emit('toggle');
};
</script>

<template>
  <button @click="toggleTheme" class="theme-toggle" :aria-label="isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'">
    <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.theme-toggle {
  background-color: var(--bg-secondary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--neutral-200);
  box-shadow: var(--shadow-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
  }
  
  svg {
    transition: transform var(--transition-normal);
  }
  
  &:hover svg {
    transform: rotate(30deg);
  }
}
</style>