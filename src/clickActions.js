import { storageFunctions } from "./storageFunctions.js";
import { TaskDiv } from "./TaskDiv.js";

class ClickActions {
  constructor() {
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

  setupMenuTabListeners() {
    const inboxDiv = document.getElementById("inboxDiv");
    const todayDiv = document.getElementById("todayDiv");
    const weekDiv = document.getElementById("thisWeekDiv");

    if (inboxDiv) inboxDiv.addEventListener("click", this.showInbox);
    if (todayDiv) todayDiv.addEventListener("click", this.showToday);
    if (weekDiv) weekDiv.addEventListener("click", this.showWeek);
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

  setupTaskClickListeners() {
    const tasksContainer = document.getElementById("inboxContainerDiv");
    if (!tasksContainer) return console.error("inboxContainerDiv not found");

    tasksContainer.addEventListener("click", (e) => {
      const taskItem = e.target.closest(".task-item");
      if (taskItem) {
        const taskId = taskItem.dataset.taskId; 
        this.handleTaskEditClick(taskId);
        this.setupAndPopulateTaskEditorForm(taskId);
      }
    });
  }

  showInbox() {
    // console.log("Showing Inbox content");
    this.ChangeInboxVisibility(true);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(false);
    const todayContainer = document.getElementById("today");
    this.ChangeWeekVisibility(false);
    this.ChangeProjectsMainDivVisibility(false);
    this.taskEditorDivVisibility(false);
  }

  showToday() {
    // console.log("Showing Today content");
    this.ChangeInboxVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(true);
    this.ChangeWeekVisibility(false);
    this.ChangeProjectsMainDivVisibility(false);
    this.taskEditorDivVisibility(false);
  }

  showWeek() {
    // console.log("Showing Week content");
    this.ChangeInboxVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(false);
    this.ChangeWeekVisibility(true);
    this.ChangeProjectsMainDivVisibility(false);
    this.taskEditorDivVisibility(false);
  }

  showProjectTasks(projectName) {
    // console.log(`Showing tasks for project: ${projectName}`);
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

  taskEditorDivVisibility(show) {
    const taskEditorDiv = document.getElementById("taskEditorDiv");
    if (taskEditorDiv) {
      taskEditorDiv.style.display = show ? "flex" : "none";
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
    this.taskEditorDivVisibility(false);
  }

  handleTaskCreatorDivClick() {
    console.log("TaskCreator Div clicked!");
    this.ChangeInboxVisibility(true);
    this.ChangeTodayVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeWeekVisibility(false);
    this.ChangeProjectsMainDivVisibility(false);
    this.taskEditorDivVisibility(false);
  }

  handleTodayDivClick() {
    try {
      console.log("Today Div clicked!");
      this.ChangeInboxVisibility(false);
      this.ChangeTodayVisibility(true);
      this.taskCreatorDivVisibility(false);
      this.ChangeWeekVisibility(false);
      this.ChangeProjectsMainDivVisibility(false);
      this.taskEditorDivVisibility(false);
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
      this.taskEditorDivVisibility(false);
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
      this.taskEditorDivVisibility(false);
    } catch (error) {
      console.error("Error handling MainProject Div click:", error);
    }
  }
  handleTaskEditClick() {
    this.ChangeInboxVisibility(false);
    this.ChangeTodayVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.taskEditorDivVisibility(true);
    this.ChangeWeekVisibility(false);
    this.ChangeProjectsMainDivVisibility(false);
  }

  populateEditFormWithTaskDetails(taskId) {
    console.log("populateEditForm is called");
    const taskDetails = storageFunctions.getTaskDetails(taskId);
    console.log(
      "Taskid information returned from getTaskDetails:",
      taskDetails
    );

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

  // Edit form modular functions.

  // Clear and display task editor logic
  clearAndDisplayEditor(taskEditorDiv) {
    taskEditorDiv.innerHTML = "";
    taskEditorDiv.style.display = "flex";
  }

  // Field creator for dynamic form field creation!
  createFormFields(fields) {
    const fragments = document.createDocumentFragment();
    fields.forEach((field) => {
      const { label, id, type, value } = field;
      const div = document.createElement("div");
      const labelElement = document.createElement("label");
      labelElement.textContent = label;
      labelElement.htmlFor = id;

      const input = document.createElement(
        type === "textarea" ? "textarea" : "input"
      );
      if (type !== "textarea") input.type = type;
      input.id = id;
      input.value = value;

      div.appendChild(labelElement);
      div.appendChild(input);
      fragments.appendChild(div);
    });
    return fragments;
  }

  // Generate and append the task editor form dynamically
  setupAndPopulateTaskEditorForm(taskId) {
    const taskEditorDiv = document.getElementById("taskEditorDiv");
    this.clearAndDisplayEditor(taskEditorDiv);

    const taskDetails = storageFunctions.getTaskDetails(taskId);
    if (!taskDetails)
      return console.error("Exiting...No details found for task ID:", taskId);

    const form = document.createElement("form");
    form.id = "taskEditForm";
    const formFields = this.createFormFields(taskDetails);
    form.appendChild(formFields);

    const saveButton = this.createSaveButton();
    form.appendChild(saveButton);

    form.addEventListener("submit", (event) =>
      this.handleFormSubmission(event, taskId, taskEditorDiv)
    );
    taskEditorDiv.appendChild(form);
  }

  // Create a save button
  createSaveButton() {
    const button = document.createElement("button");
    button.textContent = "Save Changes";
    button.type = "submit";
    return button;
  }

  // Handle form data on submission button
  handleFormSubmission(event, taskId, taskEditorDiv) {
    event.preventDefault();
    const taskDetails = {
      title: document.getElementById("editTitle").value,
      description: document.getElementById("editDescription").value,
      dueDate: document.getElementById("editDueDate").value,
    };
    storageFunctions.updateTask(taskId, taskDetails);
    taskEditorDiv.style.display = "none";
    storageFunctions.refreshTasksDisplay();
  }
}

// Learned that if you export an instance instead of the class itself, you can directly use clickActions anywhere
const clickActions = new ClickActions();
export { clickActions };
