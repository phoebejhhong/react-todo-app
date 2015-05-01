var app = app || {};

(function () {
  app.TodoFooter = React.createClass({
    render: function () {
      var clearCompleteTodosButton = null;

      // show clear completed todos button
      // only when there is at least one of them
      if (this.props.completedTodoCount > 0) {
        clearCompleteTodosButton = (
          <button id="clear-completed">
            Clear completed
          </button>
        );
      }

      var nowShowing = this.props.nowShowing;
      return (
        <footer id="footer">
          <span id="todo-count">
            {this.props.activeTodoCount} items left
          </span>
          <ul id="filters">
            <li>
              <a onClick={this.props.onToggle.bind(null, "all")}
                className={nowShowing === "all" ? "selected" : ""}>
              All </a>
            </li>
            <li>
            <a onClick={this.props.onToggle.bind(null, "active")}
                className={nowShowing === "active" ? "selected" : ""}>
              Active </a>
            </li>
            <li>
            <a onClick={this.props.onToggle.bind(null, "completed")}
              className={nowShowing === "completed" ? "selected" : ""}>
              Completed </a>
            </li>
          </ul>
          {clearCompleteTodosButton}
        </footer>
      );
    },
  });
})();
