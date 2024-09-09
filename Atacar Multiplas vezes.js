let vezes = 10;

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

async function atacar(i) {
    if (i >= vezes) return;

    const button = [...document.querySelectorAll('button.button.button')]
        .find(btn => btn.textContent.trim() === 'Atacar');

    if (button) {
        button.click();

        let checkExist2 = setInterval(function() {
            let divCarregada2 = document.querySelector('.ui-ib.tab-attack.active');
            if (divCarregada2) {
                clearInterval(checkExist2);

                let divisor = vezes - i;
                let idsTropas = {
                    P: ['army_P1', 'army_P2', 'army_P3', 'army_P4'],
                    S: ['army_S1', 'army_S2', 'army_S3', 'army_S4'],
                    M: ['army_M1', 'army_M2', 'army_M3', 'army_M4'],
                    K: ['army_K1', 'army_K2', 'army_K3', 'army_K4'],
                    C: ['army_CT', 'army_C1', 'army_C2', 'army_C3', 'army_C4']
                };

                function getArmyValue(id) {
                    let element = window[id];
                    return (typeof element !== 'undefined') ? processArmyValue(element.text, divisor) : null;
                }

                Object.keys(idsTropas).forEach(tipo => {
                    idsTropas[tipo].forEach((id) => {
                        let armyId = `current_max_army_${id.split('_')[1]}`;
                        setValue(id, getArmyValue(armyId));
                    });
                });

                document.querySelector('button[name="sendAttack"]')?.click();

                let checkExist3 = setInterval(function() {
                    let divCarregada3 = document.querySelector('.window-wide.missions-main');
                    if (divCarregada3) {
                        let closeBtn = document.querySelector('a[href="javascript:void(container.close({saveName: \'missions\', cancelCallback: true, flow: true, closedWith: \'click\'}))"]');
                        if (closeBtn) closeBtn.click();
                        clearInterval(checkExist3);
                        verificarMissaoEmAndamento();
                    }
                }, 500);

                setTimeout(() => atacar(i + 1), 1000); // Delay de 1 segundo após cada iteração
            }
        }, 500);
    } else {
        console.log('Botão "Atacar" não encontrado.');
        setTimeout(() => atacar(i + 1), 1000); // Delay de 1 segundo mesmo se o botão não for encontrado
    }
}

atacar(0);