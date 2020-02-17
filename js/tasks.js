window.ToDoList = {

    API_BASE_URL: "http://localhost:8081/tasks",

    getTasks: function () {
        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            console.log(response);

            ToDoList.displayTasks(JSON.parse(response));
        })
    },

    createTask: function () {
        let descriptionValue = $("#description-field").val();
        let deadlineValue = $("#deadline-field").val();

        let requestBody = {
            description: descriptionValue,
            deadline: deadlineValue
        };

        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "POST",
            //content type, also known as mime type
            contentType: "application/json",
            // json stringify get a string from a JSON object
            // json parse to get a JSON object FROM a string.
            data: JSON.stringify(requestBody)
        }).done(function () {
            ToDoList.getTasks();
        })
    },

    updateTask: function () {
        let description;
        let deadline;
        let done;
    },

    getTaskRow: function (task) {
        // (...) this is the spread operator, that helps us when we want to read multiple values from an array
        let formattedDeadline = new Date(...task.deadline).toLocaleDateString();

        // ternary operator (if else written in one line)
        let checkedAttribute = task.done ? "checked" : "";


        return `<tr>
            <td>${task.description}</td>
            <td>${formattedDeadline}</td>
            <td><input type="checkbox" data-id=1 class="mark-done" ${checkedAttribute}/>
            <td><a href="#" data-id=1 class="delete-task"><i class="fas fa-trash-alt"></i></a></td>
        </tr>`
    },

    displayTasks: function (tasks) {
        // javascript is weak-typed (we can store anything in a variable)
        // java is strong-typed (we can not store anything we want in a variable).
        var tableBody = '';

        tasks.forEach(task => tableBody += ToDoList.getTaskRow(task));

        $("#tasks-table tbody").html(tableBody);
    },

    bindEvents: function () {
        //this function connects the functions we created (create/update/etc) to the events (click/submit/etc)
        $("#new-task-form").submit(function (event) {
            event.preventDefault();

            ToDoList.createTask();
        });

        //delegate is necesary here because the element .mark-done
        // is not present in the page from the beginning, but injected later on.
        $("#tasks-table").delegate(".mark-done", "change", function (event) {
            event.preventDefault();

            ToDoList.updateTask();
        });
        
    }

};

ToDoList.getTasks();
ToDoList.bindEvents();