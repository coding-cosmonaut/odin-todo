import "./style.css";
import { createTodo } from "./modules/createTodo";
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
} from "./modules/createProject";
import { collectionOfProjects } from "./global/allProjects";

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

  appendImage();
  addEvent([taskBttn, cancelBttn, modal], "click", toggleModal);
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
    const formData = getFormData(form);
    const newTodo = createTodo(formData);

    const { project, dueDate } = newTodo;

    appendTodoToProject(project, newTodo, dueDate);

    appendTodayPage(contentDiv);
    appendThisWeekPage(contentDiv);

    switchToProject(contentDiv, project);

    form.reset();
    toggleModal();
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
        let currentThis = this.firstChild.getAttribute("data-title");
        switchToProject(contentDiv, currentThis);
      });

      form.reset();
      projectForm.reset();
      toggleModal();
      projectContainer.append(newProjectDiv);
    } else alert("Title already exists!");
  });
})();
