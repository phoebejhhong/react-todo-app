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
        <div className="todoApp">
          <input className="newTodo" type="text"
            placeholder="What needs to be done?"/>
          <TodoList />
        </div>
      );
    },
  });

  var TodoList = React.createClass({
    render: function() {
      return (
        <ul className="todoList">
          
        </ul>
      );
    },
  });

  var TodoItem = React.createClass({
    render: function() {
      return (
        <li className="todoItem">
          <p>I am todoItem</p>
        </li>
      );
    },
  });

  React.render(
    <TodoApp data="data" />,
    document.getElementById('todoApp')
  );

})();
