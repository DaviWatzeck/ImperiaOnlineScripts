// Função para clicar em um botão 'infiltrate-capital' e depois no botão 'Retirar'
function processButton(button, nextButtons) {
    button.click(); // Clica no botão 'infiltrate-capital'

    // Espera 2 segundos para clicar no botão 'Retirar'
    setTimeout(() => {
        const retirarButton = document.querySelector('button[value="Retirar"]');
        if (retirarButton) {
            retirarButton.click(); // Clica no botão 'Retirar'

            // Espera 1,5 segundos antes de passar para o próximo botão
            setTimeout(() => {
                if (nextButtons.length > 0) {
                    processButton(nextButtons[0], nextButtons.slice(1));
                }
            }, 500);
        }
    }, 1000);
}

// Seleciona todos os elementos <a> com a classe 'infiltrate-capital'
const buttons = document.querySelectorAll('a.infiltrate-capital');

// Se houver botões, inicia o processo
if (buttons.length > 0) {
    processButton(buttons[0], Array.from(buttons).slice(1));
}