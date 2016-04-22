"use strict";

var args = process["argv"];
var typeParsers = {
    int: function (value) {
        return parseInt(value);
    },
    float: function (value) {
        return parseFloat(value);
    },
    bool: function (value) {
        return value === "true";
    },
    object: function (value) {
        return JSON.parse(value);
    },
    date: function (value) {
        return new Date(value);
    }
};

function parseArgument(fn) {
    try {
        return fn();
    } catch (e) {
        console.error(e);
    }
}

function get(argumentName, defaultValue) {
    var index = args.indexOf("--" + argumentName);
    if (index != -1) {
        if (args[index + 1]) {
            return args[index + 1];
        } else {
            if (defaultValue) {
                if (typeof defaultValue === "function") {
                    return defaultValue();
                }
                return defaultValue;
            }
        }
    }
}

function getAs(argumentName, type, defaultValue) {
    var value = read(argumentName, defaultValue);
    if (value) {
        if (type && type in typeParsers) {
            return typeParsers[type](value);
        }
        return value;
    }
}

exports.get = get;
exports.getAs = getAs;