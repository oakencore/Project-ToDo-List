import { storageFunctions } from "./storageFunctions";
import { TaskDiv } from "./TaskDiv";
import { formFunctions } from "./formFunctions";

class ClickActions {
  constructor() {
    // Bind methods to make sure 'this' refers to the instance of the class
    this.NewTaskCreatorPrompt = this.NewTaskCreatorPrompt.bind(this);
    this.handleAddTaskPromptClick = this.handleAddTaskPromptClick.bind(this);
    this.handleTaskCreatorDivClick = this.handleTaskCreatorDivClick.bind(this);
    this.handleTodayDivClick = this.handleTodayDivClick.bind(this);
    this.ChangeTodayVisibility = this.ChangeTodayVisibility.bind(this);
    this.handleWeekDivClick = this.handleWeekDivClick.bind(this);
    this.ChangeWeekVisibility = this.ChangeWeekVisibility.bind(this);
    this.ChangeInboxVisibility = this.ChangeInboxVisibility.bind(this);
    this.taskCreatorDivVisibility = this.taskCreatorDivVisibility.bind(this);
    this.showInbox = this.showInbox.bind(this);
    this.showToday = this.showToday.bind(this);
    this.showWeek = this.showWeek.bind(this);
    this.showProjectTasks = this.showProjectTasks.bind(this);
    this.setupProjectTabListeners = this.setupProjectTabListeners.bind(this);
    this.setupTaskClickListeners = this.setupTaskClickListeners.bind(this);
    this.populateEditFormWithTaskDetails =
      this.populateEditFormWithTaskDetails.bind(this);
      
  }

  // Methods for menu tab clicks
  setupMenuTabListeners() {
    const inboxDiv = document.getElementById("inboxDiv");
    const todayDiv = document.getElementById("todayDiv");
    const weekDiv = document.getElementById("thisWeekDiv");
    console.log(inboxDiv, todayDiv, weekDiv);

    if (inboxDiv) inboxDiv.addEventListener("click", this.showInbox);
    if (todayDiv) {
      console.log("Adding click listener to todayDiv");
      todayDiv.addEventListener("click", this.showToday);
    }
    if (weekDiv) {
      console.log("Adding click listener to weekDiv");
      weekDiv.addEventListener("click", this.showWeek);
    }
  }

  setupProjectTabListeners() {
    const projectDivs = document.querySelectorAll(".project-name");
    projectDivs.forEach((div) => {
      div.addEventListener("click", (e) => {
        const projectName = e.target.textContent;
        this.handleMainProjectDivClick(projectName);
      });
    });
  }

  // For when a task is clicked so a user can edit it
  setupTaskClickListeners() {
    console.log("setupTaskClickListeners was invoked")
    const tasksContainer = document.getElementById('inboxContainerDiv');
    if (!tasksContainer) {
        console.error('inboxContainerDiv not found');
        return;
    }
    
    tasksContainer.addEventListener('click', (e) => {
        // Check if the clicked element or its parent is a .task-item
        const taskItem = e.target.closest('.task-item');
        if (taskItem) {
          // Each task-item has to have a data-task-id attribute
            const taskId = taskItem.dataset.taskId; 
            console.log("Within setupTaskClickListener taskId is:", taskId)
            formFunctions.setupAndPopulateTaskEditorForm(taskId);
        }
    });
}

  showInbox() {
    console.log("Showing Inbox content");
    this.ChangeInboxVisibility(true);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(false);
    const todayContainer = document.getElementById("today");
    console.log(
      "After visibility change:",
      window.getComputedStyle(todayContainer).display
    );
    this.ChangeWeekVisibility(false);
    this.ChangeProjectsMainDivVisibility(false);
  }

  showToday() {
    console.log("Showing Today content");
    this.ChangeInboxVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(true);
    this.ChangeWeekVisibility(false);
    this.ChangeProjectsMainDivVisibility(false);
  }

  showWeek() {
    console.log("Showing Week content");
    this.ChangeInboxVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(false);
    this.ChangeWeekVisibility(true);
    this.ChangeProjectsMainDivVisibility(false);
  }

  showProjectTasks(projectName) {
    console.log(`Showing tasks for project: ${projectName}`);
    this.ChangeTodayVisibility(false);
    this.ChangeWeekVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeInboxVisibility(false);
    this.ChangeProjectsMainDivVisibility(true);
    const projectsMainContainer = document.getElementById(
      "projectsMainContainer"
    );
    this.clearProjectTasksExceptTitle("projectsMainContainer");
    const allTasks = storageFunctions.parsedStorage();
    // Get tasks linked to project name
    const projectTasks = Object.values(allTasks).filter(
      (task) => task.project === projectName
    );

    // Create and append tasks
    projectTasks.forEach((taskData) => {
      const taskElement = new TaskDiv(
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.priority,
        taskData.project,
        "projectsMainContainer"
      );
      projectsMainContainer.appendChild(taskElement.getElement());
    });
  }

  clearProjectTasksExceptTitle(containerDivId) {
    const container = document.getElementById(containerDivId);
    const children = Array.from(container.children);

    //Remove children but not title
    for (let i = children.length - 1; i > 0; i--) {
      container.removeChild(children[i]);
    }
  }

  NewTaskCreatorPrompt(event) {
    const clickedElement = event.target;

    // Handler checking
    if (
      clickedElement.id === "addTaskPrompt" ||
      clickedElement.closest("#addTaskPrompt")
    ) {
      this.handleAddTaskPromptClick();
    } else if (
      clickedElement.id === "taskCreatorDiv" ||
      clickedElement.closest("#taskCreatorDiv")
    ) {
      this.handleTaskCreatorDivClick();
    } else if (
      clickedElement.id === "todayDiv" ||
      clickedElement.closest("#todayDiv")
    ) {
      this.handleTodayDivClick();
    } else if (
      clickedElement.id === "thisWeekDiv" ||
      clickedElement.closest("#thisWeekDiv")
    ) {
      this.handleWeekDivClick();
    }
  }

  ChangeTodayVisibility(show) {
    const todayContainer = document.getElementById("today");
    console.log(`Changing today visibility to ${show}`, todayContainer);
    if (todayContainer) {
      todayContainer.style.display = show ? "flex" : "none";
    }
  }

  ChangeWeekVisibility(show) {
    const weekContainer = document.getElementById("week");
    console.log(`Changing week visibility to ${show}`, weekContainer);
    if (weekContainer) {
      weekContainer.style.display = show ? "flex" : "none";
    }
  }

  ChangeInboxVisibility(show) {
    const inboxContainer = document.getElementById("inboxContainerDiv");
    if (inboxContainer) {
      inboxContainer.style.display = show ? "flex" : "none";
    }
  }

  taskCreatorDivVisibility(show) {
    const taskCreatorDiv = document.getElementById("taskCreatorDiv");
    if (taskCreatorDiv) {
      taskCreatorDiv.style.display = show ? "flex" : "none";
    }
  }

  ChangeProjectsMainDivVisibility(show) {
    const projectsMainDiv = document.getElementById("projectsMainContainer");
    if (projectsMainDiv) {
      projectsMainDiv.style.display = show ? "flex" : "none";
    }
  }

  handleAddTaskPromptClick() {
    console.log("AddTaskPrompt Div clicked!");
    this.ChangeInboxVisibility(false);
    this.ChangeTodayVisibility(false);
    this.taskCreatorDivVisibility(true);
    this.ChangeWeekVisibility(false);
    this.ChangeProjectsMainDivVisibility(false);
  }

  handleTaskCreatorDivClick() {
    console.log("TaskCreator Div clicked!");
    this.ChangeInboxVisibility(true);
    this.ChangeTodayVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeWeekVisibility(false);
    this.ChangeProjectsMainDivVisibility(false);
  }

  handleTodayDivClick() {
    try {
      console.log("Today Div clicked!");
      this.ChangeInboxVisibility(false);
      this.ChangeTodayVisibility(true);
      this.taskCreatorDivVisibility(false);
      this.ChangeWeekVisibility(false);
      this.ChangeProjectsMainDivVisibility(false);
    } catch (error) {
      console.error("Error handling Today Div click:", error);
    }
  }
  handleWeekDivClick() {
    try {
      console.log("Week Div clicked!");
      this.ChangeInboxVisibility(false);
      this.ChangeTodayVisibility(false);
      this.taskCreatorDivVisibility(false);
      this.ChangeWeekVisibility(true);
      this.ChangeProjectsMainDivVisibility(false);
    } catch (error) {
      console.error("Error handling week Div click:", error);
    }
  }
  handleMainProjectDivClick() {
    try {
      console.log("Project Div clicked!");
      this.ChangeInboxVisibility(false);
      this.ChangeTodayVisibility(false);
      this.taskCreatorDivVisibility(false);
      this.ChangeWeekVisibility(false);
      this.ChangeProjectsMainDivVisibility(true);
    } catch (error) {
      console.error("Error handling MainProject Div click:", error);
    }
  }
  handleTaskEditClick(taskId) {
    console.log(`Editing task: ${taskId}`);
    // Get task details
    const taskDetails = storageFunctions.getTaskDetails(taskId);
    if (taskDetails) {
      this.populateTaskEditorForm(taskDetails);
    }
  }

  populateEditFormWithTaskDetails(taskId) {
    console.log("populateEditForm is called");
    const taskDetails = storageFunctions.getTaskDetails(taskId);
    console.log("Taskid information returned from getTaskDetails:", taskDetails)

    if (taskDetails) {
      console.log("Title field:", document.getElementById("title"));
      document.getElementById("title").value = taskDetails.title || "";
      console.log("Description field:", document.getElementById("description"));
      document.getElementById("description").value =
        taskDetails.description || "";
      document.getElementById("dueDate").value = taskDetails.dueDate || "";

      let priorityField = document.getElementById("priority");
      if (priorityField && taskDetails.priority) {
        priorityField.value = taskDetails.priority.toString();
      }

      document.getElementById("notes").value = taskDetails.notes || "";
      document.getElementById("project").value = taskDetails.project || "";

      let taskIdField = document.getElementById("taskId");
      if (taskIdField) {
        taskIdField.value = taskDetails.taskId || "";
      }

      // Display the form
      let taskForm = document.getElementById("taskEditorDiv");
      if (taskForm) {
        taskForm.style.display = "flex";
      }
    } else {
      console.error("No details found for task ID:", taskId);
    }
  }
}

// Learned that if you export an instance instead of the class itself, you can directly use clickActions anywhere
const clickActions = new ClickActions();
export { clickActions };
