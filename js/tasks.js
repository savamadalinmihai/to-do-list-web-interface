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

    getTaskRow: function (task) {
        // (...) this is the spread operator, that helps us when we want to read multiple values from an array
        let formattedDeadline = new Date(...task.deadline).toLocaleDateString();

        // ternary operator (if else written in one line)
        let checkedAttribute = task.done ? "checked" : "";


        return `<tr>
            <td>${task.description}</td>
            <td>${formattedDeadline}</td>
            <td><input type="checkbox" data-id=1 class="mark-done" ${ checkedAttribute}/>
            <td><a href="#" data-id=1 class="delete-task"><i class="fas fa-trash-alt"></i></a></td>
        </tr>`
    },

    displayTasks: function (tasks) {
        // javascript is weak-typed (we can store anything in a variable)
        // java is strong-typed (we can not store anything we want in a variable).
        var tableBody = '';

        tasks.forEach(task => tableBody += ToDoList.getTaskRow(task));

        $("#tasks-table tbody").html(tableBody);
    }

};

ToDoList.getTasks();