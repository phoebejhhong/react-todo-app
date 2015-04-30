var app = app || {};

(function () {
  var TodoFooter = app.TodoFooter;

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
    handleNewTodo: function (e) {
      e.preventDefault();
      var newTodoText = React.findDOMNode(this.refs.text).value.trim();
      if (!newTodoText) {
        return;
      };
      React.findDOMNode(this.refs.text).value= '';

      var oldTodos = this.state.todos
      var newTodos = oldTodos.concat([{
        "text": newTodoText,
        "completed": "false"
      }]);

      this.setState({todos: newTodos});
    },
    render: function() {
      return (
        <div id="todoapp">
          <header id="header">
            <h1>todos</h1>
            <form onSubmit={this.handleNewTodo}>
              <input id="new-todo" type="text" ref="text"
                placeholder="What needs to be done?"
                />
              <input type="submit" value="Post" />
            </form>
          </header>
          <section id="main">
            <input id="toggle-all" type="checkbox"></input>
            <TodoList todos={this.state.todos} />
          </section>
          <TodoFooter />
        </div>
      );
    },
  });

  var TodoList = React.createClass({
    render: function() {
      var todos = this.props.todos.map(function(todo) {
        return (
          <TodoItem
            todo={todo}
          />
        );
      });
      return (
        <ul id="todo-list">
          {todos}
        </ul>
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
