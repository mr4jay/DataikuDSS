import type { Question } from './questions';

export const migrationQuestions: Question[] = [
  {
    id: 101,
    slug: 'migrating-from-sas-spss',
    question: 'What are the key considerations when migrating from traditional tools like SAS or SPSS to Dataiku?',
    answer: `### 1. Introduction/Overview
Migrating from tools like SAS or SPSS involves both a technical and a mindset shift. Dataiku is a more centralized, collaborative, and end-to-end platform.

### 2. Key Considerations
- **Code Conversion:** SAS/SPSS proprietary languages need to be translated into an open-source equivalent, typically Python or R. This is often the biggest technical effort. You can leverage Python libraries like \`saspy\` or R's \`haven\` to help read existing data files.
- **Componentization:** SAS/SPSS workflows are often monolithic scripts. The Dataiku philosophy is to break these down into a modular Flow with distinct recipes for each logical step (e.g., a Join recipe, a Prepare recipe, a Python recipe). This improves readability and reusability.
- **Collaboration:** Dataiku is designed for teams. The migration is a good opportunity to establish new collaborative workflows, version control with Git, and documentation standards in the project wiki.
- **Focus on Automation:** Migrate not just the logic, but also think about how it will be automated, monitored, and deployed using Dataiku scenarios from day one.`,
  },
  {
    id: 102,
    slug: 'migrating-sql-code',
    question: 'I have a large amount of SQL code. How do I migrate it to Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku is excellent for managing SQL-based workflows. The goal is not to eliminate SQL, but to manage it more effectively.

### 2. Migration Strategy
1.  **Set up Connections:** First, ensure your databases are set up as Connections in Dataiku.
2.  **Use SQL Recipes:** For each major query or transformation step, create a SQL recipe in the Flow. Paste your existing SQL code into it.
3.  **Parameterize with Variables:** Replace hardcoded values in your SQL (like specific dates or regions) with Dataiku project variables (\`\${variable_name}\`). This makes the code reusable and configurable.
4.  **Visualize the Lineage:** By splitting a long SQL script into multiple sequential SQL recipes, you create a visual data lineage in the Flow. This makes the entire process much easier to understand and debug than a single, massive script.
5.  **Let Dataiku Handle DDL:** Instead of writing \`CREATE TABLE AS\` statements, let Dataiku manage the table creation. Just write the \`SELECT\` statement in the SQL recipe, and Dataiku will handle writing the output to the destination table based on the recipe's output settings.`,
  },
  {
    id: 103,
    slug: 'migrating-from-alteryx',
    question: 'How do I migrate an Alteryx workflow to Dataiku?',
    answer: `### 1. Introduction/Overview
Migrating from Alteryx to Dataiku is quite natural as both are visual, flow-based platforms. The key is to map Alteryx tools to their Dataiku equivalents.

### 2. Common Mappings
- **Input Data Tool:** Becomes a Dataiku dataset connected to a file or database.
- **Select Tool:** This logic is handled in the **Selected columns** panel of a recipe or by removing columns in a Prepare recipe.
- **Filter Tool:** Becomes a **Filter** processor in a Dataiku Prepare recipe.
- **Formula Tool:** Becomes a **Formula** processor in a Prepare recipe. The syntax is very similar.
- **Join Tool:** Becomes a Dataiku **Join** recipe.
- **Summarize Tool:** Becomes a Dataiku **Group** recipe.
- **Union Tool:** Becomes a Dataiku **Stack** recipe.

The general approach is to look at your Alteryx workflow and recreate it piece by piece in a Dataiku Flow, using the equivalent visual recipe for each tool.`,
  },
  {
    id: 104,
    slug: 'migrating-jupyter-notebooks',
    question: 'I have existing Jupyter notebooks. How can I bring them into Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku uses a standard Jupyter environment, making migration straightforward.

### 2. Steps
1.  **Create a Notebook:** In your Dataiku project, go to **Notebooks > New Notebook > Jupyter (Python)**.
2.  **Upload the Notebook:** In the notebook editor, use the **File > Open...** menu. This will open the Jupyter file browser. You can use the **Upload** button here to upload your existing \`.ipynb\` file.
3.  **Adapt Data I/O:** The main change you'll need to make is replacing your old data loading code (e.g., \`pd.read_csv('path/to/file.csv')\`) with the Dataiku API to read and write datasets from the Flow.
    \`\`\`python
    # Replace this:
    # df = pd.read_csv('my_data.csv')

    # With this:
    import dataiku
    my_dataset = dataiku.Dataset("name_of_dataset_in_flow")
    df = my_dataset.get_dataframe()
    \`\`\`
This integrates your notebook into the Dataiku ecosystem, allowing it to interact with the Flow.`,
  },
  {
    id: 105,
    slug: 'migrating-from-cloud-ai-platforms',
    question: 'How does migrating from a platform like SageMaker or Vertex AI to Dataiku work?',
    answer: `### 1. Introduction/Overview
Migrating from cloud-specific AI platforms to Dataiku is about moving from a code-centric, infrastructure-focused environment to a more integrated, user-friendly platform. Dataiku can orchestrate these cloud services, so you don't always have to "rip and replace."

### 2. Migration Strategies
- **Orchestration (Hybrid Approach):** You can keep your existing training code running on SageMaker/Vertex AI but use Dataiku to orchestrate it. Create a Python recipe in Dataiku that uses the cloud provider's API (e.g., \`boto3\` for AWS) to launch a training job. Dataiku becomes the control plane for data preparation, triggering the training, and retrieving the results, providing a user-friendly interface on top of the cloud service.
- **Full Migration:** Re-implement the model training process entirely within Dataiku's Visual ML or in a Python recipe/notebook. This gives you the full benefit of Dataiku's integrated environment, explainability tools, and governance features. This is often preferred for models that don't require highly specialized cloud hardware.`,
  },
  {
    id: 106,
    slug: 'handling-proprietary-data-formats',
    question: 'My old system uses a proprietary data format (e.g., SAS7BDAT). How can I read this in Dataiku?',
    answer: `### 1. Introduction/Overview
You can handle proprietary formats by using the appropriate libraries in a Python recipe.

### 2. Example for SAS files
1.  **Upload the Data:** Upload your \`.sas7bdat\` file into a managed folder in Dataiku.
2.  **Create a Python Recipe:** Create a Python recipe that takes the managed folder as an input.
3.  **Use a Library:** Use a library like \`pandas.read_sas\` or \`saspy\` to read the file into a DataFrame.
    \`\`\`python
    import dataiku
    import pandas as pd
    from dataiku import Folder

    # Get a handle on the managed folder
    folder = Folder("folder_id_containing_sas_file")
    
    # Get the path to the file
    file_path = folder.get_path() + '/your_file.sas7bdat'

    # Read with pandas
    df = pd.read_sas(file_path)

    # Write to an output dataset
    output_dataset = dataiku.Dataset("your_output_dataset_name")
    output_dataset.write_with_schema(df)
    \`\`\`
This recipe effectively converts the proprietary format into a standard Dataiku dataset.`,
  },
  {
    id: 107,
    slug: 'migrating-user-permissions',
    question: 'How do I migrate user roles and permissions from an old system to Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku has a robust, role-based security model. The key is to map your old roles to Dataiku's concepts of groups and permissions.

### 2. Mapping Process
1.  **Define Groups:** In **Administration > Security**, create groups that correspond to your existing user roles (e.g., "Marketing_Analysts", "Data_Scientists_Prod_Access").
2.  **Assign Users to Groups:** Add users to their respective groups. It's best practice to link Dataiku groups to your corporate directory (LDAP/Active Directory) for single sign-on (SSO).
3.  **Set Global Permissions:** Define what each group can do at a high level (e.g., create projects, use certain connections).
4.  **Set Project-Level Permissions:** On each project, you can then grant specific permissions to these groups (e.g., the "Marketing_Analysts" group has "Read" access to the finance project, while the "Data_Scientists" group has "Write" access).`,
  },
  {
    id: 108,
    slug: 'migrating-scheduled-jobs',
    question: 'My current system has hundreds of scheduled jobs. What is the best way to migrate them to Dataiku?',
    answer: `### 1. Introduction/Overview
This is a great use case for Dataiku's Scenarios. The goal is to migrate the job's logic into a Dataiku Flow and then use a scenario to manage its execution.

### 2. Migration Strategy
1.  **Re-implement the Logic:** For each job, build its data pipeline in a Dataiku Flow.
2.  **Create a Scenario:** Create a scenario for that Flow.
3.  **Add Steps:** Add a "Build" step to the scenario to run the final output datasets.
4.  **Set the Trigger:** In the scenario's **Settings**, create a **Time-based trigger** that matches the schedule of your old job.
5.  **Add Reporters:** Add a **Reporter** (e.g., for email alerts on failure) to replicate any notification system you had.
6.  **Decommission the Old Job:** Once you have tested the Dataiku scenario and are confident it's running reliably, you can turn off the old scheduled job.`,
  },
  {
    id: 109,
    slug: 'change-management-for-migration',
    question: 'What are the key change management challenges when migrating a team to Dataiku?',
    answer: `### 1. Introduction/Overview
Change management is as important as the technical migration.

### 2. Key Challenges & Solutions
- **Fear of Obsolescence:** Analysts who are experts in an old tool (like SAS) may fear their skills will become obsolete.
    - **Solution:** Frame Dataiku as a tool that **augments** their skills, not replaces them. Show them how they can now use their business knowledge to build and deploy models faster, and how Dataiku's support for Python/R allows them to learn new, valuable open-source skills.
- **Shift to Collaboration:** Users accustomed to working in silos on their local machines need to adapt to a centralized, collaborative platform.
    - **Solution:** Enforce standards for documentation (using the wiki), use of shared projects, and Git for version control. Highlight the benefits of reusability and not having to reinvent the wheel.
- **Training and Enablement:** Users will need formal training.
    - **Solution:** Leverage the Dataiku Academy for self-paced learning. Create internal "champions" who are early adopters and can mentor other users. Hold regular office hours and show-and-tell sessions.`,
  },
  {
    id: 110,
    slug: 'validating-a-migrated-pipeline',
    question: 'How do I validate that a migrated pipeline in Dataiku produces the exact same results as the old one?',
    answer: `### 1. Introduction/Overview
This is a critical testing step. You need a systematic way to compare the outputs.

### 2. Validation Method
1.  **Generate Outputs:** Run your old pipeline and the new Dataiku pipeline on the exact same input data.
2.  **Import Both Outputs:** Bring both output files (the old one and the new one) into a new, temporary Dataiku project as two separate datasets.
3.  **Use the Split/Stack Recipe:** This is a slightly non-obvious but powerful technique. Use a **Stack** recipe to combine the two datasets. Add a constant column to each dataset before stacking to identify the source (e.g., a column named "source" with value "old" or "new").
4.  **Group and Compare:** Now, use a **Group** recipe. Group by the primary key of your data. For each key, compute the difference between the values from the old and new sources. If the migration was successful, all differences should be zero. Any non-zero difference points to a specific row and column where there is a discrepancy that you need to investigate.`,
  },
  {
    id: 111,
    slug: 'migrating-r-code',
    question: 'What are the specifics of migrating R code to Dataiku?',
    answer: `### 1. Introduction/Overview
Migrating R code is very similar to migrating Python code. The key is adapting the I/O to use the Dataiku API.

### 2. Sample R Recipe Code
\`\`\`R
library(dataiku)

# Read recipe inputs
# Replace read.csv('path/to/file.csv') with:
input_df <- dkuReadDataset("your_input_dataset_name")

# Perform your custom transformations on the 'input_df' data frame here
# using dplyr, data.table, etc.

# Write recipe outputs
# Replace write.csv(...) with:
dkuWriteDataset(input_df, "your_output_dataset_name")
\`\`\`

You also need to ensure that your R code environment in Dataiku has all the required packages (\`dplyr\`, \`ggplot2\`, etc.) installed.`,
  },
  {
    id: 112,
    slug: 'performance-after-migration',
    question: 'My migrated pipeline is slower in Dataiku than it was in the old system. Why?',
    answer: `### 1. Introduction/Overview
This usually happens when the pipeline is not designed in a "Dataiku-native" way. The most common cause is processing large datasets in-memory with Python/R instead of pushing the work to a database.

### 2. Common Causes & Solutions
- **Problem: Reading a huge database table into a Python recipe for a simple filter or join.** This pulls all the data over the network into the Dataiku server's memory, which is slow.
    - **Solution:** Perform the filter/join in a **SQL recipe** first. This pushes the computation to the database, which is much more efficient. Do as much work as possible in the database before bringing a smaller, aggregated dataset into Python for more complex tasks.
- **Problem: Using a file system connection for large-scale data.**
    - **Solution:** Change the storage connection for your intermediate datasets to a proper database or a performant file format like Parquet in cloud storage.
- **Problem: Inefficient Python code.**
    - **Solution:** Profile your code in a notebook to identify bottlenecks. Use vectorized Pandas/NumPy operations instead of row-by-row loops.`,
  },
  {
    id: 113,
    slug: 'migrating-excel-workflows',
    question: 'How do I migrate complex Excel workflows with many tabs and VLOOKUPs?',
    answer: `### 1. Introduction/Overview
Migrating from Excel to Dataiku provides huge benefits in terms of automation, scalability, and auditability.

### 2. Migration Strategy
1.  **Each Tab as a Dataset:** Treat each tab in your Excel file as a separate raw dataset. Upload the Excel file to Dataiku and create one dataset per sheet.
2.  **VLOOKUPs become Joins:** A VLOOKUP is essentially a left join. Replicate each VLOOKUP by using a **Join recipe** in Dataiku to combine the corresponding datasets.
3.  **Excel Formulas become Prepare Recipe Steps:** Re-create your Excel formula logic using the **Formula** processor in a Prepare recipe.
4.  **Pivot Tables become Group Recipes:** A pivot table is an aggregation. Use the **Group** (or Pivot) recipe in Dataiku to replicate this.
5.  **VBA Macros become Python/R Recipes:** Any logic in a VBA macro needs to be re-written in a Python or R recipe.

The result is a fully transparent, auditable, and automated Flow that can handle much larger data volumes than Excel.`,
  },
  {
    id: 114,
    slug: 'what-if-a-library-isnt-available',
    question: 'The open-source library I need is not available in my Dataiku code environment. What do I do?',
    answer: `### 1. Introduction/Overview
This is a common administrative task. You need to request that the library be added to your code environment.

### 2. Process
1.  **Find the Library:** Identify the exact name of the library you need from PyPI (for Python) or CRAN (for R).
2.  **Request the Change:** Contact your Dataiku administrator. They have the permissions to modify code environments. Provide them with the name and desired version of the package.
3.  **Administrator Action:** The administrator will go to **Administration > Code Environments**, select your project's environment, and add the requested package to the list.
4.  **Update Environment:** Dataiku will then update the environment, installing the new package.
5.  **Security:** In many organizations, there is a security review process for new packages before they can be added to an environment, so there may be a delay.`,
  },
  {
    id: 115,
    slug: 'phased-migration-approach',
    question: 'What is a good strategy for a phased migration? Should I migrate everything at once?',
    answer: `### 1. Introduction/Overview
A "big bang" migration where you try to migrate everything at once is risky and rarely successful. A phased approach is much better.

### 2. Phased Strategy
1.  **Start with a Pilot Project:** Choose one or two high-value but medium-complexity workflows for your first migration project. This allows the team to learn Dataiku on a real project and deliver a quick win.
2.  **Focus on a Single Business Unit:** Start by migrating the workflows for one business unit or team. This contains the scope and allows you to build expertise and best practices with a smaller group of stakeholders.
3.  **Build a "Center of Excellence":** The first team to be migrated becomes your internal "Center of Excellence." They can help train and support the next teams that are migrated.
4.  **Prioritize by Impact and Feasibility:** Create a backlog of all workflows to be migrated and prioritize them based on business impact and technical difficulty. Tackle the high-impact, low-difficulty ones first.
5.  **Iterate and Improve:** Continuously refine your migration process, templates, and best practices based on the lessons learned from each phase.`,
  },
];
