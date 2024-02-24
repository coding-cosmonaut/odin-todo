import "./style.css";
import { createTodo, checkDuplicateTodoTitle } from "./modules/createTodo";
import { addEvent } from "./modules/event";
import { toggleModal, switchModalForm } from "./modules/modal";
import { getFormData } from "./modules/form";
import { createTodoDiv, createProjectDiv } from "./modules/todoDOM";
import { appendImage } from "./modules/appendAssets";
import { globalElements } from "./global/elements";
import {
  createProject,
  switchToProject,
  checkDuplicateProjectTitle,
  appendProjectToDropdown,
  appendTodoToProject,
  appendTodayPage,
  appendThisWeekPage,
  checkForDeletedOptions,
} from "./modules/createProject";
import { collectionOfProjects, collectionOfTodos } from "./global/allProjects";

(function app() {
  const {
    taskBttn,
    cancelBttn,
    modal,
    wrapperForModal,
    form,
    projectForm,
    contentDiv,
    todoFormBttn,
    projectFormBttn,
    formProjectWrap,
    formTodoWrap,
    addProjectBttn,
    projectContainer,
    dropdownProjectInput,
    homePage,
    todayPage,
    thisWeekPage,
  } = globalElements();

  addEvent(window, "load", () => {
    let todoData = JSON.parse(localStorage.getItem("collectionOfTodos"));
    let projectData = JSON.parse(localStorage.getItem("collectionOfProjects"));

    if (projectData) {
      projectData.forEach((project) => {
        collectionOfProjects.push(project);
        let projectDiv = createProjectDiv(project);
        addEvent(projectDiv, "click", () => {
          switchToProject(contentDiv, project.title);
        });

        projectContainer.append(projectDiv);
      });
    }

    if (todoData) {
      todoData.forEach((task) => {
        appendTodoToProject(task.project, task, task.dueDate);
      });
      switchToProject(contentDiv, "Home");
    }
  });

  appendImage();
  addEvent([taskBttn, cancelBttn, modal], "click", () => {
    toggleModal(modal);
    checkForDeletedOptions(dropdownProjectInput);
  });
  addEvent(todayPage, "click", () => {
    appendTodayPage(contentDiv);
  });
  addEvent(thisWeekPage, "click", () => {
    appendThisWeekPage(contentDiv);
  });
  addEvent(homePage, "click", () => {
    switchToProject(contentDiv, "Home");
  });
  addEvent([todoFormBttn, projectFormBttn], "click", function () {
    const currentThis = this;
    switchModalForm(currentThis, formProjectWrap, formTodoWrap);
  });
  addEvent(wrapperForModal, "click", (e) => {
    e.stopPropagation();
  });
  addEvent(form, "submit", (e) => {
    e.preventDefault();
    if (
      checkDuplicateTodoTitle(formTodoWrap.querySelector('input[type="text"]'))
    ) {
      const formData = getFormData(form);
      const newTodo = createTodo(formData);

      const { project, dueDate } = newTodo;

      appendTodoToProject(project, newTodo, dueDate);

      switchToProject(contentDiv, project);

      let data = JSON.parse(localStorage.getItem("collectionOfTodos") || "[]");
      data.push(newTodo);
      localStorage.setItem("collectionOfTodos", JSON.stringify(data));

      form.reset();
      toggleModal(modal);
    } else alert("To-do title already exists!");
  });
  addEvent(projectForm, "submit", (e) => {
    e.preventDefault();
    if (
      checkDuplicateProjectTitle(
        formProjectWrap.querySelector('input[type="text"]')
      )
    ) {
      let formData = getFormData(projectForm);
      let newProject = createProject(formData);
      collectionOfProjects.push(newProject);
      appendProjectToDropdown(dropdownProjectInput, newProject);
      let newProjectDiv = createProjectDiv(newProject);
      addEvent(newProjectDiv, "click", function () {
        let currentThis = this.getAttribute("data-title");
        switchToProject(contentDiv, currentThis);
      });

      let data = JSON.parse(
        localStorage.getItem("collectionOfProjects") || "[]"
      );
      data.push(newProject);
      localStorage.setItem("collectionOfProjects", JSON.stringify(data));

      form.reset();
      projectForm.reset();
      toggleModal(modal);
      projectContainer.append(newProjectDiv);
    } else alert("Title already exists!");
  });
})();
