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

function moveTaskToCompleted(taskItem) {
    var completedItems = document.getElementById("completedItems");
    var completedTask = taskItem.cloneNode(true);
      completedTask.classList.add("completed-item");

    //adding that task to completed items list
      completedItems.appendChild(completedTask);

    //removing the task from the original todo list
    taskItem.parentNode.removeChild(taskItem);
}

//new function that will move a completed task back to the to-do list
//step 1: remove the task item (and the complete button) from the completed list
//step 2: add the task item back to the to-do list 
  //but don't keep the styling for "completed items," change the styling back
