import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const [yearString, dayString] = process.argv.slice(2);

const year = parseInt(yearString, 10);
const day = parseInt(dayString, 10);
if (isNaN(year) || isNaN(day)) {
  console.error(`Syntax: npm run new-day {year} {day}`);
  console.error(`e.g. npm run new-day 2023 3`);
  process.exit(5);
}

const templateDir = path.join(_dirname, "newDayTemplates");
const yearText = (year < 100 ? year + 2000 : year).toString();
const dayText = day.toString().padStart(2, "0");
const dayDir = path.join(_dirname, "..", "src", "days", yearText, dayText);
if (fs.existsSync(dayDir)) {
  console.log(`Day ${day} files already exist.`);
  process.exit(5);
}

fs.mkdirSync(dayDir, { recursive: true });

for (const fileName of fs.readdirSync(templateDir)) {
  const content = fs.readFileSync(path.join(templateDir, fileName), "utf8");
  const templatedContent = content
    .replaceAll("<YEAR>", yearText)
    .replaceAll("<DAY>", dayText);
  const outputFilename = path.join(
    dayDir,
    fileName
      .replace(/\.tpl$/, "")
      .replaceAll("<YEAR>", yearText)
      .replaceAll("<DAY>", dayText),
  );
  fs.writeFileSync(outputFilename, templatedContent, "utf8");
}
