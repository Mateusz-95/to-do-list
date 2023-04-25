{
    let tasks = [];
    let hideDoneTasks = false;
    // empty array

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];
        document.querySelector(".js-newTask").value = "";
    }
    // function addNewTask takes value from newTaskContent(input), and add to array content: newTaskContent(input value). And clear input after all.

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
    // Funkcja, która zmienia task.done na !task.done.

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        // Łapie wszystkie przyciski o klasie js-remove.
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
        // forEach, czyli pętla, która przechodzi przez wszystkie removeButtons i po kliknięciu wywołuje funkcje removeTask(index).

        const toggleDoneButtons = document.querySelectorAll(".js-task");
        // Łapie wszystkie js-task, czyli li i buttons
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
                // Przechodzi za pomocą metody forEach przez wszystkie toggleDoneButtons(przyciski do zmiany zadania ze zrobionego na niezrobione i odwrotnie) i dodaje im eventListenera i po kliknięciu wywołuje funkcje toggleTaskDone(), czyli funkcje, która zmienia task.done na !task.done.
            });
        });
    }

    const render = () => {
        let htmlStringTasks = "";
        let htmlStringButtons = "";
        // empty string 
        const renderTasks = () => {
            for (const task of tasks) {
                htmlStringTasks += `
            <li class="list__item${task.done ? " list__item--done" : ""}">
            <button class="js-task list__done">
            ${task.done ? "<img class=\"list__done--imgDone\" src=\"images/done.png\">" : "<img class=\"list__done--imgNotDone\" src=\"images/notDone.png\">"
                    }</button >
            <div>${task.content}</div> 
            <button class="js-remove list__remove">
            <img class="list__remove--img" src="images/trash.png">
            </button>
            </li >
        `;
            };
        };
        renderTasks();
        // pętla, która przechodzi przez tasks(tablicę) i dla kazdego task tworzy htmla(li i 2 buttony)

        document.querySelector(".js-tasks").innerHTML = htmlStringTasks;
        // Przypisuje to, co stworzyło w pętli i później zostało dodane do htmlStringTasks, do htmla a dokładnie do ul.
        bindEvents();
        const buttons = document.querySelectorAll(".js-buttons");

        const renderButtons = () => {
            if (tasks.length !== 0) {
                htmlStringButtons += `<button class="section__button js-buttons js-hideDoneTasks">
                Ukryj ukończone
                </button>
                <button class="section__button js-buttons js-completeAllTasks">
                Ukończ wszystkie
                </button>`

            };

            document.querySelector(".js-buttons").innerHTML = htmlStringButtons;



        };
        renderButtons();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        // Sprawia, ze formularz nie zostaje wysłany. 
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        // newTaskContent get value from input

        if (newTaskContent === "") {
            return;
        };
        // Jeśli input jest pusty i zostanie kliknięte dodanie nowego zadania, to nic się nie stanie.

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
