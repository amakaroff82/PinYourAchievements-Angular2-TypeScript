"use strict";

(function (require) {

    var configs = {
        dev: {
            port: 8084,
            debug: true,
            database: {
                protocol: "http",
                host: "localhost",
                port: 2424,
                serverUsername: "root",
                serverPassword: "DCBB1E709B257231C1112BD12B7F255AD9BC7E362D4D0561C0F53257B9F7E76F",
                dbName: "demo",
                dbUsername: "RqTcjeZT2h4SyeFI6PZo",
                dbPassword: "o0L7pMSuPJOTignWwMPR"
            },
            content: {
                styles: [],
                scripts: [
                    "traceur-runtime.js",
                    "system.js"
                ],
                images: []
            },
            accessControlAllowOrigin: "http://127.0.0.1"
        }
    };

    module.exports = function (mode) {

        if (mode in configs) {
            return require("./../bin/providers/configProvider").useConfig(configs[mode]);
        }

        throw new Error("Invalid mode: " + mode);
    };

})(require);