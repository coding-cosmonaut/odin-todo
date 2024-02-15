export function createDiv(obj) {
  const div = document.createElement("div");

  const heading = document.createElement("p");
  heading.textContent = obj.title;

  div.append(heading);
  return div;
}
