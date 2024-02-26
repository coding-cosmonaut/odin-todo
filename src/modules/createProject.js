import Project from "./projects";
import {
  collectionOfProjects,
  collectionOfTodos,
  thisWeekTodoCollection,
  todayTodoCollection,
} from "../global/allProjects";
import { createTodoDiv } from "./todoDOM";
import { isToday, isThisWeek } from "date-fns";

function createProject(formValue) {
  let data = Object.fromEntries(formValue);

  let newProject = new Project(data.title);
  return newProject;
}

function checkDuplicateProjectTitle(input) {
  return collectionOfProjects.every((item) => item.title !== input.value);
}

function checkForDeletedOptions(selectInput) {
  while (selectInput.lastElementChild.value !== "Home") {
    selectInput.removeChild(selectInput.lastChild);
  }

  collectionOfProjects.forEach((item) => {
    const options = document.createElement("option");
    options.textContent = item.title;
    options.value = item.title;
    selectInput.append(options);
  });
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
    div.innerHTML = "<h2 class='content-h2-heading'>Home Page</h2>";
    collectionOfTodos.forEach((item) => {
      let todo = createTodoDiv(item);
      div.append(todo);
    });
  } else {
    div.innerHTML = `<h2 class='content-h2-heading'>${project}</h2>`;
    collectionOfTodos.forEach((item) => {
      if (item.project === project) {
        let newTodo = createTodoDiv(item);
        div.append(newTodo);
      }
    });
  }
}

function appendTodayPage(div) {
  if (todayTodoCollection.length !== 0) {
    div.innerHTML = "<h2 class='content-h2-heading'>Today Page</h2>";
    todayTodoCollection.forEach((todo) => {
      let todayTodo = createTodoDiv(todo);
      div.append(todayTodo);
    });
  } else {
    div.innerHTML =
      "<h2 class='content-h2-heading'>Today Page</h2> <p>Nothing do, today!</p>";
  }
}

function appendThisWeekPage(div) {
  if (thisWeekTodoCollection.length !== 0) {
    div.innerHTML = "<h2 class='content-h2-heading'>This Week Page</h2>";
    thisWeekTodoCollection.forEach((todo) => {
      let todayTodo = createTodoDiv(todo);
      div.append(todayTodo);
    });
  } else {
    div.innerHTML =
      "<h2 class='content-h2-heading'>This Week Page</h2> <p>Nothing do, this week!</p>";
  }
}

function appendTodosToGlobalArray(todo) {
  collectionOfTodos.push(todo);
}

function appendTodoToProject(project, todo, dateSelected) {
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
  if (isThisWeek(replaced)) {
    thisWeekTodoCollection.push(todo);
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
  appendThisWeekPage,
  checkForDeletedOptions,
};
