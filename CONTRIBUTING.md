# Contribution Guide

Thank you for contributing to this project! To keep the repository organized, please follow the guidelines below for naming branches and commits.

---

## Branch Naming

Use the pattern:  
`<type>/<description-in-kebab-case>`

### Common types:

- **feat/**: for new features
- **fix/**: for bug fixes
- **chore/**: technical tasks, updates, and tweaks without changing application logic
- **test/**: creating or fixing tests
- **docs/**: documentation
- **ci/**: continuous integration and pipeline

### Examples:

- `feat/add-user-auth`
- `fix/login-token-refresh`
- `chore/update-dependencies`
- `test/add-unit-tests`
- `docs/update-readme`
- `ci/setup-github-actions`

---

## Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

`<type>[scope]: <message in imperative>`

### Main types:

- **feat**: a new feature
- **fix**: a bug fix
- **chore**: changes that do not affect the code (configs, scripts)
- **test**: adding or fixing tests
- **docs**: documentation changes
- **ci**: continuous integration changes

### Examples:

feat(auth): add JWT token verification
fix(user): fix email validation
chore: setup ESLint and Prettier
test(service): add unit tests for userService
ci: add GitHub Actions workflow

---

## Suggested Workflow

1. Create a branch with a clear name related to the task.  
    Example:  
   git checkout -b feat/add-eslint

2. Make small and organized commits, following the pattern.  
   Example:  
   git commit -m "chore: add ESLint configuration"
   git commit -m "chore: integrate ESLint with Husky for pre-commit"

3. Push and open a Pull Request for review.  
   git push origin feat/add-eslint

---

Thank you for helping keep the code quality high!
