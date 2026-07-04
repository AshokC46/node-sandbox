const http = require('http')

const myServer = http.createServer((request,response) => {
   response.write("Hello Welcome to my new server")
   response.end()
})
myServer.listen(5000)
