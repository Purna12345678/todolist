const fs = require("fs-extra");
const path = require("path");

const inputDir = "src";
const outputDir = "src/tsx";
const prefix = "opteamix.";

fs.ensureDirSync(outputDir);

const processFile = (filePath, relativePath) => {
  const outputFilePath = path.join(outputDir, relativePath);

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
          .map((cls) => `${prefix}${cls}`)
          .join(" ");
        return `className="${prefixedClasses}"`;
      }
    );

    fs.outputFile(outputFilePath, updatedData, (err) => {
      if (err) {
        console.error(`Error writing ${outputFilePath}:`, err);
      } else {
        console.log(`Processed: ${filePath} → ${outputFilePath}`);
      }
    });
  });
};

const processDirectory = (dir, relativePath = "") => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const newRelativePath = path.join(relativePath, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error checking ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          processDirectory(filePath, newRelativePath);
        } else if (stats.isFile() && file.endsWith(".tsx")) {
          processFile(filePath, newRelativePath);
        }
      });
    });
  });
};

processDirectory(inputDir);
