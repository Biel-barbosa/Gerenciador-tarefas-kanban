import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useAuthStore } from './auth';
import { useToast } from 'vue-toastification';

export type TaskPriority = 'baixa' | 'média' | 'alta';
export type TaskStatus = 'a-fazer' | 'em-andamento' | 'concluido';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date | null;
  createdAt: Date;
  userId: string;
}

interface NewTask {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date | null;
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref('');
  const statusFilter = ref<TaskStatus | 'todas'>('todas');
  const priorityFilter = ref<TaskPriority | 'todas'>('todas');

  const authStore = useAuthStore();
  const toast = useToast();

  const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
      const matchesSearch = 
        searchQuery.value === '' || 
        task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.value.toLowerCase());

      const matchesStatus = 
        statusFilter.value === 'todas' || 
        task.status === statusFilter.value;

      const matchesPriority = 
        priorityFilter.value === 'todas' || 
        task.priority === priorityFilter.value;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  });

  const tasksByStatus = computed(() => {
    const result = {
      'a-fazer': [] as Task[],
      'em-andamento': [] as Task[],
      'concluido': [] as Task[]
    };

    filteredTasks.value.forEach(task => {
      result[task.status].push(task);
    });

    return result;
  });

  const saveTasks = () => {
    if (authStore.user) {
      localStorage.setItem(`tasks_${authStore.user.id}`, JSON.stringify(tasks.value));
    }
  };

  const fetchTasks = async () => {
    if (!authStore.user) {
      tasks.value = [];
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      const savedTasks = localStorage.getItem(`tasks_${authStore.user.id}`);
      if (savedTasks) {
        tasks.value = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : null
        }));
      }
    } catch (err: any) {
      error.value = err.message;
      toast.error('Erro ao carregar tarefas');
      console.error('Error fetching tasks:', err);
    } finally {
      loading.value = false;
    }
  };

  const addTask = async (newTask: NewTask) => {
    if (!authStore.user) {
      toast.error('Você precisa estar autenticado para criar tarefas');
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      const task: Task = {
        id: Date.now().toString(),
        ...newTask,
        userId: authStore.user.id,
        createdAt: new Date()
      };

      tasks.value.unshift(task);
      saveTasks();
      toast.success('Tarefa criada com sucesso!');

      return task;
    } catch (err: any) {
      error.value = err.message;
      toast.error('Erro ao criar tarefa');
      console.error('Error adding task:', err);
    } finally {
      loading.value = false;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      loading.value = true;
      error.value = null;

      const index = tasks.value.findIndex(task => task.id === taskId);
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...updates };
        saveTasks();
        toast.success('Tarefa atualizada com sucesso!');
      }
    } catch (err: any) {
      error.value = err.message;
      toast.error('Erro ao atualizar tarefa');
      console.error('Error updating task:', err);
    } finally {
      loading.value = false;
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      const task = tasks.value.find(t => t.id === taskId);
      if (!task) return;

      task.status = newStatus;
      saveTasks();

      const statusMap: Record<TaskStatus, string> = {
        'a-fazer': 'A Fazer',
        'em-andamento': 'Em Andamento',
        'concluido': 'Concluído'
      };

      toast.info(`Tarefa movida para ${statusMap[newStatus]}`);
    } catch (err: any) {
      toast.error('Erro ao atualizar status da tarefa');
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      loading.value = true;
      error.value = null;

      tasks.value = tasks.value.filter(task => task.id !== taskId);
      saveTasks();
      toast.success('Tarefa excluída com sucesso!');
    } catch (err: any) {
      error.value = err.message;
      toast.error('Erro ao excluir tarefa');
      console.error('Error deleting task:', err);
    } finally {
      loading.value = false;
    }
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const setStatusFilter = (status: TaskStatus | 'todas') => {
    statusFilter.value = status;
  };

  const setPriorityFilter = (priority: TaskPriority | 'todas') => {
    priorityFilter.value = priority;
  };

  const clearFilters = () => {
    searchQuery.value = '';
    statusFilter.value = 'todas';
    priorityFilter.value = 'todas';
  };

  return {
    tasks,
    loading,
    error,
    searchQuery,
    statusFilter,
    priorityFilter,
    filteredTasks,
    tasksByStatus,
    fetchTasks,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    clearFilters
  };
});