window.ToDoList = {

    API_BASE_URL: "http://localhost:8081/tasks",

    getTasks: function () {
        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
        })
    },

    getTaskRow: function (task) {
        return `<tr>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td><input type="checkbox" data-id=1 class="mark-done"/>
            <td><a href="#" data-id=1 class="delete-task"><i class="fas fa-trash-alt"></i></a></td>
        </tr>`
    }

};

ToDoList.getTasks();