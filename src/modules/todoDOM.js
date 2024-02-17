import { format } from "date-fns";
import { addEvent } from "./event";

function createDiv(obj) {
  const div = document.createElement("div");

  const heading = document.createElement("p");
  heading.textContent = obj.title;

  const descp = document.createElement("p");
  descp.textContent = obj.description;

  const dateDiv = document.createElement("div");
  const replaced = obj.dueDate.replace(/-/g, "/");
  dateDiv.textContent = format(replaced, "PPP");

  const priorityP = document.createElement("p");
  priorityP.textContent = obj.priority;

  const projectP = document.createElement("p");
  projectP.textContent = obj.project;

  div.append(heading, descp, dateDiv, priorityP, projectP);
  return div;
}

function createProjectDiv(obj) {
  const div = document.createElement("div");

  const ul = document.createElement("ul");
  ul.textContent = obj.title;

  div.append(ul);

  return div;
}

export { createDiv, createProjectDiv };
