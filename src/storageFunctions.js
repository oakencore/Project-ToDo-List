import { TaskDiv } from "./TaskDiv";
import { parseJSON, isToday } from "date-fns";
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
    let dueDate = new Date(2024, 1, 9);
    let dueDateISO = dueDate.toISOString();
    console.log("Duedate ISO:",dueDateISO)
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
      new TaskDiv(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        "todayContainerDiv"
      );
    });
  },
};

export { storageFunctions };
