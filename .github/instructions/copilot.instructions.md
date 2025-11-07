# Repository custom instructions for GitHub Copilot

## Tech + Constraints

- UI library: **FrostedUI** (Radix-based). Prefer using/extending existing FrostedUI components over net-new UI.
- Radix UI primitives & patterns for structure, state, and accessibility.
- **No Tailwind.** Styling is **CSS Modules** only (`*.module.css`), colocated with components.
- Framework: React + TypeScript in a custom component-library context.

## Styling rules (CSS Modules)

- File per component: `styles.module.css`. Import as `styles`.
- Class names: `componentName_element[--modifier]` or simple semantic names. Avoid global selectors and `:global` unless integrating 3rd-party.
- Use design tokens/vars already exposed by FrostedUI or your theme layer. No hard-coded colors, spacing, or shadows if tokens exist.
- Prefer composition (`composes:`) and small utilities inside the module over inline styles.
- Keep specificity low; avoid `!important`.

## FrostedUI / Radix usage

- Use FrostedUI components before rolling custom ones. If extending, keep Radix part structure and `data-state` contracts intact.
- Preserve keyboard nav and ARIA semantics from Radix. Ensure focus traps, escape keys, and roving tabindex where applicable.
- Follow Radix slotting patterns; forward refs with `React.forwardRef`.

## Accessibility

- Every interactive control has an accessible name.
- Meet color contrast; don’t bypass tokenized colors.
- Manage focus visibly; respect `aria-*` attributes required by Radix.
- Add `aria-live` where async status is shown.

## Testing & DX

- Include unit tests for logic and interaction; add visual/regression tests if your workflow supports them.
- Add/refresh Storybook stories for any new or changed component APIs/variants.
- Keep PRs small and focused; include migration notes when APIs change.

## What NOT to do

- Don’t introduce Tailwind classes or global CSS resets.
- Don’t fork Radix behavior (e.g., custom key handling) unless strictly necessary—document why.
- Don’t hard-code spacing/color/shadow values if tokens or FrostedUI props exist.

---

## PR Description Template (use this when drafting PR bodies)

**What changed**

- Brief summary; list affected components/files.

**Why**

- Link to issue/ticket and the UX/reqs this satisfies.

**How**

- Key decisions (especially around FrostedUI/Radix usage), alt options considered.

**UI/UX notes**

- Screenshots or story names; states & edge cases covered.

**A11y**

- Keyboard/focus behavior; ARIA roles/labels; contrast considerations.

**Testing**

- Unit/visual tests added/updated; manual steps to verify.

**Backward compatibility**

- Breaking changes, deprecations, migrations.

**Checklist**

- [ ] Uses FrostedUI or Radix primitives where appropriate
- [ ] CSS Modules only; tokens (no hard-coded values)
- [ ] A11y verified (names, roles, focus, keyboard)
- [ ] Stories updated
- [ ] Tests added/updated
- [ ] Docs/README updated if needed

---

## Code Review heuristics for Copilot

- Flag Tailwind classes or global CSS usage.
- Flag hard-coded design values where tokens exist.
- Suggest replacing ad-hoc elements with FrostedUI components.
- Verify Radix structure (`Trigger`, `Content`, `Portal`, etc.) and required props.
- Check `forwardRef`, prop typing, and stable keys.
- Call out missing a11y (labels, focus outline, keyboard traps).
