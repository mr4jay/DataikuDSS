import type { Question } from './questions';

export const smeQuestions: Question[] = [
    {
    id: 126,
    slug: 'kubernetes-integration-for-recipes',
    question: 'How does Dataiku integrate with Kubernetes for running code recipes, and what are the benefits?',
    answer: `### 1. Introduction/Overview
Dataiku can be configured to execute Python, R, and other code recipes within dedicated containers on a Kubernetes cluster. This provides process isolation, resource management, and scalability, which are critical for production MLOps.

### 2. How it Works
1.  **Configuration:** The Dataiku administrator configures a Kubernetes cluster in **Administration > Containerized Execution**. This involves specifying the cluster's API endpoint and credentials.
2.  **Code Environment Mapping:** The administrator associates Dataiku code environments with specific Docker images. When a recipe using that environment runs, Dataiku knows which image to pull.
3.  **Execution Flow:**
    - A user runs a recipe.
    - Dataiku's backend sends a request to the Kubernetes API to create a new pod.
    - The pod pulls the correct Docker image (containing the required libraries).
    - The pod executes the recipe code, communicating with the Dataiku backend for data I/O.
    - Upon completion, the pod is terminated.

### 3. Key Benefits
- **Scalability:** The Kubernetes cluster can automatically scale by adding more nodes to handle a high volume of concurrent recipe executions.
- **Isolation:** Each recipe runs in its own isolated container, preventing dependency conflicts between different projects or users.
- **Resource Management:** You can define CPU and memory requests/limits for your containerized execution, ensuring that a heavy recipe doesn't consume all the resources of the Dataiku server itself.`,
  },
  {
    id: 127,
    slug: 'custom-model-plugin',
    question: 'How do I create a custom model component (plugin) to use a proprietary or unsupported algorithm in the Visual ML lab?',
    answer: `### 1. Introduction/Overview
You can extend Dataiku's Visual ML capabilities by developing a plugin that adds your own custom algorithm. This allows you to integrate proprietary models, experimental algorithms, or libraries not natively supported into the standard visual workflow.

### 2. Development Steps
1.  **Create a Plugin:** From the **... > Plugins** menu, create a new plugin with the **Visual ML component** feature enabled.
2.  **Define the Model Class:** In the plugin's Python code, you will create a class that inherits from one of Dataiku's base model classes (e.g., \`PredictionModel\`).
3.  **Implement Core Methods:** You must implement key methods:
    - \`__init__(self, **kwargs)\`: Initialize your model.
    - \`train(self, train_df, ...)\`: Write the code to train your model on the provided training data (a Pandas DataFrame).
    - \`predict(self, test_df, ...)\`: Write the code to make predictions on new data.
    - You must save your trained model artifact within the provided folder.
4.  **Define Parameters:** In the plugin's \`component.json\` file, define the hyperparameters for your model. These will appear in the Visual ML UI, allowing users to tune them.
5.  **Build and Test:** Once developed, you can use your custom algorithm alongside standard ones like scikit-learn models in any Visual ML analysis.`,
  },
  {
    id: 128,
    slug: 'spark-execution-engine',
    question: 'When should I use Spark as an execution engine in Dataiku, and how does it work?',
    answer: `### 1. Introduction/Overview
Dataiku can leverage an Apache Spark cluster (e.g., Databricks, EMR) as a distributed execution engine for certain visual recipes and code recipes. This is designed for processing extremely large datasets that do not fit in the memory of a single machine.

### 2. When to Use Spark
- **Massive Datasets:** When your data volume is in the hundreds of gigabytes or terabytes.
- **Supported Recipes:** When your data preparation consists of recipes that can be transparently compiled to Spark jobs. These include **Prepare**, **Join**, **Group**, **Window**, and **Sync**. A "Spark" icon will appear next to compatible recipes.

### 3. How it Works
1.  In the recipe's **Advanced** tab, you can select **Spark** as the execution engine.
2.  Dataiku translates the steps of your visual recipe into a Spark job (using Spark SQL or Scala).
3.  This job is then submitted to the configured Spark cluster.
4.  The data is processed in a distributed manner across the Spark workers, and the result is written back to the output dataset. For Python/R recipes, you can use PySpark/SparklyR to write Spark code directly.`,
  },
  {
    id: 129,
    slug: 'custom-presto-functions',
    question: 'How can I call a custom, in-database user-defined function (UDF) from within a Dataiku recipe?',
    answer: `### 1. Introduction/Overview
If your database (e.g., Snowflake, BigQuery, Presto) has custom UDFs, you can call them from Dataiku.

### 2. How to Use
- **SQL Recipe:** This is the most direct way. Simply write a SQL query in a SQL recipe that calls your UDF, just as you would in a native SQL client. For example: \`SELECT my_custom_udf(column_a) FROM input_dataset;\`.
- **Visual Recipe (Formula Processor):** For some database connections, you can use the Formula processor in a Prepare recipe. If the recipe is running in-database, you can often directly use the UDF in the formula expression: \`my_custom_udf(column_a)\`. Dataiku will pass this expression to the database as part of the generated query. The compatibility for this depends on the specific database and its JDBC driver.`,
  },
  {
    id: 130,
    slug: 'dataiku-api-for-automation',
    question: 'Beyond CI/CD, what are some advanced use cases for the Dataiku Python API for automation?',
    answer: `### 1. Introduction/Overview
The Dataiku Python API is a powerful tool for meta-automation—automating the management of Dataiku itself.

### 2. Advanced Use Cases
- **Programmatic Project Creation:** Write a script to create new projects from a predefined template. This is useful for onboarding new teams, where each team gets a standardized starter project.
- **Automated Health Checks:** Write a script that iterates through all projects on an instance, checks the health of all datasets (e.g., build status, schema drift), and generates a consolidated health report.
- **User and Group Management:** Automate the process of adding/removing users from groups or projects based on an external source of truth.
- **Dynamic Scenario Triggering:** Create a master script that decides which scenarios to run based on complex external conditions, providing more flexibility than standard triggers.
- **Exporting and Archiving:** Automate the process of regularly backing up or archiving old projects by creating and exporting bundles.`,
  },
  {
    id: 131,
    slug: 'gpu-for-deep-learning',
    question: 'How do I configure and use GPUs for training deep learning models in Dataiku?',
    answer: `### 1. Introduction/Overview
Using GPUs is essential for training deep learning models efficiently. This requires specific configuration by a Dataiku administrator.

### 2. Configuration Steps
1.  **Install Drivers:** The host machine where Dataiku is running must have the appropriate NVIDIA drivers and CUDA toolkit installed.
2.  **Create a GPU-enabled Code Environment:** The administrator creates a new code environment in Dataiku and, in its settings, specifies that it requires GPU access.
3.  **Install GPU Libraries:** The administrator adds the GPU-enabled versions of deep learning libraries to this environment (e.g., \`tensorflow-gpu\`).
4.  **Configure Containerized Execution (Recommended):** The best practice is to use containerized execution. The administrator defines a base Docker image that has the NVIDIA drivers and libraries, and configures the containerized execution settings to request GPU resources from Kubernetes.

### 3. Usage
- As a user, you simply select the designated "GPU-enabled" code environment for your Python notebook or recipe. When your code runs, Dataiku will ensure it executes on a machine or in a container with access to a GPU.`,
  },
  {
    id: 132,
    slug: 'partitioning-dispatching',
    question: 'What is partitioning dispatching, and when is it used?',
    answer: `### 1. Introduction/Overview
**Partitioning Dispatching** is an advanced feature that allows you to run a single recipe simultaneously on multiple partitions of a dataset. This is used for massively parallel processing.

### 2. Use Case
Imagine you have a dataset partitioned by \`customer_id\`, and you need to run a complex Python recipe (e.g., training a separate model for each customer). Instead of running the recipe sequentially for each customer, partitioning dispatching allows Dataiku to run them in parallel.

### 3. How it Works
- In the recipe's **Advanced** settings, you enable dispatching.
- When you build the output dataset, Dataiku creates a separate job for each partition of the input.
- If you have containerized execution set up on a large Kubernetes cluster, this can result in hundreds or thousands of recipe instances running concurrently, dramatically reducing the total processing time.`,
  },
  {
    id: 133,
    slug: 'custom-dataset-provider-plugin',
    question: 'How do I create a plugin to support a custom data source?',
    answer: `### 1. Introduction/Overview
If Dataiku doesn't have a built-in connector for your specific data source (e.g., a proprietary internal API or a rare database), you can develop a custom dataset provider plugin.

### 2. Development Steps
1.  **Create a Plugin:** Start a new plugin with the **Dataset Connector** feature.
2.  **Define Connection Parameters:** In \`connection.json\`, define the parameters needed to connect to your source (e.g., API endpoint, credentials).
3.  **Implement Connector Class:** In Python, create a class that inherits from \`dataiku.connector.Connector\`.
4.  **Implement Core Methods:**
    - \`list_tables()\`: (Optional) Code to list available "tables" or endpoints from your source.
    - \`generate_rows(dataset_config, ...)\`: This is the main method. You must write the Python code to connect to your source, fetch the data, and then \`yield\` each row as a dictionary.
5.  **Build and Deploy:** Once installed, users can select your custom connector from the dataset menu, enter the connection details, and read data from your source just like any other built-in connector.`,
  },
  {
    id: 134,
    slug: 'model-overrides-in-api-deployer',
    question: 'What are "model overrides" in the API Deployer, and what is their purpose?',
    answer: `### 1. Introduction/Overview
**Model Overrides** are a powerful governance feature in the API Deployer. They allow an administrator to enforce specific settings or constraints on a deployed model API, overriding the settings defined by the data scientist in the original project.

### 2. Common Use Cases
- **Security:** An admin can override the code environment used by the API service to force it to run in a more secure, locked-down environment than the one used for development.
- **Performance:** An admin can enforce specific memory and CPU limits for the API endpoint to ensure it doesn't consume excessive resources on the API node.
- **Compliance:** An admin can force the model to run with a specific set of checks or logging enabled, regardless of how it was configured in the Design node.

This separation of concerns allows data scientists to focus on model building while giving operations teams full control over the production runtime environment.`,
  },
  {
    id: 135,
    slug: 'custom-meaning-in-plugin',
    question: 'How do I define a custom "Meaning" with validation using a plugin?',
    answer: `### 1. Introduction/Overview
You can create your own semantic types (Meanings) to help Dataiku understand and validate your organization's specific data formats (e.g., a "ProductSKU" or "EmployeeID").

### 2. Development Steps
1.  **Create a Plugin:** Start a new plugin with the **Meaning** component.
2.  **Define the Meaning:** In the plugin's JSON configuration, you'll define the name and description of your meaning.
3.  **Implement the Guesser (Optional):** In Python, you can create a class that inherits from \`dataiku.meanings.MeaningGuesser\`. You'll write logic (e.g., using regular expressions) that analyzes a column's content to automatically detect if it matches your custom meaning.
4.  **Implement the Verifier:** Create a class that inherits from \`dataiku.meanings.MeaningVerifier\`. You'll write a \`verify_row(value)\` function that returns \`True\` if the value is a valid instance of your meaning and \`False\` otherwise.

Once installed, Dataiku will use your custom logic to automatically identify and validate columns according to your business rules.`,
  },
  {
    id: 201,
    slug: 'what-is-data-stewardship',
    question: 'What is data stewardship in Dataiku?',
    answer: `### 1. Introduction/Overview
Data stewardship involves managing an organization's data assets to ensure data quality, security, and accessibility. Dataiku provides tools that empower data stewards to perform their roles effectively.

### 2. Key Responsibilities
- **Data Curation:** Identifying and certifying "golden datasets" that serve as a single source of truth.
- **Metadata Management:** Enriching datasets with descriptions, tags, and business definitions in the Data Catalog.
- **Data Quality Monitoring:** Setting up metrics and checks to monitor data quality over time and taking action when issues arise.
- **Access Control:** Working with administrators to define and implement appropriate permissions for datasets and projects.`,
  },
  {
    id: 202,
    slug: 'how-to-implement-data-governance',
    question: 'How do I implement data governance in Dataiku?',
    answer: `### 1. Introduction/Overview
Data governance is the framework for managing data as a strategic asset. Dataiku helps implement this framework through various features.

### 2. Implementation Steps
1.  **Establish a Governance Team:** Form a team of data stewards, IT representatives, and business stakeholders.
2.  **Define Policies:** Create policies for data quality, security, and lifecycle management.
3.  **Use the Data Catalog:** Use the Data Catalog to create a central inventory of all data assets.
4.  **Implement Security:** Use Dataiku's role-based access controls to enforce security policies.
5.  **Monitor and Audit:** Use scenarios and dashboards to monitor data quality and the audit trail to track activities.`,
  },
  {
    id: 203,
    slug: 'what-are-data-contracts',
    question: 'What are data contracts and how can they be implemented in Dataiku?',
    answer: `### 1. Introduction/Overview
A data contract is an agreement between data producers and consumers about the schema, quality, and semantics of a dataset. It helps prevent data quality issues from propagating downstream.

### 2. Implementation in Dataiku
- **Schema Enforcement:** Use the "Check schema consistency" option in recipes to ensure the schema doesn't change unexpectedly.
- **Metrics and Checks:** Define metrics and checks on a dataset to enforce data quality rules (e.g., "column X must never be empty").
- **Documentation:** Use the dataset's wiki and column descriptions to document the meaning and expected format of each field.
- **Scenarios:** A scenario that builds a dataset can be configured to fail if any of these checks are violated, thus enforcing the contract.`,
  },
  {
    id: 204,
    slug: 'how-to-manage-data-privacy',
    question: 'How do I manage data privacy and PII in Dataiku?',
    answer: `### 1. Introduction/Overview
Managing Personally Identifiable Information (PII) is crucial for compliance with regulations like GDPR and CCPA.

### 2. Best Practices
- **Data Masking:** Use Prepare recipe processors to hash, encrypt, or anonymize PII columns.
- **Role-Based Access Control:** Restrict access to datasets containing PII to only authorized users.
- **Purpose-Based Access:** Create different versions of a dataset (e.g., a fully anonymized version for analysts and a pseudonymized version for data scientists) and control access to each.
- **Audit Trail:** Use the audit trail to monitor who is accessing sensitive data.`,
  },
  {
    id: 205,
    slug: 'what-is-data-lineage-and-why-is-it-important',
    question: 'What is data lineage and why is it important for governance?',
    answer: `### 1. Introduction/Overview
Data lineage provides a visual map of how data flows through the system, from its source to its final use. Dataiku's Flow is a powerful lineage tool.

### 2. Importance for Governance
- **Traceability:** It allows you to trace any data point back to its origin, which is essential for auditing and debugging.
- **Impact Analysis:** You can see all downstream dependencies of a dataset, so you can understand the impact of any changes before you make them.
- **Trust:** A clear lineage builds trust in the data by making the transformation process transparent.`,
  },
  {
    id: 206,
    slug: 'how-to-create-a-data-catalog',
    question: 'How do I create and use a data catalog in Dataiku?',
    answer: `### 1. Introduction/Overview
The Data Catalog in Dataiku is a central, searchable inventory of your data assets.

### 2. Steps to Use
1.  **Access the Catalog:** The Data Catalog is available from the main navigation menu.
2.  **Search and Discover:** Users can search for datasets by name, tag, column name, or description.
3.  **Enrich Metadata:** Data stewards can add tags (e.g., "certified", "PII"), descriptions, and business context to datasets.
4.  **View Usage:** The catalog shows how popular a dataset is and which projects are using it.`,
  },
  {
    id: 207,
    slug: 'what-are-the-roles-in-data-governance',
    question: 'What are the different roles in a data governance framework?',
    answer: `### 1. Introduction/Overview
A successful data governance program involves several key roles.

### 2. Key Roles
- **Data Owner:** A senior stakeholder who is ultimately responsible for the data in a specific domain (e.g., the VP of Sales is the owner of sales data).
- **Data Steward:** A subject matter expert responsible for the day-to-day management of data, including defining and enforcing data quality rules.
- **Data Custodian:** An IT role responsible for the technical environment where the data is stored and managed.
- **Data User:** Anyone in the organization who uses data to perform their job.`,
  },
  {
    id: 208,
    slug: 'how-to-handle-data-retention-policies',
    question: 'How do I implement data retention policies in Dataiku?',
    answer: `### 1. Introduction/Overview
Data retention policies dictate how long data should be kept before it is archived or deleted.

### 2. Implementation in Dataiku
- **Use Partitioning:** For time-series data, use partitioning (e.g., one partition per day).
- **Automated Scenarios:** Create a scenario that runs periodically.
- **Python Recipe:** The scenario can contain a Python recipe that uses the Dataiku API to list all partitions of a dataset and delete any that are older than the retention period.`,
  },
  {
    id: 209,
    slug: 'what-is-master-data-management-mdm',
    question: 'What is Master Data Management (MDM) and how does Dataiku relate to it?',
    answer: `### 1. Introduction/Overview
MDM is the process of creating a single, authoritative "master" record for key business entities like customers, products, and suppliers.

### 2. Dataiku's Role in MDM
While Dataiku is not a dedicated MDM tool, it is often used to build the pipelines that feed into an MDM system. You can use Dataiku to:
- Ingest data from various source systems.
- Cleanse, standardize, and de-duplicate the data.
- Apply matching logic to identify records that refer to the same entity.
- Create a "golden record" dataset that can then be loaded into a specialized MDM tool.`,
  },
  {
    id: 210,
    slug: 'how-to-ensure-model-fairness-and-bias',
    question: 'How do I ensure model fairness and mitigate bias?',
    answer: `### 1. Introduction/Overview
Model fairness is about ensuring that a model's predictions are not discriminatory towards certain protected groups.

### 2. Steps in Dataiku
1.  **Subpopulation Analysis:** In the Visual ML lab, you can analyze a model's performance on different subgroups of your data (e.g., by gender, race) to identify performance disparities.
2.  **Fairness Metrics:** You can implement fairness metrics like "demographic parity" or "equalized odds" in a Python recipe to quantify bias.
3.  **Bias Mitigation Techniques:** If bias is found, you can try techniques like re-weighting the data, or using different training algorithms.
4.  **Documentation:** Document your fairness analysis as part of the model's documentation for transparency.`,
  },
    {
    id: 211,
    slug: 'optimizing-sql-performance',
    question: 'How can I optimize the performance of my SQL recipes?',
    answer: `### 1. Introduction/Overview
Optimizing SQL is crucial for performant pipelines.

### 2. Key Strategies
- **Pushdown Processing:** Ensure your recipes are running in-database to leverage the database's optimization engine.
- **Use Indexes:** Work with your DBA to ensure that the tables you are querying have appropriate indexes on the columns used in joins and where clauses.
- **Minimize Data Transfer:** Filter and aggregate data as early as possible in your Flow to reduce the amount of data being passed between recipes.
- **Analyze Query Plans:** Use your database's built-in tools (like \`EXPLAIN\`) to analyze the query plan and identify bottlenecks.`,
  },
  {
    id: 212,
    slug: 'when-to-use-in-memory-vs-in-database',
    question: 'When should I use in-memory vs. in-database processing?',
    answer: `### 1. Introduction/Overview
Choosing the right processing engine is key for performance.

### 2. Guidelines
- **In-Database:** Use for SQL-based transformations on large datasets that reside in a database. This is generally the most performant option.
- **In-Memory (Python/R):** Use when your data fits into the memory of the Dataiku server and you need to perform complex, non-SQL operations (e.g., using a specific Python library). For best performance, pre-filter and aggregate the data in-database first.`,
  },
  {
    id: 213,
    slug: 'how-to-use-spark-effectively',
    question: 'What are the best practices for using Spark in Dataiku?',
    answer: `### 1. Introduction/Overview
Spark is a powerful engine for distributed computing on very large datasets.

### 2. Best Practices
- **Use Spark-Compatible Recipes:** Stick to visual recipes that can be translated to Spark (Prepare, Join, Group, etc.).
- **Choose the Right Data Format:** Use a columnar format like Parquet for your Spark datasets, as it is much more performant than CSV.
- **Tune Spark Configuration:** Work with your administrator to tune the Spark configuration (e.g., number of executors, memory allocation) for your specific workload.
- **Avoid UDFs in Hot Paths:** User-defined functions in Spark can be a performance bottleneck. Use built-in Spark functions whenever possible.`,
  },
  {
    id: 214,
    slug: 'how-to-optimize-python-recipe-memory-usage',
    question: 'How do I optimize memory usage in a Python recipe?',
    answer: `### 1. Introduction/Overview
Running out of memory is a common issue when processing large datasets in Python.

### 2. Optimization Tips
- **Load only necessary columns:** When reading a dataset, specify only the columns you need: \`df = dataset.get_dataframe(columns=['col_a', 'col_b'])\`.
- **Use appropriate dtypes:** Use the smallest possible data types for your columns (e.g., use \`int32\` instead of \`int64\` if your numbers fit).
- **Process in chunks:** Read the dataset in chunks instead of all at once and process each chunk in a loop.
- **Delete unused variables:** Use \`del variable_name\` to free up memory from objects you no longer need.`,
  },
  {
    id: 215,
    slug: 'how-does-partitioning-improve-performance',
    question: 'How does partitioning improve performance?',
    answer: `### 1. Introduction/Overview
Partitioning splits a dataset into smaller, more manageable chunks.

### 2. Performance Benefits
- **Incremental Builds:** When you rebuild a partitioned dataset, you can choose to only rebuild the new or changed partitions, which is much faster than a full rebuild.
- **Query Pruning:** When you query a partitioned dataset and filter on the partition key (e.g., \`WHERE date = '2023-01-01'\`), the database/engine only needs to read the data for that specific partition, dramatically speeding up the query.`,
  },
  {
    id: 216,
    slug: 'what-are-the-trade-offs-of-different-file-formats',
    question: 'What are the trade-offs between CSV, Parquet, and Avro file formats?',
    answer: `### 1. Introduction/Overview
The file format you choose can have a big impact on performance and storage.

### 2. Comparison
- **CSV:** Human-readable and universal, but slow to parse and not compressed. Good for small, simple datasets.
- **Parquet:** A columnar format. It's highly compressed and extremely fast to query, especially when you only need a subset of columns. The standard for big data analytics.
- **Avro:** A row-based format that has excellent support for schema evolution. Good for streaming data and when the schema changes frequently.`,
  },
  {
    id: 217,
    slug: 'how-to-optimize-join-performance',
    question: 'How do I optimize the performance of a Join recipe?',
    answer: `### 1. Introduction/Overview
Joins can be one of the most expensive operations in a data pipeline.

### 2. Optimization Strategies
- **Run in-database:** If your datasets are in a database, always run the join there.
- **Filter before joining:** Reduce the size of the datasets before you join them.
- **Check join keys:** Ensure the join keys are of the same data type and that they are indexed in the source database.
- **Broadcast join:** If one of the datasets is small, Spark can use a "broadcast join" which is very efficient. You may need to configure this with your administrator.`,
  },
  {
    id: 218,
    slug: 'how-to-use-caching-in-dataiku',
    question: 'Does Dataiku have a caching mechanism?',
    answer: `### 1. Introduction/Overview
Dataiku doesn't have an explicit "cache" button, but the Flow itself acts as a cache.

### 2. How it Works
- When you build a dataset in the Flow, the result is persisted to its storage location (e.g., a database table).
- When you later run a downstream recipe, Dataiku reads from this persisted dataset. It does not recompute the upstream recipes unless you explicitly ask it to.
- This means that your intermediate datasets in the Flow are effectively a cache of the computation up to that point.`,
  },
  {
    id: 219,
    slug: 'what-is-predicate-pushdown',
    question: 'What is predicate pushdown?',
    answer: `### 1. Introduction/Overview
Predicate pushdown is a performance optimization where data filtering operations (\`predicates\`, i.e., \`WHERE\` clauses) are moved as close to the data source as possible.

### 2. Example
Imagine you are reading a Parquet file from S3 and have a filter in your recipe. Instead of reading the entire file into memory and then filtering, predicate pushdown allows the engine to use the Parquet metadata to only read the specific data blocks that match your filter, significantly reducing the amount of data that needs to be read from S3.`,
  },
  {
    id: 220,
    slug: 'how-to-monitor-resource-usage',
    question: 'How can I monitor the resource usage (CPU, memory) of my jobs?',
    answer: `### 1. Introduction/Overview
Monitoring resource usage helps identify performance bottlenecks.

### 2. Monitoring Tools
- **Job Logs:** The log for each job contains information about its duration and the resources it consumed.
- **Administration Monitoring:** Dataiku administrators have access to detailed monitoring dashboards that show the CPU and memory usage of the entire instance over time.
- **Containerized Execution:** If you are using containers, you can use Kubernetes monitoring tools (like Prometheus and Grafana) to get very detailed metrics on the resource usage of each individual job.`,
  },
    {
    id: 221,
    slug: 'how-to-integrate-with-a-ci-cd-pipeline',
    question: 'How do I integrate Dataiku with a CI/CD pipeline (e.g., Jenkins, GitLab CI)?',
    answer: `### 1. Introduction/Overview
Integrating Dataiku with a CI/CD pipeline automates the process of moving projects from development to production.

### 2. Typical Workflow
1.  **Git Integration:** Your Dataiku project is linked to a Git repository.
2.  **Trigger:** A commit to the main branch triggers a job in your CI/CD tool.
3.  **Create Bundle:** The job uses the Dataiku API to create a project bundle.
4.  **Deploy and Test:** The bundle is deployed to a test instance, and automated tests are run.
5.  **Deploy to Production:** If tests pass, the bundle is deployed to the production automation node.`,
  },
  {
    id: 222,
    slug: 'what-are-project-bundles',
    question: 'What are project bundles and what do they contain?',
    answer: `### 1. Introduction/Overview
A project bundle is a \`.zip\` file that contains a snapshot of your project's design. It's the standard way to move projects between Dataiku instances.

### 2. Contents
- **Included:** The Flow, recipes, models, scenarios, project settings.
- **Not Included:** The actual data within your datasets. The bundle only contains the metadata and connection information. You must ensure the data connections exist on the target instance.`,
  },
  {
    id: 223,
    slug: 'how-to-manage-different-environments',
    question: 'How do I manage different environments (dev, test, prod) in Dataiku?',
    answer: `### 1. Introduction/Overview
A standard MLOps practice is to have separate Dataiku instances for each environment.

### 2. Architecture
- **Dev Instance:** Where data scientists build projects.
- **Test/QA Instance:** A non-interactive instance where project bundles are deployed for automated testing.
- **Prod Instance:** A non-interactive automation node for running scheduled production jobs, and a separate API node for real-time model serving.
This separation ensures that development work doesn't impact production workflows.`,
  },
  {
    id: 224,
    slug: 'how-to-automate-model-retraining',
    question: 'How do I automate model retraining?',
    answer: `### 1. Introduction/Overview
Automated retraining is crucial to prevent model drift.

### 2. Steps
1.  Create a scenario.
2.  Add a "Build / Train" step and select your deployed model (the green diamond in the Flow).
3.  Add steps to evaluate the new model and deploy it only if its performance is better than the current production model.
4.  Set the scenario to run on a schedule (e.g., weekly).`,
  },
  {
    id: 225,
    slug: 'what-is-model-drift-and-how-to-monitor-it',
    question: 'What is model drift and how do I monitor it?',
    answer: `### 1. Introduction/Overview
Model drift is the degradation of a model's performance over time as the real-world data changes.

### 2. Monitoring in Dataiku
- **Data Drift:** Use a scenario to regularly compute metrics on your scoring data and compare their distribution to the training data. Dataiku provides built-in tools for this.
- **Performance Drift:** If you have the actual outcomes for your predictions, use a Model Evaluation recipe in a scenario to track the model's accuracy, AUC, etc., over time.
- **Create a Dashboard:** Visualize these drift and performance metrics on a dashboard to easily monitor model health.`,
  },
  {
    id: 226,
    slug: 'what-are-the-best-practices-for-code-environments',
    question: 'What are the best practices for managing code environments in production?',
    answer: `### 1. Introduction/Overview
Proper code environment management is crucial for reproducibility.

### 2. Best Practices
- **Project-specific environments:** Don't use the global default.
- **Pin versions:** Pin the exact version of every package (e.g., \`pandas==1.3.5\`).
- **Export and version:** Export the environment definition and store it in your project's Git repository.
- **Minimalism:** Only include the packages your project actually needs.`,
  },
  {
    id: 227,
    slug: 'how-to-use-the-dataiku-api-for-mlops',
    question: 'How can I use the Dataiku API for MLOps?',
    answer: `### 1. Introduction/Overview
The Dataiku Python API allows you to script almost any MLOps task.

### 2. Use Cases
- **Triggering scenario runs** from an external scheduler.
- **Creating and deploying project bundles.**
- **Updating API services** on the API Deployer.
- **Running automated health checks** on datasets and models across projects.`,
  },
  {
    id: 228,
    slug: 'what-is-a-model-registry-in-dataiku',
    question: 'Does Dataiku have a model registry?',
    answer: `### 1. Introduction/Overview
Yes, the combination of Saved Models in a project and the API Deployer acts as a model registry.

### 2. Features
- **Central Inventory:** All deployed models are versioned and documented.
- **Versioning:** Every time you retrain a model, it creates a new version with its own metadata and performance metrics.
- **Lifecycle Management:** The API Deployer manages the lifecycle of model versions, controlling which one is active.`,
  },
  {
    id: 229,
    slug: 'how-to-perform-a-b-testing-for-models',
    question: 'How can I perform A/B testing for models?',
    answer: `### 1. Introduction/Overview
You can A/B test models by deploying two different model versions to the API Deployer and using an external router to split traffic between them.

### 2. Steps
1.  Deploy both models (A and B) to the API Deployer.
2.  Use a load balancer or API gateway in front of the Dataiku API node to send a portion of the traffic to model A and the rest to model B.
3.  Log the predictions and outcomes for both models and compare their performance on live data.`,
  },
  {
    id: 230,
    slug: 'how-to-manage-secrets-and-credentials-securely',
    question: 'How should I manage secrets and credentials securely?',
    answer: `### 1. Introduction/Overview
Hardcoding secrets is a major security risk.

### 2. Best Practices
- **Connection-level credentials:** Store database passwords in the connection settings, which are managed by administrators.
- **Project variables with permissions:** You can store secrets in "hidden" project variables that can be used by recipes but not viewed by users.
- **External secret stores (Most Secure):** Integrate Dataiku with a tool like HashiCorp Vault or AWS Secrets Manager to fetch secrets at runtime.`,
  },
    {
    id: 231,
    slug: 'how-to-integrate-dataiku-with-external-tools',
    question: 'How do I integrate Dataiku with external tools like Tableau or Power BI?',
    answer: `### 1. Introduction/Overview
Dataiku can be integrated with many external tools.

### 2. Common Integration Patterns
- **Database Connection:** The most common method. Dataiku writes its output to a database table, and the external tool (like Tableau) connects to that table.
- **Export/Import:** Export data from Dataiku as a file (e.g., CSV) and import it into the other tool.
- **API:** Use Dataiku's API to expose data as an endpoint that other tools can call.`,
  },
  {
    id: 232,
    slug: 'what-are-plugins-and-how-to-use-them',
    question: 'What are plugins and how do I use them?',
    answer: `### 1. Introduction/Overview
Plugins are add-ons that extend Dataiku's core functionality. They can add new connectors, recipes, processors, and more.

### 2. How to Use
1.  Go to the **Plugins** menu from the main navigation bar.
2.  Browse the Plugin Store for plugins created by Dataiku or the community.
3.  Click **Install**. The new components will then be available in your projects.`,
  },
  {
    id: 233,
    slug: 'how-to-create-a-custom-plugin',
    question: 'How do I create my own custom plugin?',
    answer: `### 1. Introduction/Overview
You can develop your own plugins to add custom functionality.

### 2. Steps
1.  Go to the **Plugins** menu and click **+ New Plugin**.
2.  Select the components you want to create (e.g., a custom recipe, a custom dataset connector).
3.  Dataiku will generate the boilerplate files (\`recipe.json\`, \`recipe.py\`, etc.).
4.  Write the Python code to implement your custom logic.
5.  Develop and test the plugin in a development environment before deploying it for wider use.`,
  },
  {
    id: 234,
    slug: 'how-to-connect-to-a-rest-api',
    question: 'How do I get data from a REST API?',
    answer: `### 1. Introduction/Overview
You can connect to a REST API using a Python recipe.

### 2. Steps
1.  Create a Python recipe.
2.  Use a library like \`requests\` to make the API call.
3.  Parse the JSON response from the API.
4.  Convert the JSON data into a Pandas DataFrame.
5.  Write the DataFrame to an output dataset.
There are also plugins in the store that provide visual recipes for connecting to common APIs.`,
  },
  {
    id: 235,
    slug: 'what-are-webapps-in-dataiku',
    question: 'What are webapps in Dataiku?',
    answer: `### 1. Introduction/Overview
Webapps allow you to create interactive user interfaces within Dataiku.

### 2. How to Use
- You can create webapps using technologies like Python (Dash, Streamlit) or R (Shiny).
- These webapps can be used to create interactive dashboards, "what-if" analysis tools for your models, or custom data visualization interfaces.
- Once created, they can be published and shared with business users.`,
  },
  {
    id: 236,
    slug: 'how-to-integrate-with-a-source-code-repository-like-github',
    question: 'How do I integrate a project with a source code repository like GitHub?',
    answer: `### 1. Introduction/Overview
Integrating with Git is crucial for version control and collaboration.

### 2. Steps
1.  An administrator configures the connection to your Git provider (GitHub, GitLab, etc.) in the global settings.
2.  In your project's settings, you can link the project to a remote Git repository.
3.  Once linked, you will see a Git menu in your project where you can commit your changes, pull updates from others, and view the project's history.`,
  },
  {
    id: 237,
    slug: 'what-is-the-dataiku-api-node',
    question: 'What is the Dataiku API node?',
    answer: `### 1. Introduction/Overview
The API node is a dedicated, non-interactive instance of Dataiku that is optimized for hosting real-time prediction models as API services.

### 2. Purpose
- **High Availability:** It's designed for high-availability and low-latency serving.
- **Isolation:** It's separate from the design and automation nodes, so that model serving performance is not impacted by development work or batch jobs.`,
  },
  {
    id: 238,
    slug: 'how-to-use-dataiku-in-a-multi-cloud-environment',
    question: 'How can I use Dataiku in a multi-cloud environment?',
    answer: `### 1. Introduction/Overview
Dataiku is cloud-agnostic and can be deployed on any major cloud provider (AWS, Azure, GCP) or on-premise.

### 2. Multi-cloud Strategy
- You can have Dataiku running in one cloud (e.g., AWS) but have it connect to data sources in another cloud (e.g., BigQuery in GCP).
- Dataiku's containerized execution can be configured to run jobs on Kubernetes clusters in different cloud environments.
- This allows you to build a unified data science platform that spans multiple clouds.`,
  },
  {
    id: 239,
    slug: 'what-is-the-difference-between-a-managed-and-unmanaged-dataset',
    question: 'What is the difference between a managed and unmanaged dataset?',
    answer: `### 1. Introduction/Overview
This refers to how the dataset's schema and lifecycle are managed.

### 2. Differences
- **Managed Dataset:** The output of a Dataiku recipe. Dataiku manages its schema and knows how to rebuild it. Most datasets in a Flow are managed.
- **Unmanaged Dataset:** A dataset that points to an existing table or file that is created and updated by an external process. Dataiku can read from it but doesn't know how to create or update it.`,
  },
  {
    id: 240,
    slug: 'how-to-handle-schema-changes-over-time',
    question: 'How do I handle schema changes over time?',
    answer: `### 1. Introduction/Overview
Schema drift (when the structure of your input data changes) can break your pipelines.

### 2. Handling Schema Drift
- **Schema Validation:** In your recipes, you can enable "Check schema consistency." This will cause a job to fail if the input schema has changed unexpectedly.
- **Alerting:** You can set up a scenario to send an alert when a schema check fails.
- **Flexible Code:** When writing code recipes, write them to be robust to schema changes (e.g., don't assume a column will always be present).`,
  },
    {
    id: 241,
    slug: 'how-to-set-up-a-high-availability-ha-architecture-for-dataiku',
    question: 'How do you set up a high-availability (HA) architecture for Dataiku?',
    answer: `### 1. Introduction/Overview
An HA setup ensures that Dataiku remains available in case of a server failure.

### 2. Key Components
- **Multiple Backend Nodes:** Run multiple Dataiku backend nodes behind a load balancer.
- **Shared Data Directory:** All nodes must point to the same shared Data Directory on a resilient network storage system (like NFS).
- **External Database:** Use a production-grade external database (like PostgreSQL) for Dataiku's configuration store.
- **Redundant Components:** Ensure that all components of the architecture (load balancers, databases, storage) are themselves redundant.`,
  },
  {
    id: 242,
    slug: 'what-are-the-different-dataiku-deployment-options',
    question: 'What are the different deployment options for Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku is flexible and can be deployed in various ways.

### 2. Deployment Options
- **On-Premise:** Install Dataiku on your own servers.
- **Cloud (IaaS):** Deploy Dataiku on virtual machines in any cloud provider (AWS, Azure, GCP).
- **Kubernetes:** Deploy Dataiku on a Kubernetes cluster for scalability and high availability.
- **Dataiku Cloud:** A fully managed SaaS offering from Dataiku.`,
  },
  {
    id: 243,
    slug: 'how-to-manage-compute-resources-for-multiple-users',
    question: 'How do I manage compute resources for multiple users?',
    answer: `### 1. Introduction/Overview
Resource management is key to ensuring a good experience for all users on a shared instance.

### 2. Strategies
- **Containerized Execution:** Use Kubernetes to run each user's job in an isolated container with its own resource quotas. This is the most effective method.
- **User Quotas:** You can set limits on the number of concurrent jobs a user can run.
- **Prioritization:** Use job queues to prioritize critical production jobs over interactive development work.`,
  },
  {
    id: 244,
    slug: 'what-are-the-security-best-practices-for-a-dataiku-instance',
    question: 'What are the security best practices for a Dataiku instance?',
    answer: `### 1. Introduction/Overview
Securing your Dataiku instance is critical.

### 2. Best Practices
- **Integrate with Corporate Directory:** Use LDAP or Active Directory for user authentication.
- **Use Role-Based Access Control:** Define groups with specific permissions and assign users to them.
- **Secure Connections:** Use external secret stores to manage database credentials.
- **Network Security:** Use firewalls to restrict access to the Dataiku server.
- **Regularly Update:** Keep your Dataiku instance and its underlying infrastructure patched and up-to-date.`,
  },
  {
    id: 245,
    slug: 'how-to-upgrade-a-dataiku-instance',
    question: 'What is the process for upgrading a Dataiku instance?',
    answer: `### 1. Introduction/Overview
Upgrading to a new version of Dataiku requires careful planning.

### 2. Process
1.  **Read the Release Notes:** Understand what has changed in the new version.
2.  **Back up:** Take a full backup of your Dataiku Data Directory.
3.  **Upgrade a Test Instance First:** Always upgrade a non-production instance first to test for any issues.
4.  **Run the Installer:** Run the installer for the new version and point it to your existing Data Directory. The installer will handle the migration of configurations.
5.  **Test:** Thoroughly test the upgraded instance before upgrading your production environment.`,
  },
  {
    id: 246,
    slug: 'how-does-dataiku-handle-multi-tenancy',
    question: 'How does Dataiku handle multi-tenancy?',
    answer: `### 1. Introduction/Overview
Multi-tenancy refers to serving multiple teams or business units from a single Dataiku instance.

### 2. Multi-tenancy in Dataiku
- **Project-level Isolation:** Projects are isolated from each other. Users only see the projects they have been given access to.
- **Permissions:** You can use groups and permissions to ensure that one team cannot access another team's data or projects.
- **Resource Management:** Use containerization and resource quotas to ensure that one team's heavy workload doesn't impact other teams.`,
  },
  {
    id: 247,
    slug: 'what-is-the-dataiku-command-line-interface-cli',
    question: 'What is the Dataiku Command Line Interface (CLI)?',
    answer: `### 1. Introduction/Overview
The Dataiku CLI is a tool that allows you to perform administrative and project-related tasks from the command line.

### 2. Use Cases
- **Scripting:** Automate tasks like creating users, managing groups, and configuring settings.
- **CI/CD Integration:** The CLI is often used in CI/CD scripts to interact with Dataiku instances.
- **Advanced Administration:** Perform tasks that are not available in the UI.`,
  },
  {
    id: 248,
    slug: 'how-to-monitor-a-dataiku-instance',
    question: 'How do I monitor the health and performance of a Dataiku instance?',
    answer: `### 1. Introduction/Overview
Monitoring is essential for maintaining a healthy and performant instance.

### 2. Monitoring Tools
- **Administration Dashboards:** Dataiku provides built-in dashboards for monitoring job statuses, resource usage, and system health.
- **Logs:** Dataiku produces detailed logs that can be ingested into a central logging system (like Splunk or Elasticsearch).
- **JMX Metrics:** Dataiku exposes detailed performance metrics via JMX, which can be scraped by monitoring tools like Prometheus.`,
  },
  {
    id: 249,
    slug: 'what-are-the-hardware-requirements-for-dataiku',
    question: 'What are the hardware requirements for Dataiku?',
    answer: `### 1. Introduction/Overview
Hardware requirements depend heavily on the size of your data and the number of concurrent users.

### 2. General Guidelines
- **Memory:** This is often the most critical resource. A typical production server might have 128 GB of RAM or more.
- **CPU:** A modern multi-core processor is recommended. 16 cores is a good starting point.
- **Disk:** Use fast storage (like SSDs) for the Dataiku Data Directory. The amount of disk space depends on how much data you will be storing on the filesystem.
- **Consult the Documentation:** Dataiku provides detailed sizing guidelines in its official documentation.`,
  },
  {
    id: 250,
    slug: 'how-to-get-support-from-dataiku',
    question: 'How do I get support from Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku offers several channels for support.

### 2. Support Channels
- **Official Support Portal:** For enterprise customers, this is the primary channel for filing support tickets.
- **Dataiku Community:** A public forum where you can ask questions and get help from other users and Dataiku staff.
- **Documentation:** Dataiku has extensive online documentation that covers all of its features.
- **Dataiku Academy:** Free online courses for learning Dataiku.`,
  }
];
