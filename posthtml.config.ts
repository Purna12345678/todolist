import * as fs from "fs-extra";
import * as path from "path";

const inputDir = "src";
const prefix = "opteamix-";

const processFile = (filePath: string): void => {
  fs.readFile(filePath, "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      console.error(`Error reading ${filePath}:`, err);
      return;
    }

    const updatedData = data.replace(
      /className="([^"]+)"/g,
      (match: string, classList: string) => {
        const prefixedClasses = classList
          .split(" ")
          .map((cls: string) => (cls.startsWith(prefix) ? cls : `${prefix}${cls}`))
          .join(" ");
        return `className="${prefixedClasses}"`;
      }
    );

    fs.writeFile(filePath, updatedData, (writeErr: NodeJS.ErrnoException | null) => {
      if (writeErr) {
        console.error(`Error writing ${filePath}:`, writeErr);
      } else {
        console.log(`Updated: ${filePath}`);
      }
    });
  });
};

const processDirectory = (dir: string): void => {
  fs.readdir(dir, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file: string) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (statErr: NodeJS.ErrnoException | null, stats: fs.Stats) => {
        if (statErr) {
          console.error(`Error checking ${filePath}:`, statErr);
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
