"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var inputDir = "public/dist";
var prefix = "opteamix-";
var processFile = function (filePath) {
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            console.error("Error reading ".concat(filePath, ":"), err);
            return;
        }
        var updatedData = data.replace(/(className[:=])\s*"([^"]+)"/g, function (match, key, classList) {
            var prefixedClasses = classList
                .split(" ")
                .map(function (cls) { return (cls.startsWith(prefix) ? cls : "".concat(prefix).concat(cls)); })
                .join(" ");
            return "".concat(key, " \"").concat(prefixedClasses, "\"");
        });
        fs.writeFile(filePath, updatedData, function (writeErr) {
            if (writeErr) {
                console.error("Error writing ".concat(filePath, ":"), writeErr);
            }
            else {
                console.log("Updated: ".concat(filePath));
            }
        });
    });
};
var processDirectory = function (dir) {
    fs.readdir(dir, function (err, files) {
        if (err) {
            console.error("Error reading directory ".concat(dir, ":"), err);
            return;
        }
        files.forEach(function (file) {
            var filePath = path.join(dir, file);
            fs.stat(filePath, function (statErr, stats) {
                if (statErr) {
                    console.error("Error checking ".concat(filePath, ":"), statErr);
                    return;
                }
                if (stats.isDirectory()) {
                    processDirectory(filePath);
                }
                else if (stats.isFile() && (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".tsx"))) {
                    processFile(filePath);
                }
            });
        });
    });
};
processDirectory(inputDir);
