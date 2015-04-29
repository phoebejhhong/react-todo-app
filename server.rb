require 'webrick'
require 'json'

port = ENV['PORT'].nil? ? 3000 : ENV['PORT'].to_i

puts "Server started: http://localhost:#{port}/"

root = File.expand_path './'
server = WEBrick::HTTPServer.new :Port => port, :DocumentRoot => root

server.mount_proc '/todos.json' do |req, res|
  todos = JSON.parse(File.read('./todos.json'))

  if req.request_method == 'POST'
    # Assume it's well formed
    todos << req.query
    File.write('./todos.json', JSON.pretty_generate(todos, :indent => '    '))
  end

  # always return json
  res['Content-Type'] = 'application/json'
  res['Cache-Control'] = 'no-cache'
  res.body = JSON.generate(todos)
end

trap 'INT' do server.shutdown end

server.start
