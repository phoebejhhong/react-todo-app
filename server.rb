require 'sinatra'
require 'json'

get "/" do
  send_file "index.html"
end

get "/:dirname/:filename" do
  send_file params["dirname"] + "/" + params["filename"]
end

get "/:filename" do
  send_file params["filename"]
end

post "/todos.json" do
  todos = JSON.parse(File.read('./todos.json'))
  new_todo = JSON.parse(request.body.read)
  todos << new_todo
  File.write('./todos.json', JSON.pretty_generate(todos, :indent => '    '))

  todos.to_json
end
