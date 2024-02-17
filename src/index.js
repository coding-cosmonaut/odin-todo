import "./style.css";
import { createTodo } from "./modules/createTodo";
import { addEvent } from "./modules/event";
import { toggleModal, switchModalForm } from "./modules/modal";
import { getFormData } from "./modules/form";
import { createDiv, createProjectDiv } from "./modules/todoDOM";
import { appendImage } from "./modules/appendAssets";
import { globalElements } from "./global/elements";
import {
  createProject,
  switchToProject,
  checkDuplicateProjectTitle,
  checkForProjects,
} from "./modules/createProject";
import { collectionOfProjects } from "./global/allProjects";
import { add } from "date-fns";

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
  } = globalElements();
  appendImage();
  addEvent([taskBttn, cancelBttn, modal], "click", toggleModal);
  addEvent([todoFormBttn, projectFormBttn], "click", function () {
    const currentThis = this;
    switchModalForm(currentThis, formProjectWrap, formTodoWrap);
  });
  addEvent(wrapperForModal, "click", (e) => {
    e.stopPropagation();
  });
  addEvent(taskBttn, "click", (() => {
    checkForProjects(dropdownProjectInput)
  }));
  addEvent(form, "submit", (e) => {
    e.preventDefault();
    let formData = getFormData(form);
    let newTodo = createTodo(formData);

    contentDiv.append(createDiv(newTodo));
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
      let newProjectDiv = createProjectDiv(newProject);
      addEvent(newProjectDiv, "click", function () {
        let currentThis = this;
        switchToProject(contentDiv, currentThis);
      });

      form.reset();
      projectForm.reset();
      toggleModal();
      projectContainer.append(newProjectDiv);
    } else alert("Title already exists!");
  });
})();
