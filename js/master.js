let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// The Empty Array
let arrayOfTasks = [];

//check if there is elements on local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger the function
getTasksFromLocalStorage();

// Add Tasks
submit.addEventListener("click", function () {
    if (input.value !== "") {
        addTasksToArray(input.value); //send the value To Array

        input.value = ""; // Empty The Value Of The Input
    }
});

// add tasks to array function
function addTasksToArray(taskText) {
    //task Date
    const task = {
        id: Date.now(),
        title: taskText,
        compluted: false,
    };
    //Put The Values To The Array
    arrayOfTasks.push(task);
    //add tasks to page
    addElemntsToPageFrom(arrayOfTasks);
    // add tasks to local storage
    addTasksToLocalStorage(arrayOfTasks);
}

function addElemntsToPageFrom(arrayOfTasks) {
    // empty the tasks div
    tasksDiv.innerHTML = "";
    // looping on array of tasks
    arrayOfTasks.forEach((task) => {
        // Create The Main Div
        let div = document.createElement("div");
        div.className = "task";
        // check if the task done or not
        if (task.compluted) {
            div.className = "task ok";
        }
        div.setAttribute("date-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // create the done button to the page
        let done = document.createElement("span");
        done.className = "done";
        done.appendChild(document.createTextNode("Done"));
        // append done button
        div.appendChild(done);
        // create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // append the delete button to the div
        div.appendChild(span);
        // add task to the tasks div
        tasksDiv.appendChild(div);
    });
}

function addTasksToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getTasksFromLocalStorage() {
    let date = window.localStorage.getItem("tasks");
    if (date) {
        let tasks = JSON.parse(window.localStorage.getItem("tasks"));
        addElemntsToPageFrom(tasks);
    }
}

// delete the task from page and local storage
// or make it done
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        // Remove The Element from the page
        e.target.parentElement.remove();

        // remove the Element from localStorage
        deleteTaskWith(e.target.parentElement.getAttribute("date-id"));
    }
    if (e.target.classList.contains("done")) {
        // toggle the done class from done task
        e.target.parentElement.classList.toggle("ok");

        //toggle the class ok
        toggleStatusTaskWith(e.target.parentElement.getAttribute("date-id"));
    }
});

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTasksToLocalStorage(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].compluted == false
                ? (arrayOfTasks[i].compluted = true)
                : (arrayOfTasks[i].compluted = false);
        }
    }
    addTasksToLocalStorage(arrayOfTasks);
}
