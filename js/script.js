console.log("script.js carregado com sucesso!");

// 1. MENU PARA CELULAR
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("main-nav");

if (btnMenu && menu) {
    btnMenu.addEventListener("click", function () {
        menu.classList.toggle("ativo");
    });
}

// 2. ANO AUTOMÁTICO NO RODAPÉ
const anoAtual = document.getElementById("ano-atual");
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

// 3. PESQUISA NA LISTA DE PRODUTOS
const filtroProdutos = document.getElementById("filtro-produtos");
const listaProdutos = document.getElementById("lista-produtos");

if (filtroProdutos && listaProdutos) {
    filtroProdutos.addEventListener("input", function () {
        const pesquisa = filtroProdutos.value.toLowerCase();
        const produtos = listaProdutos.querySelectorAll(".product-card");

        produtos.forEach(function (produto) {
            const nome = produto.querySelector("h3").textContent.toLowerCase();
            if (nome.includes(pesquisa)) {
                produto.style.display = "block";
            } else {
                produto.style.display = "none";
            }
        });
    });
}

// 4. PESQUISA DO CABEÇALHO
const formBusca = document.getElementById("form-busca");
if (formBusca) {
    formBusca.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const campoBusca = document.getElementById("campo-busca");
        window.location.href = "produtos.html?busca=" + encodeURIComponent(campoBusca.value);
    });
}

// 5. CARRINHO SIMPLES PARA DEMONSTRAÇÃO
let quantidadeCarrinho = 0;
let valorCarrinho = 0;
const botoesCarrinho = document.querySelectorAll(".adicionar-carrinho");

botoesCarrinho.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const preco = Number(botao.getAttribute("data-preco"));
        quantidadeCarrinho = quantidadeCarrinho + 1;
        valorCarrinho = valorCarrinho + preco;

        const quantidade = document.getElementById("quantidade-carrinho");
        const valor = document.getElementById("valor-carrinho");

        if (quantidade) quantidade.textContent = quantidadeCarrinho;
        if (valor) valor.textContent = valorCarrinho.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

        botao.textContent = "Adicionado!";
    });
});

// 6. NEWSLETTER (DEMONSTRAÇÃO VISUAL)
const formNewsletter = document.getElementById("form-newsletter");
if (formNewsletter) {
    formNewsletter.addEventListener("submit", function (evento) {
        evento.preventDefault();
        document.getElementById("msg-newsletter").textContent = "Inscrição recebida! Obrigado.";
        formNewsletter.reset();
    });
}

// 7. FORMULÁRIO DE CONTATO (DEMONSTRAÇÃO VISUAL)
const formContato = document.getElementById("form-contato");
if (formContato) {
    formContato.addEventListener("submit", function (evento) {
        evento.preventDefault();
        document.getElementById("msg-contato").textContent = "Mensagem preenchida com sucesso! Este formulário ainda não envia e-mail.";
        formContato.reset();
    });
}

// 8. CADASTRO COM SUPABASE
const formCadastro = document.getElementById("form-cadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const nome = document.getElementById("cadastro-nome").value.trim();
        const email = document.getElementById("cadastro-email").value.trim();
        const senha = document.getElementById("cadastro-senha").value;
        const confirmar = document.getElementById("cadastro-confirmar").value;
        const mensagem = document.getElementById("msg-cadastro");

        if (senha !== confirmar) {
            mensagem.textContent = "As senhas não são iguais.";
            return;
        }

        if (!supabaseClient) {
            mensagem.textContent = "Configure primeiro o Supabase no arquivo js/supabase-config.js.";
            return;
        }

        mensagem.textContent = "Cadastrando...";

        const resposta = await supabaseClient.auth.signUp({
            email: email,
            password: senha,
            options: {
                data: { nome: nome }
            }
        });

        if (resposta.error) {
            mensagem.textContent = "Não foi possível realizar o cadastro. Verifique os dados e tente novamente.";
            console.log(resposta.error.message);
        } else {
            mensagem.textContent = "Cadastro realizado! Agora você pode entrar.";
            formCadastro.reset();
        }
    });
}

// 9. LOGIN COM SUPABASE
const formLogin = document.getElementById("form-login");

if (formLogin) {
    formLogin.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const senha = document.getElementById("login-senha").value;
        const mensagem = document.getElementById("msg-login");

        if (!supabaseClient) {
            mensagem.textContent = "Configure primeiro o Supabase no arquivo js/supabase-config.js.";
            return;
        }

        mensagem.textContent = "Verificando acesso...";

        const resposta = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (resposta.error) {
            mensagem.textContent = "E-mail ou senha incorretos. Tente novamente.";
            console.log(resposta.error.message);
        } else {
            window.location.href = "area-restrita.html";
        }
    });
}

// 10. PROTEGER A ÁREA RESTRITA
const nomeUsuario = document.getElementById("nome-usuario");

if (nomeUsuario) {
    async function verificarUsuario() {
        if (!supabaseClient) {
            window.location.href = "entrar.html";
            return;
        }

        const resposta = await supabaseClient.auth.getSession();

        if (!resposta.data.session) {
            window.location.href = "entrar.html";
        } else {
            const usuario = resposta.data.session.user;
            nomeUsuario.textContent = usuario.user_metadata.nome || usuario.email;
        }
    }

    verificarUsuario();
}

// 11. SAIR DA CONTA
const btnSair = document.getElementById("btn-sair");

if (btnSair) {
    btnSair.addEventListener("click", async function () {
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
        window.location.href = "entrar.html";
    });
}

// 12. APLICAR PESQUISA RECEBIDA PELA URL
if (filtroProdutos && listaProdutos) {
    const parametros = new URLSearchParams(window.location.search);
    const buscaInicial = parametros.get("busca");

    if (buscaInicial) {
        filtroProdutos.value = buscaInicial;
        filtroProdutos.dispatchEvent(new Event("input"));
    }
}