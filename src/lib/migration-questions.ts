import type { Question } from './questions';

export const migrationQuestions: Question[] = [
  {
    id: 201,
    slug: 'migrating-alteryx-workflows-to-dss',
    question: 'How to get started with migrating Alteryx workflows to Dataiku DSS?',
    answer: `### 1. Introduction/Overview
Migrating from Alteryx to Dataiku is a common task focused on centralizing data workflows and leveraging Dataiku's collaborative and scalable environment. The key is to map Alteryx tools to their Dataiku equivalents, which are often visual processors in a **Prepare** recipe.

### 2. Prerequisites
- Access to both the Alteryx workflow and a Dataiku DSS instance.
- Understanding of the logic in the Alteryx workflow.

### 3. Step-by-Step Instructions
1.  **Create a Prepare Recipe:** In your Dataiku Flow, select your input dataset and create a new **Prepare** recipe.
2.  **Map Alteryx Tools to Processors:** Go through your Alteryx workflow tool by tool and add the equivalent processor step in your Prepare recipe.
    *   **Alteryx \`Filter\` Tool:** Use the **Filter** processor in Dataiku. You can write a similar expression to keep or remove rows.
    *   **Alteryx \`Formula\` Tool:** Use the **Formula** processor. The expression language is very similar to Alteryx's.
    *   **Alteryx \`Select\` Tool:** You can reorder, rename, or remove columns by simply clicking the column dropdown in the Prepare recipe and selecting the action.
    *   **Alteryx \`Data Cleansing\` Tool:** This single tool maps to several Dataiku processors. "Remove Nulls" maps to **Clear rows where value is empty**. "Modify Case" maps to **Convert to uppercase/lowercase**. "Remove Punctuation" maps to a **Find and Replace** processor with a regular expression.
3.  **Run and Validate:** Run the Prepare recipe and compare the output with the output of your Alteryx workflow to ensure the logic is identical.

### 4. Resources and Tools
- **Dataiku Prepare Recipe Documentation:** [https://doc.dataiku.com/latest/preparation/index.html](https://doc.dataiku.com/latest/preparation/index.html)
- **A side-by-side comparison** of the Alteryx workflow and the Dataiku Flow.

### 5. Next Steps and Progression
- Once you are comfortable with the Prepare recipe, explore other visual recipes like the **Join**, **Group**, and **Window** recipes to handle more complex Alteryx tools.

### 6. Common Challenges and Solutions
- **Challenge:** I can't find a direct equivalent for an Alteryx tool.
- **Solution:** The logic might be achievable by combining a few Dataiku processors. If the logic is very complex, consider using a **Python recipe** as a fallback.
- **Challenge:** The migration is slow.
- **Solution:** Focus on migrating one logical branch of your Alteryx workflow at a time. Don't try to do it all in one go.`,
  },
];
