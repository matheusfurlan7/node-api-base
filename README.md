# 🧱 Node API Base

[![Tests](https://img.shields.io/github/actions/workflow/status/matheusfurlan7/node-api-base/tests.yml?label=tests)](https://github.com/matheusfurlan7/node-api-base/actions)
[![License](https://img.shields.io/github/license/matheusfurlan7/node-api-base)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/matheusfurlan7/node-api-base)](https://github.com/matheusfurlan7/node-api-base/issues)
 
API base created with **Node.js**, **TypeScript**, and **Fastify**, ready to be used in new projects with best practices for structure, testing, linting, and formatting.

---

## 🚀 Technologies & Tools

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Vitest](https://vitest.dev/) (testes)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged)
- [tsc-alias](https://github.com/justkey007/tsc-alias)
- Path aliases with `tsconfig-paths`

---

## 📦 Installation

```bash
git clone https://github.com/matheusfurlan7/node-api-base.git
cd node-api-base
npm install
```

## 🧪 Available Scripts

```bash
npm run dev             # Starts the server in development mode with nodemon
npm run build           # Compiles the TypeScript project and applies the aliases
npm start               # Runs the compiled code in dist/
npm test                # Runs unit tests with Vitest
npm run test:watch      # Runs tests in watch mode (auto-update)
npm run test:coverage   # Generates a test coverage report
npm run lint            # Analyzes the code with ESLint
npm run format          # Formats files with Prettier
npm run prepare         # Executes initial Husky setup (pre-commit hooks)
```

## 👨‍💻 Author

Made with 💻 by [Matheus Furlan](https://github.com/matheusfurlan7)

- 🌐 [LinkedIn](https://www.linkedin.com/in/matheusfurlan7)
- 📫 Email: [matheusfurlan7@gmail.com](mailto:matheusfurlan7@gmail.com)