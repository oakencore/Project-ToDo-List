import { clickActions } from "./clickActions.js";
import { addClickListenerToDiv } from "./listeners.js";
import { stylingFunctions } from "./stylingFunctions.js";
import { storageFunctions } from "./storageFunctions.js";
import { formFunctions } from "./formFunctions.js";
import { TaskDiv } from "./TaskDiv.js";

export function divOrganiser() {
  storageFunctions.populateDummyLocalStorage(4);
  const localStorageItems = storageFunctions.parsedStorage();
  // console.log(
  //   "Object containing todays tasks:",
  //   storageFunctions.getTodaysTasks(localStorageItems)
  // );

  stylingFunctions.loadFontAwesome();
  stylingFunctions.loadGoogleFonts();
  stylingFunctions.globalStyling();

  const mainDiv = document.body.appendChild(mainDivCreation());
  stylingFunctions.mainDivContainerStyling(mainDiv);

  setupHeader(mainDiv);
  const contentContainer = setupContentContainer(mainDiv);
  const menuPanel = setupMenuPanel(contentContainer);
  // Inbox
  const { inbox, inboxContainer } = setupInbox(contentContainer);
  // Task Creator
  setupTaskCreatorDiv(inbox);
  // Task Editor
  setupTaskEditorDiv(inbox);

  // Today
  setupTodaySection(inbox);
  // Week
  setupWeekSection(inbox);
  // Projects
  setupProjectsSection(menuPanel);
  setupProjectsMainContainerDivCreation(inbox)
  // Load Tasks from Local Storage
  loadTasksFromLocalStorage();
  // Display todays tasks
  storageFunctions.displayTodaysTasks();
  // Display week tasks
  storageFunctions.displayWeekTasks();
  // Display project names
  storageFunctions.displayProjectNames();

  setupFooter(mainDiv);
}

// ---------------------------
// Main Div and Header Setup
// ---------------------------
function mainDivCreation() {
  const mainDiv = document.getElementById("content");
  if (!mainDiv) {
    console.error("mainDiv ('content') not found in the DOM");
    return;
  }
  mainDiv.id = "mainDiv";
  // console.log("Main div created:", mainDiv);
  return mainDiv;
}

function headerCreation() {
  const header = document.createElement("header");
  header.id = "header";
  return header;
}

function setupHeader(mainDiv) {
  const header = mainDiv.appendChild(headerCreation());
  stylingFunctions.headerStyling(header);
  header.appendChild(createDivWithText("DO IT!", "headerText"));
  stylingFunctions.headerTextStyling();
}

// ---------------------------
// Content Container Setup
// ---------------------------
function setupContentContainer(mainDiv) {
  const contentContainer = mainDiv.appendChild(contentContainerCreation());
  stylingFunctions.contentContainerStyling(contentContainer);
  return contentContainer;
}

function contentContainerCreation() {
  const contentContainer = createDivWithText("", "contentContainer");
  return contentContainer;
}

// ---------------------------
// Menu Panel Setup
// ---------------------------
function setupMenuPanel(contentContainer) {
  const menuPanel = contentContainer.appendChild(menuPanelCreation());
  stylingFunctions.menuPanelStyling(menuPanel);
  menuPanelDivCreation(menuPanel);
  stylingFunctions.menuPanelDivContainerStyling();
  menuPanel.appendChild(createProjectsTitleTextDiv());
  menuPanelDivCreationProjects(menuPanel);
  stylingFunctions.menuPanelDivCreationProjectsTitleStyling();
  return menuPanel;
}

function menuPanelCreation() {
  const menuPanel = createDivWithText("", "menuPanel");
  return menuPanel;
}

function menuPanelDivCreation(menuPanel) {
  const menuPanelDivContainer = createDivWithText("", "menuPanelDivContainer");
  const inboxDiv = createDivWithText("Inbox", "inboxDiv", "fas fa-inbox");
  stylingFunctions.ClickStyling(inboxDiv);
  const todayDiv = createDivWithText(
    "Today",
    "todayDiv",
    "fas fa-calendar-day"
  );
  stylingFunctions.ClickStyling(todayDiv);
  const thisWeekDiv = createDivWithText(
    "This Week",
    "thisWeekDiv",
    "fas fa-calendar-week"
  );
  stylingFunctions.ClickStyling(thisWeekDiv);

  menuPanelDivContainer.append(inboxDiv, todayDiv, thisWeekDiv);
  menuPanel.appendChild(menuPanelDivContainer);
}

function menuPanelDivCreationProjects(menuPanel) {
  const menuPanelDivContainerProjects = createDivWithText(
    "",
    "menuPanelDivContainerProjects"
  );
  menuPanel.appendChild(menuPanelDivContainerProjects);
  projectsDivsCreation(menuPanelDivContainerProjects);
}

// ---------------------------
// Inbox
// ---------------------------
function setupInbox(contentContainer) {
  console.log("Starting setupInbox...");

  // Create and style the inbox
  const inbox = contentContainer.appendChild(createDivWithText("", "inbox"));
  console.log("Inbox created:", inbox);
  stylingFunctions.inboxStyling(inbox);

  // Create inbox container
  const inboxContainer = createDivWithText("", "inboxContainerDiv");
  console.log("Inbox container created:", inboxContainer);

  // Append the inbox container to the inbox
  inbox.appendChild(inboxContainer);
  console.log("Inbox container appended to inbox");

  // Create and append the inbox container title
  const inboxContainerDivTitle = createDivWithText(
    "Inbox",
    "inboxContainerTitle",
    ""
  );
  console.log(
    "Appending inboxContainerDivTitle to inboxContainer",
    inboxContainer
  );
  inboxContainer.append(inboxContainerDivTitle);
  console.log("inboxContainerDivTitle appended:", inboxContainerDivTitle);

  // Create and style the inbox item (e.g., "Add Task" button) within the inbox container
  console.log("Setting up inbox item in:", inboxContainer);
  const inboxItem = createDivWithText(
    "Add Task",
    "addTaskPrompt",
    "fas fa-plus-circle"
  );
  stylingFunctions.ClickStyling(inboxItem);

  // Add click listener to open the task creation form
  addClickListenerToDiv(inboxItem, clickActions.NewTaskCreatorPrompt);
  console.log("Appending inboxItem to inboxContainer", inboxContainer);
  inboxContainer.appendChild(inboxItem);
  console.log("inboxItem appended:", inboxItem);
  stylingFunctions.inboxItemStyling(inboxItem);
  console.log("Inbox item setup complete in:", inboxContainer);

  stylingFunctions.inboxContainerStyling(inboxContainer);

  console.log("Inbox and inbox container setup complete.");
  return { inbox, inboxContainer };
}

// ---------------------------
// Task Creator
// ---------------------------
function setupTaskCreatorDiv(inbox) {
  const taskCreatorDiv = createDivWithText("", "taskCreatorDiv");
  taskCreatorDivPopulate(taskCreatorDiv);
  inbox.appendChild(taskCreatorDiv);
  stylingFunctions.taskCreatorDivStyling();
  return taskCreatorDiv;
}

function taskCreatorDivPopulate(taskCreatorDiv) {
  const form = formFunctions.createForm();
  formFunctions.addInputFieldsToForm(form);
  formFunctions.appendSubmitButtonToForm(form);
  formFunctions.handleFormSubmission(form, taskCreatorDiv);

  // Add close icon div and append to the taskcreatordiv
  const closeIconDiv = formFunctions.createCloseIconDiv();
  taskCreatorDiv.appendChild(closeIconDiv);
  closeIconDiv.addEventListener("click", clickActions.NewTaskCreatorPrompt);
  taskCreatorDiv.appendChild(form);
}

// ---------------------------
// Today Section Setup
// ---------------------------
function setupTodaySection(inbox) {
  const today = createDivWithText("", "today");
  stylingFunctions.todayStyling(today);

  const todayContainerDiv = createDivWithText("", "todayContainerDiv");

  const todayContainerDivTitle = createDivWithText(
    "Today",
    "todayContainerDivTitle"
  );

  todayContainerDiv.appendChild(todayContainerDivTitle);
  stylingFunctions.todayContainerStyling(todayContainerDiv);
  today.appendChild(todayContainerDiv);

  inbox.appendChild(today);

  return todayContainerDiv;
}

// ---------------------------
// Week Section Setup
// ---------------------------
function setupWeekSection(inbox) {
  const week = createDivWithText("", "week");
  stylingFunctions.weekStyling(week);

  const weekContainerDiv = createDivWithText("", "weekContainerDiv");

  const weekContainerDivTitle = createDivWithText(
    "Week",
    "weekContainerDivTitle"
  );

  weekContainerDiv.appendChild(weekContainerDivTitle);
  stylingFunctions.weekContainerStyling(weekContainerDiv);
  week.appendChild(weekContainerDiv);

  inbox.appendChild(week);

  return weekContainerDiv;
}

// ---------------------------
// Projects Setup
// ---------------------------


function projectsDivsCreation(menuPanelDivContainerProjects) {
  const projectsContainer = createDivWithText("", "projectsContainer");
  
  menuPanelDivContainerProjects.append(projectsContainer);
}

function setupProjectsMainContainerDivCreation(inbox) {
  const projectsMainContainer = createDivWithText("", "projectsMainContainer");

  const projectsMainContainerDivtitle = createDivWithText(
    "Project",
    "projectsMainContainerDivtitle"
  );

  projectsMainContainer.appendChild(projectsMainContainerDivtitle);

  stylingFunctions.ProjectsMainContainerDivStyling(projectsMainContainer);

  inbox.append(projectsMainContainer);
}


function createProjectsTitleTextDiv() {
  return createDivWithText(
    "Projects",
    "projectsTitleTextDiv",
    "fas fa-project-diagram",
    true
  );
}

function setupProjectsSection(menuPanel) {
  const projectsContainerDiv = createDivWithText("", "projectsContainerDiv");
  stylingFunctions.projectContainerStyling(projectsContainerDiv); 

  menuPanel.appendChild(projectsContainerDiv); 
}

function setupProjectTasksSection(inbox, projectName) {
  const projectTasks = createDivWithText("", `${projectName}-tasks`);
  stylingFunctions.projectTasksStyling(projectTasks);

  const projectTasksContainerDiv = createDivWithText(
    "",
    `${projectName}-tasksContainerDiv`
  );

  const projectTasksContainerDivTitle = createDivWithText(
    projectName,
    `${projectName}-tasksContainerDivTitle`
  );

  projectTasksContainerDiv.appendChild(projectTasksContainerDivTitle);
  stylingFunctions.projectContainerStyling(projectTasksContainerDiv);
  projectTasks.appendChild(projectTasksContainerDiv);

  projectTasks.style.display = "none";

  inbox.appendChild(projectTasks);

  return projectTasksContainerDiv;
}

// ---------------------------
// Task Editor
// ---------------------------
function setupTaskEditorDiv(inbox) {
  const taskEditorDiv = createDivWithText("", "taskEditorDiv");
  inbox.appendChild(taskEditorDiv);
  stylingFunctions.taskEditorDivStyling()
  return taskEditorDiv;
}

// ---------------------------
// Footer Setup
// ---------------------------
function footerCreation() {
  const footer = document.createElement("footer");
  footer.id = "footer";
  return footer;
}

function setupFooter(mainDiv) {
  const footer = mainDiv.appendChild(footerCreation());
  stylingFunctions.footerStyling(footer);
}

// ---------------------------
// Utility Functions
// ---------------------------
export function createDivWithText(
  text,
  divID,
  iconClass = "",
  useFlex = false
) {
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

function loadTasksFromLocalStorage() {
  const tasks = storageFunctions.parsedStorage();
  const inboxContainerDiv = document.getElementById("inboxContainerDiv");
  if (!inboxContainerDiv) {
    console.error("inboxContainerDiv not found in the DOM");
    return;
  }
  Object.keys(tasks).forEach((key) => {
    const task = tasks[key];
    console.log("Appending task to inboxContainerDiv:", task);
    new TaskDiv(
      task.title,
      task.description,
      task.dueDate,
      task.priority,
      task.project,
      "inboxContainerDiv"
    );
  });
}

function refreshTasksDisplay() {
  storageFunctions.displayTodaysTasks();
  storageFunctions.displayWeekTasks();
  storageFunctions.displayProjectNames();
  clickActions.setupTaskClickListeners();
}

