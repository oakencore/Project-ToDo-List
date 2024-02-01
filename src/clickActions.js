// This function is used toggle the visibility of the task creator and inbox containers.
// It works by checking what is clicked, if it's the add taskPrompt, show taskCreator. If it's taskCreator, show inbox.
export function NewTaskCreatorPrompt(event) {
  console.log("Div clicked!");
  // What is clicked?
  const clickedElement = event.target;

  // Check if it's the 'addTaskPrompt' / Hide the inbox and show the task creator
  if (
    clickedElement.id === "addTaskPrompt" ||
    clickedElement.closest("#addTaskPrompt")
  ) {
    ChangeInboxVisibility(false);
    taskCreatorDivVisibility(true);
  }
  // Check if it's the 'taskCreatorDiv' or a child of it / Show the inbox and hide the task creator
  else if (
    clickedElement.id === "taskCreatorDiv" ||
    clickedElement.closest("#taskCreatorDiv")
  ) {
    ChangeInboxVisibility(true);
    taskCreatorDivVisibility(false);
  }
}

function ChangeInboxVisibility(show) {
  const inboxContainer = document.getElementById("InboxContainerDiv");
  if (inboxContainer) {
    inboxContainer.style.display = show ? "flex" : "none";
  }
}

function taskCreatorDivVisibility(show) {
  const taskCreatorDiv = document.getElementById("taskCreatorDiv");
  if (taskCreatorDiv) {
    taskCreatorDiv.style.display = show ? "flex" : "none";
  }
}
