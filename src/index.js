import { loadInitalContent } from "./loadInitialContent.js";
import { ClickActions } from "./clickActions.js";

document.addEventListener("DOMContentLoaded", (event) => {
  loadInitalContent();
  console.log("Page Content Loaded!");
});
