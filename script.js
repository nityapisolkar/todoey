let taskIdCounter = 0;

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        var taskList = document.getElementById("taskList");
        var newTaskItem = document.createElement("li");
        newTaskItem.classList.add("task-item");
        newTaskItem.setAttribute("id", "task-" + taskIdCounter);
        taskIdCounter++;

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
            //logic for edit (gonna add this later)
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

        taskList.appendChild(newTaskItem);

        taskInput.value = "";
    }
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

    completedItems.appendChild(completedTask);
    taskItem.parentNode.removeChild(taskItem);
}

function moveTaskBackToTodo(taskItem) {
    var taskList = document.getElementById("taskList");
    var todoTask = taskItem.cloneNode(true);
    todoTask.classList.remove("completed-item");

    var completeButton = todoTask.querySelector(".complete-btn");
    completeButton.onclick = function() {
        moveTask(todoTask);
    };

    taskList.appendChild(todoTask);
    taskItem.parentNode.removeChild(taskItem);
}

function deleteTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
}
