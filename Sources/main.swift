import Vapor

let drop = Droplet()

drop.get { req in
  return "gulp-vapor"
}

drop.run()
