app = app || {};

(function () {
  app.TodoItem = React.createClass({
    render: function() {
      var todo = this.props.todo;
      var liClassName = (todo.completed === "true" ? 'completed' : '');

      return (
        <li
          className={liClassName}>
          <input
            className="toggle"
            type="checkbox"
            onClick={this.props.onToggle}
            checked={todo.completed === "true"}
           />
          <label>{todo.text}</label>
          <button className="destroy"
            onClick={this.props.onDestroy} />
        </li>
      );
    },
  });
})();
