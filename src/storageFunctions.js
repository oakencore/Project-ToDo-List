import { TaskDiv } from "./TaskDiv";
import {
  parseJSON,
  isToday,
  isWithinInterval,
  addDays,
  startOfDay,
} from "date-fns";
import { stylingFunctions } from "./stylingFunctions";

const storageFunctions = {
  storeLocally(taskName, dueDate, description, priority, notes) {
    let counter = 0;
    if (localStorage.getItem(taskName + "number")) {
      counter = parseInt(localStorage.getItem(taskName + "number")) + 1;
    }
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
  },

  clearLocalStorage() {
    if (localStorage) {
      localStorage.clear();
    }
  },

  populateDummyLocalStorage(numberOfObjects) {
    this.clearLocalStorage();
    let currentCount = localStorage.length;

    for (let i = 0; i < numberOfObjects; i++) {
      // Manual date selection
      // JavaScript's Date object indexes months starting from 0
      let dueDate = new Date(2024, 1, 9);
      // Random date
      // let dueDate = new Date(
      //   new Date().getFullYear() + Math.floor(Math.random() * 3),
      //   Math.floor(Math.random() * 12),
      //   Math.floor(Math.random() * 28) + 1
      // );
      // getFullyear gets the current year. Random * 3 adds a random number between 0 and 2 and adds it to the current year. Month random 0-11, Day random 1-28
      let dueDateISO = dueDate.toISOString();
      console.log(`Due date for task ${i}:`, dueDateISO);
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
  },

  parsedStorage() {
    let localStorageItems = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      const parsedValue = JSON.parse(value);
      localStorageItems[key] = parsedValue;
    }
    return localStorageItems;
  },

  getTodaysTasks(localStorageItems) {
    let tasksDueToday = {};
    for (let key in localStorageItems) {
      if (localStorageItems.hasOwnProperty(key)) {
        let taskDate = parseJSON(localStorageItems[key].dueDate);
        if (isToday(taskDate)) {
          tasksDueToday[key] = localStorageItems[key];
        }
      }
    }
    return tasksDueToday;
  },

  displayTodaysTasks() {
    const tasksDueToday = this.getTodaysTasks(this.parsedStorage());
    const todayContainerDiv = document.getElementById("todayContainerDiv");
    // todayContainerDiv.innerHTML = "";
    Object.keys(tasksDueToday).forEach((key) => {
      const task = tasksDueToday[key];

      const newTaskDiv = new TaskDiv(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        "todayContainerDiv"
      );
    });

    // Trying something new. This applies styling to only the tasks with class name task-item from the constructor TaskDiv
    const taskItems = todayContainerDiv.querySelectorAll(".task-item");
    taskItems.forEach((taskItem) => {
      stylingFunctions.todayItemStyling(taskItem);
    });
  },
  getWeekTasks(localStorageItems) {
    const today = startOfDay(new Date());
    // seven days from today
    const endOfWeek = addDays(today, 7);

    let tasksDueWeek = {};

    Object.keys(localStorageItems).forEach((key) => {
      const task = localStorageItems[key];
      const taskDate = startOfDay(new Date(task.dueDate));

      // Check date is within the next 7 days
      if (isWithinInterval(taskDate, { start: today, end: endOfWeek })) {
        tasksDueWeek[key] = task;
      }
    });

    return tasksDueWeek;
  },
  displayWeekTasks() {
    const tasksDueWeek = this.getWeekTasks(this.parsedStorage());
    const weekContainerDiv = document.getElementById("weekContainerDiv");
    // todayContainerDiv.innerHTML = "";
    Object.keys(tasksDueWeek).forEach((key) => {
      const task = tasksDueWeek[key];

      const newTaskDiv = new TaskDiv(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        "weekContainerDiv"
      );
    });

    // Trying something new. This applies styling to only the tasks with class name task-item from the constructor TaskDiv
    const taskItems = weekContainerDiv.querySelectorAll(".task-item");
    taskItems.forEach((taskItem) => {
      stylingFunctions.weekItemStyling(taskItem);
    });
  },
};

export { storageFunctions };
