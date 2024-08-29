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
const saveCard = (text, prioridadeValue = null, done = 0, save = 1) => {

    // Se a prioridadeValue não foi passada, usa a selecionada no dropdown
    if (!prioridadeValue) {
        prioridadeValue = prioridade.value;
    }

    //cria a div CARD
    const card = document.createElement('div');
    card.classList.add('card');
    
    //cria a div e adiciona a classe
    const cardPrioridade = document.createElement('div');
    cardPrioridade.classList.add('prioridade');
    
    //cria a cor da bolinha e texto de acordo com a prioridade
    if (prioridadeValue === 'urgente-op') {
        cardPrioridade.classList.add('urgente-op');
        cardPrioridade.innerHTML = '<i class="bx bxs-circle"></i><h4>Urgente</h4>';

        } else if (prioridadeValue === 'normal-op') {
            cardPrioridade.classList.add('normal-op');
            cardPrioridade.innerHTML = '<i class="bx bxs-circle"></i><h4>Normal</h4>';

        } else if (prioridadeValue === 'baixa-op') {
            cardPrioridade.classList.add('baixa-op');
            cardPrioridade.innerHTML = '<i class="bx bxs-circle"></i><h4>Baixa</h4>';
        }
    
    // salva tudo feito até agora 🚩
    card.appendChild(cardPrioridade);

    //cria o título do CARD
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

    // adiciona a classe done
    if (done) {
        card.classList.add('done');
    }

    //salva no local storage
    if (save) {
        saveCardLocalStorage({text,prioridade: prioridadeValue, done });
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

// editar tarefa
const updateCard = (text, novaPrioridade) => {
    const Tarefas = document.querySelectorAll(".card");
    
    Tarefas.forEach(card => {
        let cardTitle = card.querySelector("h3")
        
        if(cardTitle.innerText === oldInputValue) {// "===" é pra realizar uma comparação de igualdade de tipo e de valor achei que vale a nota pq eu esqueço ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
            cardTitle.innerText = text;

            // atualiza a cor da bolinha de prioridade
            const cardPrioridade = card.querySelector(".prioridade");


            cardPrioridade.classList.remove("urgente-op", "normal-op", "baixa-op");
            cardPrioridade.innerHTML = '';

            if (novaPrioridade === 'urgente-op') {
                cardPrioridade.classList.add('urgente-op');
                cardPrioridade.innerHTML = '<i class="bx bxs-circle"></i><h4>Urgente</h4>'; // vermelho
            } else if (novaPrioridade === 'normal-op') {
                cardPrioridade.classList.add('normal-op');
                cardPrioridade.innerHTML = '<i class="bx bxs-circle"></i><h4>Normal</h4>'; // amarelo
            } else if (novaPrioridade === 'baixa-op') {
                cardPrioridade.classList.add('baixa-op');
                cardPrioridade.innerHTML = '<i class="bx bxs-circle"></i><h4>Baixa</h4>'; // verde
            }

            updateCardLocalStorage(oldInputValue, {text, prioridade: novaPrioridade});
        }
    });
};

// a incrivel barra de pesquisas ಠ_ರೃ
const getSearchedTarefas = (search) => {
    
    // seleciona todos as tarefa com a classe .card
    const Tarefas = document.querySelectorAll(".card")
    Tarefas.forEach((card) => {

        // converte o texto para minusculas a fim de facilitar a pesquisa
        const cardTitle = card.querySelector("h3").innerText.toLowerCase();

        // mantém o display flex para continuar visivel
        card.style.display = "flex";

        // se o texto da tarefa não contiver a pesquisa, esconde com display none
        if (!cardTitle.includes(search)) {
            card.style.display = "none";
        }
    });
};

//galera olha o filtro de tarefas ✍(◔◡◔)
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

                    //if card tiver a classe done, mantém o display flex
                    ? (card.style.display = "flex")//esta sendo exibido

                    // else se não tiver a classe, esconde com display none
                    : (card.style.display = "none");//desapareceu (ㆆ_ㆆ)

                break;
            
            case "urgente-op":
                prioridades && prioridades.classList.contains("urgente-op")

                    //if card tiver a classe urgente-op, mantém o display flex
                    ? (card.style.display = "flex")

                    // else se não tiver a classe, esconde com display none
                    : (card.style.display = "none");
                

                break;
            
            case "normal-op":
                prioridades && prioridades.classList.contains("normal-op")

                    //if card tiver a classe normal-op, mantém o display flex
                    ? (card.style.display = "flex")

                    // else se não tiver a classe, esconde com display none
                    : (card.style.display = "none");

                break;
            
            case "baixa-op":
                prioridades && prioridades.classList.contains("baixa-op")

                    //if card tiver a classe baixa-op, mantém o display flex
                    ? (card.style.display = "flex")

                    // else se não tiver a classe, esconde com display none
                    : (card.style.display = "none");

                break;
                
            default:
                break;
        }
    });
};



//eventos

//tirando a função de resetar a pagina depois do enviar
//só anotando aqui que os eventListener faz com que os botões n precisem de onclick 
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const inputValue = formInput.value;

    if(inputValue) {
        saveCard(inputValue)
    }
});

//marcar tarefa como concluida
//mais 1 deles ( ˘︹˘ )
document.addEventListener("click", (evento) => {
    
    const targetEl = evento.target;
    const parentEl = targetEl.closest(".card");
    let cardTitle;
    
    if(parentEl && parentEl.querySelector("h3")) {
        cardTitle = parentEl.querySelector("h3").innerText || "";
    }
    
    if(targetEl.classList.contains("btn-success")) {
        // se o botão de success for clicado ele troca o classList para done
        parentEl.classList.toggle("done");

        updateTarefastatusLocalStorage(cardTitle);
        //e arruma no local storage
    }
    
    if(targetEl.classList.contains("btn-warning")) {
        toggleForms();
        
        editInput.value = cardTitle;
        oldInputValue = cardTitle; 
        //o old input só ta aqui com o card pra manter a referencia de antes de alterar
    }
    
    if(targetEl.classList.contains("btn-danger")) {
        parentEl.remove();

        removeCardLocalStorage(cardTitle);
        //removeu do local storage
    }
});

cancelEdit.addEventListener("click", (evento) => {
    evento.preventDefault();

    toggleForms();
    //faz o cancel cancelar olha que lindo quem diria né
});

editForm.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const editInputValue = editInput.value;
    const novaPrioridade = document.querySelector('#edit-prioridade').value;


    if(editInputValue) {
        updateCard(editInputValue, novaPrioridade);
    }

    toggleForms()
});
// o search 
// aqui ele pega o que o usuario digita e procura
searchInput.addEventListener("keyup", (evento) => {
    const search = evento.target.value;// pega o valor digitado
    
    getSearchedTarefas(search); //procura com get search
});
// botão de deltar
//quem imaginaria... mas é bom anotar
deleteBtn.addEventListener("click", (evento) => {
    evento.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
    // essa parte atualiza a lista de tarefas 
});

filterBtn.addEventListener("change", (evento) => {
    const filterValue = evento.target.value;
    
    filterTarefas(filterValue);
});


//O tal do local storage (ง︡'-'︠)ง
const getTarefasLocalStorage = () => {
    const Tarefas = JSON.parse(localStorage.getItem("Tarefas")) || [];
    //pega as tareas e faz elas serem armazenadas como string json como eu entendi

    return Tarefas;
};

const loadTarefas = () => {

    lista.innerHTML = ''; // Limpa a lista antes de carregar as tarefas, para não duplicar 

    const Tarefas = getTarefasLocalStorage();// aqui ele pega as terefas armazenadas

    Tarefas.forEach((card) => {
        saveCard(card.text, card.prioridade, card.done, 0)});
        //aqui ele salva no card pegando o texto o bool
};

const saveCardLocalStorage = (card) => {
    const Tarefas = getTarefasLocalStorage();

    Tarefas.push(card);

    localStorage.setItem("Tarefas", JSON.stringify(Tarefas));
    //aqui ele salva as coisas novas no local storage e transforma em JSON com o stringfy
};

const removeCardLocalStorage = (cardText) => {
    const Tarefas = getTarefasLocalStorage();

    const filterTarefas = Tarefas.filter((card) => card.text != cardText);
    // Filtra o array de tarefas para remover a tarefa que possui o texto (card.text) correspondente ao cardText fornecido.

    localStorage.setItem("Tarefas", JSON.stringify(filterTarefas));
    //salva atualizado
};

//pra marcar se ela ta feita ou n
const updateTarefastatusLocalStorage = (cardText) => {
    const Tarefas = getTarefasLocalStorage();

    Tarefas.map((card) =>
    card.text === cardText ? (card.done = !card.done) : null
    //Usa o método map para ver cada tarefa, se encontrar a tarefa com o texto correspondente a cardText, inverte o valor do status done.
);

    localStorage.setItem("Tarefas", JSON.stringify(Tarefas));
};

const updateCardLocalStorage = (cardOldText, cardNewText) => {
    const Tarefas = getTarefasLocalStorage();

    Tarefas.map((card) =>
        card.text === cardOldText
        //if encontrar
        ? (card.text = cardNewText.text, card.prioridade = cardNewText.prioridade)
        //else se não encontrar
        : null
    );//Usa map para encontrar a tarefa com o texto cardOldText e, se encontrada, atualiza o texto (text) e a prioridade (prioridade) com os valores de cardNewText

    localStorage.setItem("Tarefas", JSON.stringify(Tarefas));//atualiza
};

loadTarefas();//exibe as tarefas

//acabou finalmente eu acho (╥﹏╥)

//com isso concluo que deve ser melhor com banco de dados