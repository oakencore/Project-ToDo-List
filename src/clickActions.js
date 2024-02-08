// This function is used toggle the visibility of the task creator and inbox containers.
// It works by checking what is clicked, if it's the add taskPrompt, show taskCreator. If it's taskCreator, show inbox.
import { displayTodaysTasks } from "./interface.js";

export function NewTaskCreatorPrompt(event) {
  const clickedElement = event.target;
  
  // Handler checking
  if (clickedElement.id === "addTaskPrompt" || clickedElement.closest("#addTaskPrompt")) {
    handleAddTaskPromptClick();
  } else if (clickedElement.id === "taskCreatorDiv" || clickedElement.closest("#taskCreatorDiv")) {
    handleTaskCreatorDivClick();
  } else if (clickedElement.id === "todayDiv" || clickedElement.closest("#todayDiv")) {
    handleTodayDivClick();
  }
}


function handleAddTaskPromptClick() {
  console.log("AddTaskPrompt Div clicked!");
  ChangeInboxVisibility(false);
  ChangeTodayVisibility(false);
  taskCreatorDivVisibility(true);
}

function handleTaskCreatorDivClick() {
  console.log("TaskCreator Div clicked!");
  ChangeInboxVisibility(true);
  ChangeTodayVisibility(false);
  taskCreatorDivVisibility(false);
}

function handleTodayDivClick() {
  console.log("Today Div clicked!");
  ChangeInboxVisibility(false);
  ChangeTodayVisibility(true);
  taskCreatorDivVisibility(false);
  displayTodaysTasks();
}

export function ChangeTodayVisibility(show) {
  const todayContainer = document.getElementById("todayContainerDiv");
  if (todayContainer) {
    todayContainer.style.display = show ? "flex" : "none";
  }
}

export function ChangeInboxVisibility(show) {
  const inboxContainer = document.getElementById("InboxContainerDiv");
  if (inboxContainer) {
    inboxContainer.style.display = show ? "flex" : "none";
  }
}

export function taskCreatorDivVisibility(show) {
  const taskCreatorDiv = document.getElementById("taskCreatorDiv");
  if (taskCreatorDiv) {
    taskCreatorDiv.style.display = show ? "flex" : "none";
  }
}
