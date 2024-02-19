import Project from "./projects";
import { collectionOfProjects, collectionOfTodos } from "../global/allProjects";
import { queryProject, createTodoDiv } from "./todoDOM";

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
  console.log(div, "div");
  console.log(project, "project");
  div.innerHTML = "";
  if (project === "Home") {
    collectionOfTodos.forEach((item) => {
      let todo = createTodoDiv(item);
      div.append(todo);
    });
  } else {
    collectionOfProjects.forEach((item) => {
      if (item.title === project) {
        console.log(item, "in ELSE");
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
  if (project === "Home") {
    appendTodosToGlobalArray(todo);
    console.log(collectionOfTodos);
  } else {
    const selectedProject = collectionOfProjects.find(
      (item) => item.title === project
    );
    selectedProject.todos.push(todo);
    console.log(selectedProject, "selected in appendtoto");
  }
  // let target = queryProject(selectedProject.title);
  // return target;
}

export {
  createProject,
  switchToProject,
  checkDuplicateProjectTitle,
  appendProjectToDropdown,
  appendTodoToProject,
};
