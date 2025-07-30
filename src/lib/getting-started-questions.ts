import type { Question } from './questions';

export const gettingStartedQuestions: Question[] = [
  {
    id: 1,
    slug: 'what-is-dataiku-dss',
    question: 'What is Dataiku DSS?',
    answer: `### 1. Introduction/Overview
Dataiku Data Science Studio (DSS) is a collaborative data science platform that enables users to go from raw data to production-ready machine learning applications. It provides a unified environment for data preparation, analysis, modeling, and deployment, catering to a wide range of user profiles from data analysts to expert data scientists.

### 2. Key Features
- **Visual Flow:** A graphical interface to build data pipelines by chaining together datasets and recipes.
- **Visual Recipes:** Code-free tools for common data tasks like cleaning (Prepare), joining (Join), grouping (Group), and more.
- **Code Notebooks:** Support for Python, R, and SQL for custom coding.
- **Visual Machine Learning:** A guided framework to build, train, evaluate, and deploy ML models without writing code.
- **Collaboration:** Features like wikis, discussions, and shared projects facilitate teamwork.
- **Automation:** Scenarios to automate workflows and model retraining.`,
  },
  {
    id: 2,
    slug: 'create-a-new-project',
    question: 'How do I create a new project?',
    answer: `### 1. Introduction/Overview
A project is the main container for all your work in Dataiku DSS, including datasets, recipes, models, and notebooks.

### 2. Step-by-Step Instructions
1.  From the Dataiku DSS homepage, click the **+ NEW PROJECT** button in the top right.
2.  Choose a project template. For a standard project, select **Blank Project**.
3.  Give your project a meaningful **Project Name**. The **Project Key** will be automatically generated but can be changed.
4.  Click **CREATE**. You will be taken to the project's Flow.`,
  },
  {
    id: 3,
    slug: 'import-a-dataset',
    question: 'How do I import a dataset?',
    answer: `### 1. Introduction/Overview
Datasets are the starting point for any data workflow. You can import data from various sources like local files, databases, or cloud storage.

### 2. Step-by-Step Instructions (for a local file)
1.  Inside your project's Flow, click the **+ IMPORT YOUR FIRST DATASET** button or go to **+ DATASET > Upload your files**.
2.  Drag and drop your file (e.g., a CSV) into the designated area, or click to browse your computer.
3.  Dataiku will show a preview. You can adjust parsing options like separator and character encoding here.
4.  Click **CREATE**. The dataset will now appear as a blue square in your Flow.`,
  },
  {
    id: 4,
    slug: 'what-is-a-recipe',
    question: 'What is a recipe?',
    answer: `### 1. Introduction/Overview
A recipe in Dataiku is a set of actions that transforms one or more input datasets into one or more output datasets. Recipes can be visual (code-free) or code-based (Python, R, SQL).

### 2. Types of Recipes
- **Visual Recipes:**
    - **Prepare:** For data cleaning, filtering, and feature engineering.
    - **Join:** To combine two datasets based on a common key.
    - **Group:** To perform aggregations similar to SQL's \`GROUP BY\`.
    - **Stack:** To append datasets with the same schema.
- **Code Recipes:**
    - **Python:** For custom logic using the Pandas library.
    - **R:** For custom logic using R data frames.
    - **SQL:** To run SQL queries against database connections.`,
  },
  {
    id: 5,
    slug: 'using-the-prepare-recipe',
    question: 'How do I use the Prepare recipe?',
    answer: `### 1. Introduction/Overview
The Prepare recipe is the most common tool for data cleaning and feature engineering. It allows you to build a script of data transformation steps visually.

### 2. Step-by-Step Instructions
1.  In the Flow, select the dataset you want to clean.
2.  In the right-hand panel, under **Actions**, click **Prepare**.
3.  A default name for the output dataset will be suggested. Click **CREATE RECIPE**.
4.  You are now in the Prepare recipe interface. Click **+ ADD A NEW STEP**.
5.  A library of over 100 processors will appear. You can search for what you need, for example:
    - **Filter** to remove rows based on a condition.
    - **Find and Replace** to fix text values.
    - **Formula** to create a new column based on an expression.
    - **Remove rows where value is empty** to handle missing data.
6.  Configure your step and click **Run** to see the changes. The output dataset will be built.`,
  },
  {
    id: 6,
    slug: 'explore-a-dataset',
    question: 'How can I explore a dataset?',
    answer: `### 1. Introduction/Overview
Exploring a dataset is key to understanding its structure, quality, and content before you start transforming it.

### 2. Step-by-Step Instructions
1.  In the Flow, double-click on any dataset.
2.  This opens the dataset view. Use the tabs at the top:
    - **Explore:** See the raw data in a table format.
    - **Charts:** Quickly build visualizations like bar charts, scatter plots, and histograms to understand distributions and relationships.
    - **Statistics:** View summary statistics for each column (min, max, mean, count of empty values, etc.). This is excellent for a quick data quality assessment.`,
  },
  {
    id: 7,
    slug: 'joining-two-datasets',
    question: 'How do I join two datasets?',
    answer: `### 1. Introduction/Overview
The Join recipe allows you to combine two datasets based on one or more common keys, similar to a SQL join.

### 2. Step-by-Step Instructions
1.  In the Flow, select one of the datasets you want to join.
2.  In the right-hand panel, click **Join with...**.
3.  Select the second dataset you want to join with.
4.  In the Join recipe settings:
    - Select the **Join type** (Left, Inner, Outer, etc.).
    - Define the **join condition** by selecting the key column(s) from each dataset.
    - In the **Selected Columns** panel, choose which columns you want to keep in the output.
5.  Click **Run**. The new joined dataset will be created.`,
  },
  {
    id: 8,
    slug: 'what-is-the-flow',
    question: 'What is the Flow?',
    answer: `### 1. Introduction/Overview
The Flow is the central, visual representation of your project's data pipeline. It shows the lineage of your data, from raw input datasets (blue squares) through recipes (yellow circles) to final output datasets.

### 2. Key Concepts
- **Lineage:** You can trace how any dataset was created by following the lines and recipes back to its source.
- **Modularity:** The Flow encourages breaking down complex workflows into smaller, manageable steps.
- **Rebuilding:** You can rebuild parts of the Flow or the entire Flow, and Dataiku will intelligently determine the correct order of execution.
- **Flow Zones:** You can group items in the Flow into zones to keep large projects organized.`,
  },
  {
    id: 9,
    slug: 'running-a-python-recipe',
    question: 'How do I run a Python recipe?',
    answer: `### 1. Introduction/Overview
A Python recipe gives you the full power of Python and libraries like Pandas to perform custom data transformations that are not possible with visual recipes.

### 2. Step-by-Step Instructions
1.  In the Flow, select an input dataset.
2.  In the right-hand panel, click **Python recipe**.
3.  Create an output dataset by clicking **+ CREATE** and giving it a name.
4.  Click **CREATE RECIPE**.
5.  You will be presented with boilerplate code to read the input and write the output.
    \`\`\`python
    import dataiku
    import pandas as pd

    # Read recipe inputs
    input_dataset = dataiku.Dataset("your_input_name")
    df = input_dataset.get_dataframe()

    # Perform your custom transformations on the 'df' DataFrame here

    # Write recipe outputs
    output_dataset = dataiku.Dataset("your_output_name")
    output_dataset.write_with_schema(df)
    \`\`\`
6.  Add your Pandas code in the middle.
7.  Click **Run**.`,
  },
  {
    id: 10,
    slug: 'building-a-chart',
    question: 'How do I build a chart?',
    answer: `### 1. Introduction/Overview
Charts are essential for data exploration and for communicating insights to stakeholders. Dataiku has a powerful built-in charting engine.

### 2. Step-by-Step Instructions
1.  Double-click any dataset in the Flow to open it.
2.  Go to the **Charts** tab.
3.  On the left, you can select a chart type (e.g., Bar, Line, Scatter, Map).
4.  Drag and drop columns from the list on the left into the **X** and **Y** axis fields.
5.  Dataiku will automatically render the chart. You can further customize colors, labels, and aggregations.
6.  Once you are happy with your chart, you can click **Publish** to save it to a Dashboard.`,
  },
  {
    id: 11,
    slug: 'what-are-storage-connections',
    question: 'What are storage connections?',
    answer: `### 1. Introduction/Overview
A storage connection in Dataiku defines how a dataset's data is physically stored. The default is "filesystem" (stored on the Dataiku server's disk), but for production use, you typically want to use a database or cloud storage.

### 2. Why it matters
- **Performance:** Storing data in a database (like PostgreSQL or Snowflake) allows you to push down computations using SQL recipes, which is much faster than processing in-memory with Python.
- **Scalability:** Cloud storage (like Amazon S3 or Google Cloud Storage) can handle massive datasets that won't fit on the server's local disk.
- **Governance:** Centralizes data storage instead of having files scattered across projects.

### 3. How to change it
When creating a dataset or in a recipe's output settings, you can specify the connection where the data should be stored.`,
  },
  {
    id: 12,
    slug: 'using-project-variables',
    question: 'How do I use project variables?',
    answer: `### 1. Introduction/Overview
Project variables are a way to store parameters and constants that can be used throughout your project, such as file paths, thresholds, or API keys. This avoids hardcoding values in your recipes.

### 2. Step-by-Step Instructions
1.  From your project's top navigation bar, go to **More Options (...) > Variables**.
2.  Click **Edit**.
3.  Add a new variable by giving it a name (e.g., \`region_filter\`) and a value (e.g., \`APAC\`).
4.  Click **Save**.

### 3. How to use them
- **In a visual recipe (like Filter):** You can use the syntax \`\${variable_name}\`. For example, your filter condition could be \`Region == '\${region_filter}'\`.
- **In a Python recipe:**
    \`\`\`python
    import dataiku
    variables = dataiku.get_custom_variables()
    my_var = variables.get('region_filter')
    \`\`\``,
  },
  {
    id: 13,
    slug: 'what-is-a-scenario',
    question: 'What is a scenario?',
    answer: `### 1. Introduction/Overview
A scenario is used to automate your project's workflow. It defines a sequence of actions (like rebuilding a dataset) and a trigger that starts those actions (like running on a schedule).

### 2. Step-by-Step Instructions
1.  From your project's top navigation bar, go to the **Jobs** menu (the clock icon) and select **Scenarios**.
2.  Click **+ NEW SCENARIO**.
3.  Give it a name and click **CREATE**.
4.  In the **Steps** tab, add a step. A common step is **Build / Train**, where you select a dataset or model you want to rebuild.
5.  In the **Settings** tab, define a **Trigger**. A common trigger is a **Time-based trigger** (e.g., "run every day at 8 AM").
6.  Enable the trigger by toggling it on. The scenario will now run automatically.`,
  },
  {
    id: 14,
    slug: 'building-a-visual-ml-model',
    question: 'How do I build a machine learning model?',
    answer: `### 1. Introduction/Overview
Dataiku's Visual ML interface allows you to create, train, and evaluate machine learning models in a guided, code-free environment.

### 2. Step-by-Step Instructions
1.  In the Flow, select the prepared dataset you want to use for training.
2.  In the right-hand panel, click **Lab**.
3.  In the **Visual Analysis** screen, click **Prediction** (or Classification).
4.  Select the **Target variable**—the column you want to predict.
5.  Click **QUICK PROTOTYPE** for a fast, automated setup.
6.  You are now in the ML lab. In the **Design** tab, you can see the features, algorithms, and training plan.
7.  Click the **TRAIN** button. Dataiku will train several models and present the results.
8.  You can now analyze the model's performance (e.g., AUC, feature importance, confusion matrix).`,
  },
  {
    id: 15,
    slug: 'deploying-a-model',
    question: 'How do I deploy a model?',
    answer: `### 1. Introduction/Overview
Deploying a model makes it available for use outside the lab, either for batch scoring in the Flow or as a real-time API.

### 2. Step-by-Step Instructions
1.  In the Visual ML lab, open the results of a trained model.
2.  In the top right corner, click the **DEPLOY** button.
3.  A dialog will appear. Give the deployed model a name.
4.  Click **CREATE**.
5.  Go back to your Flow. You will now see a new green, diamond-shaped object. This is your deployed model, ready to be used by a **Score recipe**.`,
  },
  {
    id: 16,
    slug: 'what-are-flow-zones',
    question: 'What are Flow Zones?',
    answer: `### 1. Introduction/Overview
Flow Zones are a way to visually group items in your Flow to keep large, complex projects organized and understandable.

### 2. How to Use Them
1.  In the Flow, click the **Flow actions** button at the bottom right.
2.  Select **Create flow zone**.
3.  Give the zone a name (e.g., "01_Data_Ingestion") and optionally a color.
4.  You can now drag and drop datasets and recipes into this zone.
5.  You can collapse and expand zones to focus on specific parts of your pipeline.

### 3. Best Practices
A common practice is to create numbered zones that represent the stages of your project:
- 01_Data_Ingestion
- 02_Data_Preparation
- 03_Modeling
- 04_Reporting`,
  },
  {
    id: 17,
    slug: 'using-the-group-recipe',
    question: 'How do I use the Group recipe?',
    answer: `### 1. Introduction/Overview
The Group recipe is a visual tool for performing aggregations, similar to a \`GROUP BY\` clause in SQL. You can use it to calculate metrics like counts, sums, and averages for different categories.

### 2. Step-by-Step Instructions
1.  In the Flow, select the dataset you want to aggregate.
2.  In the right-hand panel, click **Group**.
3.  In the recipe settings:
    - In the **Group by** section, select the column(s) you want to use as keys for your grouping (e.g., \`Region\`).
    - In the **Aggregations** section, define the calculations you want to perform. For example:
        - Count of records.
        - Average of the \`Sales\` column.
        - Sum of the \`Revenue\` column.
4.  Click **Run**. The output dataset will contain one row for each group key with the calculated aggregations.`,
  },
  {
    id: 18,
    slug: 'what-is-data-lineage',
    question: 'What is data lineage?',
    answer: `### 1. Introduction/Overview
Data lineage is the ability to track the entire lifecycle of your data. In Dataiku, the Flow provides a perfect visual representation of lineage.

### 2. Why it matters
- **Traceability:** You can see exactly how any given dataset was created, what its inputs were, and what transformations were applied.
- **Impact Analysis:** Before changing a recipe, you can see all the downstream datasets and models that will be affected.
- **Debugging:** If you find an error in a final report, you can easily trace the problem back through the lineage to find the root cause.
- **Governance:** Lineage provides a clear audit trail for compliance and regulatory requirements.`,
  },
  {
    id: 19,
    slug: 'creating-a-dashboard',
    question: 'How do I create a dashboard?',
    answer: `### 1. Introduction/Overview
Dashboards are used to present insights, charts, and key metrics to business stakeholders in a single, shareable view.

### 2. Step-by-Step Instructions
1.  From your project's top navigation bar, go to the **Dashboards** menu (the grid icon).
2.  Click **+ NEW DASHBOARD**. Give it a name and click **CREATE**.
3.  You are now in the dashboard editor. In the **Tiles** tab on the right, you can add content:
    - **Charts:** Add charts you previously created on a dataset.
    - **Metrics:** Display key figures from a dataset.
    - **Text:** Add titles and commentary.
4.  Drag and drop tiles onto the canvas and resize them as needed.
5.  Click **Save**.`,
  },
  {
    id: 20,
    slug: 'sharing-your-work',
    question: 'How can I share my work?',
    answer: `### 1. Introduction/Overview
Dataiku is built for collaboration. There are several ways to share your work with colleagues.

### 2. Sharing Methods
- **Share a Dashboard:** Dashboards can be shared with other Dataiku users or exported as static files (PDF, PNG).
- **Export a Project:** You can export an entire project as a \`.zip\` file and send it to another user, who can then import it into their Dataiku instance.
- **Publish as a Web App:** You can create interactive web applications using technologies like Python (Dash, Streamlit) or R (Shiny) and publish them for business users to interact with.
- **Add Team Members:** You can invite other users to your project and assign them different permission levels (Reader, Writer, Admin).`,
  },
  {
    id: 21,
    slug: 'what-is-the-lab',
    question: 'What is the Lab?',
    answer: `### 1. Introduction/Overview
The **Lab** is Dataiku's environment for interactive data analysis and model creation. It's where you perform the "science" part of data science.

### 2. Key Components
- **Visual Analysis:** This is the entry point to the Lab. Here you can perform initial data exploration, create charts, and launch the Visual ML interface.
- **Notebooks:** The Lab is where you can create and run code notebooks (Jupyter notebooks for Python, or R notebooks). This is for iterative, exploratory coding.
- **Visual ML:** The guided interface for building, training, and evaluating machine learning models without writing code.

### 3. Lab vs. Flow
- **Lab:** For exploration, iteration, and experimentation.
- **Flow:** For automating and productionizing the repeatable steps you discovered in the Lab.`,
  },
  {
    id: 22,
    slug: 'difference-between-dataset-and-schema',
    question: 'What is the difference between a dataset and its schema?',
    answer: `### 1. Introduction/Overview
It's important to distinguish between the data itself and the metadata that describes it.

### 2. Definitions
- **Dataset (The Data):** This refers to the actual data content—the rows and columns of your table. In Dataiku, the data is physically stored in a location defined by its **storage connection** (e.g., as a file on disk or a table in a database).
- **Schema (The Metadata):** The schema is the "data about the data." It defines the structure. It includes:
    - **Column Names:** The names of each column (e.g., \`user_id\`, \`purchase_date\`).
    - **Storage Types:** The physical data type (e.g., \`string\`, \`bigint\`, \`double\`).
    - **Meanings:** A semantic type that Dataiku infers (e.g., \`Text\`, \`Integer\`, \`US State\`). This helps Dataiku provide better validation and processing steps.`,
  },
  {
    id: 23,
    slug: 'how-to-handle-missing-data',
    question: 'How do I handle missing data?',
    answer: `### 1. Introduction/Overview
Handling missing (or null) values is a critical step in data preparation. The **Prepare recipe** provides several easy ways to do this.

### 2. Common Techniques in the Prepare Recipe
1.  **Open a Prepare recipe** on your dataset.
2.  Select a column with missing values. The **Column meaning** bar will show the percentage of empty rows.
3.  Click the column dropdown to see quick actions, or click **+ ADD A NEW STEP** for more options.
    - **Remove rows where value is empty:** This deletes any row that is missing a value in the selected column. Use with caution as it can remove a lot of data.
    - **Fill empty cells with a fixed value:** Replace missing values with a constant, like 0 or "N/A".
    - **Fill empty cells with the mean/median/mode:** A common technique for numerical columns. This is called "imputation."
    - **Smart Date Imputer:** For date columns, you can fill with the most frequent date or a specific date.`,
  },
  {
    id: 24,
    slug: 'what-are-meanings-in-dss',
    question: 'What are "Meanings" in DSS?',
    answer: `### 1. Introduction/Overview
A **Meaning** in Dataiku is a semantic data type that Dataiku automatically infers or you can manually set. It goes beyond the basic storage type (like 'string' or 'int') to describe what the data *represents*.

### 2. Examples
- A column with string values like "New York", "California" might have a **Storage Type** of \`string\`, but Dataiku can infer its **Meaning** as \`US State\`.
- A column of numbers like 1, 2, 3... might have a **Storage Type** of \`int\`, but its **Meaning** is \`Integer\`.
- A string column with values like "http://..." will get the **Meaning** \`URL\`.

### 3. Why they are useful
- **Validation:** Dataiku uses meanings to automatically detect invalid entries (e.g., a value of "New Yorkk" in a \`US State\` column).
- **Smart Processors:** The Prepare recipe offers context-aware steps based on meanings. For example, for a \`URL\` column, it will suggest a processor to "Parse URL components". For a \`Date\` column, it will suggest a processor to "Extract date components" (like year or month).`,
  },
  {
    id: 25,
    slug: 'how-to-revert-changes',
    question: 'How can I revert changes in a project?',
    answer: `### 1. Introduction/Overview
Dataiku DSS has built-in version control for most project components, allowing you to easily see history and revert to previous versions.

### 2. How to Revert
- **For a Recipe:**
    1. Open the recipe you want to revert.
    2. Click the **History** tab in the top right.
    3. You will see a list of all saved versions of the recipe's code or steps.
    4. Click on a previous version to view it, and then click **Revert to this version** if you want to restore it.
- **For the entire Project (if Git is configured):**
    1. If your project is connected to a remote Git repository, you have full version control.
    2. From the project's top navigation bar, you will see a Git menu.
    3. Here you can view commit history, commit your changes, and use Git features to revert the entire project to a previous commit. This is a more advanced feature, typically set up by an administrator.`,
  },
];
