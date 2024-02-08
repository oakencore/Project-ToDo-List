import { clickActions } from "./clickActions.js";
import { addClickListenerToDiv } from "./listeners.js";
import { stylingFunctions } from "./stylingFunctions.js";
import { storageFunctions } from "./storageFunctions.js";

export function divOrganiser() {
  storageFunctions.populateDummyLocalStorage(10);
  const localStorageItems = storageFunctions.parsedStorage();
  console.log(
    "Object containing todays tasks:",
    storageFunctions.getTodaysTasks(localStorageItems)
  );

  stylingFunctions.loadFontAwesome();
  stylingFunctions.loadGoogleFonts();
  stylingFunctions.globalStyling();

  const mainDiv = document.body.appendChild(mainDivCreation());
  stylingFunctions.mainDivContainerStyling(mainDiv);

  setupHeader(mainDiv);
  const contentContainer = setupContentContainer(mainDiv);
  setupMenuPanel(contentContainer);
  // Inbox
  const { inbox, inboxContainer } = setupInbox(contentContainer);
  setupTaskCreatorDiv(inbox);
  // Today
  setupTodaySection(inbox);

  setupFooter(mainDiv);
}

function setupHeader(mainDiv) {
  const header = mainDiv.appendChild(headerCreation());
  stylingFunctions.headerStyling(header);
  header.appendChild(createDivWithText("DO IT!", "headerText"));
  stylingFunctions.headerTextStyling();
}

function setupContentContainer(mainDiv) {
  const contentContainer = mainDiv.appendChild(contentContainerCreation());
  stylingFunctions.contentContainerStyling(contentContainer);
  return contentContainer;
}

function setupMenuPanel(contentContainer) {
  const menuPanel = contentContainer.appendChild(menuPanelCreation());
  stylingFunctions.menuPanelStyling(menuPanel);
  menuPanelDivCreation(menuPanel);
  stylingFunctions.menuPanelDivContainerStyling();
  menuPanel.appendChild(createProjectsTitleTextDiv());
  menuPanelDivCreationProjects(menuPanel);
  stylingFunctions.menuPanelDivCreationProjectsTitleStyling();
}

function setupInbox(contentContainer) {
  const inbox = contentContainer.appendChild(inboxCreation());
  stylingFunctions.inboxStyling(inbox);
  const inboxContainer = inboxContainerCreation(inbox);
  stylingFunctions.inboxContainerStyling(inboxContainer);
  setupInboxItem(inboxContainer);
  return { inbox, inboxContainer };
}

function setupTaskCreatorDiv(inbox) {
  const taskCreatorDiv = createDivWithText("", "taskCreatorDiv");
  taskCreatorDivPopulate(taskCreatorDiv);
  inbox.appendChild(taskCreatorDiv);
  stylingFunctions.taskCreatorDivStyling();
  return taskCreatorDiv;
}

function setupInboxItem(inboxContainer) {
  const inboxItem = createDivWithText(
    "Add Task",
    "addTaskPrompt",
    "fas fa-plus-circle"
  );
  stylingFunctions.ClickStyling(inboxItem);
  // Learned that passing a reference by removing parantheses means "heres the function to call when the event happens" adding parantheses would call the function immediatley.
  addClickListenerToDiv(inboxItem, clickActions.NewTaskCreatorPrompt);
  inboxContainer.appendChild(inboxItem);
  stylingFunctions.inboxItemStyling(inboxItem);
}

function setupTodaySection(inbox) {
  const today = createDivWithText("", "today");
  const todayContainerDiv = createDivWithText("", "todayContainerDiv");
  const todayContainerDivTitle = createDivWithText(
    "Today",
    "todayContainerDivTitle"
  );

  todayContainerDiv.appendChild(todayContainerDivTitle);
  today.appendChild(todayContainerDiv);
  inbox.appendChild(today);

  stylingFunctions.todayContainerStyling(today);

  return todayContainerDiv;
}

function footerCreation() {
  const footer = document.createElement("footer");
  footer.id = "footer";
  return footer;
}

function setupFooter(mainDiv) {
  const footer = mainDiv.appendChild(footerCreation());
  stylingFunctions.footerStyling(footer);
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

function menuPanelCreation() {
  const menuPanel = document.createElement("div");
  menuPanel.id = "menuPanel";
  return menuPanel;
}

function menuPanelDivCreation(menuPanel) {
  const menuPanelDivContainer = document.createElement("div");
  menuPanelDivContainer.setAttribute("id", "menuPanelDivContainer");

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
  const menuPanelDivContainerProjects = document.createElement("div");
  menuPanelDivContainerProjects.setAttribute(
    "id",
    "menuPanelDivContainerProjects"
  );
  menuPanel.appendChild(menuPanelDivContainerProjects);
  projectsDivsCreation(menuPanelDivContainerProjects);
}

function projectsDivsCreation(menuPanelDivContainerProjects) {
  const addProject = createDivWithText(
    "Add Project",
    "addProjectDiv",
    "fas fa-plus-circle"
  );
  stylingFunctions.ClickStyling(addProject);
  menuPanelDivContainerProjects.append(addProject);
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
  const inbox = createDivWithText("", "inbox");
  return inbox;
}

function taskCreatorDivPopulate(taskCreatorDiv) {
  // Create the form element
  const form = document.createElement("form");
  form.id = "taskCreationForm";
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "10px";

  // Creates a div with the 'close' icon and adds it ot the contianer taskcreator
  // Something I learnt here, the reason I had to remove the closing () at the end of clickActions.NewTaskCreatorPrompt is:
  // When you want to add an event listener and you need to pass a function as a callback, you should pass the function reference itself, not the result of its execution.
  addClickListenerToDiv(
    taskCreatorDiv.appendChild(createCloseIconDiv()),
    clickActions.NewTaskCreatorPrompt
  );

  // Append fields to the form
  form.appendChild(createInputField("Title:", "text", "title", true));
  form.appendChild(createInputField("Due Date:", "date", "dueDate"));
  form.appendChild(createInputField("Description:", "text", "description"));
  form.appendChild(
    createInputField("Priority:", "select", "priority", false, [1, 2, 3])
  );
  form.appendChild(createInputField("Notes:", "text", "notes"));

  // Create a submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Create Task";
  submitBtn.style.marginTop = "20px";
  form.appendChild(submitBtn);

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    // TODO: Store this somewhere, right now it just tells you that it's submitted.
    // get title from form
    const taskName = document.getElementById("title").value;
    console.log(taskName);
    const taskDescription = document.getElementById("description").value;
    const taskDueDate = document.getElementById("dueDate").value;
    const taskPriority = document.getElementById("priority").value;

    // use constructor to create and store new task in the inbox
    new TaskDiv(
      "InboxContainerDiv",
      taskName,
      taskDescription,
      taskDueDate,
      taskPriority
    );
    console.log("TESTING>>>Task created: " + taskName);
    console.log("Form submitted");
    // Store inputed data locally.
    storageFunctions.storeLocally(
      taskName,
      dueDate,
      description,
      priority,
      notes
    );
    console.log("Form Data stored locally");
    // parseDate();
    // console.log("parseDate() run");
    //Should change the name of this function. It's misleading. Here were toggling visibility to show the inbox.
    clickActions.NewTaskCreatorPrompt(event);
  });

  // //Storage

  // const t1 = localStorage.getItem("taskName");
  // console.log("localStoreage taskName:", t1);
  // Store the input elements themselves in an object for easy reference later

  if (taskCreatorDiv) {
    taskCreatorDiv.appendChild(form);
  } else {
    console.error("taskCreatorDiv is not provided or there's an error");
  }
}

// Trying a constructor to create new divs to populate when a user clicks submit on the form.
export class TaskDiv {
  // Counter for number of divs.
  static counter = 0;

  constructor(
    parentElementId,
    taskName = "Task Name",
    description = "",
    dueDate = "",
    priority = ""
  ) {
    this.parentElement = document.getElementById(parentElementId);
    this.taskName = `${taskName}`;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    TaskDiv.counter++;
    this.createTaskDiv();
  }

  // Create a new div for the inboxcontainer for a submitted task
  createTaskDiv() {
    // Container div for each new task using flexbox.
    const taskDiv = createDivWithText(
      this.taskName,
      "Task " + TaskDiv.counter,
      "",
      true
    );
    // Create and insert checkbox at the START of the div. Took a long time to figure this out.
    const checkBox = createCheckbox();
    taskDiv.insertBefore(checkBox, taskDiv.firstChild);
    // Add task description
    if (this.description) {
      const descriptionText = document.createTextNode(
        ` Description: ${this.description}`
      );
      taskDiv.appendChild(descriptionText);
    }
    // Add due date
    if (this.dueDate) {
      const dueDateText = document.createTextNode(` Due: ${this.dueDate}`);
      taskDiv.appendChild(dueDateText);
    }
    // Add priority
    if (this.priority) {
      const priorityText = document.createTextNode(
        ` Priority: ${this.priority}`
      );
      taskDiv.appendChild(priorityText);
    }
    // Style the new task div
    stylingFunctions.newTaskStyling(taskDiv);
    //Append the div to the parent
    this.parentElement.appendChild(taskDiv);
  }
}

// Self explanatory function. Used in the constructor for new tasks to show checkbox infront of task name
function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  stylingFunctions.checkboxStyling(checkbox);
  return checkbox;
}

// Helper function to create input fields with labels for the form
function createInputField(
  labelText,
  inputType,
  inputName,
  isRequired = false,
  // Added the options parameter to create drop down for priority. Looks trash though.
  options = null
) {
  const wrapper = document.createElement("div");

  const label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = inputName;
  label.style.marginRight = "5px";
  wrapper.appendChild(label);

  let input;
  if (options) {
    input = document.createElement("select");
    options.forEach((optionValue) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = optionValue;
      input.appendChild(option);
    });
  } else {
    input = document.createElement("input");
    input.type = inputType;
  }

  input.name = inputName;
  input.id = inputName;
  input.required = isRequired;
  wrapper.appendChild(input);

  if (inputName === "notes") {
    input.style.width = "550px";
    input.style.height = "70px";
  }

  return wrapper;
}

function createCloseIconDiv() {
  const closeDiv = createDivWithText("", "closeDiv", "fas fa-times");
  closeDiv.style.position = "absolute";
  closeDiv.style.top = "10px";
  closeDiv.style.right = "10px";
  closeDiv.style.cursor = "pointer";
  return closeDiv;
}
