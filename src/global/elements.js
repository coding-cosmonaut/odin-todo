export function globalElements() {
  const taskBttn = document.querySelector("#task");
  const submitBttn = document.querySelector('button[type="submit"]');
  const cancelBttn = document.querySelector("#cancel");
  const form = document.querySelector("#new-task");
  const contentDiv = document.querySelector(".todo-content");
  const wrapperForModal = document.querySelector("#wrapper");
  const modal = document.querySelector(".modal");
  const todoFormBttn = document.querySelector("#todo-form");
  const projectFormBttn = document.querySelector("#project-form");
  const formProjectWrap = document.querySelector(".form-project-wrap");
  const formTodoWrap = document.querySelector(".form-todo-wrap");
  //const modalFormContent = document.querySelector(".form-content");

  return {
    taskBttn,
    submitBttn,
    cancelBttn,
    form,
    contentDiv,
    wrapperForModal,
    modal,
    todoFormBttn,
    projectFormBttn,
    formProjectWrap,
    formTodoWrap,
  };
}
