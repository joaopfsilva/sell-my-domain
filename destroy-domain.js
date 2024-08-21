const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");
const { execSync } = require("child_process");

// Prompt the user for domain name and email
const domainName = readline.question("Please enter the full domain name: ");

// Destroy fly.io app
console.log("Destroying Fly.io app...");
try {
  execSync(`fly apps destroy ${domainName} --yes`, { stdio: "inherit" });
} catch (error) {
  console.error("An error occurred during the process:", error);
}
// Delete github repo
console.log(
  "This requires higher permissions. Feel free to also skip this step if you want"
);
console.log(`Deleting GitHub repository ${domainName}...`);
try {
  execSync(`gh auth refresh -h github.com -s delete_repo`, {
    stdio: "inherit",
  });
  execSync(`gh repo delete ${domainName} --yes`, { stdio: "inherit" });
} catch (error) {
  console.error("An error occurred during the process:", error);
}

// Delete output directory
console.log(`Deleting output directory output/${domainName}...`);
try {
  fs.rmdirSync(path.join(__dirname, "output", domainName), {
    recursive: true,
  });
} catch (error) {
  console.error("An error occurred during the process:", error);
}
