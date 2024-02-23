import { createDivWithText } from "./interface.js";
import { stylingFunctions } from "./stylingFunctions.js";
import { storageFunctions } from "./storageFunctions.js";
import { clickActions } from "./clickActions.js";
import { v4 as uuidv4 } from "uuid";

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

  addInputFieldsToForm(form) {
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

    fields.forEach((field) =>
      form.appendChild(
        this.createInputField(
          field.label,
          field.type,
          field.id,
          field.required,
          field.options
        )
      )
    );
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

  handleFormSubmission(form, taskCreatorDiv) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Check if existing task or a new one
      let taskId = document.getElementById("taskId").value;
      if (!taskId) {
        // If no taskId, generate a new one
        taskId = uuidv4();
      }

      // Extract form values, now including taskId in the taskDetails object
      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();
      const dueDate = document.getElementById("dueDate").value;
      const priority = document.getElementById("priority").value;
      const notes = document.getElementById("notes").value.trim();
      const project = document.getElementById("project").value.trim();

      const taskDetails = {
        taskId,
        title,
        description,
        dueDate,
        priority,
        notes,
        project,
      };

      // Choice: update existing task or create a new one
      if (document.getElementById("taskId").value) {
        // Existing task update
        storageFunctions.updateTask(taskId, taskDetails);
      } else {
        // New task creation
        storageFunctions.storeLocally(taskDetails);
      }

      // Refresh tasks display and reset form
      storageFunctions.refreshTasksDisplay();

      storageFunctions.displayProjectNames();

      // Show inbox
      clickActions.showInbox()

      form.reset();
      document.getElementById("taskId").value = "";
      taskCreatorDiv.style.display = "none";
    });
  },

  createInputField(
    labelText,
    inputType,
    inputName,
    isRequired = false,
    options = null
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
        input.appendChild(optionElement);
      });
    } else {
      input = document.createElement("input");
      input.type = inputType;
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
