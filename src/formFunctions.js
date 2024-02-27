import { createDivWithText } from "./interface.js";
import { stylingFunctions } from "./stylingFunctions.js";
import { storageFunctions } from "./storageFunctions.js";
import { clickActions } from "./clickActions.js";
import { v4 as uuidv4 } from "uuid";
import { TaskDiv } from "./TaskDiv.js";

const formFunctions = {
  initialiseTaskForm(taskCreatorDiv) {
    const form = this.createForm();
    this.addInputFieldsToForm(form);
    this.appendSubmitButtonToForm(form);
    this.handleFormSubmission(form, taskCreatorDiv);
    taskCreatorDiv.appendChild(form);
  },

  createForm() {
    const form = document.createElement("form");
    form.id = "taskCreationForm";
    Object.assign(form.style, {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    });

    // Hidden input for task ID
    const taskIdInput = document.createElement("input");
    taskIdInput.type = "hidden";
    taskIdInput.id = "taskId";
    form.appendChild(taskIdInput);

    return form;
  },

  addInputFieldsToForm(form, taskDetails = {}) {
    const fields = [
      { label: "Title:", type: "text", id: "title", required: true },
      { label: "Due Date:", type: "date", id: "dueDate", required: true },
      { label: "Description:", type: "text", id: "description" },
      {
        label: "Priority:",
        type: "select",
        id: "priority",
        options: ["High", "Medium", "Low"],
      },
      { label: "Notes:", type: "text", id: "notes" },
      { label: "Project:", type: "text", id: "project" },
    ];

    fields.forEach((field) => {
      const fieldValue = taskDetails[field.id] || "";
      form.appendChild(
        this.createInputField(
          field.label,
          field.type,
          field.id,
          field.required,
          field.options,
          fieldValue
        )
      );
    });
  },

  appendSubmitButtonToForm(form) {
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Save Task";
    Object.assign(submitBtn.style, {
      marginTop: "20px",
    });
    form.appendChild(submitBtn);
  },

  handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;

    let taskId = form.elements["taskId"].value;
    if (!taskId) {
      taskId = uuidv4();
      form.elements["taskId"].value = taskId;
    }

    const title = form.elements["title"].value.trim();
    const description = form.elements["description"].value.trim();
    const dueDate = form.elements["dueDate"].value;
    const priority = form.elements["priority"].value;
    const notes = form.elements["notes"].value.trim();
    const project = form.elements["project"].value.trim();

    const taskDetails = {
      taskId,
      title,
      description,
      dueDate,
      priority,
      notes,
      project,
    };

    const existingTask = storageFunctions.getTaskDetails(taskId);
    if (existingTask) {
      storageFunctions.updateTask(taskId, taskDetails);
    } else {
      this.createNewTask(taskDetails);
    }

    storageFunctions.refreshTasksDisplay();

    storageFunctions.displayProjectNames();

    clickActions.showInbox();

    form.reset();
    document.getElementById("taskCreatorDiv").style.display = "none";

    clickActions.setupTaskClickListeners();
  },

  createNewTask(taskDetails) {
    console.log("New task detected. Creating a new TaskDiv...");

    const newTaskDiv = new TaskDiv(taskDetails, "inboxContainerDiv");

    storageFunctions.storeLocally(taskDetails);
  },

  createInputField(
    labelText,
    inputType,
    inputName,
    isRequired = false,
    options = null,
    fieldValue = ""
  ) {
    const wrapper = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = labelText;
    label.htmlFor = inputName;
    wrapper.appendChild(label);

    let input;
    if (inputType === "select" && options) {
      input = document.createElement("select");
      options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        if (fieldValue === option) optionElement.selected = true;
        input.appendChild(optionElement);
      });
    } else {
      input = document.createElement("input");
      input.type = inputType;
      input.value = fieldValue;
    }

    input.id = inputName;
    input.name = inputName;
    input.required = isRequired;
    wrapper.appendChild(input);

    return wrapper;
  },

  createCloseIconDiv() {
    const closeDiv = createDivWithText("", "closeDiv", "fas fa-times");
    Object.assign(closeDiv.style, {
      position: "absolute",
      top: "10px",
      right: "10px",
      cursor: "pointer",
    });
    console.log("Close icon div created");
    return closeDiv;
  },
  createCheckbox() {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    stylingFunctions.checkboxStyling(checkbox);
    return checkbox;
  },
};

export { formFunctions };
