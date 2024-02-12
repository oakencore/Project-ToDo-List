import { clickActions } from "./clickActions.js";
import { stylingFunctions } from "./stylingFunctions.js";
import { createDivWithText } from "./interface.js";
import { TaskDiv } from "./TaskDiv.js";
import { createAndAppendTask } from "./TaskDiv.js";
import { storageFunctions } from "./storageFunctions.js";

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
    return form;
  },

  addInputFieldsToForm(form) {
    const fields = [
      { label: "Title:", type: "text", id: "title", required: true },
      { label: "Due Date:", type: "date", id: "dueDate" },
      { label: "Description:", type: "text", id: "description" },
      {
        label: "Priority:",
        type: "select",
        id: "priority",
        options: [1, 2, 3],
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
    submitBtn.textContent = "Create Task";
    Object.assign(submitBtn.style, {
      marginTop: "20px",
    });
    form.appendChild(submitBtn);
  },

  handleFormSubmission(form, taskCreatorDiv) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const taskName = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const dueDate = document.getElementById("dueDate").value;
      const priority = document.getElementById("priority").value;
      const notes = document.getElementById("notes").value;
      const project = document.getElementById("project").value;

      new TaskDiv(
        taskName,
        description,
        dueDate,
        priority,
        project,
        "inboxContainerDiv"
      );

      // Store tasks in localStorage
      storageFunctions.storeLocally(
        taskName,
        dueDate,
        description,
        priority,
        notes,
        project
      );
      //update the names 
      storageFunctions.displayProjectNames();

      clickActions.NewTaskCreatorPrompt(event);
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

    if (inputName === "notes") {
      Object.assign(input.style, {
        width: "550px",
        height: "70px",
      });
    }

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
