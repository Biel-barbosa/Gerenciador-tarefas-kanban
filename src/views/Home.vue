<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const navigateToLogin = () => {
  router.push('/login');
};

const navigateToRegister = () => {
  router.push('/register');
};

const navigateToTasks = () => {
  if (authStore.isAuthenticated()) {
    router.push('/tasks');
  } else {
    router.push('/login');
  }
};
</script>

<template>
  <div class="home-container">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Gerenciador de Tarefas</h1>
          <p class="hero-description">
            Organize suas tarefas de forma eficiente com nosso sistema de gestão Kanban.
            Arraste e solte tarefas entre colunas, defina prioridades e nunca mais perca prazos.
          </p>
          
          <div class="hero-actions">
            <button @click="navigateToTasks" class="btn btn-primary">
              Começar agora
            </button>
            <button v-if="!authStore.isAuthenticated()" @click="navigateToLogin" class="btn btn-outline">
              Entrar
            </button>
          </div>
        </div>
        
        <div class="hero-image">
          <img src="https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Gerenciador de Tarefas" />
        </div>
      </div>
    </section>
    
    <section class="features">
      <div class="container">
        <h2 class="section-title">Recursos</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h20"></path>
                <path d="M20 3v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V3"></path>
                <path d="M12 7v8"></path>
                <path d="M8 11h8"></path>
              </svg>
            </div>
            <h3>Quadro Kanban</h3>
            <p>Visualize suas tarefas em um quadro Kanban com colunas para diferentes etapas do fluxo de trabalho.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                <path d="M15 9l-6 6M9 9l6 6"></path>
              </svg>
            </div>
            <h3>Arrastar e Soltar</h3>
            <p>Mova facilmente tarefas entre colunas com arrastar e soltar para atualizar o status.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3>Prioridades</h3>
            <p>Atribua prioridades às suas tarefas para identificar facilmente o que precisa ser feito primeiro.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
            </div>
            <h3>Filtros e Busca</h3>
            <p>Encontre rapidamente suas tarefas com filtros por status, prioridade e busca por texto.</p>
          </div>
        </div>
      </div>
    </section>
    
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 Gerenciador de Tarefas. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero {
  padding: 4rem 0;
  background-color: var(--bg-primary);
  
  .container {
    display: flex;
    align-items: center;
    gap: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }
  
  .hero-content {
    flex: 1;
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }
    
    .hero-description {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      color: var(--text-secondary);
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      
      @media (max-width: 768px) {
        justify-content: center;
      }
    }
  }
  
  .hero-image {
    flex: 1;
    
    img {
      width: 100%;
      max-width: 500px;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
    }
  }
}

.features {
  padding: 4rem 0;
  background-color: var(--bg-tertiary);
  
  .section-title {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    background-color: var(--bg-secondary);
    padding: 2rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .feature-icon {
      width: 60px;
      height: 60px;
      background-color: rgba(79, 70, 229, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      color: var(--primary);
    }
    
    h3 {
      margin-bottom: 1rem;
    }
    
    p {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }
  }
}

.footer {
  margin-top: auto;
  padding: 2rem 0;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--neutral-200);
  
  p {
    text-align: center;
    color: var(--text-tertiary);
    font-size: 0.9rem;
  }
}
</style>