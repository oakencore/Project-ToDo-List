import { TaskDiv } from "./interface";

// Styling
export function globalStyling() {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.minHeight = "100vh";
  document.body.style.display = "flex";
  // document.body.style.flexDirection = "column";
  document.body.style.fontFamily = "'Roboto', sans-serif";
}
export function newTaskStyling(newTask) {
  newTask.style.display = "flex";
  newTask.style.flexDirection = "row";
  newTask.style.alignItems = "center";
  newTask.style.marginTop = "10px";
  newTask.style.padding = "5px";
  newTask.style.gap = "10px";
  newTask.style.backgroundColor =
    TaskDiv.counter % 2 === 0 ? "#6b6a66" : "#8a8986";
  newTask.style.borderRadius = "5px";
}
export function mainDivContainerStyling(mainDiv) {
  mainDiv.style.display = "flex";
  mainDiv.style.flexDirection = "column";
  mainDiv.style.flexGrow = 1;
}
export function headerStyling(header) {
  header.style.display = "flex";
  header.style.flexDirection = "row";
  header.style.backgroundColor = "#4b4453";
  header.style.width = "70";
  header.style.height = "70px";
}
export function headerTextStyling() {
  headerText = document.getElementById("headerText");
  headerText.style.display = "flex";
  headerText.style.flexDirection = "row";
  headerText.style.justifyContent = "center";
  headerText.style.alignItems = "center";
  headerText.style.paddingLeft = "30px";
  headerText.style.fontSize = "45px";
  headerText.style.color = "#c34a36";
}
export function contentContainerStyling(contentContainer) {
  contentContainer.style.display = "flex";
  contentContainer.style.flexDirection = "row";
  contentContainer.style.justifyContent = "space-between";
  contentContainer.style.flexGrow = 1;
}
export function menuPanelStyling(menuPanel) {
  menuPanel.style.flexGrow = 1;
  menuPanel.style.display = "flex";
  menuPanel.style.flexDirection = "column";
  menuPanel.style.justifyContent = "center";
  menuPanel.style.backgroundColor = "grey";
  menuPanel.style.width = "20%";
  menuPanel.style.height = "auto";
  menuPanel.style.padding = "20px";
}
export function menuPanelDivContainerStyling() {
  const menuPanelContainer = document.getElementById("menuPanelDivContainer");
  menuPanelContainer.style.display = "flex";
  menuPanelContainer.style.flexDirection = "column";
  menuPanelContainer.style.justifyContent = "space-between";
  menuPanelContainer.style.marginBottom = "30px";
  menuPanelContainer.style.gap = "15px";
}
export function menuPanelDivCreationProjectsTitleStyling() {
  const menuPanelContainerProjects = document.getElementById(
    "projectsTitleTextDiv"
  );
  menuPanelContainerProjects.style.display = "flex";
  menuPanelContainerProjects.style.flexDirection = "row";
  menuPanelContainerProjects.style.fontSize = "30px";
  menuPanelContainerProjects.style.marginBottom = "15px";
  menuPanelContainerProjects.style.color = "#c34a36";
}
export function inboxStyling(inbox) {
  inbox.style.flexGrow = 1;
  inbox.style.display = "flex";
  inbox.style.justifyContent = "center";
  inbox.style.alignItems = "center";
  inbox.style.backgroundColor = "#b0a8b9";
  inbox.style.width = "70%";
  inbox.style.height = "auto";
  inbox.style.color = "#ff8066";
}
export function inboxContainerStyling(inboxContainer) {
  inboxContainer.style.display = "flex"; // <------------
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
export function inboxItemStyling(inboxItem) {
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

export function todayContainerStyling(todayContainer) {
  todayContainer.style.display = "none"; // <------------
  todayContainer.style.flexDirection = "column";

  todayContainer.style.width = "80%";
  todayContainer.style.height = "80%";

  // First CHild
  const firstChild = todayContainer.firstElementChild;
  if (firstChild) {
    firstChild.style.backgroundColor = "#b0a8b9";
    firstChild.style.padding = "10px";
    firstChild.style.fontSize = "40px";
  }
}
export function footerStyling(footer) {
  footer.style.display = "flex";
  footer.style.flexDirection = "row";
  footer.style.backgroundColor = "#4b4453";
  footer.style.width = "100%";
  footer.style.height = "30px";
}
// Hover over effect to show that a user can click on the items in the menu pannel
export function ClickStyling(div) {
  div.addEventListener("mouseenter", function () {
    this.style.cursor = "pointer";
    this.style.backgroundColor = "darkgrey"; // Slightly darker to indicate hover
    this.style.boxShadow = "0 0 10px #000";
  });

  div.addEventListener("mouseleave", function () {
    // Revert to initial styles or remove specific hover styles
    this.style.backgroundColor = "grey";
    this.style.boxShadow = "none"; // Remove the shadow effect
  });
}
// Icons and Fonts
export function loadFontAwesome() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
  document.head.appendChild(link);
}
export function loadGoogleFonts() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap";
  document.head.appendChild(link);
}
