export function globalElements() {
  let taskBttn = document.querySelector("#task");
  let submitBttn = document.querySelector('button[type="submit"]');
  let cancelBttn = document.querySelector("#cancel");
  let form = document.querySelector("#new-task");
  let contentDiv = document.querySelector(".todo-content");
  let wrapperForModal = document.querySelector("#wrapper");
  let modal = document.querySelector(".modal");

  return {
    taskBttn,
    submitBttn,
    cancelBttn,
    form,
    contentDiv,
    wrapperForModal,
    modal,
  };
}
