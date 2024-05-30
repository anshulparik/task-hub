/*
NOTE:
- When we use query selector, we get back the element we selected. But there is also potential
  for null and we also need to address that.
  - To handle this we always need to add optional chaining or id condition to check if btn is available.
  - *To handle this we can add not null(!) operator:
    - Ex: const btn = document.querySelector('.test-btn')!;
    - We add this to tell typescript that we are sure that element exists over here.


- By default we get the list of element properties that are present in all the elements of DOM
  and not for a specific element. To use specific properties we need to pass element type as generic.
  - Ex: const btn = document.querySelector<HTMLButtonElement>('.test-btn')!;  
  
  - We can use type assertion approach as well
    - Ex: const btn = document.querySelector(".test-btn")! as HTMLButtonElement;
  
- In line 40, event type is automatically predicted by typescript. Whereas in line 52
  we need to pass event type manually.    

*/

const taskForm = document.querySelector<HTMLFormElement>(".form");
const formInput = document.querySelector<HTMLInputElement>(".form-input");
const formButton = document.querySelector<HTMLButtonElement>(".btn");
const taskList = document.querySelector<HTMLUListElement>(".list");

type Task = {
  description: string;
  isCompleted: boolean;
};

const loadTasks = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const addTask = (task: Task): void => {
  tasks.push(task);
};

const renderTask = (task: Task): void => {
  const taskElement = document.createElement("li");
  taskElement.textContent = task.description;

  // checkbox
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;

  // toggle checkbox
  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    updateStorage()
  });

  taskElement?.appendChild(taskCheckbox);
  taskList?.appendChild(taskElement);
};

const updateStorage = (): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const tasks: Task[] = loadTasks();

if (tasks?.length > 0) {
  //   tasks?.forEach((task) => {
  //     renderTask(task);
  //   });

  tasks.forEach(renderTask);
}

// taskForm?.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const taskDescription = formInput?.value;
//     if(taskDescription){

//         formInput.value = '';
//         return;
//     }

//     alert("Please enter a task description!");
// })

const createTask = (event: SubmitEvent) => {
  event.preventDefault();
  const taskDescription = formInput?.value;
  if (taskDescription) {
    // add task to list
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    addTask(task);

    // render tasks
    renderTask(task);

    // update local storage
    updateStorage();

    formInput.value = "";
    return;
  }

  alert("Please enter a task description!");
};

taskForm?.addEventListener("submit", createTask);
