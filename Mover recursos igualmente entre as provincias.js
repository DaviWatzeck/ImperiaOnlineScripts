// Função para extrair informações de um tooltip
function getTooltipInfo(tooltipId) {
    const tooltipElement = document.getElementById(tooltipId);
    const table = tooltipElement.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    const info = {};

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 1) {
            const label = cells[0].textContent.trim();
            const value = cells[1].textContent.trim();
            info[label] = value;
        }
    });

    return info;
}

function clickestacao() {
    flash.hotKeyTrigger(84, 'makeFlashAction', {
        "action": "viewDepotStation",
        "saveName": "depot_station",
        "title": "Estação de transporte",
        "template": "tabbed"
    }, {
        "menuTitle": "Estação de transporte",
        "callBack": "makeFlashAction",
        "action": {
            "action": "viewDepotStation",
            "saveName": "depot_station",
            "title": "Estação de transporte",
            "template": "tabbed"
        }
    });
}

// Função para clicar no botão e verificar a classe da div
function verificarClasse() {
    const div = document.querySelector('.window-wrapper.ui-draggable.io-animm-fix');
    
    if (div && div.classList.contains('active')) {
        clickAndCheck();
        clearInterval(intervaloVerificacao); // Parar a verificação
    }
}

function clickAndCheck() {
    var arrowElement = document.querySelector('a[title="Próximo domínio"]');

    if (arrowElement) {
        arrowElement.click();

        function checkClassChange() {
            var provPictElement = document.querySelector('i.prov-pict').innerHTML;

            if (provPictElement) {

                function checkIfClassChanged() {
                    var updatedProvPictElement = document.querySelector('i.prov-pict').innerHTML;

                    if (updatedProvPictElement) {
                        if (updatedProvPictElement !== provPictElement) {
                            const rows = document.querySelectorAll('tbody tr[class]');

                            if (rows.length >= 2) {
                                const secondRow = rows[0];

                                const inputs = secondRow.querySelectorAll('input.text');

                                if (inputs.length >= 3) {
                                    inputs[0].value = madeira_parcial;
                                    inputs[1].value = ferro_parcial;
                                    inputs[2].value = pedra_parcial;
                                }

                                document.querySelector('button[value="Transportar"]').click();
                                clicarEBuscarClasse();
                            }
                            clearInterval(intervalId); // Para o loop quando a classe mudar
                        }
                    } else {
                        console.log('Elemento com a classe "prov-pict" não encontrado.');
                    }
                }

                var intervalId = setInterval(checkIfClassChanged, 1000); // Verifica a cada 1 segundo
            } else {
                console.log('Elemento com a classe "prov-pict" não encontrado.');
            }
        }

        setTimeout(checkClassChange, 100); // Aguarda 100ms antes de iniciar a verificação
    } else {
        console.log('Elemento com o title "Próximo domínio" não encontrado.');
    }
}

function clicarEBuscarClasse() {
    const botao = document.querySelector('button[value="Transportar"]');
    
    if (botao) {
        botao.click();
        
        function verificarClasse() {
            const div = document.getElementById('missions');
            
            if (div && div.classList.contains('window-wrapper') &&
                div.classList.contains('ui-draggable') &&
                div.classList.contains('io-animm-fix') &&
                div.classList.contains('active')) {
                console.log('A div com o id "missions" está com as classes esperadas.');
                clicarEVerificar();
            } else {
                setTimeout(verificarClasse, 500); // Tenta a cada 500 milissegundos
            }
        }

        verificarClasse();
    } else {
        console.log('O botão "Transportar" não foi encontrado.');
    }
}

function clicarEVerificar() {
    const linkTransporte = document.querySelector('a[title="Transporte instantâneo para todos"]');
    
    if (linkTransporte) {
        linkTransporte.click();
        
        function verificarMensagem() {
            const divNotice = document.querySelector('div.notice.neutral');
            
            if (divNotice && divNotice.textContent.includes('Não há missões neste momento.')) {
                const closeButton = document.querySelector('#missions .ui-ib.fright.close');

                // Verifica se o botão foi encontrado e, se sim, simula o clique
                if (closeButton) {
                    closeButton.click();
                } else {
                    console.log('Botão de fechar não encontrado');
                }

                console.log('Mensagem de "Não há missões neste momento." encontrada e janela fechada.');
            } else {
                setTimeout(verificarMensagem, 500); // Tenta a cada 500 milissegundos
            }
        }

        verificarMensagem();
    } else {
        console.log('O link "Transporte instantâneo para todos" não foi encontrado.');
    }
}

// Obtém os valores dos tooltips
const madeira_atual = getTooltipInfo('wood-tooltip')['Madeira disponível'].replaceAll(" ", "");
const ferro_atual = getTooltipInfo('iron-tooltip')['Ferro disponível'].replaceAll(" ", "");
const pedra_atual = getTooltipInfo('stone-tooltip')['Pedra disponível'].replaceAll(" ", "");

const fastProvinces = document.querySelector('#fast-provinces');
const provincesRow = fastProvinces.querySelector('.ps-row1.clear.narrow');
const provinceElements = provincesRow.querySelectorAll('.ui-location.ui-province');
const count = provinceElements.length - 1;

// Calcula os valores parciais
const madeira_parcial = Math.floor(madeira_atual / count);
const ferro_parcial = Math.floor(ferro_atual / count);
const pedra_parcial = Math.floor(pedra_atual / count);

// Função recursiva para executar o processo e parar após o loop
let currentIteration = 0;

function processLoop() {
    if (currentIteration < count) {
        clickestacao();
        
        // Configura o intervalo de verificação
        intervaloVerificacao = setInterval(verificarClasse, 1000); // Verifica a cada 1000 ms (1 segundo)
        
        currentIteration++;
        
        // Após um intervalo, continue para a próxima iteração
        setTimeout(processLoop, 3000); // Aguarda 3 segundos antes da próxima iteração
    } else {
        console.log('Processo concluído.');
    }
}

// Inicia o loop
processLoop();
