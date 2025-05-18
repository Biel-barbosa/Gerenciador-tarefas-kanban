<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Task } from '../../stores/tasks';
import { useTaskStore } from '../../stores/tasks';

const props = defineProps<{
  task: Task
}>();

const toast = useToast();
const taskStore = useTaskStore();

// Estado local
const isEditing = ref(false);
const editedTask = ref<Task>({ ...props.task });

// Tradução de prioridade
const priorityLabel = {
  'baixa': 'Baixa',
  'média': 'Média',
  'alta': 'Alta'
};

// Classe correspondente à prioridade para estilização
const priorityClass = {
  'baixa': 'low-priority',
  'média': 'medium-priority',
  'alta': 'high-priority'
};

const formatDate = (date: Date | null | undefined) => {
  if (!date) return '';
  return format(date, "dd 'de' MMMM, yyyy", { locale: ptBR });
};

const startEditing = () => {
  editedTask.value = { ...props.task };
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const saveTask = async () => {
  if (!editedTask.value.title.trim()) {
    toast.error('O título da tarefa é obrigatório');
    return;
  }
  
  try {
    await taskStore.updateTask(props.task.id, editedTask.value);
    isEditing.value = false;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
  }
};

const deleteTask = async () => {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    try {
      await taskStore.deleteTask(props.task.id);
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  }
};
</script>

<template>
  <div class="task-card" :class="priorityClass[task.priority]">
    <div v-if="!isEditing">
      <div class="task-header">
        <h3 class="task-title">{{ task.title }}</h3>
        <div class="task-actions">
          <button class="btn-icon" @click="startEditing" aria-label="Editar tarefa">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn-icon" @click="deleteTask" aria-label="Excluir tarefa">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="task-priority-badge" :class="task.priority">
        {{ priorityLabel[task.priority] }}
      </div>
      
      <p v-if="task.description" class="task-description">{{ task.description }}</p>
      
      <p v-if="task.dueDate" class="task-date">
        <span class="due-date-label">Vencimento:</span> {{ formatDate(task.dueDate) }}
      </p>
    </div>
    
    <div v-else class="task-edit-form">
      <div class="form-group">
        <label for="title">Título</label>
        <input 
          type="text" 
          id="title" 
          v-model="editedTask.title" 
          class="w-full" 
          placeholder="Título da tarefa"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea 
          id="description" 
          v-model="editedTask.description" 
          class="w-full" 
          placeholder="Descrição da tarefa"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="priority">Prioridade</label>
        <select id="priority" v-model="editedTask.priority" class="w-full">
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      
      <div class="task-edit-actions">
        <button @click="cancelEditing" class="btn btn-text">Cancelar</button>
        <button @click="saveTask" class="btn btn-primary">Salvar</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-card {
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  cursor: grab;
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  &.high-priority {
    border-left: 4px solid var(--error);
  }
  
  &.medium-priority {
    border-left: 4px solid var(--warning);
  }
  
  &.low-priority {
    border-left: 4px solid var(--secondary);
  }
  
  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
    
    .task-title {
      font-weight: 500;
      font-size: 1rem;
      margin: 0;
      word-break: break-word;
    }
  }
  
  .task-priority-badge {
    display: inline-block;
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: var(--border-radius-sm);
    margin-bottom: 0.5rem;
    
    &.alta {
      background-color: rgba(239, 68, 68, 0.15);
      color: var(--error);
    }
    
    &.média {
      background-color: rgba(245, 158, 11, 0.15);
      color: var(--warning);
    }
    
    &.baixa {
      background-color: rgba(16, 185, 129, 0.15);
      color: var(--secondary);
    }
  }
  
  .task-description {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin: 0.5rem 0;
    word-break: break-word;
  }
  
  .task-date {
    font-size: 0.8rem;
    color: var(--text-tertiary);
    margin-top: 0.5rem;
    
    .due-date-label {
      font-weight: 500;
    }
  }
  
  .task-actions {
    display: flex;
    gap: 0.25rem;
  }
  
  .btn-icon {
    background: none;
    border: none;
    color: var(--text-tertiary);
    padding: 0.25rem;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: color var(--transition-fast), background-color var(--transition-fast);
    
    &:hover {
      color: var(--text-primary);
      background-color: var(--neutral-100);
    }
  }
  
  .task-edit-form {
    .form-group {
      margin-bottom: 0.75rem;
      
      label {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      
      input, textarea, select {
        width: 100%;
        padding: 0.5rem;
        font-size: 0.875rem;
      }
      
      textarea {
        min-height: 80px;
        resize: vertical;
      }
    }
    
    .task-edit-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  }
}
</style>