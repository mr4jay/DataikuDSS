import type { Question } from './questions';

export const mlopsQuestions: Question[] = [
  {
    id: 76,
    slug: 'ci-cd-for-dss',
    question: 'How do you implement CI/CD (Continuous Integration/Continuous Deployment) with Dataiku DSS?',
    answer: `### 1. Introduction/Overview
CI/CD in Dataiku involves automating the process of moving a project from a development environment to testing, and finally to production. This is typically managed by an external tool like Jenkins, GitLab CI, or GitHub Actions, which interacts with Dataiku via its API.

### 2. Core Workflow
1.  **Version Control (CI):** The Dataiku project on the Design node is linked to a Git repository. Developers commit their changes to Git.
2.  **Trigger:** A new commit to the main branch triggers the CI/CD pipeline (e.g., a Jenkins job).
3.  **Create Bundle:** The pipeline uses the Dataiku API to create a project bundle from the development project.
4.  **Deploy to Test/QA:** The bundle is deployed to a dedicated Test/QA Dataiku node.
5.  **Run Tests:** The pipeline triggers scenarios on the Test node that run automated checks (e.g., data validation, model performance checks).
6.  **Approval Gate:** If tests pass, there's often a manual approval step before deploying to production.
7.  **Deploy to Production (CD):** Upon approval, the same bundle is deployed to the Automation node, and the API Deployer is updated with the new model version.`,
  },
  {
    id: 77,
    slug: 'design-vs-automation-node',
    question: 'What is the strategic difference between a Design node, an Automation node, and an API node?',
    answer: `### 1. Introduction/Overview
This separation of nodes is a best practice for production-grade MLOps architecture.

### 2. Node Roles
- **Design Node:** This is the interactive environment for developers. It's where data scientists and analysts explore data, build flows, and create models. It is not meant for production workloads.
- **Automation Node:** A non-interactive node optimized for running scheduled batch jobs (scenarios). It receives project bundles from the Design node and runs them reliably. Its resources are dedicated to data processing, not user interaction.
- **API Node:** A non-interactive node specifically for hosting real-time prediction models as API services. It is optimized for low-latency, high-availability serving and is separate from the Automation node to ensure that long-running batch jobs don't impact the performance of live APIs.`,
  },
  {
    id: 78,
    slug: 'project-bundle-contents',
    question: 'What is included in a project bundle? What is NOT included?',
    answer: `### 1. Introduction/Overview
A project bundle is a snapshot of your project's design and configuration.

### 2. What's Included:
- The entire Flow (datasets, recipes, managed folders).
- All Lab artifacts (Visual Analyses, ML models).
- Scenarios, dashboards, and wikis.
- Project-level settings, variables, and code environments configuration.

### 3. What's NOT Included:
- **The actual data** inside your datasets. The bundle only contains the metadata and pointers to the data connections.
- **Data from managed folders.**
- **Global settings:** Instance-level connections, users, and security settings are not part of the bundle. The connections must pre-exist on the target instance.
- **The history** of recipe edits or scenario runs.`,
  },
  {
    id: 79,
    slug: 'governance-in-dss',
    question: 'How does Dataiku support data and model governance?',
    answer: `### 1. Introduction/Overview
Dataiku provides several features to help organizations govern their data and ML assets.

### 2. Key Governance Features
- **Data Catalog:** A central, searchable inventory of all datasets, showing metadata, tags, and usage statistics.
- **Sign-off and Approvals:** You can require a formal sign-off from designated users before a project can be bundled and moved to production.
- **Permissions:** Granular, role-based access control for projects, connections, and other resources.
- **Audit Trail:** The timeline on the project homepage and detailed job logs provide a complete audit trail of all activities.
- **Model Documentation:** When you train a model, Dataiku automatically generates a rich report detailing its design, features, and performance, which is essential for regulatory review.`,
  },
  {
    id: 80,
    slug: 'managing-api-versions',
    question: 'How do you manage different versions of a model API in the API Deployer?',
    answer: `### 1. Introduction/Overview
The API Deployer is designed for safe, controlled version management.

### 2. Versioning Workflow
1.  When you deploy a new version of your model from the Design node, it appears in the API Deployer as a new version within your API service.
2.  It is initially in an "inactive" state. You can run tests against this new version's internal URL without affecting the live version.
3.  Once validated, you can **"Activate"** the new version. The API Deployer will seamlessly switch the live endpoint to point to the new model version with zero downtime.
4.  You can easily roll back to a previous version by simply activating an older, stable version if the new one has issues.`,
  },
  {
    id: 81,
    slug: 'monitoring-deployed-model-performance',
    question: 'How do I monitor the performance of a deployed model over time?',
    answer: `### 1. Introduction/Overview
Monitoring is key to detecting model drift and ensuring ongoing value.

### 2. Monitoring Techniques
- **Model Evaluation Recipe:** Create a scenario that runs a **Model Evaluation** recipe on a regular basis. This recipe takes recent production data (including the actual outcomes) and compares the model's predictions against them, logging performance metrics like accuracy, AUC, etc., over time.
- **Data Drift Monitoring:** Use a scenario with steps to check for data drift. This involves comparing the statistical distributions of the input features in recent scoring data against the original training data. Dataiku provides built-in tools for this.
- **Dashboarding:** Create a dashboard that visualizes the outputs of your monitoring scenarios, showing trends in model performance and data drift over time.`,
  },
  {
    id: 82,
    slug: 'project-sync-vs-bundles',
    question: 'What is the difference between using Project Bundles and Project Sync?',
    answer: `### 1. Introduction/Overview
Both are for moving projects, but they serve different use cases.
- **Project Bundles:** This is the standard, recommended method for production deployment. It creates a static, versioned artifact (\`.zip\`) that can be deployed, tested, and archived. It's ideal for a controlled CI/CD process.
- **Project Sync:** This feature directly synchronizes a project from one Dataiku instance to another. It's best used for one-off or ad-hoc synchronization, like creating a quick copy of a project for a colleague. It's generally not recommended for automated production deployments because it's less controlled and doesn't create a persistent, versioned artifact.`,
  },
  {
    id: 83,
    slug: 'code-env-best-practices',
    question: 'What are the best practices for managing code environments in a production setting?',
    answer: `### 1. Introduction/Overview
Proper code environment management is crucial for reproducibility and avoiding dependency conflicts.

### 2. Best Practices
- **Project-Specific Environments:** Always create a dedicated code environment for each project. Avoid using the global, built-in environment.
- **Version Pinning:** Pin the exact versions of your libraries (e.g., \`pandas==1.3.5\`). Do not use open-ended versions (\`pandas>=1.0\`), as this can lead to unexpected behavior when the environment is rebuilt.
- **Export and Version Control:** Export the code environment's definition (\`spec.json\`) and store it in your project's Git repository. This ensures that the environment itself is version-controlled along with your project code.
- **Minimalism:** Only include the packages that your project actually needs. Avoid creating bloated environments with unnecessary libraries.`,
  },
  {
    id: 84,
    slug: 'what-is-a-plugin-preset',
    question: 'What is a plugin preset and how is it used in MLOps?',
    answer: `### 1. Introduction/Overview
A **plugin preset** allows an administrator to pre-configure the settings for a plugin (like credentials for a specific cloud service) and make it available to users.

### 2. How it's Used in MLOps
This is important for separating configurations between environments. For example, a plugin that connects to an S3 bucket can have:
- A "dev" preset on the Design node that points to a development S3 bucket.
- A "prod" preset on the Automation node that points to a production S3 bucket.

When you use the plugin in your Flow, you select the preset you want to use. When the project is bundled and deployed, it retains this reference. The target node then automatically uses the correct credentials for its environment, without you having to hardcode them.`,
  },
  {
    id: 85,
    slug: 'automating-data-quality-checks',
    question: 'How do you automate data quality checks in a production pipeline?',
    answer: `### 1. Introduction/Overview
Automated data quality checks are essential for reliable pipelines. This is done using Metrics and Checks within a scenario.

### 2. Workflow
1.  On a key dataset in your Flow, go to the **Status** tab and define your **Metrics** (e.g., row count, valid phone numbers, average of a column).
2.  For each metric, define a **Check** (e.g., "Row count must be > 0", "Percentage of valid phone numbers must be > 95%").
3.  In your production scenario, add a "Build" step for this dataset. In the step's settings, enable the "Compute metrics" and "Check checks" options.
4.  You can configure the scenario to **fail** if any of the checks fail. This stops the pipeline and prevents bad data from propagating downstream.
5.  Use a **Reporter** step in the scenario to send an alert (e.g., an email) when a failure occurs.`,
  },
  {
    id: 86,
    slug: 'infrastructure-as-code-for-dss',
    question: 'Can you manage Dataiku DSS infrastructure as code?',
    answer: `### 1. Introduction/Overview
Yes, this is a common practice for advanced MLOps. Dataiku provides tools to manage its configuration programmatically.

### 2. How it Works
- **Dataiku Command-Line Tool (dkudeployer):** This tool allows you to script the deployment of project bundles, the update of API services, and other administrative tasks.
- **Public API:** Nearly every action you can perform in the UI can also be performed via Dataiku's comprehensive REST API.
- **Configuration-as-Code:** You can manage the configuration of Dataiku itself (e.g., connections, users, security settings) as code by scripting API calls. This allows you to stand up a new Dataiku instance and configure it automatically, ensuring consistency across environments.`,
  },
  {
    id: 87,
    slug: 'what-is-a-model-registry',
    question: 'Does Dataiku have a model registry?',
    answer: `### 1. Introduction/Overview
Yes, the **Saved Models** in a project and the **API Deployer** together function as a model registry.

### 2. How it Functions as a Registry
- **Central Inventory:** All deployed models (green diamonds) within a project are listed, versioned, and documented. This provides a central place to see all production models.
- **Versioning:** Every time you retrain and redeploy a model, it creates a new, distinct version. You can see the full history and compare versions.
- **Metadata:** Each model version stores rich metadata, including its training data, performance metrics, feature importance, and a link to the original experiment in the Lab.
- **Lifecycle Management:** The API Deployer manages the lifecycle of these model versions, controlling which one is active and serving traffic.`,
  },
  {
    id: 88,
    slug: 'canary-deployments-blue-green',
    question: 'How can you perform canary or blue-green deployments for models in Dataiku?',
    answer: `### 1. Introduction/Overview
These advanced deployment strategies allow you to release new models with reduced risk.

### 2. How to Implement
- **Canary Deployment:** In the API Deployer, you can have two versions of a model active simultaneously. You can then use an external router or load balancer (in front of the Dataiku API node) to direct a small percentage of traffic (e.g., 5%) to the new model version. If it performs well, you can gradually increase the traffic.
- **Blue-Green Deployment:** This involves having two identical production environments ("blue" and "green"). You deploy the new model to the inactive environment (e.g., green), run tests, and then switch the router to direct all traffic to the green environment. The old blue environment becomes the standby.

Dataiku's API Deployer facilitates these strategies by allowing multiple model versions to be active, but the traffic routing itself is typically managed by external infrastructure.`,
  },
  {
    id: 89,
    slug: 'managing-secrets-and-credentials',
    question: 'How should I manage secrets and credentials (e.g., database passwords) in Dataiku?',
    answer: `### 1. Introduction/Overview
Hardcoding credentials is a major security risk. Dataiku provides several secure ways to manage secrets.

### 2. Best Practices
- **Connection-level Credentials:** For standard data connections, the credentials should be configured directly in the connection settings by an administrator. Users with access to the connection can use it without ever seeing the password.
- **Project Variables with Permissions:** You can store secrets in project variables and set the variable's permissions so that it is "hidden" from non-admin users. The value can be used by recipes but not viewed in the UI.
- **External Secret Stores (Most Secure):** The best practice for production is to integrate Dataiku with a dedicated secret management tool like HashiCorp Vault or AWS Secrets Manager. Dataiku can be configured to fetch credentials from these services at runtime, so the secrets are never stored in Dataiku itself.`,
  },
  {
    id: 90,
    slug: 'what-are-instance-templates',
    question: 'What are instance templates?',
    answer: `### 1. Introduction/Overview
An **Instance Template** is a feature for administrators that allows them to define a "template" of global settings (like connections, security settings, global variables) that can be applied to multiple Dataiku instances.

### 2. Use Case
This is primarily used to ensure consistency between different Dataiku nodes. For example, you can create a template with all your standard production database connections and apply it to both your Automation and API nodes. When you need to update a password, you update it in the template, and the change is pushed to all linked instances. This is a key part of managing configuration-as-code.`,
  },
  {
    id: 91,
    slug: 'role-of-data-steward',
    question: 'What is the role of a "Data Steward" in the context of Dataiku?',
    answer: `### 1. Introduction/Overview
A Data Steward is a business-side role responsible for the quality, documentation, and governance of data assets.

### 2. Responsibilities in Dataiku
- **Enriching the Data Catalog:** A data steward would go into the Data Catalog and add descriptive tags, ownership information, and documentation to key datasets.
- **Certifying Datasets:** They can "certify" a dataset, marking it as a trusted, high-quality source of truth for others to use.
- **Defining Standards:** They work with development teams to define and enforce data quality rules and naming conventions.
- **Monitoring Quality:** They use Dataiku's dashboards and metrics to monitor the ongoing quality of critical data assets and investigate any issues.`,
  },
  {
    id: 92,
    slug: 'testing-data-pipelines',
    question: 'What is the best way to test data pipelines in Dataiku?',
    answer: `### 1. Introduction/Overview
Testing is a critical part of MLOps. In Dataiku, this is done using a combination of scenarios and dedicated test projects.

### 2. Testing Strategy
1.  **Unit Tests (in Recipes):** For complex Python recipes, you can use standard Python testing libraries like \`pytest\` to test individual functions. This can be run in a notebook.
2.  **Integration Tests (Scenario Checks):** The most common method. Create a scenario that builds your entire Flow, or a part of it. Use the "Checks" feature on your datasets to validate the output. For example, check that the number of rows is as expected, a key column has no duplicates, or a value is within a valid range.
3.  **Functional Tests (Dedicated Test Project):** For a full CI/CD process, you create a separate "Test Project" on your QA/Test node. This project's purpose is to run more complex validation scenarios. It might take the output of your main project as input and run a series of complex checks or even compare its output to a known-good baseline.`,
  },
  {
    id: 93,
    slug: 'what-is-containerization-dss',
    question: 'How does containerization (e.g., Docker, Kubernetes) work with Dataiku?',
    answer: `### 1. Introduction/Overview
Containerization is the standard way to run Dataiku in production environments for scalability and isolation.

### 2. How it Works
- **Running Recipes in Containers:** An administrator can configure Dataiku so that when a user runs a Python or R recipe, Dataiku dynamically spins up a container (e.g., a Docker container on a Kubernetes cluster) with the correct code environment. The job runs in this isolated container and then shuts down. This provides process isolation and allows for scalable resource allocation.
- **Running the entire DSS instance in Containers:** Dataiku itself can be deployed on a Kubernetes cluster. The main Dataiku services (like the backend and frontend) run as pods, which allows for high availability and easy scaling.`,
  },
  {
    id: 94,
    slug: 'explainable-ai-xai',
    question: 'How does Dataiku support Explainable AI (XAI)?',
    answer: `### 1. Introduction/Overview
Explainable AI (XAI) refers to the tools and methods that help humans understand the results and decisions of machine learning models. Dataiku has strong, built-in XAI capabilities.

### 2. Key XAI Features
- **Global Explanations:** These explain the model's behavior as a whole.
    - **Feature Importance:** Ranks the most influential features.
    - **Partial Dependence Plots:** Shows the relationship between a feature and the prediction.
- **Local Explanations:** These explain individual predictions.
    - **Individual Prediction Explanations (SHAP):** Shows the contribution of each feature value to a specific prediction. This is critical for answering "Why did this customer get this score?".
- **Interactive "What-If" Analysis:** Allows users to change input values and see how the prediction changes in real time.`,
  },
  {
    id: 95,
    slug: 'retraining-vs-recalibrating',
    question: 'What is the difference between retraining and recalibrating a model?',
    answer: `### 1. Introduction/Overview
Both are strategies to combat model drift, but they differ in scope.
- **Retraining:** This involves training the model from scratch on a new, updated dataset that includes recent data. The model learns new patterns and relationships. This is the most common approach and is done by running a "Build / Train" step on the deployed model in a scenario.
- **Recalibrating:** This is a lighter-weight process. It doesn't retrain the entire model. Instead, it takes the existing model and adjusts its output threshold or scaling based on new data. This is useful if the underlying patterns are the same but the distribution of prediction scores has shifted. This is less common and usually requires custom code.`,
  },
  {
    id: 96,
    slug: 'when-to-use-sql-vs-python',
    question: 'In a production pipeline, when should I use a SQL recipe vs. a Python recipe?',
    answer: `### 1. Introduction/Overview
Choosing the right tool is key for performance and maintainability.

### 2. Guidelines
- **Use SQL recipes whenever possible, especially for datasets stored in a database.** SQL is declarative and the computation is "pushed down" to the database, which is highly optimized for filtering, joining, and aggregating large volumes of data. This will almost always be more performant than pulling data into memory.
- **Use Python recipes for tasks that are difficult or impossible in SQL:**
    - Complex, row-by-row custom logic.
    - Interacting with external APIs.
    - Using specific Python libraries for tasks like text processing (e.g., NLTK) or advanced statistics.
    - Data manipulations that are much simpler to express in Pandas.`,
  },
  {
    id: 97,
    slug: 'what-is-a-feature-store',
    question: 'Does Dataiku have a feature store?',
    answer: `### 1. Introduction/Overview
A **feature store** is a central repository for storing, sharing, and managing curated features for machine learning models. While Dataiku doesn't have a separate product called a "Feature Store," it can be used to create and manage one.

### 2. How to Build a Feature Store in Dataiku
1.  Create a dedicated Dataiku **project** to act as your feature store.
2.  In this project, build Flows that connect to raw data sources and perform the necessary computations to create high-quality, documented, and validated features.
3.  The output datasets of this project are your "feature groups." Store them in a high-performance database connection (like Snowflake or Redshift).
4.  Other projects can then connect to and consume these pre-computed features, ensuring consistency and saving redundant work. The Dataiku **Data Catalog** makes these feature groups discoverable across the organization.`,
  },
  {
    id: 98,
    slug: 'data-partitioning-for-performance',
    question: 'How does data partitioning help in MLOps?',
    answer: `### 1. Introduction/Overview
**Partitioning** is the practice of splitting a dataset into smaller, manageable chunks based on a specific dimension, usually time (e.g., one partition per day or month).

### 2. MLOps Benefits
- **Efficient Incremental Builds:** When you run a scenario, you can configure it to only rebuild the partitions that have changed (e.g., only process today's data) instead of rebuilding the entire dataset every time. This dramatically speeds up production pipelines.
- **Efficient Retraining:** You can configure your model retraining scenario to only use the last N partitions (e.g., the last 12 months of data) as the training set, which is much more efficient than reading the entire history.
- **Data Management:** It simplifies data archival and deletion policies (e.g., "delete partitions older than 5 years").`,
  },
  {
    id: 99,
    slug: 'what-are-webapps-in-dss',
    question: 'What are webapps in Dataiku and how do they relate to MLOps?',
    answer: `### 1. Introduction/Overview
A **webapp** in Dataiku allows you to create interactive user interfaces directly within the platform, using technologies like Python (Dash/Streamlit) or R (Shiny).

### 2. Role in MLOps
Webapps are the "last mile" of MLOps, providing a way to deliver insights from your models to business users in an accessible way.
- **Interactive Dashboards:** Create a webapp that allows a user to select different parameters and see how a model's predictions change.
- **"What-If" Tools:** Build a custom tool where a sales manager can input customer characteristics and get a churn prediction from your deployed model.
- **Monitoring Interfaces:** Create a custom webapp to visualize the performance and health of your production models in a user-friendly way.`,
  },
  {
    id: 100,
    slug: 'managing-project-dependencies',
    question: 'My project depends on a dataset from another project. How should I manage this?',
    answer: `### 1. Introduction/Overview
It's common for projects to depend on each other. Dataiku has a formal way to manage this.

### 2. How to Manage
1.  In your project, instead of connecting to the raw data again, you can directly import a dataset from another project. Go to **+ DATASET > Other DSS items > DSS dataset**.
2.  Select the project and the dataset you want to use. This creates a link to the dataset in your Flow.
3.  **Crucially for MLOps:** When you run a scenario in your project that rebuilds this linked dataset, you can configure the build to be "cross-project." This means Dataiku understands the dependency and will first run the necessary upstream job in the other project before running your job. This ensures you are always working with the latest, correct version of the upstream data.`,
  },
];
