import PackageDescription

let package = Package(
    name: "gulp-vapor",
    dependencies: [
        .Package(url: "https://github.com/vapor/vapor.git", majorVersion: 1, minor: 0)
    ],
    exclude: [
        "Config",
        "Database",
        "Localization",
        "Public",
        "Resources",
        "Tests",
        "scripts",
        "distribution",
        "node_modules",
    ]
)
