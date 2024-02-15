export function toggleModal() {
  let modal = document.querySelector(".modal");
  if (modal.open) {
    modal.close();
  } else {
    modal.showModal();
  }
}
