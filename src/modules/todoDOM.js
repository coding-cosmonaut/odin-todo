import { format } from "date-fns";

export function createDiv(obj) {
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

  div.append(heading, descp, dateDiv, priorityP);
  return div;
}
