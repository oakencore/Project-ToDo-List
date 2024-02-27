import { TaskDiv } from "./TaskDiv";

// Styling
// Added all styling functions to an object so I can import it with one line.
const stylingFunctions = {
  globalStyling() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.fontFamily = "'Roboto', sans-serif";
    document.body.style.backgroundColor = "#f5f5f5";
    document.documentElement.style.height = "100%";
  },

  newTaskStyling(newTask) {
    newTask.style.display = "flex";
    newTask.style.flexDirection = "row";
    newTask.style.alignItems = "center";
    newTask.style.marginTop = "10px";
    newTask.style.padding = "15px";
    newTask.style.gap = "10px";
    newTask.style.backgroundColor = "#FFFFFF";
    newTask.style.border = "1px solid #E0E0E0";
    newTask.style.borderRadius = "8px";
    newTask.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    newTask.style.transition = "transform 0.2s ease";
    // Hover
    newTask.addEventListener(
      "mouseenter",
      () => (newTask.style.transform = "scale(1.02)")
    );
    newTask.addEventListener(
      "mouseleave",
      () => (newTask.style.transform = "scale(1.00)")
    );
  },

  mainDivContainerStyling(mainDiv) {
    mainDiv.style.margin = "0 auto"; 
    mainDiv.style.maxWidth = "1200px"; 
    mainDiv.style.width = "100%"; 
    mainDiv.style.overflow = "hidden"; 
  },

  headerStyling(header) {
    header.style.display = "flex";
    header.style.flexDirection = "row";
    header.style.backgroundColor = "#3f51b5";
    header.style.width = "100%";
    header.style.height = "70px";
    header.style.padding = "0 20px";
    header.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  },

  headerTextStyling() {
    const headerText = document.getElementById("headerText");
    headerText.style.display = "flex";
    headerText.style.flexDirection = "row";
    headerText.style.justifyContent = "center";
    headerText.style.alignItems = "center";
    headerText.style.width = "100%";
    headerText.style.fontSize = "2rem";
    headerText.style.color = "#FFFFFF";
  },

  contentContainerStyling(contentContainer) {
    contentContainer.style.width = "100%";
    contentContainer.style.display = "flex";
    contentContainer.style.flexDirection = "row";
    contentContainer.style.justifyContent = "space-between";
    contentContainer.style.padding = "20px"; 
    contentContainer.style.boxSizing = "border-box";
  },

  menuPanelStyling(menuPanel) {
    menuPanel.style.flexGrow = 1;
    menuPanel.style.display = "flex";
    menuPanel.style.flexDirection = "column";
    menuPanel.style.justifyContent = "flex-start";
    menuPanel.style.backgroundColor = "#FFFFFF";
    menuPanel.style.width = "250px";
    menuPanel.style.marginRight = "20px";
    menuPanel.style.padding = "20px";
    menuPanel.style.borderRadius = "8px";
    menuPanel.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  },

  menuPanelDivContainerStyling() {
    const menuPanelContainer = document.getElementById("menuPanelDivContainer");
    menuPanelContainer.style.display = "flex";
    menuPanelContainer.style.flexDirection = "column";
    menuPanelContainer.style.gap = "15px";
  },

  menuPanelDivCreationProjectsTitleStyling() {
    const menuPanelContainerProjects = document.getElementById(
      "projectsTitleTextDiv"
    );
    menuPanelContainerProjects.style.display = "flex";
    menuPanelContainerProjects.style.alignItems = "center";
    menuPanelContainerProjects.style.justifyContent = "flex-start";
    menuPanelContainerProjects.style.fontSize = "1.5rem";
    menuPanelContainerProjects.style.color = "#3f51b5";
    menuPanelContainerProjects.style.marginBottom = "20px";
  },

  inboxStyling(inbox) {
    inbox.style.width = "100%";
    inbox.style.display = "flex";
    inbox.style.flexDirection = "column";
    inbox.style.alignItems = "center";
    inbox.style.padding = "20px";
    inbox.style.backgroundColor = "#FFFFFF";
    inbox.style.boxSizing = "border-box"; 
    inbox.style.overflowY = "auto";
  },

  inboxContainerStyling(inboxContainer) {
    inboxContainer.style.display = "flex";
    inboxContainer.style.flexDirection = "column";
    inboxContainer.style.width = "100%";
    inboxContainer.style.gap = "10px";
  },

  inboxItemStyling(inboxItem) {
    inboxItem.style.backgroundColor = "#3f51b5";
    inboxItem.style.color = "#FFFFFF";
    inboxItem.style.padding = "10px 20px";
    inboxItem.style.borderRadius = "4px";
    inboxItem.style.cursor = "pointer";
    inboxItem.style.transition = "background-color 0.2s";
    inboxItem.addEventListener(
      "mouseenter",
      () => (inboxItem.style.backgroundColor = "#303f9f")
    );
    inboxItem.addEventListener(
      "mouseleave",
      () => (inboxItem.style.backgroundColor = "#3f51b5")
    );
  },

  taskCreatorDivStyling() {
    const taskCreatorDiv = document.getElementById("taskCreatorDiv");
    if (taskCreatorDiv) {
      taskCreatorDiv.style.position = "fixed";
      taskCreatorDiv.style.top = "50%";
      taskCreatorDiv.style.left = "50%";
      taskCreatorDiv.style.transform = "translate(-50%, -50%)";
      taskCreatorDiv.style.width = "90%";
      taskCreatorDiv.style.maxWidth = "600px";
      taskCreatorDiv.style.padding = "20px";
      taskCreatorDiv.style.borderRadius = "8px";
      taskCreatorDiv.style.backgroundColor = "#FFFFFF";
      taskCreatorDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      taskCreatorDiv.style.display = "none";
    }
  },

  taskEditorDivStyling() {
    const taskEditorDiv = document.getElementById("taskEditorDiv");
    if (taskEditorDiv) {
      taskEditorDiv.style.position = "fixed";
      taskEditorDiv.style.top = "50%";
      taskEditorDiv.style.left = "50%";
      taskEditorDiv.style.transform = "translate(-50%, -50%)";
      taskEditorDiv.style.width = "90%";
      taskEditorDiv.style.maxWidth = "600px";
      taskEditorDiv.style.padding = "20px";
      taskEditorDiv.style.borderRadius = "8px";
      taskEditorDiv.style.backgroundColor = "#FFFFFF";
      taskEditorDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      taskEditorDiv.style.display = "none";
    }
  },

  todayStyling(today) {
    today.style.display = "none";
    today.style.flexDirection = "column";
    today.style.gap = "10px";
    today.style.padding = "20px";
    today.style.backgroundColor = "#e3f2fd";
    today.style.borderRadius = "8px";
    today.style.marginTop = "20px";
    today.style.width = "100%";
    today.style.maxWidth = "800px";
    today.style.margin = "auto";
  },

  todayContainerStyling(todayContainer) {
    todayContainer.style.display = "flex";
    todayContainer.style.flexDirection = "column";
    todayContainer.style.width = "80%";
    todayContainer.style.height = "80%";
    const firstChild = todayContainer.firstElementChild;
    if (firstChild) {
      firstChild.style.backgroundColor = "#b0a8b9";
      firstChild.style.padding = "10px";
      firstChild.style.fontSize = "40px";
    }
  },

  todayItemStyling(todayItem) {
    const colour1 = "#6b6a66";
    const colour2 = "#8a8986";
    const lastItem = todayItem.previousElementSibling;
    const lastColour = lastItem ? lastItem.getAttribute("data-lastColour") : "";
    const nextColour = lastColour === colour1 ? colour2 : colour1;
    todayItem.style.backgroundColor = nextColour;
    todayItem.style.padding = "10px";
    todayItem.setAttribute("data-lastColour", nextColour);
    return todayItem;
  },

  weekStyling(week) {
    week.style.display = "none";
    week.style.flexDirection = "column";
    week.style.gap = "10px";
    week.style.padding = "20px";
    week.style.backgroundColor = "#e8eaf6";
    week.style.borderRadius = "8px";
    week.style.marginTop = "20px";
    week.style.width = "100%";
    week.style.maxWidth = "800px";
    week.style.margin = "auto";
  },

  weekContainerStyling(weekContainer) {
    weekContainer.style.display = "flex";
    weekContainer.style.flexDirection = "column";
    weekContainer.style.width = "80%";
    weekContainer.style.height = "80%";
    const firstChild = weekContainer.firstElementChild;
    if (firstChild) {
      firstChild.style.backgroundColor = "#b0a8b9";
      firstChild.style.padding = "10px";
      firstChild.style.fontSize = "40px";
    }
  },

  weekItemStyling(weekItem) {
    const colour1 = "#6b6a66";
    const colour2 = "#8a8986";
    const lastItem = weekItem.previousElementSibling;
    const lastColour = lastItem ? lastItem.getAttribute("data-lastColour") : "";
    const nextColour = lastColour === colour1 ? colour2 : colour1;
    weekItem.style.backgroundColor = nextColour;
    weekItem.style.padding = "10px";
    weekItem.setAttribute("data-lastColour", nextColour);
    return weekItem;
  },

  projectStyling(project) {
    project.style.flexGrow = 1;
    project.style.display = "flex";
    project.style.justifyContent = "center";
    project.style.alignItems = "center";
    project.style.backgroundColor = "#b0a8b9";
    project.style.width = "100%";
    project.style.height = "auto";
    project.style.color = "#ff8066";
    project.style.padding = "10px 0";
  },

  projectContainerStyling(projectContainer) {
    projectContainer.style.display = "flex";
    projectContainer.style.flexDirection = "column";
    projectContainer.style.gap = "10px";
    projectContainer.style.padding = "20px";
    projectContainer.style.backgroundColor = "#f1f8e9";
    projectContainer.style.borderRadius = "8px";
    projectContainer.style.width = "100%";
    projectContainer.style.marginTop = "20px";
    projectContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  },

  ProjectsMainContainerDivStyling(projectsMainContainer) {
    projectsMainContainer.style.display = "none";
    projectsMainContainer.style.flexDirection = "column";
    projectsMainContainer.style.width = "80%";
    projectsMainContainer.style.height = "80%";
    const firstChild = projectsMainContainer.firstElementChild;
    if (firstChild) {
      firstChild.style.backgroundColor = "#b0a8b9";
      firstChild.style.padding = "10px";
      firstChild.style.fontSize = "40px";
    }
  },

  projectNameStyling(projectDiv) {
    projectDiv.style.padding = "10px 20px";
    projectDiv.style.margin = "5px 0";
    projectDiv.style.backgroundColor = "#64b5f6";
    projectDiv.style.color = "#FFFFFF";
    projectDiv.style.borderRadius = "4px";
    projectDiv.style.cursor = "pointer";
    projectDiv.style.transition = "background-color 0.3s";
    projectDiv.addEventListener(
      "mouseenter",
      () => (projectDiv.style.backgroundColor = "#42a5f5")
    );
    projectDiv.addEventListener(
      "mouseleave",
      () => (projectDiv.style.backgroundColor = "#64b5f6")
    );
  },

  footerStyling(footer) {
    footer.style.display = "flex";
    footer.style.justifyContent = "center";
    footer.style.alignItems = "center";
    footer.style.backgroundColor = "#424242";
    footer.style.color = "#FFFFFF";
    footer.style.padding = "10px";
    footer.style.marginTop = "auto";
    footer.style.width = "100%";
  },

  checkboxStyling(checkBox) {
    checkBox.style.accentColor = "#64b5f6";
    checkBox.style.cursor = "pointer";
    checkBox.style.transform = "scale(1.2)";
    checkBox.style.marginRight = "10px";
  },

  ClickStyling(div) {
    div.style.cursor = "pointer";
    div.addEventListener("mouseenter", () => {
      div.style.transform = "scale(1.05)";
      div.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
    });
    div.addEventListener("mouseleave", () => {
      div.style.transform = "scale(1.0)";
      div.style.boxShadow = "none";
    });
  },

  loadFontAwesome() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    document.head.appendChild(link);
  },

  loadGoogleFonts() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
    document.head.appendChild(link);
  },
};

export { stylingFunctions };
