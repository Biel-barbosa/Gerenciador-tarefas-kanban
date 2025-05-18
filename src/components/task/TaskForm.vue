<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useTaskStore, type TaskPriority, type TaskStatus } from '../../stores/tasks';

const taskStore = useTaskStore();
const toast = useToast();

// Formulário
const title = ref('');
const description = ref('');
const priority = ref<TaskPriority>('média');
const status = ref<TaskStatus>('a-fazer');
const dueDate = ref('');

// Visibilidade do formulário
const isFormVisible = ref(false);
const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value;
};

// Ação de criar tarefa
const createTask = async () => {
  if (!title.value.trim()) {
    toast.error('O título da tarefa é obrigatório');
    return;
  }
  
  try {
    // Converte data de string para objeto Date se presente
    const dueDateObj = dueDate.value ? new Date(dueDate.value) : null;
    
    await taskStore.addTask({
      title: title.value,
      description: description.value,
      priority: priority.value,
      status: status.value,
      dueDate: dueDateObj
    });
    
    // Limpa o formulário
    resetForm();
    
    // Opcional: fecha o formulário após criação
    isFormVisible.value = false;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
  }
};

// Limpa o formulário
const resetForm = () => {
  title.value = '';
  description.value = '';
  priority.value = 'média';
  status.value = 'a-fazer';
  dueDate.value = '';
};
</script>

<template>
  <div class="task-form-wrapper">
    <button 
      v-if="!isFormVisible" 
      @click="toggleForm" 
      class="btn btn-primary add-task-btn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Adicionar Tarefa
    </button>
    
    <div v-else class="task-form card">
      <div class="form-header">
        <h3>Nova Tarefa</h3>
        <button @click="toggleForm" class="btn-close" aria-label="Fechar formulário">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="form-group">
        <label for="title">Título *</label>
        <input 
          type="text" 
          id="title" 
          v-model="title" 
          class="w-full" 
          placeholder="O que precisa ser feito?"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea 
          id="description" 
          v-model="description" 
          class="w-full" 
          placeholder="Detalhes adicionais"
        ></textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="priority">Prioridade</label>
          <select id="priority" v-model="priority" class="w-full">
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="status" class="w-full">
            <option value="a-fazer">A Fazer</option>
            <option value="em-andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label for="dueDate">Data de Vencimento</label>
        <input 
          type="date" 
          id="dueDate" 
          v-model="dueDate" 
          class="w-full"
        />
      </div>
      
      <div class="form-actions">
        <button @click="resetForm" class="btn btn-text">Limpar</button>
        <button @click="createTask" class="btn btn-primary">Criar Tarefa</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-form-wrapper {
  margin-bottom: 1.5rem;
}

.add-task-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  padding: 0.75rem;
  
  svg {
    transition: transform var(--transition-fast);
  }
  
  &:hover svg {
    transform: rotate(90deg);
  }
}

.task-form {
  animation: fadeIn var(--transition-normal);
  
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      margin: 0;
    }
    
    .btn-close {
      background: none;
      border: none;
      padding: 0.25rem;
      color: var(--text-tertiary);
      cursor: pointer;
      transition: color var(--transition-fast), transform var(--transition-fast);
      
      &:hover {
        color: var(--text-primary);
        transform: rotate(90deg);
      }
    }
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0;
    }
    
    .form-group {
      flex: 1;
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1rem;
  }
}
</style>