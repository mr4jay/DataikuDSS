import type { Question } from './questions';

export const fresherMistakesQuestions: Question[] = [
  {
    id: 301,
    slug: 'push-to-git-without-commit-message',
    question: 'How to get started with pushing to Git without a clear commit message?',
    answer: `### 1. Introduction/Overview
A clear commit message is a fundamental part of version control. It explains the "why" behind a change. Pushing without one makes it difficult for you and your team to understand the history of a project.

### 2. Prerequisites
- Git installed on your local machine.
- A remote repository (like on GitHub) connected to your local project.

### 3. Step-by-Step Instructions
1.  **Make Your Changes:** Edit your code as needed.
2.  **Stage Your Changes:** Use the command \`git add .\` to stage all your changes.
3.  **Commit with a Clear Message:** This is the crucial step. Use the command \`git commit -m "Your descriptive message here"\`.
    *   **Good Example:** \`git commit -m "Feat: Add user authentication endpoint"\`
    *   **Bad Example:** \`git commit -m "changes"\`
4.  **Push to Remote:** Use \`git push\` to send your committed changes to the remote repository.

### 4. Resources and Tools
- **Git Documentation:** [https://git-scm.com/doc](https://git-scm.com/doc)
- **Conventional Commits:** A specification for adding human and machine readable meaning to commit messages. [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

### 5. Next Steps and Progression
- Practice writing commit messages that follow a convention (e.g., "Feat:", "Fix:", "Docs:"). This makes your commit history much easier to read.

### 6. Common Challenges and Solutions
- **Challenge:** I don't know what to write.
- **Solution:** Think about what you changed and why. For example: "Fix: Corrected a typo on the login page." or "Feat: Implemented password reset functionality."
- **Challenge:** I made a mistake in my commit message.
- **Solution:** You can amend your most recent commit message using \`git commit --amend -m "New message"\`.`,
  },
  {
    id: 302,
    slug: 'hardcoding-passwords-or-api-keys',
    question: 'How to get started with avoiding hardcoding passwords or API keys?',
    answer: `### 1. Introduction/Overview
Hardcoding sensitive information like passwords or API keys directly into your code is a major security risk. Anyone with access to the code can see them. The best practice is to store them securely and access them as variables.

### 2. Prerequisites
- A Dataiku DSS project.
- Access to Project Variables or a secure credential store (like HashiCorp Vault, AWS Secrets Manager, etc.).

### 3. Step-by-Step Instructions
1.  **Identify the Secret:** Find the hardcoded password or key in your code (e.g., a Python recipe).
2.  **Store it Securely:**
    *   **Using Project Variables (for less sensitive info):** Go to **Variables > edit**. Create a new variable, for example, \`my_api_key\`. Paste your key into the value field.
    *   **Using a Secrets Management Tool (recommended):** If your organization uses a tool like HashiCorp Vault, store the secret there according to your company's policy.
3.  **Access it in Your Code:**
    *   **From Project Variables:** In a Python recipe, use the \`dataiku\` library:
        \`\`\`python
        import dataiku
        
        client = dataiku.api_client()
        variables = client.get_project(dataiku.default_project_key()).get_variables()
        api_key = variables['standard']['my_api_key']
        \`\`\`
    *   **From a Secrets Tool:** Use the appropriate SDK or API call provided by your secrets management tool.

### 4. Resources and Tools
- **Dataiku Documentation on Project Variables:** [https://doc.dataiku.com/latest/user/flow/variables.html](https://doc.dataiku.com/latest/user/flow/variables.html)
- **HashiCorp Vault:** [https://www.vaultproject.io/](https://www.vaultproject.io/)

### 5. Next Steps and Progression
- Learn about different secret management backends and how they integrate with Dataiku.

### 6. Common Challenges and Solutions
- **Challenge:** Where should I store my secret?
- **Solution:** For production-level projects, always prefer a dedicated secrets management tool. For development or less critical projects, Project Variables can be acceptable if your organization's security policy allows it.`,
  },
  {
    id: 303,
    slug: 'not-using-project-libraries',
    question: 'How to get started with using project libraries for code?',
    answer: `### 1. Introduction/Overview
When you have helper functions or classes that you use in multiple recipes, you shouldn't copy and paste them. This leads to code duplication and makes maintenance difficult. Instead, you should use **Project Libraries**.

### 2. Prerequisites
- A Dataiku DSS project.
- Python code (e.g., helper functions) that you want to share across different recipes.

### 3. Step-by-Step Instructions
1.  **Navigate to Project Libraries:** In your Dataiku project, go to the **Code** menu (the **<>** icon) and select **Libraries**.
2.  **Create a Python File:** Click on **+ Add a new file**. Give it a descriptive name, like \`my_helpers.py\`.
3.  **Add Your Code:** Paste your reusable functions into this new file.
    \`\`\`python
    # In my_helpers.py
    def clean_text(text):
        return text.strip().lower()
    \`\`\`
4.  **Import in Your Recipe:** Now, in any Python recipe within the same project, you can import and use that function.
    \`\`\`python
    # In a Python recipe
    from my_helpers import clean_text
    
    # ... your recipe code
    cleaned_value = clean_text("  Some Text  ")
    \`\`\`

### 4. Resources and Tools
- **Dataiku Documentation on Project Libraries:** [https://doc.dataiku.com/latest/user/code/libraries.html](https://doc.dataiku.com/latest/user/code/libraries.html)

### 5. Next Steps and Progression
- Organize your project library into multiple files or even packages for better structure as your project grows.

### 6. Common Challenges and Solutions
- **Challenge:** My import isn't working (\`ModuleNotFoundError\`).
- **Solution:** Double-check that the file name in your Project Library and the import statement match exactly. Also, make sure you have re-run the recipe after saving the library file. If it still fails, you may need to go to the Kernel tab of your recipe and click "Restart Kernel".`,
  },
];
