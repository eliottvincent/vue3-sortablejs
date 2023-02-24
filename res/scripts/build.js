const fs = require("fs");
const spawn = require("child_process").spawn;

async function run() {
  await Promise.all([build(), copy()]);
}

async function build() {
  await spawn("rollup", ["-c", "rollup.config.js"], { stdio: "inherit" });
}

async function copy() {
  await fs.promises.copyFile("src/index.mjs", "dist/vue3-sortablejs.mjs");
}

run();
