{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];
        document.querySelector(".js-newTask").value = "";
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            if (index === taskIndex) {
                return { ...task, done: !task.done };
            }
            return { ...task };
        });
        render();
    }

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
    }

    const switchHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
    };

    const addClassHide = () => {
        const listItemElements = document.querySelectorAll(".list__item");
        for (const listItemElement of listItemElements) {
            if (hideDoneTasks && listItemElement.classList.contains("list__item--done")) {
                listItemElement.classList.add("list__item--hide");
            }
        }
    };

    const doneAllTasks = () => {
        tasks = tasks.map(task => {
            return {
                ...task,
                done: true,
            }
        })
    };

    const areAllTasksDone = tasks => tasks.every(task => task.done);

    const bindButtonsEvents = () => {
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
        const doneAllTasksButton = document.querySelector(".js-doneAllTasks");

        if (tasks.length !== 0) {
            hideDoneTasksButton.addEventListener("click", () => {
                switchHideDoneTasks();
                render();
            });
            doneAllTasksButton.addEventListener("click", () => {
                doneAllTasks();
                render();
            });
        }
    };

    const render = () => {
        let htmlStringTasks = "";
        let htmlStringButtons = "";
        const renderTasks = () => {
            for (const task of tasks) {
                htmlStringTasks += `
            <li class="list__item${task.done ? " list__item--done" : ""}">
            <button class="js-task list__done">
            ${task.done ? "<img class=\"list__img\" src=\"images/done.png\">" : "<img class=\"list__img\" src=\"images/notDone.png\">"}
            </button >
            <div>${task.content}</div> 
            <button class="js-remove list__remove">
            <img class="list__img" src="images/trash.png">
            </button>
            </li >
        `;
            };
        };
        renderTasks();

        document.querySelector(".js-tasks").innerHTML = htmlStringTasks;
        const buttons = document.querySelectorAll(".js-buttons");

        const renderButtons = () => {
            if (tasks.length !== 0) {
                htmlStringButtons += `<button class="section__button js-buttons js-hideDoneTasks">
                ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
                </button>
                <button class="section__button js-buttons js-doneAllTasks" ${areAllTasksDone(tasks) ? "disabled" : ""}>
                Ukończ wszystkie
                </button>`
            };

            document.querySelector(".js-buttons").innerHTML = htmlStringButtons;
        };
        renderButtons();
        bindEvents();
        bindButtonsEvents();
        addClassHide();

    };

    const onFormSubmit = (event) => {
        event.preventDefault(); 
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);

        render();

    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}
