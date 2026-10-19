import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi", "src/integrations/supabase/previewAuthStorage.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    // These modules intentionally colocate reusable render helpers/variants with
    // their components. Fast Refresh is still safe for the app, but the generic
    // single-export heuristic cannot distinguish those public helper exports.
    files: [
      "src/components/ui/**/*.{ts,tsx}",
      "src/components/AbittiAnswerEditor.tsx",
      "src/components/AbittiAnswerEditorBase.tsx",
      "src/features/progress/ProgressTrajectoryChart.tsx",
    ],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    // These effects are intentionally keyed to lifecycle/domain events rather
    // than every referenced object. Adding React Query result/mutation objects,
    // draft preference objects, or mutable answer values to their dependency
    // arrays would re-run initialization effects, reset in-progress work, or
    // recreate imperative editors. Keep exhaustive-deps active everywhere else.
    files: [
      "src/app/StudyApp.tsx",
      "src/components/AbittiAnswerEditorBase.tsx",
      "src/components/ExamSimulationV5.tsx",
      "src/components/LearningOSV5Panels.tsx",
      "src/features/practice/PracticeView.tsx",
      "src/features/progress/ProgressTrajectoryChart.tsx",
      "src/features/progress/ReliableProgressTrajectoryChart.tsx",
      "src/features/session/GuidedRetrievalAnswerEditor.tsx",
      "src/features/session/SessionForm.tsx",
      "src/features/settings/SettingsView.tsx",
    ],
    rules: {
      "react-hooks/exhaustive-deps": "off",
    },
  },
);
