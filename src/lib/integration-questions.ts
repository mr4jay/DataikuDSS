import type { Question } from './questions';

export const integrationQuestions: Question[] = [
  {
    id: 251,
    slug: 'tableau-integration-methods',
    question: 'What are the primary methods for integrating Dataiku with Tableau?',
    answer: `### 1. Introduction/Overview
Integrating Dataiku with Tableau allows for powerful, interactive visualizations on top of prepared data.

### 2. Primary Methods
- **Live Database Connection (Best Practice):** Dataiku prepares data and writes the final table to a database (like Snowflake, Redshift, or PostgreSQL). Tableau then connects directly to this database table. This is scalable and performant.
- **Tableau Data Extract (.hyper):** From a Dataiku dataset, you can use the **Export** function to create a \`.hyper\` file. This file can then be opened in Tableau Desktop. This is good for offline analysis or when a live database connection isn't available.
- **Web Data Connector (WDC):** For more dynamic use cases, you can expose a Dataiku dataset via a custom API endpoint and use Tableau's WDC to pull the data. This is less common and more complex to set up.`,
  },
  {
    id: 252,
    slug: 'power-bi-integration',
    question: 'How do I connect Dataiku to Power BI?',
    answer: `### 1. Introduction/Overview
Similar to Tableau, integrating with Power BI involves making Dataiku's output accessible to the BI tool.

### 2. Integration Patterns
- **DirectQuery to Database (Best Practice):** The most robust method. Use a Dataiku Flow to cleanse and prepare data, then write the output to a database that Power BI's DirectQuery supports (e.g., Azure Synapse, SQL Server, Snowflake).
- **Export to File:** Export the dataset from Dataiku as a CSV or Excel file and import it into Power BI. This is simple but not scalable or automated.
- **API Endpoint:** Create a Python recipe in Dataiku that exposes the data via an API. Use Power BI's "Get data from Web" feature to connect to this API.`,
  },
  {
    id: 253,
    slug: 'git-integration-setup',
    question: 'How do you set up Git integration for a Dataiku project?',
    answer: `### 1. Introduction/Overview
Integrating a project with Git (like GitHub, GitLab, or Bitbucket) is fundamental for version control, collaboration, and CI/CD.

### 2. Setup Process
1.  **Admin Configures Remotes:** A Dataiku administrator must first configure the connection to the Git service in **Administration > Settings > Git**.
2.  **Create a Remote Repository:** An empty repository must exist on the Git service.
3.  **Link Project:** In your Dataiku project, go to **... More Options > Git**. Click the **Setup** button.
4.  Select the configured remote and provide the repository details (e.g., \`user/repo-name\`).
5.  Dataiku will initialize the project as a Git repository and perform an initial commit. You can now pull, push, and commit changes from the Git menu in your project.`,
  },
  {
    id: 254,
    slug: 'plugin-development-basics',
    question: 'What are the basic steps to create a custom plugin?',
    answer: `### 1. Introduction/Overview
Plugins extend Dataiku's functionality. Creating your own allows you to add custom connectors, recipes, or other components.

### 2. Development Steps
1.  In Dataiku, navigate to **... > Plugins > Development > + New Plugin**.
2.  Give your plugin an ID and select the components you want to create (e.g., "Python recipe", "Dataset connector").
3.  Dataiku will generate the necessary boilerplate files (\`plugin.json\`, \`recipe.json\`, \`recipe.py\`, etc.).
4.  Edit these files to define your plugin's parameters (in the JSON files) and its logic (in the Python files).
5.  You can reload the plugin in the development environment to see your changes without restarting Dataiku.`,
  },
  {
    id: 255,
    slug: 'custom-recipe-plugin',
    question: 'How do I build a custom visual recipe as a plugin?',
    answer: `### 1. Introduction/Overview
A custom visual recipe allows you to package a specific piece of Python or R logic into a reusable, user-friendly component in the Flow.

### 2. Key Files
- **\`recipe.json\`**: Defines the user interface of the recipe. Here you specify the input and output roles (e.g., "main input dataset", "main output dataset") and any custom UI fields (like text boxes or dropdowns for parameters).
- **\`recipe.py\`**: Contains the Python code that executes the recipe's logic. The code will read from the input roles, get the values of the custom parameters, perform the transformation, and write to the output role.`,
  },
  {
    id: 256,
    slug: 'custom-connector-plugin',
    question: 'How do I build a plugin for a custom data connector?',
    answer: `### 1. Introduction/Overview
If Dataiku doesn't natively support your data source, you can build a connector plugin.

### 2. Key Python Classes
You will need to implement a Python class that inherits from \`dataiku.connector.Connector\`. The key method to implement is:
- **\`generate_rows(dataset_config, ...)\`**: This function must contain the logic to connect to your external data source, fetch the data, and then \`yield\` each row as a dictionary. Dataiku handles the rest, including writing the data to the output.`,
  },
  {
    id: 257,
    slug: 'using-the-dataiku-api',
    question: 'How do I use the Dataiku Python API from an external script?',
    answer: `### 1. Introduction/Overview
The Dataiku API allows you to control and automate a Dataiku instance programmatically from outside Dataiku.

### 2. Setup and Example
1.  **Generate API Key:** In your Dataiku profile, create an API key with the necessary permissions.
2.  **Install Client Library:** On your local machine or server, install the client library: \`pip install dataiku-api-client\`.
3.  **Connect and Use:**
    \`\`\`python
    import dataikuapi

    host = "https://dss.mycompany.com"
    apiKey = "YOUR_API_KEY"

    client = dataikuapi.DSSClient(host, apiKey)
    
    # Example: list projects
    for project in client.list_project_keys():
        print(project)
    \`\`\``,
  },
  {
    id: 258,
    slug: 'airflow-integration',
    question: 'How can Dataiku be integrated with Apache Airflow?',
    answer: `### 1. Introduction/Overview
While Dataiku has its own powerful scheduler (Scenarios), some organizations use Airflow as a central orchestrator.

### 2. Integration Method
- The most common method is to use Airflow's **\`PythonOperator\`**.
- The Python code within the operator uses the \`dataiku-api-client\` to connect to the Dataiku instance and trigger a scenario run.
- The Airflow DAG can wait for the scenario to complete and then proceed to the next task.
- There are also third-party Airflow providers/hooks for Dataiku that can simplify this process.`,
  },
  {
    id: 259,
    slug: 'slack-integration',
    question: 'How do I send notifications from a scenario to Slack?',
    answer: `### 1. Introduction/Overview
Scenarios can send notifications about their outcomes using Reporters.

### 2. Setup
1.  **Admin Configures Webhook:** An administrator configures a new message channel in **Administration > Settings**, selects "Slack", and provides the incoming webhook URL from Slack.
2.  **Add Reporter to Scenario:** In your scenario, go to the **Reporters** tab.
3.  Click **+ Add Reporter** and select "Send message to channel".
4.  Choose the configured Slack channel.
5.  Customize the message. You can use variables like \`\${outcome}\` to include the scenario's result in the message.`,
  },
  {
    id: 260,
    slug: 'webhook-integration',
    question: 'How can I trigger an external webhook from a Dataiku scenario?',
    answer: `### 1. Introduction/Overview
You can use a Python recipe within a scenario to make an outbound API call to any webhook.

### 2. Steps
1.  In your scenario, add a **Run Python code** step.
2.  In the Python code, use a library like \`requests\` to make a POST request to your webhook URL.
3.  You can pass information about the scenario run (like its outcome or the project key) in the body of the POST request.
    \`\`\`python
    import requests
    import json
    import dataiku
    
    webhook_url = "https://my-service.com/webhook"
    payload = {"status": "SUCCESS", "project": dataiku.get_custom_variables()["projectKey"]}
    
    response = requests.post(webhook_url, data=json.dumps(payload), headers={'Content-Type': 'application/json'})
    response.raise_for_status() # Fails the step if the webhook call fails
    \`\`\``,
  },
  {
    id: 261,
    slug: 's3-integration',
    question: 'How does Dataiku integrate with AWS S3?',
    answer: `### 1. Introduction/Overview
AWS S3 is a first-class storage backend in Dataiku.

### 2. Integration
- **Connection:** An administrator sets up an S3 connection in the global settings, providing AWS credentials (typically via an IAM role for security).
- **Usage:**
    - You can create a dataset that points to an existing file or folder in S3.
    - You can set an S3 connection as the output for any recipe. Dataiku will then write the output data (e.g., as a Parquet file) directly to the specified S3 bucket.
    - You can browse S3 buckets directly from the Dataiku UI when creating a dataset.`,
  },
  {
    id: 262,
    slug: 'azure-blob-storage-integration',
    question: 'How does Dataiku integrate with Azure Blob Storage?',
    answer: `### 1. Introduction/Overview
Similar to S3, Azure Blob Storage is a fully supported storage backend.

### 2. Integration
- **Connection:** An administrator configures an Azure Blob Storage connection in **Administration > Settings**, providing the necessary credentials (e.g., storage account name and key, or SAS token).
- **Usage:** It works identically to the S3 integration. You can use Blob Storage as a source for datasets or as a destination for recipe outputs. Dataiku handles the interaction with the Azure API seamlessly.`,
  },
  {
    id: 263,
    slug: 'google-cloud-storage-integration',
    question: 'How does Dataiku integrate with Google Cloud Storage (GCS)?',
    answer: `### 1. Introduction/Overview
GCS is a fully supported storage backend in Dataiku.

### 2. Integration
- **Connection:** An administrator sets up a GCS connection, typically authenticating via a GCP service account JSON key.
- **Usage:** Just like with S3 and Azure Blob Storage, you can use GCS as a source or destination for your datasets. This allows you to build data pipelines that read from and write to GCS buckets without leaving the Dataiku environment.`,
  },
  {
    id: 264,
    slug: 'snowflake-integration',
    question: 'What are the key features of the Dataiku-Snowflake integration?',
    answer: `### 1. Introduction/Overview
The integration between Dataiku and Snowflake is particularly powerful due to extensive push-down capabilities.

### 2. Key Features
- **Full Push-down:** Most visual recipes (Prepare, Join, Group, etc.) are automatically translated into SQL and executed directly within Snowflake. This leverages Snowflake's performance and minimizes data movement.
- **Read/Write Performance:** Dataiku is optimized for fast data transfer to and from Snowflake, including using Snowflake's internal stages for bulk loading.
- **Calling UDFs:** You can call Snowflake User-Defined Functions directly from within Dataiku recipes.
- **Time Travel:** Dataiku can be configured to leverage Snowflake's Time Travel feature to query historical versions of tables.`,
  },
  {
    id: 265,
    slug: 'databricks-integration',
    question: 'How does Dataiku integrate with Databricks?',
    answer: `### 1. Introduction/Overview
Dataiku can leverage a Databricks cluster as a powerful Spark execution engine.

### 2. Integration Methods
- **Databricks as Spark Engine:** You can configure Dataiku to submit Spark jobs directly to a Databricks cluster. When you run a Spark-compatible recipe, Dataiku sends the job to Databricks for distributed processing.
- **Databricks Notebooks:** You can create a Databricks notebook directly within Dataiku. The code runs on the Databricks cluster, but the notebook interface is embedded in your Dataiku project.
- **Connecting to Delta Lake:** You can create Dataiku datasets that read from and write to Delta Lake tables managed by Databricks.`,
  },
  {
    id: 266,
    slug: 'bigquery-integration',
    question: 'How does Dataiku integrate with Google BigQuery?',
    answer: `### 1. Introduction/Overview
BigQuery is a fully supported database connection in Dataiku with strong push-down execution.

### 2. Integration
- **Connection:** An administrator configures the BigQuery connection, usually authenticating with a GCP service account.
- **In-Database Execution:** Visual recipes run on BigQuery datasets are automatically converted to BigQuery Standard SQL and executed within BigQuery, leveraging its serverless, scalable architecture.
- **Managing Datasets:** You can create Dataiku datasets that point to existing BigQuery tables or have Dataiku create and manage new tables in BigQuery as recipe outputs.`,
  },
  {
    id: 267,
    slug: 'redshift-integration',
    question: 'How does Dataiku integrate with Amazon Redshift?',
    answer: `### 1. Introduction/Overview
Amazon Redshift is a fully supported data warehouse connection in Dataiku.

### 2. Integration
- **Connection:** An administrator configures a standard PostgreSQL connection, but points it to the Redshift cluster's endpoint.
- **In-Database Execution:** Like other SQL databases, Dataiku pushes down the execution of visual recipes to Redshift, converting the steps into Redshift-compatible SQL.
- **S3-based Loading:** For optimal performance, Dataiku can use an S3 bucket as a staging area to bulk-load data into Redshift using the efficient \`COPY\` command.`,
  },
  {
    id: 268,
    slug: 'external-ide-integration',
    question: 'Can I use an external IDE like VS Code or PyCharm with Dataiku?',
    answer: `### 1. Introduction/Overview
Yes, you can use an external IDE for a more advanced development experience, though it requires some setup.

### 2. How it Works
1.  **Sync Project Locally:** Link your Dataiku project to a Git repository. Clone this repository to your local machine.
2.  **Use Dataiku API:** In your local IDE (e.g., VS Code), write Python code that uses the \`dataiku-api-client\`. This allows you to interact with your Dataiku instance to read data, trigger jobs, etc.
3.  **Push Changes:** When your code is ready, commit and push your changes to the Git repository.
4.  **Pull in Dataiku:** In the Dataiku UI, pull the changes from Git to update the recipes in your project.
This workflow allows you to use the advanced editing and debugging features of a local IDE while keeping your project synced with the Dataiku instance.`,
  },
  {
    id: 269,
    slug: 'jira-integration',
    question: 'How can I integrate Dataiku with Jira?',
    answer: `### 1. Introduction/Overview
Integrating with Jira can be useful for tracking work or creating tickets based on events in Dataiku. This is typically done via webhooks or the Jira API.

### 2. Integration Method
- Create a Python recipe or a scenario step.
- In the Python code, use the \`requests\` library to call the Jira REST API.
- **Example:** If a data quality check fails in a scenario, a Python step could be triggered to call the Jira API and automatically create a new bug ticket, populating it with details about the failed check.`,
  },
  {
    id: 270,
    slug: 'ldap-active-directory-integration',
    question: 'How does Dataiku integrate with LDAP or Active Directory?',
    answer: `### 1. Introduction/Overview
This is a standard enterprise feature for centralized user authentication and group management.

### 2. How it Works
- An administrator configures the connection to the LDAP/AD server in **Administration > Security**.
- Once enabled, users can log in to Dataiku with their standard corporate credentials (Single Sign-On).
- Dataiku groups can be mapped to LDAP/AD groups. This allows you to manage permissions automatically. For example, if a new user is added to the "Data Scientists" group in Active Directory, they can automatically be granted access to the relevant projects in Dataiku.`,
  },
  {
    id: 271,
    slug: 'oauth-sso-integration',
    question: 'Does Dataiku support OAuth-based Single Sign-On (SSO)?',
    answer: `### 1. Introduction/Overview
Yes, besides LDAP/AD, Dataiku supports integration with various SSO providers using protocols like SAML and OpenID Connect (which is built on OAuth 2.0).

### 2. How it Works
- An administrator configures the SSO provider (e.g., Okta, Azure AD, Auth0) in the security settings.
- When a user tries to log in to Dataiku, they are redirected to the SSO provider's login page.
- After successful authentication, the provider redirects them back to Dataiku, and they are logged in. This provides a seamless and secure login experience.`,
  },
  {
    id: 272,
    slug: 'custom-exporter-plugin',
    question: 'How do I build a plugin to export data to a custom format?',
    answer: `### 1. Introduction/Overview
If you need to export data to a proprietary format or a specific XML/JSON structure, you can build a custom exporter plugin.

### 2. Development
1.  Create a new plugin with the **Exporter** component.
2.  **\`exporter.json\`**: Define the UI of your exporter, such as any parameters the user might need to provide.
3.  **\`exporter.py\`**: Implement the core logic. You'll create a class that inherits from \`dataiku.exporter.Exporter\`. The key method is \`generate_output(dataset, stream, ...)\`. In this method, you read the input dataset (row by row) and write the formatted output to the provided file \`stream\`.`,
  },
  {
    id: 273,
    slug: 'teradata-integration',
    question: 'How does Dataiku integrate with Teradata?',
    answer: `### 1. Introduction/Overview
Teradata is a supported SQL database connection in Dataiku.

### 2. Integration
- **Connection:** An administrator sets up the Teradata connection, providing the JDBC driver and connection details.
- **In-Database Execution:** Dataiku's visual recipes are translated into Teradata SQL for efficient in-database processing.
- **FastLoad/T-Pump:** Dataiku can leverage Teradata's high-performance data loading utilities for writing data.
- **Stored Procedures:** You can call Teradata stored procedures from a SQL recipe.`,
  },
  {
    id: 274,
    slug: 'salesforce-integration',
    question: 'How do I connect to Salesforce as a data source?',
    answer: `### 1. Introduction/Overview
Dataiku provides a dedicated connector for Salesforce.

### 2. How to Use
1.  **Install Plugin:** Ensure the official Salesforce connector plugin is installed.
2.  **Configure Connection:** An administrator configures the Salesforce connection with the necessary credentials and security token.
3.  **Create Dataset:** In a project, click **+ Dataset > Salesforce**. You can then browse and select the Salesforce object (e.g., Account, Opportunity) you want to import as a dataset. You can also write a SOQL query to be more specific.`,
  },
  {
    id: 275,
    slug: 'sharepoint-integration',
    question: 'How can I read files from a SharePoint site?',
    answer: `### 1. Introduction/Overview
Dataiku has a plugin for connecting to SharePoint.

### 2. How to Use
1.  **Install Plugin:** Install the SharePoint plugin from the plugin store.
2.  **Configure Connection:** An administrator sets up the connection to your SharePoint instance, which typically involves OAuth authentication.
3.  **Create Dataset:** Once the connection is set up, you can create a new dataset and select SharePoint as the source. You can then browse the SharePoint site to find and select the file (e.g., an Excel file) you want to read.`,
  },
  {
    id: 276,
    slug: 'looker-integration',
    question: 'How does Dataiku integrate with Looker?',
    answer: `### 1. Introduction/Overview
Integrating Dataiku and Looker allows you to use Dataiku for advanced data preparation and ML, and Looker for sophisticated BI and exploration.

### 2. Integration Pattern
- The most common and robust pattern is to use a shared database as an intermediary.
1.  **Dataiku Prepares Data:** A Dataiku Flow reads raw data, cleans it, enriches it, and runs predictions.
2.  **Write to DB:** The final, curated tables are written by Dataiku to a data warehouse (like Snowflake, BigQuery, or Redshift).
3.  **Looker Connects to DB:** Your Looker instance connects to this same data warehouse. You can then build your LookML models and Explores on top of the clean, reliable data prepared by Dataiku.`,
  },
  {
    id: 277,
    slug: 'qlick-sense-integration',
    question: 'How can I integrate Dataiku with Qlik Sense?',
    answer: `### 1. Introduction/Overview
The integration pattern for Qlik Sense is similar to that for other BI tools like Tableau or Power BI.

### 2. Methods
- **Database Connection:** Use Dataiku to prepare the data and write it to a database. Connect Qlik Sense to this database to load the data for your apps.
- **File-based:** Export datasets from Dataiku to Qlik's \`.qvx\` file format using a specific plugin or a custom Python script. These files can then be loaded efficiently into Qlik Sense.
- **REST Connector:** Use Qlik's REST connector to pull data from a custom API endpoint created in Dataiku.`,
  },
  {
    id: 278,
    slug: 'kerberos-security-integration',
    question: 'How does Dataiku handle Kerberos-secured connections (e.g., to Hadoop)?',
    answer: `### 1. Introduction/Overview
Dataiku can integrate with Kerberos to securely access resources like HDFS or Hive on a secured Hadoop cluster.

### 2. How it Works
- **Admin Configuration:** This is an advanced setup performed by an administrator. It involves configuring the Kerberos realm and principals in Dataiku's settings.
- **User Impersonation:** When a user runs a job that accesses a Kerberized service, Dataiku can be configured to impersonate that user. This means the job runs with the user's own Kerberos ticket and is subject to their specific permissions on the Hadoop cluster. This provides a high level of security and auditability.`,
  },
  {
    id: 279,
    slug: 'external-db-for-dss',
    question: 'Why should I use an external PostgreSQL database for the Dataiku backend?',
    answer: `### 1. Introduction/Overview
By default, Dataiku uses a built-in H2 database to store its own metadata (project information, recipe settings, etc.). For production, it's highly recommended to use an external, industrial-grade database like PostgreSQL.

### 2. Key Benefits
- **Performance:** A dedicated PostgreSQL database is more performant and robust than the built-in file-based H2 database.
- **High Availability (HA):** Using an external database is a prerequisite for setting up a high-availability Dataiku architecture with multiple backend nodes. All nodes connect to the same central database.
- **Backup and Restore:** It allows you to use standard, enterprise-grade backup and recovery procedures for your database, which is more reliable for critical production instances.`,
  },
  {
    id: 280,
    slug: 'custom-api-endpoint-plugin',
    question: 'How do I create a plugin for a custom API endpoint in the API Designer?',
    answer: `### 1. Introduction/Overview
You can package a custom Python API endpoint as a plugin to make it reusable across projects.

### 2. Development Steps
1.  Create a new plugin with the **API Endpoint** component.
2.  **\`endpoint.json\`**: Define the parameters and the UI of your endpoint.
3.  **\`endpoint.py\`**: Implement a Python class for your endpoint. The key method is often \`do_post()\`, where you write the code that receives the API request body, performs some action (like running a query or calculation), and returns a JSON response.
4.  Once installed, this custom endpoint type will be available to add in the API Designer.`,
  },
  {
    id: 281,
    slug: 'kafka-integration',
    question: 'How does Dataiku integrate with Apache Kafka for real-time data streaming?',
    answer: `### 1. Introduction/Overview
Dataiku can both read from and write to Kafka topics, enabling the creation of real-time, streaming data pipelines.

### 2. How it Works
- **Connection:** An administrator configures a connection to the Kafka cluster.
- **Streaming Dataset:** You can create a Dataiku dataset that points to a Kafka topic. This dataset will continuously ingest messages from the topic.
- **Streaming Recipes:** You use special streaming-compatible recipes (like "Stream with Python") to process this data in real-time. These recipes operate on micro-batches of messages.
- **Output:** The output of a streaming recipe can be another Kafka topic or a standard dataset (e.g., writing aggregated results to a database every minute).`,
  },
  {
    id: 282,
    slug: 'prometheus-monitoring-integration',
    question: 'How can I monitor Dataiku with Prometheus?',
    answer: `### 1. Introduction/Overview
Prometheus is a popular open-source monitoring and alerting system. Dataiku can expose its internal metrics in a format that Prometheus can understand.

### 2. Setup
1.  **Enable JMX Exporter:** A Dataiku administrator enables the JMX (Java Management Extensions) exporting feature. This exposes a huge number of internal Dataiku metrics (like job counts, memory usage, CPU load) on a specific port.
2.  **Configure Prometheus:** You configure your Prometheus server to "scrape" this endpoint on the Dataiku instance at regular intervals.
3.  **Visualize in Grafana:** You can then use Grafana to connect to Prometheus and build dashboards to visualize Dataiku's health and performance over time.`,
  },
  {
    id: 283,
    slug: 'vertex-ai-integration',
    question: 'How does Dataiku integrate with Google Cloud\'s Vertex AI?',
    answer: `### 1. Introduction/Overview
Dataiku can act as an orchestrator and user-friendly front-end for Google's Vertex AI services.

### 2. Integration Methods
- **Plugin for AutoML:** There is a plugin that provides visual recipes to train a model using Vertex AI's AutoML Tables and then get predictions from the deployed model.
- **Python Recipes for Custom Models:** You can use the \`google-cloud-aiplatform\` Python library in a Python recipe to programmatically control Vertex AI. This allows you to submit custom training jobs, manage endpoints, and get predictions, all from within a Dataiku Flow.`,
  },
  {
    id: 284,
    slug: 'sagemaker-integration',
    question: 'How does Dataiku integrate with Amazon SageMaker?',
    answer: `### 1. Introduction/Overview
Similar to Vertex AI, Dataiku can orchestrate Amazon SageMaker, combining Dataiku's ease of use with SageMaker's powerful ML infrastructure.

### 2. Integration Methods
- **Plugin for AutoML:** Dataiku provides a plugin with visual recipes for interacting with SageMaker Autopilot.
- **Python Recipes for Custom Models:** The most common method. Use the \`boto3\` (AWS SDK for Python) library in a Python recipe to launch SageMaker training jobs, create model endpoints, and invoke them for predictions. This allows you to integrate SageMaker's capabilities into a broader Dataiku data pipeline.`,
  },
  {
    id: 285,
    slug: 'azure-ml-integration',
    question: 'How does Dataiku integrate with Azure Machine Learning?',
    answer: `### 1. Introduction/Overview
Dataiku can integrate with Azure ML to leverage its training and deployment capabilities.

### 2. Integration Methods
- **Plugin:** There is a plugin with visual recipes for training models on Azure ML and deploying them as web services.
- **Python Recipes:** Use the Azure ML SDK for Python (\`azureml-sdk\`) in a Python recipe to have full programmatic control over your Azure ML workspace. You can submit experiments, register models, and deploy them, all orchestrated by a Dataiku scenario.`,
  },
  {
    id: 286,
    slug: 'external-data-node-edn',
    question: 'What is an External Data Node (EDN) and when is it used?',
    answer: `### 1. Introduction/Overview
An EDN is a specific architecture pattern for connecting Dataiku to data sources that are in a highly restricted network environment where the main Dataiku instance cannot reach them.

### 2. How it Works
- The EDN is a small, separate Dataiku instance that is installed inside the restricted network zone.
- It is configured to communicate with the main Dataiku instance.
- A user on the main instance can browse and query data through the EDN. The EDN executes the query locally within the secure network and only sends the results back to the user's browser on the main instance. This ensures that the raw sensitive data never leaves the secure network zone.`,
  },
  {
    id: 287,
    slug: 'r-integration-details',
    question: 'How does R integration work in Dataiku?',
    answer: `### 1. Introduction/Overview
R is a first-class citizen in Dataiku for statistical computing and visualization.

### 2. Integration Points
- **R Recipes:** Write R code (using libraries like \`dplyr\` and \`data.table\`) to transform data in the Flow.
- **R Notebooks:** Use an interactive R notebook environment for exploration.
- **R in Visual ML:** You can choose R-based algorithms (via the \`caret\` library) in the Visual ML lab.
- **Shiny Webapps:** Build and host interactive R Shiny web applications directly within Dataiku.
- **Code Environments:** Dataiku manages R dependencies (packages from CRAN or internal repositories) through its code environment system.`,
  },
  {
    id: 288,
    slug: 'dbt-integration',
    question: 'How can Dataiku and dbt (data build tool) be used together?',
    answer: `### 1. Introduction/Overview
Dataiku and dbt can be used together to cover the full analytics lifecycle, with dbt handling in-warehouse SQL transformation and Dataiku handling advanced analytics, ML, and business user access.

### 2. Common Patterns
- **Dataiku Orchestrates dbt:** Use a Dataiku plugin or a Python recipe to trigger a \`dbt run\` command. Dataiku acts as the high-level orchestrator, running the dbt transformations first and then consuming the resulting tables for ML tasks.
- **dbt Creates Tables for Dataiku:** dbt is used by analytics engineers to create clean, reliable data models in the data warehouse. Dataiku users then connect to these dbt-produced tables as their starting point, ensuring they are working from a trusted data foundation.`,
  },
  {
    id: 289,
    slug: 'exposing-dss-as-sql-database',
    question: 'Can I expose a Dataiku dataset as a virtual SQL database endpoint?',
    answer: `### 1. Introduction/Overview
Yes, Dataiku has a feature that allows it to expose datasets via a standard PostgreSQL server protocol.

### 2. How it Works
- An administrator enables this feature in the global settings.
- This starts a process on the Dataiku server that listens on a specific port and behaves like a PostgreSQL database.
- External tools (like Tableau, Power BI, or any SQL client) can then connect to this endpoint using a standard PostgreSQL driver.
- When the external tool runs a query, Dataiku executes that query against the underlying dataset (wherever it's stored) and returns the results. This provides a universal SQL interface to any Dataiku dataset.`,
  },
  {
    id: 290,
    slug: 'microsoft-teams-integration',
    question: 'How do I send notifications to a Microsoft Teams channel?',
    answer: `### 1. Introduction/Overview
This works very similarly to the Slack integration, using scenario reporters.

### 2. Setup
1.  **Admin Configures Webhook:** In Microsoft Teams, configure an "Incoming Webhook" connector for your desired channel and get the URL.
2.  In Dataiku, an administrator goes to **Administration > Settings > Message Channels** and adds a new channel, selecting "Microsoft Teams" and pasting the webhook URL.
3.  **Use in Scenario:** In your scenario's **Reporters** tab, add a reporter to send a message to the configured Teams channel.`,
  },
  {
    id: 291,
    slug: 'using-h2o-sparkling-water',
    question: 'How can I use H2O Sparkling Water in Dataiku?',
    answer: `### 1. Introduction/Overview
H2O Sparkling Water allows you to use the H2O machine learning library on top of a Spark cluster. Dataiku can integrate with this for large-scale, distributed model training.

### 2. How to Use
1.  **Admin Setup:** An administrator needs to set up a code environment that includes the H2O Sparkling Water libraries.
2.  **Python Recipe/Notebook:** In a Python recipe or notebook, you write code to initialize an H2O context.
3.  You can then convert a Spark DataFrame into an H2O Frame and use H2O's algorithms (like GBM, Deep Learning) to train a model in a distributed fashion on your Spark cluster.`,
  },
  {
    id: 292,
    slug: 'api-designer-overview',
    question: 'What is the API Designer?',
    answer: `### 1. Introduction/Overview
The API Designer is the component in Dataiku where you define and design real-time API services before they are deployed.

### 2. Key Functions
- **Service Creation:** You create an API service, which is a container for one or more endpoints.
- **Endpoint Definition:** You add endpoints to your service. An endpoint can be:
    - **A prediction endpoint:** Exposes a trained ML model.
    - **A dataset lookup endpoint:** Exposes a dataset for key-value lookups.
    - **A custom Python endpoint:** Runs custom Python code.
- **Testing:** The API Designer provides a user interface to test your endpoints with sample data before deploying them.`,
  },
  {
    id: 293,
    slug: 'python-code-in-visual-recipe',
    question: 'What is the "Python function" processor in a Prepare recipe?',
    answer: `### 1. Introduction/Overview
The "Python function" processor is a powerful feature that allows you to embed custom, row-level Python logic directly into a visual Prepare recipe.

### 2. How it Works
- You add it as a step in your Prepare recipe.
- Dataiku provides a template function \`def process(row): ...\`.
- The \`row\` object is a dictionary-like representation of the current row being processed.
- You can write any Python code inside this function to compute a new value, which is then returned and placed in your specified output column.
- This is very efficient as it avoids the overhead of a full Python recipe when you only need a small piece of custom logic.`,
  },
  {
    id: 294,
    slug: 'jdbc-drivers-for-db',
    question: 'How do I add a JDBC driver for an unsupported database?',
    answer: `### 1. Introduction/Overview
Dataiku connects to databases using JDBC drivers. If you have a database that isn't listed by default, you can add its driver.

### 2. Steps
1.  **Obtain the Driver:** Download the JDBC driver JAR file from the database vendor.
2.  **Admin Action:** A Dataiku administrator must place this JAR file into a specific folder within the Dataiku Data Directory (\`DATA_DIR/lib/jdbc\`).
3.  **Restart Dataiku:** The Dataiku instance needs to be restarted for the new driver to be loaded.
4.  **Configure Connection:** After restarting, the newly added driver will be available in the list of database types when creating a new connection.`,
  },
  {
    id: 295,
    slug: 'exporting-to-google-sheets',
    question: 'Can I export a dataset directly to Google Sheets?',
    answer: `### 1. Introduction/Overview
Yes, this is possible using a dedicated plugin.

### 2. How to Use
1.  **Install Plugin:** Install the Google Sheets plugin from the plugin store.
2.  **Configure Connection:** An administrator sets up a connection to Google using OAuth 2.0.
3.  **Use Exporter:** From your dataset, go to the **Export** tab and you will see an option to "Export to Google Sheets". You can specify the spreadsheet and sheet name.
4.  **Use Recipe:** The plugin also provides a visual recipe to write data to Google Sheets as part of a Flow.`,
  },
  {
    id: 296,
    slug: 'what-are-macros',
    question: 'What are macros in Dataiku?',
    answer: `### 1. Introduction/Overview
Macros are a way to create custom, reusable actions that can be triggered manually from a scenario or a dashboard.

### 2. Use Cases
- **Custom Buttons:** You can create a button on a dashboard that, when clicked, runs a macro.
- **Example:** A macro could take a user-provided input from a dashboard, use that input to run a specific Python script (e.g., retrain a model for a specific country), and then display the result.
- **Scenario Control:** A macro can provide a user-friendly way to trigger a specific scenario with custom parameters.`,
  },
  {
    id: 297,
    slug: 'kuberentes-and-dataiku',
    question: 'How is Kubernetes used with Dataiku?',
    answer: `### 1. Introduction/Overview
Kubernetes is a container orchestration platform that is central to running Dataiku in a scalable and resilient way.

### 2. Two Main Uses
1.  **Running the Dataiku Application:** The Dataiku platform itself (the backend, frontend, etc.) can be deployed on a Kubernetes cluster. This allows for high availability and easy scaling of the core Dataiku services.
2.  **Containerized Execution for Recipes:** Dataiku can be configured to run user jobs (like Python or R recipes) in separate pods on a Kubernetes cluster. This isolates jobs from each other and allows for massive parallel execution by letting Kubernetes manage the scheduling and scaling of resources.`,
  },
  {
    id: 298,
    slug: 'dataiku-and-docker',
    question: 'How does Dataiku use Docker?',
    answer: `### 1. Introduction/Overview
Docker is the container technology that underlies Dataiku's containerized execution features.

### 2. How it's Used
- When a user runs a recipe that is configured for containerized execution, Dataiku tells the container engine (which could be a local Docker daemon or a Kubernetes cluster) to start a new Docker container.
- This container is created from a specific Docker image that has the correct code environment (Python/R version and libraries) installed.
- The recipe code runs inside this isolated Docker container. This ensures that every job runs in a consistent and reproducible environment.`,
  },
  {
    id: 299,
    slug: 'using-private-python-packages',
    question: 'How can I use private Python packages from my company\'s internal repository?',
    answer: `### 1. Introduction/Overview
You can configure Dataiku's code environments to pull packages from a private repository (like Artifactory or Nexus) instead of the public PyPI.

### 2. Setup
- **Admin Configuration:** A Dataiku administrator modifies the code environment settings.
- **Pip Configuration:** They will configure the underlying \`pip\` command to trust and use the internal repository's URL. This is typically done by setting the \`PIP_INDEX_URL\` and \`PIP_EXTRA_INDEX_URL\` environment variables for the Dataiku instance.
- Once configured, when you add a package to a code environment, Dataiku will be able to fetch it from your private repository.`,
  },
  {
    id: 300,
    slug: 'calling-dss-api-from-postman',
    question: 'How do I call a Dataiku API from Postman?',
    answer: `### 1. Introduction/Overview
You can test any Dataiku API endpoint using a tool like Postman.

### 2. Steps
1.  **Get API Key:** Generate an API key from your Dataiku profile.
2.  **Set Authentication:** In Postman, go to the **Authorization** tab. Select **Basic Auth**. For the **Username**, enter your API key. Leave the **Password** blank.
3.  **Set Headers:** Add a \`Content-Type\` header with a value of \`application/json\`.
4.  **Make Request:** Enter the full URL of your API endpoint, select the correct HTTP method (e.g., POST), provide a JSON body if required, and send the request.`,
  },
  {
    id: 301,
    slug: 'aws-iam-integration',
    question: 'How does Dataiku integrate with AWS IAM for authentication?',
    answer: `### 1. Introduction/Overview
Using IAM (Identity and Access Management) roles is the most secure way for Dataiku to access AWS resources like S3.

### 2. How it Works
1.  **Create IAM Role:** An AWS administrator creates an IAM role with policies that grant the necessary permissions (e.g., read/write access to a specific S3 bucket).
2.  **Attach to EC2:** This IAM role is attached to the EC2 instance where Dataiku is running.
3.  **Configure DSS Connection:** In Dataiku, when configuring the S3 connection, the administrator selects "Use instance/role credentials".
4.  Dataiku will then automatically use the temporary credentials provided by the IAM role to access S3. This avoids having to store long-lived AWS access keys in Dataiku.`,
  },
  {
    id: 302,
    slug: 'gcp-service-account-integration',
    question: 'How does Dataiku use Google Cloud Platform (GCP) Service Accounts?',
    answer: `### 1. Introduction/Overview
Service Accounts are the standard way for applications like Dataiku to authenticate with GCP services.

### 2. How it Works
1.  **Create Service Account:** A GCP administrator creates a service account and grants it the necessary IAM roles (e.g., "Storage Object Admin" for GCS access).
2.  **Generate JSON Key:** The administrator generates a JSON key file for this service account.
3.  **Configure DSS Connection:** In Dataiku, when setting up a GCS or BigQuery connection, the administrator provides this JSON key file. Dataiku uses the key to authenticate as the service account and perform actions on its behalf.`,
  },
  {
    id: 303,
    slug: 'azure-service-principal-integration',
    question: 'How does Dataiku use Azure Service Principals?',
    answer: `### 1. Introduction/Overview
A Service Principal is an identity created for applications to access Azure resources.

### 2. How it Works
1.  **Create Service Principal:** An Azure administrator creates a Service Principal in Azure Active Directory and grants it roles on the resources Dataiku needs to access (e.g., "Storage Blob Data Contributor" on a storage account).
2.  **Get Credentials:** The administrator gets the Tenant ID, Client ID, and a Client Secret for the Service Principal.
3.  **Configure DSS Connection:** In Dataiku, when configuring a connection to an Azure service (like Blob Storage), the administrator provides these credentials. Dataiku uses them to authenticate and access the resource.`,
  },
  {
    id: 304,
    slug: 'hive-integration',
    question: 'How does Dataiku work with Apache Hive?',
    answer: `### 1. Introduction/Overview
Hive is a data warehouse software built on top of Hadoop for providing data query and analysis. Dataiku has deep integration with Hive.

### 2. Integration
- **Connection:** Dataiku connects to the Hive server (usually HiveServer2).
- **In-Database Execution:** Dataiku's visual recipes are translated into HiveQL queries for in-database processing.
- **Execution Engine:** You can configure Hive as the execution engine for recipes, leveraging the underlying MapReduce or Tez engine of the Hadoop cluster.
- **HDFS Data:** Dataiku can read and write data directly to HDFS, which is the storage layer for Hive.`,
  },
  {
    id: 305,
    slug: 'impala-integration',
    question: 'How does Dataiku integrate with Apache Impala?',
    answer: `### 1. Introduction/Overview
Impala is a high-performance, distributed SQL query engine for data stored in Hadoop.

### 2. Integration
- The integration is very similar to Hive. Dataiku connects to the Impala daemon.
- Visual recipes are converted into Impala-compatible SQL.
- This allows for fast, interactive querying on large datasets stored in HDFS or other Hadoop-compatible filesystems. The key difference from Hive is that Impala is designed for lower-latency, ad-hoc queries.`,
  },
  {
    id: 306,
    slug: 'presto-db-integration',
    question: 'How does Dataiku integrate with PrestoDB?',
    answer: `### 1. Introduction/Overview
Presto is a distributed SQL query engine designed for fast analytic queries against data sources of all sizes.

### 2. Integration
- **Connection:** Dataiku connects to the Presto coordinator using a JDBC driver.
- **Federated Queries:** A key feature of Presto is its ability to query multiple data sources at once. You can use a Presto connection in Dataiku to write SQL queries that join data from Hive, a relational database, and other sources in a single query.
- **In-Database Processing:** Visual recipes running on a Presto connection are pushed down for execution on the Presto cluster.`,
  },
  {
    id: 307,
    slug: 'elasticsearch-integration',
    question: 'Can I connect to Elasticsearch from Dataiku?',
    answer: `### 1. Introduction/Overview
Yes, you can connect to Elasticsearch using a dedicated plugin.

### 2. How to Use
1.  **Install Plugin:** Install the Elasticsearch plugin from the store.
2.  **Configure Connection:** Set up a connection to your Elasticsearch cluster.
3.  **Create Dataset:** You can then create a dataset that queries an Elasticsearch index. You can write a query using the Elasticsearch Query DSL to specify the data you want to retrieve.
4.  **Write Data:** The plugin also provides a recipe to write data from a Dataiku dataset into an Elasticsearch index.`,
  },
  {
    id: 308,
    slug: 'mongodb-integration',
    question: 'How do I connect to MongoDB?',
    answer: `### 1. Introduction/Overview
Dataiku has a plugin for connecting to the NoSQL database MongoDB.

### 2. How to Use
1.  **Install Plugin:** Install the MongoDB plugin.
2.  **Configure Connection:** Set up a connection to your MongoDB instance.
3.  **Read Data:** Create a dataset that reads from a MongoDB collection. The semi-structured JSON documents from Mongo will be flattened into a tabular format.
4.  **Write Data:** Use the provided recipe to write a Dataiku dataset to a MongoDB collection.`,
  },
  {
    id: 309,
    slug: 'cassandra-integration',
    question: 'How does Dataiku integrate with Apache Cassandra?',
    answer: `### 1. Introduction/Overview
A dedicated plugin allows Dataiku to connect to the distributed NoSQL database Cassandra.

### 2. How to Use
- After installing the plugin and configuring the connection, you can create a dataset that reads from a Cassandra table using CQL (Cassandra Query Language).
- You can also use a recipe to write a Dataiku dataset to a Cassandra table.`,
  },
  {
    id: 310,
    slug: 'sap-hana-integration',
    question: 'How do I connect to SAP HANA?',
    answer: `### 1. Introduction/Overview
Dataiku can connect to SAP HANA using its JDBC driver.

### 2. Integration
- **Add Driver:** An administrator adds the SAP HANA JDBC driver (\`ngdbc.jar\`) to the Dataiku library.
- **Configure Connection:** Set up a new database connection, selecting the HANA driver.
- **In-Database Processing:** Once connected, you can use SAP HANA as a source or destination for datasets, and Dataiku will push down SQL processing to it for high performance.`,
  },
  {
    id: 311,
    slug: 'odbc-connections',
    question: 'Can I use ODBC to connect to a data source?',
    answer: `### 1. Introduction/Overview
While JDBC is the primary method for database connections, Dataiku can also use ODBC (Open Database Connectivity) in some cases.

### 2. How it Works
- This is a more advanced setup. An administrator needs to install and configure the necessary ODBC drivers on the Dataiku server itself.
- You would then typically use a Python recipe with a library like \`pyodbc\` to connect to the data source and fetch the data into a Pandas DataFrame.`,
  },
  {
    id: 312,
    slug: 'creating-a-custom-chart-plugin',
    question: 'How do I create a custom chart type as a plugin?',
    answer: `### 1. Introduction/Overview
If you need a specific visualization that isn't available in Dataiku's built-in charts (e.g., a Sankey diagram or a Sunburst chart), you can create one as a plugin.

### 2. Development
- This is an advanced development task that requires knowledge of web technologies (JavaScript, HTML, CSS).
- You create a plugin with the **Chart** component.
- You will need to write JavaScript code (often using a library like D3.js or ECharts) that takes data from a Dataiku dataset and renders it as a chart.`,
  },
  {
    id: 313,
    slug: 'atlassian-confluence-integration',
    question: 'Can I export Dataiku content to Atlassian Confluence?',
    answer: `### 1. Introduction/Overview
Yes, there is a plugin for integrating with Confluence.

### 2. How to Use
- After installing the plugin and configuring the connection to your Confluence instance, it provides an **Exporter**.
- You can export a Dataiku Dashboard or a Wiki article.
- The plugin will convert the Dataiku content into Confluence page format and publish it to the specified Confluence space. This is great for sharing results with a wider business audience.`,
  },
  {
    id: 314,
    slug: 'what-is-a-custom-trigger-plugin',
    question: 'What is a custom trigger plugin?',
    answer: `### 1. Introduction/Overview
A custom trigger plugin allows you to define a new type of trigger for starting a scenario, beyond the built-in time-based or dataset-modification triggers.

### 2. Use Case
- Imagine you want to run a scenario only when a specific file appears in an FTP server, or when an external monitoring service sends an "all clear" signal.
- You would develop a plugin with a **Scenario Trigger** component.
- In the plugin's Python code, you write the logic that periodically checks for your custom condition. When the condition is met, your code fires an event that starts the scenario.`,
  },
  {
    id: 315,
    slug: 'what-is-a-custom-reporter-plugin',
    question: 'What is a custom reporter plugin?',
    answer: `### 1. Introduction/Overview
A custom reporter plugin allows you to define a new type of action to be taken when a scenario finishes.

### 2. Use Case
- Suppose you want to send a notification to a system that isn't supported out-of-the-box, like PagerDuty or a custom internal logging service.
- You would develop a plugin with the **Scenario Reporter** component.
- You write the Python code that will be executed when the scenario finishes. This code would receive the scenario's outcome and use it to make a call to your custom service's API.`,
  },
  {
    id: 316,
    slug: 'what-is-a-custom-processor-plugin',
    question: 'What is a custom processor plugin?',
    answer: `### 1. Introduction/Overview
This allows you to create your own reusable data transformation step for the visual Prepare recipe.

### 2. Use Case
- Imagine you have a complex, proprietary data cleaning rule that needs to be applied in many different projects.
- Instead of copying the Python code everywhere, you can package it as a custom processor.
- You define the processor's UI (e.g., which column to operate on) and write the row-level Python logic.
- Once installed, your custom processor appears in the Prepare recipe's library alongside the built-in ones, providing a reusable, user-friendly component.`,
  },
  {
    id: 317,
    slug: 'what-is-a-custom-view-plugin',
    question: 'What is a custom view plugin?',
    answer: `### 1. Introduction/Overview
A custom view plugin allows you to add a new tab to a dataset's view, providing a custom way to visualize or interact with the data.

### 2. Use Case
- Suppose you have a dataset of chemical compounds. You could create a custom view that takes the chemical formula from a row and uses a JavaScript library to render an interactive 3D model of the molecule.
- This requires web development skills (HTML/JavaScript) to create the custom interface.`,
  },
  {
    id: 318,
    slug: 'what-is-a-custom-filesystem-provider-plugin',
    question: 'What is a custom filesystem provider plugin?',
    answer: `### 1. Introduction/Overview
This is an advanced plugin type that allows Dataiku to connect to a storage system that is not natively supported.

### 2. Use Case
- If your company uses a proprietary or uncommon distributed file system, you could write a plugin that teaches Dataiku how to interact with it.
- This involves implementing a set of Python methods for actions like listing files, reading files, writing files, and deleting files for your specific storage system's API.`,
  },
  {
    id: 319,
    slug: 'what-is-a-custom-ml-backend-plugin',
    question: 'What is a custom ML backend plugin?',
    answer: `### 1. Introduction/Overview
This advanced plugin type allows you to integrate an external machine learning service into Dataiku's Visual ML lab.

### 2. Use Case
- Suppose you want to use a specific cloud-based AutoML service directly from the Visual ML interface.
- You would develop a plugin that implements the necessary Python classes to:
    - Send the training data to the external service.
    - Trigger the training job.
    - Retrieve the results and performance metrics.
    - Get predictions from the trained model.
- This would make the external service appear as just another algorithm you can select and train within the standard Visual ML workflow.`,
  },
  {
    id: 320,
    slug: 'what-is-a-custom-secrets-backend-plugin',
    question: 'What is a custom secrets backend plugin?',
    answer: `### 1. Introduction/Overview
This allows Dataiku to integrate with a secret management system that isn't supported out-of-the-box.

### 2. Use Case
- If your company uses a specific internal or open-source secret management tool, you can write a plugin to connect to it.
- This involves implementing a Python backend that knows how to query your secret store's API to retrieve credentials at runtime.
- Once configured by an administrator, this allows for secure, centralized management of all secrets used by Dataiku.`,
  },
  {
    id: 321,
    slug: 'exporting-notebooks-as-recipes',
    question: 'How do I convert a Jupyter notebook into a recipe?',
    answer: `### 1. Introduction/Overview
After exploring in a notebook, you should convert the finalized code into a recipe to make it a formal, repeatable part of your Flow.

### 2. How to Do It
1.  In your Jupyter notebook in Dataiku, go to the **Code** menu.
2.  Select **Create Python recipe**.
3.  Dataiku will automatically convert your notebook cells into a single Python script.
4.  It will also automatically detect which datasets you read from and write to and set them as the recipe's inputs and outputs.
5.  This creates a new Python recipe in your Flow, turning your exploratory work into a production-ready component.`,
  },
  {
    id: 322,
    slug: 'exposing-python-function-as-api',
    question: 'How do I expose a simple Python function as an API endpoint?',
    answer: `### 1. Introduction/Overview
The API Designer makes it easy to wrap a Python function in a real-time API.

### 2. Steps
1.  In your project, go to the **API Designer**.
2.  Create a new API Service.
3.  Click **+ Add Endpoint** and select **Custom prediction endpoint (Python)**.
4.  Dataiku provides a template class. In the \`predict()\` method of this class, you can call your desired Python function.
5.  The function receives the request payload, performs its calculation, and returns a JSON object.
6.  Deploy the service to the API Deployer to make it live.`,
  },
  {
    id: 323,
    slug: 'dataiku-and-mqtt',
    question: 'Can Dataiku connect to an MQTT broker?',
    answer: `### 1. Introduction/Overview
MQTT is a lightweight messaging protocol often used for IoT data. While there isn't a dedicated built-in connector, you can connect to an MQTT broker using a Python recipe.

### 2. How to Do It
1.  In a Python recipe, use a standard Python MQTT library, such as \`paho-mqtt\`.
2.  Write code to subscribe to an MQTT topic.
3.  Your script can listen for messages, collect them in batches, and then write them to a Dataiku dataset.
4.  This recipe could be run continuously as part of a streaming pipeline or on a schedule to collect data periodically.`,
  },
  {
    id: 324,
    slug: 'dataiku-and-osisoft-pi',
    question: 'How can Dataiku connect to an OSIsoft PI System?',
    answer: `### 1. Introduction/Overview
The OSIsoft PI System is a widely used historian for industrial process data.

### 2. Integration Methods
- **JDBC/ODBC:** OSIsoft provides a PI JDBC Driver and PI ODBC Driver. An administrator can install one of these drivers on the Dataiku server, allowing you to connect to the PI System as a standard database connection and query tag data using SQL.
- **Python libraries:** You can use a Python recipe with a library specifically designed to interact with the PI Web API to read and write data programmatically.
- **Plugin:** There may be community or third-party plugins available that provide a more user-friendly connector.`,
  },
  {
    id: 325,
    slug: 'dataiku-and-neo4j',
    question: 'How can I integrate Dataiku with the graph database Neo4j?',
    answer: `### 1. Introduction/Overview
Integrating with a graph database like Neo4j allows you to perform graph-specific analysis that isn't possible with tabular data.

### 2. How to Do It
- **Python Recipe:** The most common method is to use a Python recipe.
- **Use Driver:** Use the official Neo4j Python driver (\`neo4j\`) to connect to your Neo4j instance.
- **Read/Write Data:**
    - **Writing:** You can take a tabular dataset from Dataiku (e.g., a list of transactions) and write Python code to convert it into nodes and relationships and load it into Neo4j.
    - **Reading:** You can run a Cypher query against Neo4j, get the results, and write them back to a tabular Dataiku dataset for further analysis or to join with other data.`,
  },
];
