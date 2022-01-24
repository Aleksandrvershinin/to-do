function checkStorage() {
    let storage = localStorage.getItem('checkStorage');
    if (!storage) {
        storage = './todo-app/local_storage.js';
    }
    return storage
}
function saveStorage(params) {
  localStorage.setItem('checkStorage', params);
}
// создаем и возвращаем заголовок приложения
function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}
//  создаем и возвращаем форму для создания дела
function createTodoItemForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWraper = document.createElement('div');
    const button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWraper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWraper.append(button);
    form.append(input);
    form.append(buttonWraper);

    return {
        form,
        input,
        button,
    }
}

//  создаем и возвращаем список элементов
function createTodoList() {
    const list = document.createElement('li');
    list.classList.add('list-group');
    return list;
}

function createTodoItemElement(todoItem, { onDone, onDelete }) {
    const doneClass = 'list-group-item-success'

    const item = document.createElement('li');
    const buttonGroup = document.createElement('div');
    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = todoItem.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Done';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Delete';

    function markerItem() {
        item.classList.toggle(doneClass, todoItem.done);
    }
    doneButton.addEventListener('click', () => {
        onDone({ todoItem, element: item });
        markerItem();
    });
    markerItem();
    deleteButton.addEventListener('click', function() {
        onDelete({ todoItem, element: item });
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
    return item;
}

async function createTodoApp(container, {
    title,
    owner,
    todoItemList = [],
    onCreateFormSubmit,
    onDoneClick,
    onDeleteClick,
}) {

    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();
    const handlers = { onDone: onDoneClick, onDelete: onDeleteClick }

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemList.forEach(todoItem => {
        const todoItemElement = createTodoItemElement(todoItem, handlers);
        todoList.append(todoItemElement);
    });

    todoItemForm.form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!todoItemForm.input.value) {
            return;
        }
        const todoItem = await onCreateFormSubmit({
            owner,
            name: todoItemForm.input.value.trim(),
        });

        const todoItemElement = createTodoItemElement(todoItem, handlers);

        todoList.append(todoItemElement);
        todoItemForm.input.value = '';
    });
}

export { createTodoApp, checkStorage, saveStorage }
