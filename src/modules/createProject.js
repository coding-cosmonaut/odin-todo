import Project from "./projects";
import { collectionOfProjects, collectionOfTodos } from "../global/allProjects";
import { createTodoDiv } from "./todoDOM";

function createProject(formValue) {
  let data = Object.fromEntries(formValue);

  let newProject = new Project(data.title);
  return newProject;
}

function checkDuplicateProjectTitle(input) {
  return collectionOfProjects.every((item) => item.title !== input.value);
}

function appendProjectToDropdown(input, obj) {
  const option = document.createElement("option");
  option.setAttribute("value", obj.title);
  option.textContent = obj.title;
  input.appendChild(option);
}

function switchToProject(div, project) {
  div.innerHTML = "";
  if (project === "Home") {
    collectionOfTodos.forEach((item) => {
      let todo = createTodoDiv(item);
      div.append(todo);
    });
  } else {
    collectionOfProjects.forEach((item) => {
      if (item.title === project) {
        item.todos.forEach((todo) => {
          let newTodo = createTodoDiv(todo);
          div.append(newTodo);
        });
      }
    });
  }
}

function appendTodosToGlobalArray(todo) {
  collectionOfTodos.push(todo);
}

function appendTodoToProject(project, todo) {
  if (project !== "Home") {
    const selectedProject = collectionOfProjects.find(
      (item) => item.title === project
    );
    selectedProject.todos.push(todo);
  }
  appendTodosToGlobalArray(todo);
}

export {
  createProject,
  switchToProject,
  checkDuplicateProjectTitle,
  appendProjectToDropdown,
  appendTodoToProject,
};
