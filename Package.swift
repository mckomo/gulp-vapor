import PackageDescription

let package = Package(
    name: "gulp-vapor",
    dependencies: [
        .Package(url: "https://github.com/qutheory/vapor.git", majorVersion: 0, minor: 8),
    ],
    exclude: [
        "node_modules",
		"distribution",
        "scripts",
        "test"
    ]
)
