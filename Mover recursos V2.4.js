// Função genérica para adicionar delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function clickestacao() {
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

// Função para extrair informações de um tooltip
function getTooltipInfo(tooltipId) {
    const tooltipElement = document.getElementById(tooltipId);
    const table = tooltipElement.querySelector('table');
    const rows = table.querySelectorAll('tbody tr');
    
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

async function verificarClasse() {
    await delay(500);
    const div = document.getElementById('messageboxDepotStationContent');
    
    if (div) {
        console.log('Depot Station Ok! Prosseguindo');
    }
    else{
        await delay(500);
        verificarClasse();
    }
}

async function clickAndCheck() {
    await delay(500);
    let provPictElement = document.getElementById('item-provinces-switch').querySelector('span').innerHTML;
    var arrowElement = document.querySelector('a[title="Próximo domínio"]');

    if (arrowElement) {
        arrowElement.click();
        console.log('Clicou no proximo dominio');
        return provPictElement;
    } else {
        await delay(500);
        await clickAndCheck();
    }
}

async function checkClassChange(provPictElement) {
    await delay(500);

    if (provPictElement) {
        console.log('Verificou o numero do Depot Station 1');
        return provPictElement;
    } else {
        await delay(500);
        checkClassChange();
    }
}

async function checkIfClassChanged(provPictElement) {
    await delay(500);
    var updatedProvPictElement = document.getElementById('item-provinces-switch').querySelector('span').innerHTML;
    
    if (updatedProvPictElement) {
        if (updatedProvPictElement !== provPictElement) {
            console.log('Checando Provincia');
        }
        else{
            await delay(500);
            checkIfClassChanged();
        }
    } else {
        await delay(500);
        checkIfClassChanged();
    }
}

async function checkprovincia(){
    await delay(500);
    const provincia1 = document.querySelector('tbody tr[class] td.tcenter.nw a').textContent;
    if (provincia1 == 1 ) {
        console.log('Provincia 1 na primeira linha OK');
    }
    else{
        await delay(500);
        document.getElementById('refreshdepot_station').click()
        checkprovincia();
    }
}

async function checkprovincia2() {
    await delay(500);
    const rows = document.querySelectorAll('tbody tr[class]');
    if (rows.length >= 2) {
        const secondRow = rows[0];

        const inputs = secondRow.querySelectorAll('input.text');

        if (inputs.length >= 3) {
            inputs[0].value = madeira_parcial;
            inputs[1].value = ferro_parcial;
            inputs[2].value = pedra_parcial;
        }
        console.log('Valores incluidos?');
    }
    else{
        await delay(500);
        checkprovincia2();
    }
}

async function clicarEBuscarClasse() {
    await delay(500);
    const botao = document.querySelector('button[value="Transportar"]');
    
    if (botao) {
        botao.click();
        console.log('Clicou no transportar');
    } else {
        await delay(500);
        clicarEBuscarClasse();
    }
}

async function verificarClasse2() {
    await delay(500);
    const div = document.getElementsByClassName('window-wide missions-main')[0];
    
    if (div) {
        console.log('Verificando a div missão');
    } else {
        await delay(500);
        verificarClasse2(); // Tenta a cada 500 milissegundos
    }
}

async function clicarEVerificar() {
    const linkTransporte = document.querySelector('a[title="Transporte instantâneo para todos"]');
    
    if (linkTransporte) {
        linkTransporte.click();
        console.log('Clicou no transporte instantâneo');
    } else {
        await delay(500);
        clicarEVerificar();
    }
}

async function verificarMensagem() {
    const element = document.querySelector('a[title="Transporte instantâneo para todos"]');
    
    if (element == null) {
        console.log('Ate aqui OK');
    } else {
        await delay(500);
        verificarMensagem(); // Tenta a cada 500 milissegundos
    }
}

async function closediv(){
    const closeButton = document.querySelector('#missions .ui-ib.fright.close');
    if (closeButton) {
        closeButton.click();
        console.log(`A div ${currentIteration + 1} foi concluída`);
    } else {
        await delay(500);
        closediv();
    }
}

// Loop principal para processar as províncias
async function processLoop() {
    if (currentIteration < count && !processoConcluido) {
        await clickestacao(); // Executa a ação inicial
        await verificarClasse(); // Verifica a mudança na div
        let provPictElement = await clickAndCheck();
        await checkClassChange(provPictElement);
        await checkIfClassChanged(provPictElement);
        await checkprovincia();
        await checkprovincia2();
        await clicarEBuscarClasse();
        await verificarClasse2();
        await clicarEVerificar();
        await verificarMensagem();
        await closediv();

        currentIteration++;
        await delay(1500); // Delay de 1,5s entre cada iteração
        
        await processLoop(); // Continua para a próxima iteração
    } else {
        console.log('Processo concluído.');
        processoConcluido = true;
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
console.log(`Madeira a ser dividida: ${madeira_parcial}\nFerro a ser dividido: ${ferro_parcial}\nPedra a ser dividida: ${pedra_parcial}`);

let currentIteration = 0;
let processoConcluido = false;

// Inicia o loop
processLoop();
