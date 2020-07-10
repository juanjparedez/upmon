const app = require("express")()
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const bodyParser = require("body-parser")
require("dotenv/config")

const hostsRoute = require("./api/hosts")

const port = process.env.PORT || 3001

app.use(bodyParser.json())

app.use("/hosts", hostsRoute)

server.listen(port, () => {
	console.log("Server lintening on port N°: " + port)
})
