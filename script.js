{
    const tasks = [
        {
            content: "Nagrać lekcję.",
            done: false,
        },
        {
            content: "Zjeść pierogi.",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item${task.done ? " list__item--done" : ""}">
            <button class="js-remove">Usuń</button>
              ${task.content} 
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                render();
            });
        });
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        })
    }

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