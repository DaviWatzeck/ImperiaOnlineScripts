// Função para verificar a existência do elemento e realizar as ações necessárias
function checkAndClick() {
  // Simula um clique no botão com a classe "ui-ib fleft refresh"
  document.querySelector('button.ui-ib.fleft.refresh').click();

  // Espera 2 segundos para a atualização
  setTimeout(() => {
      var button = document.getElementById("refreshview_diggers");
      if (button) button.click();

      let element = document.querySelector('a.ui-icon.attack-me');

      // Verifica se o elemento existe
      if (element) {
        console.log("Inimigos detectados");

        // Tenta encontrar e clicar no botão pelo valor do atributo
        var retirarButton = document.querySelector('button[value="Chamar de volta a missão"]');
        if (retirarButton) {
            retirarButton.click();
            console.log("Mandando exército embora");
            clearInterval(intervalId); // Para o intervalo
        }
     } else {
          console.log("Tudo ok por enquanto");
      }
  }, 2000);
}

// Configura o intervalo para executar a função a cada 5 segundos
let intervalId = setInterval(checkAndClick, 5000);
