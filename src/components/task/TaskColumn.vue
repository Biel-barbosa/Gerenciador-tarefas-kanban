<script setup lang="ts">
import { computed } from 'vue';
import draggable from 'vuedraggable';
import { useTaskStore, type Task, type TaskStatus } from '../../stores/tasks';
import TaskCard from './TaskCard.vue';

const props = defineProps<{
  title: string;
  status: TaskStatus;
  tasks: Task[];
}>();

const taskStore = useTaskStore();

const statusIcons = {
  'a-fazer': '📋',
  'em-andamento': '🔄',
  'concluido': '✅'
};

const columnColors = {
  'a-fazer': 'column-to-do',
  'em-andamento': 'column-in-progress',
  'concluido': 'column-done'
};

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'tasks',
    disabled: false,
    ghostClass: 'ghost-card'
  };
});

const onMove = (evt: any) => {
  return true;
};

const onChange = (evt: any) => {
  if (evt.added || evt.moved) {
    const task = evt.added ? evt.added.element : evt.moved.element;
    taskStore.updateTaskStatus(task.id, props.status);
  }
};
</script>

<template>
  <div 
    class="column" 
    :class="[columnColors[status]]"
    :data-status="status"
  >
    <div class="column-header">
      <div class="column-title">
        <span class="status-icon">{{ statusIcons[status] }}</span>
        <h3>{{ title }}</h3>
      </div>
      <span class="task-count">{{ tasks.length }}</span>
    </div>
    
    <div class="column-content">
      <draggable
        :list="tasks"
        v-bind="dragOptions"
        @change="onChange"
        @move="onMove"
        item-key="id"
        class="task-list"
      >
        <template #item="{ element }">
          <div class="task-wrapper">
            <TaskCard :task="element" />
          </div>
        </template>
      </draggable>
      
      <div v-if="tasks.length === 0" class="empty-column">
        <p>Nenhuma tarefa</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius-lg);
  padding: 1rem;
  min-width: 300px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  
  &.column-to-do {
    border-top: 3px solid var(--primary);
  }
  
  &.column-in-progress {
    border-top: 3px solid var(--warning);
  }
  
  &.column-done {
    border-top: 3px solid var(--success);
  }
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--neutral-200);
  
  .column-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .status-icon {
      font-size: 1.25rem;
    }
    
    h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }
  }
  
  .task-count {
    background-color: var(--neutral-200);
    color: var(--text-secondary);
    padding: 0.25rem 0.5rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.column-content {
  flex: 1;
  overflow-y: auto;
}

.task-list {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-wrapper {
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
}

.ghost-card {
  opacity: 0.5;
  background: var(--bg-secondary);
  border: 2px dashed var(--primary);
  border-radius: var(--border-radius-md);
}

.empty-column {
  text-align: center;
  padding: 2rem;
  color: var(--text-tertiary);
  font-size: 0.875rem;
  border: 2px dashed var(--neutral-200);
  border-radius: var(--border-radius-md);
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .column {
    min-width: 100%;
  }
}
</style>