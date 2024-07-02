async function getAllToDos() {
  const response = await fetch(
    "https://playground.4geeks.com/todo/users/chriskeith01",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.todos.map((todo) => ({
    label: todo.label,
    done: todo.is_done,
    id: todo.id,
  }));
}
async function createToDo(userName, todo) {
  const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        label: todo.label,
        is_done: todo.done
    })
  });
  const responseData = await response.json();
  return responseData;
}
async function deleteToDo(todoId){
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.ok;
}
async function clearAllToDos(userName) {
    const todos = await getAllToDos(userName);
    await Promise.all(todos.map(todo => deleteToDo(todo.id)));
}
async function upDateToDos(todoId, todo) {
    const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${todoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            label: todo.label,
            is_done: todo.done
        })
      });

    const responseData = await response.json();
    return responseData;
  }

export {getAllToDos, createToDo, deleteToDo, clearAllToDos, upDateToDos}
