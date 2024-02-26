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
      console.log("getTaskDetails: There was no taskID");
      return null;
    }
  },

  refreshTasksDisplay() {
    const inboxContainerDiv = document.getElementById("inboxContainerDiv");
    const taskElements = inboxContainerDiv.querySelectorAll(".task-item");
    const tasks = this.parsedStorage();
    console.log(
      "refreshTasksDisplay: Tasks retrieved from localStorage:",
      tasks
    );

    // Update existing tasks
    taskElements.forEach((taskElement) => {
      const taskId = taskElement.dataset.taskId;
      const correspondingTask = tasks[taskId];

      if (correspondingTask) {
        const titleElement = taskElement.querySelector(
          "[data-detail-type='title']"
        );
        if (titleElement) {
          titleElement.textContent = correspondingTask.title;
        }

        const descriptionElement = taskElement.querySelector(
          "[data-detail-type='description']"
        );
        if (descriptionElement) {
          descriptionElement.textContent = correspondingTask.description;
        }

        const dueDateElement = taskElement.querySelector(
          "[data-detail-type='dueDate']"
        );
        if (dueDateElement) {
          dueDateElement.textContent = correspondingTask.dueDate;
        }

        const priorityElement = taskElement.querySelector(
          "[data-detail-type='priority']"
        );
        if (priorityElement) {
          priorityElement.textContent = correspondingTask.priority;
        }

        const projectElement = taskElement.querySelector(
          "[data-detail-type='project']"
        );
        if (projectElement) {
          projectElement.textContent = correspondingTask.project;
        }
      } else {
        console.log(
          "refreshTasksDisplay: Task not found in localStorage:",
          taskId
        );
      }
    });

    // Create new tasks
    const localStorageTaskIds = Object.keys(tasks);
    const domTaskIds = Array.from(taskElements).map((el) => el.dataset.taskId);
    const newTaskIds = localStorageTaskIds.filter(
      (id) => !domTaskIds.includes(id)
    );

    newTaskIds.forEach((taskId) => {
      const newTask = tasks[taskId];
      new TaskDiv({
        taskId,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        project: newTask.project,
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
