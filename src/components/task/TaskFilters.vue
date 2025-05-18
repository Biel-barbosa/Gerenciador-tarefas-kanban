<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTaskStore, type TaskPriority, type TaskStatus } from '../../stores/tasks';

const taskStore = useTaskStore();

// Estado local para os filtros
const searchQuery = ref(taskStore.searchQuery);
const statusFilter = ref(taskStore.statusFilter);
const priorityFilter = ref(taskStore.priorityFilter);

// Detecta mudanças nos filtros locais e atualiza a store
watch(searchQuery, (newValue) => {
  taskStore.setSearchQuery(newValue);
});

watch(statusFilter, (newValue) => {
  taskStore.setStatusFilter(newValue);
});

watch(priorityFilter, (newValue) => {
  taskStore.setPriorityFilter(newValue);
});

// Limpa todos os filtros
const clearAllFilters = () => {
  searchQuery.value = '';
  statusFilter.value = 'todas';
  priorityFilter.value = 'todas';
  taskStore.clearFilters();
};

// Tradução de status para exibição
const statusOptions = [
  { value: 'todas', label: 'Todas' },
  { value: 'a-fazer', label: 'A Fazer' },
  { value: 'em-andamento', label: 'Em Andamento' },
  { value: 'concluido', label: 'Concluído' }
];

// Tradução de prioridade para exibição
const priorityOptions = [
  { value: 'todas', label: 'Todas' },
  { value: 'baixa', label: 'Baixa' },
  { value: 'média', label: 'Média' },
  { value: 'alta', label: 'Alta' }
];
</script>

<template>
  <div class="filters-container card">
    <div class="filters-header">
      <h3>Filtros</h3>
      <button 
        @click="clearAllFilters" 
        class="btn btn-text"
        :disabled="!searchQuery && statusFilter === 'todas' && priorityFilter === 'todas'"
      >
        Limpar Filtros
      </button>
    </div>
    
    <div class="filters-body">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Pesquisar tarefas..." 
          class="w-full"
        />
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      
      <div class="filters-row">
        <div class="filter-group">
          <label for="status-filter">Status</label>
          <select id="status-filter" v-model="statusFilter">
            <option 
              v-for="option in statusOptions" 
              :key="option.value" 
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="priority-filter">Prioridade</label>
          <select id="priority-filter" v-model="priorityFilter">
            <option 
              v-for="option in priorityOptions" 
              :key="option.value" 
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters-container {
  margin-bottom: 1.5rem;
  
  .filters-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      margin: 0;
      font-size: 1.25rem;
    }
  }
  
  .filters-body {
    .search-box {
      position: relative;
      margin-bottom: 1rem;
      
      input {
        padding-left: 2.5rem;
      }
      
      .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-tertiary);
      }
    }
    
    .filters-row {
      display: flex;
      gap: 1rem;
      
      @media (max-width: 576px) {
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .filter-group {
        flex: 1;
        
        label {
          display: block;
          margin-bottom: 0.25rem;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
        
        select {
          width: 100%;
        }
      }
    }
  }
}
</style>