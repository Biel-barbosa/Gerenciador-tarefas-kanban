<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import LoadingSpinner from '../../components/common/LoadingSpinner.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');

const router = useRouter();
const authStore = useAuthStore();

const register = async () => {
  error.value = '';
  
  // Validação básica
  if (!name.value || !email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos';
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    error.value = 'As senhas não coincidem';
    return;
  }
  
  if (password.value.length < 6) {
    error.value = 'A senha deve ter pelo menos 6 caracteres';
    return;
  }
  
  try {
    loading.value = true;
    await authStore.register(email.value, password.value, name.value);
    router.push('/tasks');
  } catch (err: any) {
    // O erro já está sendo tratado na store
    console.error('Erro de cadastro:', err);
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => {
  router.push('/login');
};

const goToHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card card">
      <button @click="goToHome" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Voltar
      </button>
      
      <div class="auth-header">
        <h1>Cadastro</h1>
        <p>Crie sua conta para começar a gerenciar tarefas</p>
      </div>
      
      <form @submit.prevent="register" class="auth-form">
        <div class="form-group">
          <label for="name">Nome</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            placeholder="Seu nome" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="email">E-mail</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="seu@email.com" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Sua senha" 
            required
          />
        </div>
        
        <div class="form-group">
          <label for="confirmPassword">Confirmar Senha</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            placeholder="Confirme sua senha" 
            required
          />
        </div>
        
        <p v-if="error" class="error-message">{{ error }}</p>
        
        <button 
          type="submit" 
          class="btn btn-primary w-full" 
          :disabled="loading"
        >
          <LoadingSpinner v-if="loading" size="small" />
          <span v-else>Cadastrar</span>
        </button>
      </form>
      
      <div class="auth-footer">
        <p>
          Já tem uma conta? 
          <a href="#" @click.prevent="goToLogin">Entrar</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  position: relative;
  
  .back-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 0.875rem;
    cursor: pointer;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--text-primary);
    }
  }
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-secondary);
  }
}

.auth-form {
  margin-bottom: 1.5rem;
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .error-message {
    color: var(--error);
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
}

.auth-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid var(--neutral-200);
  
  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
    
    a {
      color: var(--primary);
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>