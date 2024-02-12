import { TaskDiv } from "./TaskDiv";
import {
  parseJSON,
  isToday,
  isWithinInterval,
  addDays,
  startOfDay,
  formatISO,
} from "date-fns";
import { stylingFunctions } from "./stylingFunctions";
import { displayProjectTasks } from "./interface";
import { clickActions } from "./clickActions";

const storageFunctions = {
  storeLocally(taskName, dueDate, description, priority, notes, project) {
    let counter = 0;
    if (localStorage.getItem(taskName + "number")) {
      counter = parseInt(localStorage.getItem(taskName + "number")) + 1;
    }
    localStorage.setItem(
      taskName,
      JSON.stringify({
        title: taskName,
        dueDate: dueDate,
        description: description,
        priority: priority,
        notes: notes,
        project: project,
        number: counter,
      })
    );
  },

  clearLocalStorage() {
    if (localStorage) {
      localStorage.clear();
    }
  },

  completeTaskAndRemove(taskId) {
    localStorage.removeItem(taskId);
    console.log(`Task with ID ${taskId} has been removed from storage.`);
  },

  populateDummyLocalStorage(numberOfObjects) {
    this.clearLocalStorage();
    let currentCount = localStorage.length;

    for (let i = 0; i < numberOfObjects; i++) {
      const taskID = `Task-${i+1}`;
      // Manual date selection
      // JavaScript's Date object indexes months starting from 0
      // Random date
      // let dueDate = new Date(
      //   new Date().getFullYear() + Math.floor(Math.random() * 3),
      //   Math.floor(Math.random() * 12),
      //   Math.floor(Math.random() * 28) + 1
      // );
      // getFullyear gets the current year. Random * 3 adds a random number between 0 and 2 and adds it to the current year. Month random 0-11, Day random 1-28
      // let dueDateISO = dueDate.toISOString();
      let dueDate = formatISO(new Date(2024, 1, 9),{representation:'date'})
      // console.log(`Due date for task ${i}:`, dueDate);
      const value = {
        taskID: `task-${i+1}`,
        title: `taskName${currentCount + i}`,
        dueDate: dueDate,
        description: "the description",
        priority: "1",
        notes: "notes",
        project: "example project",
        number: currentCount + i,
      };
      localStorage.setItem(taskID, JSON.stringify(value));
    }
  },

  // parse local storage and assign a unique taskID to each task within it
  parsedStorage() {
    let localStorageItems = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const parsedValue = JSON.parse(value);
      if (parsedValue && typeof parsedValue === "object") {
        parsedValue.taskId = key;
      }
      localStorageItems[key] = parsedValue;
    }
    return localStorageItems;
  },

  getTodaysTasks(localStorageItems) {
    let tasksDueToday = {};
    for (let key in localStorageItems) {
      if (localStorageItems.hasOwnProperty(key)) {
        let taskDate = parseJSON(localStorageItems[key].dueDate);
        if (isToday(taskDate)) {
          tasksDueToday[key] = localStorageItems[key];
        }
      }
    }
    return tasksDueToday;
  },

  displayTodaysTasks() {
    const tasksDueToday = this.getTodaysTasks(this.parsedStorage());
    const todayContainerDiv = document.getElementById("todayContainerDiv");
    // todayContainerDiv.innerHTML = "";
    Object.keys(tasksDueToday).forEach((key) => {
      const task = tasksDueToday[key];

      const newTaskDiv = new TaskDiv(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        task.project,
        "todayContainerDiv"
      );
    });

    // Trying something new. This applies styling to only the tasks with class name task-item from the constructor TaskDiv
    const taskItems = todayContainerDiv.querySelectorAll(".task-item");
    taskItems.forEach((taskItem) => {
      stylingFunctions.todayItemStyling(taskItem);
    });
  },
  getWeekTasks(localStorageItems) {
    const today = startOfDay(new Date());
    // seven days from today
    const endOfWeek = addDays(today, 7);

    let tasksDueWeek = {};

    Object.keys(localStorageItems).forEach((key) => {
      const task = localStorageItems[key];
      const taskDate = startOfDay(new Date(task.dueDate));

      // Check date is within the next 7 days
      if (isWithinInterval(taskDate, { start: today, end: endOfWeek })) {
        tasksDueWeek[key] = task;
      }
    });

    return tasksDueWeek;
  },
  displayWeekTasks() {
    const tasksDueWeek = this.getWeekTasks(this.parsedStorage());
    const weekContainerDiv = document.getElementById("weekContainerDiv");
    // todayContainerDiv.innerHTML = "";
    Object.keys(tasksDueWeek).forEach((key) => {
      const task = tasksDueWeek[key];

      const newTaskDiv = new TaskDiv(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        task.project,
        "weekContainerDiv"
      );
    });

    // Trying something new. This applies styling to only the tasks with class name task-item from the constructor TaskDiv
    const taskItems = weekContainerDiv.querySelectorAll(".task-item");
    taskItems.forEach((taskItem) => {
      stylingFunctions.weekItemStyling(taskItem);
    });
  },
  displayProjectNames() {
    const projectsContainerDiv = document.getElementById(
      "projectsContainerDiv"
    );
    if (!projectsContainerDiv) {
      console.error("projectsContainerDiv not found.");
      return;
    }

    // Clear to prevent clones
    projectsContainerDiv.innerHTML = "";

    const localStorageItems = this.parsedStorage();
    // Set() is really cool. A value in a set can only occur once! So everything in the set is unique.
    const projectNames = new Set();

    //  extract project names from localStorageItems
    Object.values(localStorageItems).forEach((item) => {
      if (item.project && !projectNames.has(item.project)) {
        projectNames.add(item.project);
        const projectDiv = document.createElement("div");
        // Text is set as project name
        projectDiv.textContent = item.project;
        projectDiv.classList.add("project-name");
        stylingFunctions.projectNameStyling(projectDiv);
        projectsContainerDiv.appendChild(projectDiv);
        projectDiv.addEventListener("click", () =>
          clickActions.showProjectTasks(item.project)
        );
      }
    });
  },

  getTaskDetails(taskId) {
    console.log("getTaskDetails invoked.");
    const localStorageItems = this.parsedStorage();
    console.log("Tasks in Storage:", localStorageItems);
    if (localStorageItems.hasOwnProperty(taskId)) {
      const taskDetails = localStorageItems[taskId];
      console.log("getTaskDetails returns:", taskDetails);
      return taskDetails;
    } else {
      console.log("There was no taskID");
      return null;
    }
  },

  updateTask(taskId, newDetails) {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "{}");
    if (tasks[taskId]) {
      tasks[taskId] = { ...tasks[taskId], ...newDetails };
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  },
};

export { storageFunctions };
