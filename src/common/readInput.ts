import * as path from "path";
import * as fs from "fs";

export function readInput(yearText: string, dayText: string, filename = "input.txt") {
  const inputPath = path.join(__dirname, "..", "days", yearText, dayText, filename);

  return fs.readFileSync(inputPath, "utf8");
}
