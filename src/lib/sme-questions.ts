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
];
