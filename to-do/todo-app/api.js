export async function getTodoList(owner) {
    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    return await response.json();
}

export async function createTodoItem({ owner, name }) {
    const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            owner,
        })
    });
    return await response.json();
}

export async function switchTodoItemDone({ todoItem }) {
    todoItem.done = !todoItem.done;
    const response = fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: todoItem.done }),
    });

}

export async function deleteTodoItem({ element, todoItem }) {
    if (!confirm('Are you sure?')) {
        return
    };
    element.remove();
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'DELETE',
    });
}