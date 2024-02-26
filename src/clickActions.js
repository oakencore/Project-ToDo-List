import { storageFunctions } from "./storageFunctions.js";
import { TaskDiv } from "./TaskDiv.js";
import {formFunctions, handleFormSubmission} from "./formFunctions.js"

class ClickActions {
  constructor() {
    this.setupListeners();
    this.bindMethods();
  }

  setupListeners() {
    this.setupMenuTabListeners();
    this.setupProjectTabListeners();
    this.setupTaskClickListeners();
    this.setupAddTaskPromptListener();
    this.setupCloseIconDivListener();
  }

  bindMethods() {
    const methods = [
      "showInbox",
      "showToday",
      "showWeek",
      "handleTaskEditClick",
      "showProjectTasks",
      "setupAndPopulateTaskEditorForm",
      "createLabel",
      "createSaveButton",
      "handleAddTaskPromptClick",
      "setupProjectTabListeners",
      "setupAddTaskPromptListener",
      "clearProjectTasksExceptTitle",
      "handleCloseIconDivClick",
    ];
    methods.forEach((method) => (this[method] = this[method].bind(this)));
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
    const attemptToAttachListener = () => {
      const addTaskPrompt = document.getElementById("addTaskPrompt");
      if (addTaskPrompt) {
        addTaskPrompt.addEventListener("click", this.handleAddTaskPromptClick);
        clearInterval(checkInterval);
      } else {
        console.log("Waiting for addTaskPrompt element...");
      }
    };

    const checkInterval = setInterval(attemptToAttachListener, 100);

    setTimeout(() => {
      clearInterval(checkInterval);
      console.warn(
        "Stopped checking for addTaskPrompt - element not found within timeout."
      );
    }, 5000);
  }

  setSectionVisibility(sectionId, show) {
    const section = document.getElementById(sectionId);
    section.style.display = show ? "flex" : "none";
  }

  handleAddTaskPromptClick() {
    this.setSectionVisibility("taskCreatorDiv", true);
    this.setSectionVisibility("inboxContainerDiv", false);
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

  clearProjectTasksExceptTitle(containerId) {
    const container = document.getElementById(containerId);
    const titleElement = container.querySelector(".project-title"); // Assuming title has a "project-title" class

    // Clear all child elements except the title
    if (titleElement) {
      container.innerHTML = "";
      container.appendChild(titleElement);
    } else {
      container.innerHTML = ""; // If no title, clear everything
    }
  }

  showProjectTasks(projectName) {
    console.log("This is", this, "in showProjectTasks.");
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
      // find parent!
      const taskItem = e.target.closest("[data-task-id]");
      console.log("Task item found:", taskItem);
      // Exit if no taskitem found
      if (!taskItem) return;

      if (e.target.type === "checkbox") {
        const taskId = taskItem.dataset.taskId;
        console.log("Checkbox Clicked: Found dataset.taskId:", taskId);
        storageFunctions.completeTaskAndRemove(taskId);
        // Stop bubbling up
        Event.stopPropagation();
      } else {
        console.log("Task item clicked (not checkbox). Opening edit form...");
        // dataset.taskId means it's taking the string
        const taskId = taskItem.dataset.taskId;
        this.handleTaskEditClick(taskId);
      }
    });
  }

  handleCheckboxClick(taskId) {
    console.log("Task ID targeted for removal:", taskId);

    storageFunctions.completeTaskAndRemove(taskId, (result) => {
      console.log("completeTaskAndRemove result:", result);

      if (result) {
        console.log("Task successfully removed from localStorage");
        storageFunctions.refreshTasksDisplay();
        storageFunctions.displayProjectNames();
      } else {
        console.error("Failed to remove task from localStorage");
      }
    });
  }

  handleTaskEditClick(taskId) {
    this.setSectionVisibility("taskEditorDiv", true);
    this.setupAndPopulateTaskEditorForm(taskId);
    this.setSectionVisibility("inboxContainerDiv", false);
  }

  setupCloseIconDivListener() {
    console.log("setupClosIconDivListener called");
    const closeIconDiv = document.querySelector("#closeDiv");
    if (closeIconDiv) {
      console.log("Close icon div found! Attaching listener...");
      closeIconDiv.addEventListener("click", this.handleCloseIconDivClick);
    } else {
      console.error("setupCloseIconDivListener: CloseDiv not found!");
    }
  }

  handleCloseIconDivClick() {
    console.log("Close icon div clicked.");
    this.showInbox();
  }

  createFormFields(fields) {
    return fields.map((field) => {
      console.log("Creating field:", field);
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
    const taskIdValue = document.getElementById("taskId").value;  
    const title = document.getElementById("title").value.trim();
  }

  createSaveButton() {
    const button = document.createElement("button");
    button.textContent = "Save Changes";
    button.type = "submit";
    return button;
  }
}
const clickActions = new ClickActions();
export { clickActions };
