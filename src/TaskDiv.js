// Import necessary functions and styles
import { stylingFunctions } from "./stylingFunctions.js";
import { createDivWithText } from "./interface.js";
import { formFunctions } from "./formFunctions.js";

export function createTaskDetails(taskDiv, details) {
  console.log("Creating task details...", details);
  details.forEach(({ detail, prefix }) => {
    console.log(`Adding detail: ${prefix}${detail}`);
    if (detail) {
      const textNode = document.createTextNode(`${prefix}${detail}`);
      taskDiv.appendChild(textNode);
    }
  });
}

// Manage state of each task
export class TaskDiv {
  constructor(taskName, description, dueDate, priority, parentElementId) {
    console.log(`Creating new TaskDiv: ${taskName}`);
    this.taskName = taskName;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    TaskDiv.counter = (TaskDiv.counter || 0) + 1;
    this.id = `Task-${TaskDiv.counter}`;

    // Check to see if there as a parent element so it can be attached to other divs
    const parentElement = document.getElementById(parentElementId);
    if (!parentElement) {
      console.error(`Parent element with ID ${parentElementId} not found.`);
      return;
    }

    // Create task div and append it to parent element
    const taskDiv = createDivWithText(taskName, this.id, "", true);
    // adding task-item class name to see if I can give new tasks a class to apply styling to.
    taskDiv.classList.add("task-item");
    const checkBox = formFunctions.createCheckbox();
    taskDiv.insertBefore(checkBox, taskDiv.firstChild);
    createTaskDetails(taskDiv, [
      { detail: this.description, prefix: " Description: " },
      { detail: this.dueDate, prefix: " Due: " },
      { detail: this.priority, prefix: " Priority: " },
    ]);
    stylingFunctions.newTaskStyling(taskDiv);
    parentElement.appendChild(taskDiv);

    console.log(`TaskDiv created and appended with ID: ${this.id}`);
  }
}

// Factory function to create and append a task div in the DOM
export function createAndAppendTask({
  parentElementId,
  taskName,
  description,
  dueDate,
  priority,
}) {
  console.log(
    `Attempting to append task '${taskName}' to parentElementId: ${parentElementId}`
  );
  const parentElement = document.getElementById(parentElementId);
  if (!parentElement) {
    console.error(`Parent element with ID ${parentElementId} not found.`);
    return;
  }

  const taskDiv = createDivWithText(taskName, "", "", true);
  console.log(`Task div created for: ${taskName}`);

  const checkBox = formFunctions.createCheckbox();
  console.log("Checkbox created and adding to task div...");
  taskDiv.insertBefore(checkBox, taskDiv.firstChild);

  console.log("Adding task details...");
  createTaskDetails(taskDiv, [
    { detail: description, prefix: " Description: " },
    { detail: dueDate, prefix: " Due: " },
    { detail: priority, prefix: " Priority: " },
  ]);

  console.log("Applying styling to task div...");
  stylingFunctions.newTaskStyling(taskDiv);
  console.log(`Appending task div to parentElementId: ${parentElementId}`);
  parentElement.appendChild(taskDiv);
}
