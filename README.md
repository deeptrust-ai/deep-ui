# DeepUI — README

This README explains how to build the library, consume the package locally or from a tarball, and run Storybook for local component development.

### Prerequisites

- Node.js (14+ recommended)
- bun
- Ensure peerDependencies (React, ReactDOM, etc.) required by the package are installed in the consuming project
  - ```
    "peerDependencies": {
      "react": "18",
      "react-dom": "18",
      "@phosphor-icons/react": "2",
      "frosted-ui": "0.0.1"
    },
    ```

### Common scripts:

- "build" — builds component library artifacts
- "storybook" — spins up local Storybook instance

## Quick setup

1. Clone and enter the repo:

```
git clone <repo-url>
cd <directoy-cloned-into>
```

2. Install dependencies:

```
bun install
```

Build the library

- Standard build (run the script defined in package.json):
  ```
  bun run build
  ```
- Verify output in `lib/` and that package.json `main`/`module`/`types` point to the built files.

## Consume the package locally

### Option A — pack (recommended for deterministic installs)

1. From the package root:

```
bun pack
```

This produces `<package-name>-<version>.tgz` (scoped names become a tarball named without the scope). 2. In the consumer project:

```
bun add /full/path/to/@deeptrust-deep-ui-1.2.3.tgz
```

3. Import as usual:

```js
import { Button } from '@deeptrust/deep-ui';
```

### Option B — bun link (fast local dev)

1. In DeepUI repo:

```
bun link
```

2. In the consumer project:

```
bun link @deeptrust/deep-ui
```

3. When testing changes, rebuild DeepUI (`bun run build`).

### Option C — local file reference (monorepo / workspaces)

- Use package.json dependency like:
  ```
  "dependencies": {
    "@deeptrust/deep-ui": "file:../your-DeepUI-directory"
  }
  ```
- Then run install in consumer project (`bun install`).

## Storybook (local development)

- Start Storybook (dev server):

  ```
  bun run storybook
  ```

  Default port: 6006 (open http://localhost:6006)

- Build Storybook (static output):
  ```
  bun run build:storybook
  ```
  Output in `storybook-static/`.
