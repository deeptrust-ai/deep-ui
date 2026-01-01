# DeepUI — README

This README explains how to build the component library, scaffold new components, validate a developer release, and consume the package locally or from a tarball.

---

## Prerequisites

- Node.js 18+ (React 19 requires modern runtimes)
- pnpm
- Peer dependencies that must exist in any consuming project:

  ```json
  {
    "peerDependencies": {
      "react": "19.2.0",
      "react-dom": "19.2.0",
      "@phosphor-icons/react": "2.1.10",
      "frosted-ui": "0.0.1-canary.85"
    }
  }
  ```

## Common scripts

| Script                           | Description                                                         |
| -------------------------------- | ------------------------------------------------------------------- |
| `pnpm run build`                 | Builds library artifacts to `dist/` (runs during `prepublishOnly`). |
| `pnpm run storybook`             | Starts Storybook locally on port 6006.                              |
| `pnpm run build-storybook`       | Emits the static Storybook build to `storybook-static/`.            |
| `pnpm run generate`              | Plop generator that scaffolds new components.                       |
| `pnpm run lint` / `pnpm run tsc` | Type-checks & lints the source before release.                      |

---

## Developer release workflow

Use this checklist whenever you cut a `0.0.x-dev` build or validate changes before promotion to a stable release.

1. **Install dependencies**

```bash
pnpm install
```

2. **Preflight quality gates (optional but recommended)**

```bash
pnpm run lint
pnpm run tsc
```

3. **Build the distributable**

```bash
pnpm run build
```

4. **Create the tarball**

   ```bash
   mkdir -p .npm-cache
   npm_config_cache=./.npm-cache npm pack
   ```

   > _Why the custom cache?_ Some dev machines (including macOS with Brew-installed Node) keep a root-owned cache under `~/.npm`. Pointing `npm_config_cache` inside the repo avoids permission errors while still producing `deeptrust-deep-ui-<version>.tgz`.

---

## Release workflow

DeepUI releases are handled by a GitHub Actions workflow plus a documented local fallback. Both flows expect the version in `package.json` to be final before release (use `npm version patch`, `npm version prerelease --preid rc`, etc., so the git tag and version stay in sync).

### Automated release (preferred)

1. Commit the version bump and associated release notes.
2. Create a git tag that matches `v*` (for example `git tag v1.2.3`).
3. Push the branch _and_ the tag (`git push origin main --tags`).
4. The `Publish Package` workflow (`.github/workflows/publish.yml`) runs automatically:

- Sets up Node 20 and pnpm.
- Installs dependencies, lints, type-checks, and builds the library.
- Creates a GitHub release for tag-based runs.
- Builds a `.tgz` and moves it into `builds/` in the job workspace.

5. Monitor the run in GitHub Actions. The tarball lives in `builds/` during the run and is uploaded as an artifact (`deepui-tarball`) for easy download.

### Manual release (fallback)

Use this when CI is unavailable.

```bash
rm -rf dist node_modules
pnpm install
pnpm run lint:library
pnpm run tsc:library
pnpm run build
mkdir -p builds
TARBALL=$(npm pack --silent | tail -n 1)
mv "$TARBALL" builds/
```

Afterwards, run the install smoke test below so consumers get a verified build.

---

## Validate install & usage from the tarball

Smoke-test the generated package in a throwaway project to ensure `@deeptrust-ai/deep-ui` installs cleanly and renders at least one component.

```bash
TMP_DIR=$(mktemp -d)
TARBALL=$(pwd)/deeptrust-deep-ui-0.0.1-dev.tgz   # adjust if you bump the version

pushd "$TMP_DIR"
npm init -y >/dev/null
npm install react@19.2.0 react-dom@19.2.0 \
  @phosphor-icons/react@2.1.10 frosted-ui@0.0.1-canary.85
npm install "$TARBALL"

cat <<'EOF' > smoke.mjs
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Avatar } from '@deeptrust-ai/deep-ui';

const html = renderToString(
  React.createElement(Avatar, {
    name: 'DeepTrust',
    email: 'hello@deeptrust.ai'
  })
);

console.log('Rendered Avatar markup bytes:', html.length);
EOF

node smoke.mjs
popd
rm -rf "$TMP_DIR"
```

The script simply ensures an import, render, and peer dependency resolution all succeed. Expand it as needed (e.g., render a table, check CSS availability) before tagging the release.

---

## Component scaffolding

1. Run the generator:

```bash
pnpm run generate
```

2. Choose the component layer (atom / molecule / compound) and provide the component name.
3. Opt in or out of optional files (types, CSS module, Storybook story) when prompted.

The generator creates files under `lib/<layer>/<Component>/` and adds the export to the matching `lib/<layer>/index.ts`. Regenerating is safe—existing files or exports are skipped.

---

## Quick setup (cloning the repo)

```bash
git clone <repo-url>
cd <directory>
pnpm install
```

Build artifacts live in `dist/`; verify `package.json` `main`/`types` point there after running `pnpm run build`.

---

## Consume the package locally

### Option A — Tarball (deterministic)

1. Run `npm pack` as shown above to produce `deeptrust-deep-ui-<version>.tgz`.
2. In the consumer project:

   ```bash
   npm install /absolute/path/to/deeptrust-deep-ui-<version>.tgz
   ```

3. Import components normally:

   ```tsx
   import { Avatar } from '@deeptrust-ai/deep-ui';
   ```

### Option B — `pnpm link` (fast local dev)

```bash
# In DeepUI
pnpm link --global

# In the consumer project
pnpm link @deeptrust-ai/deep-ui
```

Rebuild DeepUI (`pnpm run build`) before testing changes in the consumer app.

### Option C — Local file reference / monorepo

Add the dependency in the consumer `package.json`:

```json
"dependencies": {
  "@deeptrust-ai/deep-ui": "file:../path-to-deepui"
}
```

Then run the workspace install (`pnpm install`, `npm install`, etc.).

---

## Storybook (local component development)

- Dev server:

  ```bash
  pnpm run storybook
  ```

  Opens http://localhost:6006.

- Static build:

  ```bash
  pnpm run build-storybook
  ```

  Outputs to `storybook-static/`.
