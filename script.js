$(document).ready(function() {
    let tasks = [];
  
  
    // Load tasks from localStorage on page load
    if (localStorage.tasks) {
      tasks = JSON.parse(localStorage.tasks);
      renderTasks(tasks);
    }
  
  
    $("#task-form").on("submit", function(event) {
      event.preventDefault();
  
  
      var taskInput = $("#task-input").val();
      if (taskInput.trim() !== '') {
        tasks.push({ text: taskInput, completed: false });
        saveTasks();
        renderTasks(tasks);
        $("#task-input").val(""); // Clear input
      }
    });
  
  
    // Event delegation to handle task completion and removal
    $("#task-list").on("click", "li", function() {
      var index = $(this).index();
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks(tasks);
    });
  
  
    function renderTasks(tasks) {
      var taskList = $("#task-list");
      taskList.empty();
  
  
      tasks.forEach((task, index) => {
        var listItem = $("<li>").text(task.text);
        if (task.completed) {
          listItem.addClass("completed");
        }
  
  
        taskList.append(listItem);
      });
    }
  
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  