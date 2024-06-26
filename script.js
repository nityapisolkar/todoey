// Function to add a task
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        var taskList = document.getElementById("taskList");
        var newTaskItem = document.createElement("li");
        newTaskItem.classList.add("task-item");

        var completeButton = document.createElement("span");
          completeButton.textContent = " ";
          completeButton.classList.add("complete-btn");
          completeButton.onclick = function() {
            moveTaskToCompleted(newTaskItem);
        };

        newTaskItem.appendChild(completeButton);

        var taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = taskText;
        newTaskItem.appendChild(taskTextSpan);

        taskList.appendChild(newTaskItem);

        taskInput.value = "";
    }
}

// Function to move task to completed items
function moveTaskToCompleted(taskItem) {
    var completedItems = document.getElementById("completedItems");
    var completedTask = taskItem.cloneNode(true);
      completedTask.classList.add("completed-item");

    // // Remove complete button from the completed task
    // var completeBtn = completedTask.querySelector(".complete-btn");
    //   completeBtn.parentNode.removeChild(completeBtn);

    // Add completed task to the completed items list
      completedItems.appendChild(completedTask);

    // Remove task from the task list
    taskItem.parentNode.removeChild(taskItem);
}
