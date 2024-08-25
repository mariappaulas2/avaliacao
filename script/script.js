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
const saveTodo = (text, done = 0, save = 1) => {

    //cria a div todo
    const todo = document.createElement('div');
    todo.classList.add('todo');
    
    //cria a bolinha de prioridade
    const todoPrioridade = document.createElement('div');
    todoPrioridade.classList.add('prioridade');
    todoPrioridade.innerHTML = '<i class="bx bxs-circle"></i>';

        //determina a cor da bolinha de acordo com a prioridade
        if (prioridade.value === 'urgente-op') {
            todoPrioridade.classList.add('urgente-op'); // vermelho
        } else if (prioridade.value === 'normal-op') {
            todoPrioridade.classList.add('normal-op'); // amarelo
        } else if (prioridade.value === 'baixa-op') {
            todoPrioridade.classList.add('baixa-op'); // verde
        }
    
    todo.appendChild(todoPrioridade);

    //cria o título do todo
    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);
    
    // cria a div dos botoes
    const todoButtons = document.createElement('div');
    todoButtons.classList.add('botoes');
    todo.appendChild(todoButtons);
    
    // cria o botão para marcar como concluído
    const finishTodo = document.createElement('button');
    finishTodo.classList.add('finish-todo');
    finishTodo.innerHTML = '<i class="bx bx-check"></i>';
    todoButtons.appendChild(finishTodo);
    
    // cria o botão para editar a tarefa
    const editTodo = document.createElement('button');
    editTodo.classList.add('edit-todo')	;
    editTodo.innerHTML = '<i class="bx bxs-pencil"></i>';
    todoButtons.appendChild(editTodo);
    
    // cria o botão para deletar a tarefa
    const deleteTodo = document.createElement('button');
    deleteTodo.classList.add('delete-todo');
    deleteTodo.innerHTML = '<i class="bx bxs-trash-alt"></i>';
    todoButtons.appendChild(deleteTodo);
    
    // adiciona a classe
    if (done) {
        todo.classList.add('done');
    }

    //salva no local storage
    if (save) {
        saveTodoLocalStorage({text, done: 0, });
    }

    // salva tudo isso dentro da div lista
    lista.appendChild(todo);

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
const updateTodo = (text, novaPrioriade) => {
    const todos = document.querySelectorAll(".todo");
    
    todos.forEach(todo => {
        let todoTitle = todo.querySelector("h3")
        
        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            // atualiza a cor da bolinha de prioridade
            const todoPrioridade = todo.querySelector(".prioridade");


            todoPrioridade.classList.remove("urgente-op", "normal-op", "baixa-op");

            if (novaPrioriade === 'urgente-op') {
                todoPrioridade.classList.add('urgente-op'); // vermelho
            } else if (novaPrioriade === 'normal-op') {
                todoPrioridade.classList.add('normal-op'); // amarelo
            } else if (novaPrioriade === 'baixa-op') {
                todoPrioridade.classList.add('baixa-op'); // verde
            }

            updateTodoLocalStorage(oldInputValue, {text, prioridade: novaPrioriade});
        }
    });
};

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display = "flex";

        if (!todoTitle.includes(search)) {
            todo.style.display = "none";
        }
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const prioridades = todo.querySelector(".prioridade");
        
        switch(filterValue) {
            case "tudo-op":
                (todo.style.display = "flex");

                break;
                
            case "done-op":
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none");

                break;
            
            case "urgente-op":
                prioridades && prioridades.classList.contains("urgente-op")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none");
                

                break;
            
            case "normal-op":
                prioridades && prioridades.classList.contains("normal-op")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none");

                break;
            
            case "baixa-op":
                prioridades && prioridades.classList.contains("baixa-op")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none");

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
        saveTodo(inputValue)
    }
});

//marcar tarefa como concluida
document.addEventListener("click", (evento) => {
    
    const targetEl = evento.target;
    const parentEl = targetEl.closest(".todo");
    let todoTitle;
    
    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText || "";
    }
    
    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");

        updateTodoStatusLocalStorage(todoTitle);
    }
    
    if(targetEl.classList.contains("edit-todo")) {
        toggleForms();
        
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
    
    if(targetEl.classList.contains("delete-todo")) {
        parentEl.remove();

        removeTodoLocalStorage(todoTitle);
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
        updateTodo(editInputValue, novaPrioriade);
    }

    toggleForms()
});

searchInput.addEventListener("keyup", (evento) => {
    const search = evento.target.value;
    
    getSearchedTodos(search);
});

deleteBtn.addEventListener("click", (evento) => {
    evento.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (evento) => {
    const filterValue = evento.target.value;
    
    filterTodos(filterValue);
});



//O tal do local storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filterTodos = todos.filter((todo) => todo.text != todoText);

    localStorage.setItem("todos", JSON.stringify(filterTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
);

    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoOldText
        ? (todo.text = todoNewText.text, todo.prioridade = todoNewText.prioridade)
        : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();