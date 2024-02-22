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
    console.log(`[Debug] Creating TaskDiv with ID: ${taskId}, Parent Element ID: ${parentElementId}`);
    
    // Task ID must be provided or provide a new one
    this.id = taskId || uuidv4();
    console.log(`[Debug] Task ID after check: ${this.id}`);

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
    } else {
      console.log(`[Debug] Found parent element with ID ${parentElementId}`);
    }

    // Create the task element and set its properties.
    this.element = document.createElement("div");
    this.element.id = this.id;
    this.element.classList.add("task-item");
    this.element.dataset.taskId = this.id;
    console.log(`[Debug] Task element created with ID: ${this.id}`);

    // Create and append a checkbox to the task.
    const checkBox = formFunctions.createCheckbox();
    checkBox.addEventListener("change", (event) => {
      event.stopPropagation(); // Prevent event from bubbling up to the parent DOM item.
      console.log(`[Debug] Checkbox change event for Task ID: ${this.id}`);
      storageFunctions.completeTaskAndRemove(this.id);
    });

    this.element.prepend(checkBox); // Prepend checkbox to allow marking tasks as completed.

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
      console.log(`[Debug] Added detail to task: ${detail}, Index: ${index}`);
    });

    stylingFunctions.newTaskStyling(this.element);
    parentElement.appendChild(this.element);
    console.log(`[Debug] TaskDiv appended to parent with ID: ${parentElementId}`);
  }

  getElement() {
    return this.element;
  }
}







