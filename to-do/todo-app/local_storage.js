export function getTodoList(owner) {
    const result = getLocalStorage();
    const todoItemList = result.filter(item => item.owner === owner);
    return todoItemList;
}

function getLocalStorage() {
    let result = localStorage.getItem('todoList');
    if (!result) {
        result = [];
    } else {
        result = JSON.parse(result);
    }
    return result
}

function setId(todoItemList) {
    let id = 1
    while (todoItemList.find(item => item.id === id)) {
        id++;
    }
    return id;
}
export function createTodoItem({ owner, name }) {
    const todoItemList = getLocalStorage();
    const id = setId(todoItemList);
    const item = {
        id: id,
        owner: owner,
        name: name,
        done: false,
    }
    todoItemList.push(item);
    localStorage.setItem('todoList', JSON.stringify(todoItemList));
    return item;
}

export function switchTodoItemDone({ todoItem }) {
    todoItem.done = !todoItem.done;
    const todoItemList = getLocalStorage();
    const index = todoItemList.findIndex(item => item.id === todoItem.id);
    if (index !== -1) {
        todoItemList[index].done = todoItem.done;
    }
    localStorage.setItem('todoList', JSON.stringify(todoItemList));
}

export async function deleteTodoItem({ element, todoItem }) {
    if (!confirm('Are you sure?')) {
        return
    };
    element.remove();
    const todoItemList = getLocalStorage();
    const index = todoItemList.findIndex(item => item.id === todoItem.id);
    if (index !== -1) {
        todoItemList.splice(index, 1);
    }
    localStorage.setItem('todoList', JSON.stringify(todoItemList));
}