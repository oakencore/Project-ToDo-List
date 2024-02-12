import { TaskDiv } from "./TaskDiv";
// Styling
// Added all styling functions to an object so I can import it with one line.
const stylingFunctions = {
  globalStyling() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
    document.body.style.display = "flex";
    document.body.style.fontFamily = "'Roboto', sans-serif";
  },
  newTaskStyling(newTask) {
    newTask.style.display = "flex";
    newTask.style.flexDirection = "row";
    newTask.style.alignItems = "center";
    newTask.style.marginTop = "10px";
    newTask.style.padding = "5px";
    newTask.style.gap = "10px";
    newTask.style.backgroundColor =
      TaskDiv.counter % 2 === 0 ? "#6b6a66" : "#8a8986";
    newTask.style.borderRadius = "5px";
  },
  mainDivContainerStyling(mainDiv) {
    mainDiv.style.display = "flex";
    mainDiv.style.flexDirection = "column";
    mainDiv.style.flexGrow = 1;
  },
  headerStyling(header) {
    header.style.display = "flex";
    header.style.flexDirection = "row";
    header.style.backgroundColor = "#4b4453";
    header.style.width = "70";
    header.style.height = "70px";
  },
  headerTextStyling() {
    const headerText = document.getElementById("headerText");
    headerText.style.display = "flex";
    headerText.style.flexDirection = "row";
    headerText.style.justifyContent = "center";
    headerText.style.alignItems = "center";
    headerText.style.paddingLeft = "30px";
    headerText.style.fontSize = "45px";
    headerText.style.color = "#c34a36";
  },
  contentContainerStyling(contentContainer) {
    contentContainer.style.display = "flex";
    contentContainer.style.flexDirection = "row";
    contentContainer.style.justifyContent = "space-between";
    contentContainer.style.flexGrow = 1;
  },
  menuPanelStyling(menuPanel) {
    menuPanel.style.flexGrow = 1;
    menuPanel.style.display = "flex";
    menuPanel.style.flexDirection = "column";
    menuPanel.style.justifyContent = "center";
    menuPanel.style.backgroundColor = "grey";
    menuPanel.style.width = "20%";
    menuPanel.style.height = "auto";
    menuPanel.style.padding = "20px";
  },
  menuPanelDivContainerStyling() {
    const menuPanelContainer = document.getElementById("menuPanelDivContainer");
    menuPanelContainer.style.display = "flex";
    menuPanelContainer.style.flexDirection = "column";
    menuPanelContainer.style.justifyContent = "space-between";
    menuPanelContainer.style.marginBottom = "30px";
    menuPanelContainer.style.gap = "15px";
  },
  menuPanelDivCreationProjectsTitleStyling() {
    const menuPanelContainerProjects = document.getElementById(
      "projectsTitleTextDiv"
    );
    menuPanelContainerProjects.style.display = "flex";
    menuPanelContainerProjects.style.flexDirection = "row";
    menuPanelContainerProjects.style.fontSize = "30px";
    menuPanelContainerProjects.style.marginBottom = "15px";
    menuPanelContainerProjects.style.color = "#c34a36";
  },
  inboxStyling(inbox) {
    inbox.style.flexGrow = 1;
    inbox.style.display = "flex";
    inbox.style.justifyContent = "center";
    inbox.style.alignItems = "center";
    inbox.style.backgroundColor = "#b0a8b9";
    inbox.style.width = "70%";
    inbox.style.height = "auto";
    inbox.style.color = "#ff8066";
  },
  inboxContainerStyling(inboxContainer) {
    inboxContainer.style.display = "flex";
    inboxContainer.style.flexDirection = "column";
    inboxContainer.style.width = "80%";
    inboxContainer.style.height = "80%";
    const firstChild = inboxContainer.firstElementChild;
    if (firstChild) {
      firstChild.style.backgroundColor = "#b0a8b9";
      firstChild.style.padding = "10px";
      firstChild.style.fontSize = "40px";
    }
  },
  inboxItemStyling(inboxItem) {
    inboxItem.style.backgroundColor = "rgba(132, 94, 194, 0.5)";
    inboxItem.style.padding = "10px";
    return inboxItem;
  },
  taskCreatorDivStyling() {
    console.log("taskCreatorDivStyling Called!");
    const taskCreatorDiv = document.getElementById("taskCreatorDiv");
    if (taskCreatorDiv) {
      taskCreatorDiv.style.display = "none";
      taskCreatorDiv.style.flexDirection = "column";
      taskCreatorDiv.style.justifyContent = "center";
      taskCreatorDiv.style.alignItems = "center";
      taskCreatorDiv.style.backgroundColor = "#845ec2";
      taskCreatorDiv.style.width = "80%";
      taskCreatorDiv.style.height = "80%";
      taskCreatorDiv.style.position = "relative";
    }
  },
  todayStyling(today) {
    today.style.flexGrow = 1;
    today.style.display = "none";
    today.style.justifyContent = "center";
    today.style.alignItems = "center";
    today.style.backgroundColor = "#b0a8b9";
    today.style.width = "70%";
    today.style.height = "auto";
    today.style.color = "#ff8066";
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
    // Two colours to switch between
    const colour1 = "#6b6a66";
    const colour2 = "#8a8986";
    // lastcolour is using a 'custom atrrtibute' to track the last colour
    const lastItem = todayItem.previousElementSibling;
    const lastColour = lastItem ? lastItem.getAttribute("data-lastColour") : "";
    // Choose next colour based on last item's custom attribute
    const nextColour = lastColour === colour1 ? colour2 : colour1;
    todayItem.style.backgroundColor = nextColour;
    todayItem.style.padding = "10px";
    // Update the current items custom attribute to show the colour applied
    todayItem.setAttribute("data-lastColour", nextColour);
    return todayItem;
  },
  weekStyling(week) {
    week.style.flexGrow = 1;
    week.style.display = "none";
    week.style.justifyContent = "center";
    week.style.alignItems = "center";
    week.style.backgroundColor = "#b0a8b9";
    week.style.width = "70%";
    week.style.height = "auto";
    week.style.color = "#ff8066";
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
    // Two colours to switch between
    const colour1 = "#6b6a66";
    const colour2 = "#8a8986";
    // lastcolour is using a 'custom atrrtibute' to track the last colour
    const lastItem = weekItem.previousElementSibling;
    const lastColour = lastItem ? lastItem.getAttribute("data-lastColour") : "";
    // Choose next colour based on last item's custom attribute
    const nextColour = lastColour === colour1 ? colour2 : colour1;
    weekItem.style.backgroundColor = nextColour;
    weekItem.style.padding = "10px";
    // Update the current items custom attribute to show the colour applied
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
    projectContainer.style.width = "100%";
    projectContainer.style.marginTop = "20px"; 
    projectContainer.style.backgroundColor = "#4b4453"; 
    projectContainer.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)"; 
    projectContainer.style.padding = "10px"; 
    projectContainer.style.overflow = "auto"; 
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
    projectDiv.style.backgroundColor = "#6b6a66"; 
    projectDiv.style.color = "#ffffff"; 
    projectDiv.style.borderRadius = "4px";
    projectDiv.style.cursor = "pointer";
    projectDiv.style.transition = "background-color 0.2s"; 
    projectDiv.style.fontSize = "1rem"; 
    projectDiv.style.fontWeight = "500"; 
    projectDiv.addEventListener('mouseenter', () => projectDiv.style.backgroundColor = "#5a5560"); 
    projectDiv.addEventListener('mouseleave', () => projectDiv.style.backgroundColor = "#6b6a66"); 
  },
  
  footerStyling(footer) {
    footer.style.display = "flex";
    footer.style.flexDirection = "row";
    footer.style.backgroundColor = "#4b4453";
    footer.style.width = "100%";
    footer.style.height = "30px";
  },
  ClickStyling(div) {
    div.addEventListener("mouseenter", function () {
      this.style.cursor = "pointer";
      this.style.backgroundColor = "darkgrey";
      this.style.boxShadow = "0 0 10px #000";
    });
    div.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "grey";
      this.style.boxShadow = "none";
    });
  },
  checkboxStyling(checkBox) {
    checkBox.style.accentColor = "#845ec2";
    checkBox.style.cursor = "pointer";
    checkBox.style.transform = "scale(1.5)";
    checkBox.style.marginRight = "10px";
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
