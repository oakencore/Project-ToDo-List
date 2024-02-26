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

  handleFormSubmission(event) {
    console.log("handleFormSubmission executed! - version 1");
    console.log("About to start form submission logic...");
  
    // Extract form values, including taskId
    const taskId = document.getElementById("taskId").value;
    console.log("Task ID is:", taskId);
  
    const title = document.getElementById("title").value.trim();
    console.log("Form title value is:", title);
  
    const description = document.getElementById("description").value.trim();
    console.log("Form description value is:", description);
  
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
      project
    };

    console.log("Form data extracted:", taskDetails); 
    // Check if task exists in localStorage
    const existingTask = storageFunctions.getTaskDetails(taskId);
    console.log("Result of getTaskDetails():", existingTask);
  
    // Update or Create task
    if (existingTask) {
      console.log("Existing task found. Calling storageFunctions.updateTask()");
      debugger;
      storageFunctions.updateTask(taskId, taskDetails);
    } else {
      console.log("New task detected. Calling storageFunctions.storeLocally()");
      debugger; 
      storageFunctions.storeLocally(taskDetails);
      console.log("Newly added task:", taskDetails);
      console.log("Tasks in localStorage:", localStorage);
    }
  
    // Refresh display, reset form, hide creator
    storageFunctions.refreshTasksDisplay();
    storageFunctions.displayProjectNames();
    clickActions.showInbox();
  
    form.reset();
    document.getElementById("taskId").value = "";
    taskCreatorDiv.style.display = "none";
  
    // Re-setup checkbox listeners
    clickActions.setupTaskClickListeners();
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
