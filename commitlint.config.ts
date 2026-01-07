import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore"],
    ],
    "scope-enum": [
      2,
      "always",
      ["api", "web", "mobile", "worker", "infra", "deps", "docs", "root"],
    ],
    "scope-empty": [1, "never"],
    "subject-case": [2, "always", "lower-case"],
  },
};

export default config;
