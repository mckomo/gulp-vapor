import Vapor

let drop = Droplet()

drop.get { req in
  return "Hello, World!"
}

drop.run()
