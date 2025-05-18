<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '../stores/tasks';
import { useAuthStore } from '../stores/auth';
import TaskForm from '../components/task/TaskForm.vue';
import TaskFilters from '../components/task/TaskFilters.vue';
import TaskColumn from '../components/task/TaskColumn.vue';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';

const taskStore = useTaskStore();
const authStore = useAuthStore();
const router = useRouter();
const loading = ref(true);

onMounted(async () => {
  try {
    await taskStore.fetchTasks();
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
  } finally {
    loading.value = false;
  }
});

const columns = [
  { title: 'A Fazer', status: 'a-fazer' },
  { title: 'Em Andamento', status: 'em-andamento' },
  { title: 'Concluído', status: 'concluido' }
];

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="task-board">
    <header class="board-header">
      <div class="container">
        <div class="header-content">
          <h1>Quadro de Tarefas</h1>
          <div class="user-actions">
            <span class="user-name">{{ authStore.user?.displayName }}</span>
            <button @click="logout" class="btn btn-outline">Sair</button>
          </div>
        </div>
      </div>
    </header>

    <main class="board-content">
      <div class="container">
        <div v-if="loading" class="loading-state">
          <LoadingSpinner size="large" />
        </div>
        
        <template v-else>
          <TaskForm />
          <TaskFilters />
          
          <div class="kanban-wrapper">
            <div class="kanban-board">
              <TaskColumn 
                v-for="column in columns" 
                :key="column.status"
                :title="column.title"
                :status="column.status"
                :tasks="taskStore.tasksByStatus[column.status]"
              />
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.task-board {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.board-header {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--neutral-200);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    h1 {
      font-size: 1.5rem;
      margin: 0;
    }
    
    .user-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .user-name {
        font-weight: 500;
      }
    }
  }
}

.board-content {
  flex: 1;
  padding: 2rem 0;
  
  .loading-state {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  }
}

.kanban-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: auto;
}

.kanban-board {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  padding-bottom: 2rem;
  max-width: fit-content;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>