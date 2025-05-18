<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'medium'
  },
  color: {
    type: String,
    default: 'primary'
  }
});
</script>

<template>
  <div class="loading-container">
    <div class="spinner" :class="[size, color]"></div>
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.spinner {
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  &.small {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
  }
  
  &.medium {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(0, 0, 0, 0.1);
  }
  
  &.large {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(0, 0, 0, 0.1);
  }
  
  &.primary {
    border-top-color: var(--primary);
  }
  
  &.secondary {
    border-top-color: var(--secondary);
  }
  
  &.warning {
    border-top-color: var(--warning);
  }
  
  &.error {
    border-top-color: var(--error);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>