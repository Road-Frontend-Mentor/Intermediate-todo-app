function main() {
  const todoListDOMEl = document.getElementById("todo-list");
  const todoListFormDOMEl = document.getElementById("todo-list-form");
  const newTodoFormDOMEl = document.getElementById("new-todo-form");
  const addNewTodoInputDOMEl = document.getElementById("add-new-todo");
  const newTodoCheckboxDOMEL = document.getElementById("add-new-todo-checkbox");

  function createFieldDOMEl() {
    const field = document.createElement("div");
    field.classList.add("form__field");
    return field;
  }

  function createHtmlElement({ tag, attributes = [], className }) {
    const element = document.createElement(tag);

    attributes.forEach((attribute) => {
      element.setAttribute(attribute.key, attribute.value);
    });
    element.classList = className;
    return element;
  }

  function createList(newList = [], containerDOMELId) {
    let list = [...newList];

    function addItem(newItem) {
      list.push(newItem);
    }

    function deleteItem(itemId) {
      list = list.filter((item) => item.id != itemId);
    }

    function updateItem(updatedItem) {
      list = list.map((item) => {
        if (item.id === updatedItem.id) {
          return {
            ...item,
            ...updatedItem,
          };
        }
        return item;
      });
    }

    function buildField() {
      return createHtmlElement({
        tag: "div",
        className: "form__field",
      });
    }
    function buildCheckbox(checked, text, now) {
      let checkboxAttribute = [
        { key: "type", value: "checkbox" },
        { key: "name", value: "todos" },
        { key: "id", value: `todo-checkbox-${now}` },
        { key: "value", value: text },
      ];
      if (checked) {
        checkboxAttribute = [
          ...checkboxAttribute,
          { key: "checked", value: "checked" },
        ];
      }

      return createHtmlElement({
        tag: "input",
        attributes: checkboxAttribute,
        className: "form__checkbox",
      });
    }
    function buildLabel(now) {
      return createHtmlElement({
        tag: "label",
        attributes: [{ key: "for", value: `todo-checkbox-${now}` }],
        className: "form__checkbox-label",
      });
    }

    function buildCrossButtonContainer() {
      return createHtmlElement({
        tag: "button",
        className: "form__delete-button",
      });
    }
    function buildCrossIcon() {
      return createHtmlElement({
        tag: "img",
        attributes: [
          { key: "src", value: "images/icon-cross.svg" },
          { key: "alt", value: "Delete todo icon" },
        ],
      });
    }
    function buildTextInput(text, now) {
      return createHtmlElement({
        tag: "input",
        attributes: [
          { key: "type", value: "text" },
          { key: "name", value: `todo-input-${now}` },
          { key: "id", value: `todo-input-${now}` },
          { key: "placeholder", value: "Task name" },
          { key: "value", value: text },
        ],
        className: "form__input",
      });
    }
    function buildFieldInput(item) {
      const now = `${Date.now()}${Math.floor((Math.random() + 1) * 100)}`;
      const { text, checked } = item;

      const field = buildField();
      const checkbox = buildCheckbox(checked, text, now);
      const label = buildLabel(now);
      const crossButtonContainer = buildCrossButtonContainer();
      const crossIcon = buildCrossIcon();
      const textInput = buildTextInput(text, now);

      crossButtonContainer.appendChild(crossIcon);

      field.appendChild(checkbox);
      field.appendChild(label);
      field.appendChild(textInput);
      field.appendChild(crossButtonContainer);

      return field;
    }

    function drawList() {
      const documentFragment = document.createDocumentFragment();

      list.forEach((item) => {
        documentFragment.appendChild(buildFieldInput(item));
      });
      document.getElementById(containerDOMELId).innerHTML = "";
      document.getElementById(containerDOMELId).appendChild(documentFragment);
    }

    function getList() {
      return list;
    }

    return {
      addItem,
      deleteItem,
      updateItem,
      drawList,
      getList,
    };
  }

  //LocalStorage function
  function saveTodoListLocalStorage(todoList, todoListKey) {}
  function getFromLocalStorage() {}

  function handleTodoListClick(e, list) {
    if (e.target.classList.contains("form__cross")) {
      alert("esta haciendo click en el aspa");
    } else if (e.target.classList.contains("form__checkbox-label")) {
    }
  }

  function handleTodoFormSubmit(e, list) {
    e.preventDefault();
  }

  const todoList = createList([], "todo-list");

  todoList.addItem({
    text: "Lear React.js",
    checked: false,
    id: 1,
  });

  todoList.addItem({
    text: "Lear Angular.js",
    checked: true,
    id: 2,
  });

  todoList.addItem({
    text: "Lear Vue.js",
    checked: true,
    id: 3,
  });

  todoList.drawList();

  //Eventos de escucha
  newTodoFormDOMEl.addEventListener("submit", (e) =>
    handleTodoFormSubmit(e, todoList)
  );
  todoListFormDOMEl.addEventListener("click", (e) =>
    handleTodoFormClick(e, todoList)
  );
}
main();
