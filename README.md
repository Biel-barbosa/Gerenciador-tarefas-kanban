# Gerenciador de Tarefas - Vue.js Kanban Board

Um aplicativo de gerenciamento de tarefas estilo Kanban construído com Vue.js e TypeScript. Este projeto demonstra a implementação de um quadro Kanban interativo com funcionalidades de arrastar e soltar, autenticação de usuários e gerenciamento de estado.

![Kanban Board Preview](https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## 🚀 Tecnologias

### Core
- [Vue.js 3](https://vuejs.org/) - Framework JavaScript progressivo
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Vite](https://vitejs.dev/) - Build tool e dev server moderno

### Estado e Roteamento
- [Pinia](https://pinia.vuejs.org/) - Gerenciamento de estado para Vue.js
- [Vue Router](https://router.vuejs.org/) - Roteamento oficial do Vue.js

### UI e Interatividade
- [Vuedraggable](https://github.com/SortableJS/vue.draggable.next) - Componente de drag-and-drop
- [Vue Toastification](https://github.com/Maronato/vue-toastification) - Sistema de notificações
- [SCSS](https://sass-lang.com/) - Pré-processador CSS
- Design System próprio com variáveis CSS personalizadas

### Utilitários
- [date-fns](https://date-fns.org/) - Biblioteca de manipulação de datas

## ✨ Funcionalidades

- 🔐 Autenticação de usuários (registro/login)
- 📋 Quadro Kanban com três colunas (A Fazer, Em Andamento, Concluído)
- 🔄 Drag and drop para mover tarefas entre colunas
- 🎨 Interface responsiva 
- 🔍 Filtros e busca de tarefas
- 📅 Datas de vencimento
- 🔔 Notificações toast para feedback do usuário

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular com:

- `/components` - Componentes reutilizáveis
- `/views` - Páginas da aplicação
- `/stores` - Gerenciamento de estado com Pinia
- `/router` - Configuração de rotas
- `/styles` - Estilos globais e variáveis CSS

## 💻 Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎨 Design System

O projeto utiliza um sistema de design consistente com:

- Paleta de cores personalizável
- Sistema de espaçamento uniforme
- Tipografia consistente
- Componentes reutilizáveis
- Animações e transições suaves
- Feedback visual para interações

## 📱 Responsividade

- Layout adaptativo para desktop e mobile
- Breakpoints consistentes
- Experiência otimizada para touch em dispositivos móveis

## 🔧 Boas Práticas

- Código tipado com TypeScript
- Componentes Vue com Composition API
- Gerenciamento de estado centralizado
- Roteamento protegido
- Feedback visual para ações do usuário
- Tratamento de erros consistente
