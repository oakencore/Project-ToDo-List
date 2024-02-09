class ClickActions {
  constructor() {
    // Bind methods to make sure 'this' refers to the instance of the class
    this.NewTaskCreatorPrompt = this.NewTaskCreatorPrompt.bind(this);
    this.handleAddTaskPromptClick = this.handleAddTaskPromptClick.bind(this);
    this.handleTaskCreatorDivClick = this.handleTaskCreatorDivClick.bind(this);
    this.handleTodayDivClick = this.handleTodayDivClick.bind(this);
    this.ChangeTodayVisibility = this.ChangeTodayVisibility.bind(this);
    this.ChangeInboxVisibility = this.ChangeInboxVisibility.bind(this);
    this.taskCreatorDivVisibility = this.taskCreatorDivVisibility.bind(this);
    this.showInbox = this.showInbox.bind(this);
    this.showToday = this.showToday.bind(this);
  }

  // Methods for menu tab clicks
  setupMenuTabListeners() {
    
    const inboxDiv = document.getElementById("inboxDiv");
    const todayDiv = document.getElementById("todayDiv");
    console.log(inboxDiv, todayDiv)

    if (inboxDiv) inboxDiv.addEventListener("click", this.showInbox);
    if (todayDiv) {
      console.log('Adding click listener to todayDiv');
      todayDiv.addEventListener("click", this.showToday);
    }
  }

  showInbox() {
    console.log("Showing Inbox content");
    this.ChangeInboxVisibility(true);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(false);
    const todayContainer = document.getElementById("today");
    console.log(
      "After visibility change:",
      window.getComputedStyle(todayContainer).display
    );
  }

  showToday() {
    console.log("Showing Today content");
    this.ChangeInboxVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(true);
  }

  NewTaskCreatorPrompt(event) {
    const clickedElement = event.target;

    // Handler checking
    if (
      clickedElement.id === "addTaskPrompt" ||
      clickedElement.closest("#addTaskPrompt")
    ) {
      this.handleAddTaskPromptClick();
    } else if (
      clickedElement.id === "taskCreatorDiv" ||
      clickedElement.closest("#taskCreatorDiv")
    ) {
      this.handleTaskCreatorDivClick();
    } else if (
      clickedElement.id === "todayDiv" ||
      clickedElement.closest("#todayDiv")
    ) {
      this.handleTodayDivClick();
    }
  }

  ChangeTodayVisibility(show) {
    const todayContainer = document.getElementById("today");
    console.log(`Changing today visibility to ${show}`, todayContainer);
    if (todayContainer) {
      todayContainer.style.display = show ? "flex" : "none";
    }
  }

  ChangeInboxVisibility(show) {
    const inboxContainer = document.getElementById("inboxContainerDiv");
    if (inboxContainer) {
      inboxContainer.style.display = show ? "flex" : "none";
    }
  }

  taskCreatorDivVisibility(show) {
    const taskCreatorDiv = document.getElementById("taskCreatorDiv");
    if (taskCreatorDiv) {
      taskCreatorDiv.style.display = show ? "flex" : "none";
    }
  }

  handleAddTaskPromptClick() {
    console.log("AddTaskPrompt Div clicked!");
    this.ChangeInboxVisibility(false);
    this.ChangeTodayVisibility(false);
    this.taskCreatorDivVisibility(true);
  }

  handleTaskCreatorDivClick() {
    console.log("TaskCreator Div clicked!");
    this.ChangeInboxVisibility(true);
    this.ChangeTodayVisibility(false);
    this.taskCreatorDivVisibility(false);
  }

  handleTodayDivClick() {
    try {
      console.log("Today Div clicked!");
      this.ChangeInboxVisibility(false);
      this.ChangeTodayVisibility(true);
      this.taskCreatorDivVisibility(false);
    } catch (error) {
      console.error("Error handling Today Div click:", error);
    }
  }
}

// Learned that if you export an instance instead of the class itself, you can directly use clickActions anywhere
const clickActions = new ClickActions();
export { clickActions };
