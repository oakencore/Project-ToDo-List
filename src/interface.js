import { NewTaskCreatorPrompt, ChangeDivVisibility } from "./clickActions.js";
import { addClickListenerToDiv } from "./listeners.js";

export function divOrganiser() {
  globalStyling();
  const mainDiv = document.body.appendChild(mainDivCreation());
  mainDivContainerStyling(mainDiv);
  const header = mainDiv.appendChild(headerCreation());
  headerStyling(header);
  header.appendChild(createDivWithText("DO IT!", "headerText"));
  headerTextStyling();
  const contentContainer = mainDiv.appendChild(contentContainerCreation());
  contentContainerStyling(contentContainer);
  const menuPannel = contentContainer.appendChild(menuPannelCreation());
  menuPannelStyling(menuPannel);
  menuPannelDivCreation(menuPannel);
  menuPannelDivCreationProjects(menuPannel);
  menuPannelDivContainerStyling();
  menuPannelDivCreationProjectsStyling();

  //Inbox
  const inbox = contentContainer.appendChild(inboxCreation());
  inboxStyling(inbox);
  const inboxContainer = inboxContainerCreation(inbox);
  inboxContainerStyling(inboxContainer);
  const inboxItem = createDivWithText("Add Task", "task");
  // Passing NewTaskCreatorPrompt as a reference not a prompt, so it will return the function itself not the value.
  addClickListenerToDiv(inboxItem, NewTaskCreatorPrompt);
  inboxContainer.appendChild(inboxItem);
  inboxItemStyling(inboxItem);
  // Task Creator
  const taskCreatordiv = createDivWithText("", "taskCreatorDiv");
  inbox.appendChild(taskCreatordiv);
  taskCreatorDivStyling();
  taskCreatorDivPopulate(taskCreatordiv);


  // Footer
  const footer = mainDiv.appendChild(footerCreation());
  footerStyling(footer);
}

function mainDivCreation() {
  const mainDiv = document.getElementById("content");
  mainDiv.id = "mainDiv";
  return mainDiv;
}

function headerCreation() {
  const header = document.createElement("header");
  header.id = "header";
  return header;
}

function createDivWithText(text, divID) {
  const newDiv = document.createElement("div");
  if (divID) {
    newDiv.id = divID;
  }
  // Check if text is not undefined and is of type string
  // If not, convert it to a string or handle it as needed
  const textContent = text !== undefined && text !== null ? String(text) : "";

  const textNode = document.createTextNode(textContent);
  newDiv.appendChild(textNode);

  return newDiv;
}

function contentContainerCreation() {
  const contentContainer = document.createElement("div");
  contentContainer.id = "contentContainer";
  return contentContainer;
}

function menuPannelCreation() {
  const menuPannel = document.createElement("div");
  menuPannel.id = "menuPannel";
  return menuPannel;
}

function menuPannelDivCreation(menuPannel) {
  const menuPannelDivContainer = document.createElement("div");
  menuPannelDivContainer.setAttribute("id", "menuPannelDivContainer");

  const inboxDiv = createDivWithText("Inbox", "inboxDiv");
  const todayDiv = createDivWithText("Today", "todayDiv");
  const thisWeekDiv = createDivWithText("This Week", "thisWeekDiv");

  menuPannelDivContainer.append(inboxDiv, todayDiv, thisWeekDiv);
  menuPannel.appendChild(menuPannelDivContainer);
}

function menuPannelDivCreationProjects(menuPannel) {
  const menuPannelDivContainerProjects = document.createElement("div");
  menuPannelDivContainerProjects.setAttribute(
    "id",
    "menuPannelDivContainerProjects"
  );

  const projectsTitleTextDiv = createDivWithText(
    "Add Project",
    "projectsTitleTextDiv"
  );

  menuPannelDivContainerProjects.append(projectsTitleTextDiv);
  menuPannel.appendChild(menuPannelDivContainerProjects);
}

function inboxContainerCreation(inbox) {
  const inboxContainerDiv = createDivWithText("", "InboxContainerDiv");
  const inboxContainerDivTitle = createDivWithText(
    "Inbox",
    "inboxContainerTitle"
  );
  inboxContainerDiv.append(inboxContainerDivTitle);
  inbox.appendChild(inboxContainerDiv);
  return inboxContainerDiv;
}

function inboxCreation() {
  const inbox = document.createElement("div");
  inbox.id = "inbox";
  return inbox;
}

function footerCreation() {
  const footer = document.createElement("footer");
  footer.id = "footer";
  return footer;
}

function taskCreatorDivPopulate(taskCreatorDiv) {
  // Create the form element
  const form = document.createElement("form");
  form.id = "taskCreationForm";

  // Helper function to create input fields with labels
  function createInputField(
    labelText,
    inputType,
    inputName,
    isRequired = false
  ) {
    const wrapper = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = labelText;
    label.htmlFor = inputName;
    wrapper.appendChild(label);

    const input = document.createElement("input");
    input.type = inputType;
    input.name = inputName;
    input.id = inputName;
    input.required = isRequired;
    wrapper.appendChild(input);

    return wrapper;
  }

  // Append fields to the form
  form.appendChild(createInputField("Title:", "text", "title", true));
  form.appendChild(createInputField("Due Date:", "date", "dueDate"));
  form.appendChild(createInputField("Description:", "text", "description"));
  form.appendChild(createInputField("Priority:", "text", "priority"));
  form.appendChild(createInputField("Notes:", "text", "notes"));

  // Create a submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Create Task";
  form.appendChild(submitBtn);

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Handle the form data here
    console.log("Form submitted");
  });

  if (taskCreatorDiv) {
    taskCreatorDiv.appendChild(form);
  } else {
    console.error("taskCreatorDiv is not provided or is not a valid element");
  }
}

// Styling
function globalStyling() {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.minHeight = "100vh";
  document.body.style.display = "flex";
  document.body.style.flexDirection = "column";
}

function mainDivContainerStyling(mainDiv) {
  mainDiv.style.display = "flex";
  mainDiv.style.flexDirection = "column";
  mainDiv.style.flexGrow = 1;
}

function headerStyling(header) {
  header.style.display = "flex";
  header.style.flexDirection = "row";
  header.style.backgroundColor = "red";
  header.style.width = "70px%";
  header.style.height = "70px";
}

function headerTextStyling() {
  headerText = document.getElementById("headerText");
  headerText.style.display = "flex";
  headerText.style.flexDirection = "row";
  headerText.style.justifyContent = "center";
  headerText.style.alignItems = "center";
  headerText.style.paddingLeft = "30px";
  headerText.style.fontSize = "45px";
}

function contentContainerStyling(contentContainer) {
  contentContainer.style.display = "flex";
  contentContainer.style.flexDirection = "row";
  contentContainer.style.justifyContent = "space-between";
  //   contentContainer.style.height = "100%"
  // Fill space
  contentContainer.style.flexGrow = 1;
}

function menuPannelStyling(menuPannel) {
  menuPannel.style.flexGrow = 1;
  menuPannel.style.display = "flex";
  menuPannel.style.flexDirection = "column";
  menuPannel.style.justifyContent = "center";
  menuPannel.style.backgroundColor = "grey";
  menuPannel.style.width = "20%";
  menuPannel.style.height = "auto";
  menuPannel.style.padding = "20px";
}

function menuPannelDivContainerStyling() {
  const menuPannelContainer = document.getElementById("menuPannelDivContainer");
  menuPannelContainer.style.display = "flex";
  menuPannelContainer.style.flexDirection = "column";
  menuPannelContainer.style.justifyContent = "space-between";
  menuPannelContainer.style.backgroundColor = "orange";
  menuPannelContainer.style.marginBottom = "30px";
  menuPannelContainer.style.gap = "15px";
}

function menuPannelDivCreationProjectsStyling() {
  const menuPannelContainerProjects = document.getElementById(
    "menuPannelDivContainerProjects"
  );
  menuPannelContainerProjects.style.display = "flex";
  menuPannelContainerProjects.style.flexDirection = "column";
  menuPannelContainerProjects.style.justifyContent = "space-between";
  menuPannelContainerProjects.style.backgroundColor = "yellow";
}

function inboxStyling(inbox) {
  inbox.style.flexGrow = 1;
  inbox.style.display = "flex";
  inbox.style.justifyContent = "center";
  inbox.style.alignItems = "center";
  inbox.style.backgroundColor = "blue";
  inbox.style.width = "70%";
  inbox.style.height = "auto";
}

function inboxContainerStyling(inboxContainer) {
  inboxContainer.style.display = "flex";
  inboxContainer.style.flexDirection = "column";
  inboxContainer.style.backgroundColor = "green";
  inboxContainer.style.width = "80%";
  inboxContainer.style.height = "80%";

  // First CHild
  const firstChild = inboxContainer.firstElementChild;
  if (firstChild) {
    firstChild.style.backgroundColor = "silver";
    firstChild.style.padding = "10px";
    firstChild.style.fontSize = "40px";
  }
}

function inboxItemStyling(inboxItem) {
  const styledInboxItem = inboxItem;
  styledInboxItem.style.backgroundColor = "darkGrey";
  styledInboxItem.style.padding = "10px";
  return styledInboxItem;
}

export function taskCreatorDivStyling() {
  const taskCreatorDiv = document.getElementById("taskCreatorDiv");
  if (taskCreatorDiv) {
    taskCreatorDiv.style.display = "none";
    taskCreatorDiv.style.flexDirection = "column";
    taskCreatorDiv.style.backgroundColor = "violet";
    taskCreatorDiv.style.width = "80%";
    taskCreatorDiv.style.height = "80%";
  }
}

function footerStyling(footer) {
  footer.style.display = "flex";
  footer.style.flexDirection = "row";
  footer.style.backgroundColor = "orange";
  footer.style.width = "100%";
  footer.style.height = "30px";
}
