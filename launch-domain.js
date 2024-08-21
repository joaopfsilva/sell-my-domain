const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");
const { execSync } = require("child_process");

// Prompt the user for domain name and email
const domainName = readline.question("Please enter the full domain name: ");
const emailAddress = readline.question("Please enter your contact email: ");

// Define paths
console.log("Creating directories...");
const templatesDir = path.join(__dirname, "templates");
const outputDir = path.join(__dirname, "output", domainName);

console.log(`Creating output files in output/${domainName}...`);
// Create the output directory for the project
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(path.join(outputDir, "public"), { recursive: true });
fs.mkdirSync(path.join(outputDir, "public", "images"), { recursive: true });

// Read and replace placeholders in public/index.html
let indexHtmlContent = fs.readFileSync(
  path.join(templatesDir, "public", "index.html"),
  "utf-8"
);
indexHtmlContent = indexHtmlContent
  .replace(/\${domain_name_here}/g, domainName)
  .replace(/\${email_address_here}/g, emailAddress);

// Write index.html to the output directory
fs.writeFileSync(
  path.join(outputDir, "public", "index.html"),
  indexHtmlContent
);

// Read and replace placeholders in Readme.md
let readmeMdContent = fs.readFileSync(
  path.join(templatesDir, "Readme.md"),
  "utf-8"
);
readmeMdContent = readmeMdContent
  .replace(/\${domain_name_here}/g, domainName)
  .replace(/\${email_address_here}/g, emailAddress);

// Write Readme.md to the output directory
fs.writeFileSync(path.join(outputDir, "Readme.md"), readmeMdContent);

// Read and replace placeholders in package.json
let packageJsonContent = fs.readFileSync(
  path.join(templatesDir, "package.json"),
  "utf-8"
);
packageJsonContent = packageJsonContent.replace(
  /\${domain_name_here}/g,
  domainName
);

// Write package.json to the output directory
fs.writeFileSync(path.join(outputDir, "package.json"), packageJsonContent);

// Read and replace placeholders in fly.toml
let flyIoConfiguration = fs.readFileSync(
  path.join(templatesDir, "fly.toml"),
  "utf-8"
);
flyIoConfiguration = flyIoConfiguration.replace(
  /\${domain_name_here}/g,
  domainName
);

// Write package.json to the output directory
fs.writeFileSync(path.join(outputDir, "fly.toml"), flyIoConfiguration);

// Copy 404.html, styles.css to the output directory
const filesToCopy = ["404.html", "styles.css"];
filesToCopy.forEach((file) => {
  fs.copyFileSync(
    path.join(templatesDir, "public", file),
    path.join(outputDir, "public", file)
  );
});

// Copy index.js to the output directory
fs.copyFileSync(
  path.join(templatesDir, "index.js"),
  path.join(outputDir, "index.js")
);

// Copy the .gitignore file
fs.copyFileSync(
  path.join(templatesDir, ".gitignore"),
  path.join(outputDir, ".gitignore")
);

// Copy the image.webp file
fs.copyFileSync(
  path.join(templatesDir, "public", "images", "image.webp"),
  path.join(outputDir, "public", "images", "image.webp")
);

console.log(
  `Express.js project has been generated successfully in ${outputDir}`
);

// Change to the output directory
process.chdir(outputDir);

// Initialize Git repository and create GitHub repo, add files, commit, and push
try {
  console.log("Initializing Git repository...");
  execSync("git init", { stdio: "inherit" });

  console.log(`Creating GitHub repository ${domainName}...`);
  execSync(`gh repo create ${domainName} --private --source=.`, {
    stdio: "inherit",
  });

  console.log("Adding files to the Git repository...");
  execSync("git add .", { stdio: "inherit" });

  console.log(
    `Committing files with message: "add files for ${domainName} webpage"...`
  );
  execSync(`git commit -m "add files for ${domainName} webpage"`, {
    stdio: "inherit",
  });

  console.log("Pushing files to GitHub...");
  execSync("git push origin main", { stdio: "inherit" });

  // Launch Fly.io app
  console.log("Launching Fly.io app...");
  execSync("flyctl launch --yes", { stdio: "inherit" });
} catch (error) {
  console.error("An error occurred during the process:", error);
}
