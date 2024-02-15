import Icon from "/src/assets/plus.svg";
export function appendImage() {
  const button = document.querySelector("#task");

  let icon = new Image();
  icon.src = Icon;
  icon.classList.add("plus-icon");
  button.appendChild(icon);
}
