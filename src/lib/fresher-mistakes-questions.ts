import type { Question } from './questions';

export const fresherMistakesQuestions: Question[] = [
  {
    id: 116,
    slug: 'processing-big-data-in-python',
    question: "Common Mistake: Processing huge datasets in a Python recipe and running out of memory.",
    answer: `### 1. The Mistake
A new user often treats Dataiku like their local machine. They have a 50 GB dataset in a database and their first reflex is to create a Python recipe, load the entire dataset into a Pandas DataFrame (\`df = dataset.get_dataframe()\`), and then try to filter or aggregate it. The Dataiku server's memory is quickly overwhelmed, and the recipe fails.

### 2. The Right Way (The "Dataiku Mindset")
**Push down the computation!** Do as much of the heavy lifting as possible in the database *before* the data ever reaches Python.
- **Wrong:** Load 50 GB into Python to filter for one year of data.
- **Right:** Use a **SQL recipe** first with a \`WHERE date_part('year', sale_date) = 2023\` clause. The output will be a much smaller dataset. *Then*, load this smaller, pre-filtered dataset into Python for more complex operations that SQL can't handle.
The golden rule is: **Filter and aggregate early in the Flow, as close to the source as possible.**`,
  },
  {
    id: 117,
    slug: 'ignoring-the-flow',
    question: 'Common Mistake: Doing everything in a single, massive notebook instead of using the Flow.',
    answer: `### 1. The Mistake
A user accustomed to working only in Jupyter will create a single notebook and try to do everything in it: load data, clean it, join it, train a model, and save the output. This creates a "black box" that is impossible for others to understand, debug, or reuse.

### 2. The Right Way
**Use the Flow to orchestrate and notebooks for specific tasks.**
- Break down the logic into modular steps in the Flow. Use a **Join recipe** for joins, a **Prepare recipe** for cleaning, etc.
- If you need custom Python, put only the relevant code for that specific step into a **Python recipe**.
- Notebooks should be used for **exploration and experimentation (the Lab)**, not for the final, production pipeline. The code and logic you develop in a notebook should be refactored into recipes in the Flow once it's finalized.`,
  },
  {
    id: 118,
    slug: 'hardcoding-paths-and-values',
    question: 'Common Mistake: Hardcoding file paths, dates, or other constants directly in recipes.',
    answer: `### 1. The Mistake
A recipe's code contains something like \`df['region'] == 'USA'\` or refers to a file path like \`'/home/dataiku/my_files/input.csv'\`. This makes the project brittle and hard to move between environments or update for a new month.

### 2. The Right Way
**Use Project Variables.**
- Go to **More Options (...) > Variables** and create a variable, e.g., \`analysis_region = 'USA'\` or \`current_month = '2023-01-01'\`.
- **In a visual recipe:** Refer to it as \`\${analysis_region}\`.
- **In a Python recipe:** Use \`dataiku.get_custom_variables().get('analysis_region')\`.
Now, to run the same project for a different region or month, you only need to change the variable in one place, not hunt through all your recipes.`,
  },
  {
    id: 119,
    slug: 'not-using-version-control',
    question: 'Common Mistake: Not saving changes or using Git, leading to lost work.',
    answer: `### 1. The Mistake
A user makes many changes to a recipe or notebook and then their browser crashes or they make a mistake and don't know how to undo it. They haven't saved their work or committed it to Git.

### 2. The Right Way
- **Save Frequently:** Dataiku automatically saves your work in the visual recipes, but for code recipes and notebooks, you need to hit **Ctrl+S** or the **Save** button regularly.
- **Use the History Tab:** Every time you save a recipe, it creates a new version in the **History** tab. You can easily view past versions and revert to them.
- **Use Git for Projects:** For serious projects, the administrator should link the project to a Git repository (like GitHub or GitLab). This allows you to **commit** your changes with meaningful messages. This is the ultimate safety net, allowing you to track all changes and roll back the entire project if needed.`,
  },
  {
    id: 120,
    slug: 'misunderstanding-builds',
    question: 'Common Mistake: Not understanding what "building" a dataset means and running recipes unnecessarily.',
    answer: `### 1. The Mistake
A user opens a recipe, changes a step, and clicks **Run**. They then open the next recipe in the Flow and click **Run** again. This is inefficient.

### 2. The Right Way
**Think in terms of building a target, not running a recipe.**
- The **Flow** represents the desired state of your data. The datasets are the "nouns" and the recipes are the "verbs."
- To update your pipeline, you don't need to run each recipe individually. Go to the final dataset you want to create, and click the **Build** button in the **Actions** panel.
- Dataiku will automatically determine the dependency graph and run all the necessary upstream recipes in the correct order to produce that final output. You can also build multiple items at once from the **Flow Actions** menu.`,
  },
  {
    id: 121,
    slug: 'using-the-wrong-join-type',
    question: 'Common Mistake: Using the wrong join type and getting unexpected row counts.',
    answer: `### 1. The Mistake
A user wants to enrich their customer dataset with transaction data. They use an **Inner Join** in the Join recipe. The output dataset is much smaller than they expected. This is because the inner join dropped all customers who didn't have any transactions.

### 2. The Right Way
**Understand the join types and always check the preview.**
- **Left Join:** Keep everything from the left dataset, and bring in matching information from the right. This is the most common type for enrichment. (This is what the user should have used).
- **Inner Join:** Only keep rows that have a match in *both* datasets.
- **Outer Join:** Keep all rows from both datasets, whether they have a match or not.
The Join recipe in Dataiku provides a fantastic visual summary of how many rows will be kept, dropped, or matched. **Always inspect this summary before running the join.**`,
  },
  {
    id: 122,
    slug: 'ignoring-data-quality-warnings',
    question: 'Common Mistake: Ignoring the data quality indicators on columns.',
    answer: `### 1. The Mistake
When exploring a dataset, a user sees that a column has a quality bar that is mostly red ("Invalid") or orange ("Empty"), but they proceed to use it in their analysis anyway. This leads to incorrect results or errors downstream.

### 2. The Right Way
**Investigate data quality issues immediately.**
- The quality bar is your first line of defense. If a column has many invalid values, click on it. Dataiku will show you why they are invalid based on the column's **Meaning**.
- For a date column, "invalid" might mean the format is wrong ('DD-MM-YYYY' instead of 'YYYY-MM-DD'). For a number column, it might contain text.
- Use a **Prepare recipe** to fix these issues (e.g., using the "Parse date" or "Find and replace" processors) *before* you start your main analysis.`,
  },
  {
    id: 123,
    slug: 'rebuilding-the-entire-flow-every-time',
    question: 'Common Mistake: Rebuilding the entire Flow every time, even for a small change.',
    answer: `### 1. The Mistake
A user has a large, partitioned dataset (e.g., with daily data going back 5 years). They get a new day's worth of data and they run a "Full build" on the final output. Dataiku then spends hours reprocessing all 5 years of data.

### 2. The Right Way
**Leverage partitioning and incremental builds.**
- Design your Flow with partitioned datasets, especially for time-series data.
- When you need to update the Flow, don't use a "Full build." Instead, select a **Recursive build** and choose an **incremental** build mode.
- This tells Dataiku to only process the new partitions (e.g., only today's data) and propagate them through the Flow. This is vastly more efficient for production pipelines.`,
  },
  {
    id: 124,
    slug: 'using-filesystem-for-everything',
    question: 'Common Mistake: Storing all datasets on the default filesystem connection.',
    answer: `### 1. The Mistake
A user imports all their data and saves all their recipe outputs to the default "filesystem" connection. As the data volume grows, performance degrades, and they are unable to use the power of SQL.

### 2. The Right Way
**Use the right storage for the right job.**
- **Filesystem:** Good for small files, uploads, or temporary data.
- **Database (PostgreSQL, Snowflake, etc.):** This should be the default for most structured data. It enables high-performance SQL recipes and is much more scalable.
- **Cloud Storage (S3, GCS, etc.):** Best for very large files, semi-structured data (like JSON or Parquet), or as a landing zone for raw data.
Work with your administrator to get access to database connections and use them as the output for your recipes whenever possible.`,
  },
  {
    id: 125,
    slug: 'not-documenting-work',
    question: 'Common Mistake: Not documenting the project, making it a "black box" for others.',
    answer: `### 1. The Mistake
A user builds a complex Flow but never adds any documentation. When a colleague (or their future self!) opens the project, they have no idea what the purpose of the project is, what the different datasets mean, or why certain recipes were built.

### 2. The Right Way
**Documentation is a core part of the development process.**
- **Use the Wiki:** Every Dataiku project has a built-in wiki. Create a homepage that describes the project's business goal, data sources, and key outputs.
- **Describe Datasets and Columns:** In the **Summary** tab of each important dataset, add a description of what it contains. You can also add descriptions for individual columns.
- **Label Recipes:** Give your recipes clear, explicit names (e.g., "Filter_for_active_users" instead of "Prepare_customers").
- **Comment Your Code:** In Python/SQL recipes, add comments to explain complex logic.
- **Use Flow Zones:** Group your Flow into labeled zones (e.g., "01 - Data Ingestion", "02 - Customer Cleaning") to explain the high-level stages of your pipeline.`,
  },
];
