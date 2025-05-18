import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

interface User {
  id: string;
  email: string;
  displayName: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const toast = useToast();

  const isAuthenticated = () => !!user.value;

  const setUser = (userData: User) => {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const clearUser = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      loading.value = true;
      error.value = null;

      // Simula validação
      if (localStorage.getItem(email)) {
        throw new Error('Este e-mail já está em uso');
      }

      // Cria usuário
      const userData: User = {
        id: Date.now().toString(),
        email,
        displayName
      };

      // Salva credenciais
      localStorage.setItem(email, password);
      setUser(userData);

      toast.success('Conta criada com sucesso!');
      return userData;
    } catch (err: any) {
      error.value = err.message;
      toast.error(err.message);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      loading.value = true;
      error.value = null;

      const savedPassword = localStorage.getItem(email);
      if (!savedPassword || savedPassword !== password) {
        throw new Error('E-mail ou senha incorretos');
      }

      const userData: User = {
        id: Date.now().toString(),
        email,
        displayName: email.split('@')[0]
      };

      setUser(userData);
      toast.success('Login realizado com sucesso!');
      return userData;
    } catch (err: any) {
      error.value = err.message;
      toast.error(err.message);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      loading.value = true;
      error.value = null;
      clearUser();
      toast.info('Logout realizado com sucesso');
    } catch (err: any) {
      error.value = err.message;
      toast.error('Erro ao fazer logout');
    } finally {
      loading.value = false;
    }
  };

  // Carrega usuário salvo ao iniciar
  const initAuth = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      user.value = JSON.parse(savedUser);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    setUser,
    clearUser,
    register,
    login,
    logout,
    initAuth
  };
});