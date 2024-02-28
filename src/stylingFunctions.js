// ---------------------------
// Utility Functions for common styling
// ---------------------------
const applyStyles = (element, styles) => {
  Object.entries(styles).forEach(([key, value]) => {
    element.style[key] = value;
  });
};

// Utility for hover transformations
const addHoverEffect = (
  element,
  {
    scaleIn = "scale(1.02)",
    scaleOut = "scale(1.00)",
    hoverInColor,
    hoverOutColor,
  } = {}
) => {
  element.addEventListener("mouseenter", () => {
    element.style.transform = scaleIn;
    if (hoverInColor) element.style.backgroundColor = hoverInColor;
  });
  element.addEventListener("mouseleave", () => {
    element.style.transform = scaleOut;
    if (hoverOutColor) element.style.backgroundColor = hoverOutColor;
  });
};

// ---------------------------
// StylingFunctions object to style all parts of the todo app
// ---------------------------
const stylingFunctions = {
  globalStyling() {
    applyStyles(document.documentElement, { height: "100%" });
    applyStyles(document.body, {
      margin: "0",
      padding: "0",
      minHeight: "100vh",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: "#f5f5f5",
    });
  },

  newTaskStyling(newTask) {
    applyStyles(newTask, {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "10px",
      padding: "15px",
      gap: "10px",
      backgroundColor: "#FFFFFF",
      border: "1px solid #E0E0E0",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease",
    });
    addHoverEffect(newTask);
  },

  mainDivContainerStyling(mainDiv) {
    applyStyles(mainDiv, {
      flexGrow: "1",
      margin: "0 auto",
      maxWidth: "auto",
      width: "100%",
      overflow: "hidden",
    });
  },

  headerStyling(header) {
    applyStyles(header, {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#3f51b5",
      width: "100%",
      height: "70px",
      padding: "0 20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginBottom: "1%",
    });
  },

  headerTextStyling() {
    const headerText = document.getElementById("headerText");
    applyStyles(headerText, {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      fontSize: "2rem",
      color: "#FFFFFF",
    });
  },

  contentContainerStyling(contentContainer) {
    applyStyles(contentContainer, {
      display: "flex",
      flexGrow: "1",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "0 20px",
      boxSizing: "border-box",
      width: "100%",
    });
  },

  menuPanelStyling(menuPanel) {
    applyStyles(menuPanel, {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: "#FFFFFF",
      width: "250px",
      marginRight: "20px",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    });
  },

  menuPanelDivContainerStyling() {
    const menuPanelContainer = document.getElementById("menuPanelDivContainer");
    applyStyles(menuPanelContainer, {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    });
  },

  menuPanelDivCreationProjectsTitleStyling() {
    const menuPanelContainerProjects = document.getElementById(
      "projectsTitleTextDiv"
    );
    applyStyles(menuPanelContainerProjects, {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      fontSize: "1.5rem",
      color: "#3f51b5",
      marginBottom: "10px",
      paddingTop: "20px",
    });
  },

  inboxStyling(inbox) {
    applyStyles(inbox, {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#FFFFFF",
      boxSizing: "border-box",
      overflowY: "auto",
    });
  },

  inboxContainerStyling(inboxContainer) {
    applyStyles(inboxContainer, {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxHeight: "80vh",
      overflowY: "auto",
      gap: "10px",
    });
  },

  inboxItemStyling(inboxItem) {
    applyStyles(inboxItem, {
      backgroundColor: "#3f51b5",
      color: "#FFFFFF",
      padding: "10px 20px",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s, transform 0.2s ease",
    });
    addHoverEffect(inboxItem, {
      hoverInColor: "#303f9f",
      hoverOutColor: "#3f51b5",
    });
  },

  taskCreatorDivStyling() {
    const taskCreatorDiv = document.getElementById("taskCreatorDiv");
    if (taskCreatorDiv) {
      applyStyles(taskCreatorDiv, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: "300px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "none",
      });
    }
  },

  taskEditorDivStyling() {
    const taskEditorDiv = document.getElementById("taskEditorDiv");
    if (taskEditorDiv) {
      applyStyles(taskEditorDiv, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: "300px",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        display: "none",
      });
    }
  },

  todayStyling(today) {
    applyStyles(today, {
      display: "none",
      flexDirection: "column",
      gap: "10px",
      padding: "20px",
      backgroundColor: "#e3f2fd",
      borderRadius: "8px",
      marginTop: "20px",
      width: "100%",
      maxHeight: "80vh",
      overflowY: "auto",
      maxWidth: "800px",
      margin: "auto",
    });
  },

  todayContainerStyling(todayContainer) {
    applyStyles(todayContainer, {
      display: "flex",
      flexDirection: "column",
      width: "auto",
      height: "auto",
    });
    // for title or first child
    const firstChild = todayContainer.firstElementChild;
    if (firstChild) {
      applyStyles(firstChild, {
        padding: "10px",
        fontSize: "40px",
      });
    }
  },

  todayItemStyling(todayItem) {
    // TODO there is other styling overlapping this that keeps breaking it.
    const [colour1, colour2] = ["#6b6a66", "#8a8986"];
    const lastItem = todayItem.previousElementSibling;
    const lastColour = lastItem ? lastItem.getAttribute("data-lastColour") : "";
    const nextColour = lastColour === colour1 ? colour2 : colour1;
    applyStyles(todayItem, {
      backgroundColor: nextColour,
      padding: "10px",
    });
    todayItem.setAttribute("data-lastColour", nextColour);
    return todayItem;
  },

  weekStyling(week) {
    // Reusing styling. It's recycling!
    this.todayStyling(week);
  },

  weekContainerStyling(weekContainer) {
    this.todayContainerStyling(weekContainer);
  },

  weekItemStyling(weekItem) {
    return this.todayItemStyling(weekItem);
  },

  projectStyling(project) {
    applyStyles(project, {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#b0a8b9",
      width: "100%",
      height: "auto",
      color: "#ff8066",
      padding: "50px 0",
    });
  },

  projectContainerStyling(projectContainer) {
    applyStyles(projectContainer, {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "10px",
      backgroundColor: "#f1f8e9",
      borderRadius: "5px",
      width: "85%",
      flexGrow: "1",
      marginTop: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    });
  },

  ProjectsMainContainerDivStyling(projectsMainContainer) {
    applyStyles(projectsMainContainer, {
      display: "none",
      flexDirection: "column",
      width: "80%",
      height: "80%",
    });
    const firstChild = projectsMainContainer.firstElementChild;
    if (firstChild) {
      applyStyles(firstChild, {
        backgroundColor: "#b0a8b9",
        padding: "10px",
        fontSize: "40px",
      });
    }
  },

  projectNameStyling(projectDiv) {
    applyStyles(projectDiv, {
      padding: "10px 20px",
      margin: "5px 0",
      backgroundColor: "#64b5f6",
      color: "#FFFFFF",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.2s ease",
    });
    addHoverEffect(projectDiv, {
      hoverInColor: "#42a5f5",
      hoverOutColor: "#64b5f6",
    });
  },

  footerStyling(footer) {
    applyStyles(footer, {
      marginTop: "auto",
      width: "100%",
      backgroundColor: "#424242",
      color: "#FFFFFF",
      textAlign: "center",
      padding: "10px",
      boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
    });
  },

  checkboxStyling(checkBox) {
    applyStyles(checkBox, {
      accentColor: "#64b5f6",
      cursor: "pointer",
      transform: "scale(1.2)",
      marginRight: "10px",
    });
  },

  ClickStyling(div) {
    applyStyles(div, { cursor: "pointer" });
    addHoverEffect(
      div,
      "scale(1.05)",
      "scale(1.0)",
      "0 2px 4px rgba(0,0,0,0.2)",
      "none"
    );
  },

  // ---------------------------
// Utility Functions for loading fonts and icons
// ---------------------------
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
