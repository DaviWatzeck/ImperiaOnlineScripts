function countdomains(){
  const rows = document.querySelectorAll("#send-spy-form .data-grid tbody tr");

  let count = 0;

  rows.forEach(tr => {
      const targetTd = tr.querySelector("td.province-input.spyToAll.num");
      
      if (targetTd) { 
          count++;
      }
  });
  return unidades = Math.floor(document.getElementById('spies-count-quick-load').innerHTML / (count - 1));
}

function setValueForAll() {
    rows.forEach(tr => {
        const targetTd = tr.querySelector("td.province-input.spyToAll.num");
        
        if (targetTd) {
            const input = targetTd.querySelector("input.text");
            
            if (input) {
                input.value = unidades;
            }
        }
    });
}
function delfirstvalue(){
  const firstTargetTd = document.querySelector("td.province-input.spyToAll.num");
  if (firstTargetTd) {
      const firstInput = firstTargetTd.querySelector("input.text");
      if (firstInput) {
          firstInput.value = "";
      }
  }
}

function submit() {
  document.querySelector("button[value='Enviar'").click();
}
countdomains();
setValueForAll();
delfirstvalue();
submit();