import { storageFunctions } from "./storageFunctions.js";
import { TaskDiv } from "./TaskDiv.js";

class ClickActions {
  constructor() {
    this.bindMethods();
    this.setupListeners();
  }

  bindMethods() {
    const methods = [
      "showInbox",
      "showToday",
      "showWeek",
      "handleTaskEditClick",
      "showProjectTasks",
      "setupAndPopulateTaskEditorForm",
      "handleFormSubmission",
      "createLabel",
      "createSaveButton",
      "handleAddTaskPromptClick",
      "setupProjectTabListeners",
      "setupAddTaskPromptListener",
    ];
    methods.forEach((method) => (this[method] = this[method].bind(this)));
  }

  setupListeners() {
    this.setupMenuTabListeners();
    this.setupProjectTabListeners();
    this.setupTaskClickListeners();
    this.setupAddTaskPromptListener();
  }

  setupMenuTabListeners() {
    document
      .getElementById("inboxDiv")
      ?.addEventListener("click", this.showInbox);
    document
      .getElementById("todayDiv")
      ?.addEventListener("click", this.showToday);
    document
      .getElementById("thisWeekDiv")
      ?.addEventListener("click", this.showWeek);
  }

  setupProjectTabListeners() {
    const projectDivs = document.querySelectorAll(".project-name");
    projectDivs.forEach((div) => {
      div.addEventListener("click", (e) => {
        const projectName = e.target.textContent;
        this.showProjectTasks(projectName);
      });
    });
  }

  setupAddTaskPromptListener() {
    const addTaskPrompt = document.getElementById("addTaskPrompt");
    if (addTaskPrompt) {
      addTaskPrompt.addEventListener("click", this.handleAddTaskPromptClick);
    } else {
      console.error("addTaskPrompt element not found!");
    }
  }

  setSectionVisibility(sectionId, show) {
    const section = document.getElementById(sectionId);
    section.style.display = show ? "flex" : "none";
  }

  handleAddTaskPromptClick() {
    this.setSectionVisibility("taskCreatorDiv", true);
  }

  showInbox() {
    this.toggleSections("inboxContainerDiv");
  }

  showToday() {
    this.toggleSections("today");
  }

  showWeek() {
    this.toggleSections("week");
  }

  showProjectTasks(projectName) {
    this.toggleSections("projectsMainContainer");
    const projectsMainContainer = document.getElementById(
      "projectsMainContainer"
    );
    this.clearProjectTasksExceptTitle("projectsMainContainer");
    const projectTasks = storageFunctions
      .parsedStorage()
      .filter((task) => task.project === projectName);
    projectTasks.forEach((taskData) => {
      const taskElement = new TaskDiv(taskData, "projectsMainContainer");
      projectsMainContainer.appendChild(taskElement.getElement());
    });
  }

  toggleSections(activeSection) {
    const sections = [
      "inboxContainerDiv",
      "taskCreatorDiv",
      "today",
      "week",
      "projectsMainContainer",
      "taskEditorDiv",
    ];
    sections.forEach((section) =>
      this.setSectionVisibility(section, section === activeSection)
    );
  }

  setupTaskClickListeners() {
    const tasksContainer = document.getElementById("inboxContainerDiv");
    tasksContainer?.addEventListener("click", (e) => {
      const taskItem = e.target.closest(".task-item");
      if (!taskItem || e.target.type === "checkbox") return;
      this.handleTaskEditClick(taskItem.dataset.taskId);
    });
  }

  handleTaskEditClick(taskId) {
    this.setSectionVisibility("taskEditorDiv", true);
    this.setupAndPopulateTaskEditorForm(taskId);
  }

  createFormFields(fields) {
    return fields.map((field) => {
      const div = document.createElement("div");
      div.appendChild(this.createLabel(field.label, field.id));
      div.appendChild(this.createInput(field));
      return div;
    });
  }

  createLabel(text, htmlFor) {
    const label = document.createElement("label");
    label.textContent = text;
    label.htmlFor = htmlFor;
    return label;
  }

  createInput({ type, id, value }) {
    const input = document.createElement(
      type === "textarea" ? "textarea" : "input"
    );
    input.id = id;
    if (value !== undefined) input.value = value;
    return input;
  }

  setupAndPopulateTaskEditorForm(taskId) {
    const taskEditorDiv = document.getElementById("taskEditorDiv");
    taskEditorDiv.innerHTML = "";
    const taskDetails = storageFunctions.getTaskDetails(taskId);
    if (!taskDetails)
      return console.error("Task details not found for ID:", taskId);
    const form = document.createElement("form");
    form.id = "taskEditForm";
    this.createFormFields(
      storageFunctions.convertDetailsToArray(taskDetails)
    ).forEach((field) => form.appendChild(field));
    form.appendChild(this.createSaveButton());
    taskEditorDiv.appendChild(form);
    form.addEventListener("submit", (event) =>
      this.handleFormSubmission(event, taskId)
    );
  }

  createSaveButton() {
    const button = document.createElement("button");
    button.textContent = "Save Changes";
    button.type = "submit";
    return button;
  }

  handleFormSubmission(event, taskId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    storageFunctions.updateTask(taskId, Object.fromEntries(formData));
    storageFunctions.refreshTasksDisplay();
    document.getElementById("taskEditorDiv").style.display = "none";
  }
}
const clickActions = new ClickActions();
export { clickActions };
