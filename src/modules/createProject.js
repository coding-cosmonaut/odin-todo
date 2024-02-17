import Project from "./projects";
import { collectionOfProjects } from "../global/allProjects";

function createProject(formValue) {
  let data = Object.fromEntries(formValue);

  let newProject = new Project(data.title);
  return newProject;
}

function checkDuplicateProjectTitle(input) {
  return collectionOfProjects.every((item) => item.title !== input.value);
}

function checkForProjects(input) {
  console.log(input);
  collectionOfProjects.forEach((project) => {
    const option = document.createElement("option");
    option.setAttribute("value", project.title);
    option.textContent = project.title;
    input.appendChild(option);
  });
}

function switchToProject(div, project) {
  div.innerHTML = "";

  console.log(collectionOfProjects, "in create");
}

export {
  createProject,
  switchToProject,
  checkDuplicateProjectTitle,
  checkForProjects,
};
