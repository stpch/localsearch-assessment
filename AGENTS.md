# Guidelines for agents

## Coding conventions

* **Accessibility attributes:** Do not add `aria-*` or `role` attributes to
  elements.
* **Blank lines:** Add an empty line before and after any multi-line statement
  or block (`if`, `for`, `while`, multi-line function calls, etc.), and between
  variable declaration blocks and other code. The same rule applies to `return`:
  add a blank line before it unless the block contains exactly two single-line
  statements (the one before `return` and the `return` itself).
* **Braces:** Always wrap the body of `if`, `else`, `for`, `while`, and similar
  constructs in curly braces, even when the body is a single statement.
* **Comments:**
  * Line comments (`//`) should start capitalized. After prefixes like `TODO:` the
    text should also be capitalized. Code references (e.g. variable or property
    names) should always keep their original casing. Short comments should not
    have punctuation. Longer comments (multiple parts or sentences) should use
    correct punctuation.
  * Never use backticks in comments. If something genuinely needs to be quoted
    or highlighted, use double quotes — but prefer leaving identifiers and
    package names unquoted, since they're usually clear from context.
  * Block comments (`/** ... */`) should always use full sentences with correct
    punctuation.
* **Components:** Type all components using React's `FC`: use `FC` for
  components without props and `FC<Props>` for components that accept props.
* **Error variables:** Name caught errors `error`, not `e` or `err`.
* **Event handlers:** Name a function after the event it responds to, prefixed
  with `on` (e.g. `onResize`, `onMouseDown`, `onClick`), only when the event is
  its sole caller. If the function is also invoked directly anywhere, name it
  after what it does instead (e.g. `updatePosition`).
* **Exports:** Always default-export components. Use named exports for anything
  else a file exports alongside the component (types, hooks, utilities, etc.).
  Ensure `index.ts` files exist for cleaner imports
  (e.g., `export { default } from './componentName'`).
* **Functions:** Prefer arrow functions unless `this` binding is required.
* **Long className strings:** If a `className` value would push the line past
  the project's line-length limit, pass it through the `classNames` utility
  and split the classes into multiple string arguments (grouped logically,
  e.g. by concern) instead of leaving one long inline string.
* **Naming:** Use camelCase for all variables and constants. Do not use
  SCREAMING_SNAKE_CASE.
* **Path aliases:** Use path aliases (e.g. `@/lib`) as defined in
  `tsconfig.json`.
* **Props:** Do not destructure props in the function signature. Access them as
  `props.X` to preserve namespacing. For a default value used once, apply it
  inline (`props.color ?? 'red'`); if used more than once, declare a local
  variable with the same name (`const color = props.color ?? 'red'`).
  Destructuring is only acceptable in the rare cases where it is otherwise
  impossible (e.g. computing a rest spread).
* **Returning undefined:** Use bare `return` instead of `return undefined` where
  possible.
* **Styling:** Default to Tailwind utility classes. Only use CSS modules
  (`*.module.css`) when they result in less code or duplication, or when
  something isn't otherwise achievable with Tailwind.
  * In CSS modules, name the class for the component's root element `.root`
    where applicable.
  * Declare classes at the top level of the stylesheet rather than nesting
    them inside one another. Nesting is only for rules that target a class in
    relation to its parent, such as `:hover`, `:focus`, and other selectors
    scoped to that parent (e.g. `.root:hover`, `.root .icon`).
* **Type safety:** Strict TypeScript mode is enabled. Avoid `any`. Only specify
  return types explicitly when TypeScript cannot infer them.

## Shell commands

Always use the Bash tool first for shell commands. Only if a command does not
work with Bash should you fall back to something else (e.g. the PowerShell /
system shell).

## Quality assurance

After **any** changes to the code, you **MUST** run the following commands to
ensure quality and consistency:

1. **Lint & fix:** `npm run lint:fix`
2. **Stylelint & fix:** `npm run stylelint:fix`
3. **Typecheck:** `npm run typecheck`
4. **Test (if available):** `npm test`

Verify changes exclusively through these commands. Never start the dev server
or otherwise run the app to check a change, even for UI work.
