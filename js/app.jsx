var app = app || {};

(function () {
  var TodoItem = app.TodoItem;
  var TodoFooter = app.TodoFooter;
  var Utils = app.Utils;

  var ENTER_KEY = 13;

  var TodoApp = React.createClass({
    getInitialState: function () {
      return {todos: []};
    },
    componentDidMount: function () {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function (todos) {
          this.setState({todos: todos, nowShowing: "all"});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this),
      });
    },
    handleNewTodoKeyDown: function (e) {
      if (e.which !== ENTER_KEY) {
        return;
      }
      e.preventDefault();

      var newTodoText = React.findDOMNode(this.refs.text).value.trim();
      if (newTodoText) {
        this.handleNewTodo(newTodoText)
        React.findDOMNode(this.refs.text).value= '';
      }

    },
    handleNewTodo: function (newTodoText) {
      var newId = Utils.generateId();
      var oldTodos = this.state.todos;
      var newTodo = {
        "id": newId,
        "text": newTodoText,
        "completed": "false"
      };
      var newTodos = oldTodos.concat([newTodo]);

      this.setState({todos: newTodos});

      $.ajax({
        url: this.props.url,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(newTodo),
        success: function (todos) {
          this.setState({todos: todos});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this),
      });
    },
    handleToggle: function (todoToToggle) {
      var updatedTodos = this.state.todos.map(function (todo) {
        if (todo === todoToToggle) {
          todo.completed
          = (todo.completed === "true" ? "false" : "true");
        }
        return todo;
      });

      this.setState({todos: updatedTodos});

      $.ajax({
        url: this.props.url,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify(todoToToggle),
        success: function (todos) {
          this.setState({todos: todos});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this),
      });
    },
    handleNowShowing: function (newStatus) {
      this.setState({nowShowing: newStatus});
    },
    deleteTodo: function (todoToDelete) {
      var updatedTodos = this.state.todos.filter(function (todo) {
        return todo !== todoToDelete
      });

      $.ajax({
        url: this.props.url,
        method: 'DELETE',
        dataType: 'json',
        data: {id: todoToDelete["id"]},
        success: function (todos) {
          this.setState({todos: todos});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this),
      });

      this.setState({todos: updatedTodos});
    },
    clearCompleted: function() {
      var that = this;
      todoIdsToDelete = this.state.todos.filter(function (todo) {
        return todo.completed == "true";
      }).map(function (todo) {
        return todo.id;
      });

      $.ajax({
        url: that.props.url,
        method: 'DELETE',
        dataType: 'json',
        data: {ids: todoIdsToDelete},
        success: function (todos) {
          that.setState({todos: todos});
        },
        error: function (xhr, status, err) {
          console.error(that.props.url, status, err.toString());
        },
      });
    },

    render: function() {
      var that = this;
      var activeTodoCount = this.state.todos.reduce(function (sum, todo) {
        return todo.completed === "true" ? sum : sum + 1;
      }, 0);

      var completedTodoCount = this.state.todos.length - activeTodoCount;

      var todosToShow = this.state.todos.filter (function (todo) {
        switch (that.state.nowShowing) {
          case "completed":
            return todo.completed === "true";
          case "active":
            return todo.completed === "false";
          default:
            return true;
        }
      });

      var todoItems = todosToShow.map(function(todo) {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={that.handleToggle.bind(that, todo)}
            onDestroy={that.deleteTodo.bind(that, todo)}
          />
        );
      });

      return (
        <div id="todoapp">
          <header id="header">
            <h1>toodoos</h1>
            <input
              id="new-todo"
              type="text"
              ref="text"
              placeholder="What needs to be done?"
              onKeyDown={this.handleNewTodoKeyDown}
              autofocus="true"
              />
          </header>
          <section id="main">
            <input id="toggle-all" type="checkbox"></input>
            <ul id="todo-list">
              {todoItems}
            </ul>
          </section>
          <TodoFooter
            nowShowing={this.state.nowShowing}
            activeTodoCount={activeTodoCount}
            completedTodoCount={completedTodoCount}
            onToggle={that.handleNowShowing.bind(that)}
            onClearCompleted={that.clearCompleted.bind(that)}
          />
        </div>
      );
    },
  });

  React.render(
    <TodoApp url="todos.json" />,
    document.getElementById('todoApp')
  );

})();
