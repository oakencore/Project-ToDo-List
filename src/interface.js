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
  const inboxItem = createDivWithText(
    "Add Task",
    "addTaskPrompt",
    "fas fa-plus-circle"
  );
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
  form.style.display = "flex";
  form.style.flexDirection = "column";
  form.style.gap = "10px";

  // Creates a div with the 'close' icon and adds it ot the contianer taskcreator
  // Something I learnt here, the reason I had to remove the closing () at the end of NewTaskCreatorPrompt is:
  // When you want to add an event listener and you need to pass a function as a callback, you should pass the function reference itself, not the result of its execution.
  addClickListenerToDiv(
    taskCreatorDiv.appendChild(createCloseIconDiv()),
    NewTaskCreatorPrompt
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
    const taskDescription = document.getElementById("description").value;
    const taskDueDate = document.getElementById("dueDate").value;
    const taskPriority = document.getElementById("priority").value;
    // use constructor to create and store new task in the inbox
    new TaskDiv("InboxContainerDiv", taskName,taskDescription,taskDueDate,taskPriority);
    console.log("TESTING>>>Task created: " + taskName);
    console.log("Form submitted");
    //Should change the name of this function. It's misleading. Here were toggling visibility to show the inbox.
    NewTaskCreatorPrompt(event)
  });

  if (taskCreatorDiv) {
    taskCreatorDiv.appendChild(form);
  } else {
    console.error("taskCreatorDiv is not provided or is not valid");
  }
}

// Trying a constructor to create new divs to populate when a user clicks submit on the form. 
class TaskDiv {
  // Counter for number of divs. 
  static counter = 0

  constructor(parentElementId, taskName = "Task Name", description = "", dueDate = "", priority = "") {
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
    const taskDiv = createDivWithText(this.taskName,"Task " + TaskDiv.counter, "", true);
    // Create and insert checkbox at the START of the div. Took a long time to figure this out.
    const checkBox = createCheckbox();
    taskDiv.insertBefore(checkBox, taskDiv.firstChild);
    // Add task description
    if (this.description) {
      const descriptionText = document.createTextNode(` Description: ${this.description}`);
      taskDiv.appendChild(descriptionText);
    }
    // Add due date
    if (this.dueDate) {
      const dueDateText = document.createTextNode(` Due: ${this.dueDate}`);
      taskDiv.appendChild(dueDateText);
    }
    // Add priority
    if (this.priority) {
      const priorityText = document.createTextNode(` Priority: ${this.priority}`);
      taskDiv.appendChild(priorityText);
    }
    // Style the new task div
    newTaskStyling(taskDiv)
    //Append the div to the parent
    this.parentElement.appendChild(taskDiv);
  }
}

// Self explanatory function. Used in the constructor for new tasks to show checkbox infront of task name
function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkboxStyling(checkbox)
  return checkbox;
}

function checkboxStyling(checkBox) {
  checkBox.style.accentColor = "#845ec2";
  checkBox.style.cursor = "pointer";
  checkBox.style.transform = "scale(1.5)";
  checkBox.style.marginRight = "10px";
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



// Styling
function globalStyling() {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.minHeight = "100vh";
  document.body.style.display = "flex";
  // document.body.style.flexDirection = "column";
  document.body.style.fontFamily = "'Roboto', sans-serif";
}

function newTaskStyling(newTask) {
  newTask.style.display = "flex";
  newTask.style.flexDirection = "row";
  newTask.style.alignItems = "center";
  newTask.style.marginTop = "10px";
  newTask.style.padding = "5px";
  newTask.style.gap = "10px";
  newTask.style.backgroundColor = TaskDiv.counter % 2 === 0 ? "#6b6a66" : "#8a8986";
  newTask.style.borderRadius = "5px";
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
  header.style.width = "70";
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
    //change back to none after tweaking style
    taskCreatorDiv.style.display = "none"; // <------------
    taskCreatorDiv.style.flexDirection = "column";
    taskCreatorDiv.style.justifyContent = "center";
    taskCreatorDiv.style.alignItems = "center";
    taskCreatorDiv.style.backgroundColor = "#845ec2";
    taskCreatorDiv.style.width = "80%";
    taskCreatorDiv.style.height = "80%";
    taskCreatorDiv.style.position = "relative";
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
