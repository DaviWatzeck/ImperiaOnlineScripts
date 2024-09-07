let vezes = 9;

function processArmyValue(value, divisor) {
    let cleanedNumber = parseInt(value.replace(/\s/g, ''));
    return Math.floor(cleanedNumber / divisor);
}

function setValue(id, value) {
    let element = document.getElementById(id);
    if (element) {
        element.value = value;
    } else {
        console.warn(`Elemento com ID ${id} não encontrado.`);
    }
}

function atacar(i) {
    if (i >= vezes) return; // Condição de término

    const button = [...document.querySelectorAll('button.button.button')]
        .find(btn => btn.textContent.trim() === 'Atacar');

    if (button) {
        button.click();

        let checkExist2 = setInterval(function() {
            let divCarregada2 = document.querySelector('.ui-ib.tab-attack.active');
            if (divCarregada2) {
                clearInterval(checkExist2); // Para de verificar

                let divisor = vezes - i;

                // Função para obter o valor do elemento
                function getArmyValue(id) {
                    let element = window[id];
                    return (typeof element !== 'undefined') ? processArmyValue(element.text, divisor) : null;
                }

                // Obtendo valores das variáveis
                let l1 = getArmyValue('current_max_army_P1');
                let l2 = getArmyValue('current_max_army_P2');
                let l3 = getArmyValue('current_max_army_P3');
                let l4 = getArmyValue('current_max_army_P4');

                let a1 = getArmyValue('current_max_army_S1');
                let a2 = getArmyValue('current_max_army_S2');
                let a3 = getArmyValue('current_max_army_S3');
                let a4 = getArmyValue('current_max_army_S4');

                let e1 = getArmyValue('current_max_army_M1');
                let e2 = getArmyValue('current_max_army_M2');
                let e3 = getArmyValue('current_max_army_M3');
                let e4 = getArmyValue('current_max_army_M4');

                let c1 = getArmyValue('current_max_army_K1');
                let c2 = getArmyValue('current_max_army_K2');
                let c3 = getArmyValue('current_max_army_K3');
                let c4 = getArmyValue('current_max_army_K4');

                let uc1 = getArmyValue('current_max_army_CT');
                let uc2 = getArmyValue('current_max_army_C1');
                let uc3 = getArmyValue('current_max_army_C2');
                let uc4 = getArmyValue('current_max_army_C3');
                let uc5 = getArmyValue('current_max_army_C4');

                // Definindo valores nos campos
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

                document.querySelector('button[name="sendAttack"]')?.click();
                let checkExist3 = setInterval(function() {
                  let divCarregada3 = document.querySelector('.window-wide.missions-main');
                  if (divCarregada3) {
                      let closeBtn = document.querySelector('a[href="javascript:void(container.close({saveName: \'missions\', cancelCallback: true, flow: true, closedWith: \'click\'}))"]');
                      if (closeBtn) closeBtn.click();
                      clearInterval(checkExist3);
                      verificarMissaoEmAndamento(); // Inicia a verificação da missão após fechar a div
                  }
              }, 500);

                // Chama a próxima iteração após 2 segundos
                setTimeout(() => atacar(i + 1), 100);
            }
        }, 500);
    } else {
        console.log('Botão "Espiar" não encontrado.');
        // Chama a próxima iteração após 2 segundos, mesmo que o botão não seja encontrado
        setTimeout(() => atacar(i + 1), 100);
    }
}

// Inicia o loop
atacar(0);
