import type { Question } from './questions';

export const automationQuestions: Question[] = [
  {
    id: 61,
    slug: 'deploy-model-as-api-service',
    question: 'How do I deploy a model as a real-time API service?',
    answer: `### 1. Introduction/Overview
Deploying a model as an API service makes it available for real-time predictions from other applications. This is handled by the API Deployer.

### 2. Step-by-Step Instructions
1.  From your project, go to the **Models** page (the target icon) and select your deployed model (green diamond).
2.  In the model's view, click **Publish on API Designer**.
3.  In the API Designer, create a new service or add an endpoint to an existing one.
4.  Configure the endpoint. Dataiku will auto-generate a sample query. You can test it directly in the interface.
5.  Deploy the service to the API Deployer infrastructure. Once deployed, it will have a live URL that external applications can call.`,
  },
  {
    id: 62,
    slug: 'what-are-scenario-reporters',
    question: 'What are scenario reporters and how are they used?',
    answer: `### 1. Introduction/Overview
Reporters are attached to a scenario's termination to send notifications or reports about its execution status.

### 2. Common Reporters
- **Mail:** Sends an email with the run summary, outcome (SUCCESS, FAILED), and any custom messages.
- **Slack/MS Teams:** Sends a notification to a specific channel.
- **Execute SQL:** Logs the scenario run details to a database table.
- **Run another scenario:** Triggers a different scenario, allowing for complex chained workflows.

### 3. How to Configure
1.  Open your scenario.
2.  Go to the **Reporters** tab.
3.  Click **Add Reporter** and choose the type you want.
4.  Configure the reporter settings (e.g., recipient email address, message content). You can use variables to include dynamic information like the run outcome.`,
  },
  {
    id: 63,
    slug: 'how-to-use-metrics-and-checks',
    question: 'How do I use Metrics and Checks?',
    answer: `### 1. Introduction/Overview
Metrics and Checks are features for monitoring data quality and pipeline health over time.
- **Metrics:** Computations that are tracked over time (e.g., row count, average value of a column).
- **Checks:** Conditions that must be true for a job to succeed (e.g., row count must be > 0).

### 2. Step-by-Step Instructions
1.  On a dataset, go to the **Status** tab, then **Metrics**.
2.  Click the **Probes & Checks** sub-tab.
3.  Click **+ Add a Probe**. Select the metric you want to compute (e.g., "Record count").
4.  Optionally, add a **Check** to the probe. For the record count probe, you could add a check that "Value is > 1000".
5.  When you run a scenario that rebuilds this dataset, the metrics will be computed and the checks will be evaluated. If a check fails, the job can be set to fail.`,
  },
  {
    id: 64,
    slug: 'what-are-triggers-for-scenarios',
    question: 'What are the different types of triggers for scenarios?',
    answer: `### 1. Introduction/Overview
Triggers define when a scenario should automatically run.

### 2. Common Trigger Types
- **Time-based:** The most common type. Runs on a schedule (e.g., "every hour", "every Monday at 9 AM").
- **Dataset modification:** Triggers when an input dataset is updated or modified. This is useful for event-driven workflows.
- **SQL query change:** Triggers when the result of a specific SQL query changes.
- **Manual:** The scenario can only be run manually.
- **API call:** The scenario is triggered by an external call to the Dataiku API.`,
  },
  {
    id: 65,
    slug: 'how-to-manage-code-environments',
    question: 'How do I manage Python/R code environments?',
    answer: `### 1. Introduction/Overview
Code environments allow you to manage the specific packages and library versions (e.g., pandas, scikit-learn) required for your project. This ensures reproducibility.

### 2. How to Manage
1.  From the Dataiku DSS main menu, go to **Administration > Code Envs**.
2.  Here you can see all available environments. You can create a new one and specify the required packages (e.g., by listing them in a \`requirements.txt\` format).
3.  In your project's **Settings** menu, go to **Code Env Selection** and choose the environment you want your project's Python recipes and notebooks to use.
4.  It's best practice to use project-specific environments rather than the built-in global one.`,
  },
  {
    id: 66,
    slug: 'what-is-the-api-deployer',
    question: 'What is the API Deployer?',
    answer: `### 1. Introduction/Overview
The API Deployer is a dedicated component in Dataiku for managing the lifecycle of real-time prediction APIs. It is separate from the design/project node.

### 2. Key Features
- **Lifecycle Management:** It allows you to create different versions of an API service, test them, and promote them to production.
- **High Availability:** It's designed to run on a robust infrastructure (e.g., Kubernetes) to handle real-time traffic reliably.
- **Monitoring:** It provides dashboards to monitor the health, latency, and usage of your deployed API endpoints.`,
  },
  {
    id: 67,
    slug: 'how-to-pass-parameters-to-a-scenario',
    question: 'How can I pass parameters to a scenario at runtime?',
    answer: `### 1. Introduction/Overview
You can define scenario-specific parameters that can be set when the scenario is triggered manually or via the API. This is useful for making your automated jobs more dynamic.

### 2. How to Configure
1.  In your scenario, go to the **Params** tab.
2.  Define your parameters with a name and a default value.
3.  When you trigger the scenario manually, a dialog will appear asking you to confirm the values for these parameters.
4.  These parameters are then accessible within your recipes just like project variables, using the syntax \`\${scenario_param_name}\`.`,
  },
  {
    id: 68,
    slug: 'what-is-a-project-bundle',
    question: 'What is a project bundle and how is it used?',
    answer: `### 1. Introduction/Overview
A project bundle is a \`.zip\` file that contains a snapshot of your project. Bundles are the standard way to move a project from one Dataiku environment to another (e.g., from a development server to a production server).

### 2. How to Create and Deploy
1.  In your project, click **... More Options > Bundles**.
2.  Click **Create Bundle**. This packages your project's Flow, recipes, models, etc.
3.  Download the bundle file.
4.  On the target Dataiku instance (e.g., the production server), go to **Projects > Import Project > Import Bundle** and upload the file.
5.  This process is often automated by administrators using the API for CI/CD pipelines.`,
  },
  {
    id: 69,
    slug: 'how-to-automate-model-retraining',
    question: 'How do I automate model retraining?',
    answer: `### 1. Introduction/Overview
Automating model retraining is a core MLOps practice to prevent model drift. This is done with a scenario.

### 2. Step-by-Step Instructions
1.  Create a new scenario.
2.  Add a **Build / Train** step. In this step, select your deployed model (the green diamond in the Flow).
3.  When you build a deployed model, Dataiku automatically retrains it using the logic defined in the original ML Lab analysis.
4.  You can also add steps to check the new model's performance against the old one and only deploy it if it's better.
5.  Set the scenario to run on a time-based trigger (e.g., weekly or monthly).`,
  },
  {
    id: 70,
    slug: 'what-are-plugins-in-dss',
    question: 'What are plugins in DSS?',
    answer: `### 1. Introduction/Overview
Plugins are add-ons that extend Dataiku's core functionality. They can add new dataset connectors, recipes, processors, custom chart types, and more.

### 2. How to Use
1.  From the top navigation bar, go to **... > Plugins**.
2.  You can browse the Plugin Store for plugins created by Dataiku or the community.
3.  Click **Install** on any plugin you need.
4.  Once installed, the components from the plugin (e.g., a new visual recipe for connecting to a specific API) will be available in your projects.
5.  You can also develop your own plugins.`,
  },
  {
    id: 71,
    slug: 'difference-between-flow-and-api-node',
    question: 'What is the difference between a Design/Flow node and an Automation/API node?',
    answer: `### 1. Introduction/Overview
In a typical production architecture, Dataiku is split into different nodes for different purposes.
- **Design Node:** This is where data scientists and analysts build projects. It's for interactive development, exploration, and creating Flows.
- **Automation Node:** This node is dedicated to running the scheduled scenarios that automate your data pipelines. It's optimized for batch processing, not interactive use.
- **API Node:** This node is dedicated to hosting the real-time prediction APIs deployed from the Design node. It's optimized for low-latency, high-availability serving.

This separation ensures that development work doesn't interfere with production jobs or live APIs.`,
  },
  {
    id: 72,
    slug: 'how-to-monitor-scenario-runs',
    question: 'How can I monitor the status of my scenario runs?',
    answer: `### 1. Introduction/Overview
Monitoring your automated jobs is critical for production reliability.

### 2. Monitoring Tools
- **Scenario Runs View:** From the **Jobs** menu, you can see the last runs of all your scenarios, their outcomes, and durations.
- **Project Activity:** The project homepage shows a feed of recent activities, including scenario runs.
- **Dashboards:** You can add tiles to a dashboard that show the status and outcome of specific scenarios.
- **Reporters:** As mentioned, you can set up email or Slack notifications to be actively alerted of failures.
- **Global Monitoring:** Administrators have a global view of all job statuses across the entire Dataiku instance.`,
  },
  {
    id: 73,
    slug: 'what-are-managed-folders',
    question: 'What are managed folders and when should I use them?',
    answer: `### 1. Introduction/Overview
A **Managed Folder** is a special type of data object in the Flow (represented by an orange folder icon) that can store files, such as images, text files, or models saved in a specific format (e.g., pickle files).

### 2. When to Use Them
- **Storing non-tabular data:** Use them when you need to handle files that don't fit into a standard dataset table, like images for a computer vision project.
- **Passing complex objects:** A Python recipe can save a custom object (like a trained model from a specific library) to a managed folder, and a subsequent Python recipe can load it.
- **Downloading and uploading files:** You can write code to download files from an external source into a managed folder, or upload files from it.`,
  },
  {
    id: 74,
    slug: 'what-is-the-purpose-of-the-catalog',
    question: 'What is the purpose of the Data Catalog?',
    answer: `### 1. Introduction/Overview
The **Data Catalog** is a central, searchable repository of all data connections and datasets across the entire Dataiku instance.

### 2. Key Uses
- **Data Discovery:** It allows users to search for existing datasets across all projects, preventing redundant work. You can search by name, tag, or column name.
- **Governance:** It provides a single place to see metadata, documentation, and usage information for all data assets. You can see which datasets are most used and who the owners are.
- **Trust:** The catalog can be enriched with tags and certifications by data stewards to indicate which datasets are "golden sources" or "validated."`,
  },
  {
    id: 75,
    slug: 'how-to-debug-a-failed-scenario',
    question: 'How do I debug a failed scenario run?',
    answer: `### 1. Introduction/Overview
When a scenario fails, Dataiku provides detailed logs to help you find the cause.

### 2. Debugging Steps
1.  Go to the **Jobs** menu and find the failed scenario run.
2.  Click on it to open the run details. You will see which specific step failed.
3.  Click on the failed step. This will take you to the job log.
4.  The log will contain a detailed traceback. The most important information is usually at the end of the log. Look for error messages like "Column not found," "Division by zero," or API connection errors.
5.  The log also provides a link to a "diagnostic bundle" that you can download and send to administrators if you need further help.`,
  },
];
