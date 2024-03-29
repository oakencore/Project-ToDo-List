import { stylingFunctions } from "./stylingFunctions.js";
import { storageFunctions } from "./storageFunctions.js";
import { formFunctions } from "./formFunctions.js";

export function divOrganiser() {
  stylingFunctions.loadFontAwesome();
  stylingFunctions.loadGoogleFonts();
  stylingFunctions.globalStyling();

  const mainDiv = document.body.appendChild(mainDivCreation());
  stylingFunctions.mainDivContainerStyling(mainDiv);

  setupHeader(mainDiv);

  const contentContainer = setupContentContainer(mainDiv);
  const menuPanel = setupMenuPanel(contentContainer);

  // Inbox section
  const { inbox } = setupInbox(contentContainer);

  // Task editor
  setupTaskEditorDiv(inbox);

  // Task creator
  setupTaskCreatorDiv(inbox);

  // Today's tasks section
  setupTodaySection(inbox);

  // This week's tasks section
  setupWeekSection(inbox);

  // Projects section
  setupProjectsSection(menuPanel);
  setupProjectsMainContainerDivCreation(inbox);

  // Loading and displaying tasks and dummy storage so I can test for many tasks at once.
  // storageFunctions.populateDummyLocalStorage(100);
  storageFunctions.loadTasksFromLocalStorage();
  storageFunctions.displayTodaysTasks();
  storageFunctions.displayWeekTasks();
  storageFunctions.displayProjectNames();
  // Used document.body instead of the main container to ensure the footer is always at the bottom of the display.
  setupFooter(document.body);
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
  header.appendChild(createDivWithText("TaskDiv Supreme", "headerText"));
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
  const inbox = contentContainer.appendChild(createDivWithText("", "inbox"));
  stylingFunctions.inboxStyling(inbox);
  const inboxContainer = createDivWithText("", "inboxContainerDiv");
  inbox.appendChild(inboxContainer);
  const inboxContainerDivTitle = createDivWithText(
    "Inbox",
    "inboxContainerTitle",
    ""
  );
  inboxContainer.append(inboxContainerDivTitle);

  const inboxItem = createDivWithText(
    "Add Task",
    "addTaskPrompt",
    "fas fa-plus-circle"
  );
  stylingFunctions.ClickStyling(inboxItem);

  inboxContainer.appendChild(inboxItem);
  stylingFunctions.inboxItemStyling(inboxItem);
  stylingFunctions.inboxContainerStyling(inboxContainer);
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
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formFunctions.handleFormSubmission(event);
  });
  const closeIconDiv = formFunctions.createCloseIconDiv();
  taskCreatorDiv.appendChild(closeIconDiv);
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

// ---------------------------
// Task Editor
// ---------------------------
function setupTaskEditorDiv(inbox) {
  const taskEditorDiv = createDivWithText("", "taskEditorDiv");
  inbox.appendChild(taskEditorDiv);
  stylingFunctions.taskEditorDivStyling();
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
// TODO should probably remove unused functionality. Thought I'd need it. 
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
