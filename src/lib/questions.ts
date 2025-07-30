
export interface Question {
  id: number;
  slug: string;
  question: string;
  answer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    slug: 'building-your-first-dataiku-dss-flow',
    question: 'How to get started with building your first Dataiku DSS flow?',
    answer: `
### 1. Introduction/Overview
Building your first flow in Dataiku DSS is the foundational step to mastering the platform. A "Flow" is a visual representation of your data pipeline, showing how data is ingested, transformed, and processed. This guide will walk you through creating a simple yet complete flow, a process that is intuitive and can be completed in under an hour.

### 2. Prerequisites
- **Access to a Dataiku DSS instance:** You need a running instance of Dataiku DSS (Free, Cloud, or Enterprise).
- **A sample dataset:** A simple CSV file is perfect. You can use your own or find one online (e.g., from Kaggle).
- **Basic Data Concepts:** Understanding of what datasets and data transformations are.

### 3. Step-by-Step Instructions
1.  **Create a New Project:** From the Dataiku homepage, click "+ New Project" and choose "Blank project". Give it a name like "My First Flow".
2.  **Import Your Dataset:**
    *   Inside your project, click **+ DATASET**.
    *   Select **Upload your files** and drag your CSV file into the designated area.
    *   Dataiku will preview the data. Confirm the format and click **CREATE**. Your dataset now appears in the Flow.
3.  **Create a Prepare Recipe:**
    *   Select your new dataset in the Flow.
    *   From the right-hand panel, click on the **Prepare** recipe under "Visual recipes".
    *   Click **CREATE RECIPE**. This opens the Prepare recipe interface.
4.  **Perform a Transformation:**
    *   In the Prepare recipe, click on a column header. A list of suggested transformations will appear.
    *   Choose a simple action, like **Filter** on a specific value or **Clear cells with invalid values**.
    *   The changes will be previewed instantly.
5.  **Run the Recipe:** Click the **Run** button at the bottom left. Once it completes, you'll see two datasets and one recipe in your Flow, showing the input, the transformation, and the output.

### 4. Resources and Tools
- **Dataiku Academy:** Offers free courses like "Core Designer" that are perfect for beginners.
- **Sample Projects:** Dataiku comes with built-in sample projects. Explore them to see how complex flows are built.
- **Community Forum:** The Dataiku Community is a great place to ask questions if you get stuck.

### 5. Next Steps and Progression
- **Add more recipes:** Try chaining another recipe, like a **Join** or **Group**, to the output of your first recipe.
- **Explore other dataset types:** Try connecting to a SQL database or a cloud storage source.
- **Build a simple chart:** Open your output dataset and go to the "Charts" tab to visualize your results.

### 6. Common Challenges and Solutions
- **Challenge:** "My dataset schema was not detected correctly."
- **Solution:** In the dataset import screen, you can manually override the column types and format settings before creating the dataset.
- **Challenge:** "I'm not sure which transformation to use."
- **Solution:** The processor library in the Prepare recipe is searchable. Try typing a keyword like "date" or "split" to find the right tool.
`,
  },
  {
    id: 2,
    slug: 'designing-end-to-end-etl-pipelines-in-dataiku-dss',
    question: 'How to get started with designing end‑to‑end ETL pipelines in Dataiku DSS?',
    answer: `
### 1. Introduction/Overview
Designing an end-to-end ETL (Extract, Transform, Load) pipeline is a core competency for any data professional. In Dataiku, this process is visualized in the Flow, making it transparent and manageable. This guide outlines the strategic approach to designing a robust ETL pipeline from source to final output.

### 2. Prerequisites
- **Clear Business Goal:** Understand what you want to achieve with the data (e.g., create a sales report, prepare data for a model).
- **Access to Data Sources:** You'll need credentials and connection details for your source systems (databases, APIs, etc.).
- **Familiarity with Dataiku Flow:** Basic knowledge of how to create datasets and recipes.

### 3. Step-by-Step Instructions
1.  **Plan Your Pipeline (The "Whiteboard" Phase):**
    *   **Extract:** Identify all your data sources.
    *   **Transform:** List the key cleaning, joining, and aggregation steps required.
    *   **Load:** Define the final destination and format of your output data.
2.  **Organize with Flow Zones:** Before you build, create Flow Zones in your project for each stage of your plan (e.g., "1_Ingestion", "2_Transformation", "3_Outputs"). This keeps your pipeline organized.
3.  **Implement the "Extract" Stage:** In the "Ingestion" zone, create datasets for each of your sources (e.g., from SQL, S3, or APIs).
4.  **Implement the "Transform" Stage:** In the "Transformation" zone, use a series of visual recipes (Prepare, Join, Group, etc.) to implement your logic. Chain the recipes together, with the output of one becoming the input for the next.
5.  **Implement the "Load" Stage:** In the "Outputs" zone, take your final transformed dataset and add an **Export** recipe. Configure it to write the data to your target system (e.g., a Snowflake table or a cloud storage bucket).

### 4. Resources and Tools
- **Flow Zones:** The primary tool for organizing complex pipelines.
- **Project Wiki:** Use the project's Wiki to document your pipeline design, data sources, and business logic.
- **Dataiku Academy:** The "Advanced Designer" path covers complex pipeline architecture.

### 5. Next Steps and Progression
- **Automation:** Once the pipeline is built, create a **Scenario** to schedule it to run automatically.
- **Data Quality:** Add **Metrics and Checks** to your key datasets to monitor data quality.
- **Optimization:** Use the Job Inspector to find and optimize any slow-running parts of your pipeline.

### 6. Common Challenges and Solutions
- **Challenge:** "My flow is becoming a 'spaghetti mess'."
- **Solution:** Be disciplined with Flow Zones. Group related items and collapse zones you aren't working on to keep the view clean.
- **Challenge:** "How do I handle environment differences (dev vs. prod)?"
- **Solution:** Use **Project Variables** for connections and paths. This allows you to promote the pipeline to a production environment by simply changing the variables, without editing the recipes.
`,
  },
  {
    id: 3,
    slug: 'ingesting-data-from-databases-into-dataiku',
    question: 'How to get started with ingesting data from databases into Dataiku?',
    answer: `
### 1. Introduction/Overview
Connecting to a database is often the first step in a data project. Dataiku provides native connectors for most SQL databases, making it simple to ingest tables as datasets in your Flow. This guide covers the two-step process: creating a connection and then importing a table.

### 2. Prerequisites
- **Database Credentials:** You'll need the hostname, port, database name, username, and password for your database.
- **Permissions:** Your database user needs at least read access to the tables you want to ingest.
- **Network Access:** The Dataiku instance must be able to reach the database server. This may require firewall rules to be configured by your IT team.

### 3. Step-by-Step Instructions
1.  **Create the Connection (Admin Task):**
    *   Navigate to **Administration > Connections**. *(Note: You may need admin rights for this step.)*
    *   Click **+ NEW CONNECTION** and select your database type (e.g., PostgreSQL, Snowflake).
    *   Fill in the connection details (host, credentials, etc.) and give the connection a clear name.
    *   Click **Test** to verify that Dataiku can connect successfully, then click **Create**.
2.  **Create a Dataset from the Connection:**
    *   Go to your project's Flow and click **+ DATASET**.
    *   Select your database type from the list of sources.
    *   A list of tables will appear. Select the table you want to import.
    *   Dataiku will show a preview. Click **CREATE**. The database table is now represented as a dataset in your Flow.

### 4. Resources and Tools
- **Connections Page:** The central place in Dataiku to manage all external connections.
- **SQL Query Recipe:** Once you have a dataset from a database, you can use a SQL recipe to directly query it, pushing the computation to the database.

### 5. Next Steps and Progression
- **Import multiple tables:** Bring in several tables from the same database.
- **Join database tables:** Use a **Join** recipe to combine the datasets you've imported.
- **Write data back:** Use an **Export** recipe to write the results of your flow back to a new table in the same database.

### 6. Common Challenges and Solutions
- **Challenge:** "The connection test fails."
- **Solution:** This is almost always a network issue. Double-check all credentials. Confirm with your network team that the Dataiku server's IP address is allowed to access the database port.
- **Challenge:** "I can't see the table I'm looking for."
- **Solution:** This is likely a permissions issue. Check with your database administrator to ensure the user account Dataiku is using has 'SELECT' privileges on that specific table or schema.
`,
  },
  {
    id: 4,
    slug: 'loading-csv-excel-data-into-dataiku-dss',
    question: 'How to get started with loading CSV/Excel data into Dataiku DSS?',
    answer: `
### 1. Introduction/Overview
Loading flat files like CSVs and Excel spreadsheets is a fundamental skill in Dataiku. The platform provides a simple, user-friendly interface to upload files directly into your project's Flow, automatically detecting formats and schemas.

### 2. Prerequisites
- **A CSV or Excel file:** Have the file ready on your local machine.
- **A Dataiku Project:** You need an existing project to add the dataset to.

### 3. Step-by-Step Instructions
1.  **Navigate to Your Project Flow:** Open the project where you want to add the data.
2.  **Select "Upload your files":**
    *   Click the **+ DATASET** button.
    *   From the menu, choose **Upload your files**.
3.  **Upload the File:** You can either drag and drop your CSV/Excel file into the browser window or click to browse your computer.
4.  **Preview and Configure:**
    *   Dataiku will automatically upload the file and show a preview.
    *   It will try to detect the file format (e.g., separator for CSVs) and infer the column names and types.
    *   Carefully review this preview. You can make adjustments here if needed (e.g., change a column type from string to number).
5.  **Create the Dataset:** Once you are satisfied with the preview, click the **CREATE** button. The file is now a dataset in your Flow, ready to be used in recipes.

### 4. Resources and Tools
- **The Upload Interface:** The primary tool for this task, offering previews and configuration options.
- **Prepare Recipe:** The immediate next step is usually to use a Prepare recipe to clean the uploaded data.

### 5. Next Steps and Progression
- **Upload multiple files:** Practice by uploading a few different files.
- **Explore Format Options:** In the preview screen, explore the settings for different delimiters, encodings, and how to handle headers.
- **Use the Dataset:** Select your newly created dataset and apply a **Prepare** recipe to start transforming it.

### 6. Common Challenges and Solutions
- **Challenge:** "My column headers are in the second row, not the first."
- **Solution:** In the preview screen, there is an option to "Skip first N rows". Set this to 1 to correctly detect the headers.
- **Challenge:** "Dataiku misidentified a column's data type."
- **Solution:** In the preview screen, you can click on any column header to manually change its type before creating the dataset.
- **Challenge:** "My international characters are not displaying correctly."
- **Solution:** This is an encoding issue. In the preview settings, try changing the file encoding from the default to \`UTF-8\` or another appropriate standard.
`,
  },
  {
    id: 5,
    slug: 'integrating-rest-apis-as-dataiku-datasets',
    question: 'How to get started with integrating REST APIs as Dataiku datasets?',
    answer: `
### 1. Introduction/Overview
Many modern services expose their data via REST APIs. Dataiku can connect to these APIs and treat their JSON responses as regular datasets. This allows you to pull live data directly into your flows for analysis.

### 2. Prerequisites
- **API Documentation:** You need the documentation for the API you want to connect to. This will provide the endpoint URL, required parameters, and authentication details.
- **API Key (if required):** If the API requires authentication, you will need an API key or other credentials.
- **Network Access:** The Dataiku server must be able to make outbound requests to the API's domain.

### 3. Step-by-Step Instructions
1.  **Select the API Connector:** In your Flow, click **+ DATASET** and search for or select the **API** plugin.
2.  **Configure the API Endpoint:**
    *   Give your new dataset a name (e.g., \`api_weather_data\`).
    *   In the API configuration screen, enter the base URL of the API endpoint.
    *   If authentication is needed, add a new header and provide your API key (e.g., Header name: \`Authorization\`, Header value: \`Bearer YOUR_API_KEY\`).
3.  **Test the Connection:** Click the **Test** button. Dataiku will call the API and show you the raw JSON response.
4.  **Configure JSON Parsing:**
    *   Dataiku will try to automatically identify the array in the JSON response that contains the data records.
    *   If the automatic parsing isn't correct, you may need to manually specify the path to the array of records.
5.  **Create the Dataset:** Once the preview shows the data correctly parsed into rows and columns, click **CREATE**. You now have a dataset that pulls live data from the API every time it's built.

### 4. Resources and Tools
- **API Plugin:** The dedicated Dataiku connector for this task.
- **Postman:** A great external tool for testing API calls and understanding the JSON structure before you configure it in Dataiku.
- **Project Variables:** Store your API key in a project variable (marked as a password) instead of hardcoding it in the recipe for better security.

### 5. Next Steps and Progression
- **Handle Pagination:** Many APIs return data in pages. Explore the API connector's settings for handling pagination to retrieve all records.
- **Parameterize API Calls:** Use project variables in the API URL or parameters to make dynamic calls (e.g., fetch data for a specific date).
- **Schedule a Refresh:** Create a **Scenario** to rebuild this API dataset on a schedule, keeping your data fresh.

### 6. Common Challenges and Solutions
- **Challenge:** "The API call fails with an authentication error."
- **Solution:** Double-check your API key and how you are providing it. Read the API documentation carefully; some APIs expect the key in a header, others as a URL parameter.
- **Challenge:** "The JSON is not parsing correctly."
- **Solution:** Use the "Test" feature to view the raw JSON. Manually inspect its structure to find the correct path to the array of data you want to extract. The path might be nested, like \`results.records\`.
`,
  },
  {
    id: 6,
    slug: 'working-with-cloud-storage-sources-s3-gcs-azure-blob',
    question: 'How to get started with working with cloud storage sources (S3, GCS, Azure Blob)?',
    answer: `
### 1. Introduction/Overview
Cloud storage is a common place to store raw data files. Dataiku integrates seamlessly with major providers like AWS S3, Google Cloud Storage (GCS), and Azure Blob Storage, allowing you to access these files as if they were local.

### 2. Prerequisites
- **Cloud Account Credentials:** You'll need an access key and secret key (or equivalent credentials) for a user with read permissions on the storage location.
- **Bucket/Container and Path:** You need to know the name of the storage bucket and the path to the file(s) you want to access.
- **Admin Access (for first-time setup):** You need Dataiku admin rights to configure the connection initially.

### 3. Step-by-Step Instructions
1.  **Configure the Cloud Connection:**
    *   In Dataiku, navigate to **Administration > Connections**.
    *   Click **+ NEW CONNECTION** and select your cloud provider (e.g., Amazon S3).
    *   Enter your credentials (access key, secret key). It is highly recommended to use instance roles or more secure methods if available.
    *   Save and test the connection.
2.  **Create a Dataset from Cloud Storage:**
    *   In your project's Flow, click **+ DATASET**.
    *   Select your cloud provider (e.g., Amazon S3).
    *   Dataiku will now use the configured connection to let you browse your buckets.
    *   Navigate to the correct bucket and folder and select the file you want to use.
3.  **Preview and Create:**
    *   Dataiku will preview the file and infer its schema, just like with an uploaded file.
    *   Confirm the settings and click **CREATE**. The cloud file is now a dataset in your Flow.

### 4. Resources and Tools
- **Cloud Provider IAM Console:** Where you manage users and permissions to grant Dataiku access.
- **Dataiku Connections:** The central hub for managing all external data source connections.

### 5. Next Steps and Progression
- **Access a folder of files:** Instead of a single file, you can point a dataset to an entire folder of identically structured files (e.g., daily log files). Dataiku will treat them as a single, larger dataset.
- **Use Partitioning:** If your files are organized into folders by date (e.g., \`/logs/2023/01/01/\`), you can set up partitioning on the dataset. This allows for much more efficient processing.
- **Write back to cloud storage:** Use an **Export** recipe to save your final results back to a different bucket or path in your cloud storage.

### 6. Common Challenges and Solutions
- **Challenge:** "Connection failed or Access Denied error."
- **Solution:** This is a permissions issue. In your cloud provider's console (e.g., AWS IAM), ensure the user or role whose credentials Dataiku is using has a policy attached that grants it permission to list buckets and read objects from the specific bucket you're trying to access.
- **Challenge:** "I can't see my files when browsing."
- **Solution:** Double-check the path. Bucket and folder names are case-sensitive. Also, verify you are in the correct cloud region.
`,
  },
  {
    id: 7,
    slug: 'combining-disparate-data-sources-into-unified-datasets',
    question: 'How to get started with combining disparate data sources into unified datasets?',
    answer: `
### 1. Introduction/Overview
A key task in data engineering is combining data from different sources to create a single, unified view. Dataiku excels at this with its visual **Join** and **Stack** recipes, allowing you to merge datasets regardless of their original source (e.g., joining a SQL table with a CSV file).

### 2. Prerequisites
- **At least two datasets:** You need to have already imported the datasets you want to combine into your Flow.
- **Understanding of Join vs. Stack:**
    - **Join:** Adds new *columns* based on a common key (like a VLOOKUP).
    - **Stack:** Appends new *rows* from datasets that have the same columns (like a UNION ALL).

### 3. Step-by-Step Instructions
#### To Join Two Datasets:
1.  In your Flow, select one of the datasets you want to join (this will be the "left" dataset).
2.  From the right-hand panel, choose the **Join with...** recipe.
3.  Select the second dataset you want to join with.
4.  In the Join recipe screen:
    *   Select the **Join Type** (e.g., Left, Inner, Outer).
    *   Define the **Join Condition** by clicking on the column(s) that serve as the common key between the two datasets.
    *   In the "Selected Columns" panel, choose which columns from both datasets you want to keep in the final output.
5.  Click **Run** to create the new, unified dataset.

#### To Stack Two Datasets:
1.  Select one of the datasets.
2.  From the right-hand panel, choose the **Stack with...** recipe.
3.  Select the second dataset. Dataiku will automatically map columns with the same name.
4.  Review the column mappings. You can manually adjust them if needed.
5.  Click **Run** to create the new, appended dataset.

### 4. Resources and Tools
- **Join Recipe:** The primary tool for combining data based on a key.
- **Stack Recipe:** The tool for appending rows.
- **Prepare Recipe:** Often used before a Join or Stack to clean up join keys or align column names.

### 5. Next Steps and Progression
- **Multi-dataset Joins:** You can chain Join recipes to combine three or more datasets.
- **Fuzzy Joins:** If your join keys are similar but not identical (e.g., due to typos), explore the **Fuzzy Join** recipe.
- **Post-Join Cleanup:** Add a **Prepare** recipe after your join to rename columns or remove duplicate join keys.

### 6. Common Challenges and Solutions
- **Challenge:** "My join is creating duplicate rows."
- **Solution:** This happens if your join key is not unique in the "right" dataset. Before the join, use a **Group** recipe to deduplicate the right dataset based on the key, ensuring there is only one row per key.
- **Challenge:** "My stack failed because of a schema mismatch."
- **Solution:** Before stacking, use separate **Prepare** recipes on each input dataset to ensure the column names and data types are identical.
`,
  },
  {
    id: 8,
    slug: 'creating-multi-step-recipe-chains',
    question: 'How to get started with + creating multi‑step recipe chains?',
    answer: `
### 1. Introduction/Overview
A "recipe chain" is the fundamental structure of a Dataiku Flow. It's a sequence of recipes where the output of one step becomes the input for the next. This creates a clear, traceable data pipeline. This guide explains how to build these chains.

### 2. Prerequisites
- **A Dataiku Project:** An existing project with at least one dataset.
- **A Goal:** A clear idea of the sequence of transformations you want to perform.

### 3. Step-by-Step Instructions
1.  **Create the First Link:**
    *   Start with your raw dataset in the Flow.
    *   Select it and add your first recipe, for example, a **Prepare** recipe to clean the data.
    *   Run this recipe. You now have a chain of two datasets and one recipe.
2.  **Add the Second Link:**
    *   Now, select the *output dataset* from your first recipe.
    *   From the right-hand panel, choose your next recipe. For instance, a **Join** recipe to combine it with another dataset.
    *   Configure and run this second recipe.
3.  **Continue the Chain:**
    *   Select the output of the Join recipe.
    *   Add a third recipe, perhaps a **Group** recipe to aggregate the data.
    *   Run this recipe.
4.  **Visualize the Chain:** Your Flow now shows a clear, left-to-right pipeline: \`[Raw Data] -> (Prepare) -> [Cleaned Data] -> (Join) -> [Joined Data] -> (Group) -> [Aggregated Data]\`. This is a multi-step recipe chain.

### 4. Resources and Tools
- **The Flow:** The canvas where you build and visualize your recipe chains.
- **The Actions Panel:** The right-hand panel where you select recipes to add to the chain.

### 5. Next Steps and Progression
- **Complex Chains:** Build longer chains with more complex logic.
- **Branching Chains:** A single dataset can be the input to multiple recipes, creating branches in your Flow. For example, you could create two different sets of aggregations from the same cleaned dataset.
- **Refactoring:** As chains get long, use **Flow Zones** to group logical segments of the chain.

### 6. Common Challenges and Solutions
- **Challenge:** "I accidentally connected a recipe to the wrong input."
- **Solution:** In the recipe's settings, go to the "Input/Output" tab. Here you can change the input dataset for the recipe without having to delete and recreate it.
- **Challenge:** "My flow is hard to read because the chain goes all over the place."
- **Solution:** Use the **Arrange** button in the Flow to automatically clean up the layout. For more complex flows, manually drag and drop the items to create a clean, logical layout.
`,
  },
  {
    id: 9,
    slug: 'structuring-reusable-flow-zones',
    question: 'How to get started with + structuring reusable Flow Zones?',
    answer: `
### 1. Introduction/Overview
As your projects grow, the Flow can become crowded and difficult to navigate. Flow Zones are the solution. They are visual containers that let you group related datasets and recipes, creating a clean, high-level view of your pipeline.

### 2. Prerequisites
- **A Dataiku project with a moderately complex Flow:** You need a Flow with several recipe chains to see the benefit.
- **A Logical Project Structure:** You should have a mental map of the different stages of your project (e.g., ingestion, preparation, modeling).

### 3. Step-by-Step Instructions
1.  **Create a Flow Zone:**
    *   In your Flow, right-click on an empty area of the canvas.
    *   Select **Create Flow Zone**.
    *   Give it a name that represents a stage of your pipeline, for example, \`1_Data_Ingestion\`. Using numbers helps enforce a logical order.
2.  **Move Items into the Zone:**
    *   Select the datasets and recipes that belong to this stage by holding \`Shift\` and clicking on them.
    *   Drag the selected items and drop them anywhere inside the new Flow Zone.
3.  **Create More Zones:** Repeat the process for other logical stages. Common zone structures include:
    *   \`1_Data_Ingestion\` (raw data sources)
    *   \`2_Data_Preparation\` (cleaning and joining)
    *   \`3_Feature_Engineering\` (creating features for modeling)
    *   \`4_Modeling\` (training and scoring models)
    *   \`5_Outputs\` (final datasets for reporting)
4.  **Collapse and Expand Zones:** Click the \`-\` icon on a Flow Zone to collapse it. This hides the details and shows only the connections between zones, providing a clean, high-level overview of your entire project architecture.

### 4. Resources and Tools
- **The Flow Canvas:** The primary interface for creating and managing zones.
- **Project Wiki:** Document your Flow Zone strategy in the Wiki so that all team members follow the same structure.

### 5. Next Steps and Progression
- **Reusable Flows via Duplication:** A well-structured project with clear zones can serve as a template. You can duplicate the entire project to kickstart new work with a proven architecture.
- **Cross-Project Standardization:** Define a standard set of Flow Zones for your entire organization to ensure all projects are structured consistently.
- **Sharing Work:** Collapsed zones make it easy to present your project architecture to stakeholders without overwhelming them with details.

### 6. Common Challenges and Solutions
- **Challenge:** "I have items that seem to belong to two zones."
- **Solution:** Choose the zone that represents the item's primary purpose. A dataset's zone is determined by the recipe that *creates* it.
- **Challenge:** "The connections between my collapsed zones look like a mess."
- **Solution:** Manually arrange the Flow Zones on the canvas to create a clean, left-to-right flow of data between them.
`,
  },
  {
    id: 10,
    slug: 'implementing-branching-and-looping-in-dataiku-flows',
    question: 'How to get started with + implementing branching and looping in Dataiku flows?',
    answer: `
### 1. Introduction/Overview
While Dataiku Flows are primarily Directed Acyclic Graphs (DAGs), you can implement more complex control flows like branching and looping using Scenarios and variables. Branching allows for conditional execution, while looping enables iterative processing.

### 2. Prerequisites
- **Understanding of Dataiku Scenarios:** Knowledge of how to create scenarios and add steps.
- **Basic Python Knowledge:** Required for implementing the conditional logic.
- **Familiarity with Project Variables:** Understanding how to create and use variables.

### 3. Step-by-Step Instructions
#### Branching (Conditional Execution)
1.  **Build Both Branches:** In your Flow, build out the different logical paths. For example, have a dataset \`input_data\` that can be processed by either \`recipe_A\` or \`recipe_B\`.
2.  **Create a Scenario:** Create a new scenario to control the execution.
3.  **Add a Python Step:** Add a "Execute Python code" step. This script will contain your conditional logic.
4.  **Write the Logic:** In the Python step, write code to check a condition (e.g., by querying a database or checking a project variable). Based on the result, use the Dataiku API to run the appropriate job.
    > \`\`\`python
    > if condition:
    >     project.build("output_of_recipe_A")
    > else:
    >     project.build("output_of_recipe_B")
    > \`\`\`
#### Looping (Iterative Execution)
1.  **Parameterize Your Flow:** Build a flow that depends on a project variable. For example, a filter in a recipe could be \`date == '\${run_date}'\`.
2.  **Create a "Controller" Scenario:** Create a new scenario.
3.  **Add a Python Step for Looping:** In a Python step, define the list of values you want to loop over.
4.  **Write the Loop:** Use a \`for\` loop. Inside the loop, set the project variable and then trigger the build of your parameterized flow.
    > \`\`\`python
    > dates_to_process = ["2023-01-01", "2023-01-02"]
    > for d in dates_to_process:
    >     vars = project.get_variables()
    >     vars["standard"]["run_date"] = d
    >     project.set_variables(vars)
    >     project.build("final_output")
    > \`\`\`

### 4. Resources and Tools
- **Scenarios:** The orchestration engine of Dataiku.
- **Python Recipes/Steps:** Provide the flexibility to implement custom control flow.
- **Dataiku Python API Documentation:** Essential for programmatically controlling jobs and variables.

### 5. Next Steps and Progression
- **Recursive Loops:** For more advanced cases, a scenario can even trigger itself with new parameters, creating a recursive loop.
- **Dynamic Branching:** The condition in your Python script can be dynamic, for example, based on the number of rows in a dataset.

### 6. Common Challenges and Solutions
- **Challenge:** "How do I get the list of items to loop over?"
- **Solution:** The list can be hardcoded, or for a more dynamic approach, you can read it from a Dataiku dataset at the start of your Python script.
- **Challenge:** "My loop is not working in parallel."
- **Solution:** Standard scenario loops run sequentially. For parallel execution, you would need a more advanced setup using containerized execution where your Python script could launch multiple jobs simultaneously.
`,
  },
  {
    id: 11,
    slug: 'using-prepare-recipes-for-data-cleaning',
    question: 'How to get started with + using Prepare recipes for data cleaning?',
    answer: `
### 1. Introduction/Overview
The **Prepare recipe** is the cornerstone of data transformation in Dataiku. It provides a powerful, interactive, and visual interface for cleaning, normalizing, and enriching your data without writing code. Mastering the Prepare recipe is essential for any Dataiku user.

### 2. Prerequisites
- **A dataset in your Flow:** You need a dataset to clean.
- **An idea of what "clean" means:** Understand the data quality issues you need to address (e.g., missing values, incorrect formats, inconsistent text).

### 3. Step-by-Step Instructions
1.  **Create a Prepare Recipe:**
    *   In your Flow, select the dataset you want to clean.
    *   From the right-hand panel, click on the **Prepare** recipe.
    *   Give the output dataset a name (e.g., \`your_dataset_prepared\`) and click **CREATE RECIPE**.
2.  **Explore the Interface:** You are now in the Prepare recipe. You see your data in a spreadsheet-like view. On the left is the list of transformation "steps".
3.  **Add a Cleaning Step:**
    *   Click on the header of a column that needs cleaning.
    *   A panel will appear with context-aware suggestions.
    *   For example, if a column has missing values, you can select **Clear rows with no value** or **Impute missing values**.
4.  **Use the Processor Library:**
    *   Click the **+ ADD A NEW STEP** button to open the full library of over 100 processors.
    *   You can search for processors by name (e.g., "Filter", "Parse date", "Split column").
5.  **Chain Multiple Steps:** Continue adding steps to the list on the left. Each step operates on the result of the previous one. You can reorder or delete steps as needed.
6.  **Run the Recipe:** Once you are happy with your cleaning script, click the **Run** button to apply the transformations and create the new, cleaned output dataset.

### 4. Resources and Tools
- **The Processor Library:** Your main tool, containing all available transformation functions.
- **The Formula Language:** For custom transformations, the "Formula" processor lets you write Excel-like expressions.
- **Dataiku Academy:** The "Visual Recipes" courses provide deep dives into the Prepare recipe.

### 5. Next Steps and Progression
- **Advanced Processors:** Explore more complex processors like "GeoIP lookup" or "Currency conversion".
- **Regular Expressions:** Use the "Find & Replace" or "Filter" processors with regular expressions for powerful pattern matching.
- **Copy/Paste Steps:** You can copy the list of steps from one recipe and paste them into another to reuse cleaning logic.

### 6. Common Challenges and Solutions
- **Challenge:** "My changes are not being saved."
- **Solution:** Changes in the Prepare recipe are only applied to the output dataset when you click the **Run** button.
- **Challenge:** "I made a mistake in a step."
- **Solution:** You can click on any step in the list to edit its configuration or click the "X" to delete it. The data preview will update instantly.
`,
  },
  {
    id: 12,
    slug: 'writing-python-recipes-in-dataiku-dss',
    question: 'How to get started with + writing Python recipes in Dataiku DSS?',
    answer: `
### 1. Introduction/Overview
While visual recipes are powerful, sometimes you need the full flexibility of a programming language. Python recipes allow you to use custom code and leverage the vast ecosystem of Python libraries (like Pandas) to perform complex transformations within your Dataiku Flow, while still maintaining full lineage.

### 2. Prerequisites
- **Basic Python and Pandas knowledge:** You should be comfortable with Python syntax and basic Pandas DataFrame operations.
- **An input dataset:** A dataset in your Flow that you want to process.
- **A Code Environment:** Ensure a Python environment is configured for your project.

### 3. Step-by-Step Instructions
1.  **Create a Python Recipe:**
    *   In your Flow, select your input dataset.
    *   From the right-hand panel, click **+ RECIPE** and choose **Python**.
    *   Dataiku will automatically create an output dataset. Confirm the details and click **CREATE RECIPE**.
2.  **Understand the Boilerplate Code:** The recipe editor will open with some pre-filled code. The key parts are:
    *   \`import dataiku\`: Imports the Dataiku API library.
    *   \`input_dataset = dataiku.Dataset("your_input_name")\`: Gets a handle on your input.
    *   \`df = input_dataset.get_dataframe()\`: Reads the input data into a Pandas DataFrame.
    *   \`output_dataset = dataiku.Dataset("your_output_name")\`: Gets a handle on your output.
    *   \`output_dataset.write_with_schema(df)\`: Writes the transformed DataFrame to the output.
3.  **Add Your Transformation Logic:** Between reading the input DataFrame and writing the output, insert your custom Pandas code. For example:
    > \`\`\`python
    > # Example: Create a new column
    > df['new_column'] = df['existing_column'] * 2
    > \`\`\`
4.  **Validate and Run:**
    *   Click the **Validate** button to check for syntax errors.
    *   Click the **Run** button to execute the recipe and generate the output dataset.

### 4. Resources and Tools
- **Dataiku Python API:** The core library for interacting with Flow items in code. The documentation is essential.
- **Code Environments:** In **Administration > Code Envs**, you can manage the Python packages available to your recipes.
- **Jupyter Notebooks:** For exploratory coding, you can experiment in a notebook first, then copy the finalized code into a recipe.

### 5. Next Steps and Progression
- **Multiple Inputs/Outputs:** A single Python recipe can have multiple input and output datasets.
- **Using Project Variables:** Access project variables in your code with \`dataiku.get_custom_variables()\`.
- **Custom Libraries:** Write reusable functions in your project's **Libraries** folder and import them into your recipes.

### 6. Common Challenges and Solutions
- **Challenge:** "\`ModuleNotFoundError\`: No module named 'some_library'"
- **Solution:** The required library is not in your code environment. Go to your project's settings, find the code environment, and add the missing package.
- **Challenge:** "Out of Memory Error."
- **Solution:** Your dataset is too large to fit in memory as a single Pandas DataFrame. You can either process the data in chunks (using an iterator) or, for very large data, switch to a **PySpark** recipe to use distributed computing.
`,
  },
  {
    id: 13,
    slug: 'writing-sql-recipes-inside-dataiku',
    question: 'How to get started with + writing SQL recipes inside Dataiku?',
    answer: `
### 1. Introduction/Overview
When your data resides in a SQL database, the most efficient way to transform it is often with a SQL recipe. This pushes the computation directly to the database, leveraging its native power and avoiding unnecessary data movement. Dataiku provides a clean interface for writing and executing SQL against your connected data sources.

### 2. Prerequisites
- **SQL Datasets:** Your input datasets must be stored in a connected SQL database (e.g., Snowflake, Redshift, PostgreSQL).
- **Basic SQL Knowledge:** You should be comfortable writing \`SELECT\` statements, joins, and aggregations.
- **A configured SQL connection:** The connection to your database must be set up in Dataiku.

### 3. Step-by-Step Instructions
1.  **Create a SQL Recipe:**
    *   In your Flow, select a SQL-based input dataset.
    *   From the right-hand panel, click **+ RECIPE** and choose **SQL**.
    *   An output dataset will be proposed. Click **CREATE RECIPE**.
2.  **Write Your SQL Query:** The recipe editor provides a standard SQL editor. Write your query.
    *   **Crucially**, you don't need to use the full table names. You can refer to your input datasets directly by their names (e.g., \`customers_prepared\`). Dataiku handles the translation.
    > \`\`\`sql
    > SELECT
    >   c.customer_id,
    >   c.name,
    >   COUNT(o.order_id) AS number_of_orders
    > FROM customers_prepared c
    > LEFT JOIN orders_prepared o ON c.customer_id = o.customer_id
    > GROUP BY 1, 2
    > \`\`\`
3.  **Validate and Run:**
    *   Click **Validate** to check your SQL syntax against the database.
    *   The **Preview** pane will show you the results on a sample of the data.
    *   Click **Run** to execute the full query on the database and create the output dataset.

### 4. Resources and Tools
- **Database Explorer:** From a dataset's view, you can explore the underlying database schema.
- **Execution Engine:** In the recipe settings, ensure the execution is set to "Run on database".

### 5. Next Steps and Progression
- **Parameterization:** Use project variables directly in your SQL code (e.g., \`WHERE order_date > '\${start_date}'\`).
- **SQL Notebooks:** For exploratory SQL queries, use a SQL notebook before finalizing your logic in a recipe.
- **Complex Queries:** Write queries with Common Table Expressions (CTEs), window functions, and other advanced SQL features.

### 6. Common Challenges and Solutions
- **Challenge:** "Query failed: Table or view not found."
- **Solution:** Make sure you are using the Dataiku dataset name, not the raw database table name, in your \`FROM\` and \`JOIN\` clauses. Also check for typos.
- **Challenge:** "My query is very slow."
- **Solution:** The performance depends on your database. Use your database's query execution plan tools (like \`EXPLAIN\`) to analyze and optimize your SQL. Ensure the join columns are indexed in the database.
`,
  },
  {
    id: 14,
    slug: 'adding-custom-python-code-into-workflows',
    question: 'How to get started with + adding custom Python code into workflows?',
    answer: `
### 1. Introduction/Overview
There are several ways to incorporate custom Python code into Dataiku, each suited for different purposes. This guide provides a framework for deciding which method to use, from one-off transformations to building reusable, governed components.

### 2. Prerequisites
- **A clear goal:** Understand what you want to achieve with your code (e.g., perform a complex calculation, call an external service, integrate a specific library).
- **Python programming skills.**

### 3. Step-by-Step Instructions: Choosing the Right Tool
1.  **For Exploration and Prototyping: Use a Jupyter Notebook.**
    *   **When:** When you are exploring data or developing a new algorithm and don't know the final logic yet.
    *   **How:** In your project, go to **Notebooks > + New Notebook > Python**. You can read datasets, write code in cells, and see immediate results.
    *   **Outcome:** Once your logic is finalized, you can copy the code from the notebook and "productionize" it in a recipe.

2.  **For In-Flow Data Transformation: Use a Python Recipe.**
    *   **When:** When your code is a standard part of your data pipeline, taking one or more datasets as input and producing a dataset as output.
    *   **How:** Select your input dataset(s) and choose the **Python** recipe. Use the Dataiku API to read and write data.
    *   **Outcome:** A fully versioned, traceable, and schedulable step in your Flow.

3.  **For Reusable Functions: Use the Project Library.**
    *   **When:** When you have a helper function (e.g., for data cleaning or a specific calculation) that you want to use in multiple different Python recipes or notebooks.
    *   **How:** Go to the **Libraries** section of your project. Create a \`.py\` file and define your functions. You can then \`import\` this library in any recipe or notebook in the project.
    *   **Outcome:** Modular, maintainable, and reusable code.

4.  **For Operational Logic in Scenarios: Use a Python Scenario Step.**
    *   **When:** When you need to automate operational tasks, like conditional execution, looping, or calling external APIs as part of your orchestration.
    *   **How:** In a Scenario, add a new step of type "Execute Python code". Use the Dataiku API to interact with projects, datasets, and jobs.
    *   **Outcome:** Powerful, automated control over your project's execution.

### 4. Resources and Tools
- **Dataiku API Documentation:** Your guide to interacting with Dataiku objects programmatically.
- **Code Environments:** The mechanism for managing Python package dependencies for all your custom code.

### 5. Next Steps and Progression
- **Custom Plugins:** For highly reusable, user-friendly components, consider developing a custom plugin that provides a visual interface for your Python code.
- **API Node:** Deploy your Python code as a real-time REST API endpoint using the API Deployer.

### 6. Common Challenges and Solutions
- **Challenge:** "My code works in a notebook but fails in a recipe."
- **Solution:** The execution context can be different. Ensure the code environment is the same for both. Also, make sure you are using the Dataiku API correctly to read and write datasets in the recipe, which is different from how you might load data in a notebook.
`,
  },
  {
    id: 15,
    slug: 'combining-r-code-and-dataiku-recipes',
    question: 'How to get started with + combining R code and Dataiku recipes?',
    answer: `
### 1. Introduction/Overview
For teams that have existing skills or libraries in R, Dataiku provides first-class support for integrating R code directly into your data pipelines. An R recipe functions similarly to a Python recipe, allowing you to read data, apply custom R logic, and write the results back to the Flow.

### 2. Prerequisites
- **R Programming Skills:** Familiarity with R syntax and data frames.
- **An R Code Environment:** Your Dataiku administrator must have configured an R engine and you should have a code environment with the R packages you need (e.g., \`dplyr\`, \`ggplot2\`).
- **An Input Dataset:** A dataset in your Flow to process with R.

### 3. Step-by-Step Instructions
1.  **Create an R Recipe:**
    *   In your Flow, select your input dataset.
    *   From the right-hand panel, click **+ RECIPE** and choose **R**.
    *   Confirm the output dataset and click **CREATE RECIPE**.
2.  **Understand the Boilerplate Code:** The R recipe editor will provide starter code that shows you how to use the \`dataiku\` R library.
    *   \`library(dataiku)\`: Loads the necessary library.
    *   \`input_dataset <- dkuReadDataset("your_input_name")\`: Reads the input dataset into an R data frame.
    *   \`output_dataset <- ... # Your R code here\`: This is where you insert your transformation logic.
    *   \`dkuWriteDataset(output_dataset, "your_output_name")\`: Writes the transformed data frame to the output dataset.
3.  **Add Your R Logic:** Use your preferred R packages and functions to manipulate the \`input_dataset\` data frame. For example, using \`dplyr\`:
    > \`\`\`R
    > library(dplyr)
    > output_dataset <- input_dataset %>%
    >   mutate(new_column = existing_column * 2) %>%
    >   filter(some_category == 'A')
    > \`\`\`
4.  **Install Packages and Run:**
    *   In the recipe settings, ensure you have selected the correct R code environment. You can install required packages in this environment.
    *   Click **Run** to execute the R script.

### 4. Resources and Tools
- **R Code Environments:** Manage the R packages available to your recipes in **Administration > Code Envs**.
- **Dataiku R API Documentation:** The official reference for the \`dataiku\` R library.
- **R Notebooks:** Use an R notebook for exploratory analysis before finalizing your script in a recipe.

### 5. Next Steps and Progression
- **Visualization:** Use \`ggplot2\` within a notebook to create plots and add them as insights to your project dashboards.
- **Statistical Modeling:** Leverage R's powerful statistical modeling packages within your recipes.
- **R Markdown Reports:** Create dynamic reports using R Markdown in a notebook.

### 6. Common Challenges and Solutions
- **Challenge:** "Error: could not find function 'some_function'"
- **Solution:** You are missing a package. Make sure the package containing the function is listed in your code environment's packages, and that you have loaded it with \`library(package_name)\` at the start of your script.
- **Challenge:** "The recipe is very slow."
- **Solution:** R recipes, like Python recipes, run in-memory on the Dataiku server. For very large datasets, this can be slow. Consider using a SQL recipe to pre-aggregate the data before bringing it into R, or use SparkR in a Spark code recipe for distributed computation.
`,
  },
  {
    id: 16,
    slug: 'using-macros-and-global-variables-in-recipes',
    question: 'How to get started with + using macros and global variables in recipes?',
    answer: `
### 1. Introduction/Overview
Hardcoding values like file paths, server names, or thresholds into your recipes is a bad practice. It makes your flows brittle and difficult to move between environments. Dataiku's solution is **Project Variables**, which act as global variables that can be used across all your recipes and scenarios.

### 2. Prerequisites
- **A Dataiku Project.**
- **A need for parameterization:** Identify values in your project that might change (e.g., a date filter, a file name, a model version).

### 3. Step-by-Step Instructions
1.  **Create a Project Variable:**
    *   From your project's top navigation bar, go to **... > Variables**.
    *   Click **Edit Variables**.
    *   Click **+ ADD VARIABLE**.
    *   Give your variable a \`name\` (e.g., \`start_date\`) and a \`value\` (e.g., \`2023-01-01\`).
    *   Click **SAVE**.
2.  **Use the Variable in a Visual Recipe:**
    *   Open a recipe, for example, a **Prepare** recipe with a **Filter** step.
    *   In the filter expression, you can use the variable with the syntax \`\${variable_name}\`.
    *   Example: \`date_column > '\${start_date}'\`
3.  **Use the Variable in a Code Recipe (Python):**
    *   In a Python recipe, you can retrieve all variables as a dictionary.
    > \`\`\`python
    > import dataiku
    > # Get all variables
    > variables = dataiku.get_custom_variables()
    > # Access a specific variable
    > my_variable_value = variables.get('my_variable_name')
    > \`\`\`
4.  **Change the Variable's Value:** To change the behavior of all recipes that use the variable, you only need to update its value in one place: the **Variables** page.

### 4. Resources and Tools
- **Project Variables Page:** The central place to manage all your project's parameters.
- **Scenarios:** Scenarios can override the default values of variables for a specific run, which is extremely powerful for automation.

### 5. Next Steps and Progression
- **Environment Promotion:** This is the primary use case. You can have different variable values for your \`dev\` and \`prod\` Dataiku instances. When you deploy your project, the flow automatically picks up the correct production values.
- **Password Protection:** When creating a variable, you can mark it as a "Password" type. This will hide its value in the UI, making it suitable for storing secrets like API keys.
- **Dataiku Macros:** For more advanced programmatic control, explore Dataiku Macros, which are Python functions that can be triggered from scenarios to perform complex actions.

### 6. Common Challenges and Solutions
- **Challenge:** "My variable is not being replaced in the recipe."
- **Solution:** Check the syntax carefully. It must be exactly \`\${variable_name}\`. Make sure you saved the variable after creating it and that there are no typos in the name.
- **Challenge:** "How do I manage variables for multiple environments?"
- **Solution:** When you deploy a project using a bundle, the import wizard will prompt you to remap the variables for the new environment. You can define the production values at that time.
`,
  },
  {
    id: 17,
    slug: 'parsing-json-and-nested-data-in-dataiku',
    question: 'How to get started with + parsing JSON and nested data in Dataiku?',
    answer: `
### 1. Introduction/Overview
Data from APIs or NoSQL databases often comes in a nested JSON format. While this is efficient for applications, it's not ideal for analytics. Dataiku provides powerful visual tools in the Prepare recipe to "flatten" or "unnest" this JSON into a standard tabular format (rows and columns).

### 2. Prerequisites
- **A dataset with a JSON column:** You need a dataset where one of the columns contains data as a JSON string or object.
- **Understanding of your JSON structure:** You should know whether your data is a single JSON object or an array of objects.

### 3. Step-by-Step Instructions
1.  **Create a Prepare Recipe:** Start by creating a **Prepare** recipe on your dataset that contains the JSON column.
2.  **Ensure the Column is Parsed as JSON:**
    *   Dataiku will often detect that a column contains JSON and show a special icon.
    *   If it's just a string, click the column header and use the **Parse to JSON** processor first.
3.  **Unnest the JSON:**
    *   Click on the header of the now-parsed JSON column.
    *   From the processor library, choose **Unnest object**.
    *   Dataiku will show a dialog where you can select which nested keys you want to extract into new columns.
    *   You can also specify a prefix for the new column names to avoid naming conflicts.
4.  **Handle Nested Arrays:**
    *   If your JSON contains an array of objects that you want to turn into new rows, use the **Unfold array** processor. This will create a new row for each element in the array.
5.  **Run the Recipe:** After configuring the unnesting, run the recipe to generate the new, flattened dataset.

### 4. Resources and Tools
- **Prepare Recipe Processors:**
    - \`Parse to JSON\`: Converts a JSON string into a native JSON object.
    - \`Unnest object\`: Extracts keys from a JSON object into new columns.
    - \`Flatten object\`: Recursively unnests a deeply nested object.
    - \`Unfold array\`: Creates new rows from a JSON array.
- **Python Recipe:** For extremely complex or malformed JSON, you can always fall back to a Python recipe and use libraries like \`json\` to parse it manually.

### 5. Next Steps and Progression
- **Chained Unnesting:** If you have nested JSON within nested JSON, you can apply the unnesting processors multiple times in sequence.
- **Extracting Single Keys:** If you only need one value from the JSON, you can use the **Formula** processor with the \`get\` function (e.g., \`get(json_column, "key_name")\`).

### 6. Common Challenges and Solutions
- **Challenge:** "The 'Unnest object' processor is greyed out."
- **Solution:** This means Dataiku does not recognize the column as a valid JSON object. You must first apply the **Parse to JSON** processor to the column.
- **Challenge:** "My JSON has an inconsistent schema (some keys are missing in some rows)."
- **Solution:** The \`Unnest object\` processor handles this gracefully. If a key is missing in a particular row, the corresponding new column will simply have a null value for that row.
`,
  },
  {
    id: 18,
    slug: 'feature-engineering-using-formula-steps',
    question: 'How to get started with + feature engineering using formula steps?',
    answer: `
### 1. Introduction/Overview
Feature engineering is the art of creating new, informative features from your existing data to improve model performance. The **Formula** processor in Dataiku's Prepare recipe is a versatile and powerful tool for this task, allowing you to use an Excel-like expression language to create new columns.

### 2. Prerequisites
- **A dataset in a Prepare recipe.**
- **An idea for a new feature:** You should have a hypothesis about what new information could be useful (e.g., "the ratio of two columns," "the length of a text field," "a binary flag for a specific condition").

### 3. Step-by-Step Instructions
1.  **Open a Prepare Recipe:** Select your dataset and create a new **Prepare** recipe.
2.  **Add a Formula Step:**
    *   Click the **+ ADD A NEW STEP** button.
    *   Search for and select the **Formula** processor.
3.  **Write Your Expression:**
    *   The Formula editor opens. In the "Output column" field, give your new feature a name.
    *   In the "Expression" box, write your formula. You can refer to other columns directly by their names.
    *   The syntax is similar to spreadsheet functions. The editor has autocomplete for functions and column names.
4.  **Explore Different Formula Types:**
    *   **Mathematical:** \`(col_A + col_B) / 2\`
    *   **String Manipulation:** \`substring(name_column, 0, 5)\` or \`length(text_column)\`
    *   **Conditional (If/Then):** \`if(category_column == 'A', 'Group1', 'Group2')\`
    *   **Date Functions:** \`diff(date1, date2, "days")\`
5.  **Preview and Run:** The preview pane will instantly show the result of your new feature column. Once satisfied, **Run** the recipe.

### 4. Resources and Tools
- **Formula Processor:** The main tool for this task.
- **Formula Language Documentation:** Click the "?" icon in the Formula editor to see a full list of all available functions. This is an essential reference.
- **Visual Analysis Lab:** Use the "Correlation Matrix" or "Feature Importance" in the modeling lab to see if your newly engineered feature is actually predictive.

### 5. Next Steps and Progression
- **Chained Formulas:** You can create complex features by using the output of one Formula step as an input to another.
- **Advanced Functions:** Explore powerful functions like \`dummify\` (for one-hot encoding), \`greatest\` (to find the max of several columns), or \`floor\` and \`ceil\` for rounding.
- **Regular Expressions:** Combine formulas with conditional functions that use \`match\` to create features based on complex text patterns.

### 6. Common Challenges and Solutions
- **Challenge:** "My formula has an error."
- **Solution:** The editor will highlight syntax errors. The most common issues are mismatched parentheses or incorrect function names. Use the function reference to double-check the syntax.
- **Challenge:** "The formula is giving a wrong data type."
- **Solution:** You may need to explicitly convert types within the formula using functions like \`toNumber()\` or \`toString()\`. For example, \`toNumber(string_column) * 2\`.
`,
  },
  {
    id: 19,
    slug: 'implementing-fuzzy-joins-in-dataiku',
    question: 'How to get started with + implementing fuzzy joins in Dataiku?',
    answer: `
### 1. Introduction/Overview
A standard join requires an exact match on the join key. But what if your keys are messy due to typos or different naming conventions (e.g., "Dataiku" vs. "Dataiku, Inc.")? A **Fuzzy Join** solves this problem by joining records that are "similar" but not identical. Dataiku provides a dedicated visual recipe for this powerful technique.

### 2. Prerequisites
- **Two datasets to join:** One "left" and one "right" dataset.
- **A messy join key:** The column you want to join on should have similar but inconsistent values in the two datasets.

### 3. Step-by-Step Instructions
1.  **Select the Fuzzy Join Recipe:**
    *   In your Flow, select your "left" dataset.
    *   From the right-hand panel, click **+ RECIPE** and search for **Fuzzy Join**.
    *   Select the "right" dataset you want to join with.
2.  **Configure the Join:**
    *   In the Fuzzy Join recipe screen, select the key columns from both the left and right datasets.
    *   **Choose a Similarity Metric:** This is the core of the fuzzy join. Common choices include:
        *   \`Levenshtein\`: Measures the number of edits (inserts, deletes, substitutions) needed to change one string to the other. Good for typos.
        *   \`Jaccard\`: Measures the similarity of word sets. Good for different word orders.
    *   **Set a Threshold:** Define a similarity score (e.g., 0.8) above which two values will be considered a match.
3.  **Preview the Matches:** The recipe will show a preview of the matches it found based on your settings. You can adjust the metric and threshold to fine-tune the results.
4.  **Select Output Columns:** As in a normal join, choose which columns from both datasets to keep.
5.  **Run the Recipe:** Click **Run** to perform the fuzzy join and create the output dataset.

### 4. Resources and Tools
- **Fuzzy Join Recipe:** The dedicated visual recipe for this task.
- **Prepare Recipe:** It's often a good practice to use a Prepare recipe *before* the fuzzy join to standardize the key columns as much as possible (e.g., convert to lowercase, remove punctuation). This improves the quality of the fuzzy match.

### 5. Next Steps and Progression
- **Experiment with Metrics:** Try different similarity metrics to see which one works best for your specific data.
- **Stemming/Normalization:** In the recipe settings, you can enable text normalization options like stemming (reducing words to their root form), which can further improve match quality.
- **Manual Review:** For critical applications, you may want to create a process to manually review the matches found by the fuzzy join.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm getting too many incorrect matches."
- **Solution:** Your threshold is too low. Increase the similarity threshold (e.g., from 0.7 to 0.9) to require a closer match.
- **Challenge:** "I'm missing some obvious matches."
- **Solution:** Your threshold might be too high, or you're using the wrong metric. Try lowering the threshold or switching to a different similarity algorithm. Also, make sure you've pre-processed the keys to remove noise.
`,
  },
  {
    id: 20,
    slug: 'handling-missing-values-via-recipes',
    question: 'How to get started with + handling missing values via recipes?',
    answer: `
### 1. Introduction/Overview
Missing values (or nulls) are a common problem in real-world data and can cause issues for analysis and modeling. Dataiku's **Prepare recipe** provides a comprehensive set of tools to identify, remove, or intelligently fill in (impute) these missing values.

### 2. Prerequisites
- **A dataset with missing values:** You need a dataset where some cells are empty.
- **A strategy:** Decide how you want to handle the nulls. Your strategy might be different for different columns.

### 3. Step-by-Step Instructions
1.  **Open a Prepare Recipe:** Create a **Prepare** recipe on your dataset.
2.  **Identify Missing Values:** Dataiku's data quality bars at the top of each column immediately show you the percentage of empty values.
3.  **Choose a Handling Strategy and Processor:**
    *   **Strategy 1: Remove Rows with Missing Values**
        *   Click the header of the column with nulls.
        *   Choose the **Remove rows where value is empty** processor. Use this carefully, as it can lead to significant data loss if many rows have missing values.
    *   **Strategy 2: Fill (Impute) Missing Values**
        *   Click the column header.
        *   Choose the **Impute missing values** processor.
        *   You can then choose how to fill the nulls:
            *   **For Numerical Columns:** With the column's \`Mean\`, \`Median\`, \`Mode\`, or a \`Constant\` value (like 0).
            *   **For Categorical Columns:** With the column's \`Mode\` or a \`Constant\` value (like "Missing").
    *   **Strategy 3: Create an Indicator Column**
        *   Sometimes, the fact that a value is missing is itself useful information.
        *   Use the **Create indicator for missing values** processor. This will create a new binary (0/1) column that flags which rows had a null in the original column.

4.  **Apply and Run:** Add the desired processor steps and click **Run** to create the cleaned dataset.

### 4. Resources and Tools
- **Prepare Recipe:** The central location for all missing value handling tools.
- **Data Quality Bars:** Provide a quick visual guide to which columns need attention.
- **Analyze Tool:** In a dataset, the "Analyze" feature can give you more detailed statistics on missing values.

### 5. Next Steps and Progression
- **Advanced Imputation:** For more sophisticated imputation, you can use a Python recipe to implement algorithms like k-Nearest Neighbors (k-NN) imputation or model-based imputation.
- **Column-Specific Strategies:** Apply different imputation strategies to different columns based on their meaning and distribution.
- **Combining Strategies:** You can first create an indicator column and then impute the missing values, preserving the information about which values were originally missing.

### 6. Common Challenges and Solutions
- **Challenge:** "Which imputation method should I choose for a numerical column?"
- **Solution:** If the data has a normal distribution, \`Mean\` is often fine. If the data is skewed or has outliers, \`Median\` is more robust and generally a safer choice.
- **Challenge:** "After imputation, my model performance got worse."
- **Solution:** Simple imputation can sometimes distort the original data distribution. Try a different method or consider using a model that can handle missing values natively (like LightGBM). Creating an indicator column is often a good strategy.
`,
  },
  {
    id: 21,
    slug: 'using-automl-in-dataiku-dss',
    question: 'How to get started with + using AutoML in Dataiku DSS?',
    answer: `
### 1. Introduction/Overview
AutoML (Automated Machine Learning) in Dataiku empowers you to build powerful predictive models without writing complex code. It automates the tedious parts of modeling, such as feature handling, algorithm selection, and hyperparameter tuning, allowing you to focus on interpreting the results.

### 2. Prerequisites
- **A clean, prepared dataset:** Your dataset should be in a "tidy" format, with rows representing observations and columns representing features. The target variable (what you want to predict) must be one of the columns.
- **A clear prediction goal:** Know whether you are solving a **Classification** problem (predicting a category, e.g., "churn" or "no churn") or a **Regression** problem (predicting a number, e.g., "price").

### 3. Step-by-Step Instructions
1.  **Launch the Visual Analysis Lab:**
    *   In your Flow, select your prepared dataset.
    *   From the right-hand panel, click **Lab**.
    *   Click **+ NEW ANALYSIS**.
2.  **Select the Task and Target:**
    *   Choose **Prediction**.
    *   Select the column you want to predict as your **Target variable**.
    *   Dataiku will automatically detect if it's a classification or regression task based on the target's type.
3.  **Design the Model:**
    *   Navigate to the **Design** tab. Here you can configure feature handling, select which algorithms to train, and set the evaluation metric.
    *   For your first time, the default settings are excellent.
4.  **Train the Models:** Click the **Train** button. Dataiku's AutoML engine will now:
    *   Preprocess the features (e.g., one-hot encode categoricals, scale numerics).
    *   Train multiple different algorithms (like Logistic Regression, Random Forest, Gradient Boosted Trees).
    *   Tune their hyperparameters.
5.  **Analyze the Results:**
    *   Once training is complete, the **Results** tab will show a leaderboard of all trained models, ranked by performance.
    *   Click on a model to explore its details, including feature importance, confusion matrices, and performance charts.

### 4. Resources and Tools
- **Visual Analysis Lab:** The dedicated interface for AutoML in Dataiku.
- **Model Leaderboard:** The main results view for comparing different models.
- **Dataiku Academy:** The "Machine Learning Basics" learning path is a perfect introduction.

### 5. Next Steps and Progression
- **Deploy a Model:** Select the best-performing model from the leaderboard and click **Deploy**. This creates a "Saved Model" object in your Flow, ready for scoring new data.
- **Tune Hyperparameters:** For any model, you can go back to the Design tab and manually adjust its hyperparameters to try and improve performance.
- **Interactive Scoring:** Use the "What-If" analysis on the model results page to see how changing input features affects the prediction for a single record.

### 6. Common Challenges and Solutions
- **Challenge:** "My model performance is poor."
- **Solution:** The most common reason is not the model, but the features. Go back to your data preparation and try to engineer more informative features.
- **Challenge:** "Training is taking too long."
- **Solution:** In the Design tab, you can reduce the number of algorithms to train or use simpler, faster models like Logistic Regression. You can also work with a smaller sample of your data for faster iteration.
`,
  },
  {
    id: 22,
    slug: 'building-a-random-forest-classifier-visually',
    question: 'How to get started with + building a random forest classifier visually?',
    answer: `
### 1. Introduction/Overview
A Random Forest is a powerful and popular machine learning algorithm for classification. In Dataiku, you can train, evaluate, and tune a Random Forest model using a completely visual interface, making it accessible even without deep coding knowledge.

### 2. Prerequisites
- **A prepared dataset for classification:** This means a clean dataset with a categorical target variable (the column you want to predict).
- **A Visual Analysis created:** You should have already started a new prediction analysis in the Lab, with your target variable selected.

### 3. Step-by-Step Instructions
1.  **Navigate to the Model Design:** In the Visual Analysis Lab, click on the **Design** tab.
2.  **Select the Algorithm:**
    *   Go to the **Algorithms** section.
    *   By default, Dataiku selects a few common algorithms. You can uncheck the others and ensure that **Random Forest** is checked.
3.  **(Optional) Tune Hyperparameters:**
    *   Click on the "Random Forest" algorithm to open its settings.
    *   Here you can adjust key hyperparameters:
        *   \`Number of trees\`: The number of decision trees to build. More trees are generally better but take longer to train.
        *   \`Max depth\`: The maximum depth of each tree. Controls model complexity.
        *   \`Min samples per leaf\`: The minimum number of samples required to be at a leaf node.
    *   For a first attempt, the default values are usually a good starting point.
4.  **Train the Model:** Click the **Train** button at the top right. Dataiku will now train the Random Forest model on your data.
5.  **Review the Results:**
    *   Once training is complete, click on the "Random Forest" model in the results list.
    *   Explore its performance: check the **ROC Curve**, **Confusion Matrix**, and **Feature Importance** to understand how it works and how well it performs.

### 4. Resources and Tools
- **Algorithms Panel:** In the Design tab, this is where you select and configure the models to be trained.
- **Model Results Page:** The dashboard for deep-diving into the performance and explainability of your trained model.

### 5. Next Steps and Progression
- **Compare to Other Models:** Train other algorithms (like Logistic Regression or Gradient Boosted Trees) at the same time to see if Random Forest is truly the best choice for your problem.
- **Deploy the Model:** If you are happy with its performance, click the **Deploy** button to create a usable model object in your Flow.
- **Grid Search:** For more advanced tuning, you can enable "Grid Search" on the algorithm to have Dataiku systematically test multiple combinations of hyperparameters to find the best ones.

### 6. Common Challenges and Solutions
- **Challenge:** "My model is overfitting (performs well on training data but poorly on test data)."
- **Solution:** Your model is too complex. Try reducing the \`Max depth\` of the trees or increasing the \`Min samples per leaf\`. This will make the model simpler and more generalizable.
- **Challenge:** "I don't understand what the feature importances mean."
- **Solution:** Feature importance shows which variables the model relied on most to make its predictions. High-importance features are the most influential drivers of the outcome.
`,
  },
  {
    id: 23,
    slug: 'building-regression-models-in-dataiku-dss',
    question: 'How to get started with + building regression models in Dataiku DSS?',
    answer: `
### 1. Introduction/Overview
Regression is a type of machine learning used to predict a continuous numerical value, such as a price, a sales forecast, or a temperature. Dataiku's AutoML capabilities make it straightforward to build, compare, and deploy various regression models visually.

### 2. Prerequisites
- **A prepared dataset for regression:** You need a dataset where your target variable (the column you want to predict) is numerical.
- **A clear business question:** Understand what numerical value you are trying to predict and why.

### 3. Step-by-Step Instructions
1.  **Launch a New Analysis:**
    *   In your Flow, select your prepared dataset.
    *   Click **Lab > + NEW ANALYSIS**.
2.  **Select the Regression Task:**
    *   Choose **Prediction**.
    *   Select your numerical target variable. Dataiku will automatically recognize this as a **Regression** task.
3.  **Design and Train:**
    *   Go to the **Design** tab. In the **Algorithms** section, you will see that Dataiku has pre-selected common regression models like \`Ridge Regression\`, \`Random Forest Regression\`, and \`Gradient Boosted Regression\`.
    *   For your first time, the defaults are fine. Click **Train**.
4.  **Evaluate the Results:**
    *   After training, the Results tab will show a leaderboard of your models.
    *   For regression, the key metrics are different from classification. Look for:
        *   **R² (R-squared):** Represents the proportion of the variance in the dependent variable that is predictable from the independent variable(s). Higher is better.
        *   **RMSE (Root Mean Squared Error):** Measures the average magnitude of the errors. Lower is better.
5.  **Analyze a Specific Model:** Click on a model (e.g., Random Forest Regression) to see more details, including feature importance and error distribution plots.

### 4. Resources and Tools
- **Visual Analysis Lab:** The same tool used for classification, which automatically adapts to regression tasks.
- **Regression Metrics:** Understand the meaning of R², RMSE, and MAE (Mean Absolute Error) to correctly evaluate your models.
- **Dataiku Academy:** The "Machine Learning Basics" courses cover regression concepts.

### 5. Next Steps and Progression
- **Feature Engineering:** If your models have low R² values, the most effective way to improve them is often by creating better features in a Prepare recipe.
- **Model Tuning:** Adjust the hyperparameters of the algorithms in the Design tab to see if you can improve the RMSE.
- **Deploy and Score:** Deploy your best model to the Flow and use a **Score** recipe to predict values for a new dataset.

### 6. Common Challenges and Solutions
- **Challenge:** "My model's predictions are not very accurate (high RMSE)."
- **Solution:** This is the central challenge of modeling. First, ensure your features are relevant. Try engineering new features. Also, make sure you have enough data. Finally, experiment with more complex models like Gradient Boosted Trees.
- **Challenge:** "The feature importance list doesn't make business sense."
- **Solution:** This could indicate a data leakage problem, where a feature that is a proxy for the answer has snuck into your training data. Carefully review your features to ensure they are all things you would know *before* the event you are trying to predict.
`,
  },
  {
    id: 24,
    slug: 'evaluating-models-roc-f1-precision-recall',
    question: 'How to get started with + evaluating models (ROC, F1, precision/recall)?',
    answer: `
### 1. Introduction/Overview
Building a model is easy; knowing if it's a *good* model is the hard part. Model evaluation involves using specific metrics to measure a model's performance. For classification models, the most important metrics are often Precision, Recall, F1-Score, and the ROC AUC. Dataiku calculates and visualizes these automatically.

### 2. Prerequisites
- **A trained classification model:** You need to have trained at least one classifier in the Visual Analysis Lab.
- **Basic understanding of classification concepts:** Know the difference between True Positives, False Positives, True Negatives, and False Negatives.

### 3. Step-by-Step Instructions
1.  **Navigate to Model Results:** After training a model, go to the **Results** tab in the Visual Analysis Lab and click on your model.
2.  **Analyze the Confusion Matrix:**
    *   Go to the **Performance** section. The **Confusion Matrix** is a key visualization. It shows you:
        *   How many positive cases were correctly predicted (True Positives).
        *   How many negative cases were incorrectly predicted as positive (False Positives).
3.  **Understand Precision and Recall:**
    *   **Precision:** Of all the predictions your model made for the positive class, how many were actually correct? (TP / (TP + FP)). High precision means a low false positive rate.
    *   **Recall (Sensitivity):** Of all the actual positive cases in your data, how many did your model find? (TP / (TP + FN)). High recall means a low false negative rate.
    *   Dataiku displays these values next to the confusion matrix. You'll notice there is often a trade-off between them.
4.  **Use the F1-Score:**
    *   The **F1-Score** is the harmonic mean of Precision and Recall. It provides a single score that balances both metrics. It's a very common metric for comparing classifiers.
5.  **Examine the ROC Curve:**
    *   Go to the **ROC Curve** tab. This plot shows the model's performance across all possible probability thresholds.
    *   The **AUC (Area Under the Curve)** is a single number that summarizes the curve. An AUC of 1.0 is a perfect model, while an AUC of 0.5 is no better than random guessing. It's one of the most important metrics for overall model quality.

### 4. Resources and Tools
- **Model Performance Tab:** The central place in Dataiku for all evaluation metrics and charts.
- **Interactive Threshold Adjustment:** In the confusion matrix view, you can drag the probability threshold slider to see how it affects precision and recall in real-time.

### 5. Next Steps and Progression
- **Choose the Right Metric:** The best metric depends on your business problem. Is it worse to have a false positive or a false negative? This will determine whether you should optimize for precision or recall.
- **Compare Models:** Use the AUC and F1-Score on the main results leaderboard to compare different algorithms.
- **Profit Curves:** Explore the "Cost Matrix" and "Profit Curve" sections in Dataiku to perform evaluation based on the business cost/benefit of correct and incorrect predictions.

### 6. Common Challenges and Solutions
- **Challenge:** "My model has high precision but low recall."
- **Solution:** This is a common trade-off. Your model is being very conservative. To increase recall, you can try lowering the probability threshold for classifying a positive case, but this will likely decrease precision.
- **Challenge:** "What is a 'good' AUC score?"
- **Solution:** This is highly context-dependent. Generally, > 0.9 is excellent, > 0.8 is great, > 0.7 is good, and < 0.6 is poor. But for a very difficult problem, an AUC of 0.7 could be a major success.
`,
  },
  {
    id: 25,
    slug: 'extracting-feature-importance-from-model-runs',
    question: 'How to get started with + extracting feature importance from model runs?',
    answer: `
### 1. Introduction/Overview
After training a model, one of the most important questions is: "What did it learn?" **Feature Importance** helps answer this by showing which input variables had the most influence on the model's predictions. This is crucial for model explainability and for gaining business insights.

### 2. Prerequisites
- **A trained model:** You need a trained model in the Visual Analysis Lab. Most model types (trees, linear models, etc.) support feature importance.

### 3. Step-by-Step Instructions
1.  **Navigate to the Model Results:** In the Visual Analysis Lab, go to the **Results** tab and click on the specific model you want to analyze.
2.  **Open the Feature Importance View:** In the model's detail view, click on the **Feature Importance** tab.
3.  **Interpret the Chart:**
    *   You will see a bar chart listing the features (your input columns) on the y-axis.
    *   The length of the bar on the x-axis represents the importance or weight of that feature.
    *   The features are ranked from most important at the top to least important at the bottom.
4.  **Understand the Method:** The method used to calculate importance depends on the model. For tree-based models like Random Forest, it's often based on "Gini impurity" or "information gain." For linear models, it's based on the coefficient weights.
5.  **Use the Insights:** This chart tells you which factors are the primary drivers of the outcome you are predicting. This can be a valuable insight for business stakeholders, even independent of the model itself.

### 4. Resources and Tools
- **Feature Importance Tab:** The dedicated view for this analysis within the model results page.
- **SHAP Explanations:** For more advanced, instance-level explanations, explore the **Individual Explanations** tab, which uses SHAP values.

### 5. Next Steps and Progression
- **Feature Selection:** If you have a very large number of features, you can use the feature importance results to select only the top N most important features and retrain your model. This can sometimes lead to a simpler, faster, and even more robust model.
- **Compare Across Models:** Look at the feature importance for different algorithms. Do they agree on which features are most important? This can increase your confidence in the results.
- **Present to Stakeholders:** The feature importance chart is an excellent, easy-to-understand visual to share with business users to explain what your model has learned.

### 6. Common Challenges and Solutions
- **Challenge:** "A feature I thought would be important has very low importance."
- **Solution:** This is a common and often insightful result. It may be that the feature is highly correlated with another, more important feature (so its effect is redundant), or it simply may not be as predictive as you thought.
- **Challenge:** "The feature names are hard to read (e.g., after one-hot encoding)."
- **Solution:** Dataiku's chart is interactive. You can hover over the feature names to see the full name. The naming convention \`dummy:column_name:value\` indicates a feature created by one-hot encoding.
`,
  },
  {
    id: 26,
    slug: 'implementing-cross‑validation-and-a-b-tests',
    question: 'How to get started with + implementing cross‑validation and A/B tests?',
    answer: `
### 1. Introduction/Overview
This guide covers two distinct but related validation techniques: **Cross-validation**, used during model training to get a robust estimate of performance, and **A/B testing**, used after deployment to compare two model versions in a live environment.

### 2. Prerequisites
- **For Cross-Validation:** A dataset ready for modeling in Dataiku's Visual Analysis Lab.
- **For A/B Testing:** Two different trained and deployed models in your Flow that you want to compare.

### 3. Step-by-Step Instructions
#### Part A: Cross-Validation (During Training)
1.  **Open the Model Design:** In the Visual Analysis Lab, go to the **Design** tab.
2.  **Configure the Validation Strategy:**
    *   Find the **Train / Test Set** section.
    *   The default is a simple train/test split. To use cross-validation, change the **Splitting strategy** to **K-fold cross-validation**.
3.  **Set the Number of Folds (K):**
    *   Choose the number of folds (e.g., 5 or 10). A higher number is more robust but takes longer.
4.  **Train the Model:** When you click **Train**, Dataiku will now perform k-fold cross-validation. It will split your data into k-folds, then train and evaluate the model k times, each time holding out a different fold for testing.
5.  **Review the Results:** The performance metrics you see on the results page will be the *average* performance across all k-folds, giving you a more reliable estimate of how the model will perform on unseen data.

#### Part B: A/B Testing (Post-Deployment)
1.  **Deploy Two Models:** You need two "Saved Model" objects in your Flow. These can be two different algorithms or two different versions of the same algorithm. Let's call them \`model_A\` and \`model_B\`.
2.  **Deploy as API Endpoints:** Deploy both models to the **API Deployer** as two separate endpoints within the same API service.
3.  **Set Up Traffic Splitting:** In the API service settings, you can configure the endpoint to function as a "Champion/Challenger".
    *   Set \`model_A\` as the champion and \`model_B\` as the challenger.
    *   Route a percentage of traffic to each (e.g., 90% to A, 10% to B).
4.  **Monitor Performance:** The API Deployer will log the requests and performance for each model version separately. By analyzing these logs, you can compare their live performance and decide which one is superior.

### 4. Resources and Tools
- **Model Design Tab:** Where you configure the cross-validation strategy.
- **API Deployer:** The service used for deploying models and setting up A/B tests (Champion/Challenger).

### 5. Next Steps and Progression
- **Stratified K-Fold:** For classification with imbalanced classes, Dataiku automatically uses stratified k-fold to ensure each fold has a similar class distribution.
- **Gradual Rollout:** For A/B testing, you can start with a 99%/1% split and gradually increase the traffic to the challenger model as you gain confidence in its performance.

### 6. Common Challenges and Solutions
- **Challenge:** "Cross-validation is taking a very long time."
- **Solution:** Reduce the number of folds (K) or the number of algorithms you are training. CV is computationally intensive by design.
- **Challenge:** "How do I analyze the A/B test results?"
- **Solution:** You will need to capture the prediction logs from the API node and join them with the actual outcomes (ground truth). This allows you to calculate accuracy, business KPIs, and other metrics for both model A and model B to determine the winner.
`,
  },
  {
    id: 27,
    slug: 'training-deep-learning-models-using-notebooks',
    question: 'How to get started with + training deep learning models using notebooks?',
    answer: `
### 1. Introduction/Overview
For cutting-edge tasks in computer vision or NLP, you'll often need Deep Learning. While Dataiku's visual tools focus on tabular data, its code-based tools like **Jupyter Notebooks** and **Code Recipes** provide a perfect environment for training deep learning models with frameworks like TensorFlow or PyTorch.

### 2. Prerequisites
- **A Deep Learning Code Environment:** You need a code environment configured with the necessary libraries (\`tensorflow\`, \`pytorch\`, \`transformers\`, etc.) and a Python version they support. This may require a GPU-enabled environment for acceptable performance.
- **Your Data:** Your training data (e.g., images, text files) should be accessible to Dataiku, for example, in a managed folder.
- **Python and Deep Learning Knowledge:** You should be familiar with the basics of the chosen framework (e.g., Keras/TensorFlow).

### 3. Step-by-Step Instructions
1.  **Create a Code Environment:**
    *   Go to **Administration > Code Envs** and create a new environment.
    *   Add \`tensorflow\` or \`pytorch\` and other required packages to the list of packages to install.
2.  **Create a Jupyter Notebook:** In your project, go to **Notebooks > + New Notebook > Python**. Make sure to select your new deep learning code environment for this notebook.
3.  **Load Your Data:** Use the Dataiku API to get the paths to your data. For image data in a managed folder, you can get a list of file paths.
    > \`\`\`python
    > import dataiku
    > # Get handle on folder and list paths
    > folder = dataiku.Folder("my_images_folder")
    > image_paths = folder.list_paths_in_partition()
    > \`\`\`
4.  **Write Your Training Code:** Write your standard TensorFlow/Keras or PyTorch code in the notebook cells. This includes:
    *   Creating data generators to load and preprocess the data.
    *   Defining your neural network architecture.
    *   Compiling the model and running the training loop (\`model.fit()\`).
5.  **Save the Trained Model:** After training, save the model's weights and architecture to a new managed folder so it can be reused later.
    > \`\`\`python
    > # Save the model
    > model.save("model_architecture.h5")
    > # Write to a Dataiku managed folder
    > output_folder = dataiku.Folder("trained_model_folder")
    > with open("model_architecture.h5", "rb") as f:
    >     output_folder.upload_stream("model.h5", f)
    > \`\`\`
### 4. Resources and Tools
- **Code Environments:** The key to managing your complex deep learning dependencies.
- **Managed Folders:** The standard way to store unstructured data like images and model files in Dataiku.
- **Python Notebooks:** The interactive environment for developing and running your training code.

### 5. Next Steps and Progression
- **GPU Acceleration:** For serious deep learning, work with your administrator to set up a code environment that can run on a machine with GPUs.
- **Productionize in a Recipe:** Once your notebook code is stable, move it into a **Python recipe** to make it a repeatable, schedulable part of your Flow.
- **Custom Model Plugin:** For advanced integration, you can wrap your deep learning model in a custom model plugin, allowing it to be evaluated and deployed like a standard Dataiku visual model.

### 6. Common Challenges and Solutions
- **Challenge:** "Training is extremely slow."
- **Solution:** Deep learning without a GPU is often impractical. You must ensure your code environment is configured to run on a GPU-enabled node.
- **Challenge:** "Dependency conflicts or CUDA errors."
- **Solution:** Deep learning libraries have very specific dependencies (e.g., specific CUDA and cuDNN versions). It is critical to build your code environment carefully, ensuring all package versions are compatible. This can be a complex task that requires collaboration with a Dataiku admin.
`,
  },
  {
    id: 28,
    slug: 'integrating-scikit‑learn-and-tensorflow-in-dataiku',
    question: 'How to get started with + integrating scikit‑learn and TensorFlow in Dataiku?',
    answer: `
### 1. Introduction/Overview
Dataiku is not a closed black box; it's an open platform designed to integrate with the most popular data science libraries. Scikit-learn is the engine behind Dataiku's visual machine learning, and both it and TensorFlow can be used directly in code for maximum flexibility and power.

### 2. Prerequisites
- **A Code Environment:** You must have a code environment set up with the desired versions of \`scikit-learn\` and \`tensorflow\`.
- **Familiarity with the Libraries:** You should know how to use these libraries in a standard Python environment.

### 3. Step-by-Step Instructions: Integration Methods

#### Method 1: Using Them in Visual ML (Scikit-learn)
- **What it is:** Dataiku's AutoML features (in the Visual Analysis Lab) are built on top of Scikit-learn.
- **How to use:** When you visually train a Random Forest or Logistic Regression, you are already using Scikit-learn. You can even add a custom Python model to the visual lab that uses Scikit-learn code.
- **Best for:** Standard tabular machine learning, rapid prototyping, and model comparison.

#### Method 2: Using Them in a Python Recipe or Notebook
- **What it is:** This gives you complete control to write your own custom code using these libraries.
- **How to use:**
    1.  Create a new **Python Recipe** or **Jupyter Notebook**.
    2.  Ensure it is configured to use your code environment that contains \`scikit-learn\` or \`tensorflow\`.
    3.  Use the \`dataiku\` Python library to read your dataset into a Pandas DataFrame.
    4.  Write your standard Scikit-learn or TensorFlow code to process the DataFrame, train a model, and generate predictions.
    5.  Use the \`dataiku\` library to write the results (e.g., a DataFrame with predictions, or a saved model file) back to a Dataiku dataset or managed folder.
- **Best for:** Custom algorithms, deep learning, complex pre-processing pipelines, or when you need a specific feature not available in the visual interface.

### 4. Resources and Tools
- **Code Environments:** Essential for managing your dependencies. You can have one environment for general Scikit-learn tasks and another for a specific TensorFlow version.
- **Dataiku Python API:** The bridge that connects your custom code to the Dataiku Flow.
- **Official Library Documentation:** The Scikit-learn and TensorFlow websites are the ultimate source for how to use their functions.

### 5. Next Steps and Progression
- **Custom Model Plugins:** Wrap your Scikit-learn model in a custom plugin to make it fully integrated with Dataiku's evaluation and deployment framework.
- **GPU Environments:** For TensorFlow, work with your admin to set up a GPU-enabled code environment for performant training.
- **API Deployment:** Deploy your custom-coded model as a real-time API using the API Deployer.

### 6. Common Challenges and Solutions
- **Challenge:** "Import Error: My library is not found."
- **Solution:** The most common issue. Double-check that your recipe/notebook is using the correct code environment and that the library (with the correct version) is listed in that environment's installed packages.
- **Challenge:** "How do I save my trained TensorFlow model?"
- **Solution:** Use the standard \`model.save()\` method from Keras. Then, write the resulting model file (e.g., an \`.h5\` file) into a Dataiku **Managed Folder**, which is the correct place to store binary artifacts.
`,
  },
  {
    id: 29,
    slug: 'deploying-ml-models-inside-dataiku',
    question: 'How to get started with + deploying ML models inside Dataiku?',
    answer: `
### 1. Introduction/Overview
"Deploying" a model means moving it from the experimental phase (in the lab) to a stable, versioned artifact in your Flow that can be used to make predictions on new data. This is a critical step in productionizing your machine learning work. Dataiku makes this process simple and traceable.

### 2. Prerequisites
- **A trained model:** You need a model that you have trained and evaluated in the Visual Analysis Lab.
- **You have selected the "best" model:** From the results leaderboard, you should have identified the model you want to deploy.

### 3. Step-by-Step Instructions
1.  **Find the Deploy Button:**
    *   In the Visual Analysis Lab, go to the **Results** tab.
    *   Select the model you wish to deploy from the list.
    *   In the top right corner, you will see a blue **Deploy** button. Click it.
2.  **Create the Saved Model:**
    *   A dialog will appear. It will ask you to name the new "Saved Model" that will be created in your Flow.
    *   Click **CREATE**.
3.  **View the Deployed Model in the Flow:**
    *   Go back to your project's Flow. You will now see a new, green, diamond-shaped object. This is your **Saved Model**. It contains the trained model, its configuration, and its version.
4.  **Use the Deployed Model for Scoring:**
    *   Now that the model is deployed, you can use it.
    *   Bring a new dataset into your Flow that has the same schema as your training data (but without the target column).
    *   Select this new dataset, and from the right-hand panel, choose the **Score** recipe.
    *   Select your Saved Model as the model to use.
    *   Run the Score recipe. The output will be a new dataset containing the original data plus new columns for the predictions and probabilities.

### 4. Resources and Tools
- **Saved Model Object:** The versioned, governed artifact in the Flow that represents your deployed model.
- **Score Recipe:** The visual recipe used to apply a Saved Model to a new dataset for batch predictions.
- **API Deployer:** The service used to deploy a Saved Model as a real-time REST API endpoint.

### 5. Next Steps and Progression
- **Versioning:** If you retrain your model, you can deploy the new version to the *same* Saved Model object. This creates a new version, and you can easily switch between them or compare their performance.
- **Monitoring:** Once deployed, set up monitoring on your Saved Model using the "Model Views" to track performance and data drift over time.
- **Real-time Deployment:** Take your Saved Model and deploy it to the API Deployer to get a live REST API for on-demand predictions.

### 6. Common Challenges and Solutions
- **Challenge:** "The Score recipe failed with a schema mismatch."
- **Solution:** The columns in your new dataset do not match the columns the model was trained on. Ensure the column names and types are identical. You may need to apply the same **Prepare** recipe to your new data that you used on your training data.
- **Challenge:** "I've retrained my model. How do I update the one in the Flow?"
- **Solution:** Go back to the lab, find your new model version, and click **Deploy** again. In the dialog, choose to "Update existing" and select your original Saved Model. This will add the new model as a new version.
`,
  },
  {
    id: 30,
    slug: 'monitoring-model-performance-over-time',
    question: 'How to get started with + monitoring model performance over time?',
    answer: `
### 1. Introduction/Overview
A model's performance is not static; it can degrade over time as the real world changes. This is called "model drift." Monitoring your deployed models is essential to detect this degradation and know when it's time to retrain. Dataiku provides built-in tools for automated performance and data drift monitoring.

### 2. Prerequisites
- **A deployed "Saved Model":** You need a model that has been deployed to your Flow.
- **New Labeled Data:** You need ongoing access to new data that includes the actual outcomes (the "ground truth") to compare against your model's predictions.

### 3. Step-by-Step Instructions
1.  **Open the Saved Model:** In your Flow, double-click on your green "Saved Model" object.
2.  **Explore Model Views:** On the left panel, you'll see "Model Views." This is the hub for monitoring.
3.  **Set Up Data Drift Monitoring:**
    *   Click on **Drift Analysis**.
    *   Click **Compute** to analyze the statistical drift between your original training data and a new dataset.
    *   This will show you which input features have changed distribution the most, which can be an early warning sign of problems.
4.  **Set Up Performance Monitoring (using an Evaluation Recipe):**
    *   In your Flow, you need a dataset that contains both the model's predictions and the actual outcomes.
    *   Select this dataset and choose the **Evaluate** recipe from the right-hand panel.
    *   Configure the recipe, telling it which columns contain the prediction and which contain the actuals.
5.  **Automate Monitoring with a Scenario:**
    *   Create a scenario that runs periodically (e.g., weekly).
    *   **Step 1:** Build your latest input data.
    *   **Step 2:** Run a **Score** recipe to get fresh predictions.
    *   **Step 3:** Run your **Evaluate** recipe to generate the latest performance metrics.
    *   **Step 4:** Add a "Run checks" step on your Saved Model to check for performance degradation or data drift.
    *   **Step 5:** Configure a reporter to send an alert if any checks fail.

### 4. Resources and Tools
- **Saved Model Views:** The central UI for drift analysis and performance history.
- **Evaluate Recipe:** The tool for calculating performance metrics on new data.
- **Scenarios:** The engine for automating the entire monitoring process.

### 5. Next Steps and Progression
- **Custom Checks:** Define custom checks, such as "AUC must be greater than 0.8" or "Drift score for feature 'X' must be less than 0.2".
- **Dashboards:** Publish the metrics from your Evaluate recipe to a dashboard to create a visual history of your model's performance over time.
- **Automated Retraining:** If your monitoring scenario detects a significant performance drop, it can automatically trigger another scenario to retrain and redeploy the model.

### 6. Common Challenges and Solutions
- **Challenge:** "I don't have the actual outcomes (ground truth) right away."
- **Solution:** This is common. Your monitoring pipeline will have a delay. You'll need to store your model's predictions and then join them with the ground truth data whenever it becomes available, before running the Evaluate recipe.
- **Challenge:** "What does a high drift score mean?"
- **Solution:** It means the statistical distribution of an input feature in your new data is significantly different from the data the model was trained on. The model may not make reliable predictions on this new data because it looks different from what it has seen before.
`,
  },
  {
    id: 31,
    slug: 'building-scenarios-in-dataiku-dss',
    question: 'How to get started with + building Scenarios in Dataiku DSS?',
    answer: `
### 1. Introduction/Overview
A Scenario is an automated sequence of actions in Dataiku. It's the tool you use to productionize your Flow, allowing you to schedule jobs, run tests, send alerts, and orchestrate complex pipelines. Building a basic scenario is a fundamental skill for any Dataiku developer.

### 2. Prerequisites
- **A Dataiku project with a Flow:** You need something to automate, like a data pipeline that builds a final dataset or a model that needs to be retrained.
- **A clear goal:** Know what you want to automate (e.g., "rebuild my final report dataset every morning").

### 3. Step-by-Step Instructions
1.  **Navigate to the Scenarios Page:** In your project's top navigation bar, click on **Scenarios**.
2.  **Create a New Scenario:**
    *   Click **+ NEW SCENARIO**.
    *   Give your scenario a descriptive name, like \`Daily_Report_Build\`.
3.  **Define the Steps:**
    *   Go to the **Steps** tab. This is where you define what the scenario does.
    *   Click **+ ADD STEP**.
    *   The most common step is **Build / Train**. Select this.
    *   In the step's configuration, click **+ ADD** and choose the dataset(s) or model(s) you want to build. **Best practice:** Only add the *final* outputs. Dataiku will automatically figure out and build all the necessary upstream dependencies.
    *   You can add other step types, like "Run checks" or "Execute Python code".
4.  **Run the Scenario Manually:**
    *   Before scheduling, it's a good idea to test your scenario.
    *   Click the **Run** button at the top right.
    *   You can monitor the progress in the "Last runs" tab.

### 4. Resources and Tools
- **Scenarios Page:** The central hub for creating, managing, and monitoring all your automations.
- **Step Library:** The list of available actions you can add to a scenario, from building datasets to calling external APIs.

### 5. Next Steps and Progression
- **Scheduling:** Go to the **Settings > Triggers** tab to make your scenario run automatically on a schedule.
- **Alerting:** Go to the **Reporters** tab to configure email or Slack notifications on success or failure.
- **Parameterization:** Use project variables to make your scenarios more dynamic. You can override these variables for a specific scenario run.

### 6. Common Challenges and Solutions
- **Challenge:** "My scenario failed, but I don't know why."
- **Solution:** Go to the "Last runs" tab and click on the failed run. This will take you to the job log, which provides a detailed error message and shows exactly which step failed.
- **Challenge:** "Do I need to add a step for every recipe in my flow?"
- **Solution:** No, and you shouldn't. This is a common beginner mistake. You only need to add a step to build the final artifact (e.g., the last dataset). Dataiku's dependency engine is smart enough to trace the lineage backward and build everything required in the correct order.
`,
  },
  {
    id: 32,
    slug: 'scheduling-pipelines-via-triggers-or-cron',
    question: 'How to get started with + scheduling pipelines via triggers or CRON?',
    answer: `
### 1. Introduction/Overview
Once you have built a scenario to automate your pipeline, the next step is to schedule it to run automatically. Dataiku provides a powerful and flexible trigger system that can launch scenarios based on time (like a CRON job), data changes, or external API calls.

### 2. Prerequisites
- **A working scenario:** You need an existing scenario that you have tested by running it manually.

### 3. Step-by-Step Instructions
1.  **Navigate to Scenario Settings:**
    *   In your project, go to **Scenarios**.
    *   Click on the scenario you want to schedule.
    *   Go to the **Settings** tab.
2.  **Add a Trigger:**
    *   In the **Triggers** section, click **+ ADD TRIGGER**.
3.  **Choose a Trigger Type:**
    *   **Time-based (CRON-like):**
        *   Select the **Time-based** trigger.
        *   Choose a repeat frequency (e.g., \`Daily\`, \`Hourly\`, \`Weekly\`).
        *   You can set the exact time of day for the run. For more complex schedules, you can switch to the "CRON" format.
    *   **Data-driven:**
        *   Select the **Dataset change** trigger.
        *   Choose a dataset from your project.
        *   The scenario will automatically run whenever this specific dataset is modified (e.g., by another scenario or an external process).
4.  **Enable the Trigger:**
    *   After configuring the trigger, make sure the toggle switch next to it is turned **ON**.
    *   The "Next run" time will now be displayed.
5.  **Save and Activate:** Remember to save your scenario. The scenario must also be active (the master toggle at the top of the scenario page must be on).

### 4. Resources and Tools
- **Triggers Panel:** The UI within the scenario settings for configuring all types of triggers.
- **CRON Schedulers:** For advanced time-based schedules, you can use online tools to help you build a valid CRON expression.

### 5. Next Steps and Progression
- **Multiple Triggers:** A single scenario can have multiple triggers. For example, it could run every hour AND be triggered if a specific input file changes.
- **API Triggering:** Any scenario can also be triggered externally by making a call to its specific REST API endpoint. This is useful for integration with external schedulers like Airflow.
- **Conditional Execution:** For more complex scheduling logic (e.g., "run only on the last day of the month"), you can use a time-based trigger that runs daily, with the first step being a Python script that checks the date and exits if the condition is not met.

### 6. Common Challenges and Solutions
- **Challenge:** "My scenario didn't run at the scheduled time."
- **Solution:** First, check that the trigger and the scenario itself are both enabled (toggled on). Second, check the "Last runs" tab for any error messages. Finally, check with your Dataiku administrator; there might be instance-level settings that limit the number of concurrent jobs.
- **Challenge:** "My data-driven trigger is firing too often."
- **Solution:** The trigger will fire every time the input dataset is modified. If an upstream process is rebuilding that dataset frequently, your scenario will also run frequently. You may need to adjust the logic of the upstream process or switch to a time-based trigger.
`,
  },
  {
    id: 33,
    slug: 'automating-model-retraining-workflows',
    question: 'How to get started with + automating model retraining workflows?',
    answer: `
### 1. Introduction/Overview
Models are not static; they need to be retrained on new data to stay accurate. Automating this retraining process is a core MLOps practice. In Dataiku, you can build a scenario that automatically retrains your model, evaluates its new performance, and even deploys it if it's better than the current version.

### 2. Prerequisites
- **A deployed "Saved Model" in your Flow.**
- **A pipeline that generates fresh training data:** Your Flow must have a recipe chain that prepares the data needed to train the model.

### 3. Step-by-Step Instructions
1.  **Create a Retraining Scenario:**
    *   Go to **Scenarios** and create a new scenario called \`Retrain_My_Model\`.
2.  **Add the "Train" Step:**
    *   In the scenario's **Steps** tab, click **+ ADD STEP**.
    *   Choose **Build / Train**.
    *   In the step's configuration, **do not add a dataset**. Instead, click **+ ADD** and select your **Saved Model** object from the Flow.
    *   This tells the scenario to retrain the model, which will automatically first rebuild its input training dataset.
3.  **(Optional) Add an Evaluation Step:**
    *   After the training step, you can add another step to build a **Model Evaluation** recipe. This will score the newly trained model version against a test set and compute its performance metrics.
4.  **(Optional) Add a Deployment Step:**
    *   For full automation, add a **Python code** step after the evaluation.
    *   This script can use the Dataiku API to:
        1.  Get the performance of the newly trained model version and the currently active version.
        2.  If the new version is better, the script can activate it, effectively deploying it.
5.  **Schedule the Scenario:**
    *   Go to the **Settings > Triggers** tab and add a **Time-based** trigger to run this retraining pipeline on a schedule (e.g., weekly or monthly).

### 4. Resources and Tools
- **Train Step:** The specific scenario step used to retrain a Saved Model.
- **Evaluate Recipe:** The tool used to measure the performance of the newly trained model version.
- **Dataiku Python API:** Required for the advanced step of automatically deploying the best model.

### 5. Next Steps and Progression
- **Champion/Challenger:** Instead of immediately deploying the new model, your scenario could deploy it as a "challenger" to be A/B tested against the current "champion" in production.
- **Monitoring:** Ensure you have model monitoring set up to track the performance of your automatically retrained models over time.

### 6. Common Challenges and Solutions
- **Challenge:** "How do I know if the retrained model is actually better?"
- **Solution:** The **Evaluate** recipe is key. It creates a dataset containing the performance metrics for each model version. Your deployment script must read this data and compare the new model's performance (e.g., its AUC score) against the old one before making a deployment decision.
- **Challenge:** "The model is retraining, but the performance is getting worse."
- **Solution:** This is a serious issue. It could mean there's a problem with your new training data (e.g., data quality issues, changes in data distribution). Your automation script should have a safety check to *never* deploy a model that is worse than the current one.
`,
  },
  {
    id: 34,
    slug: 'configuring-success-failure-email-alerts',
    question: 'How to get started with + configuring success/failure email alerts?',
    answer: `
### 1. Introduction/Overview
Monitoring your automated pipelines is crucial. You need to know if they succeeded or, more importantly, if they failed. Dataiku Scenarios have a built-in reporting system that can automatically send notifications via email, Slack, or other services.

### 2. Prerequisites
- **A working scenario.**
- **Email server configuration:** Your Dataiku administrator must have configured the instance to be able to send emails.

### 3. Step-by-Step Instructions
1.  **Navigate to your Scenario:** In your project, go to **Scenarios** and select the one you want to add alerts to.
2.  **Open the Reporters Tab:** Click on the **Reporters** tab. This is where all notifications are configured.
3.  **Add a Mail Reporter:**
    *   Click **+ ADD REPORTER**.
    *   Select **Mail** from the dropdown list.
4.  **Configure the Reporter:**
    *   **Give it a name:** e.g., \`Failure_Alerts_To_Dev_Team\`.
    *   **Run condition:** This is the most important setting. Choose when the email should be sent. Common choices are:
        *   \`On failure\`: The most common setting, for sending error alerts.
        *   \`On success\`: Useful for confirming that a critical job has completed.
        *   \`On completion\`: Sends an email regardless of outcome.
    *   **Recipients:** Enter the email address or distribution list to send the alert to.
    *   **Customize the Message:** You can customize the subject and body of the email. It's useful to use variables like \`\${scenarioName}\` and \`\${outcome}\` to provide context.
5.  **Save the Scenario:** Click **Save**. The reporter is now active and will send an email the next time the scenario runs and the run condition is met.

### 4. Resources and Tools
- **Reporters Tab:** The UI for managing all scenario notifications.
- **Variables:** Use built-in variables like \`\${projectKey}\`, \`\${scenarioName}\`, \`\${outcome}\`, and \`\${jobURL}\` in your email body to create informative and actionable alerts.

### 5. Next Steps and Progression
- **Multiple Reporters:** You can add multiple reporters to a single scenario. For example, you could have one reporter that sends a detailed failure log to the development team and another that sends a simple success/failure notification to a business stakeholder.
- **Slack Integration:** If your team uses Slack, set up a Slack reporter for more immediate notifications in a shared channel.
- **Custom Reports:** You can attach the content of a dashboard or dataset to your email, creating automated reports.

### 6. Common Challenges and Solutions
- **Challenge:** "No emails are being sent."
- **Solution:** First, check that the scenario actually ran and that the outcome matched the reporter's run condition. Second, confirm with your Dataiku administrator that the instance's mail server is configured correctly and is able to send emails to external addresses.
- **Challenge:** "The email alert isn't helpful."
- **Solution:** Customize the email body to be more informative. Always include the project key, scenario name, and the \`\${jobURL}\` variable. This provides a direct link to the logs so the recipient can immediately start investigating the problem.
`,
  },
  {
    id: 35,
    slug: 'building-data-quality-validation-steps-in-scenarios',
    question: 'How to get started with + building data quality validation steps in Scenarios?',
    answer: `
### 1. Introduction/Overview
Preventing bad data from flowing through your pipelines is a critical governance task. Dataiku allows you to define data quality rules on your datasets and then use Scenarios to automatically run these checks and stop the pipeline if the data doesn't meet your standards.

### 2. Prerequisites
- **A key dataset in your Flow:** You need a dataset where data quality is important (e.g., a cleaned dataset before it's used for modeling or reporting).
- **An idea of what "good quality" means:** Know what rules your data should follow (e.g., "this column should never be empty," "this value should be within a certain range").

### 3. Step-by-Step Instructions
#### Part 1: Define the Quality Rules (Metrics & Checks)
1.  **Open the Dataset:** In your Flow, open the dataset you want to validate.
2.  **Go to the Status Tab:** Navigate to the **Status** tab.
3.  **Define Metrics:**
    *   Click on the **Metrics** section. This is where you tell Dataiku what to measure.
    *   Click **+ ADD METRIC** and choose a metric type, for example, "Column statistics" or "Record count".
    *   Configure the metric (e.g., compute statistics on the \`price\` column).
    *   Run the metric computation to see the current values.
4.  **Define Checks:**
    *   Click on the **Checks** section. This is where you define your pass/fail rules.
    *   Click **+ ADD CHECK**. For example, choose **Column value in numerical range**.
    *   Configure the check: Select the \`price\` column and set the valid range (e.g., \`0\` to \`1000\`).
    *   Run the check to see if the current data passes.

#### Part 2: Automate the Validation in a Scenario
1.  **Create a Scenario:** Go to the **Scenarios** page and create a new scenario.
2.  **Add a Build Step:** The first step should be to build the dataset you want to validate.
3.  **Add the "Run Checks" Step:**
    *   Click **+ ADD STEP** and select **Run checks**.
    *   In the step's configuration, select your dataset.
    *   The scenario will now run the checks you defined in Part 1. By default, if any check fails, the entire scenario will fail.
4.  **Schedule and Alert:** Schedule your scenario to run after your data ingestion, and add a **Reporter** to send an alert if it fails.

### 4. Resources and Tools
- **Status Tab (Metrics & Checks):** The UI for defining your data quality rules.
- **Run Checks Step:** The scenario step that executes your predefined checks.

### 5. Next Steps and Progression
- **Custom Python Checks:** For very complex quality rules that can't be expressed with the built-in checks, you can write a custom check in Python.
- **Data Quality Dashboard:** Create a dashboard that visualizes the history of your metric values over time, allowing you to track data quality trends.

### 6. Common Challenges and Solutions
- **Challenge:** "My check is failing, but I don't know why."
- **Solution:** Go to the **Checks** section on the dataset. Click on the failing check. It will show you the computed value and the condition that failed. For example, "Value was 1050, which is outside the valid range of 0-1000."
- **Challenge:** "I want to be warned but not fail the whole pipeline."
- **Solution:** In the "Checks" settings, you can change the severity of a check from "Error" (which fails the job) to "Warning" (which allows the job to continue but still flags the issue).
`,
  },
  {
    id: 36,
    slug: 'using-scenarios-to-automate-data-ingestion-jobs',
    question: 'How to get started with + using scenarios to automate data ingestion jobs?',
    answer: `
### 1. Introduction/Overview
Data ingestion is the process of loading data from external sources (like databases, cloud storage, or APIs) into Dataiku. Automating this process with Scenarios ensures that your projects always have access to the latest data without manual intervention.

### 2. Prerequisites
- **Source datasets configured:** You must have already created datasets in your Flow that connect to your external sources (e.g., a SQL table dataset, an S3 dataset).
- **A clear ingestion schedule:** Know how often you need to refresh your data (e.g., daily, hourly).

### 3. Step-by-Step Instructions
1.  **Identify Your Ingestion Datasets:** In your Flow, locate the datasets that represent your raw data sources. These are the "entry points" of your pipeline.
2.  **Create an Ingestion Scenario:**
    *   Go to **Scenarios** and create a new scenario. Name it something clear, like \`Ingest_Source_Data_Daily\`.
3.  **Add a "Build" Step:**
    *   In the **Steps** tab, click **+ ADD STEP** and choose **Build / Train**.
    *   In the step's configuration, click **+ ADD** and select all of your source datasets.
4.  **Configure the Build Behavior:**
    *   For the "Build mode", the default \`Since last successful build\` is often good.
    *   However, for ingestion, you often want a full refresh. You can change the build mode for each dataset to **Forced rebuild**. This tells Dataiku to completely drop the old data and reload it from the source.
5.  **Schedule the Scenario:**
    *   Go to the **Settings > Triggers** tab.
    *   Add a **Time-based** trigger and configure it to run on your desired schedule (e.g., every day at 2 AM).
6.  **Add Alerts:** Go to the **Reporters** tab and configure an email or Slack alert to notify you if the ingestion job fails.

### 4. Resources and Tools
- **Build Step:** The primary scenario step for running data pipelines.
- **Forced Rebuild Mode:** A key setting for ensuring your ingestion datasets are completely refreshed from the source.
- **Triggers:** The tool for scheduling your automated ingestion.

### 5. Next Steps and Progression
- **Incremental Loads:** For very large tables, a full rebuild can be slow. If your source data has a timestamp, you can set up an incremental load pattern using partitioning and project variables to only fetch new records.
- **Chained Scenarios:** You can have your main data processing scenario be triggered by the successful completion of your ingestion scenario.
- **Data Quality Checks:** Add a "Run checks" step immediately after your build step to validate the incoming data before it's used by downstream processes.

### 6. Common Challenges and Solutions
- **Challenge:** "The ingestion job failed due to a source connection error."
- **Solution:** This indicates a problem with the external system (e.g., the database was down). A well-configured scenario with failure alerts will notify you of this problem so you can investigate.
- **Challenge:** "My ingested data is not up-to-date."
- **Solution:** Check the build mode. If it's not set to "Forced rebuild", Dataiku might be using a cached version. Ensure you are forcing a refresh for ingestion datasets. Also, verify that your scenario's schedule is running as expected.
`,
  },
  {
    id: 37,
    slug: 'managing-flow-dependencies-programmatically',
    question: 'How to get started with + managing flow dependencies programmatically?',
    answer: `
### 1. Introduction/Overview
While Dataiku's visual dependency engine is powerful, sometimes you need finer-grained control over your pipeline's execution. Using a **Python scenario step** and the **Dataiku Python API**, you can programmatically check conditions, build specific parts of your flow, and create complex, dynamic workflows.

### 2. Prerequisites
- **A good understanding of your Flow's structure.**
- **Basic Python skills.**
- **Familiarity with the Dataiku Python API documentation.**

### 3. Step-by-Step Instructions
1.  **Create a Scenario with a Python Step:**
    *   In your project, go to **Scenarios** and create a new scenario.
    *   Click **+ ADD STEP** and choose **Execute Python code**.
2.  **Get a Handle on Flow Items:**
    *   The script starts with access to a \`dataiku\` client object. Use it to get handles on your project and its datasets, recipes, etc.
    > \`\`\`python
    > import dataiku
    > client = dataiku.api_client()
    > project = client.get_project("MY_PROJECT_KEY")
    > dataset_to_build = project.get_dataset("my_output_dataset")
    > \`\`\`
3.  **Implement Your Logic:** Now you can write code to manage your dependencies.
    *   **Example: Conditional Build**
        > \`\`\`python
        > # Get the row count of a control dataset
        > control_dataset = project.get_dataset("control_ds")
        > row_count = control_dataset.get_metadata()["metrics"]["recordsCount"]
        > # If count > 100, build the main dataset
        > if row_count > 100:
        >     job = dataset_to_build.build()
        >     print(f"Started job: {job.id}")
        > \`\`\`
    *   **Example: Building only some partitions**
        > \`\`\`python
        > # Build only the latest partition of a partitioned dataset
        > job = dataset_to_build.build(partitions="LATEST")
        > \`\`\`
4.  **Run the Scenario:** The scenario will execute your Python script, which in turn will run the specific jobs you've defined.

### 4. Resources and Tools
- **Dataiku Python API Documentation:** This is your essential reference. Look for the \`DSSProject\`, \`DSSDataset\`, and \`DSSJob\` classes.
- **Python Scenario Step:** The environment where your programmatic logic runs.
- **Job Log:** The output of your \`print\` statements and the status of the jobs you launch will appear in the scenario's log.

### 5. Next Steps and Progression
- **Error Handling:** Your script should include \`try...except\` blocks to gracefully handle cases where a job fails.
- **Looping:** Programmatically build a flow for a list of inputs (e.g., loop through a list of countries and run a specific part of the flow for each).
- **Chaining Projects:** Use the API to trigger scenarios in other projects, creating dependencies between them.

### 6. Common Challenges and Solutions
- **Challenge:** "How do I get my project key or dataset name?"
- **Solution:** These are visible in the UI. The project key is in the URL of your browser. The dataset name is what you see in the Flow.
- **Challenge:** "The script runs, but no job is started."
- **Solution:** Add \`print\` statements to your script to debug the logic. Check your conditions. Ensure your user has the correct permissions to build the target dataset. The job might also be queued if the Dataiku instance is busy.
`,
  },
  {
    id: 38,
    slug: 'integrating-dataiku-jobs-into-ci-cd-pipelines',
    question: 'How to get started with + integrating Dataiku jobs into CI/CD pipelines?',
    answer: `
### 1. Introduction/Overview
CI/CD (Continuous Integration/Continuous Deployment) is a DevOps practice for automating software delivery. You can integrate Dataiku into this process, using tools like Jenkins, GitLab CI, or GitHub Actions to automatically test and deploy your Dataiku projects. The key to this integration is the **Dataiku REST API**.

### 2. Prerequisites
- **A CI/CD tool:** Jenkins, GitLab CI, GitHub Actions, etc.
- **A Dataiku project connected to Git:** Your project must be version-controlled.
- **An API Key:** Generate a Dataiku API key for your CI/CD tool to use, with permissions to run scenarios and create bundles.

### 3. Step-by-Step Instructions: A Typical CI/CD Workflow
1.  **Trigger (Code Commit):** A developer commits and pushes a change to the project's Git repository. This automatically triggers the CI/CD pipeline.
2.  **CI Step 1: Update Project from Git:**
    *   Your CI/CD script (e.g., a \`Jenkinsfile\`) makes a REST API call to Dataiku to pull the latest changes from the Git repository into the Dataiku project.
3.  **CI Step 2: Run Automated Tests:**
    *   The script then makes a second API call to run a specific "test" scenario in Dataiku.
    *   This test scenario should contain steps to "Run checks" for data quality and "Run tests" for any custom Python recipes.
    *   The script polls the job status until it completes. If the test scenario fails, the CI/CD pipeline fails and stops.
4.  **CD Step 1: Create a Project Bundle:**
    *   If the tests pass, the script makes another API call to create a "bundle" of the project. A bundle is a \`.zip\` file containing the entire project, which is the artifact for deployment.
5.  **CD Step 2: Deploy the Bundle:**
    *   The script then makes a final API call to the *production* Dataiku instance, uploading the bundle and deploying it. This updates the production project to the new, tested version.

### 4. Resources and Tools
- **Dataiku REST API:** The interface for all external control. The key endpoints are for \`project_update_from_git\`, \`scenario_run\`, and \`bundle_create/import\`.
- **Your CI/CD Tool's Scripting Language:** (e.g., Groovy for Jenkins, YAML for GitLab/GitHub).
- **\`curl\` or a scripting language:** Used in your CI/CD pipeline to make the HTTP requests to the Dataiku API.

### 5. Next Steps and Progression
- **Environment Promotion:** A full CI/CD pipeline will have multiple stages, deploying the bundle first to a "Staging" or "UAT" environment for further testing before a final manual approval step to deploy to production.
- **Infrastructure as Code:** For fully automated environments, the CI/CD pipeline could also trigger Terraform or CloudFormation scripts to provision the necessary cloud infrastructure for Dataiku.

### 6. Common Challenges and Solutions
- **Challenge:** "How do I handle API keys securely in my CI/CD tool?"
- **Solution:** Do not hardcode the API key in your script. All modern CI/CD tools have a "Secrets Management" or "Credentials" store. Store the Dataiku API key there, and inject it into your pipeline as an environment variable at runtime.
- **Challenge:** "The API call is failing."
- **Solution:** Use the \`curl\` command line tool to test your API calls manually from the CI/CD runner to debug connection or authentication issues. Check the Dataiku backend logs for more detailed error messages.
`,
  },
  {
    id: 39,
    slug: 'linking-dataiku-with-jenkins-or-azure-devops',
    question: 'How to get started with + linking Dataiku with Jenkins or Azure DevOps?',
    answer: `
### 1. Introduction/Overview
Integrating Dataiku with CI/CD tools like Jenkins or Azure DevOps allows you to automate the testing and deployment of your data projects, bringing robust software engineering practices to your analytics workflows. The integration is achieved by having the CI/CD tool call the **Dataiku REST API**.

### 2. Prerequisites
- **An installed CI/CD tool:** A running instance of Jenkins or an Azure DevOps organization.
- **A Dataiku project using Git:** Your project should be linked to a Git repository that your CI/CD tool can access.
- **A Dataiku API Key:** In Dataiku, create an API key with sufficient permissions (e.g., project admin rights).

### 3. Step-by-Step Instructions (Conceptual Workflow)

#### In Jenkins (using a \`Jenkinsfile\`):
1.  **Store Credentials:** In Jenkins, go to "Manage Jenkins" > "Credentials" and add a new "Secret text" credential. Store your Dataiku API key here and give it an ID (e.g., \`DATAİKU_API_KEY\`).
2.  **Create a Pipeline Job:** Create a new Jenkins Pipeline job linked to your project's Git repository.
3.  **Write the \`Jenkinsfile\`:** This script defines your pipeline.
    > \`\`\`groovy
    > pipeline {
    >     agent any
    >     environment {
    >         API_KEY = credentials('DATAİKU_API_KEY')
    >     }
    >     stages {
    >         stage('Run Tests in Dataiku') {
    >             steps {
    >                 // Use sh to call curl with the API key to trigger a test scenario
    >                 sh 'curl -u $API_KEY: -X POST https://YOUR_DSS_URL/public/api/projects/MY_PROJECT/scenarios/test_scenario/run'
    >             }
    >         }
    >         // ... other stages for bundling and deploying ...
    >     }
    > }
    > \`\`\`

#### In Azure DevOps (using a YAML pipeline):
1.  **Store Secrets:** In your Azure DevOps project, go to "Pipelines" > "Library" and create a "Variable group". Add your Dataiku API key as a secret variable.
2.  **Create a YAML Pipeline:** Create a file named \`azure-pipelines.yml\` in your Git repository.
3.  **Write the YAML:** This file defines your pipeline.
    > \`\`\`yaml
    > trigger:
    > - main
    >
    > pool:
    >   vmImage: 'ubuntu-latest'
    >
    > steps:
    > - script: |
    >     curl -u $(DATAİKU_API_KEY): -X POST https://YOUR_DSS_URL/public/api/projects/MY_PROJECT/scenarios/test_scenario/run
    >   displayName: 'Run Tests in Dataiku'
    >   env:
    >     DATAİKU_API_KEY: $(your-secret-variable-name) # Link to the secret
    > \`\`\`

### 4. Resources and Tools
- **Dataiku REST API Documentation:** Essential for finding the correct endpoints and parameters.
- **Jenkins/Azure DevOps Documentation:** For learning how to write pipeline scripts and manage secrets.
- **\`curl\`:** A command-line tool that is invaluable for making HTTP requests and testing your API calls.

### 5. Next Steps and Progression
- **Polling for Job Status:** The simple examples above just trigger the job. A real pipeline needs to poll the job status API endpoint in a loop until the job is finished and then check if the outcome was "SUCCESS".
- **Multi-Stage Pipelines:** Build out the full CI/CD process with stages for linting, testing, building, and deploying.

### 6. Common Challenges and Solutions
- **Challenge:** "Authentication (401) Error."
- **Solution:** Ensure the API key is correct and stored properly in your CI/CD tool's secret manager. The syntax for \`curl\` with an API key as the username and a blank password (\`-u key:\`) is very specific.
- **Challenge:** "Network/Connection Error."
- **Solution:** Ensure your Jenkins agent or Azure DevOps agent has network access to the Dataiku instance's URL and port. Firewalls can often block this traffic.
`,
  },
  {
    id: 40,
    slug: 'using-rest-apis-to-trigger-dataiku-scenarios',
    question: 'How to get started with + using REST APIs to trigger Dataiku scenarios?',
    answer: `
### 1. Introduction/Overview
The Dataiku REST API is a powerful feature that allows external systems to control and interact with your Dataiku projects. One of the most common use cases is to programmatically trigger a scenario run. This is the key to integrating Dataiku with external schedulers, CI/CD tools, or any other application.

### 2. Prerequisites
- **A Dataiku Scenario:** You need an existing scenario in a project that you want to trigger.
- **Your Dataiku Instance URL:** The URL of your Dataiku server (e.g., \`http://localhost:11000\`).
- **Project Key and Scenario ID:**
    - The **Project Key** is a short, unique identifier for your project (e.g., \`DKU_CHURN\`).
    - The **Scenario ID** is the unique identifier for your scenario (e.g., \`run_daily\`). You can find these in the URL when you are viewing the scenario.
- **An API Key:** You must generate an API key in your Dataiku profile with at least "run scenarios" permission for the target project.

### 3. Step-by-Step Instructions
1.  **Generate an API Key:**
    *   Click on your profile icon in Dataiku (top right) > **Profile & settings**.
    *   Go to the **API keys** tab.
    *   Click **+ NEW API KEY**. Give it a description and grant it the necessary permissions.
    *   Copy the generated secret key and store it securely.
2.  **Construct the API Endpoint URL:** The URL to trigger a scenario follows a standard format:
    > \`YOUR_DSS_URL/public/api/projects/YOUR_PROJECT_KEY/scenarios/YOUR_SCENARIO_ID/run\`
3.  **Make the API Call:** You can use any tool or programming language that can make an HTTP POST request. The most common tool for testing is \`curl\`.
    *   Open a terminal or command prompt.
    *   Use the following \`curl\` command, replacing the placeholders with your values. The API key is used as the username, and the password is left blank.
    > \`\`\`bash
    > curl -X POST -u 'YOUR_API_KEY:' 'http://localhost:11000/public/api/projects/DKU_CHURN/scenarios/run_daily/run'
    > \`\`\`
4.  **Check the Response:** If the call is successful, the API will return a JSON response containing information about the triggered scenario run, including its \`id\`.

### 4. Resources and Tools
- **\`curl\`:** A universal command-line tool for making HTTP requests. Perfect for testing.
- **Postman:** A graphical API client that is also excellent for testing and exploring APIs.
- **Dataiku REST API Documentation:** Available directly from your instance (\`Help > REST API Doc\`), it provides a complete reference for all available endpoints.

### 5. Next Steps and Progression
- **Polling for Results:** After triggering a scenario, you'll often need to know when it's finished and if it succeeded. You can use the \`jobId\` from the initial response to call another API endpoint in a loop to poll for the job's status.
- **Passing Parameters:** You can pass a JSON payload in your POST request to override project variables for that specific run, making your triggered jobs dynamic.
- **Integration:** Use this API call within a Python script, a Jenkinsfile, or any other application to integrate Dataiku into your broader ecosystem.

### 6. Common Challenges and Solutions
- **Challenge:** "401 Unauthorized Error."
- **Solution:** Your API key is incorrect, expired, or doesn't have permission for the target project. Double-check the key and its permissions. Ensure you are using the correct \`-u 'key:'\` syntax.
- **Challenge:** "404 Not Found Error."
- **Solution:** You have a typo in your Project Key or Scenario ID. Check them carefully. They are case-sensitive.
`,
  },
  {
    id: 41,
    slug: 'connecting-dataiku-to-aws-redshift',
    question: 'How to get started with + connecting Dataiku to AWS Redshift?',
    answer: `
### 1. Introduction/Overview
Amazon Redshift is a popular cloud data warehouse. Dataiku provides a native connector that makes it easy to read data from Redshift, write data back to it, and, most importantly, push down computation to leverage Redshift's powerful parallel processing engine.

### 2. Prerequisites
- **Redshift Cluster Details:** You need the endpoint (hostname), port, database name, username, and password for your cluster.
- **AWS Security Group Configuration:** The security group for your Redshift cluster must be configured to allow inbound traffic from the IP address of your Dataiku server on the Redshift port (usually 5439).
- **Dataiku Admin Rights:** You need administrator rights in Dataiku to create the connection.

### 3. Step-by-Step Instructions
1.  **Download the JDBC Driver:**
    *   Redshift requires a specific JDBC driver. Download it from the AWS documentation.
    *   In Dataiku, go to **Administration > Settings > Misc** and upload the driver JAR file to the "lib/java" directory. You may need to restart Dataiku for it to be recognized.
2.  **Create the Connection in Dataiku:**
    *   Go to **Administration > Connections**.
    *   Click **+ NEW CONNECTION** and select **Amazon Redshift**.
3.  **Configure Connection Details:**
    *   Give the connection a name (e.g., \`aws_redshift_main\`).
    *   Fill in the **Host**, **Port**, and **Database** from your Redshift cluster details.
    *   Enter the **User** and **Password**.
    *   **Important:** You will also need to specify an S3 bucket for temporary data. Redshift uses S3 for certain operations like \`COPY\` and \`UNLOAD\`. Create a dedicated S3 bucket for this purpose and enter its name in the settings.
4.  **Test and Create:**
    *   Click the **Test** button. If it's successful, it means your credentials and network settings are correct.
    *   Click **CREATE**.
5.  **Using the Connection:** Now, in any project, you can click **+ DATASET > Amazon Redshift** to browse schemas and tables in your Redshift cluster and import them into your Flow.

### 4. Resources and Tools
- **AWS Console:** To find your Redshift cluster details and configure security groups.
- **Dataiku Connections Page:** The central place to manage the Redshift connection.
- **SQL Recipes:** The most efficient way to work with Redshift data once it's in Dataiku.

### 5. Next Steps and Progression
- **Push-down Execution:** When you use a visual recipe (like Prepare or Join) on Redshift datasets, go to the "Advanced" settings and ensure the "Execution Engine" is set to "Run on database". This will translate the recipe into SQL and run it directly in Redshift, which is much faster for large data.
- **Writing to Redshift:** Use an **Export** recipe to write your final results from Dataiku into a new table in Redshift.

### 6. Common Challenges and Solutions
- **Challenge:** "Connection Test Times Out."
- **Solution:** This is almost always a network issue. The Dataiku server cannot reach the Redshift cluster. Go to your AWS VPC settings, find the Security Group attached to your Redshift cluster, and add an Inbound Rule that allows TCP traffic on port 5439 from the source IP of your Dataiku instance.
- **Challenge:** "JDBC Driver not found."
- **Solution:** You haven't installed the Redshift JDBC driver correctly. Ensure you've uploaded the correct JAR file to the \`lib/java\` folder in Dataiku's installation directory and restarted the instance.
`,
  },
  {
    id: 42,
    slug: 'connecting-dataiku-to-snowflake-data-warehouse',
    question: 'How to get started with + connecting Dataiku to Snowflake data warehouse?',
    answer: `
### 1. Introduction/Overview
Snowflake is a leading cloud data platform. Dataiku has a deep, native integration with Snowflake, allowing you to not only read and write data but also to fully leverage Snowflake's compute power by pushing down transformations directly from visual recipes.

### 2. Prerequisites
- **Snowflake Account Details:** You need your Snowflake account URL (e.g., \`myaccount.snowflakecomputing.com\`), a username, password, and the names of the warehouse, database, and schema you want to use.
- **Permissions:** The Snowflake user needs appropriate permissions (\`USAGE\` on the warehouse, database, and schema, and \`SELECT\` on tables).
- **Dataiku Admin Rights:** Required to set up the shared connection.

### 3. Step-by-Step Instructions
1.  **Create the Connection in Dataiku:**
    *   Go to **Administration > Connections**.
    *   Click **+ NEW CONNECTION** and select **Snowflake**.
2.  **Configure Connection Settings:**
    *   Give the connection a clear name (e.g., \`snowflake_prod\`).
    *   Enter your Snowflake **Account** name (the part before \`.snowflakecomputing.com\`).
    *   Enter your **Username** and **Password**.
    *   Specify the default **Warehouse**, **Database**, and **Schema** to use.
    *   The JDBC driver for Snowflake is typically bundled with Dataiku, so you usually don't need to install it separately.
3.  **Test and Create:**
    *   Click **Test**. A successful test confirms that your credentials and account details are correct.
    *   Click **CREATE**.
4.  **Use the Connection in a Project:**
    *   In your project Flow, click **+ DATASET > Snowflake**.
    *   You can now browse the databases and schemas accessible to your user and select a table to import as a Dataiku dataset.

### 4. Resources and Tools
- **Snowflake UI (Snowsight):** To find your account details and manage user permissions.
- **Dataiku Connections Page:** To manage the Snowflake connection.
- **Visual Recipes (Prepare, Join, Group):** These recipes can run directly inside Snowflake for maximum performance.

### 5. Next Steps and Progression
- **Full Push-down:** This is the key benefit. When using visual recipes on Snowflake datasets, check the recipe's "Advanced" settings and set the execution engine to "Run on database (SQL)". Dataiku will generate Snowflake-optimized SQL instead of pulling data out.
- **Time Travel:** Use a SQL recipe to leverage Snowflake's \`AT\` or \`BEFORE\` clauses to query historical versions of your data.
- **Writing to Snowflake:** Use an **Export** recipe to create new tables in Snowflake from your Dataiku flow.

### 6. Common Challenges and Solutions
- **Challenge:** "Connection Test Fails."
- **Solution:** Double-check your account name, username, and password. Account names can be tricky; ensure you are using the correct format. If your company uses network policies in Snowflake, the IP address of your Dataiku instance may need to be whitelisted.
- **Challenge:** "I run a recipe, and it's very slow."
- **Solution:** You are likely not using push-down. Open the recipe and verify the execution engine is set to "Run on database". If it's running in-memory, Dataiku is pulling all the data from Snowflake first, which is inefficient for large datasets.
`,
  },
  {
    id: 43,
    slug: 'using-dataiku-with-gcp-big-query',
    question: 'How to get started with + using Dataiku with GCP big‑query?',
    answer: `
### 1. Introduction/Overview
Google BigQuery is a serverless, highly scalable data warehouse. Dataiku's integration allows you to easily access your BigQuery tables and leverage its powerful query engine for large-scale data transformation directly from the Dataiku interface.

### 2. Prerequisites
- **GCP Project:** You need a Google Cloud Platform project where BigQuery is enabled.
- **Service Account:** It is best practice to create a GCP Service Account for Dataiku. This service account needs the "BigQuery Data Viewer" and "BigQuery Job User" roles, at a minimum.
- **Service Account Key:** You need to create and download a JSON key file for this service account.
- **Dataiku Admin Rights:** Required to configure the connection.

### 3. Step-by-Step Instructions
1.  **Create the Connection in Dataiku:**
    *   Go to **Administration > Connections**.
    *   Click **+ NEW CONNECTION** and select **Google BigQuery**.
2.  **Configure Authentication:**
    *   Give the connection a name (e.g., \`gcp_bigquery_main\`).
    *   For authentication, choose **Service Account**.
    *   Paste the entire contents of the JSON key file you downloaded into the "Service account credentials" text box.
    *   Enter the GCP **Project ID** where your BigQuery data resides.
3.  **Test and Create:**
    *   Click **Test**. A successful result means Dataiku was able to authenticate with GCP and access the BigQuery service.
    *   Click **CREATE**.
4.  **Use the Connection:**
    *   In a project Flow, click **+ DATASET > Google BigQuery**.
    *   You will now be able to browse the datasets and tables within your BigQuery project and import them as Dataiku datasets.

### 4. Resources and Tools
- **GCP IAM & Admin Console:** Where you create service accounts and manage permissions.
- **BigQuery Console:** To view your tables and find your project ID.
- **Visual Recipes and SQL Recipes:** Both can be pushed down to run directly in BigQuery.

### 5. Next Steps and Progression
- **Push-down Execution:** Just like with other databases, ensure your visual recipes are set to "Run on database (SQL)" in their advanced settings to leverage BigQuery's engine.
- **Writing to BigQuery:** Use an **Export** recipe to write the results of your Dataiku pipeline into new tables in BigQuery.
- **Partitioned Tables:** Dataiku can read from and write to tables partitioned by date in BigQuery, which is essential for managing large time-series data.

### 6. Common Challenges and Solutions
- **Challenge:** "Connection Test Fails with a Permissions Error."
- **Solution:** This is the most common issue. Go to the GCP IAM console. Find your service account and make sure it has the necessary roles (\`BigQuery Data Viewer\`, \`BigQuery Job User\`) assigned to it for the target project.
- **Challenge:** "My query is costing a lot of money."
- **Solution:** BigQuery charges based on the amount of data scanned. Ensure your SQL queries are efficient. Use \`WHERE\` clauses on partitioned columns to limit the amount of data scanned. Use the BigQuery console's query validator to estimate the cost before running a query in Dataiku.
`,
  },
  {
    id: 44,
    slug: 'integrating-hadoop-or-spark-with-dataiku',
    question: 'How to get started with + integrating Hadoop or Spark with Dataiku?',
    answer: `
### 1. Introduction/Overview
For big data processing, Dataiku can be deeply integrated with a Hadoop/Spark cluster. This allows Dataiku to use HDFS for storage and to submit computation jobs to Spark or Hive, enabling you to process massive datasets in a distributed fashion. This is an advanced configuration typically performed by a Dataiku administrator.

### 2. Prerequisites
- **A Hadoop/Spark Cluster:** A running cluster (e.g., Cloudera, Hortonworks, EMR) with HDFS, YARN, and Spark/Hive.
- **Network Connectivity:** The Dataiku server needs to be installed on an "edge node" of the cluster, meaning it has the necessary Hadoop client libraries and configuration files to communicate with the cluster's services.
- **Administrator-level Access:** Both to the cluster and the Dataiku instance for the installation and configuration.

### 3. Step-by-Step Instructions (High-Level)
1.  **Install Dataiku on an Edge Node:** The Dataiku server software must be installed on a node that is part of the Hadoop cluster.
2.  **Configure Hadoop Integration:**
    *   During the installation process, the Dataiku setup script will prompt for Hadoop integration.
    *   You will point Dataiku to the location of the Hadoop configuration files (like \`core-site.xml\`, \`hdfs-site.xml\`).
    *   Dataiku will use these files to automatically configure itself to work with your cluster's HDFS and YARN resource manager.
3.  **Verify Spark/Hive Integration:**
    *   After setup, go to **Administration > Settings > Spark** or **Hive**.
    *   Dataiku should have auto-detected the Spark and Hive installations. You can verify the settings here.
4.  **Using the Integration:**
    *   **For Storage:** You can now create datasets that read from and write to HDFS.
    *   **For Compute:** In the settings of visual recipes (Prepare, Join, etc.), you can now choose **Spark** or **Hive** as the execution engine. You can also create PySpark, SparkR, or SparkSQL code recipes.

### 4. Resources and Tools
- **Dataiku Installation & Administration Guide:** The official documentation provides detailed, step-by-step instructions for integrating with different Hadoop distributions.
- **Hadoop/Spark UI:** The native UIs for YARN and Spark are useful for monitoring the jobs that Dataiku submits to the cluster.

### 5. Next Steps and Progression
- **PySpark Recipes:** Move beyond visual recipes and write custom distributed data transformations using PySpark code in a Python recipe.
- **Performance Tuning:** Learn to configure Spark settings within Dataiku (e.g., number of executors, memory per executor) to optimize the performance of your jobs.
- **Containerized Spark:** For modern deployments, Dataiku can also be configured to submit Spark jobs to a Kubernetes cluster instead of a traditional YARN-based one.

### 6. Common Challenges and Solutions
- **Challenge:** "Dataiku can't connect to HDFS."
- **Solution:** This is usually a configuration or permissions issue. Double-check that Dataiku is using the correct Hadoop configuration files. Ensure that the user running the Dataiku process has the necessary permissions to read/write in HDFS.
- **Challenge:** "My Spark recipe fails with a YARN error."
- **Solution:** Debugging Spark jobs can be complex. The first step is to go to the YARN ResourceManager UI. Find your failed application and look at its detailed logs (in the \`stderr\`/\`stdout\` of the containers). The root cause is often found there.
`,
  },
  {
    id: 45,
    slug: 'running-spark-based-recipes-in-dss',
    question: 'How to get started with + running Spark-based recipes in DSS?',
    answer: `
### 1. Introduction/Overview
When dealing with very large datasets, processing data in-memory on a single server is not feasible. Spark provides a framework for distributed, in-memory computing across a cluster. Dataiku allows you to leverage Spark's power through both visual recipes and code recipes, enabling you to process terabytes of data efficiently.

### 2. Prerequisites
- **Dataiku integrated with a Spark cluster:** Your Dataiku instance must be configured to submit jobs to a Spark cluster (either via YARN or Kubernetes).
- **Data stored in a distributed file system:** Your input data should be in a location accessible by Spark, such as HDFS, S3, GCS, or Azure Blob Storage.

### 3. Step-by-Step Instructions
#### Method 1: Using Visual Recipes with the Spark Engine
1.  **Select a Compatible Recipe:** Choose a visual recipe that can be executed by Spark, such as **Prepare**, **Join**, **Group**, or **Sync**.
2.  **Ensure Inputs are Spark-compatible:** Your input datasets must be stored on a distributed filesystem like HDFS or S3.
3.  **Change the Execution Engine:**
    *   In the recipe's settings, click on the **Advanced** tab.
    *   Find the **Execution engine** dropdown.
    *   Change it from the default "In-Memory" to **Spark**.
4.  **Run the Recipe:** Click **Run**. Dataiku will now translate the visual steps of your recipe into a Spark job and submit it to the cluster for execution.

#### Method 2: Using Spark Code Recipes
1.  **Create a Code Recipe:** From your Flow, select **+ RECIPE** and choose **PySpark**, **Spark R**, or **Spark SQL**.
2.  **Write Your Spark Code:**
    *   The recipe editor will open. You can write standard Spark code.
    *   Dataiku automatically provides a \`spark\` session object.
    *   Use the Spark DataFrame API to read your input datasets and perform transformations.
    > \`\`\`python
    > # In a PySpark recipe
    > input_df = spark.read.format("parquet").load(dataiku.Dataset("my_input").get_path())
    >
    > # Your Spark transformation logic
    > output_df = input_df.withColumn("new_col", input_df["old_col"] * 2)
    >
    > output_df.write.format("parquet").mode("overwrite").save(dataiku.Dataset("my_output").get_path())
    > \`\`\`
3.  **Run the Recipe:** Click **Run**. Dataiku will execute your script as a Spark application on the cluster.

### 4. Resources and Tools
- **Recipe Execution Engine Setting:** The key UI element for switching a visual recipe to run on Spark.
- **Spark UI:** The native Spark UI is essential for monitoring and debugging the jobs submitted by Dataiku.
- **Apache Spark Documentation:** The official source for learning the Spark DataFrame API.

### 5. Next Steps and Progression
- **Performance Tuning:** In the recipe settings, you can configure Spark properties to tune your job's performance, such as setting the number of executors and their memory.
- **Window Functions:** Use Spark window functions for complex analytical tasks like calculating running totals or moving averages on massive datasets.
- **Spark Streaming:** For real-time use cases, explore Dataiku's streaming capabilities, which can run on Spark Streaming.

### 6. Common Challenges and Solutions
- **Challenge:** "My Spark job is very slow or failing."
- **Solution:** This is a broad problem, but the first place to look is the **Spark UI**. Find your job and look at the "Stages" and "Executors" tabs. Are there data skews? Are executors failing? The Spark UI provides a wealth of information for debugging performance issues.
- **Challenge:** "The 'Spark' option is not available in the execution engine dropdown."
- **Solution:** This means either your Dataiku instance is not configured for Spark, or your input/output datasets are not on a Spark-compatible storage system. They must be on a distributed filesystem, not the local filesystem of the Dataiku server.
`,
  },
  {
    id: 46,
    slug: 'leveraging-cloud-compute-for-large-scale-pipelines',
    question: 'How to get started with + leveraging cloud compute for large-scale pipelines?',
    answer: `
### 1. Introduction/Overview
Modern cloud platforms offer virtually unlimited, on-demand compute resources. Dataiku is designed to leverage this elasticity. Instead of being limited by a single server, you can configure Dataiku to push down computation to powerful cloud data warehouses or to spin up temporary, containerized environments for resource-intensive tasks.

### 2. Prerequisites
- **Dataiku running in the cloud:** While not strictly necessary, it's most common for the Dataiku instance itself to be running on a cloud VM (e.g., AWS EC2, Azure VM, GCP Compute Engine).
- **Cloud data services:** You should be using cloud-native data storage and warehousing (e.g., S3/Redshift, ADLS/Snowflake, GCS/BigQuery).

### 3. Step-by-Step Instructions: Key Strategies

#### Strategy 1: Push-down to a Cloud Data Warehouse
- **Concept:** This is the most efficient strategy. The data never leaves your data warehouse. Dataiku sends the computation *to* the data.
- **How:**
    1.  Connect Dataiku to your cloud data warehouse (Snowflake, Redshift, BigQuery, etc.).
    2.  When using visual recipes (Prepare, Join) on datasets from this warehouse, go to the recipe's **Advanced** settings.
    3.  Set the **Execution engine** to **Run on database (SQL)**.
    4.  When you run the recipe, Dataiku will generate SQL and execute it directly in your powerful cloud warehouse, not on the Dataiku server.

#### Strategy 2: Containerized Execution with Kubernetes
- **Concept:** For tasks that can't be pushed down to SQL (like a custom Python recipe), Dataiku can temporarily spin up a container on a Kubernetes cluster (e.g., AWS EKS, Azure AKS, Google GKE) to run the job.
- **How (Admin Task):**
    1.  An administrator configures the connection between Dataiku and the Kubernetes cluster in **Administration > Containerized Execution**.
    2.  As a user, in your Python recipe's **Advanced** settings, you can now select a **Container** configuration.
    3.  When you run the recipe, Dataiku packages it up, sends it to Kubernetes which runs it in a dedicated pod, and then streams the logs and results back.

### 4. Resources and Tools
- **Cloud Data Warehouse Connections:** The foundation for push-down execution.
- **Containerized Execution Settings:** The admin-level configuration for linking to Kubernetes.
- **Recipe Execution Engine Dropdown:** The user-facing control for choosing where a recipe runs.

### 5. Next Steps and Progression
- **Autoscaling:** Configure your cloud resources (like a Kubernetes node pool or a Snowflake warehouse) to autoscale. They will automatically scale up for large jobs and scale down when idle, optimizing costs.
- **Spot Instances:** Use cheaper spot/preemptible instances for the containerized execution of non-critical development or testing jobs to further reduce costs.
- **GPU Instances:** For deep learning tasks, configure a containerized environment that uses GPU-enabled nodes in your cloud.

### 6. Common Challenges and Solutions
- **Challenge:** "My SQL push-down recipe is slow."
- **Solution:** The performance is now dependent on your cloud data warehouse. You may need to resize your warehouse (e.g., use a larger Snowflake warehouse size) or optimize the generated SQL.
- **Challenge:** "My containerized job is stuck in 'pending'."
- **Solution:** This usually means the Kubernetes cluster doesn't have enough resources (CPU or memory) to schedule the pod for your job. You may need to add more nodes to your cluster or adjust the resource requests for the container configuration.
`,
  },
  {
    id: 47,
    slug: 'deploying-dataiku-in-cloud-environments',
    question: 'How to get started with + deploying Dataiku in cloud environments?',
    answer: `
### 1. Introduction/Overview
Deploying Dataiku in the cloud (AWS, Azure, or GCP) is the standard for building scalable and robust analytics platforms. Cloud deployment offers flexibility, scalability, and easy integration with a rich ecosystem of cloud data services. This guide provides a high-level overview of the common deployment patterns.

### 2. Prerequisites
- **A cloud provider account:** An account with AWS, Azure, or GCP.
- **Basic cloud knowledge:** Understanding of core concepts like Virtual Machines (VMs), storage (S3, Blob), and networking (VPCs, VNETs).
- **A Dataiku License:** You need a valid license file from Dataiku.

### 3. Step-by-Step Instructions: Common Deployment Patterns

#### Pattern 1: Single VM Deployment (Good for small teams, dev/test)
1.  **Launch a Virtual Machine:** In your cloud provider's console, launch a new VM (e.g., AWS EC2, Azure VM). Choose a suitable OS (e.g., Ubuntu, RHEL) and instance size.
2.  **Install Dataiku:** SSH into the newly created VM. Follow the standard Dataiku installation instructions to install the software.
3.  **Configure Networking:** Set up the necessary security group or network rules to allow access to the Dataiku web interface (e.g., open port 11000 to your IP address).
4.  **Connect to Cloud Services:** From within this Dataiku instance, you can then configure connections to other cloud services like S3, Redshift, or BigQuery.

#### Pattern 2: Cloud Marketplace Deployment (Easiest start)
1.  **Go to the Marketplace:** Navigate to your cloud provider's marketplace (e.g., AWS Marketplace).
2.  **Search for Dataiku:** Search for the official Dataiku DSS offering.
3.  **Launch the Template:** The marketplace provides a pre-configured template (like an AMI or an ARM template) that automates the deployment of a Dataiku instance onto a VM with recommended settings. This is often the fastest way to get started.

#### Pattern 3: Kubernetes Deployment (For scalable, production environments)
1.  **Set up a Kubernetes Cluster:** Provision a managed Kubernetes cluster (e.g., AWS EKS, Azure AKS, Google GKE).
2.  **Use Dataiku's Helm Chart:** Dataiku provides an official Helm chart for deploying to Kubernetes. Helm is a package manager that simplifies complex application deployments.
3.  **Deploy Dataiku:** Use the Helm chart to deploy the various components of Dataiku (backend server, execution nodes, etc.) as pods within your cluster. This pattern provides high availability and scalability.

### 4. Resources and Tools
- **Cloud Provider Marketplaces:** The quickest way to launch a pre-configured instance.
- **Dataiku Installation Documentation:** Provides detailed guides for different cloud providers.
- **Dataiku Helm Chart:** The official, supported method for deploying on Kubernetes.

### 5. Next Steps and Progression
- **Infrastructure as Code (IaC):** Use tools like Terraform or AWS CloudFormation to define your entire Dataiku deployment (VMs, networking, databases) in code. This makes your deployments repeatable and version-controlled.
- **High Availability (HA):** For critical production instances, set up a High Availability architecture, which typically involves multiple backend nodes and an external PostgreSQL database for Dataiku's configuration.
- **Automated Backups:** Configure automated snapshots of your Dataiku instance's disk for disaster recovery.

### 6. Common Challenges and Solutions
- **Challenge:** "I can't access the Dataiku UI after installation."
- **Solution:** This is a network configuration issue. Check the security group or firewall rules associated with your VM. Ensure the port Dataiku is running on is open to your IP address.
- **Challenge:** "Which instance size should I choose?"
- **Solution:** The Dataiku documentation provides sizing guidelines based on the number of users and the size of your data. Start with the recommended size and monitor resource usage. You can always resize the VM later if needed.
`,
  },
  {
    id: 48,
    slug: 'using-dataiku-on-kubernetes-docker',
    question: 'How to get started with + using Dataiku on Kubernetes/Docker?',
    answer: `
### 1. Introduction/Overview
Running Dataiku on containers with Docker and Kubernetes is the modern approach for scalable, resilient, and manageable deployments. Docker packages the application, and Kubernetes orchestrates it. This guide covers the concepts of how to use these technologies with Dataiku.

### 2. Prerequisites
- **Familiarity with container concepts:** Understand what Docker images and containers are.
- **A Kubernetes cluster:** A running cluster, such as a managed one from a cloud provider (EKS, AKS, GKE) or a local one like Minikube for testing.
- **\`kubectl\` and \`helm\` CLIs:** You need these command-line tools to interact with your cluster.

### 3. Step-by-Step Instructions: Key Concepts

#### Concept 1: Running Dataiku Itself on Kubernetes
This involves deploying the entire Dataiku platform as a set of services within your Kubernetes cluster.
1.  **Use the Official Helm Chart:** This is the recommended method. Helm charts are packages of pre-configured Kubernetes resources.
2.  **Configure the Deployment:** You will provide a \`values.yaml\` file to the Helm chart to configure your deployment, specifying things like your license key, the type of storage to use, and resource requests.
3.  **Deploy:** Run the \`helm install\` command. Helm will create all the necessary Kubernetes objects (Deployments, Services, PersistentVolumeClaims, etc.) to run Dataiku.
4.  **Benefits:** This gives you a highly available and scalable Dataiku instance. Kubernetes can automatically restart failed pods and you can easily scale the number of replicas.

#### Concept 2: Using Kubernetes to Run Dataiku Jobs (Containerized Execution)
In this model, the main Dataiku instance might run on a VM, but it offloads the execution of specific, heavy jobs to a Kubernetes cluster.
1.  **Configure in Dataiku:** An administrator goes to **Administration > Containerized Execution** and sets up a connection to the Kubernetes cluster.
2.  **Define a Container Configuration:** The admin defines a "base image" (a Docker image with Python and necessary libraries) and resource limits.
3.  **Run a Job:** As a user, in a recipe's **Advanced** settings, you can now select this container configuration as the execution environment.
4.  **How it works:** When you run the recipe, Dataiku packages your code, sends it to Kubernetes, which spins up a temporary pod using your base image to run the job, and then terminates the pod when it's done.
5.  **Benefits:** This provides isolation and scalability for individual jobs without needing to run the entire platform on Kubernetes.

### 4. Resources and Tools
- **Dataiku's Official Helm Chart:** The best practice for deploying the full platform on Kubernetes.
- **Docker Hub:** Where you can find official base images for creating your containerized execution environments.
- **Kubernetes Documentation:** For understanding the core concepts of pods, services, and deployments.

### 5. Next Steps and Progression
- **Infrastructure as Code:** Manage your Kubernetes resources and Helm chart configurations using tools like Terraform or ArgoCD.
- **Monitoring:** Integrate your Kubernetes cluster with monitoring tools like Prometheus and Grafana to track the performance and resource usage of your Dataiku pods.
- **Custom Docker Images:** Build your own custom Docker images with specific OS-level dependencies or pre-installed libraries for your containerized execution environments.

### 6. Common Challenges and Solutions
- **Challenge:** "My Dataiku pod is CrashLooping."
- **Solution:** Use \`kubectl describe pod <pod-name>\` to see why it's failing. A common reason is that it can't connect to the backend database. Then use \`kubectl logs <pod-name>\` to view the detailed startup logs from the Dataiku container itself.
- **Challenge:** "My containerized job fails immediately."
- **Solution:** This often means the Docker image is missing a required dependency or there's a permissions issue with the service account Kubernetes is using. Check the logs of the failed job pod.
`,
  },
  {
    id: 49,
    slug: 'optimizing-performance-on-big-data-jobs',
    question: 'How to get started with + optimizing performance on big data jobs?',
    answer: `
### 1. Introduction/Overview
When working with big data, performance is key. A job that takes hours instead of minutes can severely impact productivity. Performance optimization in Dataiku is about choosing the right tool for the job and ensuring that computation happens in the most efficient location.

### 2. Prerequisites
- **A slow-running job:** You need an existing pipeline that is taking too long to run.
- **Understanding of your data's location and size.**
- **Knowledge of your available compute engines** (e.g., an in-memory server, a SQL database, a Spark cluster).

### 3. Step-by-Step Instructions: A Troubleshooting Framework
1.  **Identify the Bottleneck:**
    *   Go to the **Jobs** menu and find a run of your slow pipeline.
    *   The job view provides a Gantt chart showing the duration of every recipe.
    *   Identify the specific recipe or recipes that are taking the most time. This is where you will focus your efforts.
2.  **Analyze the Bottleneck Recipe:** Click on the slow recipe. Ask the following questions:
    *   **Where is the data?** Is it in a SQL database, HDFS, S3, or on the local filesystem?
    *   **Where is the recipe running?** Open the recipe's **Advanced** settings and check the **Execution engine**.
3.  **Apply the Core Optimization Principle: Push Down Computation.**
    *   **If the data is in a SQL Database (Snowflake, Redshift, etc.):** The recipe *must* run on the database. Change the execution engine to **Run on database (SQL)**. This is the single most important optimization.
    *   **If the data is in HDFS/S3/GCS and is very large:** The recipe *must* run on a distributed engine. Change the execution engine to **Spark**.
    *   **If the recipe is running "In-Memory":** This is a red flag for big data. It means Dataiku is pulling all the data from your source to the Dataiku server to process it. This is slow and can cause memory errors. **Avoid the in-memory engine for large datasets.**
4.  **Other Key Optimizations:**
    *   **Use efficient file formats:** Store intermediate datasets as **Parquet** instead of CSV. Parquet is a columnar format that is much more performant for analytics.
    *   **Filter data early:** In your pipeline, filter out unnecessary rows and columns as early as possible. The less data you have to process in downstream steps, the faster they will be.
    *   **Partition your data:** If your data is time-based, partition it by date. This allows jobs to process only the latest partition instead of the entire history.

### 4. Resources and Tools
- **Job Inspector:** Your primary tool for identifying which recipes are the bottlenecks.
- **Execution Engine Dropdown:** The control for pushing down computation.
- **Dataset Format Settings:** Where you can change the storage format to something efficient like Parquet.

### 5. Next Steps and Progression
- **Spark Tuning:** If using Spark, you can tune its performance by adjusting memory and executor settings in the recipe configuration.
- **SQL Query Optimization:** If pushing down to SQL, you can use a SQL recipe to write a highly optimized query, potentially outperforming the SQL generated by a visual recipe.
- **Benchmarking:** After making an optimization, always re-run the job and measure the new time to confirm that your change had a positive impact.

### 6. Common Challenges and Solutions
- **Challenge:** "I changed the engine to Spark, but it's still slow."
- **Solution:** The problem may now be with the Spark job itself. Use the Spark UI to debug the job. Look for issues like data skew or insufficient cluster resources.
- **Challenge:** "The 'Run on database' option is greyed out."
- **Solution:** This means either the recipe type is not compatible with SQL push-down, or your input/output datasets are not from the same database connection.
`,
  },
  {
    id: 50,
    slug: 'migrating-alteryx-workflows-into-dataiku',
    question: 'How to get started with + migrating Alteryx workflows into Dataiku?',
    answer: `
### 1. Introduction/Overview
Migrating from a legacy tool like Alteryx to Dataiku is a common project that can unlock significant benefits in scalability, collaboration, and governance. The process is a manual "translation" of the logic, which provides an excellent opportunity to refactor and improve the original workflow.

### 2. Prerequisites
- **Access to the Alteryx workflow:** You need to be able to see the tools and logic in the original Alteryx workflow.
- **A Dataiku instance:** The target platform for the migration.
- **Understanding of both tools:** You should know the basic concepts of both Alteryx (tools, containers) and Dataiku (recipes, Flow).

### 3. Step-by-Step Instructions: The Migration Process
1.  **Deconstruct the Alteryx Workflow:**
    *   Open the Alteryx workflow. Go through it tool by tool.
    *   For each tool, understand its purpose: Is it filtering data? Joining? Calculating a new field?
    *   Document this sequence of logical steps. A simple spreadsheet is a good tool for this.
2.  **Map Alteryx Tools to Dataiku Recipes:**
    *   Create a "translation map." Most Alteryx tools have a direct equivalent in Dataiku.
        *   Alteryx \`Input Data\` -> Dataiku **Dataset** (e.g., from SQL or a file).
        *   Alteryx \`Filter\`, \`Formula\`, \`Select\` -> Steps in a Dataiku **Prepare** recipe.
        *   Alteryx \`Join\` -> Dataiku **Join** recipe.
        *   Alteryx \`Summarize\` -> Dataiku **Group** recipe.
        *   Alteryx \`Output Data\` -> Dataiku **Export** recipe.
3.  **Rebuild the Flow in Dataiku:**
    *   Following your map, reconstruct the logic in a Dataiku Flow.
    *   Start by creating the input datasets.
    *   Chain the appropriate visual recipes together to replicate the transformation logic.
4.  **Handle Custom Macros and Code:**
    *   If the Alteryx workflow uses custom macros or R/Python code tools, you will need to rewrite that logic in a Dataiku **Python recipe**.
5.  **Validate the Output:**
    *   Run both the original Alteryx workflow and the new Dataiku flow on the same input data.
    *   Import the output from Alteryx into Dataiku.
    *   Use a **Stack** recipe followed by a **Group** recipe or a custom Python script to compare the two outputs row by row and field by field to ensure they are identical.

### 4. Resources and Tools
- **The Alteryx Workflow Canvas:** Your source of truth for the original logic.
- **Dataiku Visual Recipes:** The building blocks for the new flow.
- **Validation Techniques:** Stacking and comparing outputs is a crucial final step.

### 5. Next Steps and Progression
- **Optimization:** Don't just do a "lift and shift." Use the migration as a chance to improve the pipeline. Can you switch from file-based sources to direct database connections? Can you push down computation to a database or Spark?
- **Automation:** Once migrated and validated, create a **Scenario** to schedule and automate your new Dataiku pipeline.
- **User Training:** Train the original Alteryx users on how to use and maintain the new flow in Dataiku.

### 6. Common Challenges and Solutions
- **Challenge:** "There's no direct equivalent for a specific Alteryx tool."
- **Solution:** This is rare, but if it happens, you will need to replicate the tool's logic in a **Python recipe**. This gives you the flexibility to code any custom transformation you need.
- **Challenge:** "The outputs don't match exactly."
- **Solution:** This requires careful, step-by-step debugging. Compare the output of each intermediate step in Alteryx with the corresponding intermediate dataset in Dataiku to pinpoint exactly where the logic diverges. Common culprits are differences in join types, filter conditions, or floating-point precision.
`,
  },
  {
    id: 51,
    slug: 'creating-dashboards-inside-dataiku',
    question: 'How to get started with + creating dashboards inside Dataiku?',
    answer: `
### 1. Introduction/Overview
Dashboards are used to communicate insights from your data to a broader audience. Dataiku has a built-in dashboarding engine that allows you to combine charts, metrics, text, and other insights into a single, shareable view.

### 2. Prerequisites
- **Data to visualize:** You need at least one dataset in your project.
- **Insights to share:** You should have already created some charts or computed some metrics that you want to display.

### 3. Step-by-Step Instructions
1.  **Create Your Charts First:**
    *   Dashboards are for displaying existing insights. You must create the content first.
    *   Open a dataset and go to the **Charts** tab.
    *   Create one or more charts (e.g., a bar chart, line chart). Give each chart a clear name and save it.
2.  **Create a New Dashboard:**
    *   In your project's top navigation bar, go to **Dashboards**.
    *   Click **+ NEW DASHBOARD**.
    *   Give it a name and choose a layout (e.g., grid-based).
3.  **Add Content (Tiles):**
    *   Your new dashboard is a blank canvas. Click **+ ADD A TILE**.
    *   A dialog will appear, allowing you to add different types of content:
        *   **Chart:** Select a chart you previously saved from a dataset.
        *   **Metric:** Select a metric you computed on a dataset's "Status" tab.
        *   **Dataset View:** Show a preview of a dataset.
        *   **Text:** Add titles, explanations, and context.
4.  **Arrange the Layout:**
    *   You can drag and drop the tiles to arrange them on the dashboard.
    *   Resize the tiles by dragging their corners.
    *   Use **Text** tiles to create headers and sections to organize your dashboard.
5.  **View and Share:** Click the **View** button to see the final dashboard. You can share it with other Dataiku users by sending them the link.

### 4. Resources and Tools
- **Charts Tab:** The workspace for creating the individual visualizations.
- **Dashboards Page:** The canvas for arranging your tiles and building the final report.
- **Tile Editor:** The dialog for adding and configuring content on your dashboard.

### 5. Next Steps and Progression
- **Interactivity:** Add dashboard-level filters. This allows viewers to filter all the charts on the dashboard at once (e.g., by date range or by country).
- **Automation:** Create a **Scenario** that automatically rebuilds the datasets on your dashboard and then refreshes the dashboard caches, ensuring the data is always up-to-date.
- **Exporting and Reporting:** Use a scenario reporter to automatically export your dashboard as a PDF and email it to stakeholders on a schedule.

### 6. Common Challenges and Solutions
- **Challenge:** "My chart is not showing up in the 'Add Tile' list."
- **Solution:** You must explicitly save the chart in the "Charts" tab of the dataset first. If you don't save it, it won't be available to add to a dashboard.
- **Challenge:** "The data on my dashboard is stale."
- **Solution:** The data for charts is cached for performance. You need to set up a scenario to automatically rebuild the underlying datasets and then add a "Refresh dashboard caches" step to force the charts to update.
`,
  },
  {
    id: 52,
    slug: 'exporting-datasets-to-tableau-power-bi',
    question: 'How to get started with + exporting datasets to Tableau/Power BI?',
    answer: `
### 1. Introduction/Overview
While Dataiku has its own dashboarding tools, many organizations have standardized on BI tools like Tableau or Power BI. Dataiku integrates easily into this ecosystem by allowing you to export your final, prepared datasets to a location that these tools can access.

### 2. Prerequisites
- **A final dataset:** The Dataiku dataset you want to visualize in your BI tool.
- **A shared data location:** You need a storage system that both Dataiku and your BI tool can connect to. A **SQL database** (like Snowflake, SQL Server, or PostgreSQL) is the most common and recommended choice.
- **Connection configured:** The connection to this shared database must be configured in Dataiku.

### 3. Step-by-Step Instructions
1.  **Select Your Final Dataset:** In your Dataiku Flow, select the dataset you want to export. This should be a clean, aggregated dataset ready for reporting.
2.  **Create an Export Recipe:**
    *   From the right-hand panel, click **+ RECIPE** and choose **Export**.
3.  **Configure the Export Destination:**
    *   In the Export recipe, click **Add Export**.
    *   Choose your shared data location. Select your configured **SQL database connection**.
    *   Specify the name of the new table you want to create in the database (e.g., \`TABLEAU_SALES_REPORT\`).
    *   Choose the write mode (usually "Overwrite" to replace the table with fresh data each time).
4.  **Run the Export:** Run the Export recipe. Dataiku will now take the data from your dataset and write it into a new table in your SQL database.
5.  **Connect Your BI Tool:**
    *   In Tableau or Power BI, create a new data source.
    *   Connect to the same SQL database.
    *   Select the \`TABLEAU_SALES_REPORT\` table you just created.
    *   You can now build your dashboards in your BI tool using this data.

### 4. Resources and Tools
- **Export Recipe:** The key Dataiku tool for writing data to external systems.
- **SQL Database:** The recommended intermediary for connecting Dataiku and BI tools.
- **BI Tool Connector:** The data source connector in Tableau or Power BI for your specific database.

### 5. Next Steps and Progression
- **Automation:** Create a **Scenario** in Dataiku that rebuilds your entire pipeline and ends with the Export recipe. Schedule this scenario to run daily to keep the data in your BI tool fresh.
- **Live Connection (Advanced):** Some BI tools offer connectors that can query Dataiku directly via its REST API, allowing for live connections without an intermediate database. However, this is often less performant for large datasets than the export-to-database method.

### 6. Common Challenges and Solutions
- **Challenge:** "The export recipe fails with a database error."
- **Solution:** This is usually a permissions issue. Check that the user credentials Dataiku is using for the database connection have \`CREATE TABLE\` and \`INSERT\` permissions in the target schema.
- **Challenge:** "Should I export the raw data or prepared data?"
- **Solution:** Always export the final, prepared, and often aggregated data. The heavy data preparation and transformation should be done in Dataiku. The BI tool should be used primarily for visualization, not complex ETL.
`,
  },
  {
    id: 53,
    slug: 'embedding-dataiku-insights-into-bi-tools',
    question: 'How to get started with + embedding Dataiku insights into BI tools?',
    answer: `
### 1. Introduction/Overview
In addition to exporting full datasets, you can also embed individual charts or dashboards from Dataiku directly into other web-based platforms, including some BI tools that support web content embedding. This is useful for sharing a specific, key visualization without recreating it.

### 2. Prerequisites
- **A saved chart or dashboard in Dataiku.**
- **A BI tool or web portal that supports embedding web content** (usually via an \`<iframe>\`).
- **Shared user access:** The user viewing the embedded chart in the BI tool must also have at least read access to that chart in Dataiku.

### 3. Step-by-Step Instructions
1.  **Navigate to the Chart or Dashboard in Dataiku:** Open the insight you want to embed.
2.  **Find the Share Button:**
    *   On a chart or dashboard, look for a **Share** button or icon.
3.  **Get the Embed Code:**
    *   Clicking "Share" will open a dialog. Go to the **Embed** tab.
    *   This will provide you with an HTML snippet, which will be an \`<iframe>\` tag.
    *   Copy this \`<iframe>\` code.
4.  **Embed in Your BI Tool:**
    *   Go to your BI tool (e.g., Tableau, Power BI, or another web portal).
    *   Find the feature that allows you to add "Web Content" or "Embed" a URL or HTML.
    *   Paste the \`<iframe>\` code you copied from Dataiku.
5.  **View the Result:** The Dataiku chart should now appear as a widget inside your BI dashboard. When a user views it, their browser will render the content directly from the Dataiku server.

### 4. Resources and Tools
- **Share/Embed Feature:** The UI in Dataiku for getting the embed code.
- **\`<iframe>\` HTML Tag:** The standard web technology used for embedding.

### 5. Next Steps and Progression
- **Passing Filters:** For advanced use cases, you can sometimes pass filter values from the BI tool to the embedded Dataiku chart via URL parameters, allowing for some interactivity. This requires custom development.
- **Authentication:** This method relies on the user having an active session in both the BI tool and Dataiku. For a more seamless experience in an enterprise setting, you would need to set up Single Sign-On (SSO) between your BI tool and Dataiku.

### 6. Common Challenges and Solutions
- **Challenge:** "The embedded chart shows a login screen or an error."
- **Solution:** This is an authentication issue. The user viewing the dashboard does not have a valid, active session in Dataiku, or they do not have permission to view that specific chart. They must be logged into Dataiku and have at least read access to the project containing the chart.
- **Challenge:** "The embedded chart is interactive, but it feels slow."
- **Solution:** The performance is dependent on the Dataiku server. If the chart is complex, it may take time to render. This method is best for simple, summary charts. For highly interactive, large-scale dashboards, the recommended approach is to export the data to a database and build the dashboard natively in the BI tool.
`,
  },
  {
    id: 54,
    slug: 'designing-kpi-dashboards-within-dss',
    question: 'How to get started with + designing KPI dashboards within DSS?',
    answer: `
### 1. Introduction/Overview
A KPI (Key Performance Indicator) dashboard provides a high-level, at-a-glance view of the most important business metrics. In Dataiku, you can design these dashboards by first computing your KPIs and then displaying them as prominent "metric" tiles.

### 2. Prerequisites
- **A clear definition of your KPIs:** You must know which metrics you need to track (e.g., "Total Sales this Month," "Daily Active Users").
- **A dataset containing the data** needed to calculate these KPIs.

### 3. Step-by-Step Instructions
#### Part 1: Compute and Store the KPIs
1.  **Calculate the KPIs:** Use a recipe (like **Group** or **Window**) to calculate your KPI values. The result should be a dataset where each row represents a KPI. For example, a dataset with one row and columns like \`total_sales\`, \`active_users\`, etc.
2.  **Create Metrics from the Dataset:**
    *   Open your new KPI dataset and go to the **Status** tab.
    *   Click on **Metrics**.
    *   Click **+ ADD METRIC** and choose **Column statistics**.
    *   Select the column containing your KPI value (e.g., \`total_sales\`). For the aggregation, choose **Value of first row** (since your dataset has only one row).
    *   Give the metric a clear name, like \`KPI_Total_Sales\`.
    *   Repeat this for each KPI.

#### Part 2: Build the Dashboard
1.  **Create a New Dashboard:** Go to **Dashboards > + NEW DASHBOARD**.
2.  **Add Metric Tiles:**
    *   On your blank dashboard, click **+ ADD A TILE**.
    *   Choose **Metric** as the tile type.
    *   Select the KPI metric you just created (e.g., \`KPI_Total_Sales\`).
    *   Configure the tile's appearance (e.g., add a text label, change color).
3.  **Arrange the Dashboard:** Add a tile for each of your key KPIs. Arrange them prominently at the top of your dashboard. You can supplement them with charts for historical trends.
4.  **Automate the Refresh:** Create a **Scenario** that first rebuilds your KPI dataset, then recomputes the metrics, and finally refreshes the dashboard caches. Schedule this to run regularly.

### 4. Resources and Tools
- **Group Recipe:** Often used to aggregate data to the KPI level.
- **Status Tab (Metrics):** The UI for defining the metrics that will be displayed on the dashboard.
- **Dashboard Metric Tile:** The specific widget used to display a single, large number (your KPI).

### 5. Next Steps and Progression
- **Trend Indicators:** In the metric tile settings, you can add a "trend" by comparing the latest value to a previous value (e.g., from a different partition), showing an up or down arrow.
- **Alerting:** In your scenario, add a **Run checks** step on your metrics. You can set a check that fails if a KPI goes above or below a certain threshold, triggering an alert.

### 6. Common Challenges and Solutions
- **Challenge:** "My KPI value on the dashboard is not updating."
- **Solution:** You have missed a step in the automation. Your scenario must do three things in order: 1. **Build** the dataset containing the KPI value. 2. **Update** the metrics on that dataset. 3. **Refresh** the dashboard caches. If any step is missing, the dashboard will show stale data.
- **Challenge:** "The metric tile shows a weird number."
- **Solution:** Check the aggregation you chose when creating the metric. If your KPI dataset has multiple rows, using "Sum" or "Average" might give you an unexpected result. Ensure your KPI dataset is aggregated correctly first.
`,
  },
  {
    id: 55,
    slug: 'scheduling-excel-report-generation-in-dataiku',
    question: 'How to get started with + scheduling Excel report generation in Dataiku?',
    answer: `
### 1. Introduction/Overview
Many business processes still rely on Excel reports. Dataiku can automate the entire process of generating and distributing these reports, saving significant manual effort and ensuring consistency. The process involves creating the dataset for the report and then using a Scenario to export and distribute it.

### 2. Prerequisites
- **A final dataset:** The dataset in your Dataiku Flow that you want to export as an Excel file.
- **A destination for the file:** Decide where the generated Excel file should be saved (e.g., a shared network drive, a cloud storage bucket, or just sent via email).

### 3. Step-by-Step Instructions
1.  **Prepare the Data:** In your Flow, create the final, clean, and aggregated dataset that will be the content of your Excel report.
2.  **Create an Export Recipe:**
    *   Select your final dataset.
    *   From the right-hand panel, choose the **Export** recipe.
    *   Click **Add Export**.
    *   For the destination, you can choose a **Managed Folder** (to save it within Dataiku) or a connection to an external filesystem like **S3** or a **File Server**.
    *   Set the **Format** to **Excel (.xlsx)**.
3.  **Create an Automation Scenario:**
    *   Go to **Scenarios** and create a new scenario.
4.  **Define the Steps:**
    *   **Step 1:** Add a **Build / Train** step. In this step, build the **Export** recipe you just created. This will first build the final dataset and then run the export, generating the Excel file.
    *   **(Optional) Step 2: Distribute the Report.** See "Next Steps" below.
5.  **Schedule the Scenario:**
    *   Go to the **Settings > Triggers** tab and add a **Time-based** trigger to run this report generation on your desired schedule (e.g., every Monday at 9 AM).

### 4. Resources and Tools
- **Export Recipe:** The tool to convert a Dataiku dataset into an Excel file.
- **Managed Folders:** A convenient place to store the generated files within Dataiku's managed storage.
- **Scenarios:** The engine for automating and scheduling the entire process.

### 5. Next Steps and Progression
- **Email Distribution:** In your scenario, add a **Reporter**. Configure a **Mail** reporter. You can configure this email to attach the file directly from the managed folder where the Export recipe saved it.
- **Multiple Sheets:** The Excel export recipe has options to export multiple datasets as different sheets within the same Excel workbook.
- **Dynamic Filenames:** Use project variables in the output path of your Export recipe to create dynamically named files, e.g., \`sales_report_\${current_date}.xlsx\`.

### 6. Common Challenges and Solutions
- **Challenge:** "The Export recipe fails with a permissions error."
- **Solution:** If you are exporting to an external filesystem (like a shared network drive or S3), ensure the user account that the Dataiku server runs as has write permissions to that specific folder.
- **Challenge:** "The Excel file has formatting issues."
- **Solution:** The default Excel export produces a raw data dump. For highly customized formatting (colors, fonts, pivot tables), the standard approach is to use Dataiku to generate the clean data and then use a tool with stronger Excel integration (like a Python script with a library like \`openpyxl\`) or a BI tool to create the final, formatted report.
`,
  },
  {
    id: 56,
    slug: 'automating-slack-or-email-report-distribution',
    question: 'How to get started with + automating slack or email report distribution?',
    answer: `
### 1. Introduction/Overview
Distributing reports and alerts is a key part of any automated data pipeline. Dataiku's **Scenarios** have a powerful feature called **Reporters** that can send customized messages and attachments to services like Email and Slack, keeping stakeholders informed automatically.

### 2. Prerequisites
- **An output to deliver:** This could be a Dataiku Dashboard, a dataset, or a file saved in a managed folder.
- **A scenario** that builds this output.
- **Service Configuration (Admin Task):** Your Dataiku administrator must have configured the integration with your company's email server and/or Slack workspace in **Administration > Settings**.

### 3. Step-by-Step Instructions
1.  **Navigate to Your Scenario:** Go to **Scenarios** and open the one you want to add notifications to.
2.  **Open the Reporters Tab:** Click on the **Reporters** tab.
3.  **Add a New Reporter:** Click **+ ADD REPORTER**.
4.  **Choose a Channel:** Select either **Mail** or **Slack**.
5.  **Configure the Reporter:**
    *   **Run Condition:** Decide when the message should be sent (e.g., \`On failure\`, \`On success\`, \`On completion\`).
    *   **Recipients:** Enter the destination email addresses or the Slack channel name.
    *   **Message:** Write the body of your message. You can use variables like \`\${scenarioName}\`, \`\${outcome}\`, and \`\${jobURL}\` for context. For example: "Here is the daily sales report for \${current_date}."
6.  **Add an Attachment:**
    *   This is the key step for delivering an output. In the reporter's configuration, find the "Attachments" section.
    *   **To send a Dashboard:** Select "Dashboard" and choose the dashboard you want to send from the dropdown. You can select the format (e.g., PDF or PNG).
    *   **To send a Dataset:** Select "Dataset" and choose the dataset. It will be attached as a CSV file.
    *   **To send a File:** Select "File from managed folder" and provide the path to the file (e.g., an Excel report generated by an Export recipe).
7.  **Save and Schedule:**
    *   Save the scenario.
    *   Ensure your scenario is scheduled to run regularly using a **Time-based trigger** in the "Settings" tab.

### 4. Resources and Tools
- **Reporters:** The main feature for configuring all automated communications.
- **Attachments Configuration:** The specific section within a reporter for adding your outputs.
- **Export Recipe:** Use this before the reporter step to generate a nicely formatted Excel file if needed.

### 5. Next Steps and Progression
- **Conditional Delivery:** Use a Python scenario step to check a condition. The script could then set a project variable (e.g., \`should_send_report = True\`). You can then use this variable to make the reporter's execution conditional.
- **Customized Content:** For highly customized email bodies, a Python step can generate HTML content, save it to a variable, and you can then use that variable in the email reporter body.

### 6. Common Challenges and Solutions
- **Challenge:** "The attached file is too large for the email server."
- **Solution:** Don't attach the file directly. Instead, have your pipeline export the file to a shared location (like a cloud storage bucket or SharePoint). Then, in your reporter message, include a *link* to the file instead of the file itself.
- **Challenge:** "The dashboard PDF export looks strange or is cut off."
- **Solution:** The PDF export of a dashboard is sensitive to the layout. You may need to adjust the size and arrangement of your dashboard tiles to ensure they fit nicely onto a standard page format for the PDF export. Try to use standard slide sizes (like 16:9) for your dashboard layout.
`,
  },
  {
    id: 57,
    slug: 'exporting-model-predictions-for-stakeholder-review',
    question: 'How to get started with + exporting model predictions for stakeholder review?',
    answer: `
### 1. Introduction/Overview
Once you have trained a model and used it to make predictions, you often need to share these predictions with business stakeholders for review, validation, or action. This process can be easily automated in Dataiku.

### 2. Prerequisites
- **A deployed "Saved Model"** in your Flow.
- **A dataset to score:** A dataset containing new records for which you want to generate predictions.
- **An understanding of the desired output format** (e.g., CSV, Excel).

### 3. Step-by-Step Instructions
1.  **Generate the Predictions (Score Recipe):**
    *   In your Flow, select the dataset you want to score.
    *   From the right-hand panel, choose the **Score** recipe.
    *   Select your deployed Saved Model.
    *   Run the recipe. This creates a new output dataset that includes the original data plus new columns for the prediction, probabilities, etc.
2.  **Prepare the Output (Optional but Recommended):**
    *   The output of the Score recipe can be technical. It's good practice to add a **Prepare** recipe after it to create a clean, human-readable report.
    *   In this Prepare recipe, you can:
        *   Remove unnecessary columns.
        *   Rename technical columns (e.g., rename \`prediction_churn\` to \`Predicted_Churn_Status\`).
        *   Create a clean "confidence" score from the probabilities.
3.  **Export the Final Report (Export Recipe):**
    *   Select your cleaned-up prediction dataset.
    *   From the right-hand panel, choose the **Export** recipe.
    *   Configure it to save the data in the desired format (e.g., **Excel**) and to a desired location (e.g., a **Managed Folder**).
4.  **Automate and Distribute:**
    *   Create a **Scenario** that builds the Export recipe.
    *   Add a **Reporter** to the scenario to automatically email the exported file to your stakeholders on a recurring schedule.

### 4. Resources and Tools
- **Score Recipe:** The tool for applying a model to new data.
- **Prepare Recipe:** Essential for cleaning up the output for a non-technical audience.
- **Export Recipe:** The tool for converting the final dataset into a shareable file format.
- **Scenarios & Reporters:** The engine for automating the entire generation and distribution process.

### 5. Next Steps and Progression
- **Interactive Webapp:** For a more interactive review process, build a simple **Dataiku Webapp**. The webapp could display a filterable table of the predictions and allow stakeholders to explore the results directly in their browser.
- **Writing to a BI Tool Table:** Instead of a file, use the Export recipe to write the predictions to a table that feeds a Tableau or Power BI dashboard for stakeholder review.

### 6. Common Challenges and Solutions
- **Challenge:** "The stakeholders are confused by the raw output of the Score recipe."
- **Solution:** This is why the optional "Prepare the Output" step is so important. Never show raw prediction logs or probabilities to a business audience. Always create a clean, simple, and well-documented final report with clear column names.
- **Challenge:** "The file is too large to email."
- **Solution:** In the Export recipe, instead of exporting to a managed folder to attach, export the file to a shared cloud storage location (like S3 or SharePoint). Then, have the email reporter send a *link* to the file instead of attaching it.
`,
  },
  {
    id: 58,
    slug: 'building-stakeholder‑ready-reports-in-dataiku',
    question: 'How to get started with + building stakeholder‑ready reports in Dataiku?',
    answer: `
### 1. Introduction/Overview
A stakeholder-ready report is more than just data; it's a narrative that provides context, summarizes key findings, and presents insights in a clear, digestible way. Dataiku **Dashboards** are the perfect tool for creating these reports, as they allow you to combine data, visualizations, and explanatory text.

### 2. Prerequisites
- **A clear audience and purpose:** Who are you building this for, and what one or two key messages do you want them to take away?
- **Finalized data and charts:** Your underlying data pipelines should be complete, and you should have already created the key charts and metrics you want to present.

### 3. Step-by-Step Instructions
1.  **Structure Your Narrative (Storyboarding):** Before you build, plan your report's story. A good structure is:
    *   **Title and Executive Summary:** What is this report about and what is the main conclusion?
    *   **Key Metrics (KPIs):** The most important high-level numbers.
    *   **Supporting Visualizations:** Charts and graphs that provide details and trends.
    *   **Commentary and Next Steps:** Your interpretation of the results and what should happen next.
2.  **Create a New Dashboard:** In your project, go to **Dashboards > + NEW DASHBOARD**.
3.  **Build the Report Using Tiles:**
    *   **Title:** Use a large **Text** tile for the report title.
    *   **Executive Summary:** Add another Text tile below the title with a few bullet points summarizing the key findings.
    *   **KPIs:** Add **Metric** tiles for your most important KPIs. Arrange them in a prominent row at the top.
    *   **Charts:** Add the pre-saved **Chart** tiles that support your narrative. Give each chart a clear title.
    *   **Context:** Intersperse your charts with smaller Text tiles that explain what the viewer is looking at and what the key insight is.
4.  **Refine the Layout:** Arrange and resize the tiles to create a clean, logical flow that guides the viewer's eye through the story you've constructed.
5.  **Share with Stakeholders:** Once complete, you can share a direct link to the dashboard with other Dataiku users.

### 4. Resources and Tools
- **Dashboards:** The canvas for building your report.
- **Text Tiles:** Crucial for adding the narrative, context, and explanations that turn a collection of charts into a real report.
- **Metric and Chart Tiles:** The building blocks for displaying your data.

### 5. Next Steps and Progression
- **Automated PDF/Email Reporting:** Create a **Scenario** with a **Reporter** to automatically export a PDF of the dashboard and email it to your stakeholders on a recurring schedule.
- **Interactive Filters:** Add dashboard-level filters (e.g., a date range dropdown) to allow stakeholders to self-serve and explore the data for different time periods.
- **Dataiku Apps:** For a fully interactive, guided experience, consider building a Dataiku Webapp that walks users through the results step-by-step.

### 6. Common Challenges and Solutions
- **Challenge:** "My dashboard is too cluttered and confusing."
- **Solution:** You are trying to show too much. A good report focuses on a few key messages. Be ruthless about removing any chart or metric that doesn't directly support your main narrative. Use whitespace and text tiles to create clear sections.
- **Challenge:** "Stakeholders don't understand what the charts mean."
- **Solution:** You haven't provided enough context. Every chart should have a descriptive title, and you should add a text tile next to it that says, "This chart shows X, and the key takeaway is Y." Never assume a chart can speak for itself.
`,
  },
  {
    id: 59,
    slug: 'documenting-pipelines-and-outputs-effectively',
    question: 'How to get started with + documenting pipelines and outputs effectively?',
    answer: `
### 1. Introduction/Overview
Effective documentation is crucial for making your data projects understandable, maintainable, and trustworthy. It helps your colleagues (and your future self) understand what a pipeline does and why. Dataiku is designed for this, with built-in documentation features at every level.

### 2. Prerequisites
- **A completed Dataiku project or pipeline.**
- **An understanding of the project's purpose and logic.**

### 3. Step-by-Step Instructions: A Multi-Layered Approach
1.  **High-Level Documentation (The "What and Why"):**
    *   **Use the Project Wiki:** Every project has a built-in Wiki. Use the homepage of the Wiki as a "ReadMe" file.
    *   Document the project's **business purpose**, the **key data sources**, the **main outputs**, and who the **project owners** are.
2.  **Flow-Level Documentation (The "How"):**
    *   **Use Descriptions on Every Object:** This is the most important habit to build. Every dataset and every recipe has a **Summary** tab with a "Description" field.
        *   For a **dataset**, describe what data it contains (e.g., "Cleaned customer data with one row per active customer").
        *   For a **recipe**, describe its action (e.g., "Filters out test users and joins customer data with sales data").
    *   These descriptions are visible directly in the Flow, making it self-documenting.
    *   **Use Flow Zones and Text Boxes:** Organize your flow into named zones (e.g., "Ingestion," "Preparation"). You can also add text boxes directly to the flow to act as large comments for different sections.
3.  **Column-Level Documentation (The "Data Dictionary"):**
    *   **Use Column Descriptions:** Open a dataset, go to the "Settings" tab. You can edit the schema and add a description for each individual column, explaining what it means and how it was calculated. This creates a data dictionary.
4.  **Code-Level Documentation:**
    *   **Use Comments and Docstrings:** In any Python or SQL recipe, use comments (\`#\` or \`--\`) and docstrings to explain complex parts of your code.

### 4. Resources and Tools
- **The Description Field:** The most critical documentation feature, available on all Dataiku objects.
- **Project Wiki:** For long-form documentation, project plans, and meeting notes.
- **Flow Zones & Text Boxes:** For visually organizing and annotating the Flow.

### 5. Next Steps and Progression
- **Automated Documentation Generation:** For advanced use cases, you can write a Python script using the Dataiku API that loops through all project objects, extracts their metadata (names, descriptions, tags, schema), and generates a formal documentation website or document.
- **Standardized Templates:** Create a documentation template in your Wiki that all new projects should follow to ensure consistency.

### 6. Common Challenges and Solutions
- **Challenge:** "Nobody has time to write documentation."
- **Solution:** Make it part of the process. Documentation shouldn't be an afterthought. The best time to write the description for a recipe is right after you've built it, while the logic is still fresh in your mind. Make it a part of your team's "definition of done."
- **Challenge:** "The documentation is out of date."
- **Solution:** Make updating the documentation a part of every change request. If you modify a recipe, you must also update its description to reflect the change.
`,
  },
  {
    id: 60,
    slug: 'training-end-users-on-self-service-analytics',
    question: 'How to get started with + training end users on self-service analytics?',
    answer: `
### 1. Introduction/Overview
Empowering business users to perform their own analysis (self-service) is a key goal of modern data platforms. Training is essential for this. The goal is not to turn them into data engineers, but to give them the confidence to explore data, use pre-built applications, and answer their own questions within a safe and governed environment.

### 2. Prerequisites
- **A target group of end-users:** Identify the business team you want to enable.
- **A well-prepared Dataiku project:** You need a project with clean, certified "golden" datasets and potentially some pre-built dashboards or Dataiku Apps for them to use.
- **A training plan.**

### 3. Step-by-Step Instructions: A Training Framework
1.  **Start with the "Why":** Begin the training by explaining what Dataiku is and how it will help them in their day-to-day job (e.g., "get answers faster," "build your own reports without waiting for IT").
2.  **Focus on Consumption, Not Creation:**
    *   The first session should be entirely about how to **consume** information.
    *   Show them how to navigate to a **Dashboard**, how to use the interactive filters, and how to export charts or data.
    *   If you have a **Dataiku App**, walk them through how to use its simple UI.
3.  **Introduce Data Exploration:**
    *   Show them how to open a certified ("golden") dataset.
    *   Teach them two key skills:
        *   **Filtering:** How to use the "Filter" dialog to quickly slice the data.
        *   **Basic Charts:** How to use the **Charts** tab to create a simple bar chart or line chart by dragging and dropping columns.
4.  **Provide a Safe Sandbox:**
    *   Give them "Reader" access to production projects but "Writer" access to a dedicated "Sandbox" project.
    *   Encourage them to upload their own small CSV files and experiment with the **Prepare** recipe in their sandbox.
5.  **Hold "Office Hours":** Schedule regular, optional sessions where users can drop in and ask questions or get help with a specific analysis they are trying to perform.

### 4. Resources and Tools
- **Dataiku Dashboards and Apps:** The primary tools for end-user consumption.
- **Certified "Golden" Datasets:** Provide clean, reliable data for them to explore. Tag these datasets clearly.
- **Dataiku Academy:** The "Business User" learning path is designed specifically for this audience.

### 5. Next Steps and Progression
- **Advanced Charting:** Hold a follow-up session on more advanced chart types and customization options.
- **Visual Recipes:** For power users, introduce the basic visual recipes like **Prepare** and **Group**, showing them how they can perform their own simple data manipulations.
- **Showcase Success:** When a business user successfully builds their own report, showcase it to the wider team. Success stories are the best way to encourage adoption.

### 6. Common Challenges and Solutions
- **Challenge:** "Users are overwhelmed and afraid they will break something."
- **Solution:** Emphasize the separation between production projects (where they have read-only access) and their personal sandbox (where they are free to do anything). Reassure them that they cannot break the production data.
- **Challenge:** "Users are creating messy flows and incorrect analyses."
- **Solution:** This is expected. The goal of self-service is not to create perfectly engineered pipelines. It's about enabling quick exploration. Use office hours to gently guide them toward best practices, but don't be overly critical of their methods. Focus on whether they got the right answer.
`,
  },
  {
    id: 61,
    slug: 'documenting-dataiku-flows-and-steps',
    question: 'How to get started with + documenting Dataiku flows and steps?',
    answer: `
### 1. Introduction/Overview
Clear documentation is the difference between a maintainable, long-lasting data project and a confusing, one-off script. Dataiku is built with documentation in mind, providing features to describe your work at every level of detail, from a high-level project overview to comments on individual transformation steps.

### 2. Prerequisites
- A Dataiku project with a Flow.
- An understanding of the "why" behind your pipeline—what business problem does it solve?

### 3. Step-by-Step Instructions: A 3-Tier Documentation Strategy

#### Tier 1: The 10,000-Foot View (Project-Level)
- **What:** Document the overall purpose of the project.
- **How:** Use the **Project Wiki**. The first page should be a "ReadMe" that covers:
    - **Goal:** A one-sentence summary of what the project achieves.
    - **Key Outputs:** Links to the most important final datasets or dashboards.
    - **Data Sources:** Where the raw data comes from.
    - **Project Owner/Team:** Who to contact with questions.

#### Tier 2: The 1,000-Foot View (Flow-Level)
- **What:** Explain the purpose of each major component in your Flow.
- **How:**
    - **Use Descriptions on All Objects:** This is the most crucial habit. Click on any dataset or recipe, go to the **Summary** tab, and write a clear, one-sentence description. These descriptions appear when you hover over items in the Flow.
    - **Use Flow Zones:** Group your flow into logical zones like \`Ingestion\`, \`Preparation\`, \`Modeling\` to make the architecture obvious.
    - **Use Text Boxes:** Drag text boxes onto the Flow canvas to act as large "comments" for different sections.

#### Tier 3: The 10-Foot View (Recipe-Level)
- **What:** Explain the logic of specific, complex transformations.
- **How:**
    - **Inside a Prepare Recipe:** You can add a description to each individual processor step. This is useful for explaining a complex formula or filter.
    - **Inside a Code Recipe (Python/SQL):** Use code comments (\`#\` or \`--\`) and docstrings to explain what your code is doing.

### 4. Resources and Tools
- **Project Wiki:** For long-form, narrative documentation.
- **Description Fields:** For concise, contextual documentation on every object.
- **Flow Zones:** For high-level structural documentation.

### 5. Next Steps and Progression
- **Create a Documentation Standard:** Document a simple standard for your team (e.g., "All recipes must have a description") and enforce it during code reviews.
- **Data Dictionary:** Use the column description fields in a dataset's "Settings" to create a detailed data dictionary that can be shared with users.
- **Automated Doc Generation:** For advanced needs, use the Dataiku API to write a script that extracts all descriptions and metadata from a project to generate a formal document.

### 6. Common Challenges and Solutions
- **Challenge:** "I don't have time to write documentation."
- **Solution:** Integrate it into your workflow. The best time to document a recipe is immediately after you build it. It only takes 30 seconds to write a good description, and it will save hours of confusion later.
- **Challenge:** "Our documentation is always out of date."
- **Solution:** Make documentation updates a required part of any change. If you modify a recipe, you must also update its description. This ensures the documentation evolves with the project.
`,
  },
  {
    id: 62,
    slug: 'annotating-datasets-and-recipes-for-governance',
    question: 'How to get started with + annotating datasets and recipes for governance?',
    answer: `
### 1. Introduction/Overview
Data governance involves managing your data assets to ensure they are high-quality, secure, and compliant. Annotation—adding metadata like tags and descriptions—is the foundational practice for good governance in Dataiku. It makes your data assets discoverable, understandable, and manageable.

### 2. Prerequisites
- **A Dataiku project with datasets and recipes.**
- **A basic governance policy:** An idea of what information you need to track (e.g., data sensitivity, ownership, status).

### 3. Step-by-Step Instructions: Key Annotation Tools

#### 1. Using Tags
- **What they are:** Tags are simple, color-coded labels you can attach to any object (dataset, recipe, model, etc.).
- **How to use:**
    1.  Open any object, like a dataset.
    2.  In the **Summary** tab, find the "Tags" section.
    3.  Type a new tag (e.g., \`PII\`, \`Source:Salesforce\`, \`Status:Validated\`) and hit Enter.
- **Why they are useful:** Tags are searchable across the entire Dataiku instance, making it easy to find all datasets containing PII or all recipes related to a specific source system.

#### 2. Using Descriptions
- **What they are:** A text field on every object to explain its purpose.
- **How to use:**
    1.  Open any object.
    2.  In the **Summary** tab, fill in the "Description" field.
    -   For a dataset: "Weekly sales transactions for the EU region."
    -   For a recipe: "Joins sales data with customer demographics."
- **Why they are useful:** Descriptions provide essential context directly in the Flow when you hover over an item.

#### 3. Using Custom Metadata
- **What it is:** A set of key-value pairs for tracking structured information.
- **How to use:**
    1.  Open any object.
    2.  In the **Summary** tab, find the "Custom Metadata" section.
    3.  Click **+ Add** and define a key and value (e.g., \`Owner\`: \`Finance Team\`, \`Data Quality Score\`: \`95%\`).
- **Why it is useful:** For tracking formal, structured attributes that are consistent across projects.

### 4. Resources and Tools
- **The Summary Tab:** The central place on every Dataiku object for adding tags, descriptions, and custom metadata.
- **The Data Catalog:** The central, searchable catalog in Dataiku that is populated by these annotations.

### 5. Next Steps and Progression
- **Establish a Tagging Taxonomy:** Define a standard set of tags for your organization to use for concepts like data sensitivity, sources, and status. Document this in your Wiki.
- **Automated Tagging:** Use a Python scenario script to automatically apply tags based on rules. For example, a script could scan column names and automatically add the \`PII\` tag to any dataset containing a column named \`email\` or \`social_security_number\`.
- **Governance Workflows:** Build scenarios that use this metadata, for example, a scenario that checks if any dataset tagged as \`PII\` is being used in an insecure way.

### 6. Common Challenges and Solutions
- **Challenge:** "People forget to add tags and descriptions."
- **Solution:** Make it part of your team's process. Include "add appropriate tags and description" as a required item on your "definition of done" checklist for any new development.
- **Challenge:** "Our tags are a mess; everyone uses different ones for the same thing."
- **Solution:** This is why establishing and communicating a standard tagging taxonomy is so important. Hold a workshop to agree on the standard tags and publish the list in a visible place.
`,
  },
  {
    id: 63,
    slug: 'applying-data-quality-checks-automatically',
    question: 'How to get started with + applying data quality checks automatically?',
    answer: `
### 1. Introduction/Overview
Automated data quality checks are your first line of defense against data issues. They allow you to programmatically validate your data against a set of rules and can be configured to stop your pipelines if bad data is detected, preventing it from corrupting downstream models and reports.

### 2. Prerequisites
- **A dataset in your Flow** that you want to monitor.
- **A clear definition of "good data":** You need to know the specific rules your data must follow.

### 3. Step-by-Step Instructions

#### Part 1: Defining the Quality Rules on the Dataset
1.  **Navigate to the Status Tab:** Open the dataset you wish to check and click on the **Status** tab.
2.  **Define Metrics:** First, you need to tell Dataiku what to measure.
    *   Click on **Metrics**.
    *   Click **+ ADD METRIC** and choose a metric to compute, such as "Record count" or "Column statistics" (which includes min, max, mean, etc. for a column).
    *   Click **SAVE AND COMPUTE**.
3.  **Define Checks:** Now, you'll define the pass/fail rules based on those metrics.
    *   Click on **Checks**.
    *   Click **+ ADD CHECK**. You'll see a library of check types.
    *   Example: Select **Column value in numerical range**. Configure it to check your \`price\` column and ensure the values are between 0 and 1000.
    *   Example: Select **Column is never empty**. Configure it to check that your \`customer_id\` column has no missing values.
4.  **Save the Checks:** Once you have defined your checks, save them. You can run them manually here to see if the current data passes.

#### Part 2: Automating the Checks in a Scenario
1.  **Create a Scenario:** Go to **Scenarios** and create a new scenario (or edit an existing one).
2.  **Add a Build Step:** The first step should be to build the dataset you want to check, to ensure you're validating the latest data.
3.  **Add the "Run Checks" Step:**
    *   Click **+ ADD STEP** and select **Run checks**.
    *   In the step's configuration, choose your dataset from the dropdown menu.
4.  **Configure Failure Handling:** By default, if any check with a severity of "Error" fails, this step will fail, and the entire scenario will stop.
5.  **Schedule and Alert:** Schedule your scenario and add a **Reporter** to send an email or Slack alert on failure. The alert will notify you that a data quality rule has been violated.

### 4. Resources and Tools
- **Status Tab (Metrics & Checks):** The interface for setting up your data quality rules.
- **"Run checks" Scenario Step:** The key automation component that executes your rules.

### 5. Next Steps and Progression
- **Custom Python Checks:** If the built-in checks are not sufficient, you can write your own custom checks using Python for more complex validation logic.
- **Data Quality Dashboard:** Create a dashboard that visualizes the history of your metrics (e.g., a line chart of the row count over time). This helps you spot trends and anomalies.

### 6. Common Challenges and Solutions
- **Challenge:** "My pipeline failed. How do I find out which quality check was violated?"
- **Solution:** Go to the log of the failed scenario run. The log for the "Run Checks" step will clearly state which check failed and why (e.g., "Check 'price_range' failed: value was 1050").
- **Challenge:** "I want to be notified of an issue, but I don't want it to stop my entire pipeline."
- **Solution:** In the "Checks" configuration on the dataset, you can set the **Severity** of a check to **Warning** instead of **Error**. A warning will be logged but will not cause the "Run Checks" step to fail.
`,
  },
  {
    id: 64,
    slug: 'creating-reusable-metadata-and-standards',
    question: 'How to get started with + creating reusable metadata and standards?',
    answer: `
### 1. Introduction/Overview
As your use of Dataiku grows across teams and projects, establishing standards is essential for preventing chaos. Creating reusable metadata standards (like a common set of tags) and project templates ensures that all projects are built in a consistent, governed, and understandable way.

### 2. Prerequisites
- **Multiple projects or teams using Dataiku.**
- **An SME or governance team** to define and champion the standards.

### 3. Step-by-Step Instructions: Establishing Standards

#### 1. Create a Tagging Taxonomy
- **What:** A predefined, documented list of tags that should be used across all projects.
- **How:**
    1.  Hold a workshop with key stakeholders to agree on a standard set of tags for important concepts.
    2.  **Examples:**
        *   **Sensitivity:** \`PII\`, \`Confidential\`, \`Public\`
        *   **Status:** \`Raw\`, \`In_Progress\`, \`Validated\`, \`Archived\`
        *   **Source System:** \`Source:Salesforce\`, \`Source:SAP\`
        *   **Data Owner:** \`Owner:Finance\`, \`Owner:Marketing\`
    3.  Document this official taxonomy in a central, highly visible place, like a company-wide Dataiku Wiki project.

#### 2. Create a Project Template
- **What:** A pre-built, empty Dataiku project that contains your standard structure and can be duplicated to start new projects.
- **How:**
    1.  Create a new, blank project named something like \`TEMPLATE_Standard_Project\`.
    2.  Inside this project, set up your standard **Flow Zone** structure (e.g., \`1_Ingestion\`, \`2_Preparation\`, \`3_Outputs\`).
    3.  Create a standard **Wiki** structure with placeholder pages for "Business Goal," "Data Dictionary," etc.
    4.  Add your standard **Tags** to the project so they are available for autocomplete.
    5.  When a user needs to start a new project, they can simply **Duplicate** this template project.

#### 3. Create a Shared Code Library
- **What:** A central project for storing reusable Python or R code.
- **How:**
    1.  Create a project named \`SHARED_CODE_LIBRARY\`.
    2.  In its **Libraries** section, create Python (\`.py\`) files with your common, reusable functions (e.g., for custom data cleaning or calculations).
    3.  Other projects can then access this shared code.

### 4. Resources and Tools
- **Tags:** The primary tool for lightweight, flexible metadata.
- **Project Templates:** A powerful feature for enforcing structural consistency.
- **Project Wikis:** The best place to document your new standards.

### 5. Next Steps and Progression
- **Training and Communication:** It's not enough to create standards; you must train users on them and communicate why they are important.
- **Automated Governance Checks:** Create a scenario that runs periodically and uses the Dataiku API to scan all projects. The script can check for compliance with your standards (e.g., "flag any dataset that is missing a 'Data Owner' tag") and generate a governance report.

### 6. Common Challenges and Solutions
- **Challenge:** "Nobody is using our new standards."
- **Solution:** Standards need to be enforced. Make compliance part of your project review or release process. Showcase the benefits: "Look how easy it is to find all the Finance data now that it's properly tagged!" Get buy-in from team leads to champion the standards.
- **Challenge:** "The standards are too rigid and slow us down."
- **Solution:** Good standards should help, not hinder. Gather feedback from your users regularly. Be willing to evolve the standards to meet their needs. The goal is consistency, not bureaucracy.
`,
  },
  {
    id: 65,
    slug: 'implementing-lineage-and-impact-tracing',
    question: 'How to get started with + implementing lineage and impact tracing?',
    answer: `
### 1. Introduction/Overview
Data lineage is a map of your data's journey—where it came from, how it was transformed, and where it's going. Impact tracing is the reverse—understanding what downstream assets will be affected if you change something. In Dataiku, this is not something you have to "implement"; it's an automatic, core feature of the platform. The key is knowing how to read and use the lineage information provided.

### 2. Prerequisites
- **A Dataiku Flow:** You need a project with a chain of datasets and recipes.

### 3. Step-by-Step Instructions: Reading the Lineage

#### 1. Flow-level Lineage (Upstream and Downstream)
- **What it is:** A high-level view of an object's dependencies.
- **How to use:**
    1.  In your Flow, right-click on any dataset or recipe.
    2.  Select **View upstream dependencies**. Dataiku will highlight everything that is used to build that object.
    3.  Select **View downstream dependencies**. Dataiku will highlight everything that would be affected if you were to change that object. This is **impact analysis**.
- **Why it is useful:** Before you delete or modify a dataset, you can instantly see the impact it will have on all downstream reports, models, and pipelines.

#### 2. Column-level Lineage
- **What it is:** A highly detailed view that traces the origin of a single column.
- **How to use:**
    1.  Open any dataset (that is the output of a recipe).
    2.  Go to the **Lineage** tab.
    3.  Select a column on the right side.
    4.  Dataiku will display a visual graph showing exactly which source columns and which transformation recipes were used to create that specific column.
- **Why it is useful:** This is incredibly powerful for debugging and for audits. If there is a problem with a column in a final report, you can trace it back to its exact origin in seconds.

### 4. Resources and Tools
- **The Flow:** The primary interface for high-level lineage.
- **Lineage Tab:** The dedicated UI within a dataset for detailed, column-level tracing.

### 5. Next Steps and Progression
- **Audits and Compliance:** Use screenshots of the lineage graph as evidence in regulatory audits to prove data provenance and demonstrate how sensitive data is being handled.
- **Debugging Data Issues:** When you find a data quality issue in a downstream table, use the column-level lineage to quickly identify the upstream recipe where the error was introduced.
- **Root Cause Analysis:** Lineage is the key to performing root cause analysis on data issues.

### 6. Common Challenges and Solutions
- **Challenge:** "The lineage is broken or incorrect."
- **Solution:** This can happen if you use code recipes in a way that bypasses Dataiku's standard data access. For lineage to be tracked correctly, your Python/R/SQL recipes must always use the Dataiku API (\`dkuReadDataset\`, \`dkuWriteDataset\`, etc.) to read and write data. If you use a generic library to read a file from a hardcoded path, Dataiku won't know about that dependency, and the lineage will be broken.
`,
  },
  {
    id: 66,
    slug: 'applying-access-controls-and-permissions',
    question: 'How to get started with + applying access controls and permissions?',
    answer: `
### 1. Introduction/Overview
Properly managing who can see and edit your data projects is fundamental to data security and governance. Dataiku provides a granular, role-based access control system that allows you to manage permissions at the project level, ensuring users only have access to the data they are authorized to see.

### 2. Prerequisites
- **Dataiku Administrator rights:** Setting up groups and global permissions is an admin task.
- **Project Administrator rights:** Assigning permissions for a specific project requires admin rights on that project.
- **A clear access policy:** You should know which teams or users should have what level of access (e.g., "The marketing team can view the sales report, but only the finance team can edit the financial data").

### 3. Step-by-Step Instructions

#### Part 1: Creating User Groups (Admin Task)
1.  **Navigate to Security Settings:** Go to **Administration > Security > Groups**.
2.  **Create a New Group:** Click **+ NEW GROUP**. Give it a name that corresponds to a user role or team (e.g., \`marketing_analysts\`, \`data_scientists_team\`).
3.  **Add Users to the Group:** Add the relevant Dataiku users to this new group. It's much easier to manage permissions for a group than for hundreds of individual users.

#### Part 2: Assigning Permissions to a Project
1.  **Go to Project Settings:** In your project, go to **Settings** (the gear icon).
2.  **Open the Permissions Panel:** Navigate to the **Permissions** tab.
3.  **Add a Group:** Click **+ ADD GROUP**. Select the group you created (e.g., \`marketing_analysts\`).
4.  **Assign a Permission Level:** Choose the level of access for that group on this specific project:
    *   **Reader:** Can view everything in the project (Flows, datasets, dashboards) but cannot make any changes.
    *   **Contributor:** Can read, write, and edit most objects in the project. This is for developers working on the project.
    *   **Administrator:** Has full control over the project, including its settings and permissions.
5.  **Save:** Save your changes. The permissions take effect immediately.

### 4. Resources and Tools
- **Administration > Security:** The central hub for managing users and groups.
- **Project Settings > Permissions:** The page for controlling access to a specific project.

### 5. Next Steps and Progression
- **Object-level Restrictions (Advanced):** While the primary security model is at the project level, you can implement more granular security (e.g., masking a column for certain users) by creating different output datasets for different user groups, controlled by a Python recipe that checks the user's group membership.
- **Connection-level Security:** Access to data sources is also controlled by permissions on the connections in the Administration section.
- **Regular Audits:** Periodically review the permissions on your critical projects to ensure they are still appropriate and that former employees or team members have had their access revoked.

### 6. Common Challenges and Solutions
- **Challenge:** "A user says they can't see my project."
- **Solution:** You haven't granted them or their group any permissions on your project yet. Go to the project's Permissions settings and add their group with at least "Reader" access.
- **Challenge:** "How do I give someone access to only one dashboard in my project but not the rest?"
- **Solution:** Dataiku's primary security model is at the project level. You cannot grant access to a single object within a project. The standard solution is to create a separate, dedicated project just for that dashboard. You can then use a **Sync** recipe to share the necessary data into this new "dashboard project" and grant the user access only to that project.
`,
  },
  {
    id: 67,
    slug: 'version-controlling-dataiku-projects-using-git',
    question: 'How to get started with + version controlling Dataiku projects using Git?',
    answer: `
### 1. Introduction/Overview
Version control is a cornerstone of modern software development, and it's just as crucial for data projects. Integrating your Dataiku project with a Git repository (like GitHub, GitLab, or Bitbucket) allows you to track every change, collaborate with team members, and maintain a full history of your work.

### 2. Prerequisites
- **A remote Git repository:** You need an empty repository created on your Git provider.
- **Git configured on the Dataiku server:** Your Dataiku administrator must have installed Git on the server and configured it.
- **Project Admin rights in Dataiku.**

### 3. Step-by-Step Instructions
1.  **Link Your Project to Git:**
    *   In your Dataiku project, go to **Settings** (the gear icon).
    *   Navigate to the **Git** tab.
    *   Click **Convert to Git project**.
    *   Enter the **Repository URL** of your empty remote Git repository.
2.  **Make Your First Commit:**
    *   After linking, a new **Git** icon will appear in your project's top navigation bar. Click it.
    *   This page shows all the changes you've made to the project. Initially, this will be every object in the project.
    *   Click the checkbox to **Stage all** changes.
    *   Write a commit message in the box at the bottom (e.g., "Initial project commit").
    *   Click the **Commit** button.
3.  **Push to the Remote Repository:**
    *   Your commit now exists locally on the Dataiku server. To share it, you need to push it.
    *   Click the **Push** button to send your commits to the remote repository.
4.  **The Standard Workflow:** From now on, the workflow is:
    *   Make changes to your project (edit a recipe, create a dataset, etc.).
    *   Go to the **Git** page, **stage** your changes, **commit** them with a clear message, and **push** them to the remote.

### 4. Resources and Tools
- **Git tab in Project Settings:** Where you initially link the project.
- **Git page in Project Navigation:** Your day-to-day interface for staging, committing, pulling, and pushing changes.
- **A Git client (optional):** Tools like GitHub Desktop can be useful for viewing the project history visually.

### 5. Next Steps and Progression
- **Branching:** Don't work directly on the \`main\` branch. Use the Git page to **Create branch**. Make your changes on a feature branch (e.g., \`feature/add-new-sales-report\`).
- **Pull Requests:** When your feature is complete, push your branch and then use your Git provider's interface (e.g., GitHub) to create a **Pull Request**. This allows for code review before merging the changes back into the \`main\` branch.
- **Resolving Conflicts:** If you and a colleague edit the same object, you may have a merge conflict when you try to **Pull** their changes. Dataiku provides a visual diff tool to help you resolve these conflicts.

### 6. Common Challenges and Solutions
- **Challenge:** "Push/Pull failed with an authentication error."
- **Solution:** This means the Dataiku server cannot authenticate with your Git provider. Your Dataiku administrator needs to set up SSH keys or other credentials to allow the server to connect to the Git repository.
- **Challenge:** "What is actually being versioned?"
- **Solution:** Dataiku versions the *definition* of your project—the structure of your Flow, the code in your recipes, the settings of your datasets, etc. It does **not** version the actual data within your datasets.
`,
  },
  {
    id: 68,
    slug: 'maintaining-audit-trails-within-dss',
    question: 'How to get started with + maintaining audit trails within DSS?',
    answer: `
### 1. Introduction/Overview
An audit trail is a chronological record of who did what, and when. This is essential for security, compliance, and debugging. Dataiku automatically creates detailed audit trails at both the project level and the instance level, requiring no special setup. The key is knowing where to find and interpret this information.

### 2. Prerequisites
- **A Dataiku instance with user activity.**
- **The appropriate permissions:** Project-level for the project timeline, and global administrator rights for the instance-level audit logs.

### 3. Step-by-Step Instructions: Finding the Audit Trails

#### 1. Project-Level Audit Trail (The Timeline)
- **What it is:** A log of all changes made to a *specific project*.
- **Who it's for:** Project developers and managers.
- **How to access:**
    1.  In your project, go to **... > Timeline**.
    2.  This view shows a chronological list of all modifications: who created a recipe, who edited a dashboard, who ran a scenario, etc.
- **Why it's useful:** Perfect for answering questions like, "Who changed this recipe last week?" or "Why did this dashboard suddenly break?"

#### 2. Instance-Level Audit Trail (Global Audit Log)
- **What it is:** A comprehensive log of all significant events across the *entire Dataiku instance*.
- **Who it's for:** Dataiku Administrators, security teams, and compliance auditors.
- **How to access (Admin only):**
    1.  Go to **Administration > Logs > Global Audit Log**.
    2.  This log captures more sensitive and global events, including:
        *   User logins (successful and failed).
        *   Changes to global settings and connections.
        *   Permissions changes.
        *   API key creation.
- **Why it's useful:** Essential for security monitoring and formal compliance audits.

#### 3. Git Integration (The Ultimate Audit Trail)
- **What it is:** If your project is linked to Git, the commit history provides the most detailed and robust audit trail of all.
- **How to access:** On your Git provider's website (e.g., GitHub), you can browse the commit history for your project.
- **Why it's useful:** Every commit has an author, a timestamp, and a descriptive message explaining the change. It shows the exact "diff" of what was modified. This is the gold standard for auditing code and configuration changes.

### 4. Resources and Tools
- **Project Timeline:** For day-to-day project-level auditing.
- **Global Audit Log:** For instance-wide security and compliance auditing.
- **Git Commit History:** For the most detailed, developer-focused audit trail.

### 5. Next Steps and Progression
- **Log Exporting:** Administrators can configure the Dataiku instance to forward its logs to an external logging system (like Splunk or the ELK stack) for long-term storage, advanced analysis, and alerting.
- **Regular Reviews:** For critical projects, schedule a periodic review of the project timeline and Git history to ensure all changes are authorized and documented.

### 6. Common Challenges and Solutions
- **Challenge:** "I need to know who viewed a specific dataset."
- **Solution:** This level of detail is not typically available in the high-level audit logs. For highly sensitive data, you would rely on the project permissions to restrict access in the first place, ensuring only authorized users can view it.
- **Challenge:** "The project timeline is too noisy."
- **Solution:** Use the filter bar at the top of the Timeline page to filter by user or by the type of object that was changed to find the specific event you are looking for.
`,
  },
  {
    id: 69,
    slug: 'aligning-pipelines-with-compliance-policies',
    question: 'How to get started with + aligning pipelines with compliance policies?',
    answer: `
### 1. Introduction/Overview
Aligning your data pipelines with compliance policies (like GDPR, CCPA, or HIPAA) is a critical responsibility. Dataiku provides the governance tools you need to build compliant pipelines, demonstrate data provenance, and enforce security rules. The process involves a combination of technical implementation and clear documentation.

### 2. Prerequisites
- **Understanding of the compliance policy:** You must know the specific rules you need to follow (e.g., "we must not store customer PII longer than 5 years," "we must be able to demonstrate where this data came from").
- **Collaboration with your legal/compliance team.**
- **A Dataiku project that handles sensitive data.**

### 3. Step-by-Step Instructions: A Compliance Framework in Dataiku

1.  **Identify and Tag Sensitive Data:**
    *   Go through your datasets and identify any columns that contain Personally Identifiable Information (PII) or other sensitive data.
    *   **Tag** these datasets and columns with a \`PII\` or \`Confidential\` tag. This makes them easily identifiable.
2.  **Enforce Access Control:**
    *   Ensure that projects containing sensitive data have strict **permissions**. Only users with a legitimate need should have access.
    *   Use different projects for different levels of sensitivity. For example, raw PII data might live in a highly restricted project, while an anonymized version is shared in a more open project.
3.  **Implement Data Privacy in Recipes:**
    *   If you need to anonymize or mask data, implement this logic in a **Prepare** recipe.
    *   Use processors to hash email addresses, remove identifiers, or generalize locations.
    *   Document these steps clearly in the recipe's description.
4.  **Use Lineage for Audits:**
    *   Dataiku's automatic **lineage** is your most powerful tool for compliance.
    *   When an auditor asks, "Where did this number in the report come from?" you can use the column-level lineage graph to show them the exact end-to-end journey of that data point, proving its provenance.
5.  **Document Everything in the Wiki:**
    *   Create a "Compliance" section in your project's **Wiki**.
    *   Document how your pipeline adheres to the specific clauses of the regulation. For example: "To comply with GDPR's Right to be Forgotten, we implement a filter in the \`prepare_customers\` recipe to exclude users who have requested deletion."

### 4. Resources and Tools
- **Tags:** For identifying and classifying sensitive data.
- **Project Permissions:** For enforcing access control.
- **Prepare Recipe:** For implementing data masking and anonymization.
- **Lineage Graph:** For proving data provenance to auditors.
- **Project Wiki:** For formally documenting your compliance strategy.

### 5. Next Steps and Progression
- **Automated Retention Policies:** Use a **Scenario** with a Python step to automatically delete old data partitions to comply with data retention rules.
- **Formal Sign-offs:** For regulated industries, Dataiku has features for formal model and project sign-offs, creating an auditable approval trail.
- **Automated Governance Checks:** Create a scenario that scans all projects and checks for compliance violations (e.g., "alert if a dataset tagged as \`PII\` does not have restricted permissions").

### 6. Common Challenges and Solutions
- **Challenge:** "How can I prove that I'm compliant?"
- **Solution:** The combination of the lineage graph and the documentation in your Wiki is your proof. You can literally show an auditor the visual flow of data and the documented logic that enforces the rules.
- **Challenge:** "This seems like a lot of extra work."
- **Solution:** Building with compliance in mind from the start is much easier than trying to retrofit it later. Make tagging and documentation a standard part of your development process. The governance features in Dataiku are designed to make this as painless as possible.
`,
  },
  {
    id: 70,
    slug: 'establishing-coding-best-practices-in-team',
    question: 'How to get started with + establishing coding best practices in team?',
    answer: `
### 1. Introduction/Overview
As a team starts using code recipes (Python, SQL, R) in Dataiku, establishing a set of best practices and a consistent style guide is essential. This ensures that code is readable, maintainable, and reusable, saving time and preventing errors in the long run.

### 2. Prerequisites
- **A team of developers** working in Dataiku.
- **Agreement from the team** to adopt a common standard.

### 3. Step-by-Step Instructions: Creating and Implementing Standards

1.  **Define a Style Guide:**
    *   You don't need to reinvent the wheel. Adopt an existing, widely-used style guide.
        *   **For Python:** Use **PEP 8**. It's the universal style guide for Python code.
        *   **For SQL:** Adopt a common style, such as using uppercase for keywords (\`SELECT\`, \`FROM\`) and lowercase for identifiers, and indenting subqueries.
    *   Document this choice in your team's central **Wiki**.
2.  **Automate Style Checking (Linting):**
    *   Use a linter to automatically check for style guide violations.
    *   **For Python:** Use a tool like \`flake8\` or \`black\`.
    *   You can integrate this into your CI/CD pipeline. The pipeline can be configured to fail if the committed code does not pass the linter's checks.
3.  **Establish Code Structure Standards:**
    *   Create a template for your code recipes. A good Python recipe template includes:
        *   A docstring at the top explaining the recipe's purpose.
        *   All \`import\` statements grouped at the top.
        *   A main function that contains the core logic.
        *   Helper functions for modularity.
        *   A main execution block (\`if __name__ == '__main__':\`) that calls the main function.
    *   Document this template in your Wiki.
4.  **Promote Code Reusability:**
    *   Create a rule: "If you use the same block of code in more than two places, turn it into a function."
    *   Place these reusable functions in the project's **Library** so they can be imported into any recipe.
5.  **Implement Code Reviews:**
    *   This is the most effective way to enforce all standards.
    *   Use the **Git integration** and require all changes to be submitted via **Pull Requests**.
    *   Another developer must review the code for correctness, style, and documentation before it can be merged into the main branch.

### 4. Resources and Tools
- **PEP 8:** The official style guide for Python code.
- **Linters (\`flake8\`, \`black\`):** Automated tools for checking code style.
- **Project Libraries:** The place for reusable, shared functions.
- **Git and Pull Requests:** The framework for collaborative code review.
- **Project Wiki:** The central place to document all your team's standards.

### 5. Next Steps and Progression
- **Standardize Documentation:** Require that all functions have clear docstrings explaining their purpose, parameters, and what they return.
- **Unit Testing:** For critical, complex functions in your project library, require developers to write unit tests to ensure they work correctly.

### 6. Common Challenges and Solutions
- **Challenge:** "Team members don't want to follow the new rules."
- **Solution:** Getting buy-in is key. Hold a meeting to explain the *why* behind the standards—that they will make everyone's life easier in the long run by improving readability and reducing bugs. Automating checks with a linter in a CI/CD pipeline is the most effective way to enforce the style guide without manual arguments.
- **Challenge:** "Code reviews are slowing us down."
- **Solution:** Keep pull requests small and focused on a single feature. This makes them much faster to review. Ensure the team prioritizes reviewing each other's code quickly. The time spent on review is almost always saved later by catching bugs early.
`,
  },
  {
    id: 71,
    slug: 'embedding-generative-ai-models-in-pipelines',
    question: 'How to get started with + embedding Generative AI models in pipelines?',
    answer: `
### 1. Introduction/Overview
Generative AI models (like GPT from OpenAI or models from Hugging Face) can be incredibly powerful for tasks like text summarization, classification, and data generation. You can integrate these models into your Dataiku pipelines using a **Python recipe** to call their APIs.

### 2. Prerequisites
- **An API Key:** You need an API key from a generative AI provider (e.g., OpenAI, Hugging Face, Google AI).
- **A clear task:** Know what you want to do with the model (e.g., "summarize customer reviews," "classify support tickets").
- **An input dataset:** A dataset containing the text data you want to send to the model.
- **A Python code environment** with the necessary libraries installed (e.g., \`openai\`, \`transformers\`, \`requests\`).

### 3. Step-by-Step Instructions
1.  **Set Up Your Environment:**
    *   Create a code environment and add the required Python library (e.g., \`pip install openai\`).
    *   Store your API key securely. The best practice is to save it as a "Password" type **Project Variable** in Dataiku.
2.  **Create a Python Recipe:**
    *   Take your text dataset as input.
    *   Create a new **Python recipe**.
3.  **Write the Python Code:**
    *   **Import libraries** and get your API key from the project variables.
    *   **Read your input data** into a Pandas DataFrame.
    *   **Define a function** that takes a single text input, calls the AI model's API, and returns the result. This function should include error handling.
    *   **Apply the function** to the relevant column in your DataFrame to create a new column with the AI-generated results. This is often done with \`df.apply()\`.
    *   **Write the output** DataFrame to the recipe's output dataset.
    > \`\`\`python
    > import dataiku
    > import openai
    >
    > # Get API key from project variables
    > variables = dataiku.get_custom_variables()
    > openai.api_key = variables.get("OPENAI_API_KEY")
    >
    > # Read input data
    > df = dataiku.Dataset("input_reviews").get_dataframe()
    >
    > # Define function to call the API
    > def summarize_text(text):
    >     try:
    >         response = openai.Completion.create(...) # Your API call here
    >         return response.choices[0].text.strip()
    >     except Exception as e:
    >         return str(e)
    >
    > # Apply the function to the 'review_text' column
    > df['summary'] = df['review_text'].apply(summarize_text)
    >
    > # Write the results
    > dataiku.Dataset("reviews_with_summaries").write_with_schema(df)
    > \`\`\`
4.  **Run the Recipe:** Execute the recipe to process your data and get the results from the generative AI model.

### 4. Resources and Tools
- **Python Recipe:** The main tool for this integration.
- **Project Variables:** The secure way to manage your API keys.
- **API Documentation:** The documentation from your AI model provider (e.g., OpenAI's API reference) is essential.

### 5. Next Steps and Progression
- **Error Handling and Retries:** API calls can fail. Implement robust error handling and a retry mechanism in your function to make the pipeline more resilient.
- **Batching:** Instead of calling the API for every single row, modify your code to send data in batches, which can be more efficient and cost-effective.
- **Cost Management:** Be aware that API calls to these models cost money. Process a small sample of your data first to estimate the cost before running on a large dataset.

### 6. Common Challenges and Solutions
- **Challenge:** "The API calls are very slow."
- **Solution:** This is expected, as you are making network requests for each row. Consider using batching. Also, you can use the **Spark** execution engine with Pandas UDFs to parallelize the API calls across multiple nodes, which can dramatically speed up the process for large datasets.
- **Challenge:** "How do I handle rate limits?"
- **Solution:** Most APIs have a rate limit (a maximum number of requests per minute). Your API calling function should include a \`time.sleep()\` in its error handling logic to wait and retry if it receives a rate limit error.
`,
  },
  {
    id: 72,
    slug: 'building-nlp-text-analytics-flows',
    question: 'How to get started with + building NLP/text analytics flows?',
    answer: `
### 1. Introduction/Overview
Natural Language Processing (NLP) involves extracting meaning and structure from text data. Dataiku provides a suite of tools, from visual text preparation to integration with advanced libraries, to build powerful NLP pipelines.

### 2. Prerequisites
- **Text data:** A dataset with one or more columns containing text you want to analyze (e.g., customer reviews, support tickets, articles).
- **A clear objective:** Know what you want to achieve (e.g., sentiment analysis, topic modeling, named entity recognition).

### 3. Step-by-Step Instructions: A Standard NLP Flow

#### Step 1: Text Preparation (Visual)
1.  **Create a Prepare Recipe:** Start with your raw text dataset.
2.  **Use Text Processors:** In the Prepare recipe, select your text column and add processors from the **Text Analysis** group:
    *   **Tokenize text:** Split sentences into individual words (tokens).
    *   **Remove stop words:** Remove common, non-informative words ("the", "a", "is").
    *   **Stem or Lemmatize:** Reduce words to their root form (e.g., "running" -> "run").
    *   **Clean text:** Remove punctuation, convert to lowercase.
3.  This creates a "clean text" column ready for analysis.

#### Step 2: Feature Extraction
- **Visual Method (TF-IDF):**
    - After preparing the text, use the **Text feature extraction** recipe. It can convert your text into numerical vectors using techniques like TF-IDF, which can then be used in machine learning models.
- **Code Method (Embeddings):**
    - Use a **Python recipe** and a library like \`sentence-transformers\` or \`spaCy\` to convert your text into dense vector embeddings. This is a more modern and often more powerful approach.

#### Step 3: Analysis or Modeling
- **Sentiment Analysis:** The Prepare recipe has a built-in **Compute sentiment** processor that can classify text as positive, negative, or neutral.
- **Topic Modeling:** Use the **Topic modeling** recipe on your prepared text to discover the main themes or topics present in your documents.
- **Text Classification:** Use the numerical features you extracted (TF-IDF or embeddings) as inputs to a standard **Visual ML** classification model to categorize your text.

### 4. Resources and Tools
- **Prepare Recipe (Text Analysis):** Your starting point for visual text cleaning.
- **Text Feature Extraction Recipe:** For creating classical NLP features like TF-IDF.
- **Python Recipes with NLP Libraries:** For advanced techniques, use libraries like:
    - **NLTK/spaCy:** For robust text processing and linguistic analysis.
    - **Scikit-learn:** For text classification models.
    - **Gensim:** For topic modeling.
    - **Transformers/Sentence-Transformers:** For state-of-the-art embeddings.

### 5. Next Steps and Progression
- **Named Entity Recognition (NER):** Use a library like \`spaCy\` in a Python recipe to extract entities like people, organizations, and locations from your text.
- **Word Clouds:** In the **Charts** tab of a dataset containing tokenized words, you can create a word cloud visualization.
- **Custom Sentiment Analysis:** Train your own sentiment model if the built-in processor is not accurate enough for your specific domain.

### 6. Common Challenges and Solutions
- **Challenge:** "The built-in sentiment analysis is not accurate for my industry jargon."
- **Solution:** The built-in tools are generic. For domain-specific language, you will need to train a custom classification model. Label a sample of your data with the correct sentiment and use it to train a model in the Visual ML lab.
- **Challenge:** "My text data is in a language other than English."
- **Solution:** Many of the visual text processors support multiple languages. Check the processor settings to see if your language is available. For languages not supported visually, you will need to use a Python recipe with a multilingual NLP library.
`,
  },
  {
    id: 73,
    slug: 'integrating-labeling-management-workflows',
    question: 'How to get started with + integrating labeling management workflows?',
    answer: `
### 1. Introduction/Overview
Supervised machine learning requires labeled data, but getting high-quality labels can be a significant bottleneck. Dataiku's "Labeling" features allow you to create and manage data labeling tasks directly within your project, integrating the human-in-the-loop process seamlessly into your Flow.

### 2. Prerequisites
- **Unlabeled data:** A dataset containing the data you need to have labeled (e.g., text for classification, images for object detection).
- **A team of labelers:** The people who will be performing the manual labeling task.

### 3. Step-by-Step Instructions
1.  **Install the Labeling Plugin:** Ensure the "Visual and Interactive Labeling" plugin is installed on your Dataiku instance by an administrator.
2.  **Create a Labeling Task:**
    *   From your Flow, select your unlabeled dataset.
    *   From the right-hand panel, choose the **Labeling** recipe under "Visual recipes".
    *   Click **CREATE RECIPE**.
3.  **Configure the Task:**
    *   **Choose the labeling task type:**
        *   \`Text classification\`: Assign a category to a piece of text.
        *   \`Named entity recognition\`: Identify and tag entities in text.
        *   \`Image classification\`: Assign a category to an image.
        *   \`Object detection\`: Draw bounding boxes around objects in an image.
    *   **Define the Classes:** Enter the possible labels or categories that the labelers can choose from.
    *   **Write Instructions:** Provide clear instructions for the labelers on how to correctly apply the labels.
4.  **Assign Labelers:** In the labeling task settings, you can assign the task to specific Dataiku users or groups.
5.  **Start Labeling:**
    *   The assigned users can now open the labeling task and will be presented with a simple, optimized UI for labeling the data. They see one item at a time, apply the label, and move to the next.
6.  **Monitor Progress:** The owner of the labeling task can monitor the progress, see how many items have been labeled, and review the quality of the labels.
7.  **Use the Labeled Data:** The output of the labeling recipe is a new dataset containing the original data plus the new, human-provided labels. This dataset is now ready to be used to train a machine learning model.

### 4. Resources and Tools
- **Labeling Recipe/Plugin:** The core component for creating and managing labeling tasks.
- **Labeling UI:** The simple, dedicated interface used by the people performing the labeling.

### 5. Next Steps and Progression
- **Active Learning:** For classification tasks, you can use an "Active Learning" strategy. First, label a small amount of data and train a model. Then, use the model to predict on the rest of the unlabeled data. The active learning recipe will then prioritize showing the labelers the items the model was *least confident* about, making the labeling process much more efficient.
- **Quality Control:** Have multiple people label the same subset of data to measure inter-annotator agreement and ensure a high quality of labels.

### 6. Common Challenges and Solutions
- **Challenge:** "My labelers are confused about the task."
- **Solution:** Your instructions are not clear enough. A good labeling task requires extremely clear, unambiguous instructions with examples of edge cases. It's often worth holding a short kickoff meeting with the labelers to walk them through the task.
- **Challenge:** "Labeling thousands of items is taking too long."
- **Solution:** This is the primary challenge of supervised learning. Use an **Active Learning** workflow to focus your labeling efforts on the most informative examples, which can significantly reduce the amount of data you need to label manually.
`,
  },
  {
    id: 74,
    slug: 'using-time‑series-modeling-in-dataiku',
    question: 'How to get started with + using time‑series-modeling in Dataiku?',
    answer: `
### 1. Introduction/Overview
Time series forecasting—predicting future values based on historical data—is a common business need. Dataiku provides a dedicated **Time Series Forecasting** lab that automates many of the complex steps involved, such as feature engineering from dates, handling trends and seasonality, and training appropriate forecasting models.

### 2. Prerequisites
- **Time series data:** A dataset containing at least two columns:
    1.  A **timestamp column** that is parsed as a date.
    2.  A **numerical column** with the value you want to forecast (e.g., \`daily_sales\`).
- **A clear forecasting goal:** Know what you want to predict and how far into the future (the forecast horizon).

### 3. Step-by-Step Instructions
1.  **Prepare Your Data:**
    *   Ensure your data is in a "long" format, with one row per timestamp.
    *   Use a **Prepare** recipe to make sure your timestamp column is correctly parsed as a date data type.
2.  **Launch the Forecasting Lab:**
    *   In your Flow, select your prepared time series dataset.
    *   From the right-hand panel, click **Lab > + NEW ANALYSIS**.
    *   Choose **Forecasting**.
3.  **Configure the Task:**
    *   In the settings, select your **Timestamp column** and the **Numerical series** you want to forecast.
    *   Dataiku will analyze the time series and suggest a time step (e.g., daily, weekly).
    *   You can also add external features (e.g., promotional events) if you have them.
4.  **Design the Models:**
    *   Go to the **Design** tab. Here you can configure:
        *   **Feature Engineering:** Enable options to automatically create features like day of the week, month, holidays, and lag features.
        *   **Algorithms:** Dataiku will suggest time series models like \`Seasonal ARIMA\` and standard regression models like \`Random Forest\` (which use the engineered date features).
5.  **Train and Evaluate:**
    *   Click **Train**. Dataiku will train the models using historical data for training and a more recent period for evaluation.
    *   The results page will show a leaderboard of models ranked by metrics like **MAPE** (Mean Absolute Percentage Error) and **RMSE**. You can also see a visual plot of the model's predictions against the actual values.

### 4. Resources and Tools
- **Forecasting Analysis Lab:** The dedicated visual tool for all time series modeling tasks.
- **Time Series Metrics:** Understand metrics like MAPE to evaluate the accuracy of your forecasts.
- **Dataiku Academy:** Has specific courses on time series forecasting.

### 5. Next Steps and Progression
- **Deploy and Forecast:** Deploy your best model to the Flow. You can then use the **Forecast** recipe to generate future predictions.
- **Multivariate Forecasting:** Include other time-dependent variables (e.g., weather, holidays, competitor prices) as features to potentially improve your forecast accuracy.
- **Deep Learning for Forecasting:** For very complex time series, you can use a Python recipe with a library like \`Prophet\` or a custom LSTM model in TensorFlow/PyTorch.

### 6. Common Challenges and Solutions
- **Challenge:** "My forecasts are not accurate."
- **Solution:** Time series forecasting is difficult. First, ensure you have enough historical data. Second, experiment with feature engineering. Adding features for holidays, special events, or other external factors can significantly improve performance. Finally, try different model types.
- **Challenge:** "The lab says my time series is not regular."
- **Solution:** This means you have missing timestamps in your data (e.g., you are missing a day). Before the lab, use a **Time series resampling** recipe to fill in the missing dates and impute the corresponding values.
`,
  },
  {
    id: 75,
    slug: 'implementing-computer-vision-pipelines',
    question: 'How to get started with + implementing computer vision pipelines?',
    answer: `
### 1. Introduction/Overview
Computer Vision (CV) involves training models to "see" and interpret images. In Dataiku, you can build end-to-end CV pipelines, from managing your image data to training deep learning models and deploying them for tasks like image classification or object detection.

### 2. Prerequisites
- **Image Data:** A collection of images (\`.jpg\`, \`.png\`).
- **A CV Task:** A clear goal, such as:
    - **Image Classification:** Assign a single label to an image (e.g., "cat" or "dog").
    - **Object Detection:** Draw bounding boxes around objects in an image.
- **A Deep Learning Code Environment:** You need a Python environment with libraries like \`TensorFlow\`/\`Keras\` or \`PyTorch\`, and ideally access to a GPU for training.
- **Labeled Data (for supervised learning):** You need to know the correct label or bounding box for each training image.

### 3. Step-by-Step Instructions: A Classification Pipeline

1.  **Organize and Upload Images:**
    *   On your local machine, organize your training images into subfolders, where each subfolder name is the class label (e.g., \`/data/cats/\`, \`/data/dogs/\`).
    *   In your Dataiku project, create a **Managed Folder**.
    *   Upload your entire data directory structure into this folder.
2.  **Create a Dataset of Image Paths:**
    *   Use a Python recipe to scan the managed folder and create a dataset with two columns: \`image_path\` and \`label\`. This structured list will be used to feed the training process.
3.  **Train a Model in a Notebook:**
    *   Create a **Jupyter Notebook** using your deep learning environment.
    *   Write Python code using Keras/TensorFlow to:
        *   Read the dataset of image paths.
        *   Create a data generator that loads the images from the managed folder, resizes them, and applies augmentations.
        *   Define a convolutional neural network (CNN) architecture. You can use a pre-trained model like \`ResNet\` or \`MobileNet\` for transfer learning, which is highly recommended.
        *   Train the model using \`model.fit()\`.
4.  **Save the Trained Model:**
    *   After training, save your model's architecture and weights to a new managed folder.
5.  **Create an Inference Recipe:**
    *   To use your model, create a new Python recipe that takes a folder of new, unlabeled images as input.
    *   The recipe will load your saved model, preprocess the new images, call \`model.predict()\`, and write the predicted labels to an output dataset.

### 4. Resources and Tools
- **Managed Folders:** The standard way to store and manage image files in Dataiku.
- **Python Notebooks/Recipes:** The environment for writing your custom CV code.
- **Deep Learning Frameworks:** TensorFlow/Keras or PyTorch are the standard libraries for building CV models.
- **Labeling Plugin:** Use this to create a labeling task for object detection or if your images are not already organized by class.

### 5. Next Steps and Progression
- **GPU Training:** For any serious CV task, you must use a GPU-enabled environment. Work with your admin to configure this.
- **Object Detection:** The workflow is similar, but the labeling and model architecture (e.g., YOLO, SSD) are specific to object detection.
- **Real-time Inference:** Deploy your model inference recipe to the **API Deployer** to create a REST API that can classify a single image in real time.

### 6. Common Challenges and Solutions
- **Challenge:** "My model accuracy is low."
- **Solution:** CV models require a lot of data. If you have a small dataset, make extensive use of **image augmentation** (randomly rotating, zooming, and flipping your training images) to create more variety. Using a **pre-trained model** (transfer learning) is also one of the most effective ways to get high performance with limited data.
- **Challenge:** "Training takes days."
- **Solution:** You need a GPU. Training a deep CNN on a CPU is not practical.
`,
  },
  {
    id: 76,
    slug: 'connecting-dataiku-to-kubernetes-clusters',
    question: 'How to get started with + connecting Dataiku to Kubernetes clusters?',
    answer: `
### 1. Introduction/Overview
Kubernetes (K8s) is the industry standard for container orchestration. Dataiku can leverage Kubernetes in two main ways: by running the entire platform on K8s for scalability, or by connecting to a K8s cluster to run specific jobs in isolated, containerized environments. This guide focuses on the second case: connecting an existing Dataiku instance to a K8s cluster.

### 2. Prerequisites
- **A running Kubernetes cluster:** E.g., AWS EKS, Azure AKS, Google GKE.
- **\`kubectl\` configured:** You need command-line access to your cluster to set up the necessary permissions.
- **Dataiku Administrator Rights:** This is an administrative task.

### 3. Step-by-Step Instructions
1.  **Prepare Kubernetes (The K8s Admin's Task):**
    *   **Create a Namespace:** It's best practice to create a dedicated namespace in your cluster for Dataiku jobs (e.g., \`dataiku-jobs\`).
    *   **Create a Service Account:** Create a K8s service account within this namespace that Dataiku will use to create pods.
    *   **Grant Permissions:** Create a Role and RoleBinding to give this service account permissions to create, monitor, and delete pods within the \`dataiku-jobs\` namespace.
2.  **Configure the Connection in Dataiku (The DSS Admin's Task):**
    *   Navigate to **Administration > Containerized Execution**.
    *   Click **+ NEW CONTAINER CONFIGURATION**.
    *   **Select Kubernetes:** Choose Kubernetes as the container engine.
3.  **Provide Cluster Details:**
    *   You need to provide Dataiku with the Kubeconfig file that allows it to access the cluster. This file contains the cluster address and the credentials for the service account you created in step 1.
    *   Specify the **Namespace** to use (\`dataiku-jobs\`).
4.  **Define a Base Docker Image:**
    *   Specify a Docker image to be used for running the jobs (e.g., \`dataiku/dss-python-base:latest\`). This image must contain the necessary system libraries and Python.
5.  **Test and Save:** Save the configuration.
6.  **Using the Connection (The Developer's Task):**
    *   Now, in any Python recipe, go to the **Advanced** settings.
    *   In the **Container** dropdown, you can select the Kubernetes configuration you just created.
    *   When you run the recipe, Dataiku will now execute it in a pod on your K8s cluster instead of on the main Dataiku server.

### 4. Resources and Tools
- **\`kubectl\`:** The command-line tool for managing your Kubernetes cluster.
- **Dataiku Administration > Containerized Execution:** The UI for configuring the connection.
- **Docker Hub:** To find base images for your execution environments.

### 5. Next Steps and Progression
- **Custom Images:** Build and use your own custom Docker images with specific libraries or dependencies pre-installed for your jobs.
- **Resource Profiles:** Create different container configurations with different resource requests (CPU, memory), allowing users to select a "small," "medium," or "large" container for their job.
- **GPU Jobs:** Configure a container environment that uses a base image with GPU drivers and targets a node pool in your K8s cluster that has GPU hardware, enabling deep learning workloads.

### 6. Common Challenges and Solutions
- **Challenge:** "The connection from Dataiku to Kubernetes fails."
- **Solution:** This is a network or authentication issue. Ensure the Kubeconfig file is correct. From the Dataiku server's command line, try to run a \`kubectl\` command to see if it can reach the cluster's API server. Firewalls often block this access.
- **Challenge:** "My job is submitted but it's stuck in a 'Pending' state in Kubernetes."
- **Solution:** This means the K8s scheduler cannot find a node with enough available resources (CPU or memory) to run your job's pod. You either need to add more nodes to your cluster or reduce the resource requests in your container configuration in Dataiku.
`,
  },
  {
    id: 77,
    slug: 'using-dataiku-apis-for-advanced-control',
    question: 'How to get started with + using Dataiku APIs for advanced control?',
    answer: `
### 1. Introduction/Overview
Dataiku provides two powerful APIs for programmatic control: the **Python API**, used *inside* Dataiku (in recipes and notebooks) to interact with the project, and the **REST API**, used *outside* Dataiku to automate and integrate it with other systems. Mastering these APIs unlocks the highest level of automation and advanced functionality.

### 2. Prerequisites
- **A clear goal:** Know what you want to automate.
- **Programming skills:** Python for the Python API, and any language that can make HTTP requests (or \`curl\`) for the REST API.
- **An API Key:** For the REST API, you'll need to generate a key in your user profile.

### 3. Step-by-Step Instructions

#### Getting Started with the Python API (Inside Dataiku)
1.  **Where to use it:** In a Python recipe, Jupyter notebook, or a scenario's Python step.
2.  **What it's for:** Interacting with objects in your project.
3.  **Example: Reading a dataset and getting its metadata.**
    > \`\`\`python
    > import dataiku
    >
    > # Get a handle on a dataset
    > dataset = dataiku.Dataset("my_dataset")
    >
    > # Read its data into a Pandas DataFrame
    > df = dataset.get_dataframe()
    >
    > # Get its metadata (row count, schema)
    > metadata = dataset.get_metadata()
    > print(f"Number of rows: {metadata['metrics']['recordsCount']}")
    > \`\`\`
4.  **Key Concept:** The \`dataiku\` library is automatically available. You use it to get handles on projects, datasets, models, etc., and then call methods on those objects.

#### Getting Started with the REST API (Outside Dataiku)
1.  **Where to use it:** From an external system like a CI/CD tool (Jenkins), a scheduler (Airflow), or your own application.
2.  **What it's for:** Triggering actions in Dataiku, like running a scenario or exporting a project.
3.  **Example: Triggering a scenario with \`curl\`.**
    > \`\`\`bash
    > # The -u flag provides the API key as the username with a blank password
    > curl -X POST -u 'YOUR_API_KEY:' 'https://dss.mycompany.com/public/api/projects/MYPROJ/scenarios/run_daily/run'
    > \`\`\`
4.  **Key Concept:** You make standard HTTP requests (GET, POST, PUT, DELETE) to specific endpoints that represent Dataiku objects and actions.

### 4. Resources and Tools
- **Dataiku Python API Documentation:** This is your primary reference. It's available from the Help menu in Dataiku.
- **Dataiku REST API Documentation:** Also available from the Help menu. It provides an interactive (Swagger) UI to explore all available endpoints.
- **\`curl\` and Postman:** Essential tools for testing and debugging your REST API calls.

### 5. Next Steps and Progression
- **Python API:** Write scenarios that programmatically build parts of your flow, check data quality, and deploy models based on custom logic.
- **REST API:** Build a full CI/CD pipeline that uses the REST API to update a project from Git, run tests, create a bundle, and deploy it to production.
- **Combining Them:** A common pattern is to have an external system use the REST API to trigger a scenario, and that scenario then uses the Python API to perform its complex, programmatic logic.

### 6. Common Challenges and Solutions
- **Challenge (Python API):** "I don't know what methods are available for an object."
- **Solution:** Use the \`help()\` function in a notebook (e.g., \`help(dataset)\`) or refer to the official Python API documentation, which is comprehensive.
- **Challenge (REST API):** "I'm getting a 401 Unauthorized or 403 Forbidden error."
- **Solution:** This is a permissions issue. Check that your API key is correct and that it has been granted the necessary permissions (e.g., "Run scenarios on project MYPROJ") in the API key settings.
`,
  },
  {
    id: 78,
    slug: 'adding-custom-plugins-to-dss',
    question: 'How to get started with + adding custom plugins to DSS?',
    answer: `
### 1. Introduction/Overview
Plugins are packages that extend Dataiku's core functionality. They can add new visual recipes, dataset connectors, processors, and more. You can install pre-built plugins from the Dataiku marketplace or even develop your own to encapsulate reusable, domain-specific logic for your organization.

### 2. Prerequisites
- **Dataiku Administrator rights:** Installing plugins is a global action that requires admin privileges.
- **For Development:** A local or "developer" instance of Dataiku where you have filesystem access.

### 3. Step-by-Step Instructions

#### Part 1: Installing a Pre-built Plugin from the Store
1.  **Navigate to the Plugin Store:** As an admin, go to **Administration > Plugins**.
2.  **Browse the Store:** Click on the **Store** tab. Here you will find a catalog of plugins built by Dataiku and the community.
3.  **Install a Plugin:**
    *   Find a plugin you want (e.g., the "Geospatial" plugin or the "Tableau Hyper Export" plugin).
    *   Click on it and click the **Install** button.
4.  **Build the Code Environment:** After installation, the plugin will need to build its own code environment with its specific Python or R dependencies. Click the **Build** button.
5.  **Start Using It:** Once the environment is built, the plugin's components (e.g., new visual recipes) will now be available for all users in the "+ Recipe" menu in their projects.

#### Part 2: Developing Your Own Custom Plugin (High-Level)
1.  **Enable Dev Mode:** On your developer Dataiku instance, you enable "dev mode," which allows you to create a new plugin folder directly in the Dataiku installation directory.
2.  **Define the Components:** A plugin is a collection of folders and JSON configuration files.
    *   To create a new visual recipe, you would create a \`recipe.json\` file to define its UI (inputs, outputs, user parameters) and a \`recipe.py\` file for the Python backend logic.
    *   To create a new dataset connector, you would create the necessary Python classes that handle connecting to the source and reading the data.
3.  **Test and Iterate:** You can develop and test the plugin live on your dev instance.
4.  **Package for Distribution:** Once complete, you can zip the plugin's folder. This \`.zip\` file can then be installed on other Dataiku instances, just like a plugin from the store.

### 4. Resources and Tools
- **Plugin Store:** The marketplace for finding and installing existing plugins.
- **Dataiku Developer Guide:** The official documentation contains detailed, step-by-step tutorials on how to develop your own custom plugins.
- **Git:** The source code for many official and community plugins is available on GitHub, which can be a great learning resource.

### 5. Next Steps and Progression
- **Share Plugins Internally:** Package your custom plugins and set up an internal plugin store for your organization, allowing teams to easily share and reuse powerful, governed components.
- **Contribute to the Community:** If you build a generic, useful plugin, consider open-sourcing it and contributing it to the public plugin store.

### 6. Common Challenges and Solutions
- **Challenge:** "After installing a plugin, I can't find the new recipe."
- **Solution:** First, ensure you have successfully built the plugin's code environment in the Administration section. Second, you may need to restart the Dataiku backend for the new components to be fully registered.
- **Challenge (Development):** "Creating a plugin seems very complicated."
- **Solution:** Start simple. The developer documentation has a "hello world" tutorial. Try creating a very simple recipe with one input, one output, and a single user parameter. This will teach you the basic structure and concepts.
`,
  },
  {
    id: 79,
    slug: 'deploying-dataiku-rest-endpoints',
    question: 'How to get started with + deploying Dataiku REST endpoints?',
    answer: `
### 1. Introduction/Overview
Deploying a REST endpoint allows you to expose your Dataiku models or functions as a real-time API service. This means external applications can send a single request (e.g., with a customer's data) and get an immediate prediction back. This is handled by a separate component of the Dataiku platform called the **API Deployer**.

### 2. Prerequisites
- **A "Saved Model" or a Python function:** You need an artifact to deploy. This is usually a trained model from your Flow, but can also be a Python function.
- **Access to an API Deployer instance:** The API Deployer is a separate service from the main Dataiku design node. Your administrator needs to have set one up.
- **Permissions:** You need to have deployment permissions on the API Deployer.

### 3. Step-by-Step Instructions
1.  **From your Project, Deploy to the API Deployer:**
    *   Go to your project's Flow and select your **Saved Model**.
    *   From the right-hand panel, click **API Designer**.
    *   Click **+ CREATE YOUR FIRST API SERVICE**.
    *   Give your service a name and create a new endpoint. Configure it to use your Saved Model.
2.  **Deploy the Service:**
    *   Once you have created the service and endpoint in the designer, click the **Deploy** button.
    *   The API Deployer will package up your model and deploy it as a live, running service.
3.  **Test the Live Endpoint:**
    *   Navigate to the API Deployer UI. You will see your newly deployed service.
    *   Click on it. The UI provides a testing panel where you can enter sample data (as a JSON object) and see the real-time prediction from the live model.
4.  **Integrate with Applications:**
    *   The API Deployer UI also provides the endpoint's URL and code snippets in various languages (\`curl\`, Python, etc.).
    *   Give this URL and an API key to your application developers so they can integrate the prediction service into their application.

### 4. Resources and Tools
- **API Designer:** The UI within a project for creating the definition of your API service.
- **API Deployer:** The separate, production-grade service that runs, monitors, and scales your live API endpoints.
- **Saved Model:** The versioned artifact that gets packaged and deployed.

### 5. Next Steps and Progression
- **Versioning:** You can deploy multiple versions of your model to the same endpoint. The API Deployer allows you to manage these versions and control which one is active.
- **Champion/Challenger (A/B Testing):** You can split traffic between two different model versions to compare their live performance before fully rolling out a new version.
- **Monitoring and Scaling:** The API Deployer provides monitoring dashboards for your endpoints, showing latency, traffic volume, and error rates. If running on Kubernetes, you can autoscale the number of replicas to handle high traffic loads.

### 6. Common Challenges and Solutions
- **Challenge:** "The deployment is failing."
- **Solution:** Check the deployment logs in the API Deployer. A common issue is that the code environment used by the model is not present on the API node. The API node needs to have all the same package dependencies as the design node where the model was trained.
- **Challenge:** "The live API is returning an error."
- **Solution:** Check the logs of the API service in the API Deployer UI. This will show the full traceback of any errors that occurred during prediction. A common issue is that the JSON sent by the client application does not match the schema the model is expecting.
`,
  },
  {
    id: 80,
    slug: 'building-interactive-dataiku-apps',
    question: 'How to get started with + building interactive Dataiku apps?',
    answer: `
### 1. Introduction/Overview
Dataiku Apps are standalone, interactive web applications that you can build within your project. They provide a simple UI for business users, allowing them to interact with your data pipelines and models without needing to see the complex underlying Flow. This is a powerful way to deliver insights and "productionize" your analytics work for a non-technical audience.

### 2. Prerequisites
- **A clear purpose for the app:** What do you want the user to be able to do? (e.g., "enter a customer ID and see their predicted churn score," "upload a file and have it cleaned automatically").
- **An underlying Dataiku pipeline:** The app is a "front-end" to a pipeline you have already built in the Flow.
- **Basic web development knowledge (for some app types):** Knowledge of HTML or a Python web framework can be helpful.

### 3. Step-by-Step Instructions: Choosing an App Type
Dataiku offers several types of web apps. To start, go to your project's top navigation bar and click **... > Webapps**. Then click **+ NEW WEBAPP**.

#### 1. For Simple, Guided Workflows: Standard Webapp
- **What it is:** A simple app where you can arrange "slides" with inputs (like forms for user input) and outputs (like charts or datasets).
- **How to start:**
    1.  Choose **Standard** as the app type.
    2.  Use the editor to add slides and widgets. For example, add a form for the user to enter a variable, then a button that triggers a scenario, and finally a slide that displays the resulting dataset or chart.
- **Best for:** Creating simple, guided "wizard-like" interfaces.

#### 2. For Data-Rich Dashboards: Dash/Plotly or Bokeh
- **What it is:** These options let you build a webapp using popular Python libraries for creating interactive dashboards.
- **How to start:**
    1.  Choose **Dash/Plotly** as the app type.
    2.  Write Python code in the editor that uses the \`dash\` library to define the layout and interactivity of your app. Your Python code can read Dataiku datasets to populate the charts.
- **Best for:** Creating highly interactive, custom dashboards that go beyond the standard Dataiku dashboard capabilities.

#### 3. For Rapid Prototyping: Streamlit
- **What it is:** Streamlit is a Python library that makes it incredibly fast to build simple web apps. Dataiku has a native integration.
- **How to start:**
    1.  Choose **Streamlit** as the app type.
    2.  Write a simple Python script using \`streamlit\` commands (\`st.write\`, \`st.button\`, \`st.dataframe\`).
- **Best for:** Quickly creating simple data exploration tools or prototypes.

### 4. Resources and Tools
- **Webapp Editor:** The Dataiku interface for building and configuring your app.
- **Python Framework Documentation:** The official docs for Dash, Bokeh, or Streamlit are essential when building code-based apps.
- **Tutorials and Sample Projects:** Explore the Dataiku gallery for examples of webapps.

### 5. Next Steps and Progression
- **Backend Logic:** The power of Dataiku apps comes from their ability to trigger scenarios. A button in the app can run a whole data pipeline in the background and then display the result.
- **User Permissions:** Share your app with specific user groups. They will be able to use the app without needing to see or understand the underlying project Flow.

### 6. Common Challenges and Solutions
- **Challenge:** "My Python-based app isn't working."
- **Solution:** Use the "Logs" tab in the webapp editor to see any error messages from your Python backend code. Common issues are missing library imports or incorrect logic for reading data.
- **Challenge:** "How do I pass user input from the app to my pipeline?"
- **Solution:** The user input from a form in the app can be saved as a **project variable**. Your scenario can then use this variable to control its execution (e.g., in a filter or a recipe parameter).
`,
  },
  {
    id: 81,
    slug: 'collaborating-with-business-analysts-and-data-scientists',
    question: 'How to get started with + collaborating with business analysts and data scientists?',
    answer: `
### 1. Introduction/Overview
Dataiku is fundamentally a collaborative platform, designed to bridge the gap between different roles. Effective collaboration between Business Analysts (BAs), who understand the business context, and Data Scientists (DSs), who have the technical skills, is the key to building impactful data projects.

### 2. Prerequisites
- **A shared project:** A Dataiku project where all team members are added as contributors.
- **A common goal:** Everyone should be aligned on the business problem the project is trying to solve.

### 3. Step-by-Step Instructions: A Collaborative Workflow

1.  **Shared Understanding (The Kickoff):**
    *   Start the project with a meeting between BAs and DSs.
    *   The BA's role is to clearly define the **business problem**, the available data sources, and the desired outcome.
    *   The DS's role is to translate this into a potential **technical plan** (e.g., "This sounds like a classification problem; we will need to join these three tables").
    *   Document this initial plan in the **Project Wiki**.
2.  **Parallel Work in the Flow:**
    *   The visual Flow is the shared workspace. Different roles can work on different parts of the flow simultaneously.
    *   **BA Task:** A BA can use their domain knowledge to work on visual **Prepare** recipes, creating rules to clean the data and define business logic.
    *   **DS Task:** A DS can work on a more technical part of the flow, such as writing a **Python recipe** to call an API or building a predictive model in the **Visual ML Lab**.
3.  **Communication and Handoffs:**
    *   **Use the Discussions Feature:** This is crucial. On any dataset or recipe, you can have a conversation. A BA can @-mention a DS on a dataset and ask, "I've finished cleaning the customer data. Can you check if it's ready for modeling?"
    *   **Use Descriptions:** Both roles should be disciplined about adding clear descriptions to the objects they create. A DS should be able to understand what a BA's recipe does just by reading its description.
4.  **Review and Iteration:**
    *   **Dashboards:** The DS can build a model and share the results (like feature importance) on a **Dashboard**. The BA can then review these results and provide feedback based on their business knowledge ("It's interesting that customer tenure is so important; that matches our intuition").

### 4. Resources and Tools
- **The Visual Flow:** The shared language that both roles can understand.
- **Discussions and Comments:** The primary tool for contextual, asynchronous communication.
- **Project Wiki:** The single source of truth for the project's goals and documentation.
- **Dashboards:** The tool for sharing results and insights between roles.

### 5. Next Steps and Progression
- **Code Reviews:** If using Git, a BA can be included in pull requests as an optional reviewer to ensure the code's logic aligns with the business requirements.
- **Paired Sessions:** Schedule regular sessions where a BA and a DS can sit together and work on a part of the flow, combining their skills in real-time.

### 6. Common Challenges and Solutions
- **Challenge:** "The BA and DS are not speaking the same language."
- **Solution:** The visual Flow helps bridge this gap. Encourage them to "speak through the Flow." The BA can build a visual prototype of the logic they want, and the DS can then refine or optimize it.
- **Challenge:** "The data scientist built a model that is technically accurate but doesn't solve the real business problem."
- **Solution:** This happens when there is not enough collaboration at the beginning and throughout the project. The BA must be involved in reviewing the model's results and providing feedback to ensure it is aligned with the business goal. Regular check-ins are essential.
`,
  },
  {
    id: 82,
    slug: 'translating-business-needs-into-dss-pipelines',
    question: 'How to get started with + translating business needs into DSS pipelines?',
    answer: `
### 1. Introduction/Overview
The most successful data projects are those that directly address a real business need. The skill of translating a business request into a functional, technical pipeline in Dataiku is crucial for any data professional. This is a process of deconstruction and mapping.

### 2. Prerequisites
- **A clear business request:** A well-defined problem from a stakeholder (e.g., "We need to identify customers who are likely to churn," "I need a weekly report of our top-selling products").
- **Access to business stakeholders** for clarifying questions.

### 3. Step-by-Step Instructions: The Translation Process

1.  **Deconstruct the Business Request (The "5 Whys"):**
    *   Start by asking questions to get to the core of the request.
    *   **What is the ultimate goal?** (e.g., "To reduce churn by 5%").
    *   **Who is the audience?** (e.g., "The marketing team").
    *   **What data do we need?** (e.g., "Customer demographics, purchase history, website activity").
    *   **What transformations are needed?** (e.g., "Define 'active customer', calculate 'days since last purchase'").
    *   **What is the final output?** (e.g., "A dashboard with a list of at-risk customers").
    *   Document these answers in the **Project Wiki**.
2.  **Map Requirements to Dataiku Components:**
    *   Now, translate each part of your deconstructed plan into a Dataiku object or action.
    *   "Get customer demographics" -> **Create a SQL Dataset** from the \`customers\` table.
    *   "Get purchase history" -> **Create a SQL Dataset** from the \`orders\` table.
    *   "Define 'active customer'" -> Add a **Formula** step in a **Prepare recipe**.
    *   "Join the two datasets" -> Use a **Join recipe**.
    *   "Build a predictive model" -> Use the **Visual Analysis Lab**.
    *   "Create a list of at-risk customers" -> Use a **Score recipe**.
    *   "Share the list on a dashboard" -> Create a **Dashboard** with a table view of the scored dataset.
3.  **Storyboard the Flow:**
    *   Before you build, draw a simple diagram (even on a whiteboard) of how these recipes and datasets will connect. This will become the blueprint for your Flow. Use **Flow Zones** to represent the major stages you identified (e.g., Ingestion, Preparation, Modeling, Output).
4.  **Build the Pipeline:** Following your blueprint, build the pipeline in Dataiku, creating each dataset and recipe in the logical order.

### 4. Resources and Tools
- **The Project Wiki:** Your primary tool for documenting the business requirements and your technical translation plan.
- **The Visual Flow:** The canvas where you implement your plan.
- **Visual Recipes:** The building blocks for most business logic transformations.

### 5. Next Steps and Progression
- **Build a Prototype:** Quickly build a simplified version of the pipeline to show to stakeholders. This allows you to get early feedback and ensure your interpretation of their needs is correct before you invest a lot of time.
- **Iterate:** Data projects are rarely linear. Be prepared to go back and refine your understanding of the business needs as you explore the data and share initial results.

### 6. Common Challenges and Solutions
- **Challenge:** "The business requirements are vague or keep changing."
- **Solution:** This is normal. Use an agile approach. Build the pipeline in small, iterative steps and have regular check-ins with your stakeholders. Showing them a working prototype is the best way to clarify vague requirements.
- **Challenge:** "The data we need doesn't exist or is in poor condition."
- **Solution:** This is a key finding of the translation process. You must communicate this back to the stakeholders immediately. The project may need to be redefined, or a separate project may need to be started to acquire or clean the necessary data.
`,
  },
  {
    id: 83,
    slug: 'reviewing-code-and-mentoring-junior-workers',
    question: 'How to get started with + reviewing code and mentoring junior workers?',
    answer: `
### 1. Introduction/Overview
Reviewing the work of junior team members is one of the most important roles for a senior developer or SME. It's not just about catching errors; it's about teaching best practices, ensuring consistency, and helping them grow their skills. In Dataiku, this involves reviewing both visual flows and code recipes.

### 2. Prerequisites
- **A junior team member** who is actively developing in Dataiku.
- **Established team standards:** You should have a set of best practices for naming, documentation, and code style for them to follow.
- **A collaborative mindset:** The goal is to be helpful and constructive, not just critical.

### 3. Step-by-Step Instructions: A Review and Mentoring Process

#### 1. Set Up a Review Cadence
- **For Visual Flows:** Schedule a regular, short (e.g., 30-minute) session to do a "Flow walkthrough." Have the junior developer share their screen and explain the pipeline they've built.
- **For Code Recipes (Python/SQL):** Use a formal **Pull Request (PR)** process if you are using Git. Require all code changes to be submitted as a PR that you must review and approve.

#### 2. What to Look for in a Visual Flow Review
- **Clarity and Organization:** Is the Flow well-organized with **Flow Zones**? Is it easy to understand the data's journey?
- **Naming Conventions:** Are datasets and recipes named according to your team's standards?
- **Documentation:** Does every recipe and dataset have a clear **description**?
- **Efficiency:** Are they using the right recipes? For example, are they using the in-memory engine on a very large dataset where they should be using Spark or SQL push-down?
- **Logic:** Open a few key **Prepare** recipes. Are the transformation steps logical and easy to follow?

#### 3. What to Look for in a Code Review (Pull Request)
- **Correctness:** Does the code do what it's supposed to do?
- **Style:** Does the code follow your team's style guide (e.g., PEP 8 for Python)?
- **Readability:** Is the code clean, with good variable names and comments where necessary?
- **Reusability:** Are they repeating code that should be moved into a reusable function in the project **Library**?
- **Error Handling:** Does the code handle potential errors gracefully (e.g., with \`try...except\` blocks)?

#### 4. Giving Constructive Feedback
- **Be specific:** Instead of "this is confusing," say "Can we rename this variable to be more descriptive?"
- **Explain the 'why':** Explain *why* a certain best practice is important (e.g., "We use project variables instead of hardcoding so that we can easily deploy this to production").
- **Ask questions:** Instead of "do this," try "Have you considered using a Group recipe here instead of Python? It might be more performant."

### 4. Resources and Tools
- **Git and Pull Requests:** The standard for formal code reviews.
- **The Visual Flow:** The canvas for reviewing pipeline architecture and logic.
- **Your Team's Wiki:** The place where all your standards should be documented so you can refer the junior dev to it.

### 5. Next Steps and Progression
- **Pair Programming:** Schedule a session to work on a task *together*. This is one of the most effective mentoring techniques.
- **Delegate Ownership:** As the junior developer grows, give them ownership of a small project or a significant part of a larger one. Being responsible for the outcome is a powerful learning experience.

### 6. Common Challenges and Solutions
- **Challenge:** "I don't have time to review everything."
- **Solution:** You don't have to. Focus your review efforts on the most critical parts of the pipeline. Automate what you can (e.g., use a linter for code style). Trust your team members, but verify their work on key components.
- **Challenge:** "The junior developer keeps making the same mistakes."
- **Solution:** This might mean the best practice hasn't been clearly explained or documented. Take the time to explain the concept again and add it to your team's documented standards in the Wiki so they have a written reference.
`,
  },
  {
    id: 84,
    slug: 'gathering-requirements-for-dataiku-projects',
    question: 'How to get started with + gathering requirements for Dataiku projects?',
    answer: `
### 1. Introduction/Overview
A data project without clear requirements is like a ship without a rudder. The requirements gathering process is a structured conversation with business stakeholders to understand their goals, which you then translate into a technical plan. This is the most critical phase for ensuring your project will deliver real business value.

### 2. Prerequisites
- **Access to business stakeholders:** The people who have the business problem you are trying to solve.
- **A collaborative mindset and good listening skills.**

### 3. Step-by-Step Instructions: The Requirements Gathering Framework

1.  **The Kickoff Meeting: Understanding the "Why"**
    *   Schedule a meeting with the key stakeholder(s).
    *   **Goal:** To understand the high-level business objective. Don't talk about technology yet.
    *   **Key Questions to Ask:**
        *   "What business problem are you trying to solve?"
        *   "What does success look like? If this project is successful, what will be different?"
        *   "Who is the end user or audience for this project's output?"
        *   "What decisions will they make based on this project?"

2.  **The Follow-up: Understanding the "What"**
    *   After the initial meeting, you'll need to dig into the details of the data and logic.
    *   **Key Questions to Ask:**
        *   "What specific data sources do you think we will need? Where do they live?" (e.g., Salesforce, SAP, an Excel file).
        *   "Can you introduce me to the subject matter expert for each data source?"
        *   "What are the key business rules or calculations that need to be applied?" (e.g., "How do you define an 'active customer'?").
        *   "What should the final output look like? Is it a number, a list of customers, a dashboard?"

3.  **Document Everything in a Project Brief:**
    *   Create a new page in your **Project Wiki** called "Project Brief".
    *   This document is your source of truth. It should be written in clear, simple language and should contain:
        *   **Project Goal:** A one-paragraph summary.
        *   **Stakeholders:** A list of key contacts.
        *   **Data Sources:** A list of required source systems.
        *   **Business Logic:** A summary of the key calculations and rules.
        *   **Deliverables:** A description of the final output (e.g., "A dashboard showing daily sales, refreshed by 9 AM").
4.  **Get Sign-off:**
    *   Share this Project Brief with your stakeholders and ask them to review it.
    *   Make sure they agree that you have correctly captured their requirements. This alignment is crucial before you start building.

### 4. Resources and Tools
- **The Project Wiki:** The perfect place to create and maintain your requirements documents.
- **Interviewing Skills:** The ability to ask good, open-ended questions is your most important tool.

### 5. Next Steps and Progression
- **Technical Design:** Once the business requirements are signed off, you can create a separate technical design document that maps these requirements to a specific Dataiku Flow architecture.
- **Agile Approach:** Requirements can change. Treat the Project Brief as a living document. Have regular check-ins with your stakeholders to show them progress (e.g., with a prototype dashboard) and validate that you are still on the right track.

### 6. Common Challenges and Solutions
- **Challenge:** "The stakeholders don't know what they want" or "The requirements are very vague."
- **Solution:** This is very common. The best way to clarify vague requirements is to **build a prototype**. Quickly create a simple version of the final output using a sample of the data. When stakeholders see something tangible, it becomes much easier for them to give specific feedback and refine their requirements.
- **Challenge:** "Different stakeholders are giving me conflicting requirements."
- **Solution:** You have uncovered a misalignment in the business. Your role is to highlight this conflict. Bring the stakeholders together in a meeting, present the conflicting requirements, and facilitate a discussion to help them reach a consensus.
`,
  },
  {
    id: 85,
    slug: 'writing-technical-specs-and-process-docs',
    question: 'How to get started with + writing technical specs and process docs?',
    answer: `
### 1. Introduction/Overview
While a Project Brief captures the business requirements, a Technical Specification (or "Tech Spec") translates those requirements into a detailed blueprint for developers. It describes *how* the project will be built in Dataiku. Good technical documentation ensures the solution is well-planned, and it serves as a vital reference for future maintenance and development.

### 2. Prerequisites
- **A signed-off Project Brief:** You must understand the business requirements before you can design the technical solution.
- **A solid understanding of Dataiku's capabilities.**

### 3. Step-by-Step Instructions: Creating a Tech Spec in the Wiki

1.  **Create a New Wiki Page:** In your Dataiku project's **Wiki**, create a new page titled "Technical Specification".
2.  **Structure the Document:** Use a clear, structured format. Markdown headings (\`##\`, \`###\`) are great for this. A good tech spec includes the following sections:

    *   **1. Overview:**
        *   A brief summary of the technical approach.
        *   Link back to the main "Project Brief" for business context.
    *   **2. Flow Architecture:**
        *   A high-level description of the main **Flow Zones** that will be used (e.g., \`Ingestion\`, \`Preparation\`, \`Modeling\`).
        *   You can even include a screenshot of a whiteboard or diagram of the planned Flow.
    *   **3. Data Ingestion:**
        *   List each data source.
        *   For each source, specify the **connection type** (e.g., Snowflake, S3), the **specific table or file path**, and the planned **ingestion recipe**.
    *   **4. Transformation Logic:**
        *   This is the core of the spec. Describe the purpose of each key recipe in the pipeline.
        *   Example: "\`prepare_customers\`: This recipe will filter for active customers, parse the \`join_date\` column, and create a new \`customer_age\` feature using a Formula."
    *   **5. Outputs:**
        *   Describe each final deliverable.
        *   For a dataset: Specify its schema (columns and types).
        *   For a model: Specify the algorithm and target variable.
        *   For a dashboard: List the key charts and metrics it will contain.
    *   **6. Automation & Scheduling:**
        *   Describe the **scenario** that will be built, its trigger (e.g., "Time-based, daily at 6 AM"), and any alerting (reporters) that will be configured.

3.  **Review the Spec:** Before starting development, have another developer or a tech lead review your specification. This peer review can catch design flaws or suggest more efficient approaches early on.

### 4. Resources and Tools
- **Project Wiki:** The ideal location for creating and sharing your technical documentation.
- **Markdown:** The simple syntax used in the Wiki for formatting your document.
- **Diagramming Tools (optional):** Tools like Lucidchart or even PowerPoint can be used to create a visual diagram of your planned Flow architecture to include in the spec.

### 5. Next Steps and Progression
- **Living Document:** The tech spec is a living document. As you build the project, you may discover things that require you to change the design. Update the spec to reflect your final implementation.
- **Process Documentation:** After the project is built, you can create a separate "Process Document" or "Run Book" in the Wiki that explains how to run and maintain the pipeline, intended for the support team that will take it over.

### 6. Common Challenges and Solutions
- **Challenge:** "Writing a detailed spec before I've even seen the data seems impossible."
- **Solution:** You're right. The process is iterative. The initial tech spec is based on your best guess from the requirements. You will likely need to update it after your initial data exploration. The goal is to have a plan, not to predict the future perfectly.
- **Challenge:** "This feels like too much bureaucracy."
- **Solution:** For a very small, simple project, a detailed spec might be overkill. However, for any project of moderate complexity or one that will be maintained long-term, the time spent on a clear technical plan upfront will be saved many times over in reduced development confusion and easier maintenance later.
`,
  },
  {
    id: 86,
    slug: 'participating-in-agile-scrum-development-flows',
    question: 'How to get started with + participating in Agile/Scrum development flows?',
    answer: `
### 1. Introduction/Overview
Agile and Scrum are methodologies for managing projects in an iterative and collaborative way. Dataiku's flexible and visual nature fits perfectly into this workflow. Participating in an Agile process with Dataiku involves breaking down your data project into small, manageable pieces (stories) and delivering value in short cycles (sprints).

### 2. Prerequisites
- **Understanding of Agile/Scrum concepts:** Know the basics of sprints, user stories, backlogs, and daily stand-ups.
- **A project management tool:** JIRA, Trello, or a similar tool is often used to manage the backlog and sprint board.
- **A Dataiku project connected to Git.**

### 3. Step-by-Step Instructions: A Dataiku-flavored Sprint Workflow

1.  **Sprint Planning:**
    *   The Product Owner presents the highest priority **User Stories** from the backlog.
    *   **A User Story for a Dataiku project might be:** "As a marketing analyst, I want a dataset of all customers who made a purchase in the last 30 days so that I can create a targeted email campaign."
    *   The development team breaks this story down into technical **tasks** and estimates the effort.
        *   Task 1: Create a dataset for \`customers\`.
        *   Task 2: Create a dataset for \`orders\`.
        *   Task 3: Build a recipe to join them and filter for the last 30 days.

2.  **The Sprint (Development Work):**
    *   **Create a Git Branch:** Each developer should create a new feature branch in Git for the story they are working on (e.g., \`feature/marketing-30day-report\`).
    *   **Build in Dataiku:** The developer works on their branch in Dataiku, building the necessary datasets and recipes to complete the tasks.
    *   **Commit Regularly:** The developer should commit their changes to the feature branch frequently with clear messages.
    *   **Daily Stand-ups:** The team meets briefly each day to sync up on progress ("Yesterday I finished the join recipe; today I will add the date filter. I have no blockers.").

3.  **Completing a Story (Definition of Done):**
    *   When the development work is done, the developer creates a **Pull Request** in the Git provider (e.g., GitHub).
    *   This triggers a **code review** from another team member.
    *   Once approved, the feature branch is merged into the \`main\` or \`develop\` branch.
    *   The story is moved to "Done" on the sprint board.

4.  **Sprint Review:**
    *   At the end of the sprint, the team **demos** the completed user stories to the stakeholders. In Dataiku, this is easy: you can just show them the final output dataset or a simple dashboard you built from it.

### 4. Resources and Tools
- **Project Management Tool (JIRA, etc.):** To manage the backlog and sprint board.
- **Git:** The core technology for enabling parallel development on branches.
- **Dataiku's Git Integration:** The interface for branching, committing, and merging your work.

### 5. Next Steps and Progression
- **CI/CD Integration:** Connect your Git repository to a CI/CD tool. When a pull request is created, it can automatically run a "test" scenario in Dataiku to validate the changes before they are merged.
- **Dataiku's TODO list:** For very simple projects, the built-in "TODO" list on the project homepage can be used as a lightweight sprint backlog.

### 6. Common Challenges and Solutions
- **Challenge:** "Data exploration doesn't fit neatly into a two-week sprint."
- **Solution:** This is a common issue. Address this by having a "Spike" or "Research" story. The goal of a spike is not to deliver a finished product, but to investigate a problem and produce a recommendation. The output of the spike would be a better understanding that allows you to create well-defined development stories for the next sprint.
- **Challenge:** "How do we handle a long-running job that takes more than a sprint?"
- **Solution:** Break the pipeline down into smaller, deliverable chunks. The goal for the first sprint might be just to successfully ingest the raw data. The next sprint could focus on cleaning it, and so on. Each part delivers some value and can be demonstrated.
`,
  },
  {
    id: 87,
    slug: 'communicating-progress-to-non‑technical-stakeholders',
    question: 'How to get started with + communicating progress to non‑technical-stakeholders?',
    answer: `
### 1. Introduction/Overview
Effectively communicating with non-technical stakeholders is a critical soft skill for any data professional. They don't need to know about the complexities of your Python code or SQL joins; they need to understand how the project is progressing towards solving their business problem. The key is to use visuals, speak their language, and focus on business value.

### 2. Prerequisites
- **A Dataiku project in development.**
- **Regularly scheduled meetings or check-ins** with your stakeholders (e.g., a weekly demo).

### 3. Step-by-Step Instructions: A Communication Toolkit

#### 1. Use Dashboards as Your Primary Tool
- **Why:** Dashboards are visual, interactive, and easy to understand.
- **How:** From the very beginning of the project, create a simple **Dashboard**. As you build out your pipeline, publish key insights and charts to this dashboard. Even a simple table showing the first few rows of a cleaned dataset is more effective than talking about abstract transformations.
- **In the meeting:** Share your screen and walk them through the dashboard. Explain what each chart means in business terms.

#### 2. Focus on Outcomes, Not Activities
- **Don't say:** "This week, I wrote a complex Python recipe to parse the nested JSON from the API."
- **Do say:** "This week, we successfully connected to the product system, and as you can see on this chart, we can now report on product categories."

#### 3. Create a Simple Project "ReadMe"
- **Why:** To provide a high-level summary that stakeholders can refer to at any time.
- **How:** On your project's homepage, use a **Text** tile or the **Wiki** to create a simple summary that includes:
    - The project goal in plain English.
    - A link to the main output dashboard.
    - The names of the key project contacts.

#### 4. Use the Visual Flow (Carefully)
- **Why:** The Flow can be a powerful tool to show the overall process, but it can also be overwhelming.
- **How:** If you want to show the Flow, make sure it is extremely clean and well-organized with **Flow Zones**. Collapse the zones so you are only showing a high-level, five-step diagram (e.g., \`Ingestion -> Preparation -> Modeling -> Scoring -> Output\`). This communicates the architecture without getting lost in the details.

### 4. Resources and Tools
- **Dataiku Dashboards:** Your number one communication tool.
- **The Visual Flow (with Zones):** For high-level architectural overviews.
- **The Project Wiki:** For persistent, high-level summaries.

### 5. Next Steps and Progression
- **Build a Prototype Early:** The best way to get feedback and show progress is to build a simple, end-to-end prototype, even if the data isn't perfect. This makes the project tangible for stakeholders.
- **Dataiku Apps:** For projects that require user input, build a simple Dataiku Webapp. This provides a user-friendly interface that completely hides the underlying complexity of the Flow.

### 6. Common Challenges and Solutions
- **Challenge:** "The stakeholders are getting bogged down in technical details or asking for constant changes."
- **Solution:** You may be showing them too much detail. Steer the conversation back to the business requirements. Refer to the signed-off Project Brief. If they request a change, assess its impact on the project timeline and communicate that clearly. "That's a great idea. Adding that feature will likely push our delivery date back by a week. Should we prioritize that over the original plan?"
- **Challenge:** "We have no visible progress to show this week."
- **Solution:** This can happen during a heavy technical phase. Even if there are no new charts to show, you can still communicate progress. You could show that a data quality issue has been resolved (e.g., by showing the "before" and "after" in a Prepare recipe) or that a key technical hurdle (like connecting to a difficult data source) has been overcome.
`,
  },
  {
    id: 88,
    slug: 'troubleshooting-live-dataiku-jobs',
    question: 'How to get started with + troubleshooting live Dataiku jobs?',
    answer: `
### 1. Introduction/Overview
When an automated job fails in a live, production environment, you need a systematic process to quickly diagnose and resolve the issue. Troubleshooting in Dataiku involves reading the logs to identify the error, understanding its root cause, and applying a fix.

### 2. Prerequisites
- **A failed scenario run.**
- **Access to the project** where the failure occurred.
- **A calm and methodical mindset.**

### 3. Step-by-Step Instructions: A Troubleshooting Workflow

1.  **Start with the Alert:**
    *   Your journey will likely start with an automated failure alert (e.g., from email or Slack).
    *   The alert should contain a link to the failed job. Click it. If not, navigate to the **Scenarios** page in the relevant project and find the failed run in the "Last runs" list.
2.  **Identify the Failed Step (The "Where"):**
    *   The job log view provides a visual overview of the scenario steps. The step that failed will be clearly marked in red.
    *   This tells you *where* in the pipeline the error occurred (e.g., in the \`prepare_sales_data\` recipe).
3.  **Read the Error Message (The "What"):**
    *   Click on the failed step to view its detailed log.
    *   Scroll to the bottom of the log. The specific error message will almost always be at the end.
    *   **Read the error message carefully.** It is the single most important piece of information.
    *   **Common Error Types:**
        *   \`Connection refused\` or \`Timeout\`: A source system (like a database) was down or unreachable.
        *   \`Table not found\` or \`Column not found\`: A schema change occurred in a source system.
        *   \`NullPointerException\` or \`TypeError\`: A data quality issue (like an unexpected null value) or a bug in a code recipe.
        *   \`Permission denied\`: A permissions issue, either on a data source or an output location.
4.  **Investigate the Root Cause (The "Why"):**
    *   Based on the error message, form a hypothesis.
    *   **If it's a connection error:** Try to connect to the source system manually. Is it down?
    *   **If it's a schema change:** Open the input dataset in Dataiku and try to explore it. Does the schema match what the recipe expects?
    *   **If it's a data quality issue:** Examine the input data that caused the failure. Did a value that is normally a number suddenly contain text?
5.  **Fix and Rerun:**
    *   Apply a fix (e.g., fix the code in a recipe, wait for a source system to come back online, clean the bad data).
    *   Once you believe the issue is resolved, go back to the failed job and you can often **re-run** it from the point of failure.

### 4. Resources and Tools
- **The Job Log:** Your single most important tool for troubleshooting.
- **Scenario "Last Runs" Tab:** The starting point for finding your failed jobs.
- **The "Rerun" Button:** Allows you to restart a failed job without running the already completed steps.

### 5. Next Steps and Progression
- **Build More Resilient Pipelines:** After fixing the issue, ask yourself: "How could I have prevented this?" This might lead you to add more robust **data quality checks** or better error handling in your code recipes.
- **Create a "Run Book":** For critical production pipelines, create a document in the Wiki that lists common failure modes and their specific resolution steps.

### 6. Common Challenges and Solutions
- **Challenge:** "The error message is cryptic and I don't understand it."
- **Solution:** Copy and paste the core part of the error message into a search engine. It's very likely that someone else has encountered the same issue, and you'll find explanations on forums like Stack Overflow or the Dataiku Community.
- **Challenge:** "A job failed, but the log is empty or has no error."
- **Solution:** This is rare, but can happen if the process was killed at the operating system level (e.g., an out-of-memory error that killed the Java process). In this case, you will need to work with your Dataiku administrator to check the server-level logs.
`,
  },
  {
    id: 89,
    slug: 'resolving-pipeline-failures-and-bottlenecks',
    question: 'How to get started with + resolving pipeline failures and bottlenecks?',
    answer: `
### 1. Introduction/Overview
A robust DataOps practice involves not only building pipelines but also maintaining and optimizing them. This guide covers a two-part strategy: first, how to resolve common failures, and second, how to identify and fix performance bottlenecks.

### 2. Prerequisites
- **An existing Dataiku pipeline** that is running in production.
- **Access to the project's job logs.**

### 3. Step-by-Step Instructions

#### Part A: Resolving Failures
1.  **Categorize the Failure:** When a job fails, the first step is to read the log and categorize the error. Most failures fall into one of three buckets:
    *   **Source/External System Failure:** The pipeline failed because it couldn't connect to an external system (e.g., a database was down, an API was unresponsive).
        *   **Solution:** Verify the status of the external system. Once it's back online, you can simply **rerun** the failed job.
    *   **Data Quality Failure:** The pipeline failed because the input data changed in an unexpected way (e.g., a new unexpected value in a column, a schema change, a huge drop in row count).
        *   **Solution:** Investigate the source data. You may need to update your **Prepare recipe** to handle the new data format. **This is why automated data quality checks are so important**—they can catch these issues proactively.
    *   **Code/Logic Failure:** The pipeline failed because of a bug in a code recipe (Python/SQL) or a flaw in the logic of a visual recipe.
        *   **Solution:** This requires debugging the specific recipe. Fix the code or the recipe configuration, test it on a sample of the data, and then rerun the pipeline.
2.  **Implement Preventative Measures:** After fixing the immediate issue, think about how to prevent it in the future. Could a **data quality check** have caught the issue earlier? Does your Python code need better **error handling**?

#### Part B: Resolving Bottlenecks
1.  **Identify the Slowest Step:**
    *   Go to the **Jobs** menu and look at a successful run of your pipeline.
    *   The job's Gantt chart view will clearly show the duration of each recipe. Find the one that takes the most time. This is your bottleneck.
2.  **Optimize the Bottleneck Recipe:** The optimization strategy depends on the recipe type and where it's running.
    *   **Is it an in-memory recipe on large data?** This is the most common bottleneck.
        *   **Solution:** You must **push down the computation**. In the recipe's **Advanced** settings, change the **Execution engine** to **Spark** (if your data is on HDFS/S3) or **Run on database** (if your data is in a SQL database).
    *   **Is it an inefficient SQL or Python recipe?**
        *   **Solution:** The code itself needs to be optimized. For SQL, use \`EXPLAIN\` to analyze the query plan. For Python, profile the code to see which lines are taking the most time.
    *   **Is it a join on un-indexed keys?**
        *   **Solution:** If you are joining large tables in a database, ensure the join columns have database indexes. This can make join performance orders of magnitude faster.
3.  **Measure the Improvement:** After applying an optimization, rerun the pipeline and check the new job duration to verify that your change was effective.

### 4. Resources and Tools
- **Job Logs:** For diagnosing failures.
- **Job Inspector/Gantt Chart:** For identifying performance bottlenecks.
- **Execution Engine Setting:** The primary tool for performance optimization.

### 5. Next Steps and Progression
- **Performance Baselines:** Establish a performance baseline for your critical pipelines. Monitor the run times and set up alerts if a job takes significantly longer than expected.
- **Resource Scaling:** For cloud-based deployments, if a pipeline is still slow after optimization, you may need to scale up your compute resources (e.g., use a larger Snowflake warehouse or add more nodes to your Spark cluster).

### 6. Common Challenges and Solutions
- **Challenge:** "My pipeline fails intermittently with a connection error."
- **Solution:** This points to an unstable external system. While you should report the instability, you can also make your pipeline more resilient by adding retry logic. A Python scenario step can be used to catch the failure and automatically rerun the job a few times before finally failing and sending an alert.
- **Challenge:** "I optimized a recipe, but the whole pipeline is still slow."
- **Solution:** A pipeline is a chain, and it's only as fast as its slowest link. You may have multiple bottlenecks. Repeat the identification and optimization process until the overall pipeline performance meets your requirements.
`,
  },
  {
    id: 90,
    slug: 'staying-updated-with-the-latest-dss-features',
    question: 'How to get started with + staying updated with the latest DSS features?',
    answer: `
### 1. Introduction/Overview
Dataiku is a rapidly evolving platform, with new features, performance improvements, and plugins being released regularly. Staying updated is key to leveraging the full power of the tool and ensuring you are using the most efficient and effective methods. This requires a proactive approach to learning.

### 2. Prerequisites
- **Curiosity and a desire to learn.**
- **Access to the internet.**

### 3. Step-by-Step Instructions: Your Learning Toolkit

1.  **Read the Release Notes:**
    *   This is the most important and authoritative source of information.
    *   With every major and minor version upgrade of Dataiku DSS, the product team publishes detailed **Release Notes**.
    *   Bookmark the official Dataiku documentation site. When your instance is upgraded, take 30 minutes to read through the release notes. Pay attention to new visual recipe processors, new modeling capabilities, and performance enhancements.
2.  **Follow the Dataiku Blog and Community:**
    *   The **Dataiku Blog** often features articles that do a deep dive into new features with use cases and examples.
    *   The **Dataiku Community Forum** is a place where other users discuss new features and share their experiences. It's a great place to learn practical tips.
3.  **Explore the Dataiku Academy:**
    *   The **Dataiku Academy** is not just for beginners. They regularly add new courses and tutorials that cover advanced topics and the latest features.
    *   Check in periodically to see what new learning paths or certifications have been added.
4.  **Dedicate Time for Experimentation:**
    *   Reading is not enough. You need to practice.
    *   When a new feature that looks interesting is released, dedicate a small amount of time to try it out in your **sandbox project**.
    *   For example, if a new Prepare recipe processor is released, create a dummy dataset and experiment with its settings to see exactly how it works.
5.  **Engage with Your Internal Community:**
    *   If you are part of a larger team using Dataiku, set up a "show and tell" or "brown bag" session.
    *   Encourage team members to present a new feature they've learned or a cool trick they've discovered. This helps spread knowledge across the team.

### 4. Resources and Tools
- **Dataiku Release Notes (Official Documentation):** Your primary source of truth.
- **Dataiku Blog:** For use cases and feature deep dives.
- **Dataiku Community Forum:** For practical tips and peer discussions.
- **Dataiku Academy:** For structured learning on new and advanced features.
- **A Sandbox Project:** Your personal playground for safe experimentation.

### 5. Next Steps and Progression
- **Become a Community Contributor:** As you become more expert, start answering questions on the Dataiku Community forum. Teaching others is one of the best ways to deepen your own understanding.
- **Beta Programs:** Keep an eye out for opportunities to participate in beta testing for upcoming Dataiku versions. This gives you a sneak peek at new features and allows you to provide direct feedback to the product team.

### 6. Common Challenges and Solutions
- **Challenge:** "I don't have time to keep up."
- **Solution:** You don't need to learn every single new feature. Focus on the ones that are most relevant to the types of projects you work on. A quick scan of the release note headlines is often enough to identify the 1-2 features that will be most impactful for you. Schedule just a small amount of "learning time" into your calendar each month.
- **Challenge:** "My company is on an old version of Dataiku, so I can't use the new features."
- **Solution:** Use this as an opportunity to build a business case for upgrading. Identify new features in the latest versions that could solve a specific pain point or deliver significant value for your team (e.g., a performance improvement that would save compute costs, or a new connector that would simplify a data ingestion pipeline). Present this case to your platform administrators.
`,
  },
  {
    id: 91,
    slug: 'navigating-the-dataiku-academy-learning-paths',
    question: 'How to get started with + navigating the Dataiku Academy learning paths?',
    answer: `
### 1. Introduction/Overview
The Dataiku Academy is the official, free online learning platform for Dataiku DSS. It provides a comprehensive set of structured **Learning Paths** designed for different user roles and skill levels. Navigating these paths effectively is the fastest way for a new user to get up to speed and for an experienced user to master advanced topics.

### 2. Prerequisites
- **A web browser and an internet connection.**
- **An account on the Dataiku Academy website.**

### 3. Step-by-Step Instructions: Your Academy Roadmap

1.  **Create Your Account:** Go to the Dataiku Academy website and register for a free account.
2.  **Choose Your Learning Path:** The Academy is organized by role-based Learning Paths. For a new developer, the recommended sequence is:
    *   **Level 1: Core Designer:** Start here. This is essential for everyone. It covers the fundamental concepts of the platform: the Flow, datasets, visual recipes (Prepare, Join, Group), and basic charting.
    *   **Level 2: Advanced Designer:** Once you are comfortable with the basics, this path covers more advanced topics like complex data preparation, performance optimization, and scenario automation.
    *   **Level 3: Developer:** This path is for users who will be writing code. It covers the Python and SQL APIs, code recipes, and Git integration.
    *   **Level 4: MLOps Practitioner:** This path focuses on productionizing machine learning, covering topics like model deployment, monitoring, and automation.
3.  **Engage with the Content:**
    *   Each learning path consists of a series of courses.
    *   Each course is made up of short **videos**, followed by hands-on **tutorials** and **quizzes**.
    *   **Don't just watch the videos.** The most important part is the hands-on tutorial. Download the provided starting project and perform the steps yourself in your own Dataiku instance.
4.  **Earn Certifications:**
    *   After completing a major learning path (like Core Designer), you will be prepared to take the corresponding **certification exam**.
    *   These certifications are a great way to validate your skills and demonstrate your proficiency to employers.

### 4. Resources and Tools
- **Learning Paths:** The main, structured curriculum.
- **Course Catalog:** You can also browse individual courses if you want to learn about a specific topic without following a full path.
- **Hands-on Tutorials:** The practical exercises that are key to real learning.

### 5. Next Steps and Progression
- **Specialize:** After completing the main paths, explore specialized topics like "Time Series Forecasting" or "Computer Vision."
- **Keep Learning:** The Academy is updated regularly with new content that aligns with new versions of Dataiku DSS. Check back periodically for new courses.

### 6. Common Challenges and Solutions
- **Challenge:** "I don't have a Dataiku instance to do the hands-on tutorials."
- **Solution:** You can sign up for the **Dataiku Online Free Edition**, which provides a cloud-based Dataiku instance perfect for learning and completing the Academy tutorials.
- **Challenge:** "I'm an experienced user. Do I really need to do the Core Designer path?"
- **Solution:** Yes. Even experienced users often find they have small gaps in their foundational knowledge. Spending a few hours to quickly go through the Core Designer path is highly recommended to ensure you have a solid understanding of the core principles before moving to advanced topics. It also familiarizes you with the terminology used in certifications.
`,
  },
  {
    id: 92,
    slug: 'using-the-dataiku-developer-guide-and-api-docs',
    question: 'How to get started with + using the Dataiku Developer guide and API docs?',
    answer: `
### 1. Introduction/Overview
While the Dataiku Academy is for structured learning, the official **Documentation** is your comprehensive reference manual. For developers, the two most important parts of the documentation are the **Developer Guide**, which contains "how-to" articles on advanced topics, and the **API Docs**, which are the detailed reference for every available API function.

### 2. Prerequisites
- **A specific question or goal:** The documentation is best used as a reference when you are trying to accomplish a specific task (e.g., "How do I use a specific Python API function?").
- **A web browser.**

### 3. Step-by-Step Instructions: Using the Documentation Effectively

#### Part 1: The Developer Guide (for "How-to" Knowledge)
- **When to use it:** When you want to learn how to perform an advanced task, like creating a custom plugin, setting up a complex deployment, or using the REST API for CI/CD.
- **How to access:**
    1.  Go to the official Dataiku documentation website.
    2.  Navigate to the "Developer Guide" section.
- **How to use:** Browse the articles by topic. For example, if you want to create your own visual recipe, you would read the section on "Plugins" which has a step-by-step tutorial.

#### Part 2: The API Docs (for Specific Function Reference)
- **When to use it:** When you are writing code (in a Python recipe or an external script) and need to know the exact name of a function, its required parameters, and what it returns.
- **How to access:**
    1.  From within your Dataiku instance, click the **Help (?)** menu in the top right corner.
    2.  Select **Python API reference** or **REST API documentation**.
- **How to use (Python API):**
    *   The documentation is organized by class (e.g., \`DSSProject\`, \`DSSDataset\`).
    *   Use the search bar to find what you're looking for. For example, if you want to know how to get the row count of a dataset, search for "row count". This will lead you to the \`get_metadata()\` method of the \`DSSDataset\` class.
- **How to use (REST API):**
    *   The REST API doc is an interactive Swagger UI. It lists all available endpoints. You can click on an endpoint to see its required parameters and even test it live from your browser.

### 4. Resources and Tools
- **Search Bar:** The search function in the documentation is very powerful and is your best starting point.
- **Code Examples:** The documentation is full of code snippets that you can copy and adapt for your own use.

### 5. Next Steps and Progression
- **Keep it Open:** When you are doing development work in Dataiku, it's a good practice to always have a browser tab open with the relevant API documentation.
- **Contribute:** The Dataiku documentation is often hosted on a public platform. If you find an error or have a suggestion for improvement, you can contribute back.

### 6. Common Challenges and Solutions
- **Challenge:** "The documentation is overwhelming; I don't know where to start."
- **Solution:** Don't try to read it like a book. Use it as a reference. Start with a specific goal (e.g., "I want to change a project variable with Python"). Then, search the documentation for keywords like "project variable" to find the relevant function.
- **Challenge:** "The example code in the documentation doesn't work."
- **Solution:** This is rare, but can happen. First, double-check that your Dataiku instance version matches the documentation version you are looking at. API functions can change between versions. Second, make sure you have adapted the example correctly for your own project (e.g., by changing the placeholder project keys and dataset names to your actual ones). If it still doesn't work, asking a question on the Dataiku Community with your code snippet is a good next step.
`,
  },
  {
    id: 93,
    slug: 'joining-the-dataiku-community-forums',
    question: 'How to get started with + joining the Dataiku Community forums?',
    answer: `
### 1. Introduction/Overview
The Dataiku Community is a vibrant online forum where Dataiku users, employees, and partners from around the world gather to ask questions, share solutions, and discuss best practices. It is one of the most valuable resources for troubleshooting and learning advanced, practical techniques.

### 2. Prerequisites
- **A web browser.**
- **A willingness to learn and participate.**

### 3. Step-by-Step Instructions: Getting Involved

1.  **Create an Account:**
    *   Navigate to the Dataiku Community website.
    *   Sign up for a free account. You can often link it to your existing Dataiku Academy account.
2.  **Start by Searching:**
    *   Before you post a new question, always use the search bar.
    *   It is highly likely that someone else has already asked a similar question. Reading existing threads is an incredibly efficient way to solve your problem.
    *   Use specific keywords from your error message or the feature you are working with for the best results.
3.  **Asking a Good Question:**
    *   If you can't find an answer, it's time to post a new question. To get a good answer, you must ask a good question.
    *   **Use a clear, descriptive title:** Bad title: "Help!". Good title: "How to resolve 'Permission Denied' error in S3 Export Recipe?".
    *   **Provide context:** Explain what you are trying to achieve.
    *   **Describe what you've already tried:** This shows you've made an effort and saves people from suggesting things you've already done.
    *   **Include specifics:** Share the relevant parts of your code, the full error message, and screenshots of your recipe configuration. Be sure to anonymize any sensitive data.
4.  **Participate and Give Back:**
    *   As you become more experienced, start reading new questions in the forum.
    *   If you see a question you know the answer to, post a helpful reply. Helping others is a great way to solidify your own knowledge.
    *   "Like" helpful answers to give recognition to the people who provided them.

### 4. Resources and Tools
- **The Search Bar:** Your most important tool.
- **Code Formatting:** When you post code, use the code formatting tools in the forum editor to make it readable.
- **User Groups:** The community has special interest groups you can join, for example, for specific industries or regions.

### 5. Next Steps and Progression
- **Become a Regular:** Make it a habit to check the community once a week to see what new topics are being discussed.
- **Earn Badges:** The community has a gamification system with badges for asking good questions, providing accepted answers, and other contributions.
- **Connect with Experts:** The forum is a great way to interact directly with Dataiku experts and seasoned developers.

### 6. Common Challenges and Solutions
- **Challenge:** "I posted a question, but nobody answered."
- **Solution:** This usually means your question was not clear enough. Review your post. Is the title descriptive? Did you provide enough context and share your error messages? You can edit your question to add more detail. A question with a clear, reproducible example is much more likely to get an answer.
- **Challenge:** "I'm hesitant to post because I'm a beginner."
- **Solution:** Don't be! The Dataiku Community is very welcoming to beginners. There are no "stupid" questions. Clearly stating that you are new to the platform will help others provide answers that are tailored to your level.
`,
  },
  {
    id: 94,
    slug: 'earning-dataiku-core-designer-certification',
    question: 'How to get started with + earning Dataiku Core Designer certification?',
    answer: `
### 1. Introduction/Overview
The Dataiku Core Designer Certification is the foundational credential that validates your understanding of the essential concepts and capabilities of Dataiku DSS. Earning it demonstrates to your employer and the industry that you have a solid grasp of building and managing data projects on the platform.

### 2. Prerequisites
- **Completion of the Core Designer Learning Path** in the Dataiku Academy.
- **Hands-on experience:** You should have personally built several basic flows in a Dataiku instance.
- **Access to a Dataiku instance** for practicing.

### 3. Step-by-Step Instructions: Your Path to Certification

1.  **Master the "Core Designer" Learning Path:**
    *   This is not optional. The certification exam is based *directly* on the content of this learning path in the **Dataiku Academy**.
    *   Go through all the courses in the path, from "Basics" to "Visual Recipes" to "Dashboards".
    *   **Crucially, do the hands-on tutorials.** Don't just watch the videos. The practical experience is what makes the knowledge stick.
2.  **Review the Key Concepts:**
    *   The exam covers the entire data pipeline lifecycle. Make sure you are very comfortable with:
        *   The structure of the **Flow**.
        *   Creating **Datasets** from different sources (especially files and databases).
        *   The main **Visual Recipes**: Prepare, Join, Group, Stack, and Split.
        *   The most common processors in the **Prepare** recipe.
        *   The difference between **Scenarios** and **Dashboards**.
3.  **Take the Practice Exam:**
    *   The Dataiku Academy provides a practice exam. Take it under exam-like conditions.
    *   This will give you a feel for the format of the questions and highlight any areas where you are weak.
4.  **Study Your Weak Areas:**
    *   Based on your practice exam results, go back to the specific Academy courses that cover the topics you struggled with. Re-watch the videos and redo the tutorials for those sections.
5.  **Register and Take the Exam:**
    *   Once you are consistently scoring well on the practice exam and feel confident, you can register for the official certification exam.
    *   The exam is online and proctored. Find a quiet time and place to take it. Read each question carefully.

### 4. Resources and Tools
- **Dataiku Academy Core Designer Learning Path:** Your primary study material.
- **The Practice Exam:** The best tool for assessing your readiness.
- **Your own Sandbox Dataiku Instance:** For practicing the hands-on skills.

### 5. Next Steps and Progression
- **Share Your Credential:** Once you pass, you will receive a digital badge. Add it to your LinkedIn profile and resume.
- **Pursue Advanced Certifications:** After the Core Designer, you can move on to more advanced certifications like the "Advanced Designer," "Developer," or "ML Practitioner."

### 6. Common Challenges and Solutions
- **Challenge:** "I failed the exam."
- **Solution:** Don't be discouraged! Many people don't pass on the first try. The exam results will give you a breakdown of your score by topic. Use this feedback to focus your studying on your weakest areas. Go back to the Academy, practice more, and then retake the exam when you feel ready.
- **Challenge:** "The questions were tricky."
- **Solution:** The exam is designed to test a real understanding, not just memorization. The questions are often scenario-based ("A user wants to do X, which recipe should they use?"). This is why the hands-on practice is so important. You need to have actually *used* the tools to be able to answer these questions confidently.
`,
  },
  {
    id: 95,
    slug: 'experimenting-in-a-sandbox-dss-instance',
    question: 'How to get started with + experimenting in a sandbox DSS instance?',
    answer: `
### 1. Introduction/Overview
A sandbox is a safe, isolated environment where you can experiment, learn, and build without any risk of impacting production data or pipelines. Having access to a sandbox Dataiku instance is the single most effective way to learn the platform, try out new features, and hone your skills.

### 2. Prerequisites
- **Access to a sandbox instance:** This could be:
    - **Dataiku Online Free Edition:** A cloud instance provided by Dataiku, perfect for individuals.
    - **A local installation:** You can install a free edition on your own machine.
    - **A company-provided sandbox:** Many companies provide a non-production "sandbox" or "dev" instance for their employees.

### 3. Step-by-Step Instructions: Making the Most of Your Sandbox

1.  **Embrace the "Break It" Mentality:**
    *   The most important rule of a sandbox is that there are no consequences. Don't be afraid to try something you're unsure about. The worst that can happen is you delete the project and start over. This freedom is essential for learning.
2.  **Recreate Academy Tutorials:**
    *   Instead of just watching the Dataiku Academy videos, perform the hands-on tutorials in your own sandbox. This active learning is far more effective.
3.  **Take on a Personal Project:**
    *   Find a public dataset that interests you (from Kaggle, government websites, etc.).
    *   Create a new project and try to solve a problem end-to-end. For example: "Can I predict house prices from this dataset?" or "Can I build a dashboard showing global COVID-19 trends?"
4.  **Explore Every Button and Menu:**
    *   Be curious. When you're in a recipe, open up the processor library and just browse. What does the "GeoIP lookup" processor do? What are the different join types? Click on everything.
5.  **Test New Features:**
    *   When a new version of Dataiku is released, use your sandbox to try out the new features mentioned in the release notes. This is the best way to stay up-to-date.
6.  **Try to Replicate Production Issues:**
    *   If you encounter a strange bug or a performance bottleneck in a production project, try to recreate a simplified version of the problem in your sandbox. This allows you to debug and test solutions safely without touching the live pipeline.

### 4. Resources and Tools
- **Dataiku Online Free Edition:** The easiest way to get a personal sandbox.
- **Public Datasets (Kaggle, etc.):** Provide interesting data for your personal projects.
- **The "Duplicate Project" Feature:** If you create a useful template or starting point, you can easily duplicate it to start new experiments.

### 5. Next Steps and Progression
- **Build a Portfolio:** The personal projects you build in your sandbox can become a portfolio that showcases your skills to current or future employers.
- **Develop Reusable Components:** Use your sandbox to develop reusable components (like a standard cleaning flow or a custom Python library) that you can later export and use in your real work projects.

### 6. Common Challenges and Solutions
- **Challenge:** "My sandbox instance is slow or running out of memory."
- **Solution:** Free editions and small local instances have limited resources. Be mindful of the size of the data you are working with. Work with samples of large datasets. If a job crashes, it's a good learning experience in understanding the resource limitations of in-memory processing.
- **Challenge:** "I don't know what to build."
- **Solution:** Start with a question you are genuinely curious about. "I wonder what the most common words are in my favorite author's books?" or "Can I analyze the nutritional information of my favorite foods?" A personal interest is the best motivator for a learning project.
`,
  },
  {
    id: 96,
    slug: 'running-example-projects-tutorial-flows',
    question: 'How to get started with + running example projects/tutorial flows?',
    answer: `
### 1. Introduction/Overview
Dataiku DSS comes bundled with several pre-built example projects that showcase best practices and demonstrate how to solve common use cases like customer churn prediction. Running and deconstructing these projects is one of the best ways to learn how a professional, end-to-end data project is structured.

### 2. Prerequisites
- **Access to a Dataiku instance.**

### 3. Step-by-Step Instructions

1.  **Create a Project from a Sample:**
    *   From the Dataiku homepage, click **+ NEW PROJECT**.
    *   Choose **Sample projects / Tutorials**.
    *   You will see a list of available samples. A great one to start with is **Customer Churn Prediction**. Select it and click **CREATE**.
2.  **Explore the Project:**
    *   Dataiku will create a new project, complete with datasets, a well-organized Flow, a pre-trained machine learning model, and a dashboard.
3.  **Deconstruct the Flow:**
    *   Open the **Flow**. Notice how it is organized with clear **Flow Zones** (\`Data preparation\`, \`Feature Engineering\`, \`Modeling\`, etc.).
    *   Click on the recipes. Open them up to see how they are configured. For example, open the \`prepare_customers\` recipe to see the data cleaning steps that were applied.
4.  **Examine the Machine Learning Model:**
    *   Find the saved model in the Flow (the green diamond).
    *   Double-click it to open it. Explore the **Results** page to see its performance metrics, feature importances, and other details.
5.  **View the Dashboard:**
    *   Go to the **Dashboards** section and view the pre-built dashboard. See how the charts and metrics are used to present the project's results.
6.  **Run the Scenarios:**
    *   Go to the **Scenarios** page. The project has scenarios for tasks like retraining the model.
    *   Run the main scenario to see how it rebuilds the entire pipeline from start to finish.

### 4. Resources and Tools
- **The Sample Projects List:** Available from the "New Project" menu.
- **The Project Wiki:** The sample projects themselves are well-documented, with a Wiki that explains the business problem and the approach taken.

### 5. Next Steps and Progression
- **Modify the Project:** Since this is your own copy of the sample, don't be afraid to change it. Try adding a new transformation step to a Prepare recipe, or train a different type of model in the lab and see if you can beat the performance of the pre-trained one.
- **Rebuild it From Scratch:** For a real challenge, try to rebuild the entire sample project yourself from scratch in a new, blank project. This will test your understanding of every step.

### 6. Common Challenges and Solutions
- **Challenge:** "The sample project seems overwhelming."
- **Solution:** Don't try to understand everything at once. Go through it one piece at a time. Start with the Flow. Follow the data from the first input dataset to the first recipe. Understand that single step completely before moving to the next. The project is designed as a learning tool, so take your time.
- **Challenge:** "A scenario in the sample project fails to run."
- **Solution:** This can sometimes happen if the sample project has dependencies that are not perfectly aligned with your instance's version. Check the scenario log for errors. This itself is a good learning experience in troubleshooting. If you get stuck, you can ask for help on the Dataiku Community forums, mentioning the specific sample project you are using.
`,
  },
  {
    id: 97,
    slug: 'benchmarking-performance-on-sandbox-datasets',
    question: 'How to get started with + benchmarking performance on sandbox datasets?',
    answer: `
### 1. Introduction/Overview
Benchmarking is the process of comparing the performance of different methods for accomplishing the same task. In a Dataiku sandbox, you can run simple benchmarks to understand the performance implications of your design choices. This helps you build an intuition for what makes a pipeline fast or slow.

### 2. Prerequisites
- **A sandbox Dataiku instance.**
- **A moderately large dataset:** You need a dataset that is large enough for performance differences to be noticeable (e.g., at least a few hundred megabytes or a few million rows).
- **A specific transformation task to benchmark** (e.g., a join, a complex aggregation).

### 3. Step-by-Step Instructions: A Simple Benchmark

Let's benchmark the performance of an in-memory join vs. a database join.

1.  **Set Up the Data:**
    *   Upload your large dataset (\`dataset_A\`) to Dataiku.
    *   Create a second, smaller dataset (\`dataset_B\`).
    *   Use an **Export** recipe to write both of these datasets into tables in a SQL database that Dataiku is connected to. You now have two versions of your data: one as "file-based" datasets and one as "SQL" datasets.
2.  **Benchmark the In-Memory Join:**
    *   In your Flow, select the *file-based* version of \`dataset_A\`.
    *   Create a **Join** recipe and join it with the *file-based* \`dataset_B\`.
    *   In the recipe's **Advanced** settings, ensure the **Execution engine** is set to **In-Memory**.
    *   Run the recipe. Go to the **Jobs** menu and note the exact duration of this recipe.
3.  **Benchmark the Database Join (Push-down):**
    *   Go back to the Flow. Now, select the *SQL* version of \`dataset_A\`.
    *   Create a **Join** recipe and join it with the *SQL* \`dataset_B\`.
    *   In the recipe's **Advanced** settings, ensure the **Execution engine** is set to **Run on database (SQL)**.
    *   Run this recipe. Go to the **Jobs** menu and note its duration.
4.  **Compare the Results:**
    *   Compare the two durations. You will almost certainly find that the database join (push-down) was significantly faster than the in-memory join. This provides a concrete, hands-on understanding of the importance of push-down execution.

### 4. Resources and Tools
- **The Job Inspector:** The tool for getting the precise duration of a recipe run.
- **Execution Engine Setting:** The key variable you will change in your benchmarks.

### 5. Next Steps and Progression
- **Benchmark Other Operations:** You can use the same pattern to benchmark other things:
    - **File Formats:** Compare the read speed of a large CSV dataset vs. the same dataset saved as Parquet.
    - **Recipes:** Compare the performance of a **Group** recipe vs. accomplishing the same aggregation in a **Python** recipe with Pandas.
    - **Spark vs. In-Memory:** If you have Spark configured, compare the performance of a Spark recipe vs. an in-memory one.

### 6. Common Challenges and Solutions
- **Challenge:** "The performance difference isn't very big."
- **Solution:** Your test dataset is likely too small. For small data, the overhead of sending the job to a database or Spark can sometimes make it seem slower. Benchmarking is most meaningful on datasets that are large enough to represent a real-world processing challenge.
- **Challenge:** "How do I ensure a fair test?"
- **Solution:** For a more scientific benchmark, try to run each version of the recipe multiple times to account for any random fluctuations in server or database load. Also, be sure to clear the caches between runs if necessary.
`,
  },
  {
    id: 98,
    slug: 'running-pocs-combining-dataiku-and-ml-frameworks',
    question: 'How to get started with + running POCs combining Dataiku and ML frameworks?',
    answer: `
### 1. Introduction/Overview
A Proof of Concept (POC) is a small-scale project designed to test the feasibility of an idea. Running a POC to combine Dataiku with an external Machine Learning framework (like Hugging Face Transformers, spaCy, or Prophet) is a great way to explore new capabilities and demonstrate their value before committing to a full-scale project.

### 2. Prerequisites
- **A specific idea to test:** A clear, focused question, e.g., "Can we use a pre-trained model from Hugging Face to classify our support tickets?"
- **A sandbox Dataiku instance.**
- **A sample of your data.**
- **Knowledge of the external ML framework.**

### 3. Step-by-Step Instructions: Building a POC

1.  **Define a Narrow, Measurable Goal:**
    *   Don't try to boil the ocean. A good POC has a very tight scope.
    *   Bad POC goal: "Integrate AI."
    *   Good POC goal: "Use the \`spaCy\` library in a Python recipe to perform Named Entity Recognition on 100 sample news articles and output a dataset of the extracted entities."
2.  **Set Up the Environment:**
    *   In your sandbox project, create a new **Code Environment**.
    *   Add the necessary Python library for the ML framework you want to test (e.g., \`spacy\`, \`transformers\`, \`prophet\`).
    *   Download any required pre-trained models.
3.  **Implement in a Notebook First:**
    *   A **Jupyter Notebook** is the perfect place for a POC. It's interactive and great for experimentation.
    *   Create a new notebook using your new code environment.
    *   Write the code to:
        1.  Load your sample data from a Dataiku dataset.
        2.  Load the pre-trained model from the external framework.
        3.  Apply the model to your data.
        4.  Print or display the results.
4.  **Document the Results:**
    *   Your notebook itself is the primary deliverable of the POC.
    *   Use **Markdown cells** to clearly explain what you did, show the code, display the output, and write a summary of your findings.
    *   **Key finding:** Did it work? How well did it perform on your sample data? What were the challenges?
5.  **Present the POC:**
    *   Share your notebook with stakeholders. Walk them through the results.
    *   Based on the success of the POC, you can now make an informed decision about whether to proceed with a full project.

### 4. Resources and Tools
- **Jupyter Notebooks:** The ideal environment for rapid, iterative POC development.
- **Code Environments:** For managing the dependencies of the external ML frameworks.
- **Markdown Cells:** For documenting your process and results within the notebook.

### 5. Next Steps and Progression
- **"Productionize" the POC:** If the POC is successful, the next step is to turn the experimental notebook code into a robust, reusable **Python recipe** as part of a real data pipeline.
- **Benchmark Performance:** As part of the POC, you might want to do some simple performance tests to estimate how long it would take to run the process on your full dataset.

### 6. Common Challenges and Solutions
- **Challenge:** "Installing the external library is difficult."
- **Solution:** Some ML frameworks have complex dependencies. Carefully read their installation instructions. It may take some trial and error to get the code environment configured correctly. This is valuable learning in itself.
- **Challenge:** "The results of the POC are not very good."
- **Solution:** That's still a successful POC! The goal of a POC is to determine feasibility. Finding out that an idea *doesn't* work is a valuable result that saves you from investing in a full project that is doomed to fail. Document why it didn't work and move on to the next idea.
`,
  },
  {
    id: 99,
    slug: 'evaluating-dataiku-for-specific-business-cases',
    question: 'How to get started with + evaluating Dataiku for specific business cases?',
    answer: `
### 1. Introduction/Overview
When your organization is considering adopting a new platform like Dataiku, it's crucial to evaluate it against a real, specific business case. This process, often called a Proof of Value (POV) or a pilot project, goes beyond generic demos and tests the platform's ability to solve *your* actual problems with *your* actual data.

### 2. Prerequisites
- **A well-defined business case:** A real, high-value business problem that you want to solve (e.g., "Improve our sales forecast accuracy," "Automate our manual weekly reporting process").
- **Access to the relevant data:** You need a sample of the real data required for the business case.
- **A trial or sandbox Dataiku instance.**
- **A dedicated team:** A small, cross-functional team (including a business stakeholder and a technical user) dedicated to the evaluation.

### 3. Step-by-Step Instructions: Running an Evaluation

1.  **Define Success Criteria Upfront:**
    *   Before you start, agree with all stakeholders on what a successful evaluation would look like.
    *   These criteria should be specific and measurable.
    *   **Examples:**
        *   "The final pipeline must run in under 1 hour, compared to the 8 hours it takes manually."
        *   "The predictive model must achieve an accuracy of at least 85%."
        *   "The business analyst on the team must be able to build a new visualization on the final dashboard without technical help."
2.  **Build an End-to-End Solution:**
    *   Using your real data, build a complete, end-to-end pipeline in Dataiku to solve the business case.
    *   This should include data ingestion, preparation, analysis or modeling, and a final output (like a dashboard or an export).
    *   **Don't cut corners.** Try to build it as you would in a real production scenario.
3.  **Involve the Whole Team:**
    *   The evaluation should not be done just by a technical expert.
    *   Have the **business analyst** use the visual recipes.
    *   Have the **data scientist** use the ML features.
    *   Have the **business stakeholder** interact with the final dashboard.
    *   This tests the platform's suitability for all the different user personas involved.
4.  **Measure Against Success Criteria:**
    *   At the end of the evaluation period (e.g., 2-4 weeks), formally measure your results against the success criteria you defined in step 1.
    *   Did you achieve the performance goals? Was the model accurate enough? Was it easy for the business user to work with?
5.  **Present the Results:**
    *   Create a final presentation or report for the decision-makers.
    *   This should include a demo of the solution you built in Dataiku, the quantitative results based on your success criteria, and qualitative feedback from the evaluation team.

### 4. Resources and Tools
- **A Sandbox/Trial Instance:** Essential for performing the evaluation.
- **Your Own Data:** Using your real data is non-negotiable for a meaningful evaluation.
- **A Project Plan:** A simple plan with a timeline and defined success criteria.

### 5. Next Steps and Progression
- **Develop a Business Case:** The results of the successful evaluation become the core of your business case for purchasing or expanding the use of Dataiku. You now have concrete data on the value it can provide.
- **Productionize the Pilot:** The project you built for the evaluation can often become the first production pipeline once the platform is officially adopted.

### 6. Common Challenges and Solutions
- **Challenge:** "We can't get access to the real data for security reasons."
- **Solution:** This is a common hurdle. You will need to work with your security and data governance teams. Explain that the evaluation can be done in an isolated sandbox environment. If necessary, you may need to use an anonymized or sanitized version of the data, but it should still be representative of the real data's structure and complexity.
- **Challenge:** "The business case is too big to build in a short evaluation period."
- **Solution:** You have chosen too broad a scope. A good evaluation project should be small enough to be completed in a few weeks. Narrow the scope to a single, critical piece of the larger problem. The goal is to prove the *value* and *capability*, not to boil the ocean.
`,
  },
  {
    id: 100,
    slug: 'building-your-personal-dataiku-learning-portfolio',
    question: 'How to get started with + building your personal Dataiku learning portfolio?',
    answer: `
### 1. Introduction/Overview
A portfolio of projects is the most powerful way to showcase your skills to a current or potential employer. For a Dataiku developer, this means having a collection of well-built, well-documented projects that demonstrate your expertise across the platform. Building this portfolio is a continuous process of learning and creating.

### 2. Prerequisites
- **A personal sandbox Dataiku instance:** Dataiku Online Free Edition is perfect for this.
- **Curiosity and an interest in data.**

### 3. Step-by-Step Instructions: Building Your Portfolio

1.  **Find Interesting Public Datasets:**
    *   You need data to build projects. Look for datasets that genuinely interest you.
    *   **Great sources:**
        *   Kaggle Datasets
        *   Google Dataset Search
        *   Your national government's open data portal (e.g., data.gov in the US).
        *   Data Is Plural newsletter.
2.  **Create a Themed Project:**
    *   Choose a dataset and define a clear goal for a project.
    *   **Examples:**
        *   "Analyze NYC Airbnb data to find the factors that drive price." (A regression project).
        *   "Analyze movie data to predict a film's genre based on its plot summary." (An NLP classification project).
        *   "Build a dashboard to visualize global energy consumption trends." (A data visualization project).
3.  **Build a High-Quality, End-to-End Flow:**
    *   Don't just create a messy notebook. Build a clean, professional-looking project that demonstrates best practices.
    *   Use **Flow Zones** to organize your pipeline.
    *   Use **visual recipes** for data preparation.
    *   Add **Python or SQL recipes** if needed to show your coding skills.
    *   If it's a modeling project, use the **Visual ML Lab** and deploy a model.
    *   Create a final **Dashboard** to present your results.
4.  **Document Your Project Meticulously:**
    *   This is as important as the pipeline itself.
    *   Use the **Project Wiki** to write a detailed "ReadMe" explaining the project's goal, your approach, and your key findings.
    *   Add clear **descriptions** to every single dataset and recipe in your Flow.
    *   Your goal is for someone to be able to open the project and understand what you did and why without you having to be there to explain it.
5.  **Create a Portfolio of 3-5 Projects:**
    *   You don't need dozens of projects. A portfolio of 3-5 high-quality, diverse projects is far more impressive. Try to have projects that showcase different skills (e.g., one on data cleaning, one on machine learning, one on dashboarding).

### 4. Resources and Tools
- **Dataiku Online Free Edition:** Your personal portfolio-building studio.
- **Public Dataset Repositories:** Your source of raw materials.
- **GitHub (Optional):** You can link your Dataiku portfolio projects to a public GitHub repository to also showcase your Git skills.

### 5. Next Steps and Progression
- **Presenting Your Portfolio:**
    *   In a job interview, you can say, "I can actually show you an example." Share your screen and walk the interviewer through one of your portfolio projects. This is incredibly powerful.
    *   You can also take screenshots of your Flows and Dashboards to include in a personal website or an enhanced resume.
- **Keep it Updated:** As you learn new skills in Dataiku, create new projects that demonstrate them.

### 6. Common Challenges and Solutions
- **Challenge:** "I can't use my work projects in my portfolio due to company confidentiality."
- **Solution:** You are correct. You must **never** use confidential company data or projects in a personal portfolio. All portfolio projects must be built from scratch by you, using publicly available data. This is not a limitation; it's an opportunity to explore topics you are passionate about outside of work.
- **Challenge:** "My project is just a copy of a tutorial."
- **Solution:** A portfolio should showcase your own skills and thinking. While tutorials are great for learning, your portfolio projects should go a step further. Take the dataset from a tutorial, but then ask your *own* questions of it. Build a different kind of model. Create a new visualization. Add your own unique spin to make the project yours.
`,
  },
];

export const getQuestionBySlug = (slug: string): Question | undefined => {
  return questions.find(q => q.slug === slug);
}

export const getQuestionById = (id: number): Question | undefined => {
  return questions.find(q => q.id === id);
}
