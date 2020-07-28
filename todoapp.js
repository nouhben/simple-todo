//GET THE UI ELEMENTS: selectors
const todo_input = selectElement('#todo-input');
const addTodo_btn = selectElement('.add-todo-btn');
const todo_list = selectElement('.todo-list');
const allRadio = selectElement('#all');
const doneRadio = selectElement('#done');
const deletedRadio = selectElement('#deleted');

const deletedTodos = [];
//ATTAHCE EVENT LISTENERS
addTodo_btn.addEventListener('click', addTodo);
todo_list.addEventListener('click', deleteDone);
allRadio.addEventListener('click', radioUpdate);
doneRadio.addEventListener('click', radioUpdate);
deletedRadio.addEventListener('click', radioUpdate);
//ADD FUNCTIONALITIES
function addTodo(event) {
    //prevent form from submiting
    event.preventDefault();
    //UI ELEMENTS
    const todo = createElement('div', 'todo');

    const deleteBtn = createElement('button', 'delete-btn');
    deleteBtn.innerHTML = '&cross;';
    //deleteBtn.addEventListener('click', deleteTodo);

    const doneBtn = createElement('button', 'done-btn');
    doneBtn.innerHTML = '&check;';
    const newTodo = createElement('li', 'todo-item');
    newTodo.innerText = todo_input.value;
    //empty the input
    todo_input.value = '';
    //add the created elemnts to thier parents and then add the to DOM
    todo.appendChild(newTodo);
    todo.appendChild(deleteBtn);
    todo.appendChild(doneBtn);

    todo_list.appendChild(todo);
}
//add the delete funtionality
function deleteTodo(event) {
    event.target.parentElement.classList.toggle('deleted');
    //event.target.parentElement.remove();
}

function deleteDone(event) {
    if (event.target.classList[0] == 'delete-btn') {
        //add the class for animation of falling and the remove will be triggred once the annimation ends
        const todo = event.target.parentElement;
        //register the todo before removing it
        deletedTodos.push(todo);
        //Animation
        todo.classList.add('fall');
        //remove the todo from dom when transition ends
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
        return;
    }
    if (event.target.classList.contains('done-btn')) {
        event.target.parentElement.classList.toggle('done');
    }
}
function radioUpdate(event) {
    if (event.target.id === 'deleted') {
        //hide the list of todos
        const todos = document.getElementsByClassName('todo');
        for (let index = 0; index < todos.length; index++) {
            todos[index].classList.add('hide');
        }
        //get the deleted todos and addd them to the list
        const frag = document.createDocumentFragment();
        deletedTodos.forEach(todo => {
            todo.classList.remove('fall');
            frag.appendChild(todo);
            todo_list.appendChild(frag);
        });
    }
    if (event.target.id === 'done') {
        const todos = document.getElementsByClassName('todo');
        for (let index = 0; index < todos.length; index++) {
            if (!todos[index].classList.contains('done')) {
                todos[index].classList.toggle('hide');
            }
        }
    }
    if (event.target.id == 'all') {
        const todos = document.getElementsByClassName('todo');
        for (let index = 0; index < todos.length; index++) {
            if (todos[index].classList.contains('hide')) {
                todos[index].getElementsByClassName.display = 'block';
                todos[index].classList.remove('hide');
            }
        }
    }
}

//UTILITY FUNCTIONS
function selectElement(name) {
    const e = document.querySelector(name);
    return e;
}
function createElement(name, classes) {
    const e = document.createElement(name);
    e.classList.add(classes);
    return e;
}