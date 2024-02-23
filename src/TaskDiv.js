import { stylingFunctions } from "./stylingFunctions.js";
import { formFunctions } from "./formFunctions.js";
import { storageFunctions } from "./storageFunctions.js";
import { v4 as uuidv4 } from "uuid";

export class TaskDiv {
  constructor({
    taskId,
    title,
    description,
    dueDate,
    priority,
    project,
    parentElementId,
  }) {

    // Task ID must be provided or provide a new UNIQUE!one
    this.id = taskId || uuidv4();

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;

    // Find the parent to append to
    const parentElement = document.getElementById(parentElementId);
    if (!parentElement) {
      console.error(`[Error] Parent element with ID ${parentElementId} not found.`);
      return;
    }

    // Create the task element and set its properties.
    this.element = document.createElement("div");
    this.element.id = this.id;
    this.element.classList.add("task-item");
    this.element.dataset.taskId = this.id;

    // Create and append a checkbox to the task.
    const checkBox = formFunctions.createCheckbox();
    checkBox.addEventListener("change", (event) => {
      // Prevent event from bubbling up to the parent DOM item.
      event.stopPropagation();
      storageFunctions.completeTaskAndRemove(this.id);
      this.element.remove();
      storageFunctions.displayProjectNames();
    });

    // Prepend checkbox to allow marking tasks as completed.
    this.element.prepend(checkBox);

    // Add task details to the element.
    const detailsArray = [
      title,
      `Description: ${description}`,
      `Due: ${dueDate}`,
      `Priority: ${priority}`,
      `Project: ${project}`,
    ];

    detailsArray.forEach((detail, index) => {
      const detailElement = document.createElement("div");
      detailElement.textContent = detail;
      this.element.appendChild(detailElement);
    });

    stylingFunctions.newTaskStyling(this.element);
    parentElement.appendChild(this.element);
  }

  getElement() {
    return this.element;
  }
}
