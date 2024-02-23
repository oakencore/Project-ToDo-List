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
    localStorage.removeItem(taskId);
    console.log(`Task with ID ${taskId} has been removed from storage.`);
  },

  populateDummyLocalStorage(numberOfObjects) {
    this.clearLocalStorage();

    for (let i = 0; i < numberOfObjects; i++) {
      const dueDate = formatISO(new Date(2024, 1, 20), {
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
    return Object.values(tasks).filter((task) =>
      isToday(parseJSON(task.dueDate))
    );
  },

  displayTodaysTasks() {
    const tasksDueToday = this.getTodaysTasks();
    tasksDueToday.forEach((task) => {
      new TaskDiv({ ...task, parentElementId: "todayContainerDiv" });
    });
  },

  getWeekTasks() {
    const tasks = this.parsedStorage();
    const today = startOfDay(new Date());
    const endOfWeek = addDays(today, 7);
    return Object.values(tasks).filter((task) =>
      isWithinInterval(parseJSON(task.dueDate), {
        start: today,
        end: endOfWeek,
      })
    );
  },
  displayWeekTasks() {
    const tasksDueWeek = this.getWeekTasks();
    tasksDueWeek.forEach((task) => {
      new TaskDiv({ ...task, parentElementId: "weekContainerDiv" });
    });
  },

  displayProjectNames() {
    const projectsContainerDiv = document.getElementById(
      "projectsContainerDiv"
    );
    // Clear existing projects
    projectsContainerDiv.innerHTML = "";
    const tasks = this.parsedStorage();
    const projects = new Set(Object.values(tasks).map((task) => task.project));
    projects.forEach((project) => {
      if (project) {
        const projectDiv = document.createElement("div");
        projectDiv.textContent = project;
        projectDiv.classList.add("project-name");
        stylingFunctions.projectNameStyling(projectDiv);
        projectsContainerDiv.appendChild(projectDiv);
        projectDiv.addEventListener("click", () =>
          clickActions.showProjectTasks(project)
        );
      }
    });
  },

  updateTask(taskId, newDetails) {
    const taskValue = localStorage.getItem(taskId);
    if (taskValue) {
      const task = JSON.parse(taskValue);
      const updatedTask = { ...task, ...newDetails };
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
      console.log("getTaskDetails: There was no taskID");
      return null;
    }
  },

  updateTask(taskId, newDetails) {
    const taskValue = localStorage.getItem(taskId);
    if (taskValue) {
      const task = JSON.parse(taskValue);
      const updatedTask = { ...task, ...newDetails };
      localStorage.setItem(taskId, JSON.stringify(updatedTask));
    } else {
      console.log(
        `Task with ID ${taskId} does not exist and cannot be updated.`
      );
    }
  },
  refreshTasksDisplay() {
    const inboxContainerDiv = document.getElementById("inboxContainerDiv");
    // Select and remove only the task elements. Used the class of task-item I added to each task.
    const taskElements = inboxContainerDiv.querySelectorAll(".task-item");
    taskElements.forEach((element) => element.remove());

    // Repopulate tasks from localStorage
    const tasks = this.parsedStorage();
    Object.values(tasks).forEach((task) => {
      new TaskDiv({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        project: task.project,
        parentElementId: "inboxContainerDiv",
      });
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

    // Select and remove only elements with the class 'task-item'
    const taskItems = tasksContainer.querySelectorAll(".task-item");
    taskItems.forEach((item) => item.remove());

    // Load tasks from localStorage
    const tasks = storageFunctions.parsedStorage();

    Object.keys(tasks).forEach((key) => {
      const taskDetails = tasks[key];
      new TaskDiv({ ...taskDetails, parentElementId: "inboxContainerDiv" });
    });
  },
};

export { storageFunctions };
