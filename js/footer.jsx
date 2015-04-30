var app = app || {};

(function () {
  app.TodoFooter = React.createClass({
    render: function () {
      return (
        <footer id="footer">
          <span id="todo-count"> 3 items left </span>
          <ul id="filters">
            <li>
              <a className="selected">
              All </a>
            </li>
            <li>
              <a>
              Active </a>
            </li>
            <li>
              <a>
              Completed </a>
            </li>
          </ul>
          <button id="clear-completed">
          Clear completed</button>
        </footer>
      );
    },
  });
})();
