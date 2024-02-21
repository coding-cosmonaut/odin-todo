import { format, isToday, isThisWeek } from "date-fns";
import EditIcon from "/src/assets/pencil.svg";
import DetailIcon from "/src/assets/exclamation.svg";
import { addEvent } from "./event";
import {
  collectionOfTodos,
  thisWeekTodoCollection,
  todayTodoCollection,
} from "../global/allProjects";
import { toggleModal } from "./modal";

function replaceDashesOnDate(date) {
  return date.replace(/-/g, "/");
}

function createTodoDiv(obj) {
  const div = document.createElement("div");
  div.setAttribute("class", "single-todo");
  div.setAttribute("data-todo-title", obj.title);

  const heading = document.createElement("p");
  heading.textContent = obj.title;

  // const descp = document.createElement("p");
  // descp.textContent = obj.description;

  const dateDiv = document.createElement("div");
  dateDiv.textContent = format(replaceDashesOnDate(obj.dueDate), "PPP");

  // const priorityP = document.createElement("p");
  // priorityP.textContent = obj.priority;

  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit-bttn-todo");
  addEvent(editButton, "click", function () {
    const foundTodo = queryTodo(
      this.parentNode.firstElementChild.textContent,
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
    toggleModal(createDetailModal(obj));
  });

  const detailImg = document.createElement("img");
  detailImg.src = DetailIcon;

  const editImg = document.createElement("img");
  editImg.src = EditIcon;

  detailButton.append(detailImg);
  editButton.append(editImg);

  div.append(heading, dateDiv, detailButton, editButton);
  return div;
}

function createDetailModal(obj) {
  const dialog = document.createElement("dialog");
  dialog.setAttribute("class", "modal-detail-wrapper");
  dialog.classList.add("modal");

  const modalContent = document.createElement("div");

  const heading = document.createElement("h1");
  heading.textContent = obj.title;

  const descriptionP = document.createElement("p");
  descriptionP.textContent = obj.description;

  const dateP = document.createElement("p");
  dateP.textContent = obj.dueDate;

  const priorityPara = document.createElement("p");
  priorityPara.textContent = obj.priority;

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  addEvent(cancelButton, "click", () => {
    toggleModal(dialog);
  });

  modalContent.append(heading, descriptionP, dateP, priorityPara, cancelButton);

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

  const ul = document.createElement("ul");
  ul.textContent = obj.title;
  ul.setAttribute("data-title", obj.title);

  div.append(ul);

  return div;
}

function createEditModal(currentTodo) {
  console.log(currentTodo, "ccurenttodo");
  console.log("in CREATE", currentTodo.title, currentTodo.description);
  const modalWrapper = document.createElement("dialog");
  modalWrapper.classList.add("modal-wrapper");
  modalWrapper.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

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

  const label4 = document.createElement("label");
  label4.textContent = "Low";

  const input4 = document.createElement("input");
  input4.setAttribute("type", "radio");
  input4.setAttribute("name", "priority");
  input4.setAttribute("value", "low");

  label4.append(input4);
  childDiv4.appendChild(label4);

  const label5 = document.createElement("label");
  label5.textContent = "Medium";

  const input5 = document.createElement("input");
  input5.setAttribute("type", "radio");
  input5.setAttribute("name", "priority");
  input5.setAttribute("value", "medium");

  label5.append(input5);
  childDiv4.appendChild(label5);

  const label6 = document.createElement("label");
  label6.textContent = "High";

  const input6 = document.createElement("input");
  input6.setAttribute("type", "radio");
  input6.setAttribute("name", "priority");
  input6.setAttribute("value", "high");

  label6.append(input6);
  childDiv4.appendChild(label6);

  //BUTTON
  const button = document.createElement("button");
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
  cancelButton.textContent = "Cancel";
  addEvent(cancelButton, "click", () => {
    toggleModal(modalWrapper);
  });

  modalContent.appendChild(childDiv1);
  modalContent.appendChild(childDiv2);
  modalContent.appendChild(childDiv3);
  modalContent.appendChild(childDiv4);
  modalContent.appendChild(cancelButton);
  modalContent.appendChild(button);

  modalWrapper.appendChild(modalContent);

  document.body.append(modalWrapper);

  return modalWrapper;
}

function returnNewValues(todo, newObject, modal) {
  let oldTodo = queryDOMTodo(todo.title);
  oldTodo.setAttribute("data-todo-title", newObject.title);

  let elementChildren = oldTodo.children;
  elementChildren[0].textContent = newObject.title;
  elementChildren[1].textContent = newObject.description;
  elementChildren[2].textContent = format(
    replaceDashesOnDate(newObject.dueDate),
    "PPP"
  );
  if (todo.priority !== newObject.priority) {
    elementChildren[3].textContent = newObject.priority;
  } else {
    elementChildren[3].textContent = todo.priority;
  }

  let idx = collectionOfTodos.findIndex((item) => item.title === todo.title);
  collectionOfTodos[idx].title = newObject.title;
  collectionOfTodos[idx].description = newObject.description;
  if (collectionOfTodos[idx].dueDate !== newObject.dueDate) {
    console.log("DIFFERENT DAES");
    if (
      isToday(replaceDashesOnDate(newObject.dueDate)) &&
      !queryTodo(newObject.title, todayTodoCollection)
    ) {
      todayTodoCollection.push(newObject);
      console.log(todayTodoCollection, "in SECOND IF");
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
      console.log(todayTodoCollection, "in SECOND IF - THIS WEEK");
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

  toggleModal(modal);
}

export { createTodoDiv, createProjectDiv };
