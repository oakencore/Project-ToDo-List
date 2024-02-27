import { TaskDiv } from "./TaskDiv";
import {
  parseJSON,
  parseISO,
  isToday,
  isWithinInterval,
  addDays,
  startOfDay,
  formatISO,
} from "date-fns";
import { stylingFunctions } from "./stylingFunctions";
import { clickActions } from "./clickActions";
import { v4 as uuidv4 } from "uuid";

const storageFunctions = {
  storeLocally(taskDetails) {
    const { taskId, title, dueDate, description, priority, notes, project } =
      taskDetails;
    const taskData = {
      taskId,
      title,
      dueDate,
      description,
      priority,
      notes,
      project,
    };
    localStorage.setItem(taskId, JSON.stringify(taskData));
  },
  clearLocalStorage() {
    localStorage.clear();
  },

  // Remove task from localStorage by taskID
  completeTaskAndRemove(taskId) {
    // Log the task ID before removal
    console.log(
      `completeTaskAndRemove: Attempting to remove task with ID: ${taskId} from storage.`
    );
    // Check if the task exists in localStorage before removal
    const taskExists = localStorage.getItem(taskId);
    if (taskExists) {
      // Remove the task from localStorage
      localStorage.removeItem(taskId);
      // refresh projects div
      this.displayProjectNames();
      //DOM Manipulate
      const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
      if (taskElement) {
        taskElement.remove();
      } else {
        console.warn("Task element not found in DOM for removal");
      }
    }
  },

  populateDummyLocalStorage(numberOfObjects) {
    this.clearLocalStorage();

    for (let i = 0; i < numberOfObjects; i++) {
      const dueDate = formatISO(new Date(2024, 1, 27), {
        representation: "date",
      });
      const taskId = uuidv4();
      const taskDetails = {
        taskId,
        title: `taskName${i}`,
        dueDate,
        description: "the description",
        priority: "High",
        notes: "notes",
        project: "example project",
        parentElementId: "inboxContainerDiv",
      };
      const existingTaskElement = document.querySelector(
        `[data-task-id="${taskId}"]`
      );
      if (!existingTaskElement) {
        const newTaskDiv = new TaskDiv(taskDetails);
        storageFunctions.storeLocally(taskDetails);
      } else {
        console.log(
          `Task with ID ${taskId} already exists in storage, skipping creation.`
        );
      }
    }
  },

  // parse local storage
  parsedStorage() {
    let tasks = {};
    Object.keys(localStorage).forEach((key) => {
      try {
        const potentialTask = JSON.parse(localStorage.getItem(key));
        if (potentialTask && potentialTask.title && potentialTask.dueDate) {
          tasks[key] = potentialTask;
        }
      } catch (e) {
        console.error("Error parsing item from localStorage:", e);
      }
    });
    return tasks;
  },

  getTodaysTasks() {
    const tasks = this.parsedStorage();

    const currentDate = new Date();

    const tasksDueToday = Object.values(tasks).filter((task) => {
      const dueDate = parseISO(task.dueDate);

      return isToday(dueDate);
    });

    return tasksDueToday;
  },

  displayTodaysTasks() {
    const tasksDueToday = this.getTodaysTasks();
    console.log("tasksDueToday:", tasksDueToday);

    const todayContainerDiv = document.getElementById("todayContainerDiv");
    const existingTasks = todayContainerDiv.querySelectorAll(".task-item");
    existingTasks.forEach((task) => task.remove());

    // Append new tasks
    tasksDueToday.forEach((task) => {
      console.log("Processing task:", task);
      new TaskDiv({ ...task, parentElementId: "todayContainerDiv" });
    });
  },

  getWeekTasks() {
    const tasks = this.parsedStorage();
    const today = startOfDay(new Date());
    // 7 days in total, starting from today but starts at 6
    const endOfWeek = addDays(today, 6); 
  
    const tasksDueThisWeek = Object.values(tasks).filter((task) => {
      const dueDate = parseISO(task.dueDate);
  
      return isWithinInterval(dueDate, {
        start: today,
        end: endOfWeek,
      });
    });
  
    return tasksDueThisWeek;
  },
  

  displayWeekTasks() {
    const tasksDueWeek = this.getWeekTasks();
    const weekContainerDiv = document.getElementById("weekContainerDiv");

    const existingTasks = weekContainerDiv.querySelectorAll(".task-item");
    existingTasks.forEach((task) => task.remove());

    tasksDueWeek.forEach((task) => {
      new TaskDiv({ ...task, parentElementId: "weekContainerDiv" });
    });
  },

  displayProjectNames() {
    const projectsContainerDiv = document.getElementById(
      "projectsContainerDiv"
    );
    const parsedTasks = this.parsedStorage();
    // Clear existing projects
    projectsContainerDiv.innerHTML = "";
    const projects = new Set(
      Object.values(parsedTasks).map((task) => task.project)
    );
    projects.forEach((project) => {
      if (project) {
        const projectDiv = document.createElement("div");
        projectDiv.textContent = project;
        projectDiv.classList.add("project-name");
        stylingFunctions.projectNameStyling(projectDiv);
        projectsContainerDiv.appendChild(projectDiv);
        projectDiv.addEventListener("click", () => {
          clickActions.showProjectTasks(project, parsedTasks);
        });
      }
    });
  },

  updateTask(taskId, newDetails) {
    const taskValue = localStorage.getItem(taskId);
    if (taskValue) {
      const task = JSON.parse(taskValue);
      // Copy task
      const updatedTask = JSON.parse(JSON.stringify(task));
      // update copied task
      Object.assign(updatedTask, newDetails);
      console.log("Updated Task (before save", updatedTask);
      localStorage.setItem(taskId, JSON.stringify(updatedTask));
      console.log(`Task with ID ${taskId} has been updated.`);
    } else {
      console.log(
        `Task with ID ${taskId} does not exist and cannot be updated.`
      );
    }
  },

  // returns an object of the task details
  getTaskDetails(taskId) {
    const localStorageItems = this.parsedStorage();
    if (localStorageItems.hasOwnProperty(taskId)) {
      const taskDetails = localStorageItems[taskId];
      return taskDetails;
    } else {
      console.error(
        "getTaskDetails: There was no taskID. TaskID is: " + taskId
      );
      return null;
    }
  },

  refreshTasksDisplay() {
    const inboxContainerDiv = document.getElementById("inboxContainerDiv");
    // Retrieve updated tasks from local storage
    const tasks = this.parsedStorage();
    console.log(
      "refreshTasksDisplay: Tasks retrieved from localStorage:",
      tasks
    );

    // Identify all currently displayed tasks
    const displayedTaskIds = new Set(
      [...inboxContainerDiv.querySelectorAll(".task-item")].map(
        (task) => task.dataset.taskId
      )
    );

    // Remove tasks no longer present in local storage
    displayedTaskIds.forEach((taskId) => {
      if (!tasks[taskId]) {
        const taskElement = inboxContainerDiv.querySelector(
          `[data-task-id="${taskId}"]`
        );
        taskElement.remove();
      }
    });

    // Update existing tasks and add new ones
    Object.entries(tasks).forEach(([taskId, taskDetails]) => {
      const taskElement = inboxContainerDiv.querySelector(
        `[data-task-id="${taskId}"]`
      );
      if (taskElement) {
        // Update existing task elements
        taskElement.querySelector("[data-detail-type='title']").textContent =
          taskDetails.title;
        taskElement.querySelector(
          "[data-detail-type='description']"
        ).textContent = taskDetails.description;
        taskElement.querySelector("[data-detail-type='dueDate']").textContent =
          taskDetails.dueDate;
        taskElement.querySelector("[data-detail-type='priority']").textContent =
          taskDetails.priority;
        taskElement.querySelector("[data-detail-type='project']").textContent =
          taskDetails.project;
      } else {
        // Add new task elements
        new TaskDiv({
          ...taskDetails,
          parentElementId: "inboxContainerDiv",
        });
      }
    });
  },

  convertDetailsToArray(details) {
    return Object.keys(details).map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      id: key,
      type: key === "description" ? "textarea" : "input",
      value: details[key],
    }));
  },

  loadTasksFromLocalStorage() {
    const tasksContainer = document.getElementById("inboxContainerDiv");
    if (!tasksContainer) {
      console.error("inboxContainerDiv not found in the DOM");
      return;
    }

    // Clearing task items
    const taskItems = tasksContainer.querySelectorAll(".task-item");
    taskItems.forEach((item) => item.remove());

    const tasks = storageFunctions.parsedStorage();

    Object.keys(tasks).forEach((key) => {
      const taskDetails = tasks[key];

      // TaskId exists
      if (!taskDetails.taskId) {
        taskDetails.taskId = uuidv4();
      }

      // Create taskDiv.
      const taskDiv = new TaskDiv({
        ...taskDetails,
        parentElementId: "inboxContainerDiv",
      });
      taskDiv.getElement().dataset.taskId = taskDetails.taskId;
    });
  },
};

export { storageFunctions };
