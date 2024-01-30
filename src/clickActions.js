export function NewTaskCreatorPrompt() {
  console.log("Div clicked!");
  // this will refer to whatever is clicked
  ChangeInboxVisibility(this);
  taskCreatorDivVisibility();
}

function ChangeInboxVisibility(childDiv) {
  // USAGE:
  // const divName = document.getElementById("divID");
  // ChangeInboxVisibility(childDivName)
  console.log("ChangeInboxVisibility called for", childDiv);

  const parentDiv = childDiv.parentNode;

  if (parentDiv) {
    console.log("Hiding parent div", parentDiv);
    parentDiv.style.display = "none";
  }
}

function taskCreatorDivVisibility() {
  console.log("taskCreatorDivVisibility called");
  const taskCreatorDiv = document.getElementById("taskCreatorDiv");

  // Check if the element exists and toggle its display style
  if (taskCreatorDiv) {
    taskCreatorDiv.style.display = taskCreatorDiv.style.display === "none" ? "flex" : "none";
  }
}


// User clicks add task div
// Inbox container view should be set to none.
// New Task Creation Container should be set to visible.
