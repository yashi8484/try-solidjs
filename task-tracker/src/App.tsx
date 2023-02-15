import { Component, createSignal, For } from 'solid-js';

const App: Component = () => {
  type Task = {
    id: string;
    text: string;
    completed: boolean;
  }

  const [taskList, setTaskList] = createSignal([] as Task[]);

  const addTask = (e: Event) => {
    // prevent the default reload behavior when we submit our form.
    e.preventDefault();

    const taskInput = document.querySelector("#taskInput") as HTMLInputElement;

    const newTask: Task = {
      id: Math.random().toString(36).substring(2),
      text: taskInput.value,
      completed: false,
    }

    setTaskList([newTask, ...taskList()]);
    taskInput.value = '';
  }

  const deleteTask = (taskId: string) => {
    const newTaskList = taskList().filter((task) => task.id !== taskId);
    setTaskList(newTaskList);
  }

  return (
    <div class="container mt-5 text-center">
      <h1 class="mb-4">Whattodo!</h1>

      <form class="mb-5 row row-cols-2 justify-content-center" onSubmit={(e) => addTask(e)}>
        <input type="text" class="input-group-text p-1 w-25" placeholder="Add task here..." id="taskInput" required />

        <button class="btn btn-primary ms-3 w-auto" type="submit">
          Add task
        </button>
      </form>
      <div>
        <h4 class="text-muted mb-4">Tasks</h4>
        <For each={taskList()}>
          {(task: Task) => (
            <div class="row row-cols-3 mb-3 justify-content-center">
              <button class="btn btn-danger w-auto" onClick={() => deleteTask(task.id)}>X</button>
              <div class="bg-light p-2 mx-2">{task.text}</div>
              <input type="checkbox" checked={task.completed} role="button" class="form-check-input h-auto px-3" />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;
