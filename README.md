# localsearch-assessment

Technical assessment for full-stack role at localsearch.ch.

Demo: https://localsearch-assessment-1076707828621.europe-west6.run.app

## Getting started

1. Set up Node.js v24
2. Install dependencies with  `npm install`
3. Start the app with `npm run dev`

### npm commands

| Command                 | Description                                         |
|-------------------------|-----------------------------------------------------|
| `npm run dev`           | Run app in development environment.                 |
| `npm test`              | Run tests.                                          |
| `npm run test:coverage` | Run tests with coverage report to console and file. |
| `npm run lint`          | Lint JavaScript with ESLint.                        |
| `npm run lint:fix`      | Lint and fix JavaScript with ESLint.                |
| `npm run stylelint`     | Lint CSS with Stylelint.                            |
| `npm run stylelint:fix` | Fix and fix CSS with Stylelint.                     |
| `npm run typecheck`     | Check TypeScript code.                              |
| `npm run build`         | Build app for deployment.                           |
| `npm run clean`         | Removes build artifacts.                            |
| `npm start`             | Run app in deployment mode.                         |

### Project structure

| Directory           | Description                                            |
|---------------------|--------------------------------------------------------|
| `src/app`           | Next.js app router with layouts and pages.             |  
| `src/app/api`       | REST API endpoints.                                    |  
| `src/components`    | Presentational components with little logic.           |
| `src/containers`    | Container components with more logic or data fetching. |
| `src/lib`           | App-wide configuration, types, helpers, assets, etc.   |
| `src/lib/__tests__` | Global test configuration.                             |

## Linting

TypeScript is linted and autoformatted with ESLint and Prettier. CSS is linted
and autoformatted with Stylelint.

## Testing

Jest tests are collocated with the tested files. Global test configuration and
mocks reside in `src/lib/__tests__`. Test coverage can be reported to console
and written to file with `npm run test:coverage`.

## Deployment

On push, the GitHub Actions workflow `.github/workflows/deploy.yaml` is
triggerd, running QA, building the Docker image and deploying to GCP.
