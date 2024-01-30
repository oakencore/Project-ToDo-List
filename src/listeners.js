import { NewTaskCreatorPrompt } from "./clickActions.js";

export function addClickListenerToDiv(div, onClickFunction) {
    console.log('Adding click listener to div', div);
    div.addEventListener('click', onClickFunction);
}
