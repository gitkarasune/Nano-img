# Contributing to IMvision

First off, thanks for taking the time to contribute! 🎉

IMvision is built by the community, for the community. We value your input, whether it's submitting a bug report, proposing a new feature, or submitting a pull request.

### 📜 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
- [Development Setup](#development-setup)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Styleguides](#styleguides)
  - [Git Commit Messages](#git-commit-messages)
  - [Code Style](#code-style)

### 🤝 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). We expect everyone to treat others with respect and dignity.

### 🚀 How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

- **Check if the bug has already been reported** by searching on GitHub under [Issues](https://github.com/gitkarasune/im-vision/issues).

- **Use the Bug Report template** if available, or include the following:
  - A clear and descriptive title.
  - Steps to reproduce the problem.
  - Expected behavior vs. actual behavior.
  - Screenshots or screen recordings (if applicable).
  - Your environment details (OS, Browser, Node.js version).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as much detail as possible.
- **Explain why this enhancement would be useful** to most IMvision users.

### Your First Code Contribution

Unsure where to begin? You can look through these issues:

- **[Good First Issue](https://github.com/gitkarasune/im-vision/labels/good%20first%20issue)**: issues which should only require a few lines of code, and a test or two.
- **[Help Wanted](https://github.com/gitkarasune/im-vision/labels/help%20wanted)**: issues which should be a bit more involved than beginner issues.

### 🛠️ Development Setup

To get your development environment running:

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/your-username/im-vision.git
    cd im-vision
    ```

3.  **Set the upstream remote**:
    ```bash
    git remote add upstream https://github.com/gitKarasune/im-vision.git
    cd im-vision
    ```
    
4.  **Install dependencies**:
    ```bash
    npm install
    ```
5.  **Configure Environment**:
    - Copy `env.example` to `.env`.
    - Fill in the required API keys (OpenRouter, Database, Auth).
6.  **Start the development server**:
    ```bash
    npm run dev
    ```

### 📥 Pull Request Guidelines

1.  **Fork the repo** and create your branch from `main`.
2.  **Branch Naming**:
    - `feature/my-new-feature`
    - `fix/my-bug-fix`
    - `docs/documentation-update`
3.  **Update Documentation**: If you've changed APIs, update the relevant documentation.
4.  **Verify**: Ensure the app builds and runs locally without errors.
5.  **Submit PR**: detailed description of your changes. Link any relevant issues.

### 🎨 Styleguides

### Git Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable messages that are easy to follow when looking through the project history.

- `feat:` for a new feature
- `fix:` for a bug fix
- `docs:` for documentation changes
- `style:` for formatting, missing semi colons, etc; no code change
- `refactor:` for refactoring production code
- `test:` for adding missing tests, refactoring tests

**Example:**
```
feat: add realistic shadows toggle to dashboard
```

### Code Style

- **Tailwind CSS**: Use utility classes over custom CSS where possible.
- **Components**: Functional components with hooks. Keep components small and focused.
- **Naming**: kebab-case for files (`my-component.tsx`).

---

**Thank you for your contributions!** 🙌
