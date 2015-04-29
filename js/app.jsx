var data = [
  {
    "text": "drink", "completed": "false"
  },
  {
    "text": "eat", "completed": "true"
  }
];

var app = app || {};

(function () {
  var TodoApp = React.createClass({
    render: function() {
      return (
        <div id="todoapp">
          <header id="header">
            <h1>todos</h1>
            <input id="new-todo" type="text"
              placeholder="What needs to be done?"/>
          </header>
          <section id="main">
            <input id="toggle-all" type="checkbox"></input>
            <TodoList data={this.props.data} />
          </section>
        </div>
      );
    },
  });

  var TodoList = React.createClass({
    render: function() {
      var todos = this.props.data.map(function(todo) {
        return (
          <li completed={todo.completed}>
            <input className="toggle" type="checkbox" />
            <label>{todo.text}</label>
          </li>
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
      return (
        <li className="todo-item">
          <p>I am todoItem</p>
        </li>
      );
    },
  });

  React.render(
    <TodoApp data={data} />,
    document.getElementById('todoApp')
  );

})();
