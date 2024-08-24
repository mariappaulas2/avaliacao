const storageForm = document.querySelector('#storage');
const storageInput = document.querySelector('#storageInput');
const lista = document.querySelector('.lista-todo');
const editStorage = document.querySelector('#editStorage');
const editInput = document.querySelector('#editInput');
const cancelEdit = document.querySelector('#cancelEdit');

//eventos
storageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    //tirando a função de resetar a pagina depois do enviar
    
    const inputValue = storageInput.value;

    if(inputValue) {
        saveTodo(inputValue)
    }
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

    lista.appendChild(todo);
}