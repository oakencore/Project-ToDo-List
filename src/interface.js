export function divOrganiser() {
  globalStyling();
  const mainDiv = document.body.appendChild(mainDivCreation());
  mainDivContainerStyling(mainDiv);
  const header = mainDiv.appendChild(headerCreation());
  headerStyling(header);
  const contentContainer = mainDiv.appendChild(contentContainerCreation());
  contentContainerStyling(contentContainer);
  const menuPannel = contentContainer.appendChild(menuPannelCreation());
  menuPannelStyling(menuPannel);
  const inbox = contentContainer.appendChild(inboxCreation());
  inboxStyling(inbox);
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
  header.style.borderStyle = "dotted";
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
  menuPannel.style.backgroundColor = "grey";
  menuPannel.style.width = "20%";
  menuPannel.style.height = 'auto';
}

function inboxStyling(inbox) {
  inbox.style.flexGrow = 1;
  inbox.style.display = "flex";
  inbox.style.backgroundColor = "blue";
  inbox.style.width = "70%";
  inbox.style.height = "auto";
}

function footerStyling(footer) {
  footer.style.display = "flex";
  footer.style.flexDirection = "row";
  footer.style.backgroundColor = "orange";
  footer.style.width = "100%";
  footer.style.height = "50px";
}
