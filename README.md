# QuadroSocietarioAngular

Este projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.2. Ele é responsável pela interface front-end do sistema de gerenciamento de empresas e sócios, que se comunica com um back-end desenvolvido em Symfony para realizar operações de CRUD (Criar, Ler, Atualizar, Deletar) no quadro societário.

### Principais Funcionalidades

- Listagem de empresas.
- Edição e exclusão de empresas.
- Listagem e gerenciamento de sócios associados a cada empresa.
- Criação de novas empresas e sócios.

## Requisitos

- **Angular CLI** (versão 12 ou superior)
- **Git** (para controle de versão)

## Instalação

Siga as etapas abaixo para clonar e rodar o projeto localmente.

### 1. Clone o repositório:
```bash
git clone https://gitlab.com/seu-usuario/nome_projeto-front-end.git
```

### 2. Acesse o diretório do projeto:
```bash
cd nome_projeto-front-end
```

### 3. Instale as dependências:
```bash
npm install
```

### 4. Inicie o servidor de desenvolvimento:
```bash
ng serve
```

### 5. Acesse a aplicação no navegador:
```arduino
http://localhost:4200
```

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute o comando `ng serve`. A aplicação estará disponível em `http://localhost:4200/` e será recarregada automaticamente se você fizer alterações nos arquivos do projeto.

## Configuração da API

A aplicação faz requisições para o back-end Symfony. Certifique-se de que a API está rodando corretamente e que a URL da API está configurada no arquivo `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:8000'  // URL da API do back-end
};
```

## Estrutura do Código
```
src/
├── app/
│   ├── components/   # Componentes reutilizáveis
│   ├── services/     # Serviços para comunicação com o back-end
│   └── models/       # Modelos de dados da aplicação
├── environments/     # Configurações de ambientes (produção e desenvolvimento)
└── assets/           # Arquivos estáticos
```

## Geração de Código
Para gerar um novo componente, use o comando ng generate component nome-componente. Você também pode usar ng generate directive|pipe|service|class|guard|interface|enum|module para gerar outros tipos de artefatos.

## Build
Para compilar o projeto, execute o comando ng build. Os artefatos de build serão armazenados no diretório dist/.
