const inputSection = document.getElementById('inputSection');
const mainSection = document.getElementById('main');
const ulSection = document.getElementById("list");
const taskList = [];

inputSection.addEventListener("change", (e) => {
    if (!e.target.value == "") {
        taskList.push({
            task: e.target.value,
            status: "remaining"
        });
        createElements(taskList)
    }
});

const searchSection = document.getElementById("searchSection");
searchSection.addEventListener("input", (e) => {
    const searchTask = []
    const task = taskList.map((item) => {
        if (item.task == e.target.value) {
            searchTask.push(item)
        }
    })
    createElements(searchTask)
})

const createElements = (list) => {
    ulSection.innerHTML = ""
    for (let i = 0; i < list.length; i++) {
        const divForLi = document.createElement("div");
        divForLi.className = "listOfTask"
        divForLi.style.borderBottom = "1px solid black";
        // divForLi.style.padding = "10px";

        ulSection.appendChild(divForLi);

        var taskItem = document.createElement("li");
        taskItem.style.padding = "20px 0";
        divForLi.appendChild(taskItem);
        taskItem.innerHTML = list[i].task;

        let checkbox = document.createElement("input");
        // checkbox.style.
        checkbox.type = "checkbox";
        checkbox.addEventListener('click', (e) => {
            updateTodoStatus(taskItem, checkbox.checked, i)
        })
        if (list[i].status == "completed") {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
        divForLi.appendChild(checkbox);
    }
}

function updateTodoStatus(todoItem, completed, index) {
    taskList[index].status = completed ? 'completed' : 'remaining';
    console.log(taskList)
    // if (completed) {
    //     todoItem.classList.add('completed');
    // } else {
    //     todoItem.classList.remove('completed');
    // }
}

const listOfTaskByStatus = (status) => {
    console.log("taskList", taskList)
    let filteredTask = [];
    if (status == "completed") {
        const completed = taskList.map((item) => {
            if (item.status == "completed") {
                filteredTask.push(item)
            }
        })
    } else {
        const remained = taskList.filter((item) => {
            if (item.status == "remaining") {
                filteredTask.push(item)
            }
        })
    }
    console.log("filteredTask", filteredTask)
    createElements(filteredTask);
}

const completedTask = document.getElementById("completedTask");
completedTask.addEventListener('click', (e) => listOfTaskByStatus("completed"))

const remainingTask = document.getElementById("remainingTask");
remainingTask.addEventListener('click', (e) => listOfTaskByStatus("remaining"))


const completedTask1 = document.getElementById("completedTask1");
completedTask1.addEventListener('click', (e) => listOfTaskByStatus("completed"))

const remainingTask2 = document.getElementById("remainingTask2");
remainingTask2.addEventListener('click', (e) => listOfTaskByStatus("remaining"));

const allTask = document.getElementById("allTask");
allTask.addEventListener('click', (e) => createElements(taskList));