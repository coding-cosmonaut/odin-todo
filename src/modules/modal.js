import { globalElements } from "../global/elements";
function toggleModal() {
  let { modal } = globalElements();
  if (modal.open) {
    modal.close();
  } else {
    modal.showModal();
  }
}

function switchModalForm(bttn, projectWrap, todoWrap) {
  let id = bttn.getAttribute("id");
  if (id === "todo-form" && getComputedStyle(todoWrap).display === "none") {
    todoWrap.style.display = "flex";
    projectWrap.style.display = "none";
  } else if (
    id === "project-form" &&
    getComputedStyle(projectWrap).display === "none"
  ) {
    projectWrap.style.display = "flex";
    todoWrap.style.display = "none";
  }
}

export { toggleModal, switchModalForm };
