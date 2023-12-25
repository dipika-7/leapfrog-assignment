import "normalize.css";
import "./assets/styles/style.css";

import { Task } from "./Task";
import { TaskList } from "./TaskList";

const inputSection = document.getElementById("inputSection");
const iconBtn = document.getElementById("icon");
const searchSection = document.getElementById("searchSection");
const completedTask = document.getElementById("completed-task");
const remainingTask = document.getElementById("remaining-task");
const allTask = document.getElementById("allTask");
const ulSection = document.getElementById("list");

const taskList = new TaskList();

const createTask = (value: string): Task => {
  const task = new Task(value);
  taskList.addTask(task);
  return task;
};

const toogleCompleted = (id: string): Task => {
  const task = taskList.getTaskById(id);

  if (!task) {
    throw new Error(`taskId  ${toogleCompleted} not found`);
  }

  if (task) {
    task.toogleCompleted();
  }
  return task;
};

function search(list: TaskList, searchItem: string = ""): TaskList {
  const tasks = list.list.filter((item) => {
    return item.value.toLowerCase().includes(searchItem.toLowerCase());
  });
  return new TaskList(tasks);
}

const createElements = (tasks: TaskList) => {
  if (!ulSection) throw new Error("DOM element not found");

  ulSection.innerHTML = "";
  tasks.list.forEach((list) => {
    const divForLi = document.createElement("div");
    divForLi.className = "task-item";
    divForLi.style.borderBottom = "1px solid black";
    ulSection.appendChild(divForLi);

    const taskItem = document.createElement("li");
    taskItem.style.padding = "20px 0";
    divForLi.appendChild(taskItem);

    taskItem.innerHTML = list.value;

    const divForButton = document.createElement("div");
    divForLi.appendChild(divForButton);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      toogleCompleted(list.id);
    });
    if (list.completed) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    divForButton.appendChild(checkbox);

    const removeItem = document.createElement("button");
    removeItem.innerHTML = "Delete";
    removeItem.setAttribute("class", "btn");
    removeItem.addEventListener("click", () => {
      removeTask(tasks, list.id);
    });
    divForButton.appendChild(removeItem);
  });
};

const removeTask = (list: TaskList, id: string) => {
  const index = list.list.findIndex((task: Task) => task.id == id);
  list.list.splice(index, 1);
  taskList.list.splice(index, 1);
  createElements(list);
};

searchSection?.addEventListener("input", (e) => {
  const searchVal = (e.target as HTMLInputElement)?.value;
  const filteredTask = search(taskList, searchVal);
  createElements(filteredTask);
});

const addTask = (e: Event) => {
  const taskInput = (e.target as HTMLInputElement)?.value;
  if (taskInput !== "") {
    createTask((e.target as HTMLInputElement)?.value);
    createElements(taskList);
    (e.target as HTMLInputElement).value = "";
  }
};

inputSection?.addEventListener("change", addTask);

iconBtn?.addEventListener("click", addTask);

function listOfTaskByStatus(
  list: TaskList,
  completed: boolean = true
): TaskList {
  const tasks = list.list.filter((item) => {
    return item.completed === completed;
  });
  return new TaskList(tasks);
}

completedTask?.addEventListener("click", () => {
  const newTaskList = listOfTaskByStatus(taskList, true);
  createElements(newTaskList);
});

remainingTask?.addEventListener("click", () => {
  const newTaskList = listOfTaskByStatus(taskList, false);
  createElements(newTaskList);
});

allTask?.addEventListener("click", () => {
  createElements(taskList);
});
