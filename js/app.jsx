var app = app || {};

(function () {
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
          this.setState({todos: todos});
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
        if (todo !== todoToToggle) {
          todo;
        } else {
          todo.completed
          = (todo.completed === "true" ? "false" : "true");
        };
      });

      this.setState(updatedTodos);

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
    render: function() {
      var that = this;
      var todos = this.state.todos.map(function(todo) {
        return (
          <TodoItem
            todo={todo}
            onToggle={that.handleToggle.bind(that,todo)}
          />
        );
      });

      return (
        <div id="todoapp">
          <header id="header">
            <h1>todos</h1>
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
              {todos}
            </ul>
          </section>
          <TodoFooter />
        </div>
      );
    },
  });

  var TodoItem = React.createClass({
    render: function() {
      var todo = this.props.todo;
      var liClassName = (todo.completed === "true" ? 'completed' : '');

      return (
        <li className={liClassName}>
          <input
            className="toggle"
            type="checkbox"
            onClick={this.props.onToggle}
            checked={todo.completed === "true"}
           />
          <label>{todo.text}</label>
        </li>
      );
    },
  });

  React.render(
    <TodoApp url="todos.json" />,
    document.getElementById('todoApp')
  );

})();
