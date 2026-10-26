
const botaoMenu = document.querySelector("#btn-menu");
const menu = document.querySelector(".main-nav");

// Mostrar os elementos no Console
console.log(botaoMenu);
console.log(menu);

// Contador de cliques
let cliques = 0;

// Executar quando o botão for clicado
botaoMenu.addEventListener("click", function () {
    // Abrir ou fechar o menu
    const aberto = menu.classList.toggle("menu-aberto");

    // Atualizar o texto do botão
    if (menu.classList.contains("menu-aberto")) {
        botaoMenu.textContent = "✕ Fechar";
    } else {
        botaoMenu.textContent = "☰ Menu";
    }

    // Atualizar as informações de acessibilidade
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    // Contar os cliques
    cliques = cliques + 1;
    console.log("Cliques:", cliques);
});

// Fechar o menu ao clicar em qualquer link
const linksMenu = menu.querySelectorAll("a");

linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("menu-aberto");

        botaoMenu.textContent = "☰ Menu";
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");
    });
});


