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

function switchToProject(div, project) {
  div.innerHTML = "";

  console.log(collectionOfProjects, "in create");
}

export { createProject, switchToProject, checkDuplicateProjectTitle };
