const form = document.querySelector('.form');
const formInput = document.querySelector('#formInput');
const prioridade = document.querySelector('#select-prioridade');
const lista = document.querySelector('.lista-todo');
const editForm = document.querySelector('.editForm');
const editInput = document.querySelector('#editInput');
const cancelEdit = document.querySelector('#cancelEdit');
const searchInput = document.querySelector("#search");
const deleteBtn = document.querySelector("#deleteSearch");
const filterBtn = document.querySelector("#filtrar-prioridade");

let oldInputValue;

//funções

//salvar tarefa
const saveCard = (text, done = 0, save = 1) => {

    //cria a div todo
    const card = document.createElement('div');
    card.classList.add('card');
    
    //cria a bolinha de prioridade
    const cardPrioridade = document.createElement('div');
    cardPrioridade.innerHTML = '<i class="bx bxs-circle"></i>';
    cardPrioridade.classList.add('prioridade');

        //determina a cor da bolinha de acordo com a prioridade
        if (prioridade.value === 'urgente-op') {
            cardPrioridade.classList.add('urgente-op'); // vermelho
        } else if (prioridade.value === 'normal-op') {
            cardPrioridade.classList.add('normal-op'); // amarelo
        } else if (prioridade.value === 'baixa-op') {
            cardPrioridade.classList.add('baixa-op'); // verde
        }
    
    card.appendChild(cardPrioridade);

    //cria o título do todo
    const cardTitle = document.createElement('h3');
    cardTitle.innerText = text;
    card.appendChild(cardTitle);

    // cria a div dos botoes
    const cardButtons = document.createElement('div');
    cardButtons.classList.add('botoes');
    card.appendChild(cardButtons);
    
    // cria o botão para marcar como concluído
    const finishcard = document.createElement('button');
    finishcard.classList.add('btn-success');
    finishcard.innerHTML = '<i class="bx bx-check"></i>';
    cardButtons.appendChild(finishcard);
    
    // cria o botão para editar a tarefa
    const editcard = document.createElement('button');
    editcard.classList.add('btn-warning')	;
    editcard.innerHTML = '<i class="bx bxs-pencil"></i>';
    cardButtons.appendChild(editcard);
    
    // cria o botão para deletar a tarefa
    const deleteCard = document.createElement('button');
    deleteCard.classList.add('btn-danger');
    deleteCard.innerHTML = '<i class="bx bxs-trash-alt"></i>';
    cardButtons.appendChild(deleteCard);

    // adiciona a classe
    if (done) {
        card.classList.add('done');
    }

    //salva no local storage
    if (save) {
        saveCardLocalStorage({text, done: 0, });
    }

    // salva tudo isso dentro da div lista
    lista.appendChild(card);

    // limpa o input, para criar outra tarefa
    formInput.value = "";
};

//mostrar form para editar, e esconder irrelevantes
const toggleForms = () => {
    editForm.classList.toggle("hide");
    form.classList.toggle("hide");
    lista.classList.toggle("hide");
};
//.card
// editar tarefa
const updateCard = (text, novaPrioriade) => {
    const Tarefas = document.querySelectorAll(".card");
    
    Tarefas.forEach(card => {
        let cardTitle = card.querySelector("h3")
        
        if(cardTitle.innerText === oldInputValue) {
            cardTitle.innerText = text;

            // atualiza a cor da bolinha de prioridade
            const cardPrioridade = card.querySelector(".prioridade");


            cardPrioridade.classList.remove("urgente-op", "normal-op", "baixa-op");

            if (novaPrioriade === 'urgente-op') {
                cardPrioridade.classList.add('urgente-op'); // vermelho
            } else if (novaPrioriade === 'normal-op') {
                cardPrioridade.classList.add('normal-op'); // amarelo
            } else if (novaPrioriade === 'baixa-op') {
                cardPrioridade.classList.add('baixa-op'); // verde
            }

            updateCardLocalStorage(oldInputValue, {text, prioridade: novaPrioriade});
        }
    });
};

const getSearchedTarefas = (search) => {
    const Tarefas = document.querySelectorAll(".card")
    Tarefas.forEach((card) => {
        const cardTitle = card.querySelector("h3").innerText.toLowerCase();

        card.style.display = "flex";

        if (!cardTitle.includes(search)) {
            card.style.display = "none";
        }
    });
};

const filterTarefas = (filterValue) => {
    const Tarefas = document.querySelectorAll(".card");

    Tarefas.forEach((card) => {
        const prioridades = card.querySelector(".prioridade");
        
        switch(filterValue) {
            case "tudo-op":
                (card.style.display = "flex");

                break;
                
            case "done-op":
                card.classList.contains("done")
                    ? (card.style.display = "flex")
                    : (card.style.display = "none");

                break;
            
            case "urgente-op":
                prioridades && prioridades.classList.contains("urgente-op")
                    ? (card.style.display = "flex")
                    : (card.style.display = "none");
                

                break;
            
            case "normal-op":
                prioridades && prioridades.classList.contains("normal-op")
                    ? (card.style.display = "flex")
                    : (card.style.display = "none");

                break;
            
            case "baixa-op":
                prioridades && prioridades.classList.contains("baixa-op")
                    ? (card.style.display = "flex")
                    : (card.style.display = "none");

                break;
                
            default:
                break;
        }
    });
};



//eventos

//tirando a função de resetar a pagina depois do enviar
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const inputValue = formInput.value;

    if(inputValue) {
        saveCard(inputValue)
    }
});

//marcar tarefa como concluida
document.addEventListener("click", (evento) => {
    
    const targetEl = evento.target;
    const parentEl = targetEl.closest(".card");
    let cardTitle;
    
    if(parentEl && parentEl.querySelector("h3")) {
        cardTitle = parentEl.querySelector("h3").innerText || "";
    }
    
    if(targetEl.classList.contains("btn-success")) {
        parentEl.classList.toggle("done");

        updateTarefastatusLocalStorage(cardTitle);
    }
    
    if(targetEl.classList.contains("btn-warning")) {
        toggleForms();
        
        editInput.value = cardTitle;
        oldInputValue = cardTitle;
    }
    
    if(targetEl.classList.contains("btn-danger")) {
        parentEl.remove();

        removeCardLocalStorage(cardTitle);
    }
});

cancelEdit.addEventListener("click", (evento) => {
    evento.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const editInputValue = editInput.value;
    const novaPrioriade = document.querySelector('#edit-prioridade').value;


    if(editInputValue) {
        updateCard(editInputValue, novaPrioriade);
    }

    toggleForms()
});

searchInput.addEventListener("keyup", (evento) => {
    const search = evento.target.value;
    
    getSearchedTarefas(search);
});

deleteBtn.addEventListener("click", (evento) => {
    evento.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (evento) => {
    const filterValue = evento.target.value;
    
    filterTarefas(filterValue);
});



//O tal do local storage
const getTarefasLocalStorage = () => {
    const Tarefas = JSON.parse(localStorage.getItem("Tarefas")) || [];

    return Tarefas;
};

const loadTarefas = () => {
    const Tarefas = getTarefasLocalStorage();

    Tarefas.forEach((card) => {
        saveCard(card.text, card.done, 0);card });
};

const saveCardLocalStorage = (card) => {
    const Tarefas = getTarefasLocalStorage();

    Tarefas.push(card);

    localStorage.setItem("Tarefas", JSON.stringify(Tarefas));
};

const removeCardLocalStorage = (cardText) => {
    const Tarefas = getTarefasLocalStorage();

    const filterTarefas = Tarefas.filter((card) => card.text != cardText);

    localStorage.setItem("Tarefas", JSON.stringify(filterTarefas));
};

const updateTarefastatusLocalStorage = (cardText) => {
    const Tarefas = getTarefasLocalStorage();

    Tarefas.map((card) =>
    card.text === cardText ? (card.done = !card.done) : null
);

    localStorage.setItem("Tarefas", JSON.stringify(Tarefas));
};

const updateCardLocalStorage = (cardOldText, cardNewText) => {
    const Tarefas = getTarefasLocalStorage();

    Tarefas.map((card) =>
        card.text === cardOldText
        ? (card.text = cardNewText.text, card.prioridade = cardNewText.prioridade)
        : null
    );

    localStorage.setItem("Tarefas", JSON.stringify(Tarefas));
};

loadTarefas();