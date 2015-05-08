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

put "/todos.json" do
  todos = JSON.parse(File.read('./todos.json'))
  updated_todo = JSON.parse(request.body.read)
  todos.map do |todo|
    if todo["id"] == updated_todo["id"]
      todo.each { |field,value| todo[field] = updated_todo[field] }
    end
  end
  File.write('./todos.json', JSON.pretty_generate(todos, :indent => '    '))

  todos.to_json
end

delete "/todos.json" do
  todos = JSON.parse(File.read('./todos.json'))
  if params["id"]
    updatedTodos = todos.reject do |todo|
      todo["id"] == params["id"]
    end
  elsif params["ids"]
    updatedTodos = todos.reject do |todo|
      params["ids"].include?(todo["id"])
    end
  end
  
  File.write('./todos.json', JSON.pretty_generate(updatedTodos, :indent => '    '))

  updatedTodos.to_json
end
