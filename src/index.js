import { loadInitalContent } from "./loadInitialContent.js";
import { clickActions } from "./clickActions.js";

document.addEventListener("DOMContentLoaded", (event) => {
  loadInitalContent();
  console.log("Page Content Loaded!");
  clickActions.setupMenuTabListeners();
});
