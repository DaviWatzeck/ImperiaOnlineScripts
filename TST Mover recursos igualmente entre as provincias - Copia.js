// Função para adicionar delay usando Promises
function delayPromise(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função otimizada para extrair informações de um tooltip
async function getTooltipInfo(tooltipId) {
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

async function clickestacao() {
    await delayPromise(1000); // Delay de 1 segundo
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
async function verificarClasse() {
    await delayPromise(1000); // Delay de 1 segundo
    const div = document.getElementById('messageboxDepotStationContent');
    
    if (div) {
        await clickAndCheck();
        clearInterval(intervaloVerificacao); // Parar a verificação
    }
}

async function clickAndCheck() {
    await delayPromise(1000); // Delay de 1 segundo
    const arrowElement = document.querySelector('a[title="Próximo domínio"]');

    if (arrowElement) {
        arrowElement.click();

        // Obter o valor inicial do innerHTML do span
        const getItemProvincesContent = () => document.getElementById('item-provinces-switch')?.querySelector('span')?.innerHTML;

        const initialContent = getItemProvincesContent();

        if (initialContent) {
            async function checkIfContentChanged() {
                // Obter o valor atualizado do innerHTML do span
                const updatedContent = getItemProvincesContent();

                if (updatedContent && updatedContent !== initialContent) {
                    const rows = document.querySelectorAll('tbody tr[class]');

                    if (rows.length >= 2) {
                        const secondRow = rows[0]; // Mudança aqui para acessar a segunda linha corretamente
                        const inputs = secondRow.querySelectorAll('input.text');

                        if (inputs.length >= 3) {
                            inputs[0].value = madeira_parcial;
                            inputs[1].value = ferro_parcial;
                            inputs[2].value = pedra_parcial;
                        }

                        await clicarEBuscarClasse();
                    }
                    clearInterval(intervalId); // Para o loop quando o conteúdo mudar
                } else {
                    console.log('O conteúdo do <span> não mudou.');
                }
            }

            const intervalId = setInterval(checkIfContentChanged, 1000); // Verifica a cada 1 segundo
        } else {
            console.log('Elemento com o ID "item-provinces-switch" e/ou <span> não encontrado.');
        }
    } else {
        console.log('Elemento com o title "Próximo domínio" não encontrado.');
    }
}

async function clicarEBuscarClasse() {
    await delayPromise(1000); // Delay de 1 segundo
    const botao = document.querySelector('button[value="Transportar"]');
    
    if (botao) {
        botao.click();
        
        async function verificarClasse() {
            const div = document.getElementsByClassName('window-wide missions-main')[0];
            
            if (div) {
                console.log('A div com o id "missions" está com as classes esperadas.');
                await clicarEVerificar();
            } else {
                setTimeout(verificarClasse, 500); // Tenta a cada 500 milissegundos
            }
        }

        await verificarClasse();
    } else {
        console.log('O botão "Transportar" não foi encontrado.');
    }
}

async function clicarEVerificar() {
    await delayPromise(1000); // Delay de 1 segundo
    const linkTransporte = document.querySelector('a[title="Transporte instantâneo para todos"]');
    
    if (linkTransporte) {
        linkTransporte.click();
        
        async function verificarMensagem() {
            const element = document.querySelector('a[title="Transporte instantâneo para todos"]');
            
            if (element == null) {
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

        await verificarMensagem();
    } else {
        console.log('O link "Transporte instantâneo para todos" não foi encontrado.');
    }
}

// Obtém os valores dos tooltips
const madeira_atual = (await getTooltipInfo('wood-tooltip'))['Madeira disponível'].replaceAll(" ", "");
const ferro_atual = (await getTooltipInfo('iron-tooltip'))['Ferro disponível'].replaceAll(" ", "");
const pedra_atual = (await getTooltipInfo('stone-tooltip'))['Pedra disponível'].replaceAll(" ", "");

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
let processoConcluido = false;

async function processLoop() {
    if (currentIteration < count && !processoConcluido) {
        await clickestacao();
        
        // Configura o intervalo de verificação
        intervaloVerificacao = setInterval(verificarClasse, 1000); // Verifica a cada 1000 ms (1 segundo)
        
        currentIteration++;
        
        // Após um intervalo, continue para a próxima iteração
        setTimeout(processLoop, 3000); // Aguarda 3 segundos antes da próxima iteração
    } else {
        console.log('Processo concluído.');
        processoConcluido = true;  // Interrompe o loop
    }
}

// Inicia o loop
processLoop();
