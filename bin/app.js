(function (require, module) {

    var path = require("path");
    var domain = require("domain");
    var debug = require("debug")("demo:server");
    var logger = require("morgan");
    var cookieParser = require("cookie-parser");
    var bodyParser = require("body-parser");
    var expressSession = require("express-session");
    var _ = require("underscore");
    var fs = require("fs");
    var securityUtils = require("./utils/securityUtils");
    var resourcesManager = require("./utils/resourcesManager");

    var publicDirectory = path.resolve("./public");
    var rootDirectory = path.resolve("./");

    function acceptTypeDetector(request, handler) {

        if (request.accepts("text/html")) {
            handler.html();
        } else {
            if (request.accepts("application/json")) {
                handler.json();
            } else {
                handler.unknown();
            }
        }
    }

    function getApp(express, app, io, config) {

        app.use(function (request, response, next) {

            var d = domain.create();

            d.add(request);
            d.add(response);

            d.on("error", function (error) {

                next(error);

                if (d) {
                    d.dispose();
                }
            });

            d.run(function () {
                next();
            });
        });

        if (config.debug) {
            app.use(logger("dev"));
        }

        app.use(expressSession({
            secret: securityUtils.generateToken(),
            resave: false,
            saveUninitialized: true
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.text({type: 'text/plain'}));
        app.use(cookieParser());
        app.use("/", function (request, response, next) {
            response.header("Access-Control-Allow-Origin", config.accessControlAllowOrigin);
            next();
        }, express.static(publicDirectory));

        require("./controllers")(app);
        require("./routes")(app, io, config);

        app.use(function (request, response, next) {

            response.status(404);

            var url = decodeURIComponent(request.url);

            acceptTypeDetector(request, {
                html: function () {
                    response.render("page-not-found.ejs", {
                        requestUrl: url
                    });
                },
                json: function () {
                    response.json({
                        error: {
                            message: "Page " + url + " not found"
                        }
                    });
                },
                unknown: function () {
                    response = response.type("txt");
                    response.send("Page " + url + " not found");
                }
            });
        });

        app.use(function (error, request, response, next) {

            console.error(error.stack);

            response.status(error.status || 500);

            function extractErrorMessage(error) {

                if (error instanceof Error) {
                    return error;
                }

                return new Error((error.message || error) || "Internal Server Error");
            }

            acceptTypeDetector(request, {
                html: function () {
                    response.render("internal-server-error.ejs", {
                        error: extractErrorMessage(error)
                    });
                },
                json: function () {
                    response.json({
                        error: extractErrorMessage(error)
                    });
                },
                unknown: function () {
                    var message = extractErrorMessage(error).message;
                    response = response.type("txt");
                    response.send(message);
                }
            });
        });

        app.set("views", path.join(__dirname, "../views"));
        app.set("view engine", "ejs");
        app.set("port", config.port);

        return app;
    }

    console.log("app directory: " + publicDirectory);
    console.log("root directory: " + rootDirectory);

    module.exports = function (express, app, io, config) {
        return getApp(express, app, io, config);
    };

})(require, module);