const fs = require("fs-extra");
const path = require("path");

const inputDir = "src";
const prefix = "opteamix-";

const processFile = (filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:`, err);
      return;
    }

    const updatedData = data.replace(
      /className="([^"]+)"/g,
      (match, classList) => {
        const prefixedClasses = classList
          .split(" ")
          .map(
            (cls) => (cls.startsWith(prefix) ? cls : `${prefix}${cls}`) // Skip if already prefixed
          )
          .join(" ");
        return `className="${prefixedClasses}"`;
      }
    );

    fs.writeFile(filePath, updatedData, (err) => {
      if (err) {
        console.error(`Error writing ${filePath}:`, err);
      } else {
        console.log(`Updated: ${filePath}`);
      }
    });
  });
};

const processDirectory = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error checking ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          processDirectory(filePath);
        } else if (stats.isFile() && file.endsWith(".tsx")) {
          processFile(filePath);
        }
      });
    });
  });
};

processDirectory(inputDir);
