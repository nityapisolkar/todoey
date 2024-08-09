let taskIdCounter = 0;

function addTask(taskText = null, isCompleted = false) {
    //if taskText is null: adding a new task, not loading from local storage
    if (!taskText) {
        var taskInput = document.getElementById("taskInput");
        taskText = taskInput.value.trim();
        if (taskText === "") {
            return; 
        }
        taskInput.value = ""; 
    }

    var taskList = document.getElementById("taskList");
    var newTaskItem = document.createElement("li");
    newTaskItem.classList.add("task-item");
    newTaskItem.setAttribute("id", "task-" + taskIdCounter);
    taskIdCounter++;

    if (isCompleted) {
        newTaskItem.classList.add("completed-item");
    }

    var completeButton = document.createElement("span");
    completeButton.textContent = " ";
    completeButton.classList.add("complete-btn");
    completeButton.onclick = function() {
        moveTask(newTaskItem);
    };

    var taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = taskText;
    taskTextSpan.classList.add("task-text");

    var iconsDiv = document.createElement("div");
    iconsDiv.classList.add("icons");

    var pencilIcon = document.createElement("i");
    pencilIcon.classList.add("fa-solid", "fa-pencil");
    pencilIcon.onclick = function() {
        editTask(newTaskItem);
    };

    var trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash");
    trashIcon.onclick = function() {
        deleteTask(newTaskItem);
    };

    iconsDiv.appendChild(pencilIcon);
    iconsDiv.appendChild(trashIcon);

    newTaskItem.appendChild(completeButton);
    newTaskItem.appendChild(taskTextSpan);
    newTaskItem.appendChild(iconsDiv);

    if (isCompleted) {
        document.getElementById("completedItems").appendChild(newTaskItem);
    } else {
        taskList.appendChild(newTaskItem);
    }

    saveTasksToLocalStorage(); 
}



function moveTask(taskItem) {
    var taskList = document.getElementById("taskList");
    var completedItems = document.getElementById("completedItems");

    if (taskItem.parentNode === taskList) {
        moveTaskToCompleted(taskItem);
    } else {
        moveTaskBackToTodo(taskItem);
    }
}

function moveTaskToCompleted(taskItem) {
    var completedItems = document.getElementById("completedItems");
    var completedTask = taskItem.cloneNode(true);
    completedTask.classList.add("completed-item");

    var completeButton = completedTask.querySelector(".complete-btn");
    completeButton.onclick = function() {
        moveTask(completedTask);
    };

    var pencilIcon = completedTask.querySelector(".fa-pencil");
    pencilIcon.onclick = function() {
        editTask(completedTask);
    }; 

    var trashIcon = completedTask.querySelector(".fa-trash");
    trashIcon.onclick = function() {
        deleteTask(completedTask);
    };

    completedItems.appendChild(completedTask);
    taskItem.parentNode.removeChild(taskItem);
    saveTasksToLocalStorage();
}

function moveTaskBackToTodo(taskItem) {
    var taskList = document.getElementById("taskList");
    var todoTask = taskItem.cloneNode(true);
    todoTask.classList.remove("completed-item");

    var completeButton = todoTask.querySelector(".complete-btn");
    completeButton.onclick = function() {
        moveTask(todoTask);
    };

    var pencilIcon = todoTask.querySelector(".fa-pencil");
    pencilIcon.onclick = function() {
        editTask(todoTask);
    };

    var trashIcon = todoTask.querySelector(".fa-trash");
    trashIcon.onclick = function() {
        deleteTask(todoTask);
    };

    taskList.appendChild(todoTask);
    taskItem.parentNode.removeChild(taskItem);
    saveTasksToLocalStorage(); 
}

function deleteTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
    saveTasksToLocalStorage();
}

function editTask(taskItem) {
    var taskTextSpan = taskItem.querySelector(".task-text");
    var currentText = taskTextSpan.textContent;

    var inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentText;
    inputField.classList.add("task-edit-input");

    taskItem.replaceChild(inputField, taskTextSpan);

    var iconsDiv = taskItem.querySelector(".icons");
    var pencilIcon = iconsDiv.querySelector(".fa-pencil");
    var trashIcon = iconsDiv.querySelector(".fa-trash");
    pencilIcon.style.display = "none";
    trashIcon.style.display = "none";

    var checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid", "fa-check");
    checkIcon.onclick = function() {
        saveTask(taskItem, inputField);
    };

    iconsDiv.appendChild(checkIcon);
}


function saveTask(taskItem, inputField) {
    var newText = inputField.value.trim();

    if (newText !== "") {
        var taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = newText;
        taskTextSpan.classList.add("task-text");

        taskItem.replaceChild(taskTextSpan, inputField);

        var iconsDiv = taskItem.querySelector(".icons");
        var pencilIcon = iconsDiv.querySelector(".fa-pencil");
        var trashIcon = iconsDiv.querySelector(".fa-trash");
        var checkIcon = iconsDiv.querySelector(".fa-check");
        pencilIcon.style.display = "";
        trashIcon.style.display = "";

        iconsDiv.removeChild(checkIcon);
        saveTasksToLocalStorage();
    }
}


//saves tasks to local storage, self-explanatory
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach((taskItem) => {
        const taskText = taskItem.querySelector('.task-text').textContent;
        const isCompleted = taskItem.classList.contains('completed-item');
        tasks.push({ text: taskText, completed: isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.onload = function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedTasks) {
        savedTasks.forEach((task) => {
            addTask(task.text, task.completed);
        });
    }
};
