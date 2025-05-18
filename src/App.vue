<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import LoadingSpinner from './components/common/LoadingSpinner.vue';

const loading = ref(true);
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  authStore.initAuth();
  loading.value = false;
});
</script>

<template>
  <div class="app-container">
    <LoadingSpinner v-if="loading" />
    
    <template v-else>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-normal);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>