import type { Question } from './questions';

export const advancedTopicsQuestions: Question[] = [
  {
    id: 136,
    slug: 'optimizing-sql-runner',
    question: 'What are some strategies for optimizing the performance of the SQL runner in Dataiku?',
    answer: `### 1. Introduction/Overview
The SQL runner in Dataiku is a powerful tool, but its performance can be optimized.

### 2. Strategies
- **Limit results**: Use the \`LIMIT\` clause to avoid fetching large result sets.
- **Use indexes**: Ensure that the underlying database tables have appropriate indexes.
- **Connection pooling**: Configure connection pooling in the database connection settings.
- **Analyze query plan**: Use the database's query analysis tools to understand and optimize the query execution plan.`,
  },
  {
    id: 137,
    slug: 'custom-charts-with-d3',
    question: 'How can I create custom charts using D3.js in Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku allows creating custom charts using D3.js for advanced visualizations.

### 2. Steps
1.  Create a new webapp in your project.
2.  Choose the D3.js template.
3.  Write your D3.js code to fetch data from a dataset and render the chart.
4.  Use the Dataiku JavaScript API to interact with datasets.`,
  },
  {
    id: 138,
    slug: 'managing-project-lineage',
    question: 'What are the best practices for managing project lineage in a large organization?',
    answer: `### 1. Introduction/Overview
Managing project lineage is crucial for traceability and impact analysis.

### 2. Best Practices
- **Use Flow Zones**: Group related items in the Flow into zones.
- **Clear Naming Conventions**: Use consistent and descriptive names for datasets and recipes.
- **Documentation**: Document the purpose of each project and key datasets in the wiki.
- **Cross-project Dependencies**: Use shared datasets to manage dependencies between projects explicitly.`,
  },
  {
    id: 139,
    slug: 'dataiku-api-for-metadata',
    question: 'How can I use the Dataiku API to extract metadata from a project?',
    answer: `### 1. Introduction/Overview
The Dataiku Python API allows you to programmatically access project metadata.

### 2. Example
\`\`\`python
import dataiku

client = dataiku.api_client()
project = client.get_project("MY_PROJECT_KEY")
datasets = project.list_datasets()

for dataset in datasets:
    print(f"Dataset: {dataset['name']}")
    d = project.get_dataset(dataset['name'])
    schema = d.get_schema()
    print("Schema:", schema)
\`\`\``,
  },
  {
    id: 140,
    slug: 'real-time-scoring-api',
    question: 'How do I set up a real-time scoring API for a model?',
    answer: `### 1. Introduction/Overview
The API Deployer in Dataiku is used to deploy models as real-time scoring APIs.

### 2. Steps
1.  Deploy your model from the Lab to the Flow.
2.  Publish the model to the API Designer.
3.  Create a new API service and endpoint.
4.  Deploy the API service to the API Deployer infrastructure.
5.  The API will be available at a specific URL for real-time predictions.`,
  },
  {
    id: 141,
    slug: 'custom-recipe-plugin',
    question: 'How do I create a custom visual recipe as a plugin?',
    answer: `### 1. Introduction/Overview
You can create custom visual recipes to encapsulate reusable logic.

### 2. Steps
1.  Create a new plugin with the "Visual Recipe" component.
2.  Define the UI of the recipe in \`recipe.json\`.
3.  Write the Python code to implement the recipe's logic in \`recipe.py\`.
4.  The recipe will then be available in the Flow for users to add.`,
  },
  {
    id: 142,
    slug: 'using-git-for-version-control',
    question: 'How do I integrate a Dataiku project with a Git repository for version control?',
    answer: `### 1. Introduction/Overview
Dataiku projects can be linked to a Git repository for version control.

### 2. Steps
1.  The administrator configures a remote Git repository.
2.  In the project settings, link the project to the Git repository.
3.  Users can commit changes, view history, and revert to previous versions using the Git menu in the project.`,
  },
  {
    id: 143,
    slug: 'automated-model-monitoring',
    question: 'How do I set up automated monitoring for a deployed model?',
    answer: `### 1. Introduction/Overview
Automated model monitoring is crucial for detecting performance degradation.

### 2. Steps
1.  Create a scenario that runs regularly.
2.  Add a "Model Evaluation" step to the scenario.
3.  This step compares the model's predictions on new data with the actual outcomes.
4.  Use reporters to send alerts if the model's performance drops below a certain threshold.`,
  },
  {
    id: 144,
    slug: 'dataiku-and-databricks',
    question: 'How does Dataiku integrate with Databricks?',
    answer: `### 1. Introduction/Overview
Dataiku can leverage a Databricks cluster for distributed computation.

### 2. Integration
- **Connection**: Configure a connection to your Databricks cluster in Dataiku.
- **Execution Engine**: Select Databricks as the execution engine for recipes that support Spark.
- **Notebooks**: Run Databricks notebooks directly from within a Dataiku project.`,
  },
  {
    id: 145,
    slug: 'securing-dataiku-project',
    question: 'What are the best practices for securing a Dataiku project?',
    answer: `### 1. Introduction/Overview
Securing a Dataiku project involves controlling access to data and functionalities.

### 2. Best Practices
- **Permissions**: Use project-level permissions to control who can read, write, or administer the project.
- **Connections**: Restrict access to sensitive data connections.
- **Secrets Management**: Use external secret stores to manage credentials securely.
- **Audit Trail**: Regularly review the project's audit trail for suspicious activities.`,
  },
  {
    id: 146,
    slug: 'custom-python-hooks',
    question: 'What are Python hooks in Dataiku and how are they used?',
    answer: `### 1. Introduction/Overview
Python hooks allow you to execute custom code at specific lifecycle events in Dataiku.

### 2. Use Cases
- **Pre-build hook**: Run code before a job starts, for example to validate inputs.
- **Post-build hook**: Run code after a job completes, for example to send a custom notification.
- **Scenario hooks**: Run code at the start or end of a scenario run.`,
  },
  {
    id: 147,
    slug: 'interactive-dashboards-with-shiny',
    question: 'How can I create interactive dashboards using R Shiny in Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku supports creating interactive webapps using R Shiny.

### 2. Steps
1.  Create a new webapp in your project and select the "Shiny" template.
2.  Write your Shiny app code (\`ui.R\` and \`server.R\`).
3.  Use the Dataiku R API to access datasets.
4.  Publish the webapp for users to interact with.`,
  },
  {
    id: 148,
    slug: 'managing-large-number-of-projects',
    question: 'What are some strategies for managing a large number of projects in a Dataiku instance?',
    answer: `### 1. Introduction/Overview
Managing many projects requires good organization and governance.

### 2. Strategies
- **Project Naming Conventions**: Enforce a consistent naming scheme for projects.
- **Archiving**: Regularly archive old or inactive projects.
- **Project Folders**: Organize projects into folders for different teams or business units.
- **Automated Audits**: Use the API to run scripts that audit projects for compliance with best practices.`,
  },
  {
    id: 149,
    slug: 'dataiku-and-snowflake',
    question: 'How does Dataiku leverage the capabilities of Snowflake?',
    answer: `### 1. Introduction/Overview
Dataiku's integration with Snowflake allows for high-performance, in-database processing.

### 2. Integration
- **Push-down Execution**: SQL and visual recipes are pushed down to Snowflake for execution, leveraging its performance.
- **Time Travel**: Access historical data in Snowflake using its Time Travel feature.
- **User-Defined Functions (UDFs)**: Call Snowflake UDFs from within Dataiku recipes.`,
  },
  {
    id: 150,
    slug: 'data-quality-rules',
    question: 'How do I implement and enforce data quality rules across multiple projects?',
    answer: `### 1. Introduction/Overview
Enforcing data quality rules is essential for reliable analytics.

### 2. Implementation
- **Shared Datasets**: Create a central project that defines "golden" datasets with validated data.
- **Metrics and Checks**: Define metrics and checks on these shared datasets.
- **Dependencies**: Have other projects depend on these shared datasets.
- **CI/CD Pipeline**: Include data quality checks as part of your CI/CD pipeline.`,
  },
  {
    id: 151,
    slug: 'deploying-python-webapp',
    question: 'How do I deploy a Python webapp (e.g., using Dash or Streamlit) in Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku allows you to deploy Python webapps to share interactive results.

### 2. Steps
1.  Create a new webapp in your project.
2.  Select the Dash or Streamlit template.
3.  Write your webapp code in the provided Python file.
4.  Use the Dataiku Python API to access datasets and models.
5.  Publish the webapp, making it accessible to other users.`,
  },
  {
    id: 152,
    slug: 'optimizing-memory-usage',
    question: 'What are some tips for optimizing memory usage in Python recipes?',
    answer: `### 1. Introduction/Overview
Optimizing memory usage is crucial when working with large datasets in Python.

### 2. Tips
- **Load only necessary columns**: Use the \`columns\` parameter in \`get_dataframe()\`.
- **Use appropriate dtypes**: Use smaller dtypes where possible (e.g., \`int32\` instead of \`int64\`).
- **Process in chunks**: Read the dataset in chunks instead of all at once.
- **Delete unused variables**: Use \`del\` to free up memory from variables you no longer need.`,
  },
  {
    id: 153,
    slug: 'cross-project-scenarios',
    question: 'How can I create a scenario that orchestrates jobs across multiple projects?',
    answer: `### 1. Introduction/Overview
You can create a scenario in a "master" project to orchestrate jobs in other projects.

### 2. Steps
1.  In your master project, create a new scenario.
2.  Use a Python recipe step that utilizes the Dataiku API to trigger scenarios in other projects.
\`\`\`python
import dataiku
client = dataiku.api_client()
project = client.get_project("OTHER_PROJECT_KEY")
scenario = project.get_scenario("SCENARIO_ID")
scenario.run()
\`\`\``,
  },
  {
    id: 154,
    slug: 'dataiku-and-gcp',
    question: 'How does Dataiku integrate with Google Cloud Platform (GCP)?',
    answer: `### 1. Introduction/Overview
Dataiku integrates with various GCP services for storage and computation.

### 2. Integration
- **Google Cloud Storage (GCS)**: Use GCS as a storage backend for datasets.
- **BigQuery**: Run SQL recipes and visual recipes directly in BigQuery.
- **Vertex AI**: Orchestrate Vertex AI model training and prediction from within Dataiku.`,
  },
  {
    id: 155,
    slug: 'advanced-feature-engineering',
    question: 'What are some advanced feature engineering techniques I can implement in Dataiku?',
    answer: `### 1. Introduction/Overview
Advanced feature engineering can significantly improve model performance.

### 2. Techniques
- **Interaction Features**: Create features by combining two or more existing features (e.g., using the Formula processor).
- **Polynomial Features**: Generate polynomial features for regression models.
- **Time-based Features**: Extract features from date/time columns, such as day of the week, month, or holidays.
- **Text Features**: Use NLP techniques like TF-IDF or word embeddings on text data.`,
  },
  {
    id: 156,
    slug: 'versioning-datasets',
    question: 'How can I version control datasets in Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku does not directly version the data within datasets, but you can achieve this with a specific workflow.

### 2. Workflow
- **Use partitioned datasets**: Create a new partition for each version of your data.
- **Use a "version" column**: Add a column to your dataset that indicates the version number.
- **Snapshots**: For filesystem-based datasets, you can create snapshots at the storage level.`,
  },
  {
    id: 157,
    slug: 'custom-api-endpoint',
    question: 'How do I create a custom API endpoint that is not tied to a model?',
    answer: `### 1. Introduction/Overview
You can create custom API endpoints in the API Designer to expose any kind of Python code.

### 2. Steps
1.  In the API Designer, create a new API service.
2.  Add a "Custom prediction endpoint (Python)".
3.  Write the Python code that will be executed when the endpoint is called. This code can do anything, like querying a database or calling another API.
4.  Deploy the service to the API Deployer.`,
  },
  {
    id: 158,
    slug: 'dataiku-and-azure',
    question: 'How does Dataiku integrate with Microsoft Azure?',
    answer: `### 1. Introduction/Overview
Dataiku integrates with various Azure services.

### 2. Integration
- **Azure Blob Storage**: Use Blob Storage as a backend for datasets.
- **Azure Synapse Analytics**: Run SQL and visual recipes in Synapse.
- **Azure Machine Learning**: Orchestrate Azure ML jobs from within Dataiku.`,
  },
  {
    id: 159,
    slug: 'dynamic-sql-queries',
    question: 'How can I create dynamic SQL queries in a SQL recipe?',
    answer: `### 1. Introduction/Overview
You can use project variables to create dynamic SQL queries.

### 2. Example
In your project variables, define a variable like \`my_table = 'customers'\`.
In your SQL recipe, you can then write:
\`\`\`sql
SELECT * FROM \${my_table}
\`\`\`
When the recipe runs, Dataiku will substitute the variable with its value.`,
  },
  {
    id: 160,
    slug: 'geospatial-analysis',
    question: 'What are the capabilities of Dataiku for geospatial analysis?',
    answer: `### 1. Introduction/Overview
Dataiku has several features for geospatial analysis.

### 2. Capabilities
- **GeoPoint type**: A native data type for geographic coordinates.
- **Visual processors**: Processors in the Prepare recipe for tasks like converting lat/lon to GeoPoint, or enriching with administrative boundaries.
- **Geospatial charts**: Create maps to visualize geospatial data.
- **Geospatial joins**: Join datasets based on geographic proximity.`,
  },
  {
    id: 161,
    slug: 'managing-python-dependencies',
    question: 'What is the best way to manage Python dependencies for a project?',
    answer: `### 1. Introduction/Overview
Managing Python dependencies is done through code environments.

### 2. Best Practices
- **Project-specific environments**: Create a separate code environment for each project.
- **Pin versions**: Pin the exact version of each package in your requirements.
- **Minimalism**: Only include the packages that are necessary for your project.
- **Export and version**: Export the code environment definition and commit it to your Git repository.`,
  },
  {
    id: 162,
    slug: 'custom-metrics-in-ml',
    question: 'How can I add a custom performance metric to the Visual ML lab?',
    answer: `### 1. Introduction/Overview
You can define custom performance metrics for your models in the Visual ML lab.

### 2. Steps
1.  In the **Design > Metrics** section of your model, you can add a new metric.
2.  Select "Custom (Python)".
3.  Write a Python function that takes the true values and predicted values as input and returns the calculated metric.
4.  This metric will then be displayed in the model results along with the standard metrics.`,
  },
  {
    id: 163,
    slug: 'dataiku-and-tableau',
    question: 'How can I connect Dataiku to Tableau for visualization?',
    answer: `### 1. Introduction/Overview
You can connect Tableau to datasets in Dataiku.

### 2. Steps
1.  From a dataset in Dataiku, go to the **Export** tab.
2.  Select "Tableau Data Extract (.tde or .hyper)".
3.  Download the file and open it in Tableau.
4.  Alternatively, for live connections, if your dataset is in a database, you can connect Tableau directly to that database table.`,
  },
  {
    id: 164,
    slug: 'optimizing-flow-builds',
    question: 'What are some techniques for optimizing the performance of Flow builds?',
    answer: `### 1. Introduction/Overview
Optimizing Flow builds is key for efficient development and production pipelines.

### 2. Techniques
- **Use partitioning**: Build only the necessary partitions of your data.
- **Push down computation**: Use SQL recipes for database-backed datasets.
- **Use performant storage**: Use Parquet file format for filesystem datasets.
- **Parallelize execution**: Use partitioning dispatching to run recipes in parallel.`,
  },
  {
    id: 165,
    slug: 'custom-file-formats',
    question: 'How can I work with a custom file format in Dataiku?',
    answer: `### 1. Introduction/Overview
You can work with custom file formats using a Python recipe.

### 2. Steps
1.  Upload your custom file to a managed folder.
2.  Create a Python recipe that takes the folder as input.
3.  Use a Python library that can parse your custom file format.
4.  Read the data into a Pandas DataFrame.
5.  Write the DataFrame to a standard Dataiku dataset.`,
  },
  {
    id: 166,
    slug: 'instance-migration',
    question: 'What is the process for migrating a Dataiku instance to a new server?',
    answer: `### 1. Introduction/Overview
Migrating a Dataiku instance involves moving the Dataiku Data Directory.

### 2. Process
1.  Stop the old Dataiku instance.
2.  Back up the entire Dataiku Data Directory.
3.  Transfer the backup to the new server.
4.  Install the same version of Dataiku on the new server.
5.  Configure the new instance to use the transferred Data Directory.
6.  Start the new instance.`,
  },
  {
    id: 167,
    slug: 'automating-project-exports',
    question: 'How can I automate the process of exporting project bundles?',
    answer: `### 1. Introduction/Overview
You can automate project exports using the Dataiku API.

### 2. Example
\`\`\`python
import dataiku
client = dataiku.api_client()
project = client.get_project("MY_PROJECT_KEY")
bundle = project.export_bundle()
with open("my_bundle.zip", "wb") as f:
    f.write(bundle.read())
\`\`\`
This script can be run in a scenario to regularly back up projects.`,
  },
  {
    id: 168,
    slug: 'dataiku-and-powerbi',
    question: 'How can I connect Dataiku to Power BI?',
    answer: `### 1. Introduction/Overview
You can connect Power BI to datasets in Dataiku.

### 2. Steps
- **Direct Query**: If your dataset is stored in a database that Power BI supports, you can connect Power BI directly to that table.
- **Export**: Export the dataset from Dataiku (e.g., as a CSV file) and import it into Power BI.
- **Web Connector**: Use Power BI's web connector to fetch data from a Dataiku API endpoint that you create.`,
  },
  {
    id: 169,
    slug: 'handling-imbalanced-data',
    question: 'What are the different strategies for handling imbalanced data in Visual ML?',
    answer: `### 1. Introduction/Overview
Visual ML provides several strategies for handling imbalanced classification datasets.

### 2. Strategies
- **Class weights**: Assign higher weights to the minority class.
- **Oversampling (SMOTE)**: Create synthetic samples of the minority class.
- **Undersampling**: Randomly remove samples from the majority class.
- **Change metric**: Optimize for a metric like F1-score or recall instead of accuracy.`,
  },
  {
    id: 170,
    slug: 'custom-processors-in-prepare',
    question: 'How do I create a custom processor for the Prepare recipe?',
    answer: `### 1. Introduction/Overview
You can create a custom processor as a plugin to add new functionality to the Prepare recipe.

### 2. Steps
1.  Create a new plugin with the "Processor" component.
2.  Define the UI for the processor's parameters in \`processor.json\`.
3.  Write the Python code for the processor's logic in \`processor.py\`. The code will be applied row by row to the data.`,
  },
  {
    id: 171,
    slug: 'real-time-data-ingestion',
    question: 'How can I ingest real-time data streams into Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku can ingest real-time data from message queues like Kafka.

### 2. Steps
1.  Configure a connection to your Kafka topic in Dataiku.
2.  Create a new dataset using this connection.
3.  The dataset will be continuously updated with new messages from the stream.
4.  You can then use this streaming dataset as input for other recipes.`,
  },
  {
    id: 172,
    slug: 'managing-ml-experiments',
    question: 'What are the best practices for managing ML experiments in the Lab?',
    answer: `### 1. Introduction/Overview
Managing ML experiments helps in tracking and reproducing results.

### 2. Best Practices
- **Descriptive Names**: Give your experiments and models descriptive names.
- **Log Parameters**: Keep track of the parameters and features used for each experiment.
- **Compare Models**: Use the model comparison tools to evaluate different experiments.
- **Document Findings**: Use the model documentation and wiki to record your findings.`,
  },
  {
    id: 173,
    slug: 'dataiku-and-aws-s3',
    question: 'How do I use AWS S3 as a storage backend in Dataiku?',
    answer: `### 1. Introduction/Overview
You can use AWS S3 as a storage backend for your datasets.

### 2. Steps
1.  Configure a connection to your S3 bucket in Dataiku, providing your AWS credentials.
2.  When creating a dataset or as an output of a recipe, select this S3 connection as the storage location.
3.  Dataiku will read and write data directly to your S3 bucket.`,
  },
  {
    id: 174,
    slug: 'custom-triggers-for-scenarios',
    question: 'Can I create a custom trigger for a scenario?',
    answer: `### 1. Introduction/Overview
Yes, you can create custom triggers for scenarios using a plugin.

### 2. Steps
1.  Create a new plugin with the "Scenario Trigger" component.
2.  Define the UI for the trigger's parameters in \`trigger.json\`.
3.  Write the Python code in \`trigger.py\` that checks for the trigger condition and fires the event.
4.  This custom trigger will then be available in the scenario settings.`,
  },
  {
    id: 175,
    slug: 'monitoring-api-node',
    question: 'How do I monitor the health and performance of the API node?',
    answer: `### 1. Introduction/Overview
The API Deployer provides monitoring capabilities for the API node.

### 2. Monitoring
- **Health Dashboard**: View the health status of all API services and endpoints.
- **Performance Metrics**: Track metrics like latency, throughput, and error rates.
- **Logging**: Access detailed logs for each API request.
- **Alerting**: Configure alerts to be notified of issues with the API services.`,
  },
  {
    id: 176,
    slug: 'time-series-forecasting',
    question: 'How do I perform time series forecasting in Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku has a dedicated visual interface for time series forecasting.

### 2. Steps
1.  In the Lab, choose "Forecasting" as the ML task.
2.  Select the time column and the target column to forecast.
3.  Dataiku provides several forecasting models (e.g., ARIMA, Prophet).
4.  Train the models and evaluate their performance using metrics like MAE and RMSE.
5.  Deploy the best model to the Flow.`,
  },
  {
    id: 177,
    slug: 'dataiku-and-gitlfs',
    question: 'How does Dataiku handle large files in a Git repository?',
    answer: `### 1. Introduction/Overview
Dataiku's Git integration supports Git LFS (Large File Storage) for handling large files.

### 2. Configuration
- The administrator configures Git LFS on the Dataiku instance.
- When you commit large files (like models or large data samples) to the Git-linked project, Dataiku uses Git LFS to store them efficiently.`,
  },
  {
    id: 178,
    slug: 'customizing-dataiku-ui',
    question: 'Can I customize the Dataiku user interface?',
    answer: `### 1. Introduction/Overview
Dataiku offers some options for customizing the UI.

### 2. Customization
- **Branding**: Administrators can change the logo and color scheme of the Dataiku instance.
- **Homepage**: Customize the instance homepage with specific content and links.
- **Plugins**: Create plugins to add new UI components, like custom views or dashboards.`,
  },
  {
    id: 179,
    slug: 'shared-code-libraries',
    question: 'How can I create a shared library of Python/R code to be used across multiple projects?',
    answer: `### 1. Introduction/Overview
You can create a plugin that contains a shared code library.

### 2. Steps
1.  Create a new plugin.
2.  In the plugin's \`python-lib\` or \`r-lib\` folder, add your shared code modules.
3.  Install the plugin on your Dataiku instance.
4.  In any project, you can now import and use the functions from your shared library in Python/R recipes.`,
  },
  {
    id: 180,
    slug: 'optimizing-joins',
    question: 'What are some tips for optimizing join performance?',
    answer: `### 1. Introduction/Overview
Optimizing joins is crucial for performance, especially with large datasets.

### 2. Tips
- **Push down to database**: If the datasets are in a database, use a SQL recipe for the join.
- **Use appropriate join type**: Choose the most efficient join type for your use case.
- **Filter before joining**: Reduce the size of the datasets before joining them.
- **Ensure keys are indexed**: If joining in a database, make sure the join keys are indexed.`,
  },
  {
    id: 181,
    slug: 'data-masking',
    question: 'How can I implement data masking or anonymization in Dataiku?',
    answer: `### 1. Introduction/Overview
Data masking is important for protecting sensitive data.

### 2. Implementation
- **Prepare recipe**: Use processors in the Prepare recipe to hash, encrypt, or replace sensitive data.
- **Python recipe**: Write a Python recipe with custom logic for more complex anonymization techniques.
- **Permissions**: Restrict access to datasets containing sensitive information.`,
  },
  {
    id: 182,
    slug: 'kubernetes-and-spark',
    question: 'Can I run Spark on Kubernetes with Dataiku?',
    answer: `### 1. Introduction/Overview
Yes, Dataiku can be configured to run Spark jobs on a Kubernetes cluster.

### 2. Configuration
- The administrator configures Dataiku to connect to a Kubernetes cluster that has Spark enabled.
- When you run a Spark recipe, Dataiku submits the job to the Spark-on-Kubernetes cluster.`,
  },
  {
    id: 183,
    slug: 'dataiku-and-ldap',
    question: 'How does Dataiku integrate with LDAP or Active Directory for user authentication?',
    answer: `### 1. Introduction/Overview
Dataiku can integrate with LDAP/Active Directory for centralized user management.

### 2. Integration
- The administrator configures the LDAP/AD connection in the administration settings.
- Users can then log in to Dataiku using their corporate credentials.
- Dataiku groups can be mapped to LDAP/AD groups to automatically manage user permissions.`,
  },
  {
    id: 184,
    slug: 'ab-testing-models',
    question: 'How can I set up an A/B test for two different models in Dataiku?',
    answer: `### 1. Introduction/Overview
You can A/B test models using the API Deployer and an external router.

### 2. Steps
1.  Deploy both models (A and B) to the API Deployer as different versions of the same service, or as different services.
2.  Use a load balancer or router in front of the API node to split traffic between the two model endpoints.
3.  Log the predictions from both models and compare their performance on live data.`,
  },
  {
    id: 185,
    slug: 'custom-file-exporters',
    question: 'How do I create a custom file exporter as a plugin?',
    answer: `### 1. Introduction/Overview
You can create a plugin to export datasets to a custom file format.

### 2. Steps
1.  Create a new plugin with the "Exporter" component.
2.  Define the UI for the exporter's parameters in \`exporter.json\`.
3.  Write the Python code in \`exporter.py\` that reads the dataset and writes it to the custom format.
4.  The custom exporter will then be available in the dataset's export menu.`,
  },
  {
    id: 186,
    slug: 'instance-backup-and-restore',
    question: 'What is the recommended procedure for backing up and restoring a Dataiku instance?',
    answer: `### 1. Introduction/Overview
Regular backups are crucial for disaster recovery.

### 2. Procedure
- **Backup**: Regularly back up the entire Dataiku Data Directory. This contains all projects, configurations, and metadata.
- **Restore**: To restore, install a new Dataiku instance of the same version, and then replace its Data Directory with the backup.`,
  },
  {
    id: 187,
    slug: 'dataiku-and-looker',
    question: 'How does Dataiku integrate with Looker?',
    answer: `### 1. Introduction/Overview
Dataiku can be integrated with Looker for business intelligence and visualization.

### 2. Integration
- **Database Connection**: The most common way is to have Dataiku write its output datasets to a database that Looker is connected to. Looker can then query this data.
- **API**: Use Looker's API to push data from Dataiku to Looker, or use Dataiku's API to pull data into Looker.`,
  },
  {
    id: 188,
    slug: 'text-analysis-and-nlp',
    question: 'What are Dataiku\'s capabilities for text analysis and NLP?',
    answer: `### 1. Introduction/Overview
Dataiku has several features for NLP.

### 2. Capabilities
- **Prepare recipe**: Processors for text cleaning, tokenization, and stemming.
- **Text vectorization**: Use TF-IDF or word embeddings to convert text into numerical features for ML models.
- **Visual ML**: Pre-trained models for tasks like text classification.
- **Python recipes**: Use NLP libraries like NLTK, spaCy, or Hugging Face Transformers for custom analysis.`,
  },
  {
    id: 189,
    slug: 'managing-project-templates',
    question: 'How can I create and use project templates?',
    answer: `### 1. Introduction/Overview
Project templates allow you to create new projects with a predefined structure.

### 2. Steps
1.  Create a project that you want to use as a template.
2.  From the project actions menu, select "Convert to template".
3.  When creating a new project, you can now select this template. The new project will be a copy of the template's Flow, recipes, and settings.`,
  },
  {
    id: 190,
    slug: 'high-availability-setup',
    question: 'How do you set up a high-availability (HA) architecture for Dataiku?',
    answer: `### 1. Introduction/Overview
An HA setup ensures that Dataiku remains available in case of a server failure.

### 2. Architecture
- **Multiple Backend Nodes**: Run multiple Dataiku backend nodes behind a load balancer.
- **Shared Data Directory**: All backend nodes must point to the same shared Data Directory on a resilient network storage system (like NFS).
- **External Database**: Use an external, production-grade database (like PostgreSQL) for Dataiku's configuration store.`,
  },
  {
    id: 191,
    slug: 'anomaly-detection',
    question: 'How do I perform anomaly detection in Dataiku?',
    answer: `### 1. Introduction/Overview
Anomaly detection is an unsupervised learning task to identify unusual data points.

### 2. Methods
- **Visual ML**: Use clustering algorithms; points that do not belong to any cluster or form a very small cluster can be considered anomalies.
- **Statistical methods**: In a Prepare recipe, filter for rows that are a certain number of standard deviations away from the mean.
- **Specialized algorithms**: In a Python recipe, use algorithms like Isolation Forest or One-Class SVM.`,
  },
  {
    id: 192,
    slug: 'gpu-resource-management',
    question: 'How can I manage GPU resources for multiple users?',
    answer: `### 1. Introduction/Overview
Managing GPU resources is important to ensure fair usage.

### 2. Management
- **Containerized Execution**: Use containerization to assign specific GPU resources to each user's job.
- **User Quotas**: Set quotas on the number of concurrent GPU jobs a user can run.
- **Prioritization**: Use job queues to prioritize critical jobs.`,
  },
  {
    id: 193,
    slug: 'dataiku-and-airflow',
    question: 'Can I use Airflow to orchestrate Dataiku jobs?',
    answer: `### 1. Introduction/Overview
Yes, you can use Airflow to orchestrate Dataiku jobs.

### 2. Integration
- **Dataiku API**: Use Airflow's PythonOperator to call the Dataiku API and trigger scenarios or jobs.
- **Dataiku Plugin**: There are community-developed Airflow plugins that provide dedicated operators for interacting with Dataiku.`,
  },
  {
    id: 194,
    slug: 'distributed-deep-learning',
    question: 'Does Dataiku support distributed deep learning training?',
    answer: `### 1. Introduction/Overview
Yes, Dataiku supports distributed deep learning training.

### 2. How it Works
- This is an advanced feature that requires a specific setup.
- It typically involves using a containerized execution environment on a Kubernetes cluster with multiple GPU nodes.
- In a Python recipe, you use a library like Horovod or TensorFlow's built-in distribution strategies to train your model across multiple GPUs and machines.`,
  },
  {
    id: 195,
    slug: 'custom-dashboard-visuals',
    question: 'How can I create custom visualizations for a dashboard beyond the standard charts?',
    answer: `### 1. Introduction/Overview
You can create custom visualizations using webapps.

### 2. Steps
1.  Create a webapp using a library like D3.js, Dash, or Streamlit.
2.  In the webapp, create your custom visualization.
3.  Publish the webapp.
4.  In a dashboard, add a "Webapp" tile and select your published webapp.`,
  },
  {
    id: 196,
    slug: 'model-fairness-and-bias',
    question: 'How can I assess a model for fairness and bias?',
    answer: `### 1. Introduction/Overview
Assessing model fairness is crucial to ensure that a model does not discriminate against certain groups.

### 2. Assessment in Dataiku
- **Subpopulation Analysis**: In the Visual ML lab, you can analyze a model's performance on different subpopulations (e.g., by gender or race) to see if there are significant disparities.
- **Fairness Metrics**: You can implement custom fairness metrics (like demographic parity or equalized odds) in a Python recipe or as a custom metric in the lab.`,
  },
  {
    id: 197,
    slug: 'dataiku-and-slack-integration',
    question: 'How do I integrate Dataiku with Slack for notifications?',
    answer: `### 1. Introduction/Overview
You can send notifications from Dataiku to Slack using scenario reporters.

### 2. Steps
1.  Configure a Slack connection in the administration settings.
2.  In a scenario, add a "Slack message" reporter.
3.  Configure the reporter to send a message to a specific channel with the scenario's outcome and other details.`,
  },
  {
    id: 198,
    slug: 'streaming-data-pipelines',
    question: 'How do I build a streaming data pipeline in Dataiku?',
    answer: `### 1. Introduction/Overview
Streaming pipelines in Dataiku are built using streaming datasets and recipes.

### 2. Steps
1.  Ingest a real-time data stream from a source like Kafka.
2.  Use streaming-compatible recipes (like "Stream with Python") to process the data in real-time.
3.  Write the output to a sink, which could be another streaming dataset or a standard dataset.`,
  },
  {
    id: 199,
    slug: 'programmatic-project-comparison',
    question: 'How can I programmatically compare two versions of a project?',
    answer: `### 1. Introduction/Overview
You can use the Dataiku API to compare two versions of a project.

### 2. Steps
1.  Export bundles for both versions of the project.
2.  Unzip the bundles.
3.  Write a script to compare the contents of the bundles, such as the JSON definitions of recipes and datasets.
4.  Alternatively, if the project is linked to Git, you can use standard Git diff tools.`,
  },
  {
    id: 200,
    slug: 'dataiku-and-cloud-foundry',
    question: 'Can Dataiku be deployed on Cloud Foundry?',
    answer: `### 1. Introduction/Overview
Yes, Dataiku can be deployed on Cloud Foundry.

### 2. Deployment
- This is a more complex deployment scenario.
- It involves creating a custom buildpack for Dataiku or using a container-based approach within Cloud Foundry.
- The Dataiku support team can provide guidance on this type of deployment.`,
  },
];
