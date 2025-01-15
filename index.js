import fileManager from "./fileManager.js";
import readlineSync from "readline-sync";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
//new code

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const baseDir = path.join(__dirname, "files");
  while (true) {
    console.log("\nMenu");
    console.log("1. Create a new file");
    console.log("2. List files");
    console.log("3. Read a file");
    console.log("4. Update a file");
    console.log("5. Delete a file");
    console.log("6. Exit");

    const option = readlineSync.question("Choose an option: ");
    try {
      switch (option) {
        case "1":
          const fileName = readlineSync.question("Whats file name?\n");
          const fileContent = readlineSync.question("Whats file content?\n");
          const createFilePath = path.join(baseDir, fileName);
          const fileMessage = await fileManager.createFile(
            createFilePath,
            fileContent
          );
          console.log(fileMessage);
          break;
        case "2":
          const files = await fileManager.listFiles(baseDir);
          console.log(`Files in directory '${files}'`);
          break;
        case "3":
          const readFileName = readlineSync.question(
            "file name: "
          );
          const readFilePath = path.join(baseDir, readFileName);
          const content = await fileManager.readFile(readFilePath);
          console.log("Content of file:", content);
          break;
        case "4":
          const writeFileName = readlineSync.question(
            "file name: "
          );
          const writeFilePath = path.join(baseDir, writeFileName);
          const newContent = readlineSync.question(
            "Whats file content? ");
          const messageWrite = await fileManager.writeFile(writeFilePath, newContent);
          console.log(messageWrite);
          break;
        case "5":
          const deleteFileName = readlineSync.question(
            "file name: "
          );
          const deleteFilePath = path.join(baseDir, deleteFileName);
          const messageDelete = await fileManager.deleteFile(deleteFilePath);
          console.log(messageDelete);
          break;
        case "6":
          console.log("Exiting...");
          return;
      }
    } catch (err) {
        console.log(err);
    }
  }
}
main();
