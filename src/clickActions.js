class ClickActions {
  constructor() {
    // Bind methods to make sure 'this' refers to the instance of the class
    this.NewTaskCreatorPrompt = this.NewTaskCreatorPrompt.bind(this);
    this.handleAddTaskPromptClick = this.handleAddTaskPromptClick.bind(this);
    this.handleTaskCreatorDivClick = this.handleTaskCreatorDivClick.bind(this);
    this.handleTodayDivClick = this.handleTodayDivClick.bind(this);
    this.ChangeTodayVisibility = this.ChangeTodayVisibility.bind(this);
    this.handleWeekDivClick = this.handleWeekDivClick.bind(this);
    this.ChangeWeekVisibility = this.ChangeWeekVisibility.bind(this);
    this.ChangeInboxVisibility = this.ChangeInboxVisibility.bind(this);
    this.taskCreatorDivVisibility = this.taskCreatorDivVisibility.bind(this);
    this.showInbox = this.showInbox.bind(this);
    this.showToday = this.showToday.bind(this);
    this.showWeek = this.showWeek.bind(this);
  }

  // Methods for menu tab clicks
  setupMenuTabListeners() {
    const inboxDiv = document.getElementById("inboxDiv");
    const todayDiv = document.getElementById("todayDiv");
    const weekDiv = document.getElementById("thisWeekDiv");
    console.log(inboxDiv, todayDiv, weekDiv);

    if (inboxDiv) inboxDiv.addEventListener("click", this.showInbox);
    if (todayDiv) {
      console.log("Adding click listener to todayDiv");
      todayDiv.addEventListener("click", this.showToday);
    }
    if (weekDiv) {
      console.log("Adding click listener to weekDiv");
      weekDiv.addEventListener("click", this.showWeek);
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
    this.ChangeWeekVisibility(false);
  }

  showToday() {
    console.log("Showing Today content");
    this.ChangeInboxVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(true);
    this.ChangeWeekVisibility(false);
  }

  showWeek() {
    console.log("Showing Week content");
    this.ChangeInboxVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeTodayVisibility(false);
    this.ChangeWeekVisibility(true);
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
    } else if (
      clickedElement.id === "thisWeekDiv" ||
      clickedElement.closest("#thisWeekDiv")
    ) {
      this.handleWeekDivClick();
    }
  }

  ChangeTodayVisibility(show) {
    const todayContainer = document.getElementById("today");
    console.log(`Changing today visibility to ${show}`, todayContainer);
    if (todayContainer) {
      todayContainer.style.display = show ? "flex" : "none";
    }
  }

  ChangeWeekVisibility(show) {
    const weekContainer = document.getElementById("week");
    console.log(`Changing week visibility to ${show}`, weekContainer);
    if (weekContainer) {
      weekContainer.style.display = show ? "flex" : "none";
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
    this.ChangeWeekVisibility(false);
  }

  handleTaskCreatorDivClick() {
    console.log("TaskCreator Div clicked!");
    this.ChangeInboxVisibility(true);
    this.ChangeTodayVisibility(false);
    this.taskCreatorDivVisibility(false);
    this.ChangeWeekVisibility(false);
  }

  handleTodayDivClick() {
    try {
      console.log("Today Div clicked!");
      this.ChangeInboxVisibility(false);
      this.ChangeTodayVisibility(true);
      this.taskCreatorDivVisibility(false);
      this.ChangeWeekVisibility(false);
    } catch (error) {
      console.error("Error handling Today Div click:", error);
    }
  }
  handleWeekDivClick() {
    try {
      console.log("Week Div clicked!");
      this.ChangeInboxVisibility(false);
      this.ChangeTodayVisibility(false);
      this.taskCreatorDivVisibility(false);
      this.ChangeWeekVisibility(true);
    } catch (error) {
      console.error("Error handling week Div click:", error);
    }
  }
}

// Learned that if you export an instance instead of the class itself, you can directly use clickActions anywhere
const clickActions = new ClickActions();
export { clickActions };
