import { NewTaskCreatorPrompt } from "./clickActions.js";
import { addClickListenerToDiv } from "./listeners.js";

export function divOrganiser() {
  loadFontAwesome();
  loadGoogleFonts();
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

  menuPannelDivContainerStyling();
  const projectTitle = createProjectsTitleTextDiv();
  menuPannel.appendChild(projectTitle);
  menuPannelDivCreationProjects(menuPannel);
  menuPannelDivCreationProjectsTitleStyling();

  //Inbox
  const inbox = contentContainer.appendChild(inboxCreation());
  inboxStyling(inbox);
  const inboxContainer = inboxContainerCreation(inbox);
  inboxContainerStyling(inboxContainer);
  const inboxItem = createDivWithText("Add Task", "task", "fas fa-plus-circle");
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

function createDivWithText(text, divID, iconClass = "", useFlex = false) {
  const newDiv = document.createElement("div");
  if (divID) {
    newDiv.id = divID;
  }

  if (useFlex) {
    newDiv.style.display = "flex";
    newDiv.style.alignItems = "center";
    newDiv.style.flexDirection = "row";
  }

  if (iconClass) {
    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.style.marginRight = "10px";
    icon.style.color = "#c34a36";
    newDiv.appendChild(icon);
  }

  if (text) {
    const textNode = document.createTextNode(text);
    newDiv.appendChild(textNode);
  }

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

  const inboxDiv = createDivWithText("Inbox", "inboxDiv", "fas fa-inbox");
  const todayDiv = createDivWithText(
    "Today",
    "todayDiv",
    "fas fa-calendar-day"
  );
  const thisWeekDiv = createDivWithText(
    "This Week",
    "thisWeekDiv",
    "fas fa-calendar-week"
  );

  menuPannelDivContainer.append(inboxDiv, todayDiv, thisWeekDiv);
  menuPannel.appendChild(menuPannelDivContainer);
}

function menuPannelDivCreationProjects(menuPannel) {
  const menuPannelDivContainerProjects = document.createElement("div");
  menuPannelDivContainerProjects.setAttribute(
    "id",
    "menuPannelDivContainerProjects"
  );
  menuPannel.appendChild(menuPannelDivContainerProjects);
  projectsDivsCreation(menuPannelDivContainerProjects);
}

function projectsDivsCreation(menuPannelDivContainerProjects) {
  const addProject = createDivWithText(
    "Add Project",
    "addProjectDiv",
    "fas fa-plus-circle"
  );
  menuPannelDivContainerProjects.append(addProject);
}

function createProjectsTitleTextDiv() {
  return createDivWithText(
    "Projects",
    "projectsTitleTextDiv",
    "fas fa-project-diagram",
    true
  );
}

function inboxContainerCreation(inbox) {
  const inboxContainerDiv = createDivWithText("", "InboxContainerDiv");
  const inboxContainerDivTitle = createDivWithText(
    "Inbox",
    "inboxContainerTitle",
    ""
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
  document.body.style.fontFamily = "'Roboto', sans-serif";
}

function mainDivContainerStyling(mainDiv) {
  mainDiv.style.display = "flex";
  mainDiv.style.flexDirection = "column";
  mainDiv.style.flexGrow = 1;
}

function headerStyling(header) {
  header.style.display = "flex";
  header.style.flexDirection = "row";
  header.style.backgroundColor = "#4b4453";
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
  headerText.style.color = "#c34a36";
}

function contentContainerStyling(contentContainer) {
  contentContainer.style.display = "flex";
  contentContainer.style.flexDirection = "row";
  contentContainer.style.justifyContent = "space-between";
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
  menuPannelContainer.style.marginBottom = "30px";
  menuPannelContainer.style.gap = "15px";
}

function menuPannelDivCreationProjectsTitleStyling() {
  const menuPannelContainerProjects = document.getElementById(
    "projectsTitleTextDiv"
  );
  menuPannelContainerProjects.style.display = "flex";
  menuPannelContainerProjects.style.flexDirection = "row";
  menuPannelContainerProjects.style.fontSize = "30px";
  menuPannelContainerProjects.style.marginBottom = "15px";
  menuPannelContainerProjects.style.color = "#c34a36";
}

function inboxStyling(inbox) {
  inbox.style.flexGrow = 1;
  inbox.style.display = "flex";
  inbox.style.justifyContent = "center";
  inbox.style.alignItems = "center";
  inbox.style.backgroundColor = "#b0a8b9";
  inbox.style.width = "70%";
  inbox.style.height = "auto";
  inbox.style.color = "#ff8066";
}

function inboxContainerStyling(inboxContainer) {
  inboxContainer.style.display = "flex";
  inboxContainer.style.flexDirection = "column";

  inboxContainer.style.width = "80%";
  inboxContainer.style.height = "80%";

  // First CHild
  const firstChild = inboxContainer.firstElementChild;
  if (firstChild) {
    firstChild.style.backgroundColor = "#b0a8b9";
    firstChild.style.padding = "10px";
    firstChild.style.fontSize = "40px";
  }
}

function inboxItemStyling(inboxItem) {
  const styledInboxItem = inboxItem;
  // remember that 0.5 = 50% opacity
  styledInboxItem.style.backgroundColor = "rgba(132, 94, 194, 0.5)";
  styledInboxItem.style.padding = "10px";
  return styledInboxItem;
}

export function taskCreatorDivStyling() {
  const taskCreatorDiv = document.getElementById("taskCreatorDiv");
  if (taskCreatorDiv) {
    taskCreatorDiv.style.display = "none";
    taskCreatorDiv.style.flexDirection = "column";
    taskCreatorDiv.style.backgroundColor = "#845ec2";
    taskCreatorDiv.style.width = "80%";
    taskCreatorDiv.style.height = "80%";
  }
}

function footerStyling(footer) {
  footer.style.display = "flex";
  footer.style.flexDirection = "row";
  footer.style.backgroundColor = "#4b4453";
  footer.style.width = "100%";
  footer.style.height = "30px";
}

// Icons and Fonts
function loadFontAwesome() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
  document.head.appendChild(link);
}

function loadGoogleFonts() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
  document.head.appendChild(link);
}
