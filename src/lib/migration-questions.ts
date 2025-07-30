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
  {
    id: 202,
    slug: 'translating-vba-macros-to-python',
    question: 'How to get started with translating Excel VBA Macros to Python in DSS?',
    answer: `### 1. Introduction/Overview
Replacing Excel VBA macros with Python scripts in Dataiku allows for more robust, scalable, and maintainable automation. The goal is to replicate the logic of the VBA macro using Python libraries like Pandas.

### 2. Prerequisites
- The VBA macro code.
- A Dataiku DSS project with the input Excel file uploaded as a dataset.

### 3. Step-by-Step Instructions
1.  **Understand the VBA Logic:** Read through the VBA code and document what it does step-by-step. For example: "It opens Sheet1, filters for rows where 'Region' is 'APAC', then copies the result to a new sheet called 'APAC_Report'."
2.  **Create a Python Recipe:** In your Dataiku Flow, with the Excel dataset as input, create a new **Python recipe**.
3.  **Load the Data:** Dataiku automatically provides starter code to load your Excel sheet into a Pandas DataFrame.
    \`\`\`python
    import dataiku
    import pandas as pd

    input_dataset = dataiku.Dataset("your_excel_dataset")
    df = input_dataset.get_dataframe()
    \`\`\`
4.  **Replicate the Logic with Pandas:** Translate the logic from step 1 into Pandas operations.
    \`\`\`python
    # Replicating the filter logic
    apac_df = df[df['Region'] == 'APAC']
    \`\`\`
5.  **Write the Output:** Create an output dataset in your Flow and write the resulting DataFrame to it.
    \`\`\`python
    output_dataset = dataiku.Dataset("APAC_Report")
    output_dataset.write_with_schema(apac_df)
    \`\`\`

### 4. Resources and Tools
- **Pandas Documentation:** [https://pandas.pydata.org/docs/](https://pandas.pydata.org/docs/)
- **The original VBA code** for reference.

### 5. Next Steps and Progression
- Learn more advanced Pandas functions for data manipulation to handle more complex VBA macros.

### 6. Common Challenges and Solutions
- **Challenge:** The VBA code interacts with the Excel UI (e.g., creating pop-up boxes).
- **Solution:** You cannot replicate UI interactions directly. Instead, focus on replicating the underlying data manipulation logic. Log messages or create datasets with validation rules to handle alerts.
- **Challenge:** My Python code is slow.
- **Solution:** Avoid loops where possible and use vectorized Pandas operations, which are much faster.`,
  },
];
