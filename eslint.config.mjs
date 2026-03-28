import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const core = require("eslint-config-next/core-web-vitals");
const typescript = require("eslint-config-next/typescript");

const eslintConfig = [...core, ...typescript];

export default eslintConfig;
