import { format } from "date-fns";

function createTodoDiv(obj) {
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

  // const projectP = document.createElement("p");
  // projectP.textContent = obj.project;

  div.append(heading, descp, dateDiv, priorityP);
  return div;
}

function createProjectDiv(obj) {
  const div = document.createElement("div");

  const ul = document.createElement("ul");
  ul.textContent = obj.title;
  ul.setAttribute("data-title", obj.title);

  div.append(ul);

  return div;
}

function queryProject(projectTitle) {
  return document.querySelector(`[data-title="${projectTitle}"]`);
}

//function checkProjectProp(project) {}

export { createTodoDiv, createProjectDiv, queryProject };
