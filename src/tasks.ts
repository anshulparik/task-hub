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
  
- In line 35, event type is automatically predicted by typescript. Whereas in line 47
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

const tasks: Task[] = [];

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
    formInput.value = "";
    return;
  }

  alert("Please enter a task description!");
};

taskForm?.addEventListener("submit", createTask);
