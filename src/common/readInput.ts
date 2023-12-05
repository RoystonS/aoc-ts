import * as path from "path";
import * as fs from "fs";

export function readInput(yearText: string, dayText: string) {
  const inputPath = path.join(__dirname, "..", "days", yearText, dayText, "input.txt");

  return fs.readFileSync(inputPath, "utf8");
}
