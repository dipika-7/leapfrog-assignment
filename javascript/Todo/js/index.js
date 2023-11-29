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
        if (item.task.toLowerCase().includes(e.target.value.toLowerCase())) {
            searchTask.push(item)
            createElements(searchTask)
        }
    })
})

const createElements = (list) => {
    ulSection.innerHTML = ""
    for (let i = 0; i < list.length; i++) {
        const divForLi = document.createElement("div");
        divForLi.className = "listOfTask"
        divForLi.style.borderBottom = "1px solid black";
        ulSection.appendChild(divForLi);

        let taskItem = document.createElement("li");
        taskItem.style.padding = "20px 0";
        divForLi.appendChild(taskItem);

        taskItem.innerHTML = list[i].task;

        const divForButton = document.createElement("div");
        divForLi.appendChild(divForButton);

        // divForLi.className = "listOfTask"

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener('change', (e) => {
            updateTodoStatus(checkbox.checked, i)
        })
        if (list[i].status == "completed") {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
        divForButton.appendChild(checkbox);

        let removeItem = document.createElement("button");
        removeItem.innerHTML = "Delete"
        removeItem.setAttribute("class", "btn")
        removeItem.addEventListener("click", (e) => {
            removeTask(list, i)
        })
        divForButton.appendChild(removeItem);
    }
}

function updateTodoStatus(completed, index) {
    taskList[index].status = completed ? 'completed' : 'remaining';
}

const removeTask = (list, index) => {
    list.splice(index, 1);
    createElements(list);
}

const listOfTaskByStatus = (status) => {
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
    createElements(filteredTask);
}

const completedTask = document.getElementById("completedTask");
completedTask.addEventListener('click', (e) => listOfTaskByStatus("completed"))

const remainingTask = document.getElementById("remainingTask");
remainingTask.addEventListener('click', (e) => listOfTaskByStatus("remaining"))

const allTask = document.getElementById("allTask");
allTask.addEventListener('click', (e) => createElements(taskList));