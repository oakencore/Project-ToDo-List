import { clickActions } from "./clickActions.js";
import { divOrganiser } from "./interface.js";
// Function to initialise page content
export function loadInitialContent() {
  divOrganiser();
  clickActions.setupListeners();
}
