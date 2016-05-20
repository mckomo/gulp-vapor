import Vapor

let app = Application()

app.get("/") { request in
	return "Hello, World!"
}


app.start(port: 8080)