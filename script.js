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
}

function deleteTask(taskItem) {
    taskItem.parentNode.removeChild(taskItem);
}

function editTask(taskItem) {
    //get the current task text
    var taskTextSpan = taskItem.querySelector(".task-text");
    var currentText = taskTextSpan.textContent;

    //create an input field with the current task text
    var inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentText;
    inputField.classList.add("task-edit-input");

    //replace the task text with the input field
    taskItem.replaceChild(inputField, taskTextSpan);

    //hide the pencil and trash icons, and add a checkmark icon
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
    //get the new task text from the input field
    var newText = inputField.value.trim();

    if (newText !== "") {
        //create a new span element with the new task text
        var taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = newText;
        taskTextSpan.classList.add("task-text");

        //replace the input field with the new task text
        taskItem.replaceChild(taskTextSpan, inputField);

        //show the pencil and trash icons, but remove the checkmark icon
        var iconsDiv = taskItem.querySelector(".icons");
        var pencilIcon = iconsDiv.querySelector(".fa-pencil");
        var trashIcon = iconsDiv.querySelector(".fa-trash");
        var checkIcon = iconsDiv.querySelector(".fa-check");
        pencilIcon.style.display = "";
        trashIcon.style.display = "";

        iconsDiv.removeChild(checkIcon);
    }
}
