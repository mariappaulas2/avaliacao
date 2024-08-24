const storageForm = document.querySelector('.storage');
const storageInput = document.querySelector('#storageInput');
const lista = document.querySelector('.lista-todo');
const editStorage = document.querySelector('.editStorage');
const editInput = document.querySelector('#editInput');
const cancelEdit = document.querySelector('#cancelEdit');

let oldInputValue;


//eventos

//tirando a função de resetar a pagina depois do enviar
storageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const inputValue = storageInput.value;

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
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    
    if(targetEl.classList.contains("finish-todo")) {
        console.log('finalizado');
        parentEl.classList.toggle("done");
    }
    
    if(targetEl.classList.contains("edit-todo")) {
        toggleForms();
        
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
    
    if(targetEl.classList.contains("delete-todo")) {
        parentEl.remove();
    }
})

cancelEdit.addEventListener("click", (evento) => {
    evento.preventDefault();

    toggleForms();
});

editStorage.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const editInputValue = editInput.value;
    
    if(editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms()
});


//funções

//salvar tarefa
const saveTodo = (text) => {

    //cria a div todo
    const todo = document.createElement('div');
    todo.classList.add('todo');

    //cria o título do todo
    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    // cria a div dos botoes
    const todoButtons = document.createElement('div');
    todoButtons.classList.add('botoes')
    todo.appendChild(todoButtons);

    // cria o botão para marcar como concluído
    const finishTodo = document.createElement('button')
    finishTodo.classList.add('finish-todo')
    finishTodo.innerHTML = '<i class="bx bx-check"></i>'
    todoButtons.appendChild(finishTodo)

    // cria o botão para editar a tarefa
    const editTodo = document.createElement('button')
    editTodo.classList.add('edit-todo')	
    editTodo.innerHTML = '<i class="bx bxs-pencil"></i>'
    todoButtons.appendChild(editTodo)

    // cria o botão para deletar a tarefa
    const deleteTodo = document.createElement('button')
    deleteTodo.classList.add('delete-todo')
    deleteTodo.innerHTML = '<i class="bx bxs-trash-alt"></i>'
    todoButtons.appendChild(deleteTodo)

    // salva tudo isso dentro da div lista
    lista.appendChild(todo);

    // limpa o input, para criar outra tarefa
    storageInput.value = "";

    // mantem o foco para o input
    storageInput.focus();
};

//mostrar form para editar, e esconder irrelevantes
const toggleForms = () => {
    editStorage.classList.toggle("hide");
    storageForm.classList.toggle("hide");
    lista.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');
    
    todos.forEach(todo => {

        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
};