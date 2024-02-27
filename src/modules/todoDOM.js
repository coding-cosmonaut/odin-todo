import { format, isToday, isThisWeek } from "date-fns";
import EditIcon from "/src/assets/pencil.svg";
import DetailIcon from "/src/assets/exclamation.svg";
import RemoveIcon from "/src/assets/delete.svg";
import { addEvent } from "./event";
import {
  collectionOfProjects,
  collectionOfTodos,
  thisWeekTodoCollection,
  todayTodoCollection,
} from "../global/allProjects";
import { toggleModal } from "./modal";
import { switchToProject } from "./createProject";

function replaceDashesOnDate(date) {
  return date.replace(/-/g, "/");
}

function createTodoDiv(obj) {
  const div = document.createElement("div");
  div.setAttribute("class", "single-todo");
  obj.priority === "low"
    ? div.classList.add("single-todo-lightGreen")
    : obj.priority === "medium"
    ? div.classList.add("single-todo-mediumOrange")
    : obj.priority === "high"
    ? div.classList.add("single-todo-redHigh")
    : div.classList.add("single-todo-lightGreen");
  div.setAttribute("data-todo-title", obj.title);

  const checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.setAttribute("class", "input-check");

  const heading = document.createElement("p");
  heading.setAttribute("class", "strikethrough");
  heading.textContent = obj.title;

  addEvent(checkboxInput, "click", (e) => {
    heading.classList.toggle("strikethrough-animation");
    e.target.parentNode.parentNode.classList.toggle("strikethrough-clicked");
  });

  const todoSection = document.createElement("div");
  todoSection.setAttribute("class", "checkbox-title-section");

  todoSection.append(checkboxInput, heading);

  const dateDiv = document.createElement("div");
  dateDiv.textContent = format(replaceDashesOnDate(obj.dueDate), "PPP");

  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit-bttn-todo");
  addEvent(editButton, "click", function () {
    const foundTodo = queryTodo(
      this.parentNode.parentNode.firstElementChild.lastElementChild.textContent,
      collectionOfTodos
    );
    let doesModalExist = document.querySelector(".modal-wrapper");
    if (doesModalExist) {
      doesModalExist.remove();
      toggleModal(createEditModal(foundTodo));
    } else {
      toggleModal(createEditModal(foundTodo));
    }
  });

  const detailButton = document.createElement("button");
  detailButton.setAttribute("class", "detail-button-todo");
  addEvent(detailButton, "click", () => {
    let doesModalExist = document.querySelector(".modal-detail-wrapper");
    if (doesModalExist) {
      doesModalExist.remove();
      toggleModal(createDetailModal(obj));
    } else {
      toggleModal(createDetailModal(obj));
    }
  });

  const removeButton = document.createElement("button");
  removeButton.setAttribute("class", "remove-button-todo");
  addEvent(removeButton, "click", function () {
    const clickedTodo =
      this.parentNode.parentNode.firstElementChild.lastElementChild.textContent;
    removeTodo(clickedTodo);
  });

  const detailImg = document.createElement("img");
  detailImg.src = DetailIcon;

  const editImg = document.createElement("img");
  editImg.src = EditIcon;

  const removeIcon = document.createElement("img");
  removeIcon.src = RemoveIcon;

  detailButton.append(detailImg);
  editButton.append(editImg);
  removeButton.append(removeIcon);

  const secondTodoSection = document.createElement("div");
  secondTodoSection.setAttribute("class", "button-date-section");

  secondTodoSection.append(dateDiv, detailButton, editButton, removeButton);

  div.append(todoSection, secondTodoSection);
  return div;
}

function removeTodo(todo) {
  queryDOMTodo(todo).remove();
  findTodoInArrays(collectionOfTodos, "title", todo);
  findTodoInArrays(todayTodoCollection, "title", todo);
  findTodoInArrays(thisWeekTodoCollection, "title", todo);

  collectionOfProjects.forEach((item) => {
    item.todos.forEach((task, idx) => {
      if (task.title === todo) {
        item.todos.splice(idx, 1);
      }
    });
  });
  localStorage.setItem("collectionOfTodos", JSON.stringify(collectionOfTodos));
}

function findTodoInArrays(arr, match, todo) {
  arr.forEach((item, idx) =>
    item[match] === todo ? arr.splice(idx, 1) : false
  );
}

function createDetailModal(obj) {
  const dialog = document.createElement("dialog");
  dialog.setAttribute("class", "modal-detail-wrapper");
  dialog.classList.add("modal");

  const modalContent = document.createElement("div");

  const heading = document.createElement("h1");
  heading.textContent = obj.title;

  const descriptionP = document.createElement("p");
  descriptionP.textContent = `Description: ${obj.description}`;

  const dateP = document.createElement("p");
  dateP.textContent = `Date: ${obj.dueDate}`;

  const priorityPara = document.createElement("p");
  priorityPara.textContent = `Priority: ${obj.priority}`;

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("id", "cancel");
  cancelButton.textContent = "Cancel";
  addEvent(cancelButton, "click", () => {
    toggleModal(dialog);
  });

  const buttonsCont = document.createElement("div");
  buttonsCont.setAttribute("class", "buttons-container");

  buttonsCont.append(cancelButton);

  modalContent.append(heading, descriptionP, dateP, priorityPara, buttonsCont);

  dialog.append(modalContent);

  document.body.append(dialog);
  return dialog;
}

function queryTodo(title, arr) {
  return arr.find((item) => item.title === title);
}

function queryDOMTodo(title) {
  return document.querySelector(`[data-todo-title=${CSS.escape(title)}]`);
}

function createProjectDiv(obj) {
  const div = document.createElement("div");
  div.textContent = obj.title;
  div.setAttribute("data-title", obj.title);
  div.setAttribute("class", "project-children");

  const deleteBttn = document.createElement("button");

  const deleteIcon = document.createElement("img");
  deleteIcon.src = RemoveIcon;
  deleteIcon.setAttribute("class", "remove-button-todo");

  addEvent(deleteBttn, "click", () => {
    document.querySelector(`[data-title=${CSS.escape(obj.title)}]`).remove();
    findTodoInArrays(collectionOfProjects, "title", obj.title);
    findTodoInArrays(collectionOfTodos, "project", obj.title);
    findTodoInArrays(todayTodoCollection, "project", obj.title);
    findTodoInArrays(thisWeekTodoCollection, "project", obj.title);
    localStorage.setItem(
      "collectionOfTodos",
      JSON.stringify(collectionOfTodos)
    );

    const storageCollection = collectionOfProjects.map((item) => {
      return { title: item.title, todos: (item.todos = []) };
    });

    localStorage.setItem(
      "collectionOfProjects",
      JSON.stringify(storageCollection)
    );
  });

  deleteBttn.append(deleteIcon);

  div.append(deleteBttn);

  return div;
}

function createEditModal(currentTodo) {
  console.log(currentTodo);
  const modalWrapper = document.createElement("dialog");
  modalWrapper.classList.add("modal-wrapper");
  modalWrapper.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("edit-modal-content");
  modalContent.classList.add("input-todo-wrapper");

  const childDiv1 = document.createElement("div");
  childDiv1.classList.add("input-container");

  const label1 = document.createElement("label");

  const input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.value = currentTodo.title;

  label1.append(input1);
  childDiv1.appendChild(label1);

  // Create second child div
  const childDiv2 = document.createElement("div");
  childDiv2.classList.add("input-container");

  const label2 = document.createElement("label");

  const input2 = document.createElement("textarea");
  input2.setAttribute("cols", "10");
  input2.value = currentTodo.description;

  label2.append(input2);
  childDiv2.append(label2);

  // Create third child div
  const childDiv3 = document.createElement("div");
  childDiv3.classList.add("input-container");

  const label3 = document.createElement("label");

  const input3 = document.createElement("input");
  input3.setAttribute("type", "date");
  input3.value = currentTodo.dueDate;

  label3.append(input3);
  childDiv3.appendChild(label3);

  // Create fourth child div
  const childDiv4 = document.createElement("div");
  childDiv4.classList.add("input-container");
  childDiv4.classList.add("edit-radio-container");

  const label4 = document.createElement("label");
  label4.textContent = "Low";
  label4.setAttribute("for", "low-value");
  label4.setAttribute("class", "toggle");

  const input4 = document.createElement("input");
  input4.setAttribute("type", "radio");
  input4.setAttribute("name", "priority");
  input4.setAttribute("value", "low");
  input4.setAttribute("id", "low-value");
  input4.setAttribute("checked", "");
  input4.setAttribute("class", "single-todo-lightGreen");

  //childDiv4.appendChild(input4, label4);

  const label5 = document.createElement("label");
  label5.textContent = "Medium";
  label5.setAttribute("for", "medium-value");
  label5.setAttribute("class", "toggle");

  const input5 = document.createElement("input");
  input5.setAttribute("type", "radio");
  input5.setAttribute("name", "priority");
  input5.setAttribute("value", "medium");
  input5.setAttribute("id", "medium-value");

  //label5.append(input5);
  //childDiv4.appendChild(input5, label5);

  const label6 = document.createElement("label");
  label6.textContent = "High";
  label6.setAttribute("for", "high-value");
  label6.setAttribute("class", "toggle");

  const input6 = document.createElement("input");
  input6.setAttribute("type", "radio");
  input6.setAttribute("name", "priority");
  input6.setAttribute("value", "high");
  input6.setAttribute("id", "high-value");

  //label6.append(input6);
  childDiv4.append(input4, label4, input5, label5, input6, label6);

  //BUTTON
  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.textContent = "Save Changes";
  addEvent(button, "click", () => {
    returnNewValues(
      currentTodo,
      {
        title: input1.value,
        description: input2.value,
        dueDate: input3.value,
        priority: `${
          input4.checked
            ? input4.value
            : input5.checked
            ? input5.value
            : input6.checked
            ? input6.value
            : currentTodo.priority
        }`,
      },
      modalWrapper
    );
  });

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("id", "cancel");
  cancelButton.textContent = "Cancel";
  addEvent(cancelButton, "click", () => {
    toggleModal(modalWrapper);
  });

  const buttonCont = document.createElement("div");
  buttonCont.setAttribute("class", "buttons-container");

  buttonCont.append(cancelButton, button);

  modalContent.appendChild(childDiv1);
  modalContent.appendChild(childDiv2);
  modalContent.appendChild(childDiv3);
  modalContent.appendChild(childDiv4);
  modalContent.appendChild(buttonCont);

  modalWrapper.appendChild(modalContent);

  document.body.append(modalWrapper);

  return modalWrapper;
}

function returnNewValues(todo, newObject, modal) {
  let oldTodo = queryDOMTodo(todo.title);
  oldTodo.setAttribute("data-todo-title", newObject.title);

  let elementChildren = oldTodo.children;
  console.log(elementChildren, "ELEMENT");
  console.log(oldTodo);
  elementChildren[0].lastChild.textContent = newObject.title;
  //elementChildren[1].textContent = newObject.description;
  elementChildren[1].firstChild.textContent = format(
    replaceDashesOnDate(newObject.dueDate),
    "PPP"
  );
  if (newObject.priority === "low") {
    oldTodo.classList.add("single-todo-lightGreen");
    oldTodo.classList.remove("single-todo-mediumOrange");
    oldTodo.classList.remove("single-todo-redHigh");
  } else if (newObject.priority === "medium") {
    oldTodo.classList.add("single-todo-mediumOrange");
    oldTodo.classList.remove("single-todo-lightGreen");
    oldTodo.classList.remove("single-todo-redHigh");
  } else {
    oldTodo.classList.add("single-todo-redHigh");
    oldTodo.classList.remove("single-todo-mediumOrange");
    oldTodo.classList.remove("single-todo-lightGreen");
  }

  let idx = collectionOfTodos.findIndex((item) => item.title === todo.title);
  collectionOfTodos[idx].title = newObject.title;
  collectionOfTodos[idx].description = newObject.description;
  if (collectionOfTodos[idx].dueDate !== newObject.dueDate) {
    if (
      isToday(replaceDashesOnDate(newObject.dueDate)) &&
      !queryTodo(newObject.title, todayTodoCollection)
    ) {
      todayTodoCollection.push(newObject);
    } else if (
      !isToday(replaceDashesOnDate(newObject.dueDate)) &&
      queryTodo(newObject.title, todayTodoCollection)
    ) {
      todayTodoCollection.splice(
        todayTodoCollection.findIndex((item) => item.title === newObject.title),
        1
      );
    }
    if (
      isThisWeek(replaceDashesOnDate(newObject.dueDate)) &&
      !queryTodo(newObject.title, thisWeekTodoCollection)
    ) {
      thisWeekTodoCollection.push(newObject);
    } else if (
      !isThisWeek(replaceDashesOnDate(newObject.dueDate)) &&
      queryTodo(newObject.title, thisWeekTodoCollection)
    ) {
      thisWeekTodoCollection.splice(
        thisWeekTodoCollection.findIndex(
          (item) => item.title === newObject.title
        ),
        1
      );
    }
  }
  collectionOfTodos[idx].dueDate = newObject.dueDate;
  collectionOfTodos[idx].priority = newObject.priority;

  localStorage.setItem("collectionOfTodos", JSON.stringify(collectionOfTodos));

  toggleModal(modal);
}

export { createTodoDiv, createProjectDiv };
