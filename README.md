# VIPCELL - Distribuidora

Projeto de loja virtual demonstrativa de peças e componentes para celulares.

## Estrutura de pastas

```text
VIPCELL/
├── index.html
├── produtos.html
├── sobre.html
├── contato.html
├── entrar.html
├── cadastro.html
├── area-restrita.html
├── style.css
├── js/
│   ├── supabase-config.js
│   └── script.js
└── assets/
```

## Como executar

1. Extraia a pasta do projeto.
2. Abra a pasta no Visual Studio Code.
3. Abra o arquivo `index.html` no navegador (ou use a extensão Live Server).
4. Para testar cadastro e login, configure primeiro o Supabase.

## Configurar o Supabase

1. Crie um projeto no site https://supabase.com/.
2. No painel do projeto, abra as configurações da API.
3. Copie a **Project URL** e a chave **Publishable** (ou `anon/public`, conforme o painel).
4. Abra `js/supabase-config.js`.
5. Substitua `COLE_AQUI_A_PROJECT_URL` e `COLE_AQUI_A_CHAVE_PUBLISHABLE` pelos seus dados.
6. No painel Supabase, em Authentication > Providers > Email, desative a confirmação de e-mail para o teste em sala, se essa for a orientação do professor.

**Segurança:** nunca coloque a Secret key, senha do banco ou credenciais privadas no JavaScript do navegador.

## Funcionalidades

- Página inicial com banner, categorias, produtos em destaque e rodapé.
- Página de produtos com filtro por nome.
- Menu responsivo para celular.
- Carrinho demonstrativo que atualiza quantidade e valor durante a página aberta.
- Cadastro com `auth.signUp`.
- Login com `auth.signInWithPassword`.
- Verificação de sessão com `auth.getSession`.
- Encerramento de sessão com `auth.signOut`.
- Área restrita que redireciona visitantes não autenticados para o login.

## Observações

- Os produtos, preços, telefone, e-mail e links são exemplos para a apresentação. Atualize com os dados reais da sua loja/projeto.
- O carrinho é apenas demonstrativo: não salva pedidos nem realiza pagamentos.
- O formulário de contato e a newsletter exibem uma confirmação na tela, mas ainda não enviam mensagens nem armazenam e-mails.
- As imagens estão carregadas por links externos e precisam de internet para aparecer.
