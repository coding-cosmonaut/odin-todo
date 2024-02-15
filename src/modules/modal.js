import { globalElements } from "../global/elements";
export function toggleModal() {
  let { modal } = globalElements();
  if (modal.open) {
    modal.close();
  } else {
    modal.showModal();
  }
}
