var app = app || {};

(function () {
  var todoApp = app.todoApp = React.createClass({
    render: function() {
      return (
        <div className="todoApp">
          I am todoApp
        </div>
      );
    },
  });

  React.render(
    <todoApp />,
    document.getElementById('todoApp')
  );

})();
