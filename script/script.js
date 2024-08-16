const form = document.querySelector('#storage');
const input = document.querySelector('input');

//eventos
form.addEventListener('submit', function(event) {
    event.preventDefault();
    //tirando a função de resetar a pagina depois do enviar
    
    //colocando name no console
    const name = input.value;
    console.log(name);

    //começando a guardar
    localStorage.setItem('name', JSON.stringify({name: name, prioridade: 1}));

    const res = localStorage.getItem('name');
    console.log(res);

});

//funções
//crud - create delete read update

