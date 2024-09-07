// Função para verificar se a missão está em andamento
async function verificarMissaoEmAndamento() {
    console.log('Iniciando verificação da missão...');
    while (true) {
        const missaoElement = document.querySelector('a.ui-icon.mission-my');
        if (missaoElement) {
            console.log('Missão em andamento...');
        } else {
            console.log('Missão não encontrada. Rodando o código do começo...');
            await executarAction(); // Executa a ação novamente
            await aguardarDivCarregar(); // Aguarda a div carregar novamente
        }
        await delay(5000); // Aguarda 5 segundos antes de verificar novamente
    }
}

// Função para executar a ação
function executarAction() {
    return new Promise((resolve) => {
        xajax_viewUserDungeonAttackScreen(
            container.open({
                saveName: 'dungeon-attack',
                title: 'Cavernas da Conquista'
            }), 
            {'tab':'attackDungeon'}
        );
        resolve();
    });
}

// Função para aguardar a div carregar
async function aguardarDivCarregar() {
    await waitForElement('.content.sog-discipline-dungeon.d-module');

    const button = document.querySelector('.button.attack-btn');
    if (button) button.click();

    await waitForElement('.ui-ib.tab-attack.active');
    preencherCampos();

    const batalhaBtn = document.querySelector('button[value="Cerco à Fortaleza"]');
    if (batalhaBtn) batalhaBtn.click();

    await waitForElement('.window-wide.missions-main');
    
    const closeBtn = document.querySelector('a[href="javascript:void(container.close({saveName: \'missions\', cancelCallback: true, flow: true, closedWith: \'click\'}))"]');
    if (closeBtn) closeBtn.click();

    console.log('Missão concluída, verificando novamente...');
    await verificarMissaoEmAndamento(); // Reinicia a verificação da missão
}

// Função para preencher os campos de acordo com os valores obtidos
function preencherCampos() {
    const getValue = (id) => {
        const element = document.getElementById(id);
        return element ? Math.floor(parseInt(element.textContent.replace(/\s/g, '')) / 1) : null;
    };

    const setValue = (id, value) => {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    };

    // Obtendo valores das variáveis
    const l1 = getValue('current_max_army_P1');
    const l2 = getValue('current_max_army_P2');
    const l3 = getValue('current_max_army_P3');
    const l4 = getValue('current_max_army_P4');
    const a1 = getValue('current_max_army_S1');
    const a2 = getValue('current_max_army_S2');
    const a3 = getValue('current_max_army_S3');
    const a4 = getValue('current_max_army_S4');
    const e1 = getValue('current_max_army_M1');
    const e2 = getValue('current_max_army_M2');
    const e3 = getValue('current_max_army_M3');
    const e4 = getValue('current_max_army_M4');
    const c1 = getValue('current_max_army_K1');
    const c2 = getValue('current_max_army_K2');
    const c3 = getValue('current_max_army_K3');
    const c4 = getValue('current_max_army_K4');
    const uc1 = getValue('current_max_army_CT');
    const uc2 = getValue('current_max_army_C1');
    const uc3 = getValue('current_max_army_C2');
    const uc4 = getValue('current_max_army_C3');
    const uc5 = getValue('current_max_army_C4');

    // Preenchendo os valores nos campos
    setValue('army_P1', l1);
    setValue('army_P2', l2);
    setValue('army_P3', l3);
    setValue('army_P4', l4);
    setValue('army_S1', a1);
    setValue('army_S2', a2);
    setValue('army_S3', a3);
    setValue('army_S4', a4);
    setValue('army_M1', e1);
    setValue('army_M2', e2);
    setValue('army_M3', e3);
    setValue('army_M4', e4);
    setValue('army_K1', c1);
    setValue('army_K2', c2);
    setValue('army_K3', c3);
    setValue('army_K4', c4);
    setValue('army_CT', uc1);
    setValue('army_C1', uc2);
    setValue('army_C2', uc3);
    setValue('army_C3', uc4);
    setValue('army_C4', uc5);
}

// Função utilitária para esperar por um elemento no DOM
function waitForElement(selector) {
    return new Promise((resolve) => {
        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });
}

// Função utilitária para criar um delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Inicia a verificação da missão
verificarMissaoEmAndamento();
