{
    let tasks = [];
    let completeAllElement;
    let hideCompleteTasksSwitch = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];
        document.querySelector(".js-newTask").value = "";
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const hideDoneTasks = () => {
        const hideCompleteTasksElement = document.querySelector(".js-hideCompleteTasks");
        hideCompleteTasksElement.addEventListener("click", () => {
          const listItemsElements = document.querySelectorAll(".js-listItem");
          listItemsElements.forEach(listItemElement => {
            if (listItemElement.classList.contains("list__item--done")) {
              listItemElement.classList.toggle("hidden");
              hideCompleteTasksSwitch = true;
            } else {
                hideCompleteTasksSwitch = false;
            }
          });
        });
      };
      

    const completeAllTasks = () => {
        completeAllElement = document.querySelector(".js-completeAllTasks");
        completeAllElement.addEventListener("click", () => {
            tasks = tasks.map((task) => ({ ...task, done: true }));
            completeAllElement.setAttribute("disabled", true);
            completeAllElement.classList.add("completeAllButton-disabled");
            render();
        });
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return { ...task, done: !task.done };
            }
            return { ...task };
        });
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-task");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlStringTasks = "";
        let htmlStringButtons = "";
        const renderTasks = () => {
            for (const task of tasks) {
                htmlStringTasks += `
            <li class="js-listItem list__item${task.done ? " list__item--done" : ""}${hideCompleteTasksSwitch ? "hidden" : ""}">
              <button class="js-task list__done">
                ${task.done ? '<img class="list__done--imgDone" src="images/done.png">' : '<img class="list__done--imgNotDone" src="images/notDone.png">'}
              </button>
              <div>${task.content}</div>
              <button class="js-remove list__remove">
                <img class="list__remove--img" src="images/trash.png">
              </button>
            </li>
          `;
            }
        };
        renderTasks();

        document.querySelector(".js-tasks").innerHTML = htmlStringTasks;
        bindEvents();

        const buttons = document.querySelectorAll(".js-buttons");

        const renderButtons = () => {
            if (tasks.length === 0) {
                buttons.forEach((button) => button.setAttribute("disabled", true));
            } else {
                buttons.forEach((button) => button.removeAttribute("disabled"));
            }

            if (tasks.some((task) => !task.done)) {
                completeAllElement.classList.remove("completeAllButton-disabled");
                completeAllElement.removeAttribute("disabled");
            }
        };
        renderButtons();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        render();
    };

    const init = () => {
        render();
        completeAllTasks();
        hideDoneTasks(tasks);

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}
