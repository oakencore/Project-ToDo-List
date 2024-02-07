import { NewTaskCreatorPrompt,ChangeInboxVisibility,taskCreatorDivVisibility } from "./clickActions.js";
import { addClickListenerToDiv } from "./listeners.js";
import { isToday, parseJSON } from "date-fns";
import { loadFontAwesome, loadGoogleFonts, globalStyling, mainDivContainerStyling, headerStyling, headerTextStyling, contentContainerStyling, menuPannelStyling, menuPannelDivContainerStyling, menuPannelDivCreationProjectsTitleStyling, inboxStyling, inboxContainerStyling, ClickStyling, inboxItemStyling, taskCreatorDivStyling, footerStyling, newTaskStyling } from "./stylingFunctions.js";

export function divOrganiser() {
  // clearLocalStorage();
  populateDummyLocalStorage(10);
  const localStorageItems = parsedStorage();
  getTodaysTasks(localStorageItems)
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
  menuTabFunction()
  inboxStyling(inbox);
  const inboxContainer = inboxContainerCreation(inbox);
  inboxContainerStyling(inboxContainer);
  const inboxItem = createDivWithText(
    "Add Task",
    "addTaskPrompt",
    "fas fa-plus-circle"
  );
  ClickStyling(inboxItem)
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
  ClickStyling(inboxDiv)
  const todayDiv = createDivWithText(
    "Today",
    "todayDiv",
    "fas fa-calendar-day"
  );
  ClickStyling(todayDiv)
  const thisWeekDiv = createDivWithText(
    "This Week",
    "thisWeekDiv",
    "fas fa-calendar-week"
  );
  ClickStyling(thisWeekDiv)

  menuPannelDivContainer.append(inboxDiv, todayDiv, thisWeekDiv);
  menuPannel.appendChild(menuPannelDivContainer);

  }

// Function to store the user input from creating a new task locally. 
function storeLocally(taskName, dueDate, description, priority, notes) {
  // Counter because there will be multiple tasks
  let counter = 0;

  //Checks to see if there is a number that matches a taskName. If there is, it retrives the current taskname and number and converts the number to an int
  // using parseint. It then increments the counter by 1. The new variable is then assigned to counter variable above.
  if (localStorage.getItem(taskName + "number")) {
    counter = parseInt(localStorage.getItem(taskName + "number")) + 1;
  }

  // Stores this to localStorage after turning it into a JSON string.
  localStorage.setItem(
    taskName,
    JSON.stringify({
      title: taskName,
      dueDate: dueDate,
      description: description,
      priority: priority,
      notes: notes,
      number: counter,
    })
  );

  // get the items to store
  const inputElements = {
    title: document.getElementById("title"),
    dueDate: document.getElementById("dueDate"),
    description: document.getElementById("description"),
    priority: document.getElementById("priority"),
    notes: document.getElementById("notes"),
  };
}

// Clear localStorage
function clearLocalStorage() {
  if (localStorage) {
    localStorage.clear();
  }
}

// Function to populate the localStorage dummy data objects
function populateDummyLocalStorage(numberOfObjects) {
  clearLocalStorage();
  let currentCount = localStorage.length;

  let dueDate = new Date(2024,1,7);

  let dueDateISO = dueDate.toISOString();
  

  for (let i = 0; i < numberOfObjects; i++) {

    const key = `task-${currentCount + i}`;

    const value = JSON.stringify({
      title: `taskName${currentCount + i}`,
      dueDate: dueDateISO,
      description: "description",
      priority: "1",
      notes: "notes",
      number: currentCount + i,
    });
    localStorage.setItem(key, value);
  }
}

function parsedStorage() {
  // Object to store all parsed key/value pairs from localStorage.
  let localStorageItems = {};
  console.log("parsedStorage is called");

  // For loop to get the key-value pairs and parse them
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    //Parse the stringyfied json
    const parsedValue = JSON.parse(value);

    // Checking the format of the date
    console.log(parsedValue.dueDate);
    console.log("Type of dueDate:",typeof parsedValue.dueDate);
    // Add the parsed object to the localstorageitems
    localStorageItems[key] = parsedValue;
  }
  console.log("parsedStorage successfully run:", localStorageItems);
  console.log("Type:", typeof localStorageItems);
  return localStorageItems;
}

  //   // log the priority of "task-0"
  //   let priorityOfTask0 = localStorageItems["task-0"].priority;
  //   console.log(priorityOfTask0); 
  // }

function getTodaysTasks(localStorageItems) {
  console.log("getTodaysDate is called");
  console.log(localStorageItems);

  for (let key in localStorageItems) {
    if (localStorageItems.hasOwnProperty(key)) {
      let taskDate = parseJSON(localStorageItems[key].dueDate);
      console.log(taskDate)
      let result = isToday(taskDate);
      console.log(`${key} is due today:`, result);
    }
  }
}






// TODO function to add clicklisteners to divs in the menu to allow for tab navigation
function menuTabFunction() {
  addClickListenerToDiv(inboxDiv,showInbox)
  // addClickListenerToDiv(todayDiv,showToday)
  // addClickListenerToDiv(thisWeekDiv,showWeek)

  function showInbox() {
    ChangeInboxVisibility(true)
    taskCreatorDivVisibility(false)
  }
  // function showToday() {
    
  // }
  // function showWeek() {
    
  // }
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
  ClickStyling(addProject)
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
    console.log(taskName)
    const taskDescription = document.getElementById("description").value;
    const taskDueDate = document.getElementById("dueDate").value;
    const taskPriority = document.getElementById("priority").value;
   
    // use constructor to create and store new task in the inbox
    new TaskDiv("InboxContainerDiv", taskName,taskDescription,taskDueDate,taskPriority);
    console.log("TESTING>>>Task created: " + taskName);
    console.log("Form submitted");
    // Store inputed data locally. 
    storeLocally(taskName, dueDate, description,priority,notes);
    console.log("Form Data stored locally")
    parseDate()  
    console.log("parseDate() run")
    //Should change the name of this function. It's misleading. Here were toggling visibility to show the inbox.
    NewTaskCreatorPrompt(event)
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


