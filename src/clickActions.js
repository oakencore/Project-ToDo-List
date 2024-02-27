import { storageFunctions } from "./storageFunctions.js";
import { TaskDiv } from "./TaskDiv.js";
import { formFunctions } from "./formFunctions.js";

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
    this.setSectionVisibility("inboxContainerDiv", false);
    this.setSectionVisibility("today", true);
    this.setSectionVisibility("week", false);
    storageFunctions.displayTodaysTasks();
  }

  showWeek() {
    this.setSectionVisibility("inboxContainerDiv", false);
    this.setSectionVisibility("today", false);
    this.setSectionVisibility("week", true);
    storageFunctions.displayWeekTasks();
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

    // Convert the object returned by parsedStorage() into an array of tasks
    const allTasks = Object.values(storageFunctions.parsedStorage());

    // Filter tasks by project name
    const projectTasks = allTasks.filter(
      (task) => task.project === projectName
    );

    // Display each task associated with the project
    projectTasks.forEach((taskData) => {
      const taskElement = new TaskDiv({
        ...taskData,
        parentElementId: "projectsMainContainer",
      });
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
        e.stopPropagation();
      } else {
        console.log("Task item clicked (not checkbox). Opening edit form...");
        // dataset.taskId means it's taking the string
        const taskId = taskItem.dataset.taskId;
        console.log(
          "Task item clicked. Opening edit form with task ID:",
          taskId
        );
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
    const closeIconDiv = document.querySelector("#closeDiv");
    if (closeIconDiv) {
      console.log("Close icon div found! Attaching listener...");
      closeIconDiv.addEventListener("click", this.handleCloseIconDivClick);
    } else {
      console.error(
        "setupCloseIconDivListener: CloseDiv not found. Will retry later..."
      );
      setTimeout(this.setupCloseIconDivListener.bind(this), 500);
    }
  }

  handleCloseIconDivClick() {
    console.log("Close icon div clicked.");
    this.showInbox();
  }

  createFormFields(fields) {
    console.log("createFormFields input:", fields);

    // Ensure fields is an object before proceeding.
    if (typeof fields !== "object" || fields === null) {
      console.error(
        "Invalid input for createFormFields, expected an object:",
        fields
      );
      return []; // Return empty to avoid further errors.
    }

    // Convert fields object into an array of key-value pairs.
    const fieldEntries = Object.entries(fields);

    return fieldEntries
      .map(([label, fieldDetails]) => {
        // Check if fieldDetails is an object and has an id; otherwise, log an error and skip this field.
        if (
          typeof fieldDetails !== "object" ||
          fieldDetails === null ||
          !fieldDetails.id
        ) {
          console.error("Invalid fieldDetails for label:", label, fieldDetails);
          return null; // Return null for this field to filter it out later.
        }

        fieldDetails.id = fieldDetails.id || `${label.toLowerCase()}Input`;

        const input = this.createInput(fieldDetails);
        console.log("Creating field:", label, fieldDetails);
        const div = document.createElement("div");
        div.appendChild(this.createLabel(label, input.id));
        div.appendChild(input);

        return div;
      })
      .filter((field) => field !== null); // Filter out any nulls added due to errors.
  }

  createLabel(text, htmlFor) {
    const label = document.createElement("label");
    label.textContent = text;
    label.htmlFor = htmlFor;
    console.log("Created label:", label);
    return label;
  }

  createInput({ type, id, value }) {
    console.log("createInput called with arguments:", type, id, value);
    const input = document.createElement(
      type === "textarea" ? "textarea" : "input"
    );
    input.id = id;
    console.log("input.id is now:", input.id);
    if (value !== undefined) input.value = value;
    console.log("Created input:", input);
    return input;
  }

  setupAndPopulateTaskEditorForm(taskId) {
    console.log("Starting setupAndPopulateTaskEditorForm with taskId:", taskId);
    const taskEditorDiv = document.getElementById("taskEditorDiv");

    if (!taskEditorDiv) {
      return console.error("taskEditorDiv not found in the document.");
    }

    console.log("TaskEditorDiv found:", taskEditorDiv);
    taskEditorDiv.innerHTML = ""; // Clear existing form

    const taskDetails = storageFunctions.getTaskDetails(taskId);
    console.log("Retrieved taskDetails for taskId:", taskId, taskDetails);

    if (!taskDetails) {
      return console.error("Task details not found for ID:", taskId);
    }

    // Use formFunctions to initialise the form with taskDetails
    const form = formFunctions.createForm();
    formFunctions.addInputFieldsToForm(form, taskDetails); // Modified to accept taskDetails
    formFunctions.appendSubmitButtonToForm(form);

    // Prepopulate form fields with existing task details
    for (const key in taskDetails) {
      if (form.elements[key]) {
        form.elements[key].value = taskDetails[key];
      }
    }

    taskEditorDiv.appendChild(form);

    // Handle form submission for editing task
    form.addEventListener("submit", (e) =>
      formFunctions.handleFormSubmission(e, taskEditorDiv, true)
    ); // Modified to accept taskEditorDiv and a flag indicating editing

    console.log("Completed setupAndPopulateTaskEditorForm for taskId:", taskId);
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
