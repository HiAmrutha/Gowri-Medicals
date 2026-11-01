import { access, cp, mkdir, readFile, rm, stat } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectDirectory = dirname(fileURLToPath(import.meta.url));
const outputDirectory = join(projectDirectory, "dist");
const requiredFiles = ["index.html", "styles.css", "app.js"];

async function assertFileExists(filePath, description) {
  try {
    const file = await stat(filePath);
    if (!file.isFile()) throw new Error();
  } catch {
    throw new Error(`Missing ${description}: ${relative(projectDirectory, filePath)}`);
  }
}

async function assertDirectoryExists(directoryPath, description) {
  try {
    const directory = await stat(directoryPath);
    if (!directory.isDirectory()) throw new Error();
  } catch {
    throw new Error(`Missing ${description}: ${relative(projectDirectory, directoryPath)}`);
  }
}

async function validateLocalReferences(html, css) {
  const references = [];
  const htmlReferencePattern = /(?:href|src)=["']([^"']+)["']/gi;
  const cssReferencePattern = /url\(\s*(['"]?)(.*?)\1\s*\)/gi;

  for (const match of html.matchAll(htmlReferencePattern)) {
    references.push(match[1]);
  }
  for (const match of css.matchAll(cssReferencePattern)) {
    references.push(match[2]);
  }

  for (const reference of references) {
    if (!reference || reference.startsWith("#") || reference.startsWith("//") ||
        /^[a-z][a-z\d+.-]*:/i.test(reference) || reference.startsWith("data:")) {
      continue;
    }

    const localPath = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
    const absolutePath = resolve(projectDirectory, localPath);
    const relativePath = relative(projectDirectory, absolutePath);
    if (relativePath === ".." || relativePath.startsWith(`..${sep}`) || relativePath.startsWith(sep)) {
      throw new Error(`Asset reference points outside the project: ${reference}`);
    }
    await access(absolutePath).catch(() => {
      throw new Error(`Missing local asset referenced by the site: ${reference}`);
    });
  }
}

for (const file of requiredFiles) {
  await assertFileExists(join(projectDirectory, file), "required site file");
}
await assertDirectoryExists(join(projectDirectory, "images"), "images directory");

const html = await readFile(join(projectDirectory, "index.html"), "utf8");
const css = await readFile(join(projectDirectory, "styles.css"), "utf8");
await validateLocalReferences(html, css);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
for (const file of requiredFiles) {
  await cp(join(projectDirectory, file), join(outputDirectory, file));
}
await cp(join(projectDirectory, "images"), join(outputDirectory, "images"), { recursive: true });

for (const file of requiredFiles) {
  await assertFileExists(join(outputDirectory, file), "generated site file");
}
await validateLocalReferences(
  await readFile(join(outputDirectory, "index.html"), "utf8"),
  await readFile(join(outputDirectory, "styles.css"), "utf8")
);

console.log(`Production site built successfully: ${outputDirectory}`);
