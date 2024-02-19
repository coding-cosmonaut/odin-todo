import Project from "./projects";
import {
  collectionOfProjects,
  collectionOfTodos,
  todayTodoCollection,
} from "../global/allProjects";
import { createTodoDiv } from "./todoDOM";
import { isToday } from "date-fns";

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

function appendTodayPage(div) {
  if (todayTodoCollection.length !== 0) {
    div.innerHTML = "";
    todayTodoCollection.forEach((todo) => {
      let todayTodo = createTodoDiv(todo);
      div.append(todayTodo);
    });
  } else {
    div.innerHTML = 'Nothing do, today!'
  }
}

function appendTodosToGlobalArray(todo) {
  collectionOfTodos.push(todo);
}

function appendTodoToProject(project, todo, dateSelected, todaySection) {
  const replaced = dateSelected.replace(/-/g, "/");
  if (project !== "Home") {
    const selectedProject = collectionOfProjects.find(
      (item) => item.title === project
    );
    selectedProject.todos.push(todo);
  }
  if (isToday(replaced)) {
    todayTodoCollection.push(todo);
  }
  appendTodosToGlobalArray(todo);
}

export {
  createProject,
  switchToProject,
  checkDuplicateProjectTitle,
  appendProjectToDropdown,
  appendTodoToProject,
  appendTodayPage,
};
