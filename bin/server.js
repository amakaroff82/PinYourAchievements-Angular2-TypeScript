"use strict";

(function (require) {

    var easyArgs = require("./easyArgs");

    (function (require, mode) {

        var express = require("express");
        var config = require("./../bin/config")(mode);
        var app = express();
        var server = require("http").Server(app);
        var io = require("socket.io")(server);

        require("./app")(express, app, io, config);

        var getErrorHandler = function (port) {

            return function (error) {

                if (error.syscall !== "listen") {
                    throw error;
                }

                var bind = typeof port == "string" ? "Pipe " + port : "Port " + port;

                switch (error.code) {
                    case "EACCES":
                    {
                        console.error(bind + " requires elevated privileges");
                        process.exit(1);
                        break;
                    }
                    case "EADDRINUSE":
                    {
                        console.error(bind + " is already in use");
                        process.exit(1);
                        break;
                    }
                    default:
                        throw error;
                }
            };
        };

        var getListeningHandler = function (server) {

            return function () {

                var address = server.address();
                var bind = typeof address == "string" ? "pipe " + address : "port " + address.port;

                console.info("Listening on " + bind);
            };
        };

        var port = config.port;

        console.log("Server started in " + mode.toUpperCase() + " mode");

        server.listen(port);
        server.on("error", getErrorHandler(port));
        server.on("listening", getListeningHandler(server));

    })(require, easyArgs.get("mode", "dev"));
})(require);