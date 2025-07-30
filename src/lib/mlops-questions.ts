
export interface Question {
  id: number;
  slug: string;
  question: string;
  answer: string;
}

export const questions: Question[] = [
    {
    id: 501,
    slug: 'deploying-ml-models-as-rest-apis',
    question: 'How to get started with deploying machine learning models as REST APIs in Dataiku using the Dataiku Model API.',
    answer: `
### 1. Introduction/Overview
Deploying a machine learning model as a REST API endpoint is the final step in productionizing it for real-time use. This allows other applications to send data to your model and get an instant prediction back. Dataiku's API Deployer is the dedicated component for creating, managing, and scaling these production-ready API services.

### 2. Prerequisites
- **A "Saved Model" in your Flow:** You must have already trained a model and deployed it from the Lab to your Flow.
- **Access to an API Deployer node:** The API Deployer is a separate piece of the Dataiku infrastructure that must be set up by an administrator.
- **Permissions:** You need permissions to create new API services.

### 3. Step-by-Step Instructions
1.  **Create the API Service:** From your project's Flow, select your Saved Model. In the right-hand panel, choose **API Designer**. This will open the API Designer interface.
2.  **Define an Endpoint:** Create a new endpoint within your service. A common endpoint type is a **Prediction** endpoint that is directly tied to your Saved Model.
3.  **Test the Endpoint:** The API Designer provides a user interface for testing your endpoint. You can enter sample feature values in a JSON format and see the prediction your model returns.
4.  **Deploy the Service:** Once you are satisfied, click **Deploy**. This will package your model and its dependencies and deploy it as a live, running service on the API Deployer node.
5.  **Use the Live API:** In the API Deployer UI, you can find the endpoint's URL and code snippets in various languages (\`curl\`, Python) that show your application developers how to call the live API.

### 4. Resources and Tools
- **API Designer:** The UI within a project for creating the definition of an API service.
- **API Deployer:** The production-grade service that runs and manages your live model endpoints.
- **Saved Model:** The versioned model artifact that gets deployed.

### 5. Next Steps and Progression
- **Versioning:** You can deploy multiple versions of your model to the same endpoint and use traffic splitting to manage the transition.
- **Monitoring:** The API Deployer provides built-in monitoring dashboards to track the latency, error rate, and traffic of your API endpoints.
- **Scaling:** If your API is deployed on Kubernetes, you can easily scale the number of model replicas up or down to handle changes in traffic.

### 6. Common Challenges and Solutions
- **Challenge:** "My deployed API is returning an error."
- **Solution:** Check the logs of the API service in the API Deployer UI. The most common error is a schema mismatch, where the JSON being sent by the client application does not match the feature schema the model expects.
- **Challenge:** "The API is too slow."
- **Solution:** This could be due to a complex model or insufficient resources. You may need to deploy the API service on a more powerful machine or increase the number of replicas if running on Kubernetes.
`,
  },
  {
    id: 502,
    slug: 'automating-model-retraining-tuning-deployment',
    question: 'How to get started with automating model retraining, tuning, and deployment in Dataiku DSS.',
    answer: `
### 1. Introduction/Overview
Models are not static; they need to be periodically retrained on new data to maintain their accuracy. Automating this MLOps pipeline is a key practice for maintaining production models efficiently. In Dataiku, this is achieved by creating a **Scenario** that orchestrates the data preparation, retraining, and deployment steps.

### 2. Prerequisites
- **A full model pipeline already built:** You should have a complete Flow that prepares the training data and a "Saved Model" that has been trained on it.
- **A strategy for deployment:** How do you decide if a newly retrained model is "better" and should be deployed? (e.g., based on its accuracy score).

### 3. Step-by-Step Instructions
1.  **Create a Retraining Scenario:** In your project, go to **Scenarios** and create a new scenario (e.g., \`Weekly_Churn_Model_Retrain\`).
2.  **Add a "Build Training Data" Step:** The first step should be a **Build / Train** step that rebuilds the final, clean training dataset. This ensures you always train on the latest data.
3.  **Add a "Retrain Model" Step:** Add a second **Build / Train** step. This time, select your **Saved Model** object from the Flow. This tells the scenario to retrain the model using the dataset from the previous step. In the step's settings, you can also enable hyperparameter search to find the best parameters for the new data.
4.  **Add an "Evaluate Model" Step:** Add a step to run an **Evaluate** recipe, which compares the performance of your newly trained model version against a hold-out test set.
5.  **Add an Automated "Deploy" Step:** This is the advanced part. Add a **Python code** step. This script will use the Dataiku API to:
    *   Get the performance of the new model version (from the Evaluate recipe's output).
    *   Get the performance of the currently active production version.
    *   If the new version is better, the script activates it, making it the new production model.
6.  **Schedule the Scenario:** Add a **Time-based trigger** to run this entire scenario on a schedule (e.g., every Sunday night).

### 4. Resources and Tools
- **Scenarios:** The core automation engine in Dataiku.
- **Build / Train Step:** The key step for retraining a Saved Model.
- **Evaluate Recipe:** For generating performance metrics.
- **Python API:** For programmatically comparing model versions and deploying the winner.

### 5. Next Steps and Progression
- **Alerting:** Add a **Reporter** to the scenario to send an email or Slack message summarizing the retraining run, including which model was deployed and its new performance score.
- **Champion/Challenger Deployment:** Instead of activating the new model directly, the script could deploy it as a "challenger" to be A/B tested against the current champion.

### 6. Common Challenges and Solutions
- **Challenge:** The retrained model is actually worse than the old one.
- **Solution:** Your deployment script must have a safety check. It should *never* deploy a new model if its performance is worse than the currently active one. This prevents automated performance degradation.
- **Challenge:** The retraining job fails.
- **Solution:** Your scenario should have a failure reporter to alert you immediately. The cause is often an issue with the new training data (e.g., a data quality problem), which needs to be investigated.
`,
  },
  {
    id: 503,
    slug: 'performing-champion-challenger-workflows',
    question: 'How to get started with performing champion/challenger and version-comparison workflows in Dataiku for model updates.',
    answer: `
### 1. Introduction/Overview
A Champion/Challenger test (or A/B test) is a method for comparing the performance of a new model (the "challenger") against the current production model (the "champion") in a live environment. Dataiku's API Deployer has built-in features to manage this process, allowing you to safely validate a new model before rolling it out to all users.

### 2. Prerequisites
- **Two deployed model versions:** You need to have at least two versions of your model deployed to the same "Saved Model" object in your Flow.
- **An API Service:** Your model must be deployed as an endpoint in an API service via the API Deployer.

### 3. Step-by-Step Instructions
1.  **Deploy Both Versions:** In the API Deployer, when you deploy your API service, ensure that both your champion and challenger model versions are included in the deployment.
2.  **Configure the Endpoint:** Navigate to your API service in the API Deployer and open the endpoint that uses your model.
3.  **Enable Champion/Challenger Mode:** In the endpoint's settings, you can define a champion/challenger split.
    *   Set your current production model version as the **Champion**.
    *   Set your new model version as the **Challenger**.
4.  **Set the Traffic Split:** Configure how to route live prediction requests. A common strategy is to send the majority of traffic to the champion and a small percentage to the challenger. For example:
    *   **Champion:** 90% of traffic.
    *   **Challenger:** 10% of traffic.
5.  **Analyze the Results:**
    *   The API Deployer will automatically log the prediction requests and responses for each model version separately.
    *   You must have a process to join these prediction logs with the actual outcomes (ground truth).
    *   By analyzing this data, you can compare the real-world accuracy, business KPIs, and any other relevant metrics for the champion and challenger.
6.  **Promote the Winner:** After a sufficient evaluation period, if the challenger proves to be superior, you can go back to the API Deployer, deactivate the old champion, and make the challenger the new champion with 100% of the traffic.

### 4. Resources and Tools
- **API Deployer:** The core service for managing live model deployments and A/B tests.
- **Prediction Logs:** The data source for analyzing the results of the test.

### 5. Next Steps and Progression
- **Gradual Rollout:** Start with a small amount of traffic to the challenger (e.g., 1%) and gradually increase it as you gain confidence in its performance and stability.
- **Automated Analysis:** Create a Dataiku project that automatically ingests the prediction logs, joins them with ground truth data, and produces a dashboard comparing the champion and challenger performance in near real-time.

### 6. Common Challenges and Solutions
- **Challenge:** How long should I run the test for?
- **Solution:** This depends on your traffic volume and the business cycle. You need to run the test long enough to get a statistically significant number of results for both model versions.
- **Challenge:** The challenger model is causing errors.
- **Solution:** This is exactly why you do a champion/challenger test! Because it only receives a small percentage of traffic, the impact of the errors is contained. You can quickly disable the challenger in the API Deployer to stop sending it traffic while you debug the issue.
`,
  },
  {
    id: 504,
    slug: 'monitoring-deployed-model-performance-data-drift',
    question: 'How to get started with monitoring deployed model performance and data drift using Dataiku’s unified monitoring features.',
    answer: `
### 1. Introduction/Overview
A model's job isn't done when it's deployed. Its performance can degrade over time as the real world changes. This is known as "model drift." Monitoring your models for both performance degradation and data drift is a critical MLOps practice, and Dataiku provides a dedicated, unified interface for this.

### 2. Prerequisites
- **A "Saved Model"** deployed in your Dataiku Flow.
- **Ongoing new data:** A stream of new data for the model to make predictions on.
- **Ongoing ground truth:** A way to get the actual outcomes for those predictions.

### 3. Step-by-Step Instructions

#### Part 1: Monitoring Data Drift
1.  **Open Your Saved Model:** In the Flow, double-click on the green "Saved Model" object.
2.  **Go to Model Views > Drift Analysis:** On the left panel, select "Drift Analysis".
3.  **Compute Drift:** The tool needs a new dataset to compare against the original training data. Select a recent dataset and click **Compute**.
4.  **Analyze the Results:** Dataiku will show you a "drift score" for the whole dataset and for each individual feature. This score measures how much the statistical distribution of the new data has changed compared to the training data. High drift on key features is a major warning sign.

#### Part 2: Monitoring Model Performance
1.  **Create an Evaluation Dataset:** You need a dataset that contains both your model's predictions and the actual, true outcomes. This is often created by joining the output of a Score recipe with a later dataset that contains the ground truth.
2.  **Use the Evaluate Recipe:** In your Flow, select this evaluation dataset and use the **Evaluate** recipe.
3.  **Configure and Run:** In the recipe, tell it which column has the predictions and which has the actuals. Running this recipe generates a new dataset containing all the standard performance metrics (Accuracy, Precision, Recall, AUC, etc.).
4.  **Visualize Performance Over Time:** Open your Saved Model again and go to **Model Views > Performance**. You can point this view to the output of your Evaluate recipe. It will then create charts showing how your model's performance metrics have trended over time.

### 4. Resources and Tools
- **Saved Model Views:** The central UI for monitoring.
- **Evaluate Recipe:** The tool for calculating performance metrics on new data.
- **Scenarios:** Used to automate the entire monitoring process on a schedule.

### 5. Next Steps and Progression
- **Automated Checks and Alerting:** Create a **Scenario** that runs these monitoring tasks (drift analysis, evaluation) periodically. Add a **Run checks** step that fails if the drift score is too high or if the model's accuracy drops below a certain threshold. Configure a reporter on the scenario to send you an alert when this happens.
- **Model Retraining:** If monitoring detects significant drift or performance degradation, it's a signal that you need to trigger your model retraining pipeline.

### 6. Common Challenges and Solutions
- **Challenge:** I don't get the ground truth for my predictions until much later.
- **Solution:** This is a common reality. Your performance monitoring pipeline will have a delay. You need to design your flow to handle this, for example, by storing predictions and then joining them with the actuals when they become available. Data drift, however, can be monitored immediately as it doesn't require the ground truth.
`,
  },
  {
    id: 505,
    slug: 'integrating-prometheus-grafana-for-metrics',
    question: 'How to get started with integrating Prometheus/Grafana to visualize Dataiku flow and model metrics.',
    answer: `
### 1. Introduction/Overview
For enterprise-grade monitoring, you may want to centralize metrics from all your applications, including Dataiku, into a dedicated monitoring stack like Prometheus (for data collection) and Grafana (for visualization). Dataiku can expose its internal metrics via a standard Java protocol (JMX), which can then be scraped by Prometheus.

### 2. Prerequisites
- **A running Prometheus and Grafana stack.**
- **A Dataiku instance.**
- **Administrator access** to the Dataiku server to enable the JMX port.
- **A "JMX Exporter" agent.**

### 3. Step-by-Step Instructions
1.  **Enable JMX Port in Dataiku (Admin Task):**
    *   The Dataiku administrator needs to edit the \`install.ini\` configuration file.
    *   They must enable the JMX port by setting \`dss.jmx.enabled = true\` and specifying a port number.
    *   This requires a restart of the Dataiku backend.
2.  **Deploy the JMX Exporter:**
    *   Prometheus does not scrape JMX directly. You need a small helper application called the **JMX Exporter** (a Java agent).
    *   This agent attaches to the Dataiku Java process, reads the JMX metrics, and exposes them in a simple HTTP format that Prometheus can understand.
    *   You need to configure the JMX Exporter with a YAML file to tell it which specific Dataiku metrics to expose.
3.  **Configure Prometheus to Scrape Dataiku:**
    *   In your Prometheus configuration file (\`prometheus.yml\`), add a new "scrape config".
    *   This tells Prometheus the address and port of the JMX Exporter agent so it can periodically pull the metrics.
4.  **Build a Grafana Dashboard:**
    *   In Grafana, add Prometheus as a data source.
    *   Create a new dashboard.
    *   You can now build panels that query the Dataiku metrics stored in Prometheus. You could visualize things like:
        *   Number of running jobs.
        *   Scenario success/failure rates.
        *   Custom metrics you've computed in your flows.

### 4. Resources and Tools
- **Prometheus:** The time-series database for storing metrics.
- **Grafana:** The dashboarding tool for visualizing metrics.
- **JMX Exporter:** The bridge between Dataiku's JMX metrics and Prometheus.

### 5. Next Steps and Progression
- **Custom Metrics:** You are not limited to the default metrics. In a Python recipe, you can use a library to push custom business metrics directly to a Prometheus Pushgateway, allowing you to monitor anything in your flow.
- **Alerting:** Configure alerts in Grafana or Prometheus's Alertmanager to be notified if a key Dataiku metric crosses a critical threshold (e.g., "number of failed jobs in the last hour > 5").

### 6. Common Challenges and Solutions
- **Challenge:** This setup seems very complex.
- **Solution:** It is an advanced, enterprise-grade monitoring setup. For many use cases, Dataiku's built-in monitoring dashboards are sufficient. You should only implement this if you have a specific need to correlate Dataiku metrics with other systems in a central monitoring platform.
- **Challenge:** I can't find the metric I want.
- **Solution:** You may need to configure the JMX Exporter's YAML file to explicitly "whitelist" the metric you are interested in. You can use a tool like JConsole to browse all the available JMX metrics exposed by the Dataiku instance to find the one you need.
`,
  },
  {
    id: 506,
    slug: 'configuring-alerting-for-model-accuracy-failures',
    question: 'How to get started with configuring alerting for model accuracy or pipeline failures in Dataiku scenarios.',
    answer: `
### 1. Introduction/Overview
A core MLOps practice is to be notified immediately when a production pipeline or model fails. In Dataiku, this is handled by combining **Checks**, which define your failure conditions, with **Reporters**, which send the notifications. This allows you to create automated alerts for everything from data quality issues to model performance degradation.

### 2. Prerequisites
- **A Dataiku Scenario** that automates your pipeline.
- **A clear definition of failure** (e.g., "model AUC drops below 0.75," "input dataset has > 10% nulls").
- **Mail server or other messaging service configured** by your Dataiku administrator.

### 3. Step-by-Step Instructions
1.  **Define Your Failure Condition (The Check):**
    *   First, you must define the rule that constitutes a failure.
    *   Go to the dataset or model where the metric lives and navigate to the **Status > Checks** tab.
    *   **Example 1 (Pipeline Failure):** Check a dataset for a valid number of rows.
    *   **Example 2 (Model Accuracy Failure):** On your "Saved Model", create a check on a metric like "AUC" and set a minimum value (e.g., \`AUC > 0.75\`).
    *   Set the severity of the check to **Error**.
2.  **Add the Check to Your Scenario:**
    *   Open your main automation scenario.
    *   Add a **Run checks** step after the step that generates the data or model to be checked.
    *   Configure this step to run the checks you just defined. If any "Error"-level check is violated, this step will fail, causing the entire scenario to fail.
3.  **Configure the Alert (The Reporter):**
    *   In the same scenario, go to the **Reporters** tab.
    *   Click **+ ADD REPORTER** and select **Mail** or **Slack**.
    *   **Set the Run Condition to "On failure"**.
    *   Configure the recipients and the message. It is crucial to include variables like \`\${scenarioName}\` and \`\${jobURL}\` in the message so the recipient knows what failed and has a direct link to the logs.
4.  **Activate and Schedule:** Save the scenario and ensure it's scheduled to run. Now, if your data quality or model accuracy check fails, the scenario will fail, and an alert will be sent automatically.

### 4. Resources and Tools
- **Metrics and Checks:** The framework for defining your pass/fail rules.
- **Run Checks Scenario Step:** The automation component that executes your rules.
- **Reporters:** The component that sends the notifications.

### 5. Next Steps and Progression
- **Custom Python Alerts:** For more complex alerting logic or to send notifications to a system not natively supported by reporters, you can use a Python scenario step to call any external API (e.g., PagerDuty, Microsoft Teams).
- **Tiered Alerting:** Configure different reporters for different outcomes. For example, a high-urgency alert on failure to the on-call engineer, and a simple "FYI" summary on success to the business stakeholder.

### 6. Common Challenges and Solutions
- **Challenge:** I'm getting alerts, but I don't know what they mean.
- **Solution:** Your alert message is not informative enough. Edit the reporter to include more context. The job URL (\`\${jobURL}\`) is the most important piece of information, as it allows the recipient to go directly to the log and see which specific check failed and why.
- **Challenge:** I'm getting too many "false alarm" alerts.
- **Solution:** Your check's threshold may be too sensitive. For example, if you are checking for data drift, a small amount of drift is normal. You need to tune the threshold of your check to only fire when a truly significant change has occurred.
`,
  },
  {
    id: 507,
    slug: 'containerizing-flows-and-models-with-docker-kubernetes',
    question: 'How to get started with containerizing Dataiku flows and models with Docker or Kubernetes for portable deployment.',
    answer: `
### 1. Introduction/Overview
Containerization is the process of packaging an application and its dependencies into a single, portable unit called a container image (e.g., a Docker image). Dataiku leverages this technology to provide scalable, isolated, and reproducible environments for running data pipelines and models.

### 2. Prerequisites
- **Understanding of container concepts:** Familiarity with Docker and, ideally, Kubernetes.
- **A Kubernetes cluster** or a Docker host that Dataiku can connect to.
- **Administrator rights** in Dataiku to configure containerized execution.

### 3. Step-by-Step Instructions
1.  **Configure Containerized Execution (Admin Task):**
    *   An administrator must first connect Dataiku to the container infrastructure.
    *   In **Administration > Containerized Execution**, they will create a new configuration, selecting either **Docker** or **Kubernetes**.
    *   They will need to provide connection details and credentials for the Docker/Kubernetes API.
2.  **Define a Base Image:**
    *   The administrator must also define a base **Docker image**. This image should contain a base operating system and the necessary versions of Python or R. Dataiku provides official base images that you can use.
    *   You can also build your own custom images with specific libraries pre-installed.
3.  **Run a Recipe in a Container:**
    *   As a user, open a code recipe (e.g., Python).
    *   Go to the **Advanced** settings tab.
    *   In the **Container** dropdown, select the container configuration your admin set up.
4.  **How It Works:**
    *   When you click **Run**, Dataiku takes your recipe's code and dependencies.
    *   It sends instructions to Kubernetes or Docker to start a new container using the defined base image.
    *   It runs your recipe code inside this new, isolated container.
    *   Logs are streamed back to the Dataiku UI.
    *   When the job is done, the container is destroyed.

### 4. Resources and Tools
- **Docker & Kubernetes:** The underlying container technologies.
- **Containerized Execution Settings (Admin):** The UI in Dataiku for setting up the integration.
- **Recipe Advanced Settings:** The UI for choosing a container configuration for a specific job.

### 5. Next Steps and Progression
- **Resource Management:** In the container configuration, the administrator can set CPU and memory limits for the containers, preventing a single runaway job from consuming all cluster resources.
- **Deploying API Models:** You can deploy real-time scoring APIs as dedicated, scalable services on Kubernetes, which is the standard for production ML serving.
- **Deploying Dataiku Itself:** For a fully container-native setup, the entire Dataiku platform can be deployed on Kubernetes using an official Helm chart.

### 6. Common Challenges and Solutions
- **Challenge:** My containerized job fails immediately.
- **Solution:** This often means the Docker image is missing a required dependency. For example, your Python recipe uses a library that was not installed in the base image. You need to create a custom image that includes all necessary packages.
- **Challenge:** My job is stuck in a "pending" state.
- **Solution:** This is a Kubernetes issue. It means the cluster does not have enough free resources (CPU or memory) to schedule the container for your job. You may need to add more nodes to your cluster or adjust the job's resource requests.
`,
  },
  {
    id: 508,
    slug: 'scaling-scoring-apis-on-kubernetes',
    question: 'How to get started with scaling Dataiku scoring APIs by deploying them on Kubernetes clusters.',
    answer: `
### 1. Introduction/Overview
When a machine learning model is deployed as a real-time API, it may need to handle thousands or millions of prediction requests per day. A single server can't handle this load. Deploying the API service on a Kubernetes cluster is the standard way to achieve high availability and elastic scalability.

### 2. Prerequisites
- **A Kubernetes cluster** (e.g., AWS EKS, Azure AKS, Google GKE).
- **A Dataiku API Deployer** instance that is configured to use this Kubernetes cluster.
- **A "Saved Model"** that has been packaged into an API service in Dataiku.

### 3. Step-by-Step Instructions
1.  **Configure the API Deployer for K8s (Admin Task):**
    *   An administrator must first install and configure the API Deployer to use your Kubernetes cluster as its backend. This means that when you deploy a service, the API Deployer will create Kubernetes objects (like Deployments and Services) instead of just running a process on a VM.
2.  **Deploy your API Service:**
    *   From your Dataiku project, create your API service using the **API Designer** and deploy it to your Kubernetes-enabled API Deployer.
3.  **How It Works:**
    *   The API Deployer will create a Kubernetes **Deployment** for your model. This Deployment manages a set of identical pods.
    *   Each **pod** is a running container that holds your model and can serve prediction requests.
    *   The API Deployer also creates a Kubernetes **Service** (of type LoadBalancer or NodePort), which provides a single, stable IP address to route traffic to the pods.
4.  **Scaling the Service:**
    *   To handle more traffic, you simply scale the number of pods.
    *   **Manual Scaling:** In the API Deployer UI or using \`kubectl\`, you can manually change the number of **replicas** in the Deployment from 1 to 10, for example. Kubernetes will automatically create 9 new pods.
    *   **Automatic Scaling (HPA):** The best practice is to configure a **Horizontal Pod Autoscaler (HPA)** for your deployment. You can set a rule like "if the average CPU usage across all pods goes above 70%, automatically add more pods." Kubernetes will then handle scaling up and down for you.

### 4. Resources and Tools
- **Kubernetes:** The container orchestration platform.
- **Dataiku API Deployer:** The service that manages the deployment to Kubernetes.
- **Kubernetes HPA (Horizontal Pod Autoscaler):** The tool for automatic scaling.
- **Monitoring Tools (Prometheus/Grafana):** To monitor the CPU/memory usage and determine the correct autoscaling thresholds.

### 5. Next Steps and Progression
- **Rolling Updates:** When you deploy a new version of your model, Kubernetes performs a "rolling update," gradually replacing the old pods with new ones, ensuring there is no downtime.
- **High Availability:** By running multiple replicas of your model across different nodes in your Kubernetes cluster, you get high availability for free. If one node or pod fails, traffic is automatically routed to the healthy ones.

### 6. Common Challenges and Solutions
- **Challenge:** How do I choose the right number of replicas?
- **Solution:** This depends on your traffic and the resources each pod consumes. The best approach is to use a Horizontal Pod Autoscaler (HPA) and let Kubernetes figure it out dynamically based on load.
- **Challenge:** The API is still slow even after adding more replicas.
- **Solution:** This may mean your model itself is the bottleneck, or each pod needs more resources. You may need to profile your model's prediction code to optimize it or increase the CPU/memory allocated to each pod in the Deployment configuration.
`,
  },
  {
    id: 509,
    slug: 'using-flow-mode-batch-scoring-vs-real-time-api',
    question: 'How to get started with using Dataiku Flow mode for batch scoring versus real-time API deployment.',
    answer: `
### 1. Introduction/Overview
Once you have a trained model, there are two primary ways to use it to make predictions: **batch scoring** and **real-time scoring**. The choice depends entirely on your business use case. Dataiku supports both modes seamlessly.

### 2. Prerequisites
- **A deployed "Saved Model"** in your Dataiku Flow.
- **A clear understanding of your business need:** Do you need to score a large list of customers all at once, or does an application need to get a prediction for a single customer instantly?

### 3. Step-by-Step Instructions

#### Method 1: Batch Scoring (for large datasets, offline)
- **When to Use:**
    *   When you have a large dataset of records to score (e.g., "score all 1 million of our customers to find who is at risk of churn").
    *   When the predictions are not needed instantly.
- **How to Implement:**
    1.  In your Dataiku Flow, select your large, unscored dataset.
    2.  From the right-hand panel, choose the **Score** recipe.
    3.  Select your Saved Model.
    4.  Run the recipe. Dataiku will efficiently apply the model to all rows of the input dataset and produce a new output dataset containing the predictions.
    5.  You can then schedule this batch scoring recipe to run periodically (e.g., daily) using a **Scenario**.

#### Method 2: Real-time Scoring (for on-demand, single predictions)
- **When to Use:**
    *   When an application needs an immediate prediction for a single record (e.g., "a customer is checking out on our website; what product should we recommend to them *right now*?").
    *   When low latency is critical.
- **How to Implement:**
    1.  Take your Saved Model and deploy it to the **API Deployer**.
    2.  This creates a live **REST API endpoint**.
    3.  Your client application (e.g., your e-commerce website) can then make an HTTP request to this endpoint, sending the data for a single customer in the request body.
    4.  The API will instantly return the model's prediction in the response.

### 4. Resources and Tools
- **Score Recipe:** The primary tool for batch scoring.
- **API Deployer:** The service for deploying and managing real-time API endpoints.

### 5. Next Steps and Progression
- **Hybrid Approaches:** Some use cases might use both. For example, you might run a batch job every night to pre-calculate predictions for all your users, but also have a real-time API to score new users who sign up during the day.

### 6. Common Challenges and Solutions
- **Challenge:** "I tried to use the API to score a million records one by one, and it was very slow."
- **Solution:** You are using the wrong tool for the job. Real-time APIs are designed for single, low-latency requests. For scoring a large volume of records, you should always use the **Score recipe** in batch mode, as it is orders of magnitude more efficient.
- **Challenge:** "My batch scoring job is taking too long."
- **Solution:** Ensure your Score recipe is running on an appropriate engine. For large datasets, it should be pushed down to a **Spark cluster** or your **database** for better performance.
`,
  },
  {
    id: 510,
    slug: 'packaging-versioning-python-r-environments',
    question: 'How to get started with packaging and version-controlling Dataiku Python/R environments for reproducible model builds.',
    answer: `
### 1. Introduction/Overview
A model is more than just its code; it's also the environment it was trained in. For a model build to be truly reproducible, you must be able to perfectly recreate the environment, including the specific versions of all Python or R packages. Dataiku's Code Environments feature allows you to define, package, and version control these environments.

### 2. Prerequisites
- **A Dataiku project** that uses a code environment.
- **Your project is connected to a Git repository.**

### 3. Step-by-Step Instructions
1.  **Define Your Code Environment:**
    *   In **Administration > Code Envs**, create a new code environment for your project.
    *   In the "Packages to install" list, add all the Python or R libraries your project needs.
    *   **Crucially, pin the exact versions.** Instead of just \`pandas\`, specify \`pandas==1.3.5\`. This is the key to reproducibility.
2.  **Export the Environment Definition:**
    *   On the code environment's page, there is an **Export** button.
    *   Clicking this will download a \`json\` file. This file contains the entire definition of your environment, including the full list of packages and their specified versions.
3.  **Add the Definition to Version Control:**
    *   Add this exported \`.json\` file to your Dataiku project's folder structure (e.g., in a folder named \`code-envs\`).
    *   Commit this file to your project's **Git repository**.
4.  **How to Use the Versioned Definition:**
    *   A new developer joining the project can pull the Git repository.
    *   They can then go to **Administration > Code Envs**, click **+ Import Environment**, and upload the \`.json\` file from the repository.
    *   This will create a new code environment on their instance that is an exact replica of the one used for the original model build.

### 4. Resources and Tools
- **Code Environments:** The core Dataiku feature for managing dependencies.
- **The Export/Import feature** on the Code Environment page.
- **Git:** The version control system for storing the environment's definition file.

### 5. Next Steps and Progression
- **Infrastructure as Code (IaC):** In a fully automated setup, your CI/CD pipeline or an IaC tool like Terraform could use the Dataiku API to automatically create or update code environments based on the \`.json\` file stored in Git.
- **Containerization:** The next level of packaging is to use the environment definition to build a **Docker image**. This packages not only the Python/R libraries but also the underlying operating system dependencies, creating a fully self-contained, portable environment.

### 6. Common Challenges and Solutions
- **Challenge:** Building the environment from the definition file fails.
- **Solution:** This can happen if a very old package version is no longer available from public repositories or if there are deep-seated OS-level dependency conflicts. This is a rare but difficult problem that highlights the value of using containers (Docker) to lock down the entire environment, including the OS.
- **Challenge:** How do I know which versions of all the dependencies to pin?
- **Solution:** When you are developing, you can start with unpinned versions. Once your project is working, you can run a command like \`pip freeze > requirements.txt\` in your local environment. This will generate a complete list of all packages and their exact current versions, which you can then copy into the Dataiku code environment package list.
`,
  },
  {
    id: 511,
    slug: 'managing-code-environments-for-reproducibility',
    question: 'How to get started with managing Dataiku code environments (Python/R) to pin package versions and ensure reproducible pipelines.',
    answer: `
### 1. Introduction/Overview
Reproducibility is a cornerstone of good science and MLOps. If you can't reproduce a model build, you can't trust it. The most common cause of irreproducibility is changes in the underlying code environment. Managing your code environments by **pinning package versions** is the essential first step to ensuring your pipelines are reliable and reproducible.

### 2. Prerequisites
- A Dataiku project that uses Python or R code.
- Administrator rights to manage code environments.

### 3. Step-by-Step Instructions
1.  **Create a Dedicated Environment for Your Project:**
    *   Avoid using the default, global code environment. Every significant project should have its own dedicated environment.
    *   Go to **Administration > Code Envs** and create a new environment. Give it a name that matches your project (e.g., \`churn-model-env\`).
2.  **Add Your Packages:**
    *   In the environment's settings, add the Python or R packages your code needs (e.g., \`pandas\`, \`scikit-learn\`, \`xgboost\`).
3.  **Pin the Versions (The Critical Step):**
    *   Do not just add the package name. Add the exact version number using the \`==\` syntax.
    *   **Bad:** \`pandas\`
    *   **Good:** \`pandas==1.3.5\`
    *   **Why?** If you just specify \`pandas\`, Dataiku will install the latest version. Six months from now, the latest version will be different, and it might contain breaking changes that cause your old code to fail. Pinning the version ensures you will always get the exact same environment.
4.  **Use the Environment in Your Project:**
    *   Go to your project's **Settings > Code Env** and select your new, dedicated environment as the default for the project.
5.  **Version Control the Environment:**
    *   Export the environment's JSON definition and commit it to your project's Git repository. This creates a permanent, version-controlled record of your reproducible environment.

### 4. Resources and Tools
- **Code Environments:** The core Dataiku feature for managing dependencies.
- **Pip's version specifiers:** The \`==\` syntax for pinning versions.
- **Git:** For version controlling your environment definition.

### 5. Next Steps and Progression
- **Isolate Environments:** Use different environments for different projects. Project A might need an old version of a library, while Project B needs the latest version. Separate environments prevent these from conflicting.
- **Update with Intention:** When you do need to update a package to a newer version, do it deliberately. Create a new version of your environment (or update the existing one), test it thoroughly to make sure it doesn't break your code, and then commit the new environment definition.

### 6. Common Challenges and Solutions
- **Challenge:** "How do I find the correct version numbers to pin?"
- **Solution:** When you are first developing the project, you can start with unpinned versions. Once your code works, you can inspect the environment to see which specific versions were installed. A common practice is to use a command like \`pip freeze\` in a terminal with the same packages, which will output a complete list of packages and their exact versions that you can then copy into the Dataiku environment settings.
- **Challenge:** "Pinning everything is tedious."
- **Solution:** It is a small, one-time effort that saves you from huge, unpredictable headaches in the future. The cost of debugging a mysterious failure caused by an unexpected package update is far higher than the cost of pinning versions upfront.
`,
  },
  {
    id: 512,
    slug: 'containerizing-workflows-for-sharing-environments',
    question: 'How to get started with containerizing the entire Dataiku workflow (code, data, dependencies) to capture and share environments.',
    answer: `
### 1. Introduction/Overview
Containerizing a workflow means packaging the code, its dependencies, and sometimes even the data into a single, portable unit called a **Docker container**. This is the gold standard for reproducibility and sharing, as it guarantees that the workflow will run in the exact same environment every time, regardless of the host machine.

### 2. Prerequisites
- **Docker installed** on your local machine and/or on the server.
- **A Dataiku project** you want to containerize.
- **Familiarity with Docker concepts** (Dockerfile, images, containers).

### 3. Step-by-Step Instructions: A Conceptual Workflow
Dataiku leverages containers in several ways. The most common pattern for sharing a reproducible environment is to containerize the *execution environment* for a recipe.

1.  **Create a Dockerfile:**
    *   A Dockerfile is a text file that contains the instructions for building a Docker image.
    *   You would start from a base image (e.g., an official Python image or a Dataiku-provided base image).
    *   Then, add commands to install any OS-level dependencies (e.g., \`apt-get install ...\`) and Python/R packages (e.g., \`pip install -r requirements.txt\`).
2.  **Build the Docker Image:**
    *   Run the command \`docker build -t my-custom-env:1.0 .\` to build the image from your Dockerfile.
3.  **Push the Image to a Registry:**
    *   Push your newly built image to a Docker registry (like Docker Hub, AWS ECR, or GCP GCR) so that Dataiku and other users can access it.
4.  **Configure Dataiku to Use the Image:**
    *   In Dataiku, an administrator goes to **Administration > Containerized Execution**.
    *   They create a new container configuration that points to your custom image in the registry.
5.  **How it's Used for Sharing:**
    *   Now, when you share your Dataiku project with a colleague on a different Dataiku instance, they also need access to your custom Docker image.
    *   When they run your recipe, they can select the same container configuration. The recipe will then run inside a container created from your image, guaranteeing the exact same environment and dependencies you used.

### 4. Resources and Tools
- **Dockerfile:** The recipe for creating your environment image.
- **Docker Registry (Docker Hub, ECR, etc.):** The storage location for your shared images.
- **Dataiku's Containerized Execution feature.**

### 5. Next Steps and Progression
- **Full Project Containerization:** For a completely self-contained deployment, you can run the entire Dataiku platform itself on Docker or Kubernetes. This is a more advanced setup but provides ultimate portability.
- **Infrastructure as Code:** You can use tools like Terraform to automate the building and pushing of your Docker images as part of a CI/CD pipeline.

### 6. Common Challenges and Solutions
- **Challenge:** "My Docker image is huge."
- **Solution:** Use multi-stage builds and be mindful of the layers in your Dockerfile to keep the image size down. Use a minimal base image where possible.
- **Challenge:** "How do I handle secrets like API keys in a container?"
- **Solution:** **Never** bake secrets into a Docker image. Use your container orchestrator's (e.g., Kubernetes Secrets) or your cloud provider's secrets management tools to securely inject secrets into the container at runtime as environment variables.
`,
  },
  {
    id: 513,
    slug: 'exporting-importing-projects-between-instances',
    question: 'How to get started with exporting and importing Dataiku projects between DSS instances to replicate environments.',
    answer: `
### 1. Introduction/Overview
Moving a project between different Dataiku instances (e.g., from a development server to a production server) is a core MLOps workflow. This is done by exporting the project as a single, self-contained **bundle** file, which can then be imported into the target instance.

### 2. Prerequisites
- **Two Dataiku instances** (e.g., a "source" and a "target" instance).
- **A completed project** on the source instance.
- **Permissions:** You need export permissions on the source project and import permissions on the target instance.

### 3. Step-by-Step Instructions
1.  **Export the Project from the Source Instance:**
    *   Navigate to the homepage of the project you want to move.
    *   Click the **...** menu in the top right corner.
    *   Select **Export**.
2.  **Configure the Export:**
    *   A dialog will appear. You can choose what to include in the bundle.
    *   **Crucially, decide whether to include the data.** For most deployments, you should **deselect** "Export all input datasets" and "Export all managed datasets". You want to deploy the project *logic*, not the data itself. The new instance will connect to its own production data sources.
    *   Click **EXPORT**. This will download a \`.zip\` file to your local machine. This is your project bundle.
3.  **Import the Project into the Target Instance:**
    *   Log into the target Dataiku instance.
    *   From the homepage, click **+ IMPORT PROJECT**.
    *   Upload the \`.zip\` bundle file you just downloaded.
4.  **Remap Connections:**
    *   During the import process, Dataiku will prompt you to remap connections.
    *   For each data connection used in the original project, you must map it to the corresponding connection on the new instance (e.g., map the "dev_database" connection to the "prod_database" connection).
5.  **Complete the Import:** Once the remapping is done, complete the import. A complete, identical copy of your project's Flow, recipes, and settings now exists on the new instance.

### 4. Resources and Tools
- **The Project Export/Import Feature:** The primary tool for this workflow.

### 5. Next Steps and Progression
- **Automation:** This entire process can be automated via the Dataiku REST API. A CI/CD pipeline can automatically create the bundle, download it, and upload it to the production instance as part of an automated deployment process.
- **Project Variables:** Use project variables for anything that might change between environments (like file paths or database names). The import wizard will also prompt you to set the values for these variables for the new environment.

### 6. Common Challenges and Solutions
- **Challenge:** After importing, a job fails with a "Connection not found" error.
- **Solution:** You did not remap the connections correctly during the import process. You can go to the project's **Settings > Dependencies** to see and remap the connections after the import.
- **Challenge:** The imported project doesn't have any data.
- **Solution:** This is the expected behavior if you chose not to export the data. You need to run a scenario in the new project to build the datasets using the new production data sources.
`,
  },
  {
    id: 514,
    slug: 'defining-standardized-project-templates',
    question: 'How to get started with defining standardized Dataiku project templates for consistent pipeline setup across teams.',
    answer: `
### 1. Introduction/Overview
As more teams in your organization adopt Dataiku, ensuring consistency becomes vital. A **Project Template** is a pre-built, empty project that contains your team's standard structure and best practices. New projects can be started by duplicating this template, which accelerates development and ensures all projects have a similar, easy-to-understand layout.

### 2. Prerequisites
- **A clear idea of your team's best practices** for project organization.
- **Permissions to create projects.**

### 3. Step-by-Step Instructions
1.  **Create a New "Template" Project:**
    *   From the Dataiku homepage, create a new, blank project.
    *   Give it a clear name that identifies it as a template, for example: \`TEMPLATE - Standard Analytics Project\`.
2.  **Build the Standard Structure:** In this empty project, build out the reusable components that all your projects should have.
    *   **Flow Zones:** Create your standard set of Flow Zones (e.g., \`1_Ingestion\`, \`2_Data_Prep\`, \`3_Modeling\`, \`4_Outputs\`). This enforces a consistent pipeline architecture.
    *   **Wiki:** Create a standard Wiki structure with placeholder pages for key documentation like a "Project Brief", "Data Dictionary", and "Meeting Notes". You can even include a checklist for new developers.
    *   **Tags:** Add your team's standard set of tags to the project. They will then be available for autocomplete in the new projects.
    *   **Code Libraries:** If you have common helper functions, you can include them in the project's library.
3.  **Document the Template:** In the template project's Wiki, clearly explain that this is a template and how to use it.
4.  **Using the Template:**
    *   When a developer needs to start a new project, they navigate to the homepage of the template project.
    *   They click the **...** menu and select **Duplicate project**.
    *   They give their new project a name and start building within the pre-defined structure.

### 4. Resources and Tools
- **The "Duplicate project" feature:** The key to using the template.
- **Flow Zones and Wikis:** The primary components of a good template.

### 5. Next Steps and Progression
- **Multiple Templates:** You might create different templates for different types of projects. For example, a template for a simple BI reporting project might be different from a template for a complex MLOps project.
- **Shared Template Project:** Make the template project read-only for most users, with only a "Center of Excellence" team able to modify it. This ensures the standard is maintained.
- **Automated Project Creation:** For advanced use cases, you can use the Dataiku API to write a script that automates the duplication and setup of a new project from the template.

### 6. Common Challenges and Solutions
- **Challenge:** "Developers are still creating blank projects instead of using the template."
- **Solution:** This is a training and communication issue. You must clearly communicate that using the template is the standard, required process for starting new projects. Enforce this during project kickoff reviews.
- **Challenge:** "The template is becoming too restrictive or complex."
- **Solution:** A template should provide a helpful starting structure, not a rigid straitjacket. Gather feedback from your developers. Are there parts of the template that are not useful? Be willing to evolve and simplify the template based on team feedback.
`,
  },
  {
    id: 515,
    slug: 'using-time-travel-snapshots-for-reproducibility',
    question: 'How to get started with using Dataiku’s managed “time travel” snapshots or project backups to reproduce past runs.',
    answer: `
### 1. Introduction/Overview
Reproducing a past result requires being able to restore both the code and the data to their exact state at a specific point in time. Dataiku addresses this through two main mechanisms: **Git integration** for code snapshots and **Partitioning** for data snapshots. While Dataiku doesn't have a single "time travel" button, these features provide the necessary components for reproducibility.

### 2. Prerequisites
- **Git integration:** Your project must be linked to a Git repository to version your code.
- **Partitioned datasets:** Your time-based data should be partitioned.

### 3. Step-by-Step Instructions

#### Part 1: Reproducing the Code
1.  **Find the Commit:** Use your Git provider's UI (e.g., GitHub) to find the commit hash that corresponds to the version of the code you want to reproduce.
2.  **Create a New Branch:** In Dataiku's Git page for the project, create a new branch from that specific commit.
3.  **Restore the Code:** This new branch now contains an exact snapshot of all your project's recipes and configurations as they were at the time of that commit.

#### Part 2: Reproducing the Data
1.  **Use Partitioning:** This is the standard Dataiku pattern for data versioning. If your output dataset is partitioned by day, each partition is effectively a "snapshot" of the data for that day.
2.  **Rebuild a Specific Partition:** To reproduce a result from January 15th, you can now run a job that explicitly builds only the \`2023-01-15\` partition. This job will use the restored code (from your Git branch) and the correct historical input data (assuming your source data is also partitioned or snapshotted).

#### Part 3: Manual Snapshots (for non-partitioned data)
1.  **When to use:** When you need a point-in-time copy of a non-partitioned dataset.
2.  **How:** Use a **Sync** recipe to create a copy of the dataset. Give the output dataset a name that includes the date or version (e.g., \`customers_snapshot_2023_10_27\`). This is a manual process but can be useful for creating specific checkpoints.

### 4. Resources and Tools
- **Git Integration:** The essential tool for versioning and restoring your code.
- **Partitioning:** The primary mechanism for versioning and time-traveling your data.
- **Sync Recipe:** For creating manual, point-in-time snapshots of datasets.
- **Project Backups (Admin):** An administrator can take a full backup of a Dataiku instance, which can be restored for disaster recovery, but this is a much heavier process than using Git and partitioning for standard reproducibility.

### 5. Next Steps and Progression
- **Automated Snapshots:** You could create a scenario with a Python step that runs periodically and uses the Sync recipe pattern to automatically create dated snapshots of a critical dataset.

### 6. Common Challenges and Solutions
- **Challenge:** "My source data is not partitioned or versioned."
- **Solution:** This is a major challenge for reproducibility. If your raw source data (e.g., a database table) is constantly being updated in place, it can be very difficult to reproduce a past result. You may need to work with your data engineering team to implement a snapshotting or change-data-capture (CDC) process on the source system.
`,
  },
  {
    id: 516,
    slug: 'sharing-versioning-notebooks-sql-recipes',
    question: 'How to get started with sharing and versioning Dataiku notebooks and SQL recipes across projects for reproducibility.',
    answer: `
### 1. Introduction/Overview
To ensure consistency and avoid duplicated work, teams often need to share and version reusable pieces of code, such as common SQL queries or standard analytical notebooks. Dataiku supports this through a combination of Git integration and a shared library project structure.

### 2. Prerequisites
- **A need for reusable code:** You have a notebook or a SQL recipe that multiple projects could benefit from.
- **All relevant projects connected to Git.**

### 3. Step-by-Step Instructions

#### Part 1: Versioning Notebooks and Recipes
1.  **Connect to Git:** This is the foundational step. Ensure the project containing your notebook or recipe is connected to a Git repository.
2.  **How it Works:** Notebooks (\`.ipynb\` files) and SQL recipes (\`.sql\` files) are stored as files within the project's directory structure. When you **commit** your project, you are creating a versioned snapshot of that notebook or recipe file.
3.  **View History:** You can use your Git provider's UI (e.g., GitHub) to see the full commit history, compare different versions of a notebook, and see exactly what code was changed, by whom, and when.

#### Part 2: Sharing Reusable Notebooks and Recipes
1.  **Create a "Shared Library" Project:**
    *   Create a new, central Dataiku project named something like \`SHARED_ANALYTICS_LIBRARY\`.
    *   This project's purpose is to store reusable assets.
2.  **Populate the Library Project:**
    *   Create your standard, reusable SQL recipes and exploratory notebooks within this library project.
    *   Document them thoroughly in the project's Wiki, explaining what each one does and how to use it.
3.  **How Other Projects Use Them (Two Methods):**
    *   **Method A (Copy/Paste):** A developer can simply open the shared library project, copy the SQL code from a recipe or the cells from a notebook, and paste them into their own project. This is simple but creates a disconnected copy.
    *   **Method B (Project Dependency - Better):** In a developer's own project, they can go to **Settings > Dependencies** and add the \`SHARED_ANALYTICS_LIBRARY\` project as a dependency. This allows them to see the shared project's flows and potentially use its datasets as inputs, creating a clearer linkage.

### 4. Resources and Tools
- **Git Integration:** For versioning.
- **A Shared "Library" Project:** The central place for storing reusable assets.
- **Copy/Paste:** A simple mechanism for sharing code snippets.

### 5. Next Steps and Progression
- **Reusable Python Functions:** For Python code, the best practice is to put reusable functions in the library project's **Python Libraries** folder. Other projects can then add a dependency and \`import\` these functions directly.
- **Project Templates:** Create a project template that already includes a dependency on the shared library project, making it easy for new projects to access the reusable assets.

### 6. Common Challenges and Solutions
- **Challenge:** A user copied a SQL recipe but it failed in their project.
- **Solution:** The SQL recipe likely referred to a dataset by its Dataiku name. When copied, the user needs to update the \`FROM\` and \`JOIN\` clauses to refer to the dataset names in *their* project.
- **Challenge:** "The diff for a notebook file in GitHub is an unreadable JSON."
- **Solution:** This is true, as \`.ipynb\` files store a lot of metadata. Use Dataiku's own diff viewer on the Git page, which is optimized for comparing notebooks. There are also browser extensions available that can render notebook diffs more cleanly on GitHub.
`,
  },
  {
    id: 517,
    slug: 'integrating-projects-with-git-for-tracking-changes',
    question: 'How to get started with integrating Dataiku projects with Git to track code changes and environment changes.',
    answer: `
### 1. Introduction/Overview
Integrating your Dataiku project with Git is the cornerstone of MLOps and DataOps. It provides a robust system for version control, collaboration, and auditing. This integration allows you to track every change to your project's logic, from visual recipes to code environments.

### 2. Prerequisites
- **A Dataiku project.**
- **An empty remote Git repository** on a provider like GitHub, GitLab, or Azure DevOps.
- **Git installed on the Dataiku server** and properly configured by an administrator.

### 3. Step-by-Step Instructions
1.  **Link the Project to the Repository:**
    *   In your Dataiku project, go to **Settings > Git**.
    *   Click **Convert to Git project**.
    *   Provide the remote repository URL and click **Link**.
2.  **Commit Your Initial Project:**
    *   Navigate to the **Git** page from the project's top menu.
    *   You will see all your project objects listed as "uncommitted changes".
    *   Stage all the changes, write an initial commit message (e.g., "Initial commit"), and click **Commit**.
    *   Click **Push** to send the project to your remote repository.
3.  **Track Changes to Code and Recipes:**
    *   Now, any change you make—editing a Python script, adding a step to a Prepare recipe, modifying a chart—will appear as a change on the Git page.
    *   You can commit these changes with a clear message to create a version history.
4.  **Track Changes to the Environment:**
    *   Go to **Administration > Code Envs** and find the environment your project uses.
    *   Click **Export** to download the environment's definition as a \`.json\` file.
    *   Add this \`.json\` file to your project's directory (e.g., create a folder called \`code-envs\` and upload it there).
    *   Go to the Git page and **commit** this file. Now, your code environment's definition is version-controlled alongside your project logic.

### 4. Resources and Tools
- **Dataiku's Git Integration:** The UI for managing commits, branches, etc.
- **Git Provider (e.g., GitHub):** The web interface for viewing history and managing pull requests.
- **Code Environment Export/Import:** The feature for packaging your environment definition.

### 5. Next Steps and Progression
- **Branching Strategy:** Implement a feature branching workflow. All new work should be done on a separate branch and then merged via a pull request.
- **CI/CD Integration:** Use Git commits and pull requests as triggers to run automated testing and deployment pipelines.
- **Visual Diffs:** When reviewing changes on the Dataiku Git page, it provides a "visual diff" that clearly shows changes to visual components, not just the raw JSON.

### 6. Common Challenges and Solutions
- **Challenge:** "What is actually being stored in Git?"
- **Solution:** Git stores the *definition* of your project: all recipe code and configurations, flow structure, notebook contents, and the environment \`.json\` file you committed. It does **not** store the actual data from your datasets.
- **Challenge:** "My push to the remote repository failed."
- **Solution:** This is usually an authentication issue. Your Dataiku administrator needs to ensure that the Dataiku server has the correct SSH keys or credentials to authenticate with your Git provider.
`,
  },
  {
    id: 518,
    slug: 'automating-documentation-for-reproducibility-compliance',
    question: 'How to get started with automating documentation of Dataiku flows and environments to enforce reproducibility and compliance.',
    answer: `
### 1. Introduction/Overview
Manual documentation often becomes outdated. Automating the generation of documentation ensures that it is always in sync with the actual state of your project. This is particularly important for reproducibility and compliance, providing a reliable audit trail. In Dataiku, this can be achieved by using the Python API to extract metadata from your project.

### 2. Prerequisites
- **A well-documented project:** Your automation can only extract information that is there. You must first have a discipline of adding descriptions to your datasets and recipes.
- **A Python recipe or scenario step.**
- **Knowledge of the Dataiku Python API.**

### 3. Step-by-Step Instructions
1.  **Create a "Documentation Generation" Recipe:**
    *   In your project, create a new **Python recipe**. This recipe's job will be to generate the documentation.
    *   Create a **Managed Folder** as the output for this recipe, which is where the final document will be saved.
2.  **Write the Documentation Script:**
    *   In the Python recipe, use the Dataiku API to get a handle on your project.
    *   **Iterate through objects:** Write a loop that goes through all the datasets and recipes in the project (\`project.list_datasets()\`, \`project.list_recipes()\`).
    *   **Extract Metadata:** Inside the loop, for each object, get its definition (\`.get_definition()\`). From the definition, you can extract its name, type, description, tags, schema (for datasets), and a recipe's code or steps.
    *   **Format the Output:** Format this extracted metadata into a human-readable format like Markdown or HTML.
    *   **Save the Document:** Write the final formatted string to a file in your output managed folder.
3.  **Generate Environment Documentation:**
    *   Your script can also use the API to get the list of packages in the project's code environment (\`project.get_code_env().get_definition()\`) and include this in the documentation.
4.  **Automate with a Scenario:**
    *   Create a **Scenario** that runs your documentation generation recipe.
    *   You can schedule this to run periodically (e.g., weekly) or have it triggered after every major change to the project.
    *   You can add a reporter to the scenario to email the generated document to stakeholders.

### 4. Resources and Tools
- **Dataiku Python API:** The key to programmatically accessing project metadata.
- **Python Recipe and Managed Folder:** The components for creating and storing the documentation.
- **Markdown or HTML:** Good formats for the final output document.

### 5. Next Steps and Progression
- **Static Site Generator:** Your script could generate a set of Markdown files that can be used as the source for a static site generator like Jekyll or Hugo, creating a full, professional-looking documentation website for your project.
- **Compliance Reporting:** Tailor the script to generate a report specifically formatted for a compliance audit, automatically pulling all the necessary lineage and governance information.

### 6. Common Challenges and Solutions
- **Challenge:** The generated documentation is not useful because the descriptions are empty.
- **Solution:** This highlights a process problem. The automation script is a "garbage in, garbage out" system. Your team must have the discipline to write good descriptions on their Dataiku objects for the generated documentation to be valuable.
- **Challenge:** The script is complex to write.
- **Solution:** Start simple. Your first version could just list all the datasets in the project and their descriptions. You can add more detail (like schemas, recipe logic, etc.) over time.
`,
  },
  {
    id: 519,
    slug: 'creating-dev-test-prod-instances',
    question: 'How to get started with creating separate dev/test/prod Dataiku instances and migrating projects through them.',
    answer: `
### 1. Introduction/Overview
A multi-environment setup (Dev, Test/QA, Prod) is the standard for enterprise-grade software development and MLOps. It ensures that changes can be developed and tested in isolation before being promoted to the live production environment, minimizing risk. This separation is achieved by having separate, independent Dataiku instances for each environment.

### 2. Prerequisites
- **Sufficient infrastructure:** You need the server resources (VMs or Kubernetes capacity) to run multiple Dataiku instances.
- **A Dataiku license** that supports multiple environments.
- **Administrator-level skills** for installing and configuring the instances.

### 3. Step-by-Step Instructions: The Promotion Workflow
1.  **Set Up the Instances:** An administrator installs and configures three separate Dataiku DSS instances.
    *   **Dev (Development):** Where developers have broad permissions to build, experiment, and test new projects.
    *   **Test/QA (Quality Assurance):** A locked-down, production-like environment. Developers do not have access. A dedicated QA team tests the deployed projects here.
    *   **Prod (Production):** The live environment that serves business users. It is highly restricted and only deployment managers can make changes.
2.  **Development on Dev:** All new work happens on the Dev instance. Developers build and test their projects here.
3.  **Deployment from Dev to Test:**
    *   When a project is ready for QA, a developer **exports** it from the Dev instance as a **project bundle** (\`.zip\` file).
    *   A deployment manager **imports** this bundle into the Test instance, remapping the data connections to point to test data sources.
4.  **Validation on Test:** The QA team or automated tests are run against the project on the Test instance to validate its correctness and performance.
5.  **Deployment from Test to Prod:**
    *   If testing is successful, the same project bundle is then taken and imported into the **Prod** instance by the deployment manager.
    *   The connections are remapped to the live production data sources.
    *   The production scenarios are then activated.

### 4. Resources and Tools
- **Separate Servers/VMs/Namespaces:** To physically isolate the environments.
- **Project Bundles:** The mechanism for moving a project between instances.
- **CI/CD Tools (Jenkins, etc.):** To automate the bundling and deployment process.

### 5. Next Steps and Progression
- **Automate Deployments:** Use a CI/CD tool to automate the process of creating the bundle and deploying it to the next environment, with manual approval gates in the pipeline.
- **Infrastructure as Code:** Use tools like Terraform to define the infrastructure for each environment in code, ensuring they are consistent and can be recreated easily.

### 6. Common Challenges and Solutions
- **Challenge:** Keeping the environments in sync is difficult.
- **Solution:** This is why automated deployment pipelines are so important. Manual deployments are prone to human error. An automated process ensures that exactly the same bundle is deployed to Test and then to Prod.
- **Challenge:** This seems like a lot of overhead.
- **Solution:** It is, and it's essential for any system that the business relies on. For a small team doing non-critical analysis, a single instance might be sufficient. But for enterprise MLOps, a multi-environment strategy is a non-negotiable best practice for ensuring stability and quality.
`,
  },
  {
    id: 520,
    slug: 'connecting-projects-to-git-for-mlops-workflows',
    question: 'How to get started with connecting Dataiku projects to a Git repository and managing branches for MLOps workflows.',
    answer: `
### 1. Introduction/Overview
For a robust MLOps workflow, version control is not optional. Connecting your Dataiku project to a Git repository is the foundation for tracking changes, enabling team collaboration, and automating your CI/CD pipelines. A disciplined branching strategy is key to managing this effectively.

### 2. Prerequisites
- A Dataiku project.
- An empty remote Git repository (e.g., on GitHub, GitLab).
- Git configured on your Dataiku instance by an administrator.

### 3. Step-by-Step Instructions
1.  **Connect Project to Git:** In your project's **Settings > Git**, link the project to your remote Git repository URL.
2.  **Adopt a Branching Strategy:** Your team must agree on a branching model. A common and effective one is **GitFlow**:
    *   **\`main\` branch:** This branch represents the production-ready, stable version of your project. It should be protected so no one can push to it directly.
    *   **\`develop\` branch:** This is the main integration branch. All completed features are merged into \`develop\`.
    *   **Feature branches:** All new work must be done on a new feature branch, created from \`develop\`.
        *   Example name: \`feature/add-customer-ltv-model\`.
3.  **The MLOps Workflow:**
    1.  A data scientist wants to develop a new model. They pull the latest \`develop\` branch, then create a new feature branch: \`feature/new-churn-model\`.
    2.  They work on this branch in Dataiku, building the necessary recipes and training the model. They commit their changes regularly to this branch.
    3.  When the model is ready for review, they push the branch and open a **Pull Request (PR)** to merge their feature branch into \`develop\`.
    4.  Another team member (e.g., a senior data scientist or an MLOps engineer) reviews the PR, checking the code, the model's performance, and the documentation.
    5.  Once approved, the PR is merged. This triggers a CI/CD pipeline that can automatically deploy the project to a testing environment.

### 4. Resources and Tools
- **Dataiku's Git Integration:** The UI for creating branches, committing, and pushing.
- **Git Provider (GitHub, etc.):** The platform for managing pull requests and branch protection rules.
- **A documented branching strategy** in your team's Wiki.

### 5. Next Steps and Progression
- **Release Branches:** When you are ready to deploy to production, you can create a \`release\` branch from \`develop\`. After final testing, this release branch is merged into \`main\` and tagged with a version number.
- **Hotfixes:** If a critical bug is found in production, a \`hotfix\` branch is created from \`main\`, the bug is fixed, and it is then merged back into both \`main\` and \`develop\`.

### 6. Common Challenges and Solutions
- **Challenge:** "What should I put in a commit?"
- **Solution:** A commit should be a small, logical unit of work. Don't wait until you've built the entire project to commit. Commit after you complete each significant step (e.g., "Commit 1: Add raw datasets", "Commit 2: Create customer cleaning recipe", "Commit 3: Train initial model").
- **Challenge:** "We have merge conflicts all the time."
- **Solution:** This often means multiple people are working on the same recipe on different branches. Improve communication and task breakdown to avoid this. Also, encourage developers to pull the latest changes from \`develop\` into their feature branch frequently to integrate changes early and in smaller chunks.
`,
  },
  {
    id: 521,
    slug: 'using-native-git-integration-for-team-collaboration',
    question: 'How to get started with using Dataiku’s native Git integration to enable team collaboration on data pipelines.',
    answer: `
### 1. Introduction/Overview
Dataiku's native Git integration is the key to enabling effective team collaboration. It allows multiple developers to work on the same project simultaneously without overwriting each other's work, and it provides a full audit trail of every change. The core concept is that each developer works in their own isolated **branch**.

### 2. Prerequisites
- A Dataiku project connected to a remote Git repository (e.g., on GitHub).
- All team members have been added as contributors to the Dataiku project.

### 3. Step-by-Step Instructions: A Collaborative Workflow
1.  **Create a Feature Branch:**
    *   Before starting any new work, a developer must create their own branch.
    *   Go to the **Git** page in the project.
    *   Click **Switch branch > + Create branch**.
    *   Give it a clear name (e.g., \`jane/add-new-dashboard\`).
2.  **Work in Isolation:**
    *   The developer now works on this branch. Any changes they make—creating recipes, editing dashboards, etc.—are saved only on this branch and are invisible to their teammates.
    *   They should **commit** their changes to their branch frequently with clear messages.
3.  **Share and Get Feedback:**
    *   When the developer wants to share their work or get feedback, they **push** their branch to the remote repository.
    *   They can then ask a colleague to **pull** that specific branch to their own local Dataiku instance to review the work in progress.
4.  **Merge Changes with a Pull Request:**
    *   When the feature is complete and ready to be integrated into the main project, the developer goes to the Git provider's website (e.g., GitHub).
    *   They open a **Pull Request (PR)** to merge their feature branch into the main branch (e.g., \`develop\` or \`main\`).
5.  **Review and Merge:**
    *   Another team member reviews the PR. They can see all the changes to the project's definition.
    *   If they approve, the branch is merged.
6.  **Update Other Branches:** All other developers can now **pull** the latest changes from the main branch into their own branches to get the new feature.

### 4. Resources and Tools
- **Dataiku's Git Page:** The central UI for branching, committing, pushing, and pulling.
- **Pull Requests (on GitHub, etc.):** The formal process for code review and merging.
- **The "Changes" tab:** Shows a "diff" of what has been modified on your current branch.

### 5. Next Steps and Progression
- **Resolve Conflicts:** If two developers modify the same recipe, a merge conflict will occur when they try to merge their branches. Dataiku provides a visual "diff and merge" tool to help resolve these conflicts by choosing which version of the changes to keep.

### 6. Common Challenges and Solutions
- **Challenge:** "I made changes on the main branch by mistake and now it's a mess."
- **Solution:** This is why you should use **branch protection rules** in your Git provider to prevent anyone from pushing directly to the main branch. All changes should be forced to go through a pull request.
- **Challenge:** "My colleague and I both edited the same visual recipe, and the merge is difficult."
- **Solution:** This is the hardest part of visual tool collaboration. The best solution is to improve communication and task breakdown to avoid having two people edit the same object at the same time. If it's unavoidable, keep your changes small and focused.
`,
  },
  {
    id: 522,
    slug: 'setting-up-jenkins-pipelines-with-dataiku-api',
    question: 'How to get started with setting up Jenkins pipelines that use the Dataiku Python API to run and deploy projects.',
    answer: `
### 1. Introduction/Overview
Jenkins is a popular open-source automation server used for building CI/CD pipelines. You can integrate Dataiku into a Jenkins pipeline by having Jenkins call the **Dataiku REST API** to trigger actions like running tests or deploying projects. This automates your MLOps workflow.

### 2. Prerequisites
- A running Jenkins server.
- A Dataiku project connected to Git.
- A Dataiku API key with permissions to run scenarios and create bundles.

### 3. Step-by-Step Instructions
1.  **Install Necessary Jenkins Plugins:** Ensure you have plugins for Git and for handling credentials.
2.  **Store the Dataiku API Key in Jenkins:**
    *   In Jenkins, go to **Manage Jenkins > Credentials**.
    *   Add a new "Secret text" credential.
    *   Store your Dataiku API key here and give it a memorable ID (e.g., \`DATAİKU_API_KEY\`).
3.  **Create a Jenkins Pipeline Job:**
    *   Create a new "Pipeline" job in Jenkins.
    *   Configure it to be triggered by changes to your project's Git repository (e.g., using a webhook).
4.  **Write the \`Jenkinsfile\`:**
    *   A \`Jenkinsfile\` is a script (written in Groovy) that defines the stages of your pipeline. It lives in your Git repository.
    *   The script will use shell steps (\`sh\`) to execute \`curl\` commands that call the Dataiku REST API.
    > \`\`\`groovy
    > pipeline {
    >     agent any
    >     environment {
    >         // Load the API key securely
    >        
    
    >     }
    >     stages {
    >         stage('Run Tests') {
    >             steps {
    >                 echo 'Triggering Dataiku test scenario...'
    >                 sh "curl : -X POST https://dss.mycompany.com/public/api/projects/MYPROJ/scenarios/run_tests/run"
    >                 // Note: A real pipeline would need to poll for job completion here
    >             }
    >         }
    >         stage('Deploy to Prod') {
    >             steps {
    >                 // Add steps to create and deploy a project bundle via the API
    >             }
    >         }
    >     }
    > }
    > \`\`\`
### 4. Resources and Tools
- **Jenkins:** The CI/CD automation server.
- **Dataiku REST API:** The interface for Jenkins to control Dataiku.
- **\`curl\`:** A simple command-line tool for making the API calls from within the Jenkins script.

### 5. Next Steps and Progression
- **Polling for Job Status:** The example above just triggers the job. A robust pipeline needs to be more sophisticated. It should capture the \`jobId\` from the API response and then use another API endpoint in a loop to poll for the job's status, only proceeding to the next stage when the job completes successfully.
- **Parameterized Builds:** Pass parameters from Jenkins into your Dataiku scenario runs to make them more dynamic.

### 6. Common Challenges and Solutions
- **Challenge:** "My Jenkins job can't connect to Dataiku."
- **Solution:** This is a network issue. Ensure the Jenkins agent machine can reach the Dataiku server's URL and port. Check for firewalls.
- **Challenge:** "How do I manage the API key securely?"
- **Solution:** Always use the Jenkins Credentials store. Never hardcode the API key in your \`Jenkinsfile\`. The \`credentials()\` helper in the pipeline script is the correct way to access it securely.
`,
  },
  {
    id: 523,
    slug: 'building-github-actions-gitlab-ci-workflows',
    question: 'How to get started with building GitHub Actions or GitLab CI workflows to automate Dataiku project deployment.',
    answer: `
### 1. Introduction/Overview
Modern Git providers like GitHub and GitLab have powerful, built-in CI/CD capabilities. You can create a workflow defined in a YAML file directly in your repository. This workflow can automate the testing and deployment of your Dataiku project by calling the Dataiku REST API.

### 2. Prerequisites
- A Dataiku project stored in a GitHub or GitLab repository.
- A Dataiku API key.

### 3. Step-by-Step Instructions (Using GitHub Actions)
1.  **Store the API Key as a Secret:**
    *   In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
    *   Create a new **repository secret** named \`DATAİKU_API_KEY\` and paste your API key as the value.
2.  **Create a Workflow File:**
    *   In your repository, create a directory path \`.github/workflows/\`.
    *   Inside this folder, create a new YAML file, for example, \`ci.yml\`.
3.  **Define the Workflow in YAML:**
    *   The YAML file defines the trigger and the jobs.
    *   The workflow will be triggered on a push to the main branch.
    *   The job will have steps that use \`curl\` to call the Dataiku REST API, using the secret you stored.
    > \`\`\`yaml
    > name: Dataiku CI/CD
    >
    > on:
    >   push:
    >     branches: [ main ]
    >
    > jobs:
    >   test-and-deploy:
    >     runs-on: ubuntu-latest
    >     steps:
    >     - name: Run Tests in Dataiku
    >       env:
    >         API_KEY: \${{ secrets.DATAİKU_API_KEY }}
    >       run: |
    >         curl -u $API_KEY: -X POST https://dss.mycompany.com/public/api/projects/MYPROJ/scenarios/run_tests/run
    >         # A real workflow would need to poll for job completion here
    > \`\`\`
4.  **Commit the Workflow File:** Commit and push the \`ci.yml\` file. GitHub Actions will now automatically detect and run this workflow on the next push to the main branch.

### 4. Resources and Tools
- **GitHub Actions / GitLab CI:** The integrated CI/CD platform.
- **YAML:** The language for defining the workflow pipeline.
- **Repository Secrets:** The secure way to store credentials.
- **Dataiku REST API:** The interface your workflow script will call.

### 5. Next Steps and Progression
- **Pull Request Trigger:** Change the \`on:\` trigger to \`pull_request\` to have your tests run automatically every time a PR is opened. You can configure this as a required status check, preventing merging until the tests pass.
- **Multi-Step Deployment:** Add more steps to your job to create a project bundle and deploy it to a production Dataiku instance.
- **Use Community Actions:** There are pre-built actions in the GitHub Marketplace that can simplify calling Dataiku APIs.

### 6. Common Challenges and Solutions
- **Challenge:** My workflow run fails with a 401 Unauthorized error.
- **Solution:** Check that your secret is named correctly and that the API key has the right permissions in Dataiku. The syntax for passing secrets to shell scripts in YAML can be tricky, so double-check the documentation for your CI/CD provider.
- **Challenge:** The workflow runner can't connect to my Dataiku instance.
- **Solution:** If your Dataiku instance is behind a corporate firewall, the public, cloud-hosted runners used by GitHub/GitLab may not be able to reach it. You may need to set up **self-hosted runners** on a machine within your own network.
`,
  },
  {
    id: 524,
    slug: 'enabling-continuous-delivery-with-cicd-tools',
    question: 'How to get started with enabling continuous delivery of Dataiku flows using Bamboo, Jenkins, or Bitbucket pipelines.',
    answer: `
### 1. Introduction/Overview
Continuous Delivery (CD) is the practice of automating the release of new code or project versions to production. Integrating Dataiku with a CI/CD tool (like Jenkins, Bamboo, or Bitbucket Pipelines) enables you to create a reliable, repeatable, and automated process for deploying your data pipelines.

### 2. Prerequisites
- **A CI/CD tool** configured and running.
- **A multi-environment Dataiku setup** (e.g., Dev, Test, Prod).
- **Your Dataiku project connected to Git.**
- **A Dataiku API key** for your CI/CD tool.

### 3. Step-by-Step Instructions: The CD Pipeline
A Continuous Delivery pipeline is typically an extension of a Continuous Integration (CI) pipeline.

1.  **Trigger:** The pipeline is triggered by a merge to your main or release branch in Git.
2.  **CI Phase (Automated Testing):**
    *   The first stages of the pipeline are for CI.
    *   The script calls the Dataiku API to run a "test" scenario on a Dev or Test instance.
    *   The pipeline only proceeds if all tests pass.
3.  **Build Artifact:**
    *   If tests pass, the next stage calls the Dataiku API to create a **project bundle** (\`.zip\` file).
    *   This bundle is your release artifact. The script downloads it and archives it in the CI/CD tool.
4.  **Manual Approval Gate:**
    *   A key part of CD (as opposed to Continuous *Deployment*) is a manual approval gate.
    *   The pipeline pauses and waits for a human (e.g., a release manager or a product owner) to click an "Approve for Production" button.
5.  **Deploy to Production:**
    *   Upon approval, the final stage of the pipeline runs.
    *   It takes the archived project bundle and calls the Dataiku API on the **production instance** to import the bundle, updating the production project to the new version.
    *   It can then run a final "smoke test" scenario in production.

### 4. Resources and Tools
- **Your CI/CD Tool (Jenkins, Bamboo, etc.):** The engine for the pipeline.
- **Dataiku REST API:** The interface for controlling all the Dataiku actions.
- **Project Bundles:** The versioned, deployable artifacts.

### 5. Next Steps and Progression
- **Automated Rollbacks:** A more advanced pipeline could include a rollback stage. If the post-deployment smoke test fails, the script could automatically re-deploy the *previous* successful version of the project bundle.
- **Infrastructure as Code:** The deployment pipeline could also trigger Terraform or similar scripts to provision or update the necessary cloud infrastructure for the project.

### 6. Common Challenges and Solutions
- **Challenge:** Deployments are risky.
- **Solution:** A well-designed CD pipeline *reduces* risk. By automating the process, you eliminate the human error associated with manual deployments. The automated testing and manual approval gates ensure that only validated changes go live.
- **Challenge:** "How does the pipeline handle the different database connections for dev and prod?"
- **Solution:** When you import a project bundle via the API, you can provide parameters to remap the connections. The deployment script would specify that the project should use the "prod_db" connection instead of the "dev_db" connection.
`,
  },
  {
    id: 525,
    slug: 'integrating-infrastructure-as-code-for-provisioning',
    question: 'How to get started with integrating infrastructure-as-code (e.g. Terraform, Azure DevOps) to provision Dataiku infrastructure.',
    answer: `
### 1. Introduction/Overview
Infrastructure as Code (IaC) is the practice of managing and provisioning your IT infrastructure using machine-readable definition files, rather than manual configuration. Using an IaC tool like Terraform to deploy your Dataiku infrastructure ensures your environments are consistent, repeatable, and version-controlled.

### 2. Prerequisites
- **An IaC tool** like Terraform or an equivalent (AWS CloudFormation, Azure ARM Templates).
- **A cloud provider account** (AWS, Azure, GCP).
- **A Dataiku license file.**

### 3. Step-by-Step Instructions: A Terraform Example
1.  **Install Terraform:** Install the Terraform CLI on your machine.
2.  **Configure Your Provider:** Create a \`.tf\` file to configure the cloud provider you are using (e.g., AWS). This is where you will provide your cloud credentials.
3.  **Define Your Infrastructure Resources:** In your \`.tf\` files, define all the resources needed to run Dataiku.
    *   **A Virtual Machine:** Define an \`aws_instance\` (for EC2) or equivalent, specifying the instance type, OS image (AMI), and networking details (VPC, subnet, security group).
    *   **A Database:** Define an \`aws_db_instance\` (for RDS) to host the backend PostgreSQL database for Dataiku.
    *   **Storage:** Define an S3 bucket for Dataiku's data directory.
4.  **Install Dataiku with a Provisioner:**
    *   Use a Terraform **provisioner** (like \`remote-exec\`) to run a script on the VM after it's created.
    *   This script will download the Dataiku software, run the installer, and place your license file.
5.  **Plan and Apply:**
    *   Run \`terraform plan\`. Terraform will show you all the resources it is going to create.
    *   Run \`terraform apply\`. Terraform will now connect to your cloud provider and create all the defined resources and configure them. After a few minutes, you will have a fully running Dataiku instance.

### 4. Resources and Tools
- **Terraform:** The leading IaC tool.
- **Cloud Provider SDKs:** Used by Terraform to interact with the cloud APIs.
- **Shell Scripting:** For automating the software installation on the provisioned VM.

### 5. Next Steps and Progression
- **Kubernetes Provisioning:** Use Terraform to provision a managed Kubernetes cluster (like EKS) and then use the Helm provider for Terraform to deploy Dataiku onto that cluster.
- **CI/CD Integration:** Integrate your Terraform scripts into a CI/CD pipeline. When you commit a change to your \`.tf\` files, the pipeline can automatically run \`terraform apply\` to update your infrastructure.
- **State Management:** Use a remote backend for your Terraform state file (like an S3 bucket) to securely share the state of your infrastructure with your team.

### 6. Common Challenges and Solutions
- **Challenge:** Writing Terraform code is complex.
- **Solution:** Start with the official Terraform documentation for your cloud provider, which includes many examples. Begin by just trying to provision a single VM, then gradually add more resources like the database and storage.
- **Challenge:** A change to a resource requires it to be destroyed and recreated.
- **Solution:** This is how Terraform works sometimes. The \`terraform plan\` command will warn you when this is going to happen. This emphasizes the need for a good backup and restore strategy for your Dataiku instance data.
`,
  },
  {
    id: 526,
    slug: 'adding-scenario-runs-validation-tests-to-ci-pipeline',
    question: 'How to get started with adding Dataiku scenario runs or validation tests into your CI pipeline as build steps.',
    answer: `
### 1. Introduction/Overview
A Continuous Integration (CI) pipeline should do more than just check for syntax errors; it should validate that your changes haven't broken the logic of your data pipeline. A standard practice is to add a step to your CI pipeline that triggers a "test" scenario in Dataiku and fails the build if the tests don't pass.

### 2. Prerequisites
- **A CI pipeline** set up for your Dataiku project (e.g., in Jenkins or GitHub Actions).
- **A dedicated "test" scenario** created in your Dataiku project. This scenario should contain "Run checks" steps that validate your data quality rules.

### 3. Step-by-Step Instructions
1.  **Create a Test Scenario in Dataiku:**
    *   Go to your Dataiku project and create a new scenario named \`run_all_tests\`.
    *   This scenario should contain a series of **Run checks** steps that execute the predefined data quality checks on your critical datasets.
    *   It can also contain steps to run unit tests for your Python recipes if you have them.
2.  **Modify Your CI/CD Script:**
    *   Open your CI pipeline's configuration file (e.g., \`Jenkinsfile\` or \`ci.yml\`).
3.  **Add a "Run Tests" Stage:**
    *   Add a new stage to your pipeline, right after the step that checks out the code.
4.  **Trigger the Test Scenario:**
    *   In this stage, add a script step that makes a **REST API call** to trigger your \`run_all_tests\` scenario in Dataiku.
5.  **Poll for Results (Critical Step):**
    *   The API call to run a scenario is asynchronous; it just starts the job. Your CI script must then **poll** for the result.
    *   This involves:
        1.  Capturing the \`jobId\` from the response of the initial "run" API call.
        2.  Entering a loop that calls the "get job status" API endpoint every few seconds.
        3.  Exiting the loop when the job's status is no longer "RUNNING".
6.  **Fail the Build:**
    *   After the loop, check the final outcome of the job.
    *   If the outcome is not "SUCCESS", your CI script must exit with a non-zero status code. This will cause the CI pipeline to fail, blocking the merge and notifying the developer of the test failure.

### 4. Resources and Tools
- **Your CI/CD Tool (Jenkins, GitHub Actions, etc.).**
- **Dataiku's REST API:** Specifically the endpoints for running a scenario and getting a job's status.
- **\`curl\` and \`jq\`:** Command-line tools that are useful in your script for making the API calls and parsing the JSON responses.

### 5. Next Steps and Progression
- **Required Status Checks:** In GitHub, you can configure your "Run Tests" CI job as a required status check for pull requests. This will physically prevent a PR from being merged until all your Dataiku validation tests have passed.

### 6. Common Challenges and Solutions
- **Challenge:** The polling script is complex to write.
- **Solution:** It is. This is the most complex part of the integration. You need to handle timeouts and different failure modes. Look for example scripts online or in your CI/CD tool's documentation for "polling a REST API".
- **Challenge:** The tests take a long time and slow down the CI pipeline.
- **Solution:** Your Dataiku test scenario should be designed to run quickly. It should run on a small, representative sample of the data, not the full production dataset. The goal is to quickly catch logic errors, not to do a full production run.
`,
  },
  {
    id: 527,
    slug: 'creating-automated-tests-for-ci',
    question: 'How to get started with creating automated tests (unit or integration) for Dataiku projects as part of CI.',
    answer: `
### 1. Introduction/Overview
Automated testing is a pillar of CI/CD. For a Dataiku project, this involves creating a suite of tests that can be run automatically to validate the correctness of your data pipelines. These tests fall into two main categories: data quality checks and unit tests for code.

### 2. Prerequisites
- **A Dataiku project** integrated with a CI/CD pipeline.
- **A clear understanding of what constitutes "correct"** for your data and logic.

### 3. Step-by-Step Instructions

#### Part 1: Creating Data Quality Tests
1.  **Define Checks on Your Datasets:** This is the easiest way to create tests.
    *   In Dataiku, open a critical dataset and go to the **Status > Checks** tab.
    *   Define rules about the data. For example:
        *   The \`customer_id\` column should never be empty.
        *   The \`order_total\` should always be a positive number.
        *   The row count should be within a certain range.
2.  **Create a "Test" Scenario:**
    *   Create a scenario named \`run_data_quality_tests\`.
    *   In this scenario, add a **Run checks** step for each dataset you want to validate.
3.  **Trigger from CI:** Your CI pipeline will trigger this scenario. If any check fails, the scenario fails, which in turn fails your CI build.

#### Part 2: Creating Unit Tests for Python Code
1.  **Write Testable Code:** Write your complex logic as pure functions in your project's **Library**. These functions should take data as input and return a result, without relying on global state.
2.  **Use a Testing Framework:** Use a standard Python testing framework like \`pytest\`.
3.  **Write Test Functions:** In your library, create a separate file (e.g., \`test_my_utils.py\`). In this file, write test functions that call your logic with sample input and assert that the output is what you expect.
    > \`\`\`python
    > from my_utils import my_sum_function
    >
    > def test_sum_function():
    >     assert my_sum_function(2, 3) == 5
    > \`\`\`
4.  **Create a "Test" Recipe:** In your Flow, create a Python recipe that uses the \`pytest\` library to discover and run all the tests in your library. If any test fails, the recipe should fail.
5.  **Add to Test Scenario:** Add this test-running recipe to your main \`run_data_quality_tests\` scenario.

### 4. Resources and Tools
- **Dataiku Metrics and Checks:** For declarative, data-focused testing.
- **Python Recipes and Libraries:** For code-based unit testing.
- **\`pytest\`:** The standard Python testing framework.

### 5. Next Steps and Progression
- **Test Coverage:** Use tools to measure your test coverage and ensure that your most critical code is well-tested.
- **Integration Tests:** Your test scenario can also be considered an integration test, as it runs parts of your flow together to ensure they work.

### 6. Common Challenges and Solutions
- **Challenge:** "Writing tests is time-consuming."
- **Solution:** It is an upfront investment that pays for itself many times over by catching bugs early, when they are cheapest to fix. Start by adding tests for your most critical logic, and gradually increase coverage over time.
- **Challenge:** "I don't know what to test."
- **Solution:** Think about edge cases. What happens if your function receives a null value? A negative number? An empty string? Your tests should cover these cases. For data checks, think about what would constitute "bad" data for your use case.
`,
  },
  {
    id: 528,
    slug: 'migrating-projects-between-environments-with-scripts-apis',
    question: 'How to get started with migrating Dataiku projects between development and production environments using automated scripts or APIs.',
    answer: `
### 1. Introduction/Overview
Automating the migration of projects between environments (e.g., from Dev to Prod) is a core MLOps practice that ensures deployments are fast, reliable, and repeatable. This is achieved by writing a script that uses the **Dataiku REST API** to perform the export and import operations.

### 2. Prerequisites
- **Separate Dev and Prod Dataiku instances.**
- **A scripting environment** (e.g., a Jenkins server, a local machine with Python).
- **API keys** for both the dev and prod instances with administrative permissions.

### 3. Step-by-Step Instructions: A Deployment Script
The following outlines the logic for a Python deployment script.

1.  **Set Up the Script:**
    *   Import necessary libraries (\`requests\`, \`json\`).
    *   Define variables for your instance URLs, project keys, and API keys. Store API keys securely, not in the script.
2.  **Step 1: Create the Bundle:**
    *   Make a POST request to the **bundle export endpoint** on your **Dev** instance API.
    *   This API call tells Dataiku to create a \`.zip\` bundle of your project.
3.  **Step 2: Download the Bundle:**
    *   Make a GET request to the **bundle download endpoint**, passing the bundle ID from the previous step.
    *   Stream the response to a local file on your script's machine (e.g., \`my_project.zip\`).
4.  **Step 3: Upload the Bundle:**
    *   Make a POST request to the **bundle import endpoint** on your **Prod** instance API.
    *   This request needs to be a multipart/form-data request, with the \`my_project.zip\` file attached.
5.  **Step 4: Remap Connections and Deploy:**
    *   The import API call can include a JSON payload that specifies how to remap connections and variables for the production environment.
    *   Dataiku will then import the project, apply the remappings, and the new version of your project will be live in production.
6.  **Step 5: Cleanup:** Delete the local bundle file.

### 4. Resources and Tools
- **Dataiku REST API Documentation:** Essential for finding the exact endpoints and required parameters for bundle operations.
- **Python \`requests\` library:** A powerful tool for making the HTTP calls in your script.
- **A CI/CD tool (Jenkins, etc.):** The ideal place to run your deployment script.

### 5. Next Steps and Progression
- **Error Handling:** Your script must have robust error handling. It should check the status code of every API response and fail the deployment if any step does not succeed.
- **Pre- and Post-Deployment Steps:** A complete pipeline would include steps to run tests before creating the bundle and to run a smoke test scenario after the deployment to production.

### 6. Common Challenges and Solutions
- **Challenge:** The API calls are complex, especially the file upload.
- **Solution:** This is true. The file upload requires a correctly formatted multipart request. Look for examples in the documentation for your specific language or library (e.g., the Python \`requests\` library has clear documentation on how to post files).
- **Challenge:** "The import failed with a dependency error."
- **Solution:** This can happen if your project depends on a plugin or a code environment that exists on your Dev instance but has not been installed on the Prod instance. Your deployment process must also include a step to ensure the environments are synchronized.
`,
  },
  {
    id: 529,
    slug: 'triggering-scenarios-from-ci-cd-on-new-code-data',
    question: 'How to get started with triggering Dataiku scenarios from a CI/CD pipeline whenever new code or data is available.',
    answer: `
### 1. Introduction/Overview
A key principle of CI/CD is automation. You want your pipelines to run automatically in response to events, rather than manual triggers. This can be achieved by setting up triggers for two main types of events: new code (via Git webhooks) and new data (via API calls).

### 2. Prerequisites
- A CI/CD pipeline (e.g., in GitHub Actions, Jenkins).
- A Dataiku project connected to Git.
- A process that delivers new data files to a known location.

### 3. Step-by-Step Instructions

#### Triggering on New Code
1.  **Set Up a Webhook:** In your Git provider (GitHub, GitLab, etc.), go to your project repository's settings and find the "Webhooks" section.
2.  **Configure the Webhook:**
    *   Create a new webhook.
    *   The **Payload URL** should be the trigger URL for your CI/CD pipeline.
    *   Configure the webhook to fire on a **push** or **pull_request** event.
3.  **The CI/CD Workflow:**
    *   When a developer pushes a change, the webhook fires, which triggers your CI/CD pipeline.
    *   The pipeline script can then call the Dataiku API to run a test scenario on the new code.

#### Triggering on New Data
1.  **Set Up an External Triggering Process:**
    *   The system that generates the new data needs to be able to send a signal when it's done.
2.  **Method A (Direct API Call):**
    *   The simplest method. After the external process finishes writing the new data file, it should, as its final step, make a **REST API call** to Dataiku to trigger the scenario that processes that file.
3.  **Method B (Cloud Event Triggering):**
    *   A more robust, cloud-native pattern.
    *   Configure a cloud event service (like AWS Lambda with an S3 trigger, or an Azure Function with an Event Grid trigger).
    *   When a new file is dropped into your cloud storage bucket, the event fires, which invokes your Lambda function.
    *   The code in the Lambda function then makes the REST API call to trigger the Dataiku scenario.

### 4. Resources and Tools
- **Git Webhooks:** The standard mechanism for triggering CI on code changes.
- **Dataiku REST API:** The interface for triggering scenarios from external systems.
- **Cloud Functions (Lambda, etc.):** The glue for creating event-driven data triggers in the cloud.

### 5. Next Steps and Progression
- **Dataiku's Native Triggers:** For simpler cases, Dataiku has a built-in "Dataset changed" trigger in scenarios. This works well if the new data is being produced by another Dataiku job, but can be less reliable for data dropped by external systems. The API-based approach is generally more robust for external triggers.

### 6. Common Challenges and Solutions
- **Challenge:** The external system can't make an API call.
- **Solution:** If the system is very old, you might need an intermediate step. The system could create a "trigger file" (an empty file like \`_SUCCESS\`) after it's done. You could then have a simple script that runs on a schedule (e.g., every 5 minutes), checks for the existence of this trigger file, and if it exists, makes the API call to Dataiku and then deletes the trigger file.
`,
  },
  {
    id: 530,
    slug: 'configuring-dataiku-with-aws-sagemaker-lambda-s3',
    question: 'How to get started with configuring Dataiku to use AWS SageMaker, Lambda, and S3 for model training and inference.',
    answer: `
### 1. Introduction/Overview
Dataiku is an open platform that integrates with the broader cloud ecosystem. You can use Dataiku as a control plane to orchestrate jobs on powerful AWS services like SageMaker for model training, Lambda for serverless functions, and S3 for scalable storage. This integration is typically done using the AWS SDK (Boto3) from within a Python recipe.

### 2. Prerequisites
- An AWS account with SageMaker, Lambda, and S3 services enabled.
- An AWS IAM user or role with permissions to access these services.
- A Dataiku code environment with the \`boto3\` library installed.

### 3. Step-by-Step Instructions: Integration Patterns

#### 1. Using S3 for Data Storage
- **How:** This is the most common integration. In **Administration > Connections**, create a new **Amazon S3** connection. Provide your AWS credentials (or better, use an IAM role if Dataiku is on EC2).
- **Use Case:** You can now create datasets that read from and write to S3 buckets directly from the Dataiku UI. This should be your default storage for large datasets.

#### 2. Using AWS SageMaker for Model Training
- **How:**
    1.  In a Dataiku **Python recipe**, use \`boto3\` to interact with SageMaker.
    2.  The script would first take data from a Dataiku dataset and upload it to S3 in the format SageMaker expects.
    3.  Then, it would use \`boto3\` to create and run a SageMaker training job, pointing it to the data in S3 and specifying the training algorithm.
    4.  The script can then monitor the training job and retrieve the model artifacts when it's done.
- **Use Case:** To leverage a specific algorithm or a distributed training capability available in SageMaker that is not native to Dataiku.

#### 3. Using AWS Lambda for Inference or Tasks
- **How:**
    1.  In a Python recipe, use \`boto3\` to invoke a Lambda function.
    2.  You can pass a payload of data to the Lambda function.
    3.  The Lambda function can perform its logic (e.g., call a proprietary model for a prediction) and return a result to your Dataiku script.
- **Use Case:** To integrate a serverless, event-driven component or a pre-existing business function into your Dataiku flow.

### 4. Resources and Tools
- **Python Recipe:** The environment for your integration code.
- **Boto3:** The official AWS SDK for Python.
- **AWS IAM:** The service for managing the permissions that allow Dataiku to call other AWS services.

### 5. Next Steps and Progression
- **Dataiku Plugins:** For a tighter integration, you could develop a custom Dataiku plugin that provides a visual recipe for calling your SageMaker or Lambda functions, hiding the Boto3 code from the end user.

### 6. Common Challenges and Solutions
- **Challenge:** "My recipe fails with an 'Access Denied' error when calling an AWS service."
- **Solution:** This is an IAM permissions issue. The IAM user or role that Dataiku is using does not have the necessary permissions in its policy. For example, to run a SageMaker job, it needs permissions like \`sagemaker:CreateTrainingJob\`.
- **Challenge:** "How do I manage my AWS credentials in Dataiku?"
- **Solution:** The best and most secure practice is to run your Dataiku instance on an EC2 virtual machine and assign an **IAM Role** to that instance. In your Dataiku S3 connection, you can then specify to use the IAM role, which avoids the need to store static access keys.
`,
  },
  {
    id: 531,
    slug: 'integrating-with-azure-ml-services-storage',
    question: 'How to get started with integrating Dataiku DSS with Azure ML services and Azure Storage for end-to-end pipelines.',
    answer: `
### 1. Introduction/Overview
Dataiku seamlessly integrates with the Microsoft Azure cloud ecosystem. You can use Azure Blob Storage for scalable data storage and call out to Azure Machine Learning (AML) services for specialized training or deployment. This integration is typically done from a Python recipe using the Azure SDK.

### 2. Prerequisites
- An Azure subscription with Azure Blob Storage and Azure Machine Learning resources.
- An Azure Service Principal (an application identity) with permissions to access these resources.
- A Dataiku code environment with the Azure SDKs installed (\`azure-storage-blob\`, \`azure-ai-ml\`).

### 3. Step-by-Step Instructions: Integration Patterns

#### 1. Using Azure Blob Storage for Data
- **How:** In **Administration > Connections**, create a new **Azure Blob Storage** connection. Provide your storage account name and credentials (e.g., the Service Principal ID and secret).
- **Use Case:** You can now create datasets that read from and write to containers in your Azure Blob Storage account. This is the recommended storage location for large datasets when running on Azure.

#### 2. Using Azure ML for Model Training
- **How:**
    1.  In a Dataiku **Python recipe**, use the Azure ML SDK.
    2.  Your script can take data from a Dataiku dataset, upload it to Azure Blob Storage, and then submit a "command job" to your Azure ML workspace.
    3.  This job can run a training script using compute resources managed by Azure ML.
- **Use Case:** To leverage specific features of the Azure ML platform, like its managed compute clusters or its experiment tracking capabilities, as part of a larger Dataiku workflow.

#### 3. Using Azure ML for Real-time Inference
- **How:**
    1.  You can train a model in Dataiku.
    2.  Use a Python recipe with the Azure ML SDK to deploy this model to an **Azure ML Managed Endpoint**.
    3.  Alternatively, from a Dataiku recipe, you can make an API call to an *existing* model endpoint that is already deployed on Azure ML.
- **Use Case:** To host your final, production model on Azure's scalable, managed inference infrastructure.

### 4. Resources and Tools
- **Python Recipe:** The environment for your Azure integration code.
- **Azure SDK for Python:** The official Microsoft libraries for interacting with Azure services.
- **Azure Service Principal:** The secure way to grant Dataiku programmatic access to your Azure resources.

### 5. Next Steps and Progression
- **Dataiku Plugins:** You can create a custom Dataiku plugin to provide a visual recipe for your users that calls an Azure ML endpoint, hiding the complexity of the SDK code.

### 6. Common Challenges and Solutions
- **Challenge:** "My script fails with an authentication error."
- **Solution:** This is a permissions issue with your Service Principal. In the Azure portal, go to the resource you are trying to access (e.g., the Storage Account or the ML Workspace) and check its Access Control (IAM) settings. Ensure your Service Principal has been assigned the appropriate role (e.g., "Storage Blob Data Contributor" or "AzureML Data Scientist").
- **Challenge:** "How do I securely store my Service Principal secret?"
- **Solution:** The best practice is to store the secret in **Azure Key Vault**. Then, you can configure Dataiku to connect to the Key Vault to retrieve the secret at runtime. Alternatively, you can store it as a "Password" type project variable in Dataiku.
`,
  },
  {
    id: 532,
    slug: 'connecting-to-gcp-bigquery-vertex-ai',
    question: 'How to get started with connecting Dataiku to Google Cloud BigQuery and Vertex AI for training and prediction.',
    answer: `
### 1. Introduction/Overview
Dataiku has strong native integration with the Google Cloud Platform (GCP). You can use BigQuery as a high-performance data source with full push-down computation, and you can integrate with Vertex AI to leverage Google's powerful, managed machine learning services as part of your Dataiku pipelines.

### 2. Prerequisites
- A GCP project with BigQuery and Vertex AI APIs enabled.
- A GCP Service Account with the necessary permissions (e.g., BigQuery User, Vertex AI User).
- A JSON key file for the service account.
- Dataiku administrator rights to configure connections.

### 3. Step-by-Step Instructions: Integration Patterns

#### 1. Using BigQuery for Data and Compute
- **How:**
    1.  In Dataiku, go to **Administration > Connections** and create a new **Google BigQuery** connection.
    2.  Authenticate by pasting the contents of your service account's JSON key file.
    3.  You can now create datasets in your Flow that point directly to BigQuery tables.
- **Use Case (Push-down):** When you use a visual recipe (like Prepare or Join) on BigQuery datasets, set the execution engine to **Run on database (SQL)**. Dataiku will generate BigQuery-optimized SQL and run it directly on the BigQuery engine, which is extremely performant for large datasets.

#### 2. Using Vertex AI for Model Training & Prediction
- **How:**
    1.  In a Dataiku **Python recipe**, use the Google Cloud AI Platform SDK.
    2.  To train a model, your script can prepare data, upload it to Google Cloud Storage (GCS), and then use the SDK to submit a training job to Vertex AI.
    3.  To get predictions, your script can call a deployed model endpoint on Vertex AI.
- **Use Case:** To leverage Google's AutoML capabilities or to run large-scale, distributed training jobs on infrastructure managed by Vertex AI.

### 4. Resources and Tools
- **BigQuery Connector:** Dataiku's native connector for reading, writing, and pushing down computation to BigQuery.
- **Python Recipe:** The environment for writing your Vertex AI integration code.
- **Google Cloud SDK for Python:** The library for interacting with Vertex AI and other GCP services.
- **GCP Service Account:** The secure, recommended way for Dataiku to authenticate with Google Cloud.

### 5. Next Steps and Progression
- **Explore other GCP Services:** From a Python recipe, you can use the Google Cloud SDK to connect to many other services, like Google Cloud Storage, Pub/Sub, or the various NLP and Vision APIs.
- **Dataiku Plugins:** For a tighter integration, you could build a Dataiku plugin that provides a visual recipe for calling a specific Vertex AI endpoint.

### 6. Common Challenges and Solutions
- **Challenge:** "My connection to BigQuery is failing."
- **Solution:** This is almost always a permissions issue. In the GCP IAM console, ensure your Service Account has been granted the necessary roles for your project (e.g., \`BigQuery User\`, \`BigQuery Data Viewer\`). Also, ensure the BigQuery API is enabled in your GCP project.
- **Challenge:** "My BigQuery queries from Dataiku are expensive."
- **Solution:** BigQuery's pricing is based on bytes scanned. To control costs, make sure your queries are as efficient as possible. Use partitioned tables and filter on the partition column in a \`WHERE\` clause whenever possible. You can use the BigQuery UI to estimate the cost of a query before running it.
`,
  },
  {
    id: 533,
    slug: 'deploying-workloads-on-emr-hdinsight-dataproc',
    question: 'How to get started with deploying Dataiku workloads on AWS EMR, Azure HDInsight, or GCP Dataproc for scalable Spark processing.',
    answer: `
### 1. Introduction/Overview
Managed Spark services like AWS EMR, Azure HDInsight, and Google Cloud Dataproc provide scalable, on-demand clusters for big data processing. Dataiku can be configured to submit Spark jobs directly to these services, allowing you to run your visual recipes and code recipes on massive datasets without managing the cluster yourself.

### 2. Prerequisites
- **A managed Spark cluster:** You must have an EMR, HDInsight, or Dataproc cluster already created in your cloud account.
- **Network connectivity:** The Dataiku instance must be able to communicate with the cluster's master node. This often requires running Dataiku in the same VPC or setting up network peering.
- **Administrator rights** in Dataiku to configure the Spark connection.

### 3. Step-by-Step Instructions
1.  **Configure the Connection in Dataiku (Admin Task):**
    *   Go to **Administration > Settings**.
    *   Navigate to the **Spark** section.
    *   Here you can configure Dataiku to connect to your specific managed service. The configuration details vary by provider, but you will typically need to provide the master node's address and specify the framework type (e.g., YARN).
    *   Dataiku's documentation provides specific guides for connecting to EMR, HDInsight, and Dataproc.
2.  **Ensure Data is on Compatible Storage:**
    *   Your input and output datasets must be on a storage system that the Spark cluster can access. This is typically the cloud provider's object storage (S3 for EMR, ADLS for HDInsight, GCS for Dataproc).
3.  **Use the Spark Engine:**
    *   Once configured, you can now run jobs on the cluster.
    *   **For a visual recipe:** Go to its **Advanced** settings and change the **Execution engine** to **Spark**.
    *   **For a code recipe:** Create a **PySpark** or **SparkR** recipe.
4.  **How it Works:** When you run the recipe, Dataiku will submit the job to your managed cluster's resource manager (YARN). The cluster will then execute the Spark application, and the logs will be streamed back to the Dataiku UI.

### 4. Resources and Tools
- **Dataiku's official documentation:** Has detailed, provider-specific guides for these integrations.
- **Cloud provider consoles:** For creating and managing the EMR/HDInsight/Dataproc clusters.
- **The Spark UI:** Accessible through the cluster's management console, this is essential for monitoring and debugging your jobs.

### 5. Next Steps and Progression
- **Autoscaling Clusters:** Configure your managed cluster to autoscale. It can automatically add worker nodes when a large job is submitted and remove them when idle, which is highly cost-effective.
- **Dynamic Clusters:** For advanced use cases, Dataiku can be configured to programmatically create a new cluster just for a specific job run and then destroy it when the job is complete.

### 6. Common Challenges and Solutions
- **Challenge:** "Dataiku can't submit the job to the cluster."
- **Solution:** This is almost always a network connectivity or permissions issue. Ensure the Dataiku server can reach the cluster's master node and that any firewalls are configured to allow the necessary traffic. The user Dataiku is running as may also need specific permissions to submit jobs to the YARN queue.
- **Challenge:** "My job is failing on the cluster."
- **Solution:** Use the Spark UI for your managed cluster to debug. Find the failed application and look at the logs for the executors. This will give you the detailed error traceback.
`,
  },
  {
    id: 534,
    slug: 'managing-credentials-via-aws-iam-roles-azure-service-principals',
    question: 'How to get started with managing Dataiku credentials via AWS IAM roles or Azure service principals for secure access.',
    answer: `
### 1. Introduction/Overview
Storing static credentials like access keys or secrets is a security risk. The modern, best-practice approach in the cloud is to use **identity-based authentication**. This involves giving the Dataiku server itself an identity (an AWS IAM Role or an Azure Service Principal) and granting that identity permissions to access other cloud resources. This method is more secure because it avoids the need to store and manage long-lived passwords or keys.

### 2. Prerequisites
- **Dataiku running on a cloud VM:** Your Dataiku instance should be running on an AWS EC2 instance or an Azure VM.
- **Administrator access** to your AWS or Azure account to manage identities.

### 3. Step-by-Step Instructions

#### For AWS (using IAM Roles)
1.  **Create an IAM Role:** In the AWS IAM console, create a new role. Attach policies to this role that grant it the necessary permissions (e.g., permission to read from a specific S3 bucket).
2.  **Attach the Role to the EC2 Instance:** When you launch the EC2 instance for Dataiku (or by modifying an existing one), attach the IAM role you just created.
3.  **Configure the Dataiku Connection:**
    *   In Dataiku, go to **Administration > Connections** and create a new connection (e.g., to S3).
    *   In the authentication settings, instead of entering an access key, select **Use IAM role**.
    *   Leave the credential fields blank. Dataiku will automatically use the credentials of the role attached to the EC2 instance it's running on.

#### For Azure (using Service Principals and Managed Identities)
1.  **Enable Managed Identity:** In the Azure portal, go to the settings for the VM where Dataiku is running. Enable the "System-assigned managed identity". This gives the VM its own identity in Azure Active Directory.
2.  **Grant Permissions:** Go to the resource you want to access (e.g., a Storage Account). In its **Access Control (IAM)** settings, add a new role assignment. Assign the necessary role (e.g., "Storage Blob Data Contributor") to the managed identity of your Dataiku VM.
3.  **Configure the Dataiku Connection:** In the Dataiku connection settings (e.g., for Azure Blob Storage), choose to authenticate using the **Managed Identity**.

### 4. Resources and Tools
- **AWS IAM Console / Azure Active Directory Portal:** The cloud provider tools for creating and managing identities and permissions.
- **Dataiku Connections Page:** Where you configure Dataiku to use the role-based authentication.

### 5. Next Steps and Progression
- **Principle of Least Privilege:** When defining the policies for your IAM role or Service Principal, grant only the minimum permissions necessary. For example, grant read-only access to a specific S3 bucket, not read/write access to all buckets.
- **Cross-Account Access (AWS):** You can use IAM roles to grant a Dataiku instance in one AWS account secure access to resources in a different AWS account.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm getting an 'Access Denied' error even when using an IAM role."
- **Solution:** The policy attached to the IAM role is not correct. Use the AWS or Azure policy simulator tools to debug the policy and ensure it grants the specific action (e.g., \`s3:GetObject\`) on the specific resource (e.g., \`arn:aws:s3:::my-bucket/*\`).
- **Challenge:** "This option isn't available for all connection types."
- **Solution:** This is true. Role-based authentication is typically supported for the cloud provider's own native services (e.g., S3, Redshift, Blob Storage). For other connections, like a generic database, you may still need to use traditional username/password credentials.
`,
  },
  {
    id: 535,
    slug: 'linking-to-cloud-data-warehouses-snowflake-redshift-bigquery',
    question: 'How to get started with linking Dataiku to cloud data warehouses (Snowflake, Redshift, BigQuery) for large-scale data access.',
    answer: `
### 1. Introduction/Overview
Cloud data warehouses are the centerpiece of the modern data stack. Dataiku provides powerful, native connectors for all major warehouses like Snowflake, Redshift, and BigQuery. Connecting Dataiku allows you to seamlessly read, write, and—most importantly—push down transformations to leverage the full power of your data warehouse.

### 2. Prerequisites
- **An account with a cloud data warehouse provider.**
- **Connection details:** You will need the server URL, username, password, and default warehouse/database names.
- **Dataiku Administrator rights** to create the shared connection.
- **Network access:** The Dataiku server must be able to reach the data warehouse's public endpoint.

### 3. Step-by-Step Instructions
1.  **Navigate to Connections:** As an administrator, go to **Administration > Connections** in Dataiku.
2.  **Create a New Connection:** Click **+ NEW CONNECTION**.
3.  **Select Your Warehouse Type:** From the list of database types, select your specific provider (e.g., **Snowflake**, **Amazon Redshift**, **Google BigQuery**).
4.  **Enter Connection Details:**
    *   Fill in the form with the credentials and connection details for your warehouse. Each warehouse has slightly different parameters (e.g., for Snowflake you need your account name, for BigQuery you need a project ID).
    *   It is highly recommended to use a dedicated service account user for Dataiku, with a strong password.
5.  **Test the Connection:**
    *   Click the **Test** button at the bottom of the form.
    *   A "Test successful" message confirms that your details are correct and that Dataiku can communicate with your data warehouse.
6.  **Create and Share:** Click **CREATE**. The connection is now available for users on the instance (if you grant them permission in the connection's settings).
7.  **Using the Connection:**
    *   In a project, a user can now click **+ DATASET** and select your warehouse (e.g., **Snowflake**). They will be able to browse the tables they have access to and import them as Dataiku datasets.

### 4. Resources and Tools
- **Dataiku Connections Page:** The central place for managing all external data connections.
- **Cloud Data Warehouse UI:** Where you find your connection details and manage user permissions.

### 5. Next Steps and Progression
- **Push-down Execution:** This is the key benefit. When working with visual recipes on Snowflake datasets, check the recipe's "Advanced" settings and set the execution engine to "Run on database (SQL)". Dataiku will generate Snowflake-optimized SQL instead of pulling data out.
- **Time Travel:** Use a SQL recipe to leverage Snowflake's \`AT\` or \`BEFORE\` clauses to query historical versions of your data.
- **Writing to Snowflake:** Use an **Export** recipe to create new tables in Snowflake from your Dataiku flow.

### 6. Common Challenges and Solutions
- **Challenge:** The connection test fails with a timeout or network error.
- **Solution:** This is a networking issue. The Dataiku server cannot reach the data warehouse. If your warehouse has a firewall or network policy, you must whitelist the IP address of your Dataiku server to allow inbound connections.
- **Challenge:** "The connection succeeds, but I can't see any tables."
- **Solution:** This is a permissions issue within your data warehouse. The user account that Dataiku is using does not have \`USAGE\` permission on the database or schema, or \`SELECT\` permission on the tables. You need to grant these privileges in the data warehouse itself.
`,
  },
  {
    id: 536,
    slug: 'optimizing-spark-compute-on-cloud-clusters-autoscaling',
    question: 'How to get started with optimizing Dataiku Spark compute on cloud clusters and autoscaling for cost-efficiency.',
    answer: `
### 1. Introduction/Overview
Running Spark jobs on cloud-based managed clusters (like EMR, Dataproc, or HDInsight) offers incredible power, but also the risk of high costs if not managed correctly. Optimizing your Spark jobs involves right-sizing your clusters and using autoscaling to ensure you only pay for the compute you actually use.

### 2. Prerequisites
- **A Dataiku instance integrated with a managed Spark service** on AWS, Azure, or GCP.
- **Large-scale Spark jobs** that you need to run.
- **Administrator access** to your cloud provider account to configure the clusters.

### 3. Step-by-Step Instructions

#### 1. Right-Sizing Your Cluster
- **Don't overprovision.** It's tempting to choose the largest possible instance types for your worker nodes, but this is often wasteful.
- **Analyze your workload.** Use the Spark UI to monitor your jobs. Look at the memory and CPU usage of your executors. Are they consistently underutilized? If so, you can choose smaller instance types for your worker nodes to save money.
- **Use different clusters for different workloads.** You could have a smaller, persistent cluster for general development and a larger, more powerful cluster that is only spun up for a specific, heavy production job.

#### 2. Implementing Autoscaling
- **What it is:** Autoscaling automatically adds or removes worker nodes from your cluster in response to load.
- **How to configure:** All major managed Spark services support autoscaling. In your cluster's configuration (e.g., in the EMR or Dataproc console), you can enable autoscaling and set rules:
    *   **Minimum size:** The number of nodes to always keep running.
    *   **Maximum size:** The maximum number of nodes the cluster can scale up to.
    *   **Scaling metric:** The metric used to trigger scaling events. This is often based on YARN memory or vCore availability.
- **Benefit:** When you submit a large job, the cluster will automatically add nodes to handle the load. When the job is finished and the cluster is idle, it will automatically scale back down to the minimum size, significantly reducing costs.

#### 3. Using Spot/Preemptible Instances
- **What they are:** Cloud providers sell their unused capacity at a steep discount as "spot" (AWS) or "preemptible" (GCP) instances. These instances can be terminated with little notice.
- **How to use:** You can configure your Spark cluster's worker nodes to use these cheaper instances.
- **Best for:** Fault-tolerant workloads that are not time-critical. If a few spot instances are terminated, Spark is often able to recompute the lost work on other nodes. This is a great way to reduce the cost of large, non-urgent jobs.

### 4. Resources and Tools
- **Cloud Provider Consoles (EMR, Dataproc, etc.):** Where you configure cluster size and autoscaling rules.
- **The Spark UI:** Essential for monitoring your job's resource utilization to inform your sizing decisions.
- **Cloud Cost Management Tools:** To track the cost of your clusters and measure the savings from your optimizations.

### 5. Next Steps and Progression
- **Dynamic Cluster Allocation:** For ultimate cost-efficiency, Dataiku can be configured to programmatically create a new cluster for a specific job run and then terminate the cluster as soon as the job is complete. This ensures you pay for compute only for the exact duration of your job.

### 6. Common Challenges and Solutions
- **Challenge:** "My autoscaling cluster is not scaling up when I submit a big job."
- **Solution:** Your autoscaling rules may be misconfigured. Check the scaling metric. The job might not be consuming enough YARN memory to trigger the scale-up event. You may need to adjust the thresholds in your scaling policy.
- **Challenge:** "My job on spot instances failed because too many nodes were terminated."
- **Solution:** This is the inherent risk of spot instances. They are not suitable for all workloads. Use them for jobs that can tolerate interruption. You can also configure your cluster to use a mix of on-demand and spot instances to balance cost and reliability.
`,
  },
  {
    id: 537,
    slug: 'setting-up-hybrid-architecture-on-prem-and-cloud',
    question: 'How to get started with setting up Dataiku in a hybrid architecture (on-prem DSS accessing cloud resources).',
    answer: `
### 1. Introduction/Overview
A hybrid architecture, where your main Dataiku instance is installed on-premise but connects to data and compute resources in the cloud, is a common pattern for organizations that are beginning their cloud journey. This setup allows you to leverage the scalability of the cloud while keeping the core platform within your own data center.

### 2. Prerequisites
- **An on-premise Dataiku instance.**
- **A cloud provider account** (AWS, Azure, or GCP).
- **Secure network connectivity** between your on-premise data center and your cloud VPC.

### 3. Step-by-Step Instructions: The Key Components

#### 1. Establish Secure Network Connectivity
- **This is the foundational step.** Your on-premise Dataiku server needs a secure, private, and fast connection to your cloud environment. The standard options are:
    - **AWS Direct Connect / Azure ExpressRoute / Google Cloud Interconnect:** A dedicated, private physical connection. This offers the highest performance and security but is also the most expensive.
    - **Site-to-Site VPN:** An encrypted tunnel over the public internet. This is a more common and cost-effective solution.
- **Work with your network team.** Setting up this connectivity is a specialized task that requires collaboration with your network engineering and security teams.

#### 2. Configure Firewall Rules
- You will need to configure firewalls on both your on-premise network and in your cloud provider's VPC to allow traffic between the Dataiku server and the specific cloud services you want to use. You should only open the necessary ports.

#### 3. Set Up Data Connections in Dataiku
- Once network connectivity is established, an administrator can go to **Administration > Connections** in your on-premise Dataiku instance.
- They can now create connections to your cloud data services (e.g., **Amazon S3**, **Snowflake**, **Azure Blob Storage**), using the private IP addresses or internal DNS names of those services.

#### 4. Use the Hybrid Resources
- **For Storage:** You can now create datasets that read data directly from cloud storage buckets like S3.
- **For Compute:** You can configure visual recipes to push down execution to a cloud data warehouse like Snowflake or Redshift. The query will be sent from your on-premise Dataiku instance, over the private connection, to the cloud database for execution.

### 4. Resources and Tools
- **VPN / Direct Connect:** The core networking technologies.
- **Cloud Provider Networking Tools (VPCs, Security Groups, etc.).**
- **Dataiku Connections:** The feature for connecting to your cloud data sources.

### 5. Next Steps and Progression
- **Hybrid Compute:** While less common, you could even configure your on-premise Dataiku to submit Spark jobs to a managed cloud cluster like AWS EMR. This requires careful network configuration to ensure all the necessary Spark communication ports are open over the VPN.
- **Data Movement:** Be mindful of data transfer costs. Moving large amounts of data from the cloud back to your on-premise instance can be expensive. A good hybrid architecture tries to keep the data and the computation in the same place (preferably the cloud) as much as possible.

### 6. Common Challenges and Solutions
- **Challenge:** "Dataiku can't connect to my S3 bucket."
- **Solution:** This is almost always a networking or firewall issue. Use standard network troubleshooting tools (\`ping\`, \`traceroute\`) from your on-premise Dataiku server to verify that it can reach the cloud service's endpoint. Work with your network team to diagnose firewall blocks.
- **Challenge:** "My jobs are slow."
- **Solution:** This could be due to latency on your network connection. A VPN over the internet will always have higher latency than a dedicated physical connection. Also, if you are pulling large amounts of data from the cloud to be processed in-memory on your on-premise Dataiku server, this will be very slow. You should refactor your flow to push the computation to the cloud.
`,
  },
  {
    id: 538,
    slug: 'integrating-cloud-event-triggers',
    question: 'How to get started with integrating cloud event triggers (S3 file arrival, Azure Event Grid) to kick off Dataiku scenarios.',
    answer: `
### 1. Introduction/Overview
For a truly event-driven architecture, you want your data pipelines to run automatically as soon as new data becomes available. By integrating Dataiku with cloud event services, you can create a system where, for example, a new file arriving in an S3 bucket instantly triggers the Dataiku scenario designed to process it.

### 2. Prerequisites
- **A cloud storage location** where new data files are dropped (e.g., AWS S3, Azure Blob Storage).
- **A serverless function service** in your cloud provider (e.g., AWS Lambda, Azure Functions).
- **A Dataiku scenario** that you want to trigger, and an **API key** with permission to run it.

### 3. Step-by-Step Instructions: AWS S3 + Lambda Example

1.  **Create the Target Dataiku Scenario:**
    *   In Dataiku, create the scenario that processes the data. For example, it could have a step to build a dataset that points to the S3 bucket.
2.  **Create the Lambda Function:**
    *   In the AWS Lambda console, create a new Python function.
    *   This function's job is simple: make a REST API call to Dataiku to trigger your scenario. Use the \`requests\` library for this.
    *   Store your Dataiku URL and API key securely using AWS Secrets Manager or as environment variables.
    > \`\`\`python
    > import requests
    > import os
    >
    > def lambda_handler(event, context):
    >     api_key = os.environ['DATAİKU_API_KEY']
    >     # Make the POST request to trigger the scenario
    >     requests.post(
    >         'https://dss.mycompany.com/public/api/projects/MYPROJ/scenarios/process_new_file/run',
    >         auth=(api_key, '')
    >     )
    > \`\`\`
3.  **Set Up the S3 Trigger:**
    *   In the Lambda function's configuration, click **+ Add trigger**.
    *   Select **S3** as the source.
    *   Choose your S3 bucket.
    *   Set the **Event type** to **All object create events**.
4.  **How It Works:**
    *   An external process drops a new file into your S3 bucket.
    *   The S3 event notification is sent automatically.
    *   This triggers your Lambda function to execute.
    *   The Lambda function makes a REST API call to Dataiku.
    *   Dataiku receives the call and starts your \`process_new_file\` scenario.

### 4. Resources and Tools
- **Cloud Event Services:** S3 Events, Azure Event Grid, Google Cloud Pub/Sub.
- **Serverless Functions:** AWS Lambda, Azure Functions, Google Cloud Functions.
- **Dataiku REST API:** The interface that allows your function to trigger the scenario.

### 5. Next Steps and Progression
- **Passing the Filename:** You can make your trigger smarter. The event payload sent to the Lambda function contains information about the new file, including its name. You can pass this filename as a parameter in your API call to Dataiku. The Dataiku scenario can then use this parameter to process only that specific new file, rather than re-scanning the whole bucket.
- **Error Handling:** Add error handling and logging to your Lambda function so you are notified if the API call to Dataiku fails.

### 6. Common Challenges and Solutions
- **Challenge:** "The Lambda function can't connect to my Dataiku instance."
- **Solution:** This is a network issue. If your Dataiku instance is in a private VPC, your Lambda function must also be configured to run within that same VPC so it can reach the Dataiku server's private IP address.
- **Challenge:** "The trigger is firing, but my Dataiku job fails because the file isn't there."
- **Solution:** There can sometimes be a very small delay between the event firing and the file being fully consistent and readable. You can add a small \`time.sleep()\` in your Lambda function before calling the Dataiku API to mitigate this race condition.
`,
  },
  {
    id: 539,
    slug: 'using-kubernetes-cloud-deployment-templates',
    question: 'How to get started with using Dataiku’s Kubernetes or cloud deployment templates to run DSS on Azure Kubernetes Service, EKS, or GKE.',
    answer: `
### 1. Introduction/Overview
For a scalable, resilient, and production-grade deployment, running Dataiku on a managed Kubernetes cluster is the recommended approach. To simplify this complex process, Dataiku provides official deployment templates, most notably a **Helm chart**, which automates the provisioning of all the necessary Kubernetes resources.

### 2. Prerequisites
- **A managed Kubernetes cluster:** You need an EKS (AWS), AKS (Azure), or GKE (GCP) cluster running.
- **\`kubectl\` and \`helm\` installed:** You need these command-line tools configured to connect to your cluster.
- **A Dataiku license file.**

### 3. Step-by-Step Instructions
1.  **Add the Dataiku Helm Repository:**
    *   Helm uses repositories to find charts. You first need to add the official Dataiku repository to your Helm client.
    > \`\`\`bash
    > helm repo add dataiku https://charts.dataiku.com
    > helm repo update
    > \`\`\`
2.  **Create a \`values.yaml\` File:**
    *   The Helm chart is configured using a YAML file, conventionally named \`values.yaml\`.
    *   You need to create this file and specify the configuration for your deployment. At a minimum, you must accept the EULA and provide your license key.
    *   You can also configure storage types, resource limits, and many other parameters here.
3.  **Install the Chart:**
    *   Run the \`helm install\` command, giving your release a name and pointing to your values file.
    > \`\`\`bash
    > helm install my-dataiku-instance dataiku/dataiku -f values.yaml
    > \`\`\`
4.  **What Helm Does:** Helm will now connect to your Kubernetes cluster and create all the necessary objects defined in the chart:
    *   **Deployments:** For the Dataiku backend, frontend, and other components.
    *   **Services:** To expose the Dataiku UI and other services.
    *   **PersistentVolumeClaims:** To request persistent storage for your data.
5.  **Access Dataiku:** After a few minutes, the pods will be running. You can find the external IP address of the frontend service (\`kubectl get services\`) and access the Dataiku UI in your browser.

### 4. Resources and Tools
- **Helm:** The package manager for Kubernetes.
- **The Official Dataiku Helm Chart:** The supported, pre-packaged deployment template.
- **\`kubectl\`:** The command-line tool for interacting with your cluster.
- **Your cloud provider's Kubernetes documentation.**

### 5. Next Steps and Progression
- **Customize the Configuration:** Explore the default \`values.yaml\` file for the Helm chart to see all the available configuration options. You can customize storage classes, node selectors, ingress controllers, and much more.
- **Infrastructure as Code:** Use a tool like Terraform with its Helm provider to automate the entire process, from provisioning the K8s cluster itself to deploying the Dataiku Helm chart onto it.
- **Upgrading:** To upgrade Dataiku, you can simply update the version in your Helm configuration and run \`helm upgrade\`. Helm will handle the rolling update process.

### 6. Common Challenges and Solutions
- **Challenge:** "The pods are stuck in a 'Pending' state."
- **Solution:** This means your Kubernetes cluster does not have enough resources (CPU or memory) to schedule the pods. You may need to add more nodes to your cluster.
- **Challenge:** "The pod is in a 'CrashLoopBackOff' state."
- **Solution:** The container is starting and then immediately failing. Use \`kubectl logs <pod-name>\` to view the startup logs from the container. This will usually reveal the root cause, such as an inability to connect to its backend database or an invalid license key.
`,
  },
  {
    id: 540,
    slug: 'creating-scheduling-scenarios-for-end-to-end-workflows',
    question: 'How to get started with creating and scheduling Dataiku Scenarios to automate end-to-end ML workflows.',
    answer: `
### 1. Introduction/Overview
A Scenario is Dataiku's built-in tool for automation and orchestration. It allows you to define a sequence of actions—like rebuilding a dataset, retraining a model, and sending a report—and then schedule it to run automatically. Mastering scenarios is the key to moving your ML project from development to production.

### 2. Prerequisites
- **A complete ML workflow in your Flow:** You should have a full pipeline, from data preparation to a final "Saved Model" object.
- **A clear automation goal:** Know what you want the scenario to do (e.g., "Retrain and evaluate the churn model every week").

### 3. Step-by-Step Instructions
1.  **Navigate to the Scenarios Page:** In your project's top navigation bar, click on **Scenarios**.
2.  **Create a New Scenario:** Click **+ NEW SCENARIO** and give it a descriptive name (e.g., \`Weekly_Model_Retrain_And_Evaluate\`).
3.  **Define the Steps (The "What"):**
    *   Go to the **Steps** tab. This is where you define the sequence of actions.
    *   **Step 1: Rebuild Data.** Add a **Build / Train** step. Select the final training dataset as the item to build.
    *   **Step 2: Retrain Model.** Add another **Build / Train** step. This time, select your **Saved Model** object. This tells the scenario to retrain the model on the data built in the previous step.
    *   **Step 3: Evaluate Model.** Add a step to run an **Evaluate recipe** to calculate the new model's performance.
    *   **Step 4: Send Report.** Add a **Reporter** (in the Reporters tab) to email the results of the evaluation.
4.  **Define the Trigger (The "When"):**
    *   Go to the **Settings** tab.
    *   Click **+ ADD TRIGGER** and select **Time-based**.
    *   Configure the schedule (e.g., "Weekly" on "Sunday" at "01:00").
    *   Enable the trigger using the toggle switch.
5.  **Activate and Save:** Ensure the main toggle at the top of the scenario is set to **Active**, and then **Save** your changes. The scenario is now live and will run on schedule.

### 4. Resources and Tools
- **The Scenarios Page:** Your central hub for all project automation.
- **The Step Library:** The list of available actions your scenario can perform.
- **Triggers and Reporters:** The tools for scheduling and alerting.

### 5. Next Steps and Progression
- **Automated Deployment:** Add a Python step that uses the API to compare the new model's performance to the old one and automatically deploy it if it's better.
- **Data Quality Gates:** Add a "Run checks" step to validate your training data before the model retraining step. If the data quality is poor, the scenario will fail, preventing you from training a bad model.

### 6. Common Challenges and Solutions
- **Challenge:** "My scenario failed."
- **Solution:** Go to the "Last runs" tab and click on the failed run. This will take you to the job log, which provides a detailed error message and shows exactly which step failed and why.
- **Challenge:** "My scenario has too many steps and is confusing."
- **Solution:** Consider breaking your workflow into multiple, simpler scenarios. For example, have one scenario for data preparation and another for model training. You can then have the first scenario trigger the second one upon successful completion.
`,
  },
  {
    id: 541,
    slug: 'using-event-based-triggers-for-orchestration',
    question: 'How to get started with using event-based triggers in Dataiku Scenarios (e.g., file drop or schedule) for orchestration.',
    answer: `
### 1. Introduction/Overview
While time-based triggers are common, event-based triggers allow you to create more reactive and efficient pipelines. Instead of running on a fixed schedule, the pipeline runs as soon as a specific event occurs, like new data becoming available. Dataiku Scenarios have built-in triggers for this.

### 2. Prerequisites
- **A Dataiku Scenario** that you want to trigger.
- **An event source:** A dataset in your flow that gets updated by an upstream process.

### 3. Step-by-Step Instructions

#### Triggering on a Dataset Change
1.  **Navigate to Scenario Settings:** Open your scenario and go to the **Settings** tab.
2.  **Add a Trigger:** Click **+ ADD TRIGGER**.
3.  **Select "Dataset change":** Choose this as the trigger type.
4.  **Configure the Trigger:**
    *   **Dataset:** Select the dataset from your project that should act as the trigger.
    *   **Trigger when:** You can choose to trigger when the dataset's data changes, its schema changes, or both. For most ingestion workflows, you will choose "Data changes".
5.  **Enable and Save:** Enable the trigger using the toggle switch and save the scenario.
6.  **How it Works:** Dataiku will now monitor the status of the trigger dataset. As soon as it is modified (e.g., rebuilt by an upstream scenario), this trigger will fire, and your scenario will launch.

#### Triggering on Scenario Completion
1.  **Navigate to the *Upstream* Scenario:** Open the scenario that *produces* the data (e.g., your daily ingestion scenario).
2.  **Go to the Reporters Tab:** A trigger for one scenario is a "Reporter" for another.
3.  **Add a "Run scenario" Reporter:**
    *   Click **+ ADD REPORTER**.
    *   For the channel, select **Run another scenario**.
    *   **Run condition:** Set this to **On success**.
    *   **Scenario to run:** Select your downstream scenario (e.g., your model training scenario).
4.  **How it Works:** Now, when your ingestion scenario finishes successfully, it will automatically trigger your model training scenario, creating a perfectly chained, event-driven workflow.

### 4. Resources and Tools
- **Triggers Panel:** In a scenario's settings, this is where you configure "Dataset change" triggers.
- **Reporters Panel:** In a scenario's settings, this is where you configure a scenario to trigger another one.

### 5. Next Steps and Progression
- **API Triggers:** For events happening outside Dataiku (like a file being dropped in S3), you can use an external process (like an AWS Lambda function) to make a REST API call to trigger your Dataiku scenario. This provides ultimate flexibility.

### 6. Common Challenges and Solutions
- **Challenge:** My "Dataset change" trigger isn't firing.
- **Solution:** Check that the upstream dataset is actually being rebuilt and modified. Dataiku triggers on a change to its internal state, not just a change in the underlying data source. The dataset must be rebuilt by a Dataiku job.
- **Challenge:** I'm creating an infinite loop by having Scenario A trigger Scenario B, and B trigger A.
- **Solution:** Dataiku will usually detect and prevent you from creating obvious circular dependencies. You must design your orchestration logic carefully to be a Directed Acyclic Graph (DAG).
`,
  },
  {
    id: 542,
    slug: 'calling-external-scripts-apis-from-scenarios',
    question: 'How to get started with calling external scripts or APIs from Dataiku Scenarios to extend automation.',
    answer: `
### 1. Introduction/Overview
Dataiku pipelines often need to interact with the outside world. A Scenario can be used to orchestrate these interactions, such as calling an external API to fetch data, pushing a notification to a custom messaging service, or running a local shell script. This is done using a **Python scenario step**.

### 2. Prerequisites
- **A Dataiku Scenario.**
- **Details of the external service:** The URL for the API or the command for the script.
- **A Python code environment** with any necessary libraries (e.g., \`requests\`).

### 3. Step-by-Step Instructions
1.  **Add a Python Step to Your Scenario:**
    *   In your scenario's **Steps** tab, click **+ ADD STEP**.
    *   Choose **Execute Python code**.
2.  **Write the Interaction Code:**
    *   The editor will open. You can now write Python code to perform the external action.

    #### Example 1: Calling an External REST API
    > \`\`\`python
    > import requests
    > import json
    > # This could be to trigger another system after a Dataiku job
    > payload = {'status': 'complete', 'dataset': '\${datasetName}'} # You can use scenario variables
    > try:
    >     response = requests.post("https://api.external-system.com/notify", json=payload)
    >     response.raise_for_status() # Fails the step if the API call returns an error
    >     print("Successfully notified external system.")
    > except Exception as e:
    >     print(f"Failed to call external API: {e}")
    >     raise e # Make sure to re-raise the exception to fail the scenario
    > \`\`\`

    #### Example 2: Running a Local Shell Script
    > \`\`\`python
    > import subprocess
    > # This runs a script located on the Dataiku server machine
    > result = subprocess.run(["/path/to/my/script.sh"], capture_output=True, text=True)
    > if result.returncode != 0:
    >     print(f"Script failed with error: {result.stderr}")
    >     raise Exception("External script failed.")
    > print(f"Script output: {result.stdout}")
    > \`\`\`
3.  **Place the Step in Your Scenario:** Place this Python step at the appropriate point in your scenario's sequence (e.g., after a build step is complete).

### 4. Resources and Tools
- **Python Scenario Step:** The environment for your custom integration code.
- **Python \`requests\` library:** The standard for making HTTP calls.
- **Python \`subprocess\` module:** For running local command-line scripts.
- **Project Variables:** For securely storing API keys or other parameters needed by your script.

### 5. Next Steps and Progression
- **Error Handling:** Robust error handling is crucial. Always check the response codes from API calls and the return codes from shell scripts to ensure the step fails correctly when the external system has a problem.
- **Passing Data:** You can use the Dataiku API within the script to first read data from a dataset and then pass that data in the payload of your API call.

### 6. Common Challenges and Solutions
- **Challenge:** The script fails with a "Connection timed out" error.
- **Solution:** This is a network issue. The Dataiku server cannot reach the external API endpoint. You need to work with your network team to ensure any firewalls are configured to allow outbound traffic from the Dataiku server to the destination IP and port.
- **Challenge:** Where do I store the API key for the external service?
- **Solution:** **Never hardcode it in the script.** Store it as a "Password" type **Project Variable**. Your script can then retrieve it securely using \`dataiku.get_custom_variables()\`.
`,
  },
  {
    id: 543,
    slug: 'integrating-airflow-to-orchestrate-dataiku-tasks',
    question: 'How to get started with integrating Apache Airflow to orchestrate pipelines that include Dataiku tasks.',
    answer: `
### 1. Introduction/Overview
For complex, enterprise-wide workflows that span multiple systems, a dedicated orchestrator like Apache Airflow is often used. You can integrate Dataiku into an Airflow DAG (Directed Acyclic Graph), allowing Airflow to trigger Dataiku jobs and manage dependencies between Dataiku and other systems.

### 2. Prerequisites
- **A running Airflow instance.**
- **The Dataiku "provider" for Airflow installed** on your Airflow instance.
- **A configured "Connection" in Airflow** to your Dataiku instance, containing your Dataiku API key.

### 3. Step-by-Step Instructions
1.  **Install the Airflow Provider:** On your Airflow environment, install the official Dataiku provider.
    > \`pip install apache-airflow-providers-dataiku\`
2.  **Configure the Airflow Connection:**
    *   In the Airflow UI, go to **Admin > Connections**.
    *   Create a new connection of type **Dataiku**.
    *   Give it a connection ID (e.g., \`dataiku_default\`).
    *   Provide the host URL for your Dataiku instance and your API key.
3.  **Write Your Airflow DAG:**
    *   In a Python file for your DAG, import the Dataiku operators.
    *   You can now define tasks in your DAG that perform actions in Dataiku.
    *   **Example: Triggering a scenario**
        > \`\`\`python
        > from airflow.models.dag import DAG
        > from airflow.providers.dataiku.operators.scenario import DataikuRunScenarioOperator
        >
        > with DAG(dag_id='dataiku_orchestration_dag', ...) as dag:
        >     run_dataiku_job = DataikuRunScenarioOperator(
        >         task_id='run_my_dataiku_scenario',
        >         project_key='MYPROJECT',
        >         scenario_id='my_scenario',
        >         dataiku_conn_id='dataiku_default' # The connection you configured
        >     )
        > \`\`\`
4.  **Define Dependencies:** In your DAG, you can now define dependencies between your Dataiku task and tasks from other systems. For example, you can have a task that loads data into a database, and only upon its success will the \`DataikuRunScenarioOperator\` be triggered.

### 4. Resources and Tools
- **The official Airflow Provider for Dataiku:** Contains the necessary operators (\`DataikuRunScenarioOperator\`, \`DataikuBuildJobOperator\`, etc.).
- **Airflow Connections:** The secure way to manage your API key for Dataiku.
- **Airflow DAGs:** The Python scripts that define your end-to-end workflow.

### 5. Next Steps and Progression
- **Passing Parameters:** The Dataiku operators in Airflow allow you to pass parameters to your scenario run, making the orchestration dynamic.
- **Two-Way Integration:** You can also have a Dataiku scenario use a Python step to trigger an Airflow DAG via the Airflow REST API, allowing for bidirectional control.

### 6. Common Challenges and Solutions
- **Challenge:** The Airflow task fails with a connection error.
- **Solution:** Check the Airflow connection settings. Ensure the host URL is correct and that the Airflow worker nodes can reach the Dataiku instance over the network. Check firewalls.
- **Challenge:** Which tool should I use for orchestration, Scenarios or Airflow?
- **Solution:** For orchestration *within* a Dataiku project, use Scenarios. They are simpler and tightly integrated. Use a powerful external orchestrator like Airflow when you need to manage complex dependencies *between* Dataiku and other external systems (like data warehouses, CRMs, etc.) as part of a larger enterprise workflow.
`,
  },
  {
    id: 544,
    slug: 'using-rest-api-to-trigger-runs-from-external-orchestrator',
    question: 'How to get started with using the Dataiku REST API to trigger project runs from an external orchestrator.',
    answer: `
### 1. Introduction/Overview
The Dataiku REST API is the universal key to integrating Dataiku with any external system, including custom or third-party orchestration tools. By making a simple, authenticated HTTP request, any external tool can trigger a job run in Dataiku, enabling powerful automation workflows.

### 2. Prerequisites
- **An external orchestrator or script** that can make HTTP POST requests.
- **A Dataiku Scenario** to be triggered.
- **Your Dataiku instance URL, Project Key, and Scenario ID.**
- **A Dataiku API key** with permissions to run the scenario.

### 3. Step-by-Step Instructions
1.  **Generate a Dataiku API Key:**
    *   In your Dataiku profile, go to **Settings > API keys**.
    *   Generate a new key and grant it permission to run scenarios on your target project.
2.  **Construct the Endpoint URL:**
    *   The REST API endpoint for running a scenario is:
    > \`https://YOUR_DSS_URL/public/api/projects/YOUR_PROJECT_KEY/scenarios/YOUR_SCENARIO_ID/run\`
3.  **Make the API Call from Your Orchestrator:**
    *   From your external tool's scripting environment, make an **HTTP POST** request to the endpoint URL.
    *   You must provide your API key for authentication. The standard method is HTTP Basic Auth, where the **API key is the username** and the password is left blank.
4.  **Example with \`curl\` (a common command-line tool):**
    > \`\`\`bash
    > #!/bin/bash
    > API_KEY="your_secret_api_key_here"
    > DSS_URL="https://dss.mycompany.com"
    > PROJECT_KEY="SALES_REPORTING"
    > SCENARIO_ID="build_daily"
    >
    > # Trigger the job
    > curl -X POST -u "\${API_KEY}:" "\${DSS_URL}/public/api/projects/\${PROJECT_KEY}/scenarios/\${SCENARIO_ID}/run"
    > \`\`\`
5.  **Handle the Response:** The API call will return a JSON response. A robust orchestrator script should check the HTTP status code to confirm the request was accepted and parse the JSON to get the \`jobId\` of the newly started run.

### 4. Resources and Tools
- **The Dataiku REST API Documentation:** Available from the Help menu in your instance, it's the definitive reference for all endpoints.
- **\`curl\` and Postman:** Essential tools for testing and debugging your REST API calls.
- **HTTP Client library:** Whatever language your orchestrator uses, it will have a library for making HTTP requests (e.g., \`requests\` in Python, \`Invoke-RestMethod\` in PowerShell).

### 5. Next Steps and Progression
- **Asynchronous Monitoring:** The "run" API call just starts the job. A complete orchestration script needs to then take the returned \`jobId\` and use the "get job status" API endpoint in a polling loop to wait for the job to complete and check if its outcome was a success or failure.
- **Passing Parameters:** You can include a JSON body in your POST request to pass parameters to the scenario, allowing the external orchestrator to dynamically control the job run.

### 6. Common Challenges and Solutions
- **Challenge:** "401 Unauthorized" error.
- **Solution:** Your API key is invalid or doesn't have the necessary permissions. Regenerate the key and double-check its permissions in the Dataiku UI. Also, ensure your authentication header is formatted correctly.
- **Challenge:** "Connection Refused" or timeout.
- **Solution:** This is a network issue. The machine running your orchestrator cannot reach the Dataiku server. Check firewalls and network routing between the two systems.
`,
  },
  {
    id: 545,
    slug: 'chaining-projects-by-invoking-scenarios',
    question: 'How to get started with chaining Dataiku projects by invoking one project’s scenario from another’s.',
    answer: `
### 1. Introduction/Overview
As your Dataiku usage matures, you will often need to create dependencies between different projects. For example, a central "Data Ingestion" project might prepare data that is then used by several downstream "Analysis" projects. You can orchestrate this by having a scenario in one project trigger a scenario in another.

### 2. Prerequisites
- **Two or more Dataiku projects** (e.g., Project A and Project B).
- **A scenario in Project A** that should trigger a scenario in Project B.
- **An API key** with permissions to run scenarios on both projects.

### 3. Step-by-Step Instructions
1.  **Create a Global API Key:**
    *   For this pattern, it's often easiest to have an administrator create a global API key for a dedicated "service account" user.
    *   This service account should be granted "run scenarios" permissions on both Project A and Project B.
2.  **Create the Triggering Scenario Step:**
    *   Open your "upstream" scenario in **Project A**.
    *   Add a new step of type **Execute Python code**.
3.  **Write the Python Script:**
    *   The script will use the Dataiku Python API client to connect to the instance and trigger the downstream scenario.
    *   You must explicitly create an API client handle using the API key.
    > \`\`\`python
    > import dataiku
    >
    > # --- Configuration ---
    > # It is best practice to store these in project variables
    > API_KEY = "your_service_account_api_key"
    > DOWNSTREAM_PROJECT_KEY = "PROJECT_B"
    > DOWNSTREAM_SCENARIO_ID = "scenario_to_be_triggered"
    >
    > # --- Logic ---
    > # Get a client handle using the API key
    > client = dataiku.api_client(api_key=API_KEY)
    >
    > # Get a handle on the downstream scenario
    > scenario = client.get_project(DOWNSTREAM_PROJECT_KEY).get_scenario(DOWNSTREAM_SCENARIO_ID)
    >
    > # Run the scenario
    > print(f"Triggering scenario '{DOWNSTREAM_SCENARIO_ID}' in project '{DOWNSTREAM_PROJECT_KEY}'...")
    > job = scenario.run_and_wait() # Use run_and_wait to wait for completion
    >
    > if job.get_info().get("result") != "SUCCESS":
    >     raise Exception("Downstream scenario failed!")
    >
    > print("Downstream scenario completed successfully.")
    > \`\`\`
4.  **Use Reporters as an Alternative:**
    *   For a simpler dependency, you can use a **Reporter**.
    *   In the upstream scenario in Project A, go to the **Reporters** tab.
    *   Add a reporter of type **Run another scenario**.
    *   Configure it to run the downstream scenario in Project B upon the successful completion of the Project A scenario.

### 4. Resources and Tools
- **Python Scenario Step:** For maximum flexibility and control.
- **Dataiku Python API:** The \`api_client()\` function is key.
- **"Run another scenario" Reporter:** For simpler, direct chaining.

### 5. Next Steps and Progression
- **Passing Information:** You can use the Python script to read a value from a dataset in Project A and then pass that value as a parameter to the scenario run in Project B, allowing for information to be passed between the chained projects.

### 6. Common Challenges and Solutions
- **Challenge:** "Permission Denied" when running the scenario.
- **Solution:** The API key you are using does not have permissions on the downstream project (Project B). You must grant the API key's owner the necessary rights on all projects involved in the chain.
- **Challenge:** Which method should I use, Python step or Reporter?
- **Solution:** Use the "Run another scenario" reporter for simple, direct dependencies. Use a Python step when you need more complex logic, such as passing dynamic parameters, running the downstream job conditionally, or implementing custom error handling.
`,
  },
  {
    id: 546,
    slug: 'handling-errors-retries-in-scenarios',
    question: 'How to get started with handling errors and retries in Dataiku Scenarios for robust pipeline automation.',
    answer: `
### 1. Introduction/Overview
In a production environment, pipelines can fail for many reasons (e.g., temporary network issues, source system downtime). A robust pipeline should handle these errors gracefully. This involves two key practices: **alerting** so you know a failure occurred, and **retrying** to automatically recover from transient failures.

### 2. Prerequisites
- An existing Dataiku Scenario.

### 3. Step-by-Step Instructions

#### Part 1: Error Alerting (Essential)
1.  **Configure a Reporter:**
    *   In your scenario, go to the **Reporters** tab.
    *   Click **+ ADD REPORTER** and choose **Mail** or **Slack**.
2.  **Set the Condition:** Set the **Run condition** to **On failure**.
3.  **Write an Actionable Message:** Configure the message to include the project key, scenario name, and, most importantly, the \`\${jobURL}\` variable. This provides a direct link to the logs for easy troubleshooting.
4.  **How it Works:** Now, if any step in your scenario fails, the scenario will be marked as "FAILED", and this reporter will automatically send the alert.

#### Part 2: Automatic Retries (Advanced)
Dataiku does not have a simple "retry N times" checkbox. You implement this with a "wrapper" scenario.
1.  **Create a Wrapper Scenario:** Create a new scenario (e.g., \`Retry_My_Job\`). Its only purpose is to call your main scenario.
2.  **Add a Python Step:** Add a single **Execute Python code** step to this wrapper.
3.  **Write the Retry Script:** Use a \`for\` loop and a \`try...except\` block to call your main scenario multiple times.
    > \`\`\`python
    > import dataiku
    > import time
    >
    > MAX_RETRIES = 3
    > RETRY_DELAY_SECONDS = 60 # Wait 1 minute
    >
    > main_scenario = dataiku.api_client().get_project("MY_PROJ").get_scenario("my_main_scenario")
    >
    > for i in range(MAX_RETRIES):
    >     try:
    >         print(f"Attempt {i+1}/{MAX_RETRIES}...")
    >         job = main_scenario.run_and_wait()
    >         if job.get_info()["result"] == "SUCCESS":
    >             print("Main scenario succeeded.")
    >             return # Exit successfully
    >     except Exception as e:
    >         print(f"Caught exception: {e}")
    >
    >     print(f"Waiting {RETRY_DELAY_SECONDS}s before next attempt.")
    >     time.sleep(RETRY_DELAY_SECONDS)
    >
    > # If the loop finishes, all retries have failed
    > raise Exception(f"Scenario failed after {MAX_RETRIES} attempts.")
    > \`\`\`
4.  **Schedule the Wrapper:** You schedule the wrapper scenario, not the original one. It will handle the retries, and if all retries fail, the wrapper itself will fail, triggering its own failure alerts.

### 4. Resources and Tools
- **Reporters:** The primary tool for alerting.
- **Python Scenario Step:** The environment for implementing custom retry logic.
- **Python's \`time\` module:** Useful for adding a delay between retries.

### 5. Next Steps and Progression
- **Exponential Backoff:** Improve your retry script by adding a \`time.sleep()\` inside the loop that waits for a progressively longer time between retries (e.g., 1 min, then 5 mins, then 15 mins).
- **Conditional Retries:** Make your retry script smarter. It could inspect the error message from the failed job and only retry for specific, known transient errors (like a connection timeout), but fail immediately for fatal errors.

### 6. Common Challenges and Solutions
- **Challenge:** "This retry logic is complicated."
- **Solution:** It is an advanced pattern. Only use it for your most critical production scenarios that are expected to encounter occasional, recoverable failures. For many pipelines, simple failure alerting is sufficient.
- **Challenge:** "My pipeline is failing every night, and the retries aren't helping."
- **Solution:** The retry mechanism is for transient issues, not persistent bugs. If the job fails consistently, it means there is an underlying bug in your data or your code that you must fix. The alerts are correctly notifying you of this problem.
`,
  },
  {
    id: 547,
    slug: 'building-complex-multi-step-pipelines-with-flow-scenario-logic',
    question: 'How to get started with building complex multi-step pipelines in Dataiku by combining Flow and Scenario logic.',
    answer: `
### 1. Introduction/Overview
In Dataiku, there is a fundamental separation of concerns for building complex pipelines. The **Flow** is used to define the "what"—the sequence of data transformations and dependencies. **Scenarios** are used to define the "how" and "when"—the automation, scheduling, error handling, and operational logic. Combining these two effectively is the key to creating robust, maintainable pipelines.

### 2. Prerequisites
- **A clear understanding of the difference between the Flow and Scenarios.**
- **A complex business problem to solve.**

### 3. Step-by-Step Instructions: A Best-Practice Approach
1.  **Design the Data Flow First:**
    *   Focus on the data transformations. Use the visual Flow to chain together your recipes (Prepare, Join, Group, Python, etc.) to produce the desired final dataset or model.
    *   Organize your Flow logically using **Flow Zones** (e.g., "Ingestion", "Preparation", "Modeling").
    *   At this stage, you should run your recipes manually to ensure the logic is correct.
2.  **Create an Orchestration Scenario:**
    *   Once your Flow is logically correct, go to the **Scenarios** page.
    *   Create a new scenario to automate the execution of the Flow.
3.  **Add a Single "Build" Step:**
    *   In your scenario, you do not need to recreate the logic of the Flow. You just need to tell it what to build.
    *   Add a single **Build / Train** step.
    *   In this step, select only the **final output(s)** of your Flow.
    *   Dataiku's dependency engine will automatically trace the lineage backward through the entire Flow and execute all the necessary recipes in the correct order.
4.  **Add Operational Logic to the Scenario:**
    *   Now, add the operational logic around the build step.
    *   **Before the build:** You could have a Python step to check a precondition.
    *   **After the build:** Add a **Run checks** step for data quality validation.
    *   **In the Reporters tab:** Configure alerts **On failure** and notifications **On success**.
    *   **In the Settings tab:** Add a **Trigger** to schedule the entire pipeline.

### 4. Resources and Tools
- **The Flow:** The visual canvas for defining data dependencies and transformations.
- **Scenarios:** The orchestration layer for automation, control flow, and monitoring.

### 5. Next Steps and Progression
- **Decouple into Multiple Scenarios:** For very large and complex systems, you can break the orchestration into multiple scenarios. For example:
    *   Scenario 1: Handles data ingestion. Upon its success, it triggers...
    *   Scenario 2: Handles the main data transformation. Upon its success, it triggers...
    *   Scenario 3: Handles model retraining and deployment.
- This creates a modular, microservices-like architecture for your orchestration.

### 6. Common Challenges and Solutions
- **Challenge:** "I put all my logic in a single, giant Python scenario step."
- **Solution:** This is a common anti-pattern. While possible, it's hard to maintain and debug, and you lose all the benefits of Dataiku's visual Flow and automatic lineage. The code for data transformation should live in **recipes** in the Flow. The scenario should only contain the orchestration and operational code.
- **Challenge:** "My scenario has dozens of 'Build' steps."
- **Solution:** This is unnecessary and makes the scenario hard to manage. You only need one "Build" step that targets the final output. Dataiku's dependency engine is smart enough to figure out the rest.
`,
  },
  {
    id: 548,
    slug: 'integrating-streaming-sources-kafka',
    question: 'How to get started with integrating streaming sources (e.g., Kafka) to continuously update Dataiku flows.',
    answer: `
### 1. Introduction/Overview
For use cases that require processing data in near real-time, Dataiku can integrate with streaming platforms like Apache Kafka. This is an advanced feature that allows you to build pipelines that process messages continuously as they arrive, rather than in discrete batches.

### 2. Prerequisites
- **A running Kafka cluster** and a topic with flowing messages.
- **The "Streaming Endpoints" plugin** installed on your Dataiku instance.
- **A clear real-time processing goal** (e.g., "filter a stream of log messages and write all errors to a separate topic").

### 3. Step-by-Step Instructions
1.  **Create a Streaming Endpoint:** In your project, go to the **...** menu and select **Streaming Endpoints**. Click **+ NEW STREAMING ENDPOINT**.
2.  **Configure the Source:**
    *   Choose **Kafka** as the source type.
    *   Provide the address of your Kafka **Bootstrap servers**.
    *   Specify the **Topic** you want to consume messages from.
    *   Define the **Format** of the messages (e.g., JSON).
3.  **Add a Streaming Recipe:**
    *   You can't use standard recipes on a stream. You must use streaming-compatible recipes.
    *   Click **+ RECIPE** and choose a streaming recipe, like **Streaming Prepare**.
    *   In this recipe, you can perform stateless transformations on each message as it passes through (e.g., filter messages based on a field's value, or use a formula to create a new field).
4.  **Configure the Sink:**
    *   After your transformation, you must define a "sink" where the processed data will be sent.
    *   You can add another Kafka connection as a sink to write the results to a different topic.
    *   You can also sink the data to a **Dataiku dataset**. Dataiku will collect the messages in micro-batches and append them to the dataset.
5.  **Start and Monitor the Stream:**
    *   Once the source, transformations, and sink are configured, click **Start**.
    *   The Streaming Endpoint will now run continuously. The monitoring tab provides real-time charts of the message throughput and processing latency.

### 4. Resources and Tools
- **Streaming Endpoints Plugin:** The core feature for this functionality.
- **Kafka Connector:** For configuring the source and sink.
- **Streaming Recipes:** The special set of recipes that can operate on a continuous stream.

### 5. Next Steps and Progression
- **Stateful Streaming:** For more complex operations like calculating a moving average over a time window, you would need to use a **Streaming Python** recipe with a stream processing library like Faust.
- **Real-time Scoring:** You could build a stream that reads customer events, calls a deployed Dataiku model via its API to get a prediction, and then writes the event enriched with the prediction to an output stream.

### 6. Common Challenges and Solutions
- **Challenge:** The stream is not starting and is showing a connection error.
- **Solution:** This is a network issue. Ensure the Dataiku server can reach the Kafka bootstrap servers on the correct port. Check firewalls.
- **Challenge:** Messages are not being processed correctly.
- **Solution:** Check the stream's logs. The most common issue is a **deserialization error**. This means the format of the messages on the Kafka topic does not match what you configured in the source settings (e.g., you configured JSON, but the messages are actually Avro-encoded).
`,
  },
  {
    id: 549,
    slug: 'creating-automated-data-quality-checks-for-orchestration',
    question: 'How to get started with creating automated data quality checks in Dataiku as part of orchestration.',
    answer: `
### 1. Introduction/Overview
Automated data quality checks are a critical part of a robust orchestration pipeline. They act as a safety gate, ensuring that bad data does not propagate downstream. In Dataiku, this is achieved by defining **Metrics and Checks** on your datasets and then executing them as part of a **Scenario**.

### 2. Prerequisites
- A Dataiku project with a data pipeline.
- A clear definition of your data quality rules (e.g., "column X must not have nulls," "column Y must be between 0 and 100").

### 3. Step-by-Step Instructions
1.  **Define the Quality Rules on a Dataset:**
    *   Navigate to a key dataset in your Flow (e.g., a cleaned dataset before it's used for modeling or reporting).
    *   Go to the **Status** tab.
    *   First, in the **Metrics** section, define what to measure (e.g., compute the "Number of empty values" for a specific column, or the "Min/Max" for another).
    *   Second, in the **Checks** section, define the rule based on the metric (e.g., "Number of empty values is equal to 0", "Min is >= 0").
    *   Set the severity of any critical check to **Error**.
2.  **Create an Orchestration Scenario:**
    *   Go to the **Scenarios** page and open your main automation scenario.
3.  **Add the Validation Step:**
    *   In your scenario's sequence of steps, find the point *after* your key dataset has been built.
    *   Add a new step by clicking **+ ADD STEP** and choosing **Run checks**.
4.  **Configure the Step:**
    *   In the step's configuration, select the dataset on which you defined the checks.
5.  **How it Works:**
    *   When the scenario runs, it will first build the dataset.
    *   It will then execute the "Run checks" step. This step will re-compute the metrics and run your checks.
    *   If any check with a severity of "Error" fails, this step will fail, which will cause the entire scenario to fail.
6.  **Add Alerting:** Configure a **Reporter** on your scenario to send an email or Slack alert **On failure**. This will notify you immediately that a data quality rule has been violated.

### 4. Resources and Tools
- **Status Tab (Metrics & Checks):** The UI for defining your data quality rules.
- **Run Checks Scenario Step:** The tool that executes your rules as part of an automated pipeline.
- **Reporters:** The tool for sending alerts when a quality check fails.

### 5. Next Steps and Progression
- **Custom Python Checks:** For complex business rules that can't be expressed with the built-in checks, you can write a custom check using Python and the Dataiku API.
- **Data Quality Dashboard:** Create a dashboard that visualizes the history of your metrics (e.g., a line chart of the row count over time). This helps you spot trends and anomalies.

### 6. Common Challenges and Solutions
- **Challenge:** "My data quality check failed. How do I know why?"
- **Solution:** Go to the log of the failed scenario run. The log for the "Run Checks" step will give a very clear message, such as: "Check 'price_is_positive' on dataset 'sales_prepared' failed: Found 15 rows where 'price' was < 0."
- **Challenge:** "I want to be warned of an issue, but I don't want it to stop my entire pipeline."
- **Solution:** In the "Checks" settings, you can set the **Severity** of a check to **Warning** instead of "Error". A warning will be logged, but it will not cause the "Run Checks" step to fail.
`,
  },
  {
    id: 550,
    slug: 'setting-up-user-roles-permissions',
    question: 'How to get started with setting up Dataiku user roles and permissions for project access control.',
    answer: `
### 1. Introduction/Overview
Setting up user permissions is a fundamental governance task. Dataiku uses a Role-Based Access Control (RBAC) model, which is both powerful and easy to understand. Access is managed by adding **Groups** of users to a **Project** and assigning them a specific permission level (their "role").

### 2. Prerequisites
- **Dataiku Administrator rights:** To create and manage user groups.
- **Project Administrator rights:** To manage permissions on a specific project.
- **A defined set of user roles** for your organization (e.g., Analyst, Data Scientist, Business User).

### 3. Step-by-Step Instructions

#### Part 1: Create Groups (Admin Task)
1.  **Navigate to Administration:** Go to **Administration > Security > Groups**.
2.  **Create Groups for Roles:** Create new groups that correspond to the roles in your organization. For example, create a group named \`data-analysts\`, another named \`data-scientists\`, and another named \`report-consumers\`.
3.  **Add Users to Groups:** Add the individual Dataiku users to their appropriate groups.

#### Part 2: Grant Permissions to a Project
1.  **Navigate to Project Settings:** In the project you want to control access to, go to **Settings > Permissions**.
2.  **Add a Group:** Click **+ ADD GROUP**.
3.  **Select a Group and Assign a Role:**
    *   Select a group (e.g., \`report-consumers\`).
    *   Assign a permission level. The three key levels are:
        *   **Reader:** Can view everything in the project (datasets, flows, dashboards) but cannot edit or run anything. **This is the correct role for business users who only need to view reports.**
        *   **Contributor:** Can do most development work, like creating and editing recipes. **This is for your core developers and analysts.**
        *   **Administrator:** Has full control over the project, including its settings and permissions. **This is for the project owner.**
4.  **Save:** Save your changes. The permissions are applied instantly.

### 4. Resources and Tools
- **Administration > Security:** The central place for managing users and groups.
- **Project Settings > Permissions:** The UI for controlling access to a specific project.

### 5. Next Steps and Progression
- **Least Privilege:** Always grant the minimum level of permission necessary. Don't make everyone an administrator.
- **Connection-Level Security:** Remember that project permissions are only one layer. An administrator also sets permissions on the underlying data connections, which provides an additional layer of security.
- **Project Folders:** Organize projects into folders on the Dataiku homepage and set permissions on the folders themselves to control visibility for different departments.

### 6. Common Challenges and Solutions
- **Challenge:** "How do I give a user access to just one dashboard in my project?"
- **Solution:** You can't. Dataiku's security model is at the project level. The standard and best practice to solve this is to **create a new, separate project** for that specific dashboard. Use a **Sync recipe** to share the final data to this new "dashboard project". Then, you can grant the user "Reader" access to *only* that new, isolated project.
- **Challenge:** "A user is a Contributor but can't read from a specific database."
- **Solution:** Their group needs to be granted "Read" access on that specific **Data Connection** in the global **Administration > Connections** settings. Project permissions and connection permissions work together.
`,
  },
  {
    id: 551,
    slug: 'using-policy-governance-features-lineage-tags',
    question: 'How to get started with using Dataiku’s policy and governance features (data lineage, tags) to enforce compliance.',
    answer: `
### 1. Introduction/Overview
Enforcing compliance and governance policies requires tools for data classification, access control, and auditability. Dataiku provides a suite of features designed for this, with **Tags** for classification and **Lineage** for auditability being two of the most important.

### 2. Prerequisites
- **A defined governance policy:** You need to know what you need to enforce (e.g., "PII data must be identified and its access restricted").
- **A Dataiku project** containing data that falls under the policy.

### 3. Step-by-Step Instructions

#### Part 1: Data Classification with Tags
1.  **Define a Tagging Taxonomy:** As a first step, your organization should define a standard set of tags for governance. For example:
    *   **Sensitivity:** \`PII\`, \`Confidential\`, \`Public\`
    *   **Data Quality:** \`Raw\`, \`Staged\`, \`Validated\`
    *   **Ownership:** \`Owner:Finance\`, \`Owner:Marketing\`
2.  **Apply Tags to Datasets:**
    *   Go through your projects and apply these standard tags to your datasets.
    *   To do this, open a dataset, go to the **Summary** tab, and add the appropriate tags.
3.  **Use Tags for Governance:**
    *   You can now search for all datasets with a specific tag (e.g., find all PII data) in the Data Catalog.
    *   You can build automated scenarios that check for policy violations (e.g., "alert if a dataset tagged 'PII' does not have restricted project permissions").

#### Part 2: Auditability with Data Lineage
1.  **Understand Automatic Lineage:** Dataiku automatically tracks the lineage of all your data. You don't need to do anything to enable it.
2.  **Use Lineage to Prove Compliance:**
    *   When an auditor asks, "How was this number calculated?" or "How was this sensitive data handled?", the lineage graph is your answer.
    *   Open the final dataset and go to the **Lineage** tab.
    *   Click on a specific column. The graph will visually show every single source column and transformation step that was used to create that final value.
    *   This provides a clear, undeniable audit trail of data provenance.
3.  **Document the Controls:** Combine the technical features with clear documentation. In your project's **Wiki**, explain how your use of tags, permissions, and recipes enforces the specific compliance policy.

### 4. Resources and Tools
- **Tags:** The primary feature for data classification.
- **Data Lineage Graph:** The primary feature for auditability and provenance.
- **Project Permissions:** The primary feature for access control.
- **Project Wiki:** The place to document your compliance strategy.

### 5. Next Steps and Progression
- **PII Detection Plugin:** Use this plugin to automatically scan datasets and suggest columns that may contain PII, helping to accelerate your tagging efforts.
- **Automated Governance Scenarios:** Write a Python scenario that uses the Dataiku API to periodically scan all projects and generate a report on their compliance with your tagging and documentation standards.

### 6. Common Challenges and Solutions
- **Challenge:** "Tagging all our datasets is too much work."
- **Solution:** Start with your most critical and sensitive data first. Prioritize tagging datasets that contain PII or are used for financial reporting. You can also write scripts to automate some of the tagging based on dataset names or schemas.
- **Challenge:** The lineage for my Python recipe is broken.
- **Solution:** This happens if the Python code reads or writes data without using the Dataiku APIs. To maintain lineage, your code must use \`dataiku.Dataset(...)\` to get handles on its inputs and outputs.
`,
  },
  {
    id: 552,
    slug: 'configuring-ldap-sso-integration',
    question: 'How to get started with configuring Dataiku’s LDAP/SSO integration for enterprise user management.',
    answer: `
### 1. Introduction/Overview
For enterprise environments, managing users manually in Dataiku is not scalable. Integrating Dataiku with your corporate directory (like Active Directory via LDAP) and a Single Sign-On (SSO) provider allows for centralized user management and a seamless, secure login experience for your users. This is an administrator-level task.

### 2. Prerequisites
- **Dataiku Administrator rights.**
- **Details of your corporate directory:** The LDAP server address, port, and credentials for a service account that can read user information.
- **Details of your SSO provider:** If using SSO, you'll need information from your identity provider (like Okta, Azure AD, or PingFederate), such as metadata URLs or client secrets.

### 3. Step-by-Step Instructions

#### Part 1: LDAP Integration (for user and group synchronization)
1.  **Navigate to Security Settings:** As an admin, go to **Administration > Security > LDAP**.
2.  **Enable LDAP:** Click to enable LDAP integration.
3.  **Configure the Connection:** Fill in the connection details for your LDAP server (hostname, port, user DN, password).
4.  **Configure User and Group Mapping:**
    *   You need to tell Dataiku how to find users and groups in your directory. This involves specifying the Base DNs for users and groups and mapping attributes (e.g., mapping the LDAP \`sAMAccountName\` attribute to the Dataiku login).
5.  **Test and Synchronize:** Test the connection and then run a synchronization. Dataiku will now pull in users and their group memberships from your corporate directory.

#### Part 2: SSO Integration (for seamless login)
1.  **Choose an SSO Protocol:** Dataiku supports standard protocols like SAML 2.0 and OpenID Connect.
2.  **Configure the SSO Provider:** In your identity provider's admin console (e.g., Okta), you will need to create a new "Application" for Dataiku. This process will give you the necessary information (like a metadata URL) to configure Dataiku.
3.  **Configure Dataiku:**
    *   In Dataiku, go to **Administration > Security > Single Sign-On**.
    *   Enable SSO and select your protocol (e.g., SAML).
    *   Fill in the information provided by your identity provider.
4.  **How it Works:** Now, when a user goes to the Dataiku URL, they will be redirected to your company's standard login page. After they authenticate there, they will be automatically logged into Dataiku without needing a separate password.

### 4. Resources and Tools
- **Administration > Security:** The central place for all authentication configuration.
- **Your Corporate Directory (Active Directory, etc.).**
- **Your SSO Provider's Admin Console (Okta, Azure AD, etc.).**
- **Dataiku's official documentation:** Provides detailed guides for integrating with specific providers.

### 5. Next Steps and Progression
- **Just-in-Time Provisioning:** With SSO enabled, you can configure just-in-time provisioning. When a new user logs into Dataiku for the first time via SSO, their Dataiku account will be created automatically.

### 6. Common Challenges and Solutions
- **Challenge:** "The LDAP connection test fails."
- **Solution:** This is often a network issue (firewalls blocking the LDAP port) or a problem with the Base DN and user/group filters. The LDAP query syntax can be tricky and needs to be exact. Work with your Active Directory administrator to get the correct filter syntax.
- **Challenge:** "SSO login is failing with a 'SAML assertion invalid' error."
- **Solution:** This means there is a mismatch in the configuration between Dataiku and your identity provider. The "identifiers" or "audience URIs" must match exactly on both sides. Also, check that the clocks on both the Dataiku server and the identity provider server are synchronized.
`,
  },
  {
    id: 553,
    slug: 'enabling-audit-logging-for-lineage-changes',
    question: 'How to get started with enabling audit logging in Dataiku to track data lineage and project changes.',
    answer: `
### 1. Introduction/Overview
Audit logging is a critical governance feature that provides a chronological record of activities, which is essential for security, compliance, and troubleshooting. Audit logging is enabled by default in Dataiku, automatically capturing key events. The main task is knowing where to find and how to use these logs.

### 2. Prerequisites
- **A Dataiku instance** with user activity.
- **Appropriate permissions:** Access to audit logs is restricted. You need project-level access for project timelines and global administrator rights for the instance-wide audit log.

### 3. Step-by-Step Instructions: Finding the Audit Logs

#### Level 1: Project-Specific Audit Trail (The Timeline)
- **What it tracks:** Changes made to a specific project.
- **How to access:**
    1.  Open the project you want to audit.
    2.  Go to the **...** menu in the top navigation bar and select **Timeline**.
- **What it shows:** A user-friendly feed of all significant modifications within that project, such as "User A created recipe X," "User B modified dashboard Y," etc. This is perfect for understanding the recent history of a project.

#### Level 2: Instance-Wide Security Audit Trail (Global Audit Log)
- **What it tracks:** High-level security and administrative events for the entire Dataiku instance.
- **How to access (Admin only):**
    1.  Go to **Administration > Logs > Global Audit Log**.
- **What it shows:** This log captures events like user logins, failed login attempts, API key creation, changes to global settings, and permissions modifications.

#### Level 3: Code and Lineage Change Audit Trail (Git)
- **What it tracks:** The most detailed, line-by-line history of all changes to your project's *definition* (recipes, flow structure, etc.).
- **How to access:**
    1.  This requires your project to be integrated with **Git**.
    2.  You can view the commit history either in Dataiku's **Git** page or on your Git provider's web UI (e.g., GitHub).
- **What it shows:** A complete, immutable record of every change, who made it, when, and (via the commit message) why.

### 4. Resources and Tools
- **Project Timeline:** For day-to-day project auditing.
- **Global Audit Log:** For instance-wide security audits.
- **Git Integration:** For the most detailed, developer-focused audit trail.

### 5. Next Steps and Progression
- **Log Exporting (Admin):** An administrator can configure Dataiku to forward its logs to an external Security Information and Event Management (SIEM) system like Splunk for centralized analysis and long-term retention.
- **Alerting on Audit Events:** In an external SIEM, you can set up alerts for specific audit events, such as multiple failed login attempts for a single user.

### 6. Common Challenges and Solutions
- **Challenge:** "I need to know who viewed a specific dashboard."
- **Solution:** This very granular read-access logging is not part of the standard high-level audit trails. Your primary control for this is preventative: use project permissions to ensure only authorized people can access the project containing the dashboard in the first place.
- **Challenge:** "The audit log is too noisy."
- **Solution:** Use the filtering capabilities. Both the Project Timeline and the Global Audit Log have search and filter bars that allow you to narrow down the events by user, object type, or time period.
`,
  },
  {
    id: 554,
    slug: 'storing-credentials-securely-secret-management',
    question: 'How to get started with storing credentials securely in Dataiku (secret management) and encrypting sensitive data.',
    answer: `
### 1. Introduction/Overview
Properly managing secrets like passwords, API keys, and database credentials is the most fundamental aspect of data security. **Never hardcode secrets in your code.** Dataiku provides a multi-layered approach to secret management, from built-in secure storage to integration with enterprise-grade secret vaults.

### 2. Prerequisites
- **Credentials** that need to be stored (e.g., a database password, an API key).
- **Appropriate permissions** in Dataiku to manage connections or project variables.

### 3. Step-by-Step Instructions: Choosing the Right Method

#### Method 1: For Data Connections (The Standard Practice)
- **When to Use:** For storing credentials for databases, cloud storage, and other standard data sources.
- **How It Works (Admin Task):**
    1.  An administrator goes to **Administration > Connections**.
    2.  When they create a new connection (e.g., to Snowflake), the UI provides dedicated, secure fields for the **Username** and **Password**.
    3.  Dataiku encrypts and stores these credentials. Users who are granted permission to *use* the connection never see the password itself.
- **This is the primary and most common method.**

#### Method 2: For Code Recipes (Project Variables)
- **When to Use:** For secrets that are used in your custom code, like an API key for an external service.
- **How It Works:**
    1.  In your project, go to **... > Variables**.
    2.  Create a new variable (e.g., \`MY_API_KEY\`).
    3.  **Crucially, set the variable's type to "Password"**. This encrypts the value, hides it in the UI, and prevents it from being exposed in logs.
    4.  In your Python recipe, you can then retrieve this secret using \`dataiku.get_custom_variables()\`.

#### Method 3: For Enterprise Security (External Vaults)
- **When to Use:** For organizations with the highest security requirements and a dedicated secrets management platform.
- **How It Works (Admin Task):**
    1.  An administrator integrates Dataiku with a tool like **HashiCorp Vault**, **Azure Key Vault**, or **AWS Secrets Manager**. This is configured in **Administration > Settings**.
    2.  Now, when setting up a connection or a project variable, you will have a new option to fetch the value directly from the configured external vault instead of entering it into Dataiku.

### 4. Resources and Tools
- **Dataiku Connections:** The built-in secure store for data source credentials.
- **Project Variables (Password type):** The secure store for code-level secrets.
- **External Secret Management Tools:** The enterprise-grade solution.

### 5. Next Steps and Progression
- **IAM Roles:** For cloud deployments, the most secure method is to avoid static secrets altogether and use temporary credentials provided by **IAM Roles** (for AWS) or **Managed Identities** (for Azure). Dataiku's connection settings support this authentication method.

### 6. Common Challenges and Solutions
- **Challenge:** "I see a password in plain text in a Python recipe in a shared project."
- **Solution:** This is a major security violation. The code must be changed immediately. The hardcoded password should be removed from the code and stored properly as a "Password" type project variable.
- **Challenge:** "I don't have admin rights to create a connection."
- **Solution:** This is correct by design. Centralizing connection management with administrators is a key security control. You should submit a request to your Dataiku admin team to have the new connection created.
`,
  },
  {
    id: 555,
    slug: 'tagging-datasets-for-sensitive-information-pii-phi',
    question: 'How to get started with tagging datasets in Dataiku to manage sensitive information (PII/PHI) for compliance.',
    answer: `
### 1. Introduction/Overview
For compliance with regulations like GDPR and HIPAA, the first step is always to know where your sensitive data is. Tagging is Dataiku's primary mechanism for classifying your data assets. By applying tags like \`PII\` (Personally Identifiable Information) or \`PHI\` (Protected Health Information), you can easily find, manage, and secure your sensitive datasets.

### 2. Prerequisites
- **An understanding of what constitutes PII/PHI** in your organization's context.
- **A Dataiku project containing sensitive data.**

### 3. Step-by-Step Instructions
1.  **Define a Sensitivity Tagging Standard:**
    *   Your organization should have a simple, clear taxonomy for sensitivity. For example:
        *   \`SENSITIVITY:PUBLIC\`
        *   \`SENSITIVITY:INTERNAL\`
        *   \`SENSITIVITY:CONFIDENTIAL\`
        *   \`SENSITIVITY:PII\`
        *   \`SENSITIVITY:PHI\`
    *   Document this standard in a central Wiki so everyone uses the same tags.
2.  **Identify Sensitive Datasets:**
    *   Go through your project's Flow and identify any dataset that contains sensitive information.
3.  **Apply the Tags:**
    *   For each sensitive dataset, open it and go to the **Summary** tab.
    *   In the "Tags" section, type your standard tag (e.g., \`SENSITIVITY:PII\`) and press Enter. You can add multiple tags.
4.  **Use Tags to Enforce Governance:**
    *   **Find Data:** Use the central **Data Catalog** to search for all datasets across the entire instance that have the \`PII\` tag. This gives you a complete inventory of your sensitive data.
    *   **Secure Data:** Use this inventory to review permissions. Any project containing a PII-tagged dataset should have its **Project Permissions** restricted to only authorized users.
    *   **Automate Checks:** Create a **Scenario** with a Python step that uses the Dataiku API to find all PII-tagged datasets and checks if they are in projects with appropriate security settings, sending an alert if a violation is found.

### 4. Resources and Tools
- **Tags:** The lightweight, flexible classification feature.
- **Data Catalog:** The central, searchable inventory powered by your tags.
- **Project Permissions:** The tool for restricting access to projects containing tagged data.
- **Python API:** For automating governance checks based on tags.

### 5. Next Steps and Progression
- **PII Detection Plugin:** Dataiku has a plugin that can automatically scan datasets and suggest columns that may contain PII (e.g., by recognizing email or phone number patterns). This can help you find sensitive data you might have missed.
- **Column-level Tagging (Meanings):** For more granularity, you can use the **Meanings** feature on a dataset to tag individual *columns* with their business meaning, including PII types.

### 6. Common Challenges and Solutions
- **Challenge:** "It's a lot of work to manually tag all our old datasets."
- **Solution:** It can be. Prioritize your efforts. Start by tagging the data in your most critical and sensitive new projects. You can then work backward. You can also use the Python API to write a script that does bulk tagging based on dataset names or schemas.
- **Challenge:** "What if a user forgets to tag a dataset containing PII?"
- **Solution:** This is a process and training issue. Make data classification a mandatory step in your project development checklist. Additionally, running the automated PII detection plugin periodically can help you find untagged sensitive data.
`,
  },
  {
    id: 556,
    slug: 'using-api-to-automate-governance-checks',
    question: 'How to get started with using Dataiku’s API to automate governance checks and policy enforcement.',
    answer: `
### 1. Introduction/Overview
As Dataiku usage scales, manually checking every project for compliance with your governance policies becomes impossible. By using the **Dataiku Python API** in an automated **Scenario**, you can create a "governance bot" that programmatically scans your entire instance and reports on policy violations.

### 2. Prerequisites
- **A clear, defined governance policy:** You need to know the rules you want to check (e.g., "All projects must have a description," "All datasets containing PII must be in a restricted project").
- **A dedicated "Governance" project** in Dataiku to house your checking logic.
- **An API key** for a service account with administrator-level permissions (required to read all projects' metadata).

### 3. Step-by-Step Instructions
1.  **Create a "Governance" Scenario:** In your dedicated governance project, create a new scenario (e.g., \`Run_Weekly_Governance_Checks\`).
2.  **Add a Python Step:** Add a single **Execute Python code** step. This is where your checking logic will live.
3.  **Write the Governance Script:** In the Python step, write a script that uses the API to check your policies.
    *   **Get a client handle:** \`client = dataiku.api_client(api_key=...)\`
    *   **Get all projects:** \`projects = client.list_projects()\`
    *   **Loop and check:** Loop through each project and perform your checks.
    > \`\`\`python
    > # Example: Check for projects missing descriptions
    > projects_without_desc = []
    > for proj in projects:
    >     project_handle = client.get_project(proj['projectKey'])
    >     metadata = project_handle.get_metadata()
    >     if not metadata.get('description'):
    >         projects_without_desc.append(proj['projectKey'])
    > # The output of your check is a list of non-compliant projects
    > \`\`\`
4.  **Create a Report:**
    *   Take the list of non-compliant projects from your script and write it to a **Dataiku dataset**. This dataset is your governance report.
5.  **Add Alerting:**
    *   In your scenario, add a **Reporter** that triggers **On completion**.
    *   Configure it to email the governance report dataset to the platform administrators or governance team.
6.  **Schedule the Scenario:** Schedule the scenario to run periodically (e.g., weekly).

### 4. Resources and Tools
- **Dataiku Python API:** The key to programmatically accessing the metadata of all projects and datasets.
- **Python Scenario Step:** The environment for your governance script.
- **Reporters:** The tool for distributing the final governance report.

### 5. Next Steps and Progression
- **More Advanced Checks:** You can write much more complex checks.
    *   Find all datasets tagged \`PII\` and check if their project permissions are sufficiently restricted.
    *   Find all projects that haven't been modified in over a year and flag them for archiving.
    *   Find all code environments that are using outdated, insecure library versions.
- **Automated Remediation:** For some checks, you could even have the script take automated action, such as automatically applying a "missing_description" tag to a non-compliant project.

### 6. Common Challenges and Solutions
- **Challenge:** The API script is complex to write.
- **Solution:** Start simple. Your first governance check could be a very simple one, like finding projects with no description. As you get more comfortable with the API, you can add more sophisticated checks. Refer to the Dataiku API documentation for examples.
- **Challenge:** "Permission Denied" error when running the script.
- **Solution:** The API key used to run the script needs broad permissions to be able to read the metadata from all projects. It's best practice to use a dedicated service account with administrator privileges for this task.
`,
  },
  {
    id: 557,
    slug: 'implementing-role-based-access-control-rbac',
    question: 'How to get started with implementing role-based access control (RBAC) in Dataiku for different teams.',
    answer: `
### 1. Introduction/Overview
Role-Based Access Control (RBAC) is a security paradigm that manages access based on a user's role within an organization. In Dataiku, this is the primary security model. It involves defining **Groups** that represent roles (e.g., "Data Scientists") and then assigning permissions to these groups for specific **Projects**. This is far more scalable and manageable than assigning permissions to individual users.

### 2. Prerequisites
- **Clearly defined roles and teams** in your organization (e.g., Marketing, Finance, Data Engineering).
- **A Dataiku administrator** to create and manage the groups.
- **Project owners** to manage permissions on their own projects.

### 3. Step-by-Step Instructions: The RBAC Workflow

1.  **Define Roles and Map to Groups (Admin Task):**
    *   Work with business leaders to define the key user roles.
    *   An administrator then goes to **Administration > Security > Groups** and creates a group for each role (e.g., \`marketing_analysts\`, \`finance_consumers\`, \`data_engineers\`).
    *   The admin then adds the relevant users to these groups.
2.  **Grant Project Access Based on Role (Project Owner Task):**
    *   The owner of a specific project (e.g., the "Sales Reporting" project) goes to their project's **Settings > Permissions**.
    *   They add the groups that need access.
    *   They assign the appropriate permission level (the "role" for that project).
        *   The \`finance_consumers\` group might get **Reader** access.
        *   The \`data_analysts\` group that maintains the project would get **Contributor** access.
3.  **How It Works:**
    *   A user's effective permissions are the sum of the permissions of all the groups they belong to.
    *   When a user tries to access a project, Dataiku checks if any of their groups have been granted access to that project. If not, they can't even see it.

### 4. Resources and Tools
- **Groups:** The core component for representing roles.
- **Project Permissions:** The UI for implementing the access control rules.

### 5. Next Steps and Progression
- **Least Privilege:** A core principle of RBAC. Always grant the minimum level of permission needed for a role to do its job.
- **Connection-Level RBAC:** An administrator can also apply RBAC to the underlying data connections, ensuring that, for example, only the \`data_engineers\` group can write to the production data warehouse.
- **Review and Audit:** Periodically review group memberships and project permissions to ensure they are up-to-date with any organizational changes.

### 6. Common Challenges and Solutions
- **Challenge:** "A user needs access to Project A and Project B, but only read access to A and write access to B."
- **Solution:** This is exactly what RBAC is designed for. You would add their group to Project A with "Reader" permissions and to Project B with "Contributor" permissions. Permissions are specific to each project.
- **Challenge:** "Managing hundreds of individual user permissions is a nightmare."
- **Solution:** You should almost never be assigning permissions to individual users. This is an anti-pattern. You should *only* assign permissions to groups. User management then becomes as simple as adding or removing users from the appropriate groups in one central place.
`,
  },
  {
    id: 558,
    slug: 'maintaining-documentation-catalogs-for-audits',
    question: 'How to get started with maintaining documentation and catalogs for regulatory audits.',
    answer: `
### 1. Introduction/Overview
For regulatory audits (like those for GDPR, SOX, or HIPAA), you must be able to produce clear, reliable documentation that proves your data pipelines are compliant and your results are trustworthy. In Dataiku, this involves maintaining a combination of narrative documentation, object-level metadata, and leveraging the platform's automatic lineage generation.

### 2. Prerequisites
- **A Dataiku project** subject to audit.
- **An understanding of the specific audit requirements.**

### 3. Step-by-Step Instructions: Building an Audit-Ready Project

1.  **Create the Master Document (Project Wiki):**
    *   Use the **Project Wiki** as your central audit document.
    *   Create a page titled "Compliance Documentation".
    *   On this page, describe in plain English how the project's design and logic adhere to the relevant regulations. For each clause of the regulation, explain the specific control you've implemented.
2.  **Maintain a Data Dictionary:**
    *   For your key datasets, especially those containing sensitive or critical data, you must document the meaning of each column.
    *   Do this in the dataset's **Settings > Schema** tab by adding a **description for each column**. This is your data dictionary.
3.  **Annotate Everything (Metadata):**
    *   Use **Tags** to classify all your datasets (e.g., \`PII\`, \`Source:SAP\`, \`Status:Validated\`).
    *   Use the **Description** field on every single recipe and dataset to explain its purpose. This creates a self-documenting flow that is easy for an auditor to understand.
4.  **Leverage Automatic Lineage:**
    *   When an auditor asks, "Show me exactly how this number on the final report was calculated," your answer is the **Lineage graph**.
    *   Open the final dataset, go to the **Lineage** tab, and select the column in question.
    *   You can export a screenshot of this graph as definitive, unambiguous proof of the data's entire transformation journey.
5.  **Use Git for Change Management:**
    *   Connect your project to Git. This creates an immutable, time-stamped audit trail of every single change made to your pipeline's logic, including who made the change and why (via the commit message).

### 4. Resources and Tools
- **Project Wiki:** For narrative documentation.
- **Column Descriptions:** For the data dictionary.
- **Tags & Descriptions:** For object-level metadata.
- **Lineage Graph:** For visual proof of data provenance.
- **Git Integration:** For an immutable change log.

### 5. Next Steps and Progression
- **Automated Documentation:** Write a Python scenario that uses the API to extract all this metadata and automatically generate a formatted PDF report suitable for handing to an auditor.
- **Formal Sign-offs:** For the most critical projects, use Dataiku's sign-off features to create a formal, auditable record of who reviewed and approved the project for production.

### 6. Common Challenges and Solutions
- **Challenge:** "We have an audit next week, and we have no documentation."
- **Solution:** This is a difficult situation. You will have to work backward. The lineage graph will still exist automatically, which is a huge help. You will then need to go through the flow object by object and add the necessary descriptions and tags. This highlights the importance of making documentation part of your day-to-day process, not an afterthought.
`,
  },
  {
    id: 559,
    slug: 'collaborating-with-security-compliance-teams',
    question: 'How to get started with collaborating with security and compliance teams to align Dataiku configurations with company policies.',
    answer: `
### 1. Introduction/Overview
Effective collaboration between data teams and security/compliance teams is essential for building a governed and trusted analytics platform. As a Dataiku SME or platform owner, your role is to proactively engage with these teams, understand their requirements, and demonstrate how Dataiku's features can be used to enforce company policies.

### 2. Prerequisites
- **A Dataiku instance.**
- **A designated contact** in your corporate security and/or compliance departments.

### 3. Step-by-Step Instructions: A Collaboration Framework

1.  **Schedule a "Dataiku for Security" Kickoff Session:**
    *   Be proactive. Don't wait for them to come to you with a problem.
    *   Schedule a meeting to introduce them to Dataiku.
2.  **Speak Their Language:** Don't talk about recipes and datasets. Talk about risks and controls. Frame the discussion around their concerns.
3.  **Demonstrate Key Governance Features:** In the kickoff session, give them a live demo of the specific Dataiku features that address their needs:
    *   **For Access Control:** Show them how **Project Permissions** and **Groups** are used to implement Role-Based Access Control.
    *   **For Data Security:** Show them how **Connections** are configured to use secure credentials (like IAM roles or Key Vaults) and how sensitive data can be masked with **Prepare** recipes.
    *   **For Auditing:** Show them the **Global Audit Log** and the **Project Timeline**. Explain how **Git integration** provides an immutable change log.
    *   **For Data Classification:** Show them how **Tags** are used to identify PII and other sensitive data.
4.  **Establish a Shared Governance Model:**
    *   Work with them to create a standard **Tagging Taxonomy** for data sensitivity.
    *   Collaborate on defining the standard user **Groups** and their permissions.
    *   Document these agreed-upon standards in a central, shared Wiki.
5.  **Provide Read-Only Access:**
    *   Give the security and compliance teams read-only administrator access to the Dataiku instance. This allows them to independently view logs and audit project permissions without being able to make changes.

### 4. Resources and Tools
- **Live Demos:** The most effective way to communicate technical capabilities.
- **A Shared Wiki:** The place to document your joint governance standards.
- **Read-only Admin Access:** Empowers the security team and builds trust.

### 5. Next Steps and Progression
- **Regular Check-ins:** Schedule a quarterly meeting to review the platform's usage, discuss any new security features in the latest Dataiku release, and address any new compliance requirements.
- **Automated Reporting:** Build a governance dashboard in Dataiku that reports on compliance with your shared standards (e.g., "Number of projects missing an owner tag"). Automate the delivery of this report to the compliance team.

### 6. Common Challenges and Solutions
- **Challenge:** "The security team wants to lock everything down, which makes it hard for users to get their work done."
- **Solution:** This is a classic negotiation. Your job is to show them how you can meet the *intent* of their security control in a way that is less restrictive. For example, instead of denying all access to a database, you can use Dataiku to provide access to a sanitized, anonymized version of the data.
- **Challenge:** "They don't understand the platform and are asking for features that don't make sense."
- **Solution:** This points to a need for more education. Offer to run a more detailed training session for their team. The more they understand how Dataiku works, the more productive your collaboration will be.
`,
  },
  {
    id: 560,
    slug: 'enabling-collaborative-development-with-project-flow-sharing',
    question: 'How to get started with enabling collaborative development in Dataiku using project and Flow sharing.',
    answer: `
### 1. Introduction/Overview
Dataiku is designed from the ground up for team collaboration. It provides a shared, visual workspace where multiple developers, analysts, and business users can work together on the same project. The key to enabling this is understanding how to use shared projects and the visual Flow as a common language.

### 2. Prerequisites
- **A team of two or more users.**
- **A shared Dataiku project.**

### 3. Step-by-Step Instructions: Collaboration Patterns

1.  **Use a Shared Project:**
    *   The foundation of collaboration is a single project where all team members are added as **Contributors**. This gives them permission to create and edit objects.
2.  **The Flow as a Shared Language:**
    *   The **Visual Flow** is the central canvas where all work is visible. A data analyst can create a visual recipe, and a data scientist can immediately see it, use its output, and build a model on it. The Flow makes the work of others discoverable and transparent.
3.  **Use Asynchronous Communication Tools:**
    *   **Descriptions:** The most important habit. Every team member should write a clear description on every dataset and recipe they create. This explains the "why" behind their work to their colleagues.
    *   **Discussions:** Use the "Discussions" feature on any object to ask a question or leave a comment for a specific teammate. For example, you can @-mention a colleague on a dataset and ask, "Is this data ready for me to use?"
4.  **Manage Concurrent Work with Git:**
    *   For technical teams, **Git integration** is essential to prevent conflicts.
    *   Each developer should work on their own **branch**. This isolates their changes.
    *   When work is complete, they use a **Pull Request** to merge their changes back into the main branch, allowing for a code review by a peer.

### 4. Resources and Tools
- **Shared Projects with Contributor permissions.**
- **The Visual Flow.**
- **Discussions and Descriptions.**
- **Git Integration for parallel development.**

### 5. Next Steps and Progression
- **Paired Sessions:** Encourage team members to have short, paired sessions where they share their screen and build a part of the flow together. This is a very effective way to share knowledge.
- **Project Wiki:** Use the Wiki to document the project's goals, key decisions, and meeting notes, creating a single source of truth for the entire team.
- **Dataiku Apps:** A data scientist can build a model, and then a business analyst can build a user-friendly Dataiku App on top of it, creating a collaborative handoff to business users.

### 6. Common Challenges and Solutions
- **Challenge:** "Two developers edited the same recipe at the same time and created a conflict."
- **Solution:** This is exactly what Git branching is designed to prevent. If you are not using Git, this requires good communication and a clear division of tasks. With Git, a merge conflict will be created, and the developers will need to work together to resolve it.
- **Challenge:** "I don't know what my teammate's recipe does."
- **Solution:** This is a documentation problem. Your team needs to enforce the discipline of writing a clear description on every object. If you find an undocumented recipe, ask the owner to add a description.
`,
  },
  {
    id: 561,
    slug: 'setting-up-code-review-processes-for-python-r-scripts',
    question: 'How to get started with setting up code review processes for Dataiku Python/R scripts (e.g., via pull requests).',
    answer: `
### 1. Introduction/Overview
Code review is a critical practice where a team member reviews another's code to check for correctness, style, and adherence to best practices. It's one of the most effective ways to improve code quality and share knowledge. For Dataiku code recipes, the standard way to facilitate this is by using **Git integration** and **Pull Requests**.

### 2. Prerequisites
- **A Dataiku project connected to a Git repository** (e.g., on GitHub, GitLab).
- **A team of two or more developers.**
- **A defined branching strategy** (e.g., feature branching).

### 3. Step-by-Step Instructions: The Code Review Workflow
1.  **Create a Feature Branch:**
    *   The developer who is writing the code must start by creating a new Git branch for their work (e.g., \`feature/new-python-parser\`). They make all their changes on this branch.
2.  **Complete the Code and Commit:**
    *   The developer writes their Python or R recipe.
    *   They commit their changes to their feature branch with clear commit messages.
3.  **Open a Pull Request (PR):**
    *   When the code is ready for review, the developer pushes their branch to the remote repository.
    *   They then go to the Git provider's web UI (e.g., GitHub) and open a new **Pull Request**.
    *   The PR's purpose is to merge their feature branch into the main development branch.
    *   In the PR description, they should explain what the code does and how to test it. They then assign a teammate as a **reviewer**.
4.  **Perform the Review:**
    *   The reviewer receives a notification.
    *   In the PR interface, they can see a "diff" of the exact code changes.
    *   They review the code for:
        *   **Correctness:** Does it do what it's supposed to do?
        *   **Style:** Does it follow the team's coding style guide?
        *   **Maintainability:** Is the code clear, readable, and well-commented?
        *   **Error Handling:** Does it handle potential errors gracefully?
    *   The reviewer can leave comments on specific lines of code to ask questions or suggest improvements.
5.  **Iterate and Approve:**
    *   The original developer makes any necessary changes based on the feedback and pushes them to the branch.
    *   Once the reviewer is satisfied, they **approve** the Pull Request.
6.  **Merge:** After approval, the feature branch is merged into the main branch, and the new code becomes part of the project.

### 4. Resources and Tools
- **Git Integration in Dataiku:** For managing branches and commits.
- **Pull Request Feature (on GitHub, GitLab, etc.):** The core tool for the review process.
- **A written code review checklist** in your team's Wiki can help ensure reviews are consistent.

### 5. Next Steps and Progression
- **Required Status Checks:** You can configure your repository to require that automated tests (run by a CI pipeline) must pass before a PR can be merged.
- **Branch Protection Rules:** Protect your main branch so that no one can merge a PR without at least one approval.

### 6. Common Challenges and Solutions
- **Challenge:** "Code reviews are slowing us down."
- **Solution:** Keep Pull Requests small and focused on a single logical change. A PR that changes hundreds of lines is very difficult and slow to review. A small, focused PR can be reviewed and merged quickly.
- **Challenge:** "The feedback in my review feels personal or harsh."
- **Solution:** Teams need to foster a culture of constructive, blameless code reviews. Feedback should always be about the code, not the person. A good practice is to phrase suggestions as questions: "Have you considered using a dictionary here? It might be more readable."
`,
  },
  {
    id: 562,
    slug: 'creating-project-templates-shared-libraries',
    question: 'How to get started with creating Dataiku project templates and shared libraries for reuse across teams.',
    answer: `
### 1. Introduction/Overview
To scale analytics and ensure consistency, it's crucial to make common tasks and components reusable. Dataiku supports this through two main features: **Project Templates**, for reusing project structures, and **Shared Libraries**, for reusing code.

### 2. Prerequisites
- **An identified need for reuse:** You have noticed that teams are repeatedly building the same kinds of flows or writing the same kinds of functions.
- **Permissions to create projects.**

### 3. Step-by-Step Instructions

#### Part 1: Creating a Project Template
1.  **Identify a Standard Project Structure:** Look at your existing projects. What is a common, successful structure? This usually involves a standard set of **Flow Zones** (e.g., Ingestion, Preparation, Output).
2.  **Build the Template Project:**
    *   Create a new, blank project named \`TEMPLATE_Standard_Analytics\`.
    *   In this project, create the empty Flow Zones.
    *   Create a standard **Wiki** structure with placeholder pages.
    *   Do **not** add any project-specific data or recipes.
3.  **Using the Template:** When a team needs to start a new project, they find the template project, click the "..." menu, and **Duplicate** it. They now have a new project with your best-practice structure already in place.

#### Part 2: Creating a Shared Code Library
1.  **Identify Reusable Code:** Find a Python or R function that is used in multiple different projects (e.g., a function to parse a specific internal file format).
2.  **Create a "Library" Project:**
    *   Create a new project named \`SHARED_CODE_LIBRARY\`.
    *   In this project's **... > Libraries** section, create a new script file (e.g., \`company_utils.py\`).
    *   Place your reusable function inside this script.
3.  **Using the Shared Library:**
    *   Now, in any *other* project, go to **Settings > Dependencies**.
    *   Add a dependency on the \`SHARED_CODE_LIBRARY\` project.
    *   Once the dependency is added, any Python recipe in your current project can now import and use the function:
    > \`\`\`python
    > from company_utils import my_reusable_function
    > \`\`\`
### 4. Resources and Tools
- **The "Duplicate project" feature.**
- **The Project Library feature.**
- **Project Dependencies settings.**

### 5. Next Steps and Progression
- **Versioning the Library:** The shared library project should be connected to Git. This allows you to version your shared code. Be careful, as changes to the shared library can affect all projects that depend on it.
- **Creating a Plugin:** For the ultimate reusability, a developer can package the shared logic into a custom Dataiku plugin, which can provide a visual recipe for the code.

### 6. Common Challenges and Solutions
- **Challenge:** A change to the shared library broke another project.
- **Solution:** This is the primary risk of shared code. It requires careful testing and communication. Before changing a function in the shared library, you must understand which projects depend on it and test to ensure your change is backward-compatible.
- **Challenge:** "How do I find out what reusable components are available?"
- **Solution:** The shared library project must be well-documented. Its Wiki should serve as a catalog, clearly explaining what functions are available and how to use them.
`,
  },
  {
    id: 563,
    slug: 'using-flow-view-bookmarks-to-communicate-pipeline-design',
    question: 'How to get started with using the Dataiku Flow view and bookmarks to communicate pipeline design to stakeholders.',
    answer: `
### 1. Introduction/Overview
The visual Flow is one of Dataiku's most powerful communication tools. It provides an intuitive, high-level map of your data pipeline that is understandable by both technical and non-technical audiences. Using features like Flow Zones and Bookmarks effectively can turn your Flow into a powerful presentation tool.

### 2. Prerequisites
- **A Dataiku project with a Flow.**
- **A need to present or explain your pipeline** to colleagues or stakeholders.

### 3. Step-by-Step Instructions

1.  **Organize Your Flow:**
    *   A clean Flow is a prerequisite for clear communication.
    *   Group your recipes and datasets into logical **Flow Zones** (e.g., "Data Ingestion," "Data Preparation," "Modeling," "Final Outputs").
    *   Give your datasets and recipes clear, descriptive names.
2.  **Add Documentation to the Flow:**
    *   Use the **Description** field on your key datasets and recipes. This text appears when you hover over the object, providing instant context.
    *   Drag **Text Boxes** onto the Flow canvas to act as large section headers or comments.
3.  **Create Bookmarks for a Guided Tour:**
    *   Bookmarks allow you to save specific views of your Flow (a certain zoom level and position) that you can jump back to.
    *   Zoom in on the first important part of your flow (e.g., the Ingestion zone).
    *   In the bottom-right menu of the Flow, click the **Bookmarks** icon and **Add new bookmark**. Name it "1. Data Sources".
    *   Pan to the next logical section, and create another bookmark named "2. Cleaning and Joining".
    *   Continue this for all the key stages of your pipeline.
4.  **Presenting with Bookmarks:**
    *   During your presentation, instead of manually panning and zooming (which can be disorienting for the audience), simply click through your saved bookmarks.
    *   This creates a smooth, guided tour of your pipeline, allowing you to explain each stage clearly.

### 4. Resources and Tools
- **Flow Zones:** For high-level organization.
- **Descriptions and Text Boxes:** For adding context.
- **Bookmarks:** The tool for creating your guided presentation.

### 5. Next Steps and Progression
- **Collapse Zones:** For a very high-level executive overview, collapse all your Flow Zones. This will show a simple, high-level diagram of how your major stages connect, which can be understood in seconds.
- **Share a Link:** You can share a direct URL to your Dataiku project with stakeholders (if they have read access), and they can explore the Flow themselves.

### 6. Common Challenges and Solutions
- **Challenge:** "My Flow is too messy to show anyone."
- **Solution:** Take 15 minutes to clean it up. Use the "Arrange" button to automatically tidy the layout within each Flow Zone. A clean Flow signals a well-organized and professional project.
- **Challenge:** "The stakeholders are getting lost in the technical details."
- **Solution:** You are probably showing them too much detail. Use the zone collapsing and bookmarks to control the narrative. Focus their attention on the parts of the flow that are relevant to the business logic, and gloss over the purely technical steps.
`,
  },
  {
    id: 564,
    slug: 'integrating-project-management-with-jira-trello',
    question: 'How to get started with integrating Dataiku project management with tools like JIRA or Trello for tracking tasks.',
    answer: `
### 1. Introduction/Overview
While Dataiku has a built-in "TODO" list, most enterprise teams use a dedicated project management tool like JIRA or Trello. You can integrate Dataiku with these tools to link your development work directly to your team's tasks and user stories. This integration is typically done via the tools' REST APIs.

### 2. Prerequisites
- **A project management tool** (JIRA, Trello, etc.) with API access.
- **An API key or token** for that tool.
- **A Dataiku project.**

### 3. Step-by-Step Instructions: One-Way Integration (Dataiku -> JIRA)

This common pattern involves updating a JIRA ticket from a Dataiku scenario.

1.  **Store Credentials:** In your Dataiku project, store your JIRA username and API token securely as **Project Variables** of the "Password" type.
2.  **Create a Scenario:** Create a Dataiku scenario that performs an action you want to track (e.g., a model retraining scenario).
3.  **Add a Python Step:** At the end of the scenario, add a **Execute Python code** step.
4.  **Write the API Call Script:**
    *   The script will use the \`requests\` library to make a call to the JIRA REST API.
    *   It can add a comment to a specific JIRA ticket to indicate that the Dataiku job has run.
    > \`\`\`python
    > import dataiku
    > import requests
    >
    > # Get JIRA details from variables
    > variables = dataiku.get_custom_variables()
    > JIRA_URL = "https://mycompany.atlassian.net"
    > JIRA_TICKET = "PROJ-123"
    > JIRA_USER = variables.get("JIRA_USER")
    > JIRA_TOKEN = variables.get("JIRA_TOKEN")
    >
    > # The comment to add
    > comment_text = f"Weekly model retraining scenario completed successfully. Job URL: {dataiku.get_custom_variables().get('jobURL')}"
    >
    > # Make the API call to add a comment
    > requests.post(
    >     f"{JIRA_URL}/rest/api/2/issue/{JIRA_TICKET}/comment",
    >     auth=(JIRA_USER, JIRA_TOKEN),
    >     json={"body": comment_text}
    > )
    > \`\`\`

### 4. Resources and Tools
- **REST APIs** for your project management tool (JIRA, Trello, etc.).
- **Python Scenario Step:** The environment for your integration script.
- **\`requests\` library:** For making the API calls.

### 5. Next Steps and Progression
- **Two-Way Integration:** A more advanced integration could involve a Dataiku webapp that allows a user to select a JIRA story, and then have Dataiku use the API to pull requirements from that story to configure a pipeline.
- **CI/CD Integration:** In your Git commit messages in Dataiku, include the JIRA ticket number (e.g., "PROJ-123 Add new feature"). Many CI/CD tools can be configured to automatically link the commit to the JIRA ticket, providing full traceability.

### 6. Common Challenges and Solutions
- **Challenge:** "The API call to JIRA is failing."
- **Solution:** Check your credentials and the JIRA API endpoint URL. The JIRA REST API can be complex, so refer to their official documentation carefully. Use a tool like Postman to test your API calls before scripting them.
- **Challenge:** "This seems like a lot of custom work."
- **Solution:** It is. Native, out-of-the-box integration for these tools is not a core Dataiku feature. This custom API-based integration should only be built if there is a strong business need for it. For many teams, simply referencing JIRA ticket numbers in Git commit messages and project descriptions is a sufficient level of integration.
`,
  },
  {
    id: 565,
    slug: 'structuring-projects-for-handover-between-scientists-engineers',
    question: 'How to get started with structuring Dataiku projects to hand off between data scientists and MLOps engineers.',
    answer: `
### 1. Introduction/Overview
A smooth handover between the data scientist who builds a model and the MLOps engineer who productionizes it is crucial for an efficient MLOps lifecycle. Structuring your Dataiku project with clear separation of concerns using **Flow Zones** is the key to making this handover seamless.

### 2. Prerequisites
- A project involving both data science (modeling) and MLOps (deployment, automation).
- A team with distinct Data Scientist and MLOps Engineer roles.

### 3. Step-by-Step Instructions: A Zoned Workflow
1.  **Define Clear Roles and Responsibilities:**
    *   **Data Scientist:** Responsible for data exploration, feature engineering, and model training. Their "product" is a high-performing, validated, and saved model.
    *   **MLOps Engineer:** Responsible for everything that happens *after* the model is created: deploying it as an API, setting up automated retraining, and monitoring its performance in production.
2.  **Structure the Project with Flow Zones:** Create a Flow that reflects this separation of responsibility.
    *   **Zone 1-3 (Data Scientist's Workspace):**
        *   \`1_Ingestion\`: Raw data.
        *   \`2_Data_Preparation\`: Cleaning and joining.
        *   \`3_Feature_Engineering_and_Modeling\`: The data scientist works here to create features and use the **Visual ML Lab** to train models. The final output of this zone is a **Saved Model** object.
    *   **Zone 4 (The Handover Point):**
        *   The **Saved Model** itself acts as the formal handover point.
    *   **Zone 5-6 (MLOps Engineer's Workspace):**
        *   \`5_Deployment\`: The MLOps engineer takes the Saved Model as input and builds the deployment pipeline. This might include a **Score** recipe for batch scoring or deploying to the **API Deployer** for real-time.
        *   \`6_Monitoring_and_Automation\`: The MLOps engineer creates the **Scenarios** for automated retraining, performance monitoring, and alerting.
3.  **The Handover Process:**
    *   When the data scientist has produced a final, validated Saved Model, they notify the MLOps engineer.
    *   The MLOps engineer can then start their work in the downstream zones, confident that the upstream modeling part is complete.

### 4. Resources and Tools
- **Flow Zones:** The essential tool for creating a visual separation of concerns.
- **The Saved Model object:** Acts as the formal, versioned artifact that is handed over from the data scientist to the MLOps engineer.

### 5. Next Steps and Progression
- **Git and Pull Requests:** The handover can be formalized with Git. The data scientist could complete their work on a feature branch. The MLOps engineer would then review the branch via a Pull Request before it's merged, ensuring the model is ready for production.
- **Shared Code Libraries:** Both roles can contribute to and use a shared library of Python functions for common tasks.

### 6. Common Challenges and Solutions
- **Challenge:** The model works in the lab, but fails when the MLOps engineer tries to deploy it.
- **Solution:** This often points to an environment issue. The data scientist might have used a specific library on their local machine that wasn't declared in the project's code environment. The MLOps engineer must ensure the production environment (e.g., the API node) is an exact replica of the training environment.
- **Challenge:** The data scientist and MLOps engineer are "throwing work over the wall" at each other.
- **Solution:** While the zones create a separation of concerns, the two roles must still collaborate. The MLOps engineer should be involved early in the project to advise on production constraints. The data scientist should remain involved to help interpret the model's performance once it's in production.
`,
  },
  {
    id: 566,
    slug: 'using-notebooks-for-collaborative-exploration',
    question: 'How to get started with using Dataiku notebooks for collaborative data exploration and sharing results.',
    answer: `
### 1. Introduction/Overview
Dataiku's integrated Jupyter notebooks are a powerful tool for exploratory data analysis (EDA), prototyping, and collaboration. They allow multiple team members to share code, visualizations, and narrative text in a single, interactive document.

### 2. Prerequisites
- A Dataiku project.
- A dataset to explore.
- Basic knowledge of Python and libraries like Pandas and Matplotlib.

### 3. Step-by-Step Instructions
1.  **Create a New Notebook:**
    *   In your project, navigate to the **Notebooks** tab.
    *   Click **+ NEW NOTEBOOK** and choose a language (e.g., Python).
2.  **Load Data:** In the first code cell, use the Dataiku API to load a sample of your dataset into a Pandas DataFrame.
    > \`import dataiku\`
    > \`df = dataiku.Dataset("my_data").get_dataframe()\`
3.  **Explore and Visualize:**
    *   Use subsequent cells to explore the data using Pandas (\`df.describe()\`, \`df.head()\`).
    *   Use libraries like Matplotlib or Seaborn to create visualizations. The plots will be displayed inline directly in the notebook.
4.  **Document with Markdown:**
    *   Switch a cell's type from "Code" to "Markdown".
    *   Use these cells to write your commentary, explain your thought process, and summarize your findings. This turns your notebook from a simple script into a narrative report.
5.  **Share with Colleagues:**
    *   Other contributors to the project can open the same notebook. They will see your code, your markdown text, and the saved outputs of your code cells.
    *   They can add their own code or comments, making it a collaborative document.
6.  **Publish Insights:**
    *   From a notebook cell, you can "publish" a chart or a dataset to the Flow or a Dashboard. This allows you to easily share a key finding from your exploration with a wider audience.

### 4. Resources and Tools
- **Jupyter Notebooks:** The interactive environment.
- **Markdown Cells:** For adding narrative and documentation.
- **The "Publish" Feature:** For sharing insights from the notebook.

### 5. Next Steps and Progression
- **Versioning:** If your project is connected to Git, your notebooks (\`.ipynb\` files) will be version-controlled, so you can track changes over time.
- **"Productionizing" a Notebook:** Once you have finalized a piece of analysis in a notebook, the best practice is to refactor the clean code into a reusable **Python recipe** to make it a formal part of your pipeline.

### 6. Common Challenges and Solutions
- **Challenge:** My notebook is a mess of out-of-order cells.
- **Solution:** It's a good practice to periodically use the **Kernel > Restart & Run All** command. This runs all your cells from top to bottom, ensuring your logic is reproducible and sequential.
- **Challenge:** A colleague can't see the output of my code.
- **Solution:** You need to make sure you **save the notebook** after running the cells. The outputs are saved as part of the notebook's JSON structure.
`,
  },
  {
    id: 567,
    slug: 'managing-concurrent-changes-to-avoid-conflicts',
    question: 'How to get started with managing concurrent changes in Dataiku (e.g., branches or shared projects) to avoid conflicts.',
    answer: `
### 1. Introduction/Overview
When multiple developers work on the same project, they can inadvertently overwrite each other's changes. This is known as a "conflict." Managing concurrent changes is a fundamental challenge in team-based development. The industry-standard solution, and the best practice in Dataiku, is to use **Git and a feature branching workflow**.

### 2. Prerequisites
- **A team of two or more developers.**
- **A Dataiku project connected to a remote Git repository.**

### 3. Step-by-Step Instructions: The Git Branching Workflow
1.  **Isolate Your Work in a Branch:**
    *   **Never work directly on the \`main\` branch.**
    *   Before starting a new task, each developer must go to the **Git** page in Dataiku and **create a new branch** for their work (e.g., \`dave/fix-join-logic\`).
    *   This branch is a personal, isolated copy of the project.
2.  **Commit Changes to Your Branch:**
    *   As the developer makes changes, they commit them frequently to their own branch. These commits are not visible to their teammates yet.
3.  **Stay Up-to-Date:**
    *   Periodically, the developer should **pull** the latest changes from the shared \`main\` branch into their feature branch. This integrates their colleagues' completed work and helps to resolve any potential conflicts early and in small chunks.
4.  **Merge with a Pull Request:**
    *   When the developer's feature is complete, they push their branch and open a **Pull Request (PR)** on the Git provider's website (e.g., GitHub).
    *   The PR is a request to merge their isolated changes back into the main project. It's also a formal code review process.
5.  **Handle Merge Conflicts:**
    *   If the PR has a **merge conflict** (meaning another developer changed the *exact same lines* in the same recipe on the main branch), it cannot be merged automatically.
    *   Dataiku provides a **visual diff and merge tool**. The developer must use this tool to look at the two conflicting versions and manually choose which changes to keep.
    *   Once the conflict is resolved, the PR can be merged.

### 4. Resources and Tools
- **Git Integration:** The core technology for this workflow.
- **Branches:** The mechanism for isolating work.
- **Pull Requests:** The process for controlled merging and code review.
- **Dataiku's Visual Diff and Merge Tool:** For resolving conflicts.

### 5. Next Steps and Progression
- **Good Communication:** While Git provides the technical tools, good old-fashioned communication is still essential. If you know you and a colleague need to work on a similar part of the flow, talk to each other to coordinate your work and minimize the chance of conflicts.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm not using Git. How do I avoid conflicts?"
- **Solution:** Without Git, you must rely entirely on communication and process. You would need to "lock" parts of the flow, where only one person is allowed to work on a specific recipe at a time. This is slow and inefficient. Using Git is strongly recommended for any team of more than one person.
- **Challenge:** "Resolving a merge conflict on a visual recipe is hard."
- **Solution:** It can be. This is why it's a best practice to break down work into small, independent tasks. The smaller the change, the less likely it is to conflict with someone else's work.
`,
  },
  {
    id: 568,
    slug: 'documenting-projects-wiki-comments',
    question: 'How to get started with documenting Dataiku projects (wiki pages, comments) to align data scientists and engineers.',
    answer: `
### 1. Introduction/Overview
Clear documentation is the bridge that connects the work of data scientists, who focus on modeling and analysis, and data engineers, who focus on building robust pipelines. Dataiku provides a multi-layered documentation system to ensure that all aspects of a project, from the high-level business goal to the low-level code logic, are clearly explained.

### 2. Prerequisites
- A Dataiku project.
- A team commitment to documenting their work.

### 3. Step-by-Step Instructions: A Documentation Strategy

1.  **For the Business Context: Use the Project Wiki.**
    *   The **Wiki** is the place for long-form, narrative documentation.
    *   Create a "Project Brief" page that explains the business problem, the goals of the project, and the key stakeholders. This ensures everyone understands *why* the project exists.
2.  **For the Pipeline Architecture: Use the Flow Itself.**
    *   **Descriptions:** This is the most important habit. Every single object (dataset, recipe) in the Flow has a **Description** field. Write a clear, one-sentence summary of its purpose. This makes the Flow self-documenting.
    *   **Flow Zones:** Organize the Flow into named zones like "Ingestion", "Data Prep", and "Modeling". This visually communicates the high-level architecture.
3.  **For Column-Level Details: Use the Schema View.**
    *   In a dataset's **Settings > Schema**, you can add a **description to each column**. This creates a comprehensive **Data Dictionary** that explains what each feature represents.
4.  **For Code Logic: Use Comments and Docstrings.**
    *   In any **Python** or **SQL recipe**, use inline comments and function docstrings to explain *how* the code works and the intent behind any complex logic.

### 4. Resources and Tools
- **Project Wiki:** For the high-level narrative.
- **Description Fields:** For object-level context.
- **Column Descriptions:** For the data dictionary.
- **Code Comments:** For detailed logic explanation.

### 5. Next Steps and Progression
- **Create a Documentation Template:** Create a template project that includes a pre-structured Wiki with all the standard sections a good project document should have.
- **Enforce during Reviews:** Make documentation a part of your review process. A pull request shouldn't be approved if the new recipes or datasets are missing descriptions.

### 6. Common Challenges and Solutions
- **Challenge:** "Data scientists and engineers speak different languages."
- **Solution:** Dataiku's visual Flow acts as the common language. A data scientist can look at a data engineer's visual Join recipe and understand its logic without needing to read complex code. Likewise, a data engineer can see the inputs and outputs of a data scientist's "Saved Model" without needing to understand the complex math inside it.
- **Challenge:** "No one wants to write documentation."
- **Solution:** Lead by example and make it a non-negotiable part of your team's "Definition of Done". The time spent writing a good description is a fraction of the time that will be wasted later when someone (possibly your future self) has to reverse-engineer an undocumented pipeline.
`,
  },
  {
    id: 569,
    slug: 'training-onboarding-team-members-on-best-practices',
    question: 'How to get started with training and onboarding team members on Dataiku best practices and workflows.',
    answer: `
### 1. Introduction/Overview
A structured onboarding plan is essential for getting new team members up to speed on Dataiku and ensuring they follow your team's best practices from day one. A good plan combines self-paced learning with practical, hands-on exercises and mentorship.

### 2. Prerequisites
- **A new team member.**
- **A designated mentor** or manager.
- **A Dataiku instance** with a sandbox environment.

### 3. Step-by-Step Instructions: A 4-Week Onboarding Plan

**Week 1: The Basics**
- **Goal:** Understand the core concepts of Dataiku.
- **Tasks:**
    1.  **Dataiku Academy:** Assign the **Core Designer** learning path. This is non-negotiable.
    2.  **Sandbox Project:** Create a personal sandbox project for the new hire.
    3.  **First Flow:** Give them a simple task: "Upload this CSV and use a Prepare recipe to remove null values."
    4.  **Daily Check-ins:** The mentor should have a short, daily check-in to answer questions.

**Week 2: Team Standards and First "Real" Task**
- **Goal:** Learn the team's specific ways of working.
- **Tasks:**
    1.  **Review Team Wiki:** Have them read the team's documentation on naming conventions, Git branching strategy, and documentation standards.
    2.  **Paired Task:** Assign a simple, real task. The mentor and new hire should work on it *together* via pair programming. The mentor drives first, then the new hire.
    3.  **Introduce Git:** Show them how to create a branch, commit changes, and open a pull request.

**Week 3: Independent Work and First Review**
- **Goal:** Apply learning to a task independently.
- **Tasks:**
    1.  **Assign a Solo Task:** Give them a small, well-defined user story to complete on their own.
    2.  **First Pull Request:** They will submit their first PR. The mentor performs a thorough but constructive review, providing feedback on code, documentation, and adherence to standards.

**Week 4: Integration and Presentation**
- **Goal:** Solidify knowledge and integrate with the team.
- **Tasks:**
    1.  **Demo:** Have the new hire give a short demo of the feature they built to the rest of the team.
    2.  **Start Contributing:** They should now be ready to start picking up regular tasks from the sprint backlog.

### 4. Resources and Tools
- **Dataiku Academy:** The foundation of the training.
- **A Sandbox Project:** For safe experimentation.
- **A Team Wiki:** To document all your standards and best practices.
- **A Mentor:** The most important resource is a dedicated person to guide them.

### 5. Next Steps and Progression
- **Continued Learning:** Encourage them to pursue advanced Dataiku Academy certifications.
- **Mentoring Others:** Once they become proficient, have them help mentor the next new team member.

### 6. Common Challenges and Solutions
- **Challenge:** The new hire is overwhelmed by the amount of information.
- **Solution:** The structured, week-by-week plan helps to manage this. Reassure them that they are not expected to know everything at once and that the goal is steady progress.
- **Challenge:** The new hire is making mistakes.
- **Solution:** This is expected and is part of learning. The key is to catch these mistakes early during reviews and use them as teaching moments, explaining the best practice and the "why" behind it.
`,
  },
  {
    id: 570,
    slug: 'exposing-workflows-as-restful-apis',
    question: 'How to get started with exposing Dataiku workflows as RESTful APIs for applications to consume.',
    answer: `
### 1. Introduction/Overview
Exposing your work as a RESTful API is how you make your models and data logic available to other applications in real-time. Dataiku's **API Deployer** is the dedicated, production-grade service for creating, deploying, and managing these APIs.

### 2. Prerequisites
- **An artifact to deploy:** This is typically a **Saved Model** from your Flow, or a custom **Python function**.
- **Access to an API Deployer instance,** which must be set up by a Dataiku administrator.
- **A clear understanding of the API's purpose:** What data will it take as input, and what will it return?

### 3. Step-by-Step Instructions
1.  **Create the API Service in the Designer:**
    *   From your project Flow, select the asset you want to expose (e.g., a Saved Model).
    *   In the right-hand panel, click **API Designer**.
    *   Click **+ CREATE YOUR FIRST API SERVICE**.
    *   Give your service a name (e.g., \`churn-prediction-service\`).
2.  **Define the Endpoint:**
    *   Inside the service, create a new endpoint.
    *   Choose the endpoint type. For a model, this would be a **Prediction** endpoint.
    *   Point the endpoint to your Saved Model.
    *   You can test the endpoint in the designer's "Test" tab by providing a sample JSON input.
3.  **Deploy the Service:**
    *   Once you are happy with your service definition, click the **Deploy** button.
    *   The API Deployer will package your model and its dependencies and sends it to the API Deployer.
4.  **Use the Live API:**
    *   Navigate to the API Deployer UI. You will see your service deployed and running.
    *   The UI provides the live **endpoint URL** and **code snippets** showing how other applications can call it.
    *   You can now give this information to your application developers to integrate.

### 4. Resources and Tools
- **API Designer:** The UI within a project for defining the API's structure.
- **API Deployer:** The production service that runs and manages the live APIs.
- **Saved Model or Python Function:** The underlying logic that the API exposes.

### 5. Next Steps and Progression
- **Versioning:** You can deploy multiple versions of your model to the same endpoint and use traffic splitting to safely roll out updates.
- **Scaling:** If the API is deployed on Kubernetes, you can easily scale the number of model server replicas to handle high request volumes.
- **Monitoring:** Use the API Deployer's built-in dashboards to monitor the latency, traffic, and error rates of your production APIs.

### 6. Common Challenges and Solutions
- **Challenge:** "My deployment is failing."
- **Solution:** Check the deployment logs in the API Deployer. A common issue is that the code environment used by the model is not present on the API node. The API node needs to have all the same package dependencies as the design node where the model was trained.
- **Challenge:** "The live API is returning an error."
- **Solution:** Check the logs of the API service in the API Deployer UI. This will show the full traceback of any errors that occurred during prediction. A common issue is that the JSON sent by the client application does not match the schema the model is expecting.
`,
  },
  {
    id: 571,
    slug: 'deploying-api-nodes-in-docker-kubernetes',
    question: 'How to get started with deploying Dataiku API nodes in a Docker or Kubernetes environment for production.',
    answer: `
### 1. Introduction/Overview
For a scalable and resilient production environment, you should deploy your Dataiku API nodes as containers, orchestrated by Kubernetes. This allows you to easily manage, scale, and update your real-time model scoring services without downtime.

### 2. Prerequisites
- **A Kubernetes cluster** (e.g., EKS, AKS, GKE).
- **A Docker registry** (e.g., Docker Hub, ECR) to store your images.
- **Familiarity with Kubernetes and Helm concepts.**
- **A Dataiku API Deployer license.**

### 3. Step-by-Step Instructions
1.  **What is an API Node?** The API node is a specific component of Dataiku that is optimized for low-latency model serving. It's separate from the main "design" node where you build flows.
2.  **Use the Official Helm Chart:** The recommended way to deploy the API Deployer and its API nodes on Kubernetes is by using the official **Dataiku Helm chart**.
3.  **Configure the Deployment:**
    *   You will create a \`values.yaml\` file to configure the Helm chart.
    *   In this file, you will specify that you want to deploy the \`api-deployer\` and one or more \`api-node\` components.
    *   You will configure the number of **replicas** (pods) for your API nodes, their **resource requests/limits** (CPU/memory), and how they should be exposed (e.g., via a Kubernetes Service of type LoadBalancer).
4.  **Deploy with Helm:**
    *   Run the command \`helm install ...\` with your configuration.
    *   Helm will create the necessary Kubernetes Deployments and Services for your API nodes.
5.  **Deploy a Model:**
    *   In the Dataiku design node, when you deploy an API service, you can now select this Kubernetes-based infrastructure as the deployment target.
    *   The API Deployer will then run your model on the API node pods in your Kubernetes cluster.

### 4. Resources and Tools
- **Dataiku's official Helm chart:** The supported method for K8s deployment.
- **Kubernetes:** The container orchestration platform.
- **The API Deployer:** The Dataiku service that manages the deployments.

### 5. Next Steps and Progression
- **Autoscaling:** Configure a **Horizontal Pod Autoscaler (HPA)** on your API node Deployment. This will automatically increase or decrease the number of pods based on CPU or memory load, allowing your service to handle traffic spikes elastically.
- **Monitoring:** Use tools like Prometheus and Grafana to scrape metrics from your API node pods to monitor performance and resource consumption.
- **Rolling Updates:** When you deploy a new version of a model, Kubernetes will perform a zero-downtime rolling update, gradually replacing the old pods with new ones.

### 6. Common Challenges and Solutions
- **Challenge:** "My model pod is crashing (CrashLoopBackOff)."
- **Solution:** Use \`kubectl logs <pod-name>\` to view the logs from the failing container. This is often caused by an environment issue, for example, the Docker image used for the API node is missing a Python library that your model requires.
- **Challenge:** "How do I know how many replicas I need?"
- **Solution:** Start with a few (e.g., 2-3 for high availability). Then, load test your API endpoint and monitor the CPU usage of the pods. Use this data to configure a Horizontal Pod Autoscaler (HPA) to manage the replica count automatically based on load.
`,
  },
  {
    id: 572,
    slug: 'securing-apis-with-oauth-api-tokens',
    question: 'How to get started with securing Dataiku APIs using OAuth or API tokens.',
    answer: `
### 1. Introduction/Overview
When you expose a model as a public API, you must secure it to ensure only authorized applications can access it. Dataiku's API Deployer provides several built-in authentication methods, from simple static API keys to more advanced integration with OAuth 2.0 providers.

### 2. Prerequisites
- **An API service deployed** on the Dataiku API Deployer.
- **Administrator access** to the API Deployer to configure security settings.

### 3. Step-by-Step Instructions

#### Method 1: Static API Keys (Simple and Common)
1.  **Generate a Key:** In the main Dataiku instance, an administrator can generate a static API key and grant it permissions to call a specific API service.
2.  **Configure the API Service:** In the API Deployer, open your deployed service. In its settings, you can add an "Authentication" method and choose **API Key**.
3.  **How Clients Authenticate:** The client application must include the API key in an HTTP header with every request. The standard header is \`Authorization: Bearer YOUR_API_KEY\`. The API Deployer will reject any request without a valid key.

#### Method 2: OAuth 2.0 Integration (Advanced Enterprise Security)
1.  **When to Use:** When you need to integrate with your company's central identity provider (like Okta or Azure Active Directory) and want users or applications to authenticate using standard OAuth 2.0 flows.
2.  **Configure the Identity Provider:** In your OAuth provider's admin console, you will need to register your Dataiku API service as a new application. This will provide you with a \`client_id\` and \`client_secret\`.
3.  **Configure Dataiku:**
    *   In the API Deployer, add a new "Authentication" method and choose **OAuth2**.
    *   Provide the details from your identity provider (e.g., the authorization URL, token URL, client ID, and secret).
4.  **How Clients Authenticate:**
    *   The client application first goes through an OAuth 2.0 flow (e.g., client credentials flow) with your identity provider to get a temporary JWT access token.
    *   The client then calls the Dataiku API, presenting this JWT in the \`Authorization: Bearer YOUR_JWT_TOKEN\` header.
    *   The API Deployer will validate the JWT with the identity provider before allowing the request to proceed.

### 4. Resources and Tools
- **API Deployer Security Settings:** The UI for configuring authentication methods.
- **Your Identity Provider (Okta, Azure AD, etc.):** Where you configure the OAuth application.

### 5. Next Steps and Progression
- **API Gateway:** For even more advanced security patterns like rate limiting, you can place a dedicated API Gateway (like AWS API Gateway) in front of your Dataiku API nodes. The gateway can handle authentication before forwarding the request to Dataiku.

### 6. Common Challenges and Solutions
- **Challenge:** "My client gets a 401 Unauthorized error."
- **Solution:** **For API Keys:** The key is likely invalid, expired, or doesn't have permissions for the service it's trying to call. **For OAuth:** The JWT token is likely expired or invalid. The client needs to refresh the token. There could also be a configuration mismatch between Dataiku and the identity provider (e.g., wrong audience URI).
- **Challenge:** "Where should the client application store the API key?"
- **Solution:** The client application must treat the API key as a secret. It should be stored securely in a secret manager or an environment variable, not hardcoded in its source code.
`,
  },
  {
    id: 573,
    slug: 'monitoring-api-endpoints-with-prometheus-elk-stack',
    question: 'How to get started with monitoring Dataiku API endpoints using tools like Prometheus or ELK Stack.',
    answer: `
### 1. Introduction/Overview
For production-grade observability, you'll want to integrate your Dataiku API endpoint monitoring with a centralized stack like Prometheus (for metrics) and the ELK Stack (Elasticsearch, Logstash, Kibana) for logging. This allows you to correlate API performance with other system events and create sophisticated dashboards and alerts.

### 2. Prerequisites
- **A deployed Dataiku API endpoint.**
- **A running Prometheus/Grafana stack and/or ELK stack.**
- **Administrator access** to the Dataiku API node server(s).

### 3. Step-by-Step Instructions

#### Part 1: Monitoring Metrics with Prometheus/Grafana
1.  **Expose Metrics from the API Node:** The Dataiku API node exposes performance metrics (like request count, latency, error codes) via a standard Java protocol called JMX.
2.  **Deploy the JMX Exporter:** You need a **JMX Exporter** agent running alongside your API node. This agent scrapes the JMX metrics and exposes them on a simple HTTP endpoint that Prometheus can read.
3.  **Configure Prometheus to Scrape:** In your Prometheus configuration, add a new "scrape job" that points to the HTTP endpoint of the JMX Exporter for each of your API nodes. Prometheus will now periodically collect and store the metrics.
4.  **Build a Grafana Dashboard:** In Grafana, use Prometheus as a data source. You can now build dashboards with panels that query and visualize your API endpoint's latency, throughput (requests per second), and error rates over time.

#### Part 2: Centralizing Logs with the ELK Stack
1.  **Deploy a Log Shipper:** On each Dataiku API node server, you need to install a log shipping agent, such as **Filebeat**.
2.  **Configure Filebeat:** Configure Filebeat to monitor the log files generated by the Dataiku API node (e.g., \`api-node.log\`).
3.  **Ship Logs to Logstash:** Configure Filebeat to send the log events to your **Logstash** instance. Logstash can be used to parse and enrich the log data (e.g., parsing the JSON log format).
4.  **Index in Elasticsearch:** Logstash then sends the processed logs to **Elasticsearch** for indexing.
5.  **Analyze in Kibana:** You can now use **Kibana** to search, filter, and create dashboards on your centralized API logs. This is extremely powerful for troubleshooting errors.

### 4. Resources and Tools
- **JMX Exporter:** The bridge between Dataiku's Java metrics and Prometheus.
- **Filebeat:** The agent for shipping logs.
- **The ELK Stack / Prometheus & Grafana:** Your central observability platforms.

### 5. Next Steps and Progression
- **Alerting:** Set up alerts in Grafana or Prometheus's Alertmanager. For example, you can create an alert that fires if the API endpoint's p99 latency goes above 500ms, or if the rate of 5xx errors exceeds 1%.

### 6. Common Challenges and Solutions
- **Challenge:** "This setup is very complex."
- **Solution:** It is. This is an enterprise-grade monitoring architecture. For simpler needs, the built-in monitoring dashboards in the Dataiku API Deployer are often sufficient. You should only implement this level of integration if you have a requirement to centralize all your company's monitoring in one place.
- **Challenge:** "My logs are not appearing in Kibana."
- **Solution:** This requires step-by-step debugging of the logging pipeline. Is Filebeat running? Can it connect to Logstash? Is Logstash successfully parsing the logs and sending them to Elasticsearch? Check the logs of each component in the ELK stack.
`,
  },
  {
    id: 574,
    slug: 'logging-tracing-requests-for-observability',
    question: 'How to get started with logging and tracing requests to Dataiku-hosted APIs for observability.',
    answer: `
### 1. Introduction/Overview
Observability goes beyond simple monitoring. It's about being able to ask arbitrary questions about your system's behavior. For an ML API, this means having detailed logs for every request and, for advanced use cases, distributed tracing to see how a request flows through multiple services.

### 2. Prerequisites
- **A deployed Dataiku API endpoint.**
- **A centralized logging platform** (like the ELK stack, Datadog, or Splunk).

### 3. Step-by-Step Instructions

#### Part 1: Centralized Logging
1.  **Understand the Default Logs:** The Dataiku API node automatically generates logs for every request. These logs are typically in a structured JSON format and contain key information like the timestamp, endpoint called, response status code, and latency.
2.  **Ship the Logs:** The most important step is to get these logs off the individual API node servers and into a centralized platform.
    *   Install a **log shipping agent** (like Filebeat or Fluentd) on each API node VM or as a sidecar container in Kubernetes.
    *   Configure this agent to watch the API node's log file and send new log entries to your central logging system (e.g., Elasticsearch, Datadog).
3.  **Use the Centralized Logs:**
    *   Now, you can use your logging platform's UI (e.g., Kibana) to search, filter, and analyze all your API requests.
    *   **Troubleshooting:** When a customer reports an error, you can search for their specific request ID to see the exact log entry and error message.
    *   **Analytics:** You can create dashboards to visualize trends like error rates or response times per API version.

#### Part 2: Distributed Tracing (Advanced)
1.  **When to Use:** When a single user request involves calls to multiple microservices, including your Dataiku API. Tracing allows you to see the full journey of that request.
2.  **Instrument Your Code:** This requires custom code.
    *   Your calling application must start a "trace" and generate a unique "trace ID".
    *   It must then pass this trace ID in an HTTP header (e.g., \`X-Trace-ID\`) when it calls the Dataiku API.
3.  **Propagate the Trace ID:**
    *   Inside your **Python API endpoint code** in Dataiku, you must read this header.
    *   Add the trace ID to your structured logs.
    *   If your Dataiku API in turn calls another service, it must pass the trace ID along in the headers of that downstream call.
4.  **Visualize the Traces:** A distributed tracing platform (like Jaeger or Datadog APM) can then ingest all these logs and use the common trace ID to stitch them together, creating a visual "flame graph" of the entire request lifecycle.

### 4. Resources and Tools
- **A Log Shipping Agent (Filebeat, etc.).**
- **A Centralized Logging Platform (ELK, Datadog, etc.).**
- **A Distributed Tracing Platform (Jaeger, OpenTelemetry, etc.)** for the advanced use case.

### 5. Next Steps and Progression
- **Custom Logging:** Add more detailed, application-specific logging within your Python API endpoint code to record business-relevant information for each prediction.

### 6. Common Challenges and Solutions
- **Challenge:** "My logs are in different formats and hard to parse."
- **Solution:** You need to configure a parsing pipeline, typically in Logstash or your logging platform's equivalent. This will parse the different log formats into a single, standardized JSON structure before they are indexed.
- **Challenge:** "Implementing distributed tracing is complicated."
- **Solution:** It is. This is a very advanced observability pattern. You should only undertake it if you have a complex microservices architecture where it's genuinely difficult to troubleshoot request flows. For many use cases, centralized logging is sufficient.
`,
  },
  {
    id: 575,
    slug: 'setting-up-autoscaling-rules-for-api-services',
    question: 'How to get started with setting up auto-scaling rules for Dataiku API services based on load.',
    answer: `
### 1. Introduction/Overview
Manually adding or removing servers to handle traffic spikes is inefficient and slow. Autoscaling is the practice of automatically adjusting the number of compute resources allocated to a service based on its current load. For a Dataiku API service deployed on Kubernetes, this is achieved using a **Horizontal Pod Autoscaler (HPA)**.

### 2. Prerequisites
- **Your Dataiku API service deployed on a Kubernetes cluster.** This means you have a Kubernetes **Deployment** that manages your model's pods.
- **A metrics server installed** in your Kubernetes cluster. Most managed Kubernetes services (EKS, AKS, GKE) include this by default. The HPA needs this to get CPU and memory metrics from the pods.

### 3. Step-by-Step Instructions
1.  **Define Resource Requests for Your Pods:**
    *   For autoscaling to work effectively, the pods in your API service's Deployment must have **CPU resource requests** defined.
    *   This tells Kubernetes how much CPU the pod needs to function, which is used as the baseline for calculating utilization percentage.
2.  **Create a Horizontal Pod Autoscaler (HPA) Object:**
    *   You define an HPA as a Kubernetes YAML manifest file.
    *   In the manifest, you specify:
        *   The **target Deployment** you want to scale.
        *   The **minimum and maximum number of replicas** (pods) you want to have.
        *   The **scaling metric and target**. The most common metric is CPU utilization.
3.  **Example HPA Manifest:**
    > \`\`\`yaml
    > apiVersion: autoscaling/v2
    > kind: HorizontalPodAutoscaler
    > metadata:
    >   name: my-model-api-hpa
    > spec:
    >   scaleTargetRef:
    >     apiVersion: apps/v1
    >     kind: Deployment
    >     name: my-model-api-deployment # The name of your API's Deployment
    >   minReplicas: 2   # Always keep at least 2 pods for high availability
    >   maxReplicas: 10  # Don't scale beyond 10 pods
    >   metrics:
    >   - type: Resource
    >     resource:
    >       name: cpu
    >       target:
    >         type: Utilization
    >         averageUtilization: 70 # Target 70% CPU utilization
    > \`\`\`
4.  **Apply the Manifest:**
    *   Use \`kubectl apply -f your-hpa-file.yaml\` to create the HPA in your cluster.
5.  **How It Works:**
    *   The HPA controller will now periodically check the average CPU utilization across all the pods in your deployment.
    *   If the average utilization rises above 70%, the HPA will automatically increase the number of replicas in the Deployment to bring the average back down.
    *   If the load decreases and the utilization falls below 70%, it will remove pods (but never going below \`minReplicas\`).

### 4. Resources and Tools
- **Kubernetes Horizontal Pod Autoscaler (HPA):** The core Kubernetes object for autoscaling.
- **\`kubectl\`:** The command-line tool for applying the HPA manifest.
- **Monitoring Tools (e.g., Prometheus/Grafana):** To observe your pod's CPU usage and decide on an appropriate target utilization percentage.

### 5. Next Steps and Progression
- **Custom Metrics:** You can configure the HPA to scale based on custom metrics, such as requests per second or queue depth, which can sometimes be more responsive than CPU usage. This requires a more advanced monitoring setup.
- **Cluster Autoscaling:** The HPA scales the number of *pods*. If you run out of room on your *nodes*, you also need a **Cluster Autoscaler** enabled. This will automatically add more VM nodes to your Kubernetes cluster when the HPA needs to schedule more pods.

### 6. Common Challenges and Solutions
- **Challenge:** "The HPA is not scaling up my deployment."
- **Solution:** Use \`kubectl describe hpa my-model-api-hpa\` to see the HPA's status and events. A common issue is that the metrics server is not running or the HPA can't fetch metrics from the pods. Another reason could be that the CPU utilization has not actually crossed your target threshold.
- **Challenge:** "The pods are scaling up, but the API is still slow."
- **Solution:** This might mean that your bottleneck is not CPU. It could be a downstream dependency (like a slow database) or that your model's code is not efficient and needs to be optimized.
`,
  },
  {
    id: 576,
    slug: 'versioning-api-endpoints-v1-v2-deployments',
    question: 'How to get started with versioning Dataiku API endpoints (e.g. v1, v2 deployments) in production.',
    answer: `
### 1. Introduction/Overview
When you update a production API, you can't just replace the old one. You need a strategy for versioning that allows you to roll out changes safely without breaking existing client applications. The Dataiku API Deployer supports this by allowing you to have multiple versions of an endpoint deployed simultaneously and managing the traffic between them.

### 2. Prerequisites
- **An existing, deployed API service** in the API Deployer.
- **A new version of your model** or Python function that you want to deploy.

### 3. Step-by-Step Instructions: The Versioning Workflow

1.  **Create a New Model/Code Version:**
    *   In your Dataiku design project, create the new version of your asset.
    *   For a model, you would retrain it and deploy it to your **Saved Model** object. This automatically creates a new, numbered version (e.g., v2).
2.  **Update the API Service Definition:**
    *   In the **API Designer**, open your API service.
    *   Edit your endpoint. You can now change the model version it points to from v1 to your new v2.
3.  **Deploy the New Version:**
    *   Click **Deploy**.
    *   The API Deployer will now package and deploy this new version of your API service.
4.  **Manage Traffic Between Versions:**
    *   Navigate to the API Deployer UI. You will now see both the old and new versions of your service deployed.
    *   You have several strategies for managing the rollout:
        *   **Blue-Green Deployment:** Deploy the new version (v2) but send 0% of traffic to it. You can test it internally. When you are confident, you can instantly switch 100% of the traffic from v1 to v2. If there's a problem, you can instantly switch back.
        *   **Canary Release / Traffic Splitting:** Configure the endpoint to send a small percentage of live traffic (e.g., 5%) to the new v2, while the majority (95%) still goes to the stable v1. You can monitor the performance and error rate of v2 with a small subset of users before gradually increasing its traffic share.
5.  **Decommission the Old Version:** Once the new version is stable and receiving 100% of the traffic, you can safely undeploy the old version from the API Deployer to clean up your infrastructure.

### 4. Resources and Tools
- **Dataiku API Deployer:** The service for managing the lifecycle of your deployed API versions.
- **Saved Model Versioning:** The feature that automatically versions your models when you retrain them.
- **Traffic Splitting / Canary Release:** The deployment strategy for safely rolling out new versions.

### 5. Next Steps and Progression
- **Semantic Versioning in URL:** For major, breaking changes, you might choose to include the version in the URL path itself (e.g., \`/api/v1/predict\` and \`/api/v2/predict\`). This is done by creating a completely new endpoint in the API Designer for the new version. This allows clients to opt-in to the new version on their own schedule.

### 6. Common Challenges and Solutions
- **Challenge:** "I deployed a new version, and it broke the client application."
- **Solution:** You did not perform a safe rollout. You should have used a canary release to test the new version with a small amount of traffic first. Immediately roll back by reactivating the previous stable version in the API Deployer to restore service.
- **Challenge:** "How do I know if the new version is performing well?"
- **Solution:** The API Deployer's monitoring dashboards will show you the latency and error rates for each version separately. This allows you to directly compare their technical performance in a live environment.
`,
  },
  {
    id: 577,
    slug: 'integrating-apis-with-api-gateways',
    question: 'How to get started with integrating Dataiku APIs with API gateways (AWS API Gateway, Azure API Mgmt) for scaling.',
    answer: `
### 1. Introduction/Overview
An API Gateway is a management tool that sits in front of your backend API services. Integrating your Dataiku API with a gateway (like AWS API Gateway or Azure API Management) provides a centralized way to handle cross-cutting concerns like authentication, rate limiting, and request routing, adding an extra layer of security and control.

### 2. Prerequisites
- **A deployed Dataiku API endpoint** running on an API node. This endpoint should be accessible within your private network (VPC).
- **An API Gateway service** configured in your cloud provider.
- **Networking knowledge** to configure routing between the gateway and your Dataiku API node.

### 3. Step-by-Step Instructions
1.  **Deploy Your Dataiku API:** Deploy your model as a standard API service on a Dataiku API node. Make a note of its private IP address and port.
2.  **Configure the API Gateway:**
    *   In your cloud provider's console, create a new API in your API Gateway service.
3.  **Define a Route and Integration:**
    *   Create a new route (e.g., \`/predict/churn\`).
    *   Create an **integration** for this route. The integration tells the gateway where to send the request.
    *   Configure the integration to be a "private integration" that forwards the request to the **private IP address and port** of your Dataiku API node.
4.  **Configure Authentication at the Gateway:**
    *   You can now configure the gateway to handle authentication. For example, you can require all clients to present a specific API key to the *gateway*.
    *   If the key is valid, the gateway then forwards the request to the Dataiku API node. The connection between the gateway and Dataiku can be on a trusted private network, so the Dataiku endpoint itself might not need a separate authentication method.
5.  **Configure Rate Limiting and Throttling:**
    *   Use the gateway's features to set usage plans. You can define rules like "allow a maximum of 100 requests per second" for a specific client. The gateway will automatically reject requests that exceed this limit, protecting your backend Dataiku API from being overloaded.
6.  **Clients Call the Gateway URL:** Your client applications no longer call the Dataiku API node directly. They call the public URL of the API Gateway endpoint.

### 4. Resources and Tools
- **Your Cloud Provider's API Gateway Service (AWS API Gateway, etc.).**
- **Dataiku API Deployer:** For running the backend model service.
- **Private Networking (VPCs, VNETs):** To ensure secure communication between the gateway and Dataiku.

### 5. Next Steps and Progression
- **Request/Response Transformation:** API Gateways can modify requests and responses. You could use this to transform a client's request into the format your Dataiku model expects, or to reformat the model's JSON response before sending it back to the client.
- **Canary Releases:** Use the API Gateway's traffic splitting or canary release features to route a percentage of traffic to a new version of your Dataiku model for testing.

### 6. Common Challenges and Solutions
- **Challenge:** "The gateway is returning a 504 Gateway Timeout error."
- **Solution:** This means the API Gateway was able to receive the request, but it could not get a response from your backend Dataiku API node in time. This is usually a network connectivity issue. Check your VPC routing, security groups, and firewall rules to ensure the gateway can reach the private IP of the Dataiku node.
- **Challenge:** "Which authentication method should I use?"
- **Solution:** It depends on your security model. If the gateway handles authentication, the communication between the gateway and Dataiku might not need additional auth. However, for a "defense-in-depth" approach, you could have the gateway authenticate clients, and also have the gateway present a specific, trusted API key to the Dataiku backend.
`,
  },
  {
    id: 578,
    slug: 'documenting-generated-apis-with-openapi-swagger',
    question: 'How to get started with documenting Dataiku-generated APIs using OpenAPI/Swagger for clients.',
    answer: `
### 1. Introduction/Overview
When you create an API, you must provide clear documentation so that client application developers know how to call it. The industry standard for documenting REST APIs is the **OpenAPI Specification** (formerly known as Swagger). Dataiku automatically generates an OpenAPI spec for any API service you create, making documentation easy.

### 2. Prerequisites
- **An API service** created in the Dataiku API Designer.

### 3. Step-by-Step Instructions
1.  **Find the API Specification:**
    *   After you have deployed your API service to the **API Deployer**, navigate to the service's page in the API Deployer UI.
    *   You will find a section or a button labeled **API Spec** or **OpenAPI**.
2.  **Access the Specification:** You have two ways to use the spec:
    *   **View the Interactive UI (Swagger UI):** The API Deployer hosts a live, interactive Swagger UI for your service. This UI provides a readable list of all your endpoints, shows their expected input parameters and JSON format, and displays the schema of the expected response. You can even use this UI to make test calls to the live API.
    *   **Download the JSON/YAML file:** You can download the raw OpenAPI specification as a \`.json\` or \`.yaml\` file.
3.  **Share with Developers:**
    *   Provide the link to the interactive Swagger UI to your client application developers. This is often the only documentation they will need to successfully integrate with your API.
    *   Alternatively, you can give them the OpenAPI JSON file, which they can use to automatically generate client-side code in their preferred programming language using OpenAPI generator tools.

### 4. Resources and Tools
- **API Deployer:** Hosts the automatically generated documentation.
- **OpenAPI Specification (Swagger):** The industry standard for defining REST APIs.
- **Swagger UI:** The interactive documentation tool.

### 5. Next Steps and Progression
- **Add Descriptions:** The quality of the generated documentation depends on you. In the **API Designer** in your project, add clear **descriptions** to your service, endpoints, and parameters. These descriptions will automatically appear in the generated OpenAPI documentation.
- **Custom Documentation:** You can import the downloaded OpenAPI JSON file into other documentation tools (like Postman or ReadMe.com) to create more elaborate, customized API portals.

### 6. Common Challenges and Solutions
- **Challenge:** The documentation is missing details about what the input fields mean.
- **Solution:** You need to add this information yourself. In the API Designer, when you are configuring your endpoint, you can add descriptions for each of the input parameters. This is essential for good documentation.
- **Challenge:** Our client developers need a client library in Java.
- **Solution:** They can use a tool like the **OpenAPI Generator**. They provide your API's OpenAPI JSON file to this tool, and it will automatically generate a client-side SDK in Java (or dozens of other languages), complete with all the necessary classes and methods for calling your API.
`,
  },
  {
    id: 579,
    slug: 'gathering-usage-metrics-latency-error-rate',
    question: 'How to get started with gathering usage metrics (latency, error rate) for Dataiku APIs to improve reliability.',
    answer: `
### 1. Introduction/Overview
To ensure your deployed API is reliable and performant, you must monitor its key usage metrics. The Dataiku **API Deployer** provides built-in monitoring dashboards that automatically track the most important metrics, such as latency (how fast the API is) and error rate (how often it fails).

### 2. Prerequisites
- **An API service** deployed and running on the API Deployer.
- **Live traffic:** The API must be receiving prediction requests to generate metrics.

### 3. Step-by-Step Instructions
1.  **Navigate to the API Deployer:** Open the API Deployer UI, which is separate from the main Dataiku design instance.
2.  **Select Your Deployed Service:** Find and click on the API service you want to monitor.
3.  **Go to the Monitoring Tab:** Navigate to the **Monitoring** tab for your service.
4.  **Analyze the Built-in Dashboards:** The monitoring page provides several key charts and metrics out-of-the-box:
    *   **Requests:** A chart showing the number of requests over time (throughput). This helps you understand your traffic patterns.
    *   **Latency:** A chart showing the average and percentile (e.g., p95, p99) response times. This tells you how fast your API is for your users.
    *   **Errors:** A chart showing the number of requests that resulted in an error (e.g., an HTTP 500 server error). This is a critical reliability metric.
5.  **Filter and Drill Down:**
    *   You can filter the view by a specific time range.
    *   If you have multiple versions of a model deployed (e.g., for an A/B test), you can often view the metrics for each version separately to compare their performance.
6.  **Use Metrics to Drive Improvements:**
    *   **High Latency?** This may indicate that your model is too complex or the API node needs more CPU/memory resources.
    *   **High Error Rate?** You need to investigate the API service logs to find the root cause of the errors and deploy a fix.

### 4. Resources and Tools
- **API Deployer Monitoring Tab:** Your primary source for built-in usage metrics.
- **API Service Logs:** Provide detailed error messages for failed requests.

### 5. Next Steps and Progression
- **External Monitoring:** For more advanced monitoring and alerting, you can export these metrics from Dataiku to a dedicated monitoring system like **Prometheus** and build customized dashboards in **Grafana**.
- **Alerting:** In your external monitoring system, you can set up alerts based on these metrics. For example: "If the p99 latency exceeds 500ms for more than 5 minutes, send an alert to the on-call engineer."
- **Service Level Objectives (SLOs):** Define formal SLOs for your API (e.g., "99.9% of requests will have a latency under 200ms"). Use your gathered metrics to track your performance against these objectives.

### 6. Common Challenges and Solutions
- **Challenge:** The monitoring dashboard is not showing any data.
- **Solution:** This means your API is not receiving any traffic. Use a tool like \`curl\` or Postman to send a test request to the endpoint to ensure it's live and accessible.
- **Challenge:** There is a spike in errors at a certain time.
- **Solution:** Use the time filter on the monitoring dashboard to zoom in on the time of the spike. Then, go to the API service logs and look at the logs from that specific time period to find the error messages that correspond to the failed requests.
`,
  },
  {
    id: 580,
    slug: 'monitoring-job-resource-usage-cpu-memory',
    question: 'How to get started with monitoring Dataiku job resource usage (CPU, memory) to identify performance bottlenecks.',
    answer: `
### 1. Introduction/Overview
When a job is slow, the cause is often a resource bottleneck—either CPU or memory. Monitoring the resource usage of your jobs is key to identifying these bottlenecks and making informed decisions about how to optimize your pipelines and infrastructure.

### 2. Prerequisites
- **A Dataiku job** that you want to monitor.
- **Access to monitoring tools.** This could be as simple as command-line tools on the server, or a sophisticated platform like Prometheus and Grafana.

### 3. Step-by-Step Instructions: Where to Look

The tool you use depends on where your job is running.

#### 1. For In-Memory Jobs (on the main Dataiku server)
- **What to do:** An administrator needs to monitor the Dataiku server itself while the job is running.
- **Tools:**
    - **Command Line:** Use tools like \`top\`, \`htop\`, or \`ps\` on the server to see the CPU and memory usage of the main Dataiku Java process and any Python processes it spawns.
    - **Infrastructure Monitoring:** Use your standard server monitoring tool (e.g., Datadog, Nagios) to view CPU and memory charts for the Dataiku server.
- **What to look for:** If you see the server's CPU hitting 100% or its memory usage climbing until the job fails, you've found a bottleneck.

#### 2. For Containerized Jobs (on Kubernetes)
- **What to do:** Use Kubernetes' built-in monitoring tools.
- **Tools:**
    - **\`kubectl top pod ...\`:** This command-line tool will show you the current CPU and memory usage of a specific pod running your job.
    - **Prometheus/Grafana:** If you have a monitoring stack set up for your cluster, you can view detailed time-series graphs of the resource consumption for your job's pod.
- **What to look for:** If a pod's memory usage hits its defined limit, Kubernetes will kill it (an "OOMKilled" error). If its CPU usage is constantly at its limit, it's CPU-bound and will be slow.

#### 3. For Pushed-down Jobs (on a Database/Spark)
- **What to do:** You need to use the native monitoring tools for that external engine.
- **Tools:**
    - **For Databases (Snowflake, BigQuery, etc.):** Use the database's own query history or system monitoring views. These will show you the CPU time, data scanned, and memory used by the query that Dataiku submitted.
    - **For Spark:** Use the **Spark UI**. This provides extremely detailed information on the resource usage of every executor and task in your Spark application.

### 4. Resources and Tools
- **The Job Inspector in Dataiku:** To see the duration of each recipe.
- **Your infrastructure's native monitoring tools:** This is where you will see the actual resource consumption.

### 5. Next Steps and Progression
- **Optimization:** Once you've identified the bottleneck, you can take action.
    - **Memory Bottleneck?** Refactor the job to be more memory-efficient or increase the memory allocated to it (e.g., in the container configuration).
    - **CPU Bottleneck?** Optimize the code or provide more CPU resources.
    - **The Best Optimization:** If the bottleneck is an in-memory job, the best solution is often to refactor it to **push down the computation** to a more powerful engine like a database or Spark cluster.

### 6. Common Challenges and Solutions
- **Challenge:** "I don't have access to the server or the database monitoring tools."
- **Solution:** You need to collaborate with your platform administrators or DBAs. Explain which job you are running and ask them to monitor its resource consumption on the backend system.
`,
  },
  {
    id: 581,
    slug: 'sizing-tuning-cluster-nodes',
    question: 'How to get started with sizing and tuning Dataiku cluster nodes to balance cost and performance.',
    answer: `
### 1. Introduction/Overview
Sizing and tuning the nodes in your Dataiku cluster is a critical administrative task for balancing performance, stability, and cost. "Sizing" refers to choosing the right instance types (CPU/memory), and "tuning" involves configuring the software to use those resources effectively. This is an iterative process based on monitoring your specific workloads.

### 2. Prerequisites
- **A multi-node Dataiku deployment** (e.g., on-premise or in the cloud).
- **Administrator access** to the Dataiku servers and, if applicable, your cloud provider console.
- **Monitoring tools** to observe resource usage.

### 3. Step-by-Step Instructions: A Sizing and Tuning Strategy

1.  **Understand Your Node Types:** A typical production Dataiku deployment has different types of nodes with different resource needs.
    *   **Design Node:** Hosts the main web interface. Needs good memory and moderate CPU.
    *   **Automation Node:** Runs scenarios. Needs will vary based on the jobs being run.
    *   **API Nodes:** Serve real-time models. Need low-latency CPU and memory based on model complexity and traffic.
    *   **Execution Nodes (Kubernetes):** The worker nodes where containerized jobs run. Need a balance of CPU and memory.
2.  **Start with Dataiku's Recommendations:**
    *   The Dataiku installation documentation provides sizing recommendations for different scales of usage.
    *   Use these recommendations as your starting point when first provisioning your infrastructure.
3.  **Monitor Your Workloads:**
    *   Once the platform is in use, you must **monitor** the actual resource utilization of each node type.
    *   Use your infrastructure monitoring tools (e.g., AWS CloudWatch, Grafana) to track CPU Utilization, Memory Usage, and I/O over time.
4.  **Tune and Iterate:** Based on your monitoring data, adjust your sizing.
    *   **Is a node consistently at 90% CPU?** It's undersized. You need to choose a larger instance type with more CPU cores.
    *   **Is a node consistently using only 10% of its memory?** It's oversized. You can choose a smaller instance type to save costs.
    *   **Are jobs failing with Out Of Memory errors?** You need to increase the memory on your execution nodes or for a specific container configuration.
5.  **Leverage Autoscaling (for Cloud Deployments):**
    *   For your execution and API nodes (if on Kubernetes), use **autoscaling groups** or **Horizontal Pod Autoscalers**.
    *   This allows the cluster to automatically add or remove nodes based on the current workload, which is the most cost-effective way to manage resources.

### 4. Resources and Tools
- **Dataiku's Sizing Guidelines:** Your starting point.
- **Cloud Provider Monitoring Tools (CloudWatch, etc.).**
- **Kubernetes Autoscalers (HPA, Cluster Autoscaler).**

### 5. Next Steps and Progression
- **Load Testing:** Before deploying a new, critical API, use a load testing tool like JMeter or Locust to simulate high traffic. Monitor the API nodes during the test to see how they perform and to fine-tune your autoscaling rules.
- **Cost Analysis:** Use your cloud provider's cost management tools to analyze the cost of your Dataiku infrastructure. Use this data to identify opportunities for optimization (e.g., moving stateless workloads to cheaper spot instances).

### 6. Common Challenges and Solutions
- **Challenge:** "How do I know the right size before we even start?"
- **Solution:** You can't know it perfectly. Sizing is an educated guess to start, followed by an iterative process of monitoring and adjusting. It's often better to start slightly oversized and then scale down once you have real usage data.
- **Challenge:** "Our costs are too high."
- **Solution:** This is a sign that your nodes are oversized or you are not using autoscaling effectively. Analyze your monitoring data to find which nodes are idle or underutilized and shrink them. Ensure your autoscaling rules are configured to scale down aggressively during idle periods.
`,
  },
  {
    id: 582,
    slug: 'using-kubernetes-to-horizontally-scale-services',
    question: 'How to get started with using Kubernetes to horizontally scale Dataiku services under load.',
    answer: `
### 1. Introduction/Overview
Horizontal scaling (scaling out) means adding more machines or containers to handle increased load, as opposed to vertical scaling (scaling up), which means making a single machine more powerful. Kubernetes is designed for horizontal scaling, making it the ideal platform for running scalable, resilient Dataiku services like API nodes and job execution engines.

### 2. Prerequisites
- **A Dataiku deployment on a Kubernetes cluster.**
- **An understanding of core Kubernetes concepts:** Pods, Deployments, Services, and Horizontal Pod Autoscalers (HPA).

### 3. Step-by-Step Instructions

#### Scaling Real-time APIs
1.  **The Deployment Object:** When you deploy a model to the API Deployer on a K8s infrastructure, it creates a Kubernetes **Deployment**. This Deployment's job is to ensure that a specified number of identical **pods** (containers running your model) are always running.
2.  **Manual Scaling:** The simplest way to scale is to manually change the number of desired pods.
    > \`kubectl scale deployment/my-model-api --replicas=5\`
    *   Kubernetes will now create new pods until there are 5 running, and the Service will automatically start load balancing traffic across all of them.
3.  **Automatic Scaling (The Best Practice):**
    *   Create a **Horizontal Pod Autoscaler (HPA)** object for your Deployment.
    *   The HPA will watch the CPU or memory usage of your pods.
    *   If the average CPU exceeds a target you define (e.g., 70%), the HPA will automatically scale the Deployment by increasing the replica count. When the load decreases, it will scale back down.

#### Scaling Batch Jobs (Recipes)
1.  **Containerized Execution:** You must be using containerized execution for your recipes, targeting your Kubernetes cluster.
2.  **How it Works:** When multiple users run containerized jobs at the same time, Dataiku submits each one as a new pod to Kubernetes.
3.  **Cluster Autoscaling:** If there are not enough resources on the existing nodes to run all the new pods, the **Cluster Autoscaler** (a component of your managed K8s service) will kick in. It will automatically provision and add new worker nodes to the cluster to handle the load. When the jobs are finished and the nodes are no longer needed, the Cluster Autoscaler will terminate them to save costs.

### 4. Resources and Tools
- **Kubernetes Deployments:** The object that manages your application's pods.
- **Horizontal Pod Autoscaler (HPA):** For autoscaling the number of pods.
- **Cluster Autoscaler:** For autoscaling the number of underlying VMs (nodes).

### 5. Next Steps and Progression
- **Monitoring:** Use Prometheus and Grafana to monitor your pod and node resources to fine-tune your autoscaling rules.
- **Node Pools:** Configure different node pools in your cluster (e.g., some with GPUs) and use Kubernetes taints and tolerations to ensure that specific Dataiku jobs run on the appropriate type of hardware.

### 6. Common Challenges and Solutions
- **Challenge:** "My pods are scaling up, but the service is still slow."
- **Solution:** Horizontal scaling only helps if your application is stateless and can handle requests in parallel. If the bottleneck is an external dependency, like a slow database that all your pods are hitting, adding more pods won't solve the problem. You need to fix the downstream bottleneck.
- **Challenge:** "My cluster is not scaling up to add more nodes."
- **Solution:** Check the configuration of your Cluster Autoscaler. Ensure it's enabled and correctly configured for your node groups. Also, check your cloud provider account quotas to make sure you haven't hit a limit on the number of VMs you are allowed to create.
`,
  },
  {
    id: 583,
    slug: 'setting-job-quotas-priorities',
    question: 'How to get started with setting Dataiku job quotas and priorities to control resource consumption.',
    answer: `
### 1. Introduction/Overview
In a shared, multi-tenant Dataiku environment, you need mechanisms to ensure that a single user or a single large job doesn't consume all the available compute resources, starving other users. This is achieved by setting quotas and priorities, typically at the infrastructure level (e.g., in Kubernetes or a database).

### 2. Prerequisites
- **A shared Dataiku instance** used by multiple teams or projects.
- **Administrator access** to the underlying compute infrastructure (e.g., Kubernetes, a database).

### 3. Step-by-Step Instructions: Methods for Control

#### Method 1: Kubernetes Resource Quotas
- **When to Use:** When your jobs are running as containers on a shared Kubernetes cluster.
- **How it Works:**
    1.  Create separate **namespaces** in Kubernetes for different teams or project types (e.g., \`team-finance\`, \`team-marketing\`).
    2.  For each namespace, create a **ResourceQuota** object.
    3.  In the ResourceQuota, you can define hard limits on the total amount of CPU and memory that all pods in that namespace can consume *in aggregate*.
    4.  You can also set limits on the number of pods or other objects that can be created.
- **Effect:** The Finance team can run as many jobs as they want, but collectively they cannot exceed their allocated CPU/memory quota, preventing them from impacting the Marketing team.

#### Method 2: Database Workload Management
- **When to Use:** When your jobs are pushed down to a shared data warehouse like Snowflake or Redshift.
- **How it Works:**
    1.  Create different **users** or **roles** in the database for different Dataiku user groups.
    2.  Use the database's built-in **Workload Management (WLM)** features.
    3.  You can assign different priorities to different user roles, ensuring that queries from a high-priority user (like a CEO dashboard) will get resources before a large, low-priority ETL job.
    4.  In Snowflake, you can assign different roles to different virtual warehouses of varying sizes, effectively giving them different resource quotas.

#### Method 3: Dataiku-level Concurrency Limits
- **What it is:** A simpler, built-in Dataiku control.
- **How it Works (Admin Task):**
    1.  In **Administration > Settings > Flow build**, you can set a global limit on the **maximum number of concurrent activities** (recipes running at the same time).
- **Effect:** This provides a basic, instance-wide form of priority management by creating a queue. It doesn't provide fine-grained control per user or project, but it can prevent the server from being completely overloaded.

### 4. Resources and Tools
- **Kubernetes Namespaces and ResourceQuotas.**
- **Your Data Warehouse's Workload Management features.**
- **Dataiku's global concurrency settings.**

### 5. Next Steps and Progression
- **Showback/Chargeback:** Once you have quotas and are tracking resource usage (e.g., via Kubernetes monitoring or Snowflake query history), you can implement a showback or chargeback model, where you report on (or even bill) each team for their share of the infrastructure costs.

### 6. Common Challenges and Solutions
- **Challenge:** "A user's job is stuck in 'pending' in Kubernetes."
- **Solution:** This could be because their team's namespace has hit its ResourceQuota limit. They will have to wait for other jobs in their namespace to finish before theirs can be scheduled.
- **Challenge:** "How do we decide on the right quotas?"
- **Solution:** This is a business and resource planning decision. It requires understanding each team's needs and balancing them against the total available capacity and budget. Start with a reasonable allocation and adjust it over time based on actual usage and business priorities.
`,
  },
  {
    id: 584,
    slug: 'tracking-cloud-costs-of-resources',
    question: 'How to get started with tracking cloud costs of Dataiku-related resources (EC2 instances, S3 storage) over time.',
    answer: `
### 1. Introduction/Overview
When running Dataiku in the cloud, understanding and tracking your costs is essential for managing budgets and demonstrating ROI. All major cloud providers offer powerful cost management tools that, when combined with a disciplined tagging strategy, can give you a detailed view of your Dataiku-related spending.

### 2. Prerequisites
- **Dataiku deployed on a cloud provider** (AWS, Azure, or GCP).
- **Access to your cloud provider's billing and cost management console.**

### 3. Step-by-Step Instructions

1.  **Implement a Tagging Strategy (Crucial First Step):**
    *   **What it is:** Tags are key-value labels that you can attach to every resource you create in the cloud.
    *   **Your Strategy:** Define a standard set of tags that you will apply to all resources associated with your Dataiku deployment.
        *   \`service: dataiku\`
        *   \`environment: prod\` (or \`dev\`, \`qa\`)
        *   \`owner: data-science-team\`
    *   Apply these tags to your EC2 instances, S3 buckets, databases, Kubernetes clusters, etc.
2.  **Use the Cloud Cost Management Tool:**
    *   Navigate to your cloud provider's cost management service:
        *   **AWS:** Cost Explorer
        *   **Azure:** Cost Management + Billing
        *   **GCP:** Cloud Billing Reports
3.  **Filter by Tags:**
    *   These tools allow you to filter your spending based on the tags you applied.
    *   Create a report that filters for all resources with the tag \`service: dataiku\`.
    *   This will now show you a dashboard with the total cost of your Dataiku platform over time.
4.  **Analyze the Costs:**
    *   You can group the costs by service (to see how much you're spending on compute vs. storage vs. database) or by other tags (to see the cost of your prod vs. dev environments).
    *   Look at the cost trends over time. Is your spending increasing? This might be expected as usage grows, but it's important to track.

### 4. Resources and Tools
- **Tagging:** The fundamental mechanism for cost allocation.
- **Cloud Provider Cost Management Tools:** (e.g., AWS Cost Explorer).

### 5. Next Steps and Progression
- **Create Budgets and Alerts:**
    *   In your cloud provider's billing console, you can create a **budget** for your Dataiku service (based on your tags).
    *   You can then configure **alerts** to be sent to you automatically if your spending is forecasted to exceed your budget. This is essential for preventing unexpected cost overruns.
- **Granular Cost Allocation:** For even more detail, you can use a more granular tagging strategy. For example, have a Dataiku scenario that, when it spins up a temporary cluster for a specific project's job, it applies a tag for that project's key (e.g., \`project: churn_model\`). This allows you to track the compute cost of individual projects.

### 6. Common Challenges and Solutions
- **Challenge:** "I don't see all my costs; the report seems incomplete."
- **Solution:** This means your tagging is inconsistent. You have likely missed applying the standard tags to some of your resources. You need to perform an audit of all your cloud resources and ensure everything related to Dataiku is tagged correctly. Many organizations use automated scripts or policies to enforce tagging.
- **Challenge:** "Our costs are higher than expected."
- **Solution:** Use the cost analysis tool to drill down and see which specific service is responsible for the high cost. Is it an oversized, idle database? Is it a Kubernetes cluster that isn't scaling down properly? The cost report will point you to where you need to optimize.
`,
  },
  {
    id: 585,
    slug: 'tagging-cloud-resources-by-project-for-cost-allocation',
    question: 'How to get started with tagging cloud resources by Dataiku project for granular cost allocation.',
    answer: `
### 1. Introduction/Overview
For large, multi-team Dataiku deployments, you often need to allocate infrastructure costs back to the individual projects or business units that consumed the resources. This requires a granular cost allocation strategy, which is achieved by dynamically **tagging** cloud resources with the Dataiku project key that is using them.

### 2. Prerequisites
- **Dataiku running on the cloud,** typically using containerized execution on Kubernetes for dynamic workloads.
- **A mechanism for dynamic tagging.** This is an advanced setup that usually requires custom scripting.

### 3. Step-by-Step Instructions: A Dynamic Tagging Workflow

This pattern is most common for containerized jobs that run on dynamically created resources.

1.  **Create a Wrapper Script or Plugin:**
    *   You need a process that sits between Dataiku and the compute engine. This could be a custom plugin in Dataiku or an external script that is called by a Dataiku scenario.
2.  **Extract the Project Key:**
    *   When a job is run, the script can use the Dataiku API to get the context of the job, including the **project key** of the project it belongs to.
3.  **Provision the Resources with Tags:**
    *   Instead of using a static compute cluster, the script will programmatically provision the resources needed for the job. For example, it could use the AWS SDK (Boto3) to create a new, temporary EMR cluster.
    *   When creating this cluster, the script will apply a **tag** to all its resources with the project key it extracted in the previous step.
    > \`Tag: { "Key": "dss_project", "Value": "FINANCE_REPORTING" }\`
4.  **Run the Job:** The script then submits the Dataiku job to this new, dedicated cluster.
5.  **Terminate Resources:** After the job is complete, the script terminates the temporary cluster.
6.  **Analyze Costs:** In your cloud provider's cost management tool (e.g., AWS Cost Explorer), you can now **filter and group your spending by the \`dss_project\` tag**. This will show you exactly how much compute cost was consumed by the "FINANCE_REPORTING" project, allowing for direct cost allocation.

### 4. Resources and Tools
- **Cloud Provider SDKs (e.g., Boto3):** For programmatically creating and tagging resources.
- **Dataiku API:** For getting the project context of a running job.
- **Cloud Cost Management Tools:** For filtering and reporting on the tags.

### 5. Next Steps and Progression
- **Showback Dashboards:** Create a dashboard (either in Dataiku or your BI tool) that uses the cost data to create a "showback" report, detailing the infrastructure costs incurred by each project or team.

### 6. Common Challenges and Solutions
- **Challenge:** "This is very complex to set up."
- **Solution:** It is. This is a very advanced MLOps and FinOps pattern. It should only be implemented if you have a strong business requirement for granular cost chargeback. For many organizations, a simpler model of tagging resources by environment (\`prod\`, \`dev\`) is sufficient.
- **Challenge:** "How do I tag the storage costs?"
- **Solution:** This is more difficult, as storage is often shared. You could implement a process where each project writes its data to a specific "prefix" or folder within a central S3 bucket. You can then use storage analytics tools to get the size of each prefix and allocate the total storage cost proportionally.
`,
  },
  {
    id: 586,
    slug: 'using-spot-preemptible-instances-for-cost-reduction',
    question: 'How to get started with using spot/preemptible instances or scheduling off-peak runs to reduce Dataiku compute costs.',
    answer: `
### 1. Introduction/Overview
A significant portion of cloud costs comes from compute instances (VMs). There are two powerful strategies for reducing these costs: using cheaper, interruptible **spot/preemptible instances** for non-critical workloads, and **scheduling** large jobs to run during off-peak hours when compute may be cheaper or more available.

### 2. Prerequisites
- **Dataiku running on the cloud.**
- **An understanding of which of your workloads are critical versus non-critical.**

### 3. Step-by-Step Instructions

#### Strategy 1: Using Spot/Preemptible Instances
1.  **What they are:** Spot (AWS) or Preemptible (GCP) instances are a cloud provider's spare compute capacity, which they sell at a massive discount (up to 90% off). The catch is that the provider can reclaim this capacity at any time with very little warning.
2.  **When to use them:** They are perfect for workloads that are **fault-tolerant** and **not time-critical**. This includes:
    *   Non-urgent development and testing jobs.
    *   Large data exploration tasks.
    *   Certain types of model training that can be checkpointed and resumed.
3.  **How to use with Dataiku:**
    *   If you are using Kubernetes for job execution, you can create a dedicated **node pool** that is configured to use only spot instances.
    *   You can then use Kubernetes taints and tolerations to direct your non-critical Dataiku jobs to run on this spot instance node pool.
4.  **Do NOT use for:** Production API nodes or critical, time-sensitive data pipelines, as the termination of the instances could cause failures.

#### Strategy 2: Scheduling Off-Peak Runs
1.  **What it is:** A simple but effective strategy of running your most resource-intensive jobs at night or on the weekend when there is less contention for shared resources.
2.  **How to implement:**
    *   Identify your largest, longest-running Dataiku pipelines.
    *   Create a **Scenario** to automate these pipelines.
    *   In the scenario's **Settings > Triggers**, add a **Time-based** trigger.
    *   Schedule the trigger to run during off-peak hours (e.g., every day at 2 AM).
3.  **Benefits:**
    *   Reduces resource contention with interactive users during business hours.
    *   Can sometimes result in lower costs if your cloud provider has variable pricing or if you can leverage autoscaling to shrink your clusters during the day.

### 4. Resources and Tools
- **Cloud Provider Instance Types:** Understanding the difference between on-demand, reserved, and spot instances.
- **Kubernetes Node Pools:** A way to segregate different types of hardware in your cluster.
- **Dataiku Scenarios and Triggers:** The tool for off-peak scheduling.

### 5. Next Steps and Progression
- **Mixed-Instance Clusters:** You can configure a Spark or Kubernetes cluster to use a mix of instance types: a few stable on-demand instances for critical services, and a large number of spot instances for the worker nodes to provide cheap, scalable compute power.

### 6. Common Challenges and Solutions
- **Challenge:** "My job running on spot instances failed because the node was terminated."
- **Solution:** This is the expected behavior and risk of using spot instances. You must design your job to be fault-tolerant. For example, Spark is naturally resilient to losing a worker node, as it can recompute the lost data partitions on other nodes. Ensure your job is not time-critical if using spot instances.
`,
  },
  {
    id: 587,
    slug: 'archiving-deleting-old-artifacts-for-storage-fees',
    question: 'How to get started with archiving or deleting old Dataiku artifacts (models, datasets) to save storage fees.',
    answer: `
### 1. Introduction/Overview
Over time, a Dataiku instance can accumulate a large number of old datasets, model versions, and project exports that consume valuable and costly storage. Implementing a regular cleanup and archiving process is a crucial housekeeping task for managing storage costs and keeping your instance tidy.

### 2. Prerequisites
- **A Dataiku instance that has been in use for some time.**
- **A defined data retention policy:** You need to know how long different types of data need to be kept.
- **A cheap, long-term archive storage location** (e.g., AWS S3 Glacier, Azure Archive Storage).

### 3. Step-by-Step Instructions: The Cleanup Process

1.  **Identify Obsolete Artifacts:**
    *   **Old Datasets:** Look for intermediate datasets in flows that are no longer being rebuilt or used. The "Last modified" date is a good indicator.
    *   **Old Model Versions:** In a "Saved Model", you might have dozens of old, inactive versions from previous retraining runs.
    *   **Old Project Exports/Bundles:** Check the server for old project \`.zip\` exports that are no longer needed.
2.  **Decide: Archive or Delete?**
    *   **Archive:** If you need to keep the artifact for compliance or potential future use, but don't need it for active operations.
    *   **Delete:** If the artifact is truly temporary and has no further value.
3.  **Implement the Process:**

    *   **For Datasets:**
        1.  **Archive:** Use an **Export** recipe to save the dataset to your long-term archive storage location.
        2.  **Delete:** Once archived, use the **Delete** action in the Flow to remove the dataset and free up its active storage.
    *   **For Model Versions:**
        1.  In the "Saved Model" view, you can select and delete old, inactive versions.
    *   **For Partitions:**
        1.  On a partitioned dataset, you can use a Python recipe with the Dataiku API to list all partitions and delete any that are older than your retention policy (e.g., delete partitions older than 2 years).

4.  **Automate with a Scenario:**
    *   Create a dedicated "Cleanup" scenario.
    *   In this scenario, have a **Python step** that uses the Dataiku API to programmatically find and delete old artifacts based on your rules.
    *   Schedule this scenario to run periodically (e.g., monthly).

### 4. Resources and Tools
- **Dataiku API:** Essential for automating the identification and deletion of old artifacts.
- **Export Recipe:** For archiving data before deletion.
- **A defined retention policy.**

### 5. Next Steps and Progression
- **Storage Lifecycle Policies:** Use your cloud provider's storage lifecycle policies. For example, you can set a rule on an S3 bucket to automatically move any object that hasn't been accessed in 90 days to a cheaper storage class like Glacier.

### 6. Common Challenges and Solutions
- **Challenge:** "I accidentally deleted something I needed."
- **Solution:** This is the primary risk. **Never delete anything without being certain it's no longer needed.** Before deleting a dataset, always use the "View downstream dependencies" feature to check if it's being used. Have a backup and restore plan in place for your Dataiku instance.
- **Challenge:** "The cleanup script is complex to write."
- **Solution:** Start simple. Your first script could just identify and report on potential candidates for deletion, writing the list to a dataset. A human can then review this list and perform the deletion manually. You can add the automatic deletion logic later once you are confident in the script.
`,
  },
  {
    id: 588,
    slug: 'analyzing-cluster-usage-logs-for-redundant-workloads',
    question: 'How to get started with analyzing Dataiku cluster usage logs to spot unnecessary or redundant workloads.',
    answer: `
### 1. Introduction/Overview
A common source of wasted compute resources and unnecessary cost is redundant work—jobs that are running more often than needed or are rebuilding the same data multiple times. Analyzing Dataiku's job logs and monitoring your cluster's usage patterns can help you spot and eliminate this inefficiency.

### 2. Prerequisites
- **A shared Dataiku instance** with multiple projects and scenarios.
- **Access to the Dataiku Jobs monitoring page** and/or your cluster's monitoring tools (e.g., Spark UI, YARN ResourceManager).

### 3. Step-by-Step Instructions
1.  **Review the Job Monitoring Page:**
    *   In Dataiku, go to **Administration > Monitoring > Jobs**.
    *   This page shows a list of all jobs that have run on the instance.
2.  **Look for Redundant Builds:**
    *   Filter the job list for "Build" jobs on a specific dataset.
    *   Do you see the same dataset being rebuilt by multiple different scenarios at different times? This is a red flag. It might mean two different teams have independently built pipelines to create the same data.
    *   **Solution:** Consolidate the work. Create a single, authoritative pipeline in a shared project that builds this dataset once. Have all other downstream processes consume this "golden" dataset instead of rebuilding it themselves.
3.  **Look for Inefficient Scheduling:**
    *   Filter the jobs by trigger type and name.
    *   Is a very large, expensive job scheduled to run every hour when the business users only look at the report once a day?
    *   **Solution:** Work with the business owner to change the scenario's trigger to run less frequently, matching the actual business need.
4.  **Analyze Cluster Logs (for Spark/Hadoop):**
    *   Use the YARN or Spark UI to look at the applications that are running.
    *   Are there jobs that are consistently reading a huge amount of data just to filter it down to a tiny subset?
    *   **Solution:** The upstream data source should be **partitioned**. This would allow the job to read only the specific partition it needs, avoiding the wasteful full table scan.

### 4. Resources and Tools
- **Dataiku's Job Monitoring Page:** Your primary tool for seeing what is running and when.
- **Your Cluster's Native UI (Spark UI, YARN UI):** For deeper analysis of compute jobs.

### 5. Next Steps and Progression
- **Create a "Cost Optimization" Dashboard:** Create a Dataiku project that uses the API to fetch the job history, analyze it for potential redundancies, and present a dashboard highlighting the top candidates for optimization.
- **Implement Showback:** Create a process to show teams the compute resources their jobs are consuming. When they see the cost, they are often more motivated to find and eliminate redundant work.

### 6. Common Challenges and Solutions
- **Challenge:** "I see two teams building the same dataset, but they refuse to use a shared version."
- **Solution:** This is an organizational and governance challenge. A "Center of Excellence" or a data governance council may need to step in to establish the principle of a "single source of truth". The goal is to create one certified, trusted dataset that everyone agrees to use.
- **Challenge:** "I don't know what all these jobs are."
- **Solution:** This points to a lack of documentation. Every project and scenario should have a clear owner and a description explaining its purpose. Without this, it's very difficult to manage a shared instance effectively.
`,
  },
  {
    id: 589,
    slug: 'using-cloud-budget-alerts-for-monitoring-spending',
    question: 'How to get started with using cloud budget alerts (AWS Budgets, Azure Cost Alerts) to monitor Dataiku spending.',
    answer: `
### 1. Introduction/Overview
When running Dataiku and its associated compute infrastructure in the cloud, costs can escalate quickly if not monitored. Cloud budget alerts are a simple but powerful FinOps tool. They act as a safety net, automatically notifying you when your spending exceeds a predefined threshold, which helps prevent unexpected bill shocks.

### 2. Prerequisites
- **Dataiku running on a cloud provider** (AWS, Azure, GCP).
- **A disciplined tagging strategy:** All your Dataiku-related resources must be consistently tagged.
- **Access to your cloud provider's billing and cost management console.**

### 3. Step-by-Step Instructions

#### For AWS (using AWS Budgets)
1.  **Navigate to AWS Budgets:** In the AWS Management Console, go to the "Billing" service and find "Budgets".
2.  **Create a Budget:**
    *   Click **Create budget**.
    *   Choose a **Cost Budget**.
    *   **Set your budget details:**
        *   Give it a name (e.g., \`dataiku-prod-monthly-budget\`).
        *   Set the period (e.g., Monthly).
        *   Enter the budgeted amount (e.g., $5000).
    *   **Scope the budget using tags:** In the "Filtering" section, choose **Tag** and select the tag key and value you use for your Dataiku resources (e.g., Key=\`service\`, Value=\`dataiku\`). This is the most important step.
3.  **Configure Alerts:**
    *   Add an **Alert threshold**. For example, "Alert me when actual spend reaches 80% of the budgeted amount."
    *   Enter the email addresses or SNS topic to send the notification to.
4.  **Create:** Create the budget. AWS will now monitor your spending against the budget and send an alert if the threshold is breached.

#### For Azure (using Budgets in Cost Management)
- The process is very similar. You go to **Cost Management + Billing > Budgets**, create a new budget, set the amount, and then use a **Filter** to scope the budget to the resource group or the specific tags associated with your Dataiku deployment. You then configure "Alert conditions" to send emails when a percentage of the budget is met.

### 4. Resources and Tools
- **Your Cloud Provider's Cost Management and Billing Console.**
- **A consistent tagging strategy.**

### 5. Next Steps and Progression
- **Multiple Budgets:** You can create multiple budgets for more granular tracking. For example, a budget for your dev environment and a separate, larger budget for your prod environment.
- **Actionable Alerts:** When you receive a budget alert, you must investigate. Use the cost analysis tools to see what caused the spending spike. Was it an inefficient query that ran for too long? Or did a user spin up a large, expensive cluster and forget to turn it off?

### 6. Common Challenges and Solutions
- **Challenge:** "The budget alert fired, but the amount seems wrong."
- **Solution:** This is almost always caused by an inconsistent tagging strategy. There is likely a resource that is part of your Dataiku deployment that you forgot to tag, so it's not being included in the budget's scope. You need to perform an audit of all your resources and ensure all of them are correctly tagged. Many organizations use automated scripts or policies to enforce tagging.
- **Challenge:** "We get alerts every month. What should we do?"
- **Solution:** If you are consistently exceeding your budget, it means either your budget is unrealistically low, or your platform is becoming more popular and using more resources (which can be a good thing!). You need to analyze the spending trend and either optimize your workloads to reduce costs or work with your finance department to get the budget increased to reflect the actual usage.
`,
  },
  {
    id: 590,
    slug: 'customizing-dashboards-visual-reports-for-ml-pipeline-kpis',
    question: 'How to get started with customizing Dataiku dashboards and visual reports for ML pipeline KPIs.',
    answer: `
### 1. Introduction/Overview
Monitoring the health and performance of your MLOps pipelines is essential. A dedicated Dataiku Dashboard can serve as a central "control tower," visualizing the Key Performance Indicators (KPIs) of your ML pipelines, such as model accuracy, data drift scores, and job runtimes.

### 2. Prerequisites
- **An automated ML pipeline** running as a Dataiku Scenario.
- **A process for generating the KPI data:** Your scenarios should be creating datasets that contain the metrics you want to track.

### 3. Step-by-Step Instructions
1.  **Create a Monitoring Project or Zone:**
    *   It's a good practice to have a dedicated project or a "Monitoring" Flow Zone whose job is to track the performance of your other pipelines.
2.  **Generate KPI Datasets:**
    *   Your production scenarios should output their results as datasets. For example:
        *   Your **model evaluation** step should output a dataset containing accuracy, AUC, F1-score, etc., for each run.
        *   Your **data drift** analysis step should output a dataset with the drift scores.
        *   You can use the Dataiku API to create a dataset of **scenario run times** and outcomes.
3.  **Build the Dashboard:**
    *   In your monitoring project, create a new **Dashboard**.
4.  **Create KPI Visualizations:**
    *   For each KPI, create a chart on its corresponding dataset and add it to the dashboard.
    *   **Model Performance Trend:** Create a **line chart** showing how your model's AUC or accuracy has changed over time (with each retraining run).
    *   **Data Drift History:** Create a line chart showing the data drift score over time.
    *   **Pipeline Health:** Create a **bar chart** showing the count of "SUCCESS" vs. "FAILED" scenario runs over the last 30 days.
    *   **Latest Runtimes:** Use a **table view** to show the duration of the last few scenario runs.
5.  **Add Context:** Use **Text** tiles to add headers and explanations for each section of your MLOps dashboard.

### 4. Resources and Tools
- **Dataiku Dashboards:** The visualization tool.
- **Dataiku Scenarios:** To generate the underlying KPI data.
- **The Charts tab** on datasets.

### 5. Next Steps and Progression
- **Alerting:** While the dashboard is for visualization, your scenarios should still have active **Reporters** to send immediate alerts when a critical KPI (like a failed job or a drop in model accuracy) crosses a threshold.
- **Share with Stakeholders:** Share this dashboard with the MLOps team, data scientists, and relevant product managers to provide a transparent, unified view of the health of your production ML systems.

### 6. Common Challenges and Solutions
- **Challenge:** "My KPI charts are not updating."
- **Solution:** You need to ensure your scenarios are correctly building the underlying KPI datasets and that the dashboard's caches are being refreshed. Your main monitoring scenario should have a final step to "Refresh dashboard caches."
- **Challenge:** "The dashboard is too cluttered."
- **Solution:** Focus on the most important KPIs. You might create separate dashboards for different concerns: one for model performance, another for pipeline operational health, and a third for infrastructure costs.
`,
  },
  {
    id: 591,
    slug: 'developing-custom-plugin-for-environment-provisioning',
    question: 'How to get started with developing a custom Dataiku plugin to automate environment provisioning.',
    answer: `
### 1. Introduction/Overview
This is a very advanced MLOps automation pattern. A custom Dataiku plugin can be developed to provide a simple UI that allows an administrator or a user to automatically provision a new, standardized Dataiku project or environment by clicking a button. This abstracts away the complexity of the underlying API calls and scripts.

### 2. Prerequisites
- **Expert-level knowledge of the Dataiku Python API.**
- **Administrator rights** and filesystem access to a dev instance for plugin development.
- **A clear, standardized process** for what needs to be created when a new project is provisioned.

### 3. Step-by-Step Instructions: The Plugin's Logic
The goal is to create a custom **Macro** within a plugin.

1.  **Define the Macro's UI:**
    *   In your plugin's definition files, you will define the UI that the user will see when they run the macro.
    *   This could include input fields for the "New Project Name" and a dropdown to select a "Project Template".
2.  **Write the Python Backend:**
    *   The core of the macro is a Python script that runs when the user clicks the "Run" button.
    *   This script will use the **Dataiku Python API client** (\`dataiku.api_client()\`) to perform a series of administrative actions:
        1.  **Get user inputs:** Read the values from the macro's UI (the new project name).
        2.  **Duplicate a template project:** Use the API to find your standard project template and duplicate it to create the new project.
        3.  **Set permissions:** Use the API to set the default group permissions on the new project.
        4.  **Create connections (if needed):** The script could even call cloud provider SDKs to provision a new database schema for the project.
        5.  **Log the action:** The script should log that a new project was provisioned, by whom, and when.
3.  **Expose the Macro:**
    *   Once the plugin is developed and installed, the new macro will be available to run from a Dataiku Dashboard or from a Scenario. An administrator could create a "Project Vending Machine" dashboard with a button to run this macro.

### 4. Resources and Tools
- **Dataiku Developer Guide:** The official documentation on how to build custom plugins and macros.
- **Dataiku Python API:** The API client is essential for performing the administrative actions.
- **A "Template" Project:** The plugin will use this as the base for creating new projects.

### 5. Next Steps and Progression
- **Webapp Interface:** You could build a full Dataiku Webapp as the user interface for this provisioning process, providing a more guided and user-friendly experience than a simple macro.

### 6. Common Challenges and Solutions
- **Challenge:** "Plugin development is too complex."
- **Solution:** It is the most advanced form of customization in Dataiku. This pattern should only be considered by organizations with a mature MLOps practice and a strong need to automate the provisioning of dozens or hundreds of projects in a standardized way.
- **Challenge:** "The script fails with a permissions error."
- **Solution:** The user or service account running the macro needs to have the appropriate global permissions in Dataiku to perform the actions in the script, such as "Create projects".
`,
  },
  {
    id: 592,
    slug: 'securing-scenarios-by-rotating-credentials-secrets',
    question: 'How to get started with securing Dataiku scenarios by rotating credentials and managing secrets.',
    answer: `
### 1. Introduction/Overview
If your scenarios interact with external systems, they will need credentials. Hardcoding these secrets is a major security risk. Securing your scenarios involves storing secrets in a managed location and, for high-security environments, integrating with a system that can automatically rotate these credentials.

### 2. Prerequisites
- **A scenario that needs to use a secret** (e.g., a database password or an API key).
- **Administrator access** to Dataiku to configure secret management.

### 3. Step-by-Step Instructions: A Tiered Approach to Security

#### Level 1: Use Dataiku's Built-in Secret Management (Good)
- **What it is:** Using **Project Variables** of the "Password" type.
- **How:**
    1.  In your project, go to **... > Variables**.
    2.  Create a variable for your secret (e.g., \`MY_API_KEY\`).
    3.  Set its type to **Password**. This encrypts it and masks it in the UI.
- **Pros:** Simple, built-in, and much better than hardcoding.
- **Cons:** The secret is still static; it does not rotate automatically.

#### Level 2: Use an External Secrets Vault (Better)
- **What it is:** Integrating Dataiku with a dedicated secrets management tool like **HashiCorp Vault** or **Azure Key Vault**.
- **How (Admin Task):**
    1.  An administrator configures the integration in **Administration > Settings**.
    2.  Now, when you create a Project Variable or a Connection, you will have a new option to fetch the value from the external vault instead of typing it in.
- **Pros:** Centralized management of secrets. The secrets live in a dedicated, highly secure system.
- **Cons:** Still often relies on a static token to connect to the vault itself.

#### Level 3: Dynamic, Rotated Credentials (Best)
- **What it is:** The external vault is configured to automatically generate new, temporary credentials on a regular basis (e.g., every 24 hours).
- **How it Works:**
    1.  This uses the integration from Level 2.
    2.  When your Dataiku scenario runs, it asks the vault for the database password.
    3.  The vault provides the current, valid password.
    4.  Later, the vault automatically rotates the password in the database.
    5.  The next time your scenario runs, it gets the *new* password from the vault.
- **Pros:** Highly secure. The credentials are short-lived, dramatically reducing the window of opportunity if one is compromised.

### 4. Resources and Tools
- **Project Variables (Password type).**
- **External Secrets Management tools (HashiCorp Vault, etc.).**
- **IAM Roles (for cloud):** The best way to avoid static secrets for cloud resources is to use temporary credentials from an IAM role.

### 5. Next Steps and Progression
- **Audit Secret Access:** Your external vault will provide a detailed audit log of which service or user requested which secret and when.

### 6. Common Challenges and Solutions
- **Challenge:** "Setting up a secrets vault is too complicated."
- **Solution:** It is an advanced infrastructure setup. For many use cases, using Dataiku's built-in "Password" type variables (Level 1) provides a sufficient level of security and is a huge improvement over hardcoding secrets in scripts.
`,
  },
  {
    id: 593,
    slug: 'using-backup-restore-for-disaster-recovery',
    question: 'How to get started with using Dataiku’s backup and restore features as part of a disaster recovery plan.',
    answer: `
### 1. Introduction/Overview
A Disaster Recovery (DR) plan is essential for any critical system. It outlines how you will restore service in the event of a major failure (e.g., a server crash, data corruption). For Dataiku, the core of a DR plan is a regular, automated backup of the Dataiku instance configuration and data, and a clear, tested process for restoring it. This is an administrator-level responsibility.

### 2. Prerequisites
- **A production Dataiku instance.**
- **Administrator access** to the Dataiku server's command line.
- **A separate, secure storage location** for your backups (e.g., a different server, a cloud storage bucket).

### 3. Step-by-Step Instructions

#### Part 1: Performing the Backup
1.  **Understand What to Back Up:** A full Dataiku backup consists of two parts:
    *   **The Dataiku Data Directory:** This folder contains all your projects, recipes, model definitions, configurations, etc.
    *   **The Backend Database:** If you are using an external PostgreSQL database for Dataiku's configuration, you must back up this database as well.
2.  **Use the Backup Script:** Dataiku provides a command-line script to simplify the backup process.
    > \`[DATAİKU_DATA_DIR]/bin/backup-master\`
3.  **Automate the Backup:**
    *   Create a shell script that runs this backup command.
    *   The script should also copy the resulting backup \`.zip\` file to your secure, off-site storage location.
    *   Use a system scheduler (like \`cron\` on Linux) to run this backup script automatically on a regular basis (e.g., every night).

#### Part 2: Performing the Restore
1.  **Prepare a New Server:** In a disaster scenario, you would first provision a new, clean server for Dataiku.
2.  **Install Dataiku:** Install the exact same version of the Dataiku software on the new server.
3.  **Retrieve the Backup:** Copy your latest backup \`.zip\` file from your archive storage to the new server.
4.  **Use the Restore Script:** Dataiku provides a restore script.
    > \`[NEW_DATAİKU_DATA_DIR]/bin/restore-master --file /path/to/backup.zip\`
5.  **Start Dataiku:** After the restore is complete, you can start the Dataiku service on the new server. It will be restored to the state it was in at the time of the backup.

### 4. Resources and Tools
- **The Dataiku Backup and Restore scripts:** Located in the \`bin\` directory of your installation.
- **A system scheduler (\`cron\`).**
- **A secure, remote location** for storing your backups.

### 5. Next Steps and Progression
- **Test Your Restore Process:** A backup is useless if you can't restore it. You must periodically (e.g., quarterly) test your disaster recovery plan by performing a full restore to a temporary, non-production environment. This ensures your backups are valid and your process works.
- **High Availability (HA):** For near-zero downtime, you can implement a High Availability architecture with a multi-node setup and a replicated backend database. This provides automatic failover but is a more complex and expensive setup.

### 6. Common Challenges and Solutions
- **Challenge:** "The restore failed."
- **Solution:** This is why you test your backups. A common reason for failure is trying to restore a backup from one version of Dataiku onto a different version. The versions must match.
- **Challenge:** "We lost a day of work because the backup was from last night."
- **Solution:** This is the trade-off. The frequency of your backups determines your Recovery Point Objective (RPO). A nightly backup means you could potentially lose up to 24 hours of work. For more critical systems, you might need to run backups more frequently.
`,
  },
  {
    id: 594,
    slug: 'auditing-logs-with-elk-stack',
    question: 'How to get started with auditing Dataiku logs using an ELK stack for troubleshooting and compliance.',
    answer: `
### 1. Introduction/Overview
The ELK Stack (Elasticsearch, Logstash, Kibana) is a popular open-source platform for centralized logging and analysis. Integrating Dataiku with ELK allows you to collect, search, and visualize all your Dataiku logs (from the backend, jobs, audits, etc.) in one place, which is powerful for troubleshooting and compliance auditing.

### 2. Prerequisites
- **A running ELK stack.**
- **Administrator access** to the Dataiku server(s) to install a log shipper.
- **Network connectivity** between the Dataiku servers and your Logstash instance.

### 3. Step-by-Step Instructions: The Logging Pipeline

1.  **Install a Log Shipper (Filebeat):**
    *   On every server that hosts a Dataiku component (backend, API node, etc.), you need to install a log shipping agent. **Filebeat** is a lightweight and common choice from the Elastic stack.
2.  **Configure Filebeat:**
    *   You need to configure Filebeat by editing its \`filebeat.yml\` file.
    *   You will tell it which Dataiku log files to monitor. Key log files include:
        *   \`[DATAİKU_DATA_DIR]/run/backend.log\`
        *   \`[DATAİKU_DATA_DIR]/run/jobs.log\`
        *   \`[DATAİKU_DATA_DIR]/run/audit.log\`
    *   You also configure the "output" to point to the address of your Logstash server.
3.  **Configure Logstash (The Parser):**
    *   Logstash receives the raw log lines from Filebeat. Its job is to parse and structure them.
    *   Dataiku logs are in a structured JSON format, which makes them easy to parse. You will use a Logstash configuration file to define a pipeline that uses a "json" filter to parse the log message.
    *   You can also use Logstash to enrich the logs, for example, by adding metadata about the source server.
4.  **Configure the Logstash Output:** The final step in the Logstash pipeline is to send the processed, structured JSON to your Elasticsearch cluster for indexing.
5.  **Visualize and Audit in Kibana:**
    *   Now that the logs are in Elasticsearch, you can use **Kibana**.
    *   In Kibana, you can create dashboards to visualize log data (e.g., a chart of errors over time).
    *   Most importantly, you can use Kibana's powerful search and filtering capabilities to troubleshoot issues (e.g., "show me all logs for job_id X that contain the word 'error'").

### 4. Resources and Tools
- **The ELK Stack:** Elasticsearch, Logstash, Kibana.
- **Filebeat:** The log shipping agent.

### 5. Next Steps and Progression
- **Create Alerts:** In Kibana, you can create alerts that will automatically notify you if certain conditions are met in your logs (e.g., "alert me if we see more than 10 critical errors in the last 5 minutes").
- **Correlate with Other Logs:** The real power of a central logging system is the ability to correlate Dataiku logs with logs from your other applications and infrastructure, giving you a complete view of your system's behavior.

### 6. Common Challenges and Solutions
- **Challenge:** "I don't see my logs in Kibana."
- **Solution:** You need to debug the pipeline step-by-step. Is Filebeat running and can it read the log files? Can Filebeat connect to Logstash (check firewalls)? Is Logstash successfully parsing the logs and sending them to Elasticsearch? Check the logs of each component in the ELK stack.
- **Challenge:** "The logs are not parsed correctly; they just show up as a single long message."
- **Solution:** Your Logstash parsing configuration is incorrect. You need to ensure you are using the "json" filter to correctly parse the structured log entries that Dataiku produces.
`,
  },
  {
    id: 595,
    slug: 'integrating-with-big-data-tools-hadoop-hdfs-hive',
    question: 'How to get started with integrating Dataiku with Big Data tools (Hadoop HDFS, Hive) for large-scale pipelines.',
    answer: `
### 1. Introduction/Overview
Dataiku is designed for the Big Data ecosystem. It can be tightly integrated with a Hadoop cluster, using HDFS as its primary storage backend and submitting computation to engines like Spark and Hive. This allows Dataiku to act as a user-friendly, high-level interface for your powerful but complex big data infrastructure.

### 2. Prerequisites
- **A running Hadoop cluster** with HDFS, YARN, and Hive.
- **Dataiku installed on an "edge node"** of the cluster. This is critical for network connectivity and access to client configurations.
- **Administrator access** to both Dataiku and the Hadoop cluster.

### 3. Step-by-Step Instructions: The Integration Process

1.  **Installation on an Edge Node:** The Dataiku server software must be installed on a node that is part of the Hadoop cluster and has all the necessary Hadoop client libraries and configuration files (\`core-site.xml\`, \`hdfs-site.xml\`, etc.) available.
2.  **Hadoop Configuration:**
    *   During the installation of Dataiku, the setup script will detect the local Hadoop installation and prompt you to configure the integration.
    *   You will point Dataiku to the Hadoop configuration directory.
    *   Dataiku will then automatically configure itself to use HDFS for storage and YARN for resource management.
3.  **Hive Integration:**
    *   In **Administration > Settings > Hive**, you can configure the connection to the Hive metastore and set the execution engine.
4.  **Using the Integrated Environment:**
    *   **For Storage:** You can now create datasets that read from and write to HDFS paths directly. When you create a new dataset, HDFS will be the default storage location.
    *   **For Compute:** In any visual recipe, you can now select **Hive** as an **Execution engine**. Dataiku will translate the visual steps into a HiveQL query and execute it on the cluster. You can also create **Hive recipes** to write HiveQL code directly.

### 4. Resources and Tools
- **The Dataiku Installation Guide:** Provides detailed instructions for different Hadoop distributions.
- **The Recipe Execution Engine Dropdown:** The UI for choosing Hive (or Spark) as the compute engine.
- **Hive Recipes:** For writing custom HiveQL queries.

### 5. Next Steps and Progression
- **Spark on YARN:** The same integration allows you to run Spark jobs. You can set the execution engine for recipes to **Spark** and create **PySpark** recipes. Dataiku will submit these jobs to the YARN resource manager on your cluster.
- **Security (Kerberos):** If your Hadoop cluster is secured with Kerberos, Dataiku can be configured to work in this environment. This is a complex setup that requires careful configuration of keytabs and principals.

### 6. Common Challenges and Solutions
- **Challenge:** "Dataiku can't write to HDFS; I'm getting a permissions error."
- **Solution:** The user account that the Dataiku service is running as on the server needs to have the correct permissions (read, write, execute) on the HDFS directories it's trying to use. You may need to work with your Hadoop administrator to set up the HDFS permissions correctly.
- **Challenge:** "My Hive job is failing."
- **Solution:** Use the YARN ResourceManager UI to find your failed job and look at its logs. The detailed error message from the Hive execution will be there. Common issues include syntax errors in the HiveQL or resource issues on the cluster.
`,
  },
  {
    id: 596,
    slug: 'using-web-application-node-to-build-deploy-ml-apps',
    question: 'How to get started with using Dataiku’s Web Application node to quickly build and deploy ML apps.',
    answer: `
### 1. Introduction/Overview
A Dataiku Webapp is a simple, interactive web application that you can build inside your project. It's a fantastic way to create a user-friendly "front-end" for your data pipeline or machine learning model, allowing non-technical users to interact with your work without seeing the underlying complexity.

### 2. Prerequisites
- **A Dataiku pipeline or model** that you want to expose through a UI.
- **A clear idea of what you want the user to do** in the app.

### 3. Step-by-Step Instructions: Building a Simple App

1.  **Create a New Webapp:** In your project's top navigation bar, go to **... > Webapps**. Click **+ NEW WEBAPP**.
2.  **Choose an App Template:** Dataiku offers several templates.
    *   **Standard:** Best for creating simple, "wizard-like" apps with a few inputs and outputs.
    *   **Dash/Bokeh/Streamlit:** For creating more complex, interactive dashboards using Python web frameworks. For a first app, **Standard** is a good choice.
3.  **Design the UI:**
    *   The editor for a Standard webapp is slide-based.
    *   **Add an Input Slide:** Add a slide with input widgets. For example, add a **Dropdown menu** to let the user select a value.
    *   **Link Inputs to Variables:** Connect the input widget to a **Project Variable**. When the user makes a selection, it will update the variable's value.
    *   **Add an Action Button:** Add a button that the user can click. Configure this button to run a **Scenario**. This scenario should be parameterized to use the project variable that the user just set.
    *   **Add an Output Slide:** Add a final slide to display the results. You can add a **Chart**, a **Dataset table**, or other widgets that show the output of the scenario run.
4.  **Test and Share:**
    *   Use the "View" mode to test your app.
    *   Once it's working, you can share a direct link to the webapp with your business users. They will see the simple UI you created, not the complex Flow.

### 4. Resources and Tools
- **Dataiku Webapps:** The core feature for building the app.
- **Project Variables:** The mechanism for passing information from the user's input in the app to your backend pipeline.
- **Scenarios:** The engine that runs the backend logic when the user clicks a button.

### 5. Next Steps and Progression
- **Python-backed Apps:** For full interactivity, build a webapp using the **Streamlit** or **Dash** templates. This lets you write Python code to create a dynamic UI that can react instantly to user input without needing to run a full scenario.
- **Embed in a Dashboard:** You can embed your finished webapp as a tile in a standard Dataiku Dashboard.

### 6. Common Challenges and Solutions
- **Challenge:** "The user clicks the button, but the results don't update."
- **Solution:** Your scenario needs to run and complete successfully. You may need to add logic that explicitly refreshes the output tile after the scenario is done. For Python-backed apps, you need to write callback functions to handle the updates.
- **Challenge:** "The app UI is confusing."
- **Solution:** Keep it simple. A good webapp should have a very clear, single purpose. Use **Text** widgets to provide clear instructions to the user on every slide. Guide them through the process.
`,
  },
  {
    id: 597,
    slug: 'implementing-scenario-based-testing',
    question: 'How to get started with implementing scenario-based testing (data drift tests, regression tests) in Dataiku.',
    answer: `
### 1. Introduction/Overview
Scenario-based testing is the practice of creating a dedicated Dataiku Scenario whose sole purpose is to run a suite of automated tests against your pipeline. This is a core component of CI/CD and MLOps, as it allows you to automatically validate your project's quality and correctness.

### 2. Prerequisites
- **A Dataiku project** with a pipeline you want to test.
- **A clear definition of your test cases.**

### 3. Step-by-Step Instructions: Building a Test Scenario

1.  **Create a "Test" Scenario:**
    *   In your project, go to **Scenarios** and create a new scenario. Name it descriptively, like \`Run_Project_Tests\`.
2.  **Add Test Steps:** This scenario will not build your main outputs. Instead, it will contain steps that perform checks.
    *   **Step 1: Data Quality Checks.**
        *   Add a **Run checks** step.
        *   Configure it to run the predefined quality checks on your key input and output datasets. This tests for things like nulls, valid ranges, etc.
    *   **Step 2: Data Drift Checks.**
        *   Add another **Run checks** step.
        *   This time, point it to your **Saved Model** object. This will execute the drift analysis you have configured on the model, checking if the input data has changed significantly.
    *   **Step 3: Model Regression Tests.**
        *   Add a final **Run checks** step on your Saved Model.
        *   This can run a check to ensure the model's performance (e.g., AUC) on a test set has not dropped below a certain threshold.
    *   **Step 4: Unit Tests (for code).**
        *   If you have written unit tests for your Python libraries, you can add a Python recipe that runs these tests and have this step build that recipe. The recipe should be written to fail if any unit test fails.
3.  **How it Works:**
    *   If any of the "Run checks" steps encounters a check that fails at the "Error" severity level, the step will fail, which in turn causes the entire test scenario to fail.
4.  **Integrate with CI/CD:**
    *   The primary use of this test scenario is to be triggered by your CI/CD pipeline.
    *   When a developer opens a pull request, the CI pipeline runs this test scenario. If it fails, the build is marked as "failed," and the developer knows they have introduced a regression that they need to fix before the code can be merged.

### 4. Resources and Tools
- **Scenarios:** The orchestration engine for your tests.
- **Run Checks Step:** The key step for executing your data and model validation rules.
- **A CI/CD tool (Jenkins, GitHub Actions, etc.).**

### 5. Next Steps and Progression
- **Test on a Sample:** For your CI pipeline, your test scenario should ideally run on a small, static sample of the data. This ensures the tests run quickly and are repeatable. The goal is to test the pipeline's *logic*, not to process large volumes of data.

### 6. Common Challenges and Solutions
- **Challenge:** "My tests are flaky; they sometimes pass and sometimes fail."
- **Solution:** This usually means your checks are too sensitive or your test data is not static. For example, if you have a check on the exact row count, and the source data changes, the test will fail. Your tests should be designed to run against a fixed, known set of data to be reliable.
- **Challenge:** "The test scenario takes too long to run."
- **Solution:** You are likely running the tests on too much data. Create a small, representative sample of your data and have your test scenario run against that sample instead.
`,
  },
  {
    id: 598,
    slug: 'linking-to-feature-store-for-reuse',
    question: 'How to get started with linking Dataiku to a feature store to reuse features across projects.',
    answer: `
### 1. Introduction/Overview
A Feature Store is a central repository for storing, sharing, and managing curated features for machine learning models. Integrating Dataiku with a feature store allows data scientists to easily discover and reuse high-quality features built by other teams, which accelerates model development and ensures consistency.

### 2. Prerequisites
- **A Feature Store platform:** This could be an open-source tool like Feast or a managed service from a cloud provider.
- **A connection** from Dataiku to the feature store's underlying database (e.g., a Redis or SQL database).

### 3. Step-by-Step Instructions: The Integration Workflow

1.  **Connecting to the Feature Store (as a Data Source):**
    *   The feature store itself will store its data in a standard database (online stores often use a key-value store like Redis, while offline stores use a data warehouse like BigQuery).
    *   In Dataiku, an administrator creates a **Connection** to this underlying database.
2.  **Using Features from the Store (Feature Consumption):**
    *   A data scientist can now create a **Dataset** in their Dataiku project that points to a specific feature table in the feature store, using the connection created in the previous step.
    *   They can use this dataset as an input to their model training flow, joining the features with their specific target data.
3.  **Writing New Features to the Store (Feature Creation):**
    *   A data scientist or engineer can build a pipeline in Dataiku to create a new, valuable feature.
    *   The final step of this pipeline would be an **Export** recipe.
    *   This recipe would write the new feature data (e.g., a dataset with columns for \`user_id\`, \`feature_name\`, \`feature_value\`, \`timestamp\`) to a new table in the feature store's database. This makes the new feature available for others to use.

### 4. Resources and Tools
- **A Feature Store Platform:** The central service for managing features.
- **Dataiku Database Connectors:** The tool for reading from and writing to the feature store's underlying storage.
- **Dataiku Recipes (Join, Export):** The tools for consuming and producing features.

### 5. Next Steps and Progression
- **Plugin for Tighter Integration:** For a more seamless user experience, a developer could create a custom Dataiku plugin. This plugin could provide a custom "Feature Store" dataset connector that allows users to browse and select features by name, hiding the underlying database tables.
- **Real-time Features:** The feature store's online component can be used to serve features with low latency to your real-time model APIs deployed on Dataiku.

### 6. Common Challenges and Solutions
- **Challenge:** "How do I know which features are available in the store?"
- **Solution:** A good feature store has a UI or a registry that serves as a searchable catalog of all available features, along with their definitions, owners, and quality metrics.
- **Challenge:** "The data in the feature store is stale."
- **Solution:** The team that owns a feature is responsible for creating an automated Dataiku scenario that periodically recomputes and updates that feature in the store, ensuring it remains fresh.
`,
  },
  {
    id: 599,
    slug: 'orchestrating-jobs-with-cloud-native-schedulers-kubernetes-executors',
    question: 'How to get started with orchestrating Dataiku jobs using cloud-native schedulers (Cloud Composer/Airflow) with Kubernetes executors.',
    answer: `
### 1. Introduction/Overview
This is a modern, powerful, and cloud-native approach to orchestration. It involves using a managed scheduler like Google's Cloud Composer (which is a managed Apache Airflow) to define your workflows, and having Airflow execute tasks as pods on a Kubernetes cluster. This allows you to orchestrate Dataiku jobs as just one step in a much larger, multi-system workflow.

### 2. Prerequisites
- **A Kubernetes cluster** (e.g., GKE).
- **A managed Airflow instance** (e.g., Cloud Composer) that is configured to use the Kubernetes cluster for its executors.
- **A Dataiku instance.**
- **Network connectivity** between the Kubernetes cluster and the Dataiku instance.

### 3. Step-by-Step Instructions: The Workflow
1.  **Set up the Airflow Kubernetes Executor:**
    *   Configure your Airflow instance to use the \`KubernetesExecutor\`. This means that for every task in a DAG run, the Airflow scheduler will create a new pod on your Kubernetes cluster to execute that task.
2.  **Create a Custom Docker Image:**
    *   Create a Docker image that contains all the tools your Airflow tasks will need. This should include the Python library for your cloud provider and the \`requests\` library for calling the Dataiku API.
3.  **Write the Airflow DAG:**
    *   In your DAG file, you will define your pipeline.
    *   You will use the \`KubernetesPodOperator\` to run your tasks.
4.  **The Dataiku Task:**
    *   One of the tasks in your DAG will be responsible for triggering the Dataiku job.
    *   This task will use the \`KubernetesPodOperator\` to run a pod using your custom Docker image.
    *   The command for the pod will be a simple shell script that uses \`curl\` to make a **REST API call** to the Dataiku API endpoint to run a specific scenario.
    *   This script should also poll for the job's completion and check its status.
5.  **How it Works:** Airflow orchestrates the end-to-end pipeline. When it gets to the Dataiku step, it creates a pod on K8s. That pod's only job is to call the Dataiku API, effectively delegating the data processing work to the Dataiku platform.

### 4. Resources and Tools
- **Managed Airflow (Cloud Composer, etc.).**
- **Kubernetes and the KubernetesPodOperator.**
- **A custom Docker image.**
- **The Dataiku REST API.**

### 5. Next Steps and Progression
- **Passing Data:** You can pass information from one Airflow task to another using **XComs**. A task could pull some data, and then pass a parameter via XComs to the next task, which would then include that parameter in its API call to Dataiku.
- **Dynamic DAGs:** You can create Airflow DAGs that are dynamically generated, allowing you to build very complex and flexible orchestration pipelines.

### 6. Common Challenges and Solutions
- **Challenge:** "My task pod can't connect to Dataiku."
- **Solution:** This is a Kubernetes networking issue. The pods running your Airflow tasks need to be able to resolve and connect to the Dataiku server's address. This might require configuring DNS, VPC peering, or other network policies.
- **Challenge:** "How do I handle my Dataiku API key securely?"
- **Solution:** Use the secrets management system provided by your orchestrator and your cloud provider. In Airflow, you can store it as a Connection. In Kubernetes, you would store it as a K8s Secret and mount it into the task pod at runtime. **Do not** hardcode the key in your Docker image or your DAG file.
`,
  },
  {
    id: 600,
    slug: 'managing-multi-region-multi-cloud-setup',
    question: 'How to get started with managing Dataiku in a multi-region or multi-cloud setup for high availability.',
    answer: `
### 1. Introduction/Overview
For mission-critical applications that require very high availability and disaster recovery, you can deploy Dataiku in a multi-region or even a multi-cloud architecture. This is an advanced setup that provides resilience against the failure of an entire cloud region or provider.

### 2. Prerequisites
- **Presence in multiple cloud regions or multiple cloud providers.**
- **A deep understanding of cloud networking, data replication, and DNS.**
- **Administrator-level expertise** in Dataiku and cloud infrastructure.

### 3. Step-by-Step Instructions: Common Architectures

#### Pattern 1: Active-Passive for Disaster Recovery (DR)
- **What it is:** You have a primary, "active" Dataiku instance in one region, and a secondary, "passive" instance in another region that is kept as a cold or warm standby.
- **How it works:**
    1.  **Replication:** You must have a process to regularly replicate your Dataiku backups (both the Dataiku data directory and the backend database) from the active region to the passive region.
    2.  **DNS:** Use a DNS service (like AWS Route 53) with a failover routing policy. Normally, your Dataiku URL points to the active instance.
    3.  **Failover:** If the primary region fails, an administrator manually triggers a DNS failover. This points the URL to the passive instance. They then restore the latest backup to the passive instance, making it the new active one.
- **This provides disaster recovery, but the failover is not instantaneous.**

#### Pattern 2: Active-Active for High Availability (HA)
- **What it is:** You have two or more fully active Dataiku instances running in different regions, with a load balancer distributing traffic between them.
- **How it works:**
    1.  **Global Load Balancer:** Use a global load balancing service to direct users to the nearest or healthiest Dataiku instance.
    2.  **Project and Data Replication:** This is the hardest part. You need a robust, near real-time process to keep the projects and data on all active instances in sync. This can be extremely complex and often requires a custom-built replication solution.
    3.  **Centralized Backend:** The backend database for Dataiku would need to be a globally replicated database service (like Amazon Aurora Global Database or Google Cloud Spanner).
- **This provides near-zero downtime but is very complex and expensive to set up and maintain.**

### 4. Resources and Tools
- **Cloud Provider Global Load Balancers.**
- **DNS Failover Services.**
- **Data Replication Tools** (for databases and file storage).
- **Dataiku's Backup and Restore scripts.**

### 5. Next Steps and Progression
- **Start with DR:** For most organizations, a solid, well-tested Active-Passive disaster recovery plan is sufficient. An Active-Active setup is only justified for the most critical applications with extreme uptime requirements.

### 6. Common Challenges and Solutions
- **Challenge:** Keeping projects and data in sync in an Active-Active setup is a nightmare.
- **Solution:** It is. This is a major data engineering challenge. You need to handle concurrent writes and resolve conflicts. This often leads to an "eventually consistent" model, which may not be suitable for all use cases. The complexity of this problem is why most organizations opt for a simpler Active-Passive DR strategy.
- **Challenge:** "Our failover test took hours."
- **Solution:** Your Recovery Time Objective (RTO) was not met. You need to optimize your DR plan. Can the restore process be automated with scripts? Is the passive instance a "warm" standby (already running) to speed up the process? You must regularly test and refine your DR plan to ensure it's effective.
`,
  },
  {
    id: 601,
    slug: 'establishing-slo-based-monitoring-alerting',
    question: 'How to get started with establishing SLO-based monitoring and alerting for Dataiku-driven ML services.',
    answer: `
### 1. Introduction/Overview
Moving beyond simple threshold-based alerts (e.g., "CPU > 90%"), Service Level Objective (SLO)-based monitoring is a more mature and user-centric approach. An SLO is a target for a specific metric (e.g., "99.9% of API requests should be served in under 200ms"). This framework helps you balance reliability with the pace of innovation.

### 2. Prerequisites
- **A production ML service** (e.g., a Dataiku API endpoint).
- **A monitoring system** that can track metrics over time (e.g., Prometheus and Grafana).
- **Agreement with your business stakeholders** on what constitutes "good enough" performance.

### 3. Step-by-Step Instructions
1.  **Identify Your Service Level Indicators (SLIs):**
    *   An SLI is the thing you actually measure. For a real-time ML API, common SLIs are:
        *   **Latency:** The time it takes to return a prediction.
        *   **Availability:** The percentage of requests that return a successful response (not a 5xx error).
        *   **Quality:** The accuracy or business impact of the model's predictions.
2.  **Define Your SLOs:**
    *   An SLO is a target for an SLI over a specific time window.
    *   Work with your product manager and stakeholders to define these targets.
    *   **Example SLOs:**
        *   "99% of prediction requests over a rolling 28-day window will have a latency of less than 200ms."
        *   "99.95% of prediction requests over a rolling 28-day window will be successful (return a non-500-level error)."
3.  **Measure Your SLIs:**
    *   Use your monitoring stack (e.g., Prometheus) to collect the raw data for your SLIs. You need to be logging the latency and status code for every single request.
4.  **Calculate and Visualize Your SLOs:**
    *   In your dashboarding tool (e.g., Grafana), create queries that calculate your SLO compliance.
    *   A key concept is the **Error Budget**. If your availability SLO is 99.95%, your error budget is 0.05%. This is the amount of "unreliability" you are allowed to have over the time window.
    *   Create a dashboard showing your current SLO compliance and how much of your error budget you have remaining.
5.  **Alert on Error Budget Burn Rate:**
    *   Do not alert when a single request is slow. Alert when you are burning through your error budget too quickly.
    *   For example: "If we continue at this rate of errors, we will exhaust our entire monthly error budget in the next 2 days. Page the on-call engineer." This approach reduces alert fatigue and focuses on what really matters to the user experience.

### 4. Resources and Tools
- **Prometheus and Grafana:** A common stack for SLI/SLO monitoring.
- **The Google SRE Handbook:** The definitive source for learning about the theory and practice of SLOs.

### 5. Next Steps and Progression
- **Balancing Reliability and Features:** The error budget becomes a data-driven tool for decision-making. If you have plenty of error budget left, it's safe to push a risky new feature. If your error budget is almost gone, you should freeze new deployments and focus on reliability improvements.

### 6. Common Challenges and Solutions
- **Challenge:** "We can't agree on the right SLO target."
- **Solution:** Start with a lenient, achievable target based on your current historical performance. You can always make the SLO stricter over time as you improve the service's reliability. The goal is to have a reasonable target that reflects user expectations.
- **Challenge:** "Measuring the 'quality' SLI is difficult."
- **Solution:** It is. Measuring model accuracy in real-time requires a fast feedback loop to get the ground truth. For many systems, you may start by only having SLOs for latency and availability, and monitor quality with a slower, offline process.
`,
  },
  {
    id: 602,
    slug: 'applying-devops-practices-to-python-sql-code',
    question: 'How to get started with applying DevOps practices (linting, unit tests) to Dataiku Python and SQL code.',
    answer: `
### 1. Introduction/Overview
DevOps is a set of practices that combines software development and IT operations, aiming to shorten the development lifecycle and provide continuous delivery with high quality. You can apply core DevOps practices like automated testing and style checking to the code within your Dataiku projects to dramatically improve its quality and maintainability.

### 2. Prerequisites
- **Dataiku projects that use code recipes** (Python or SQL).
- **A CI/CD pipeline** (e.g., in GitHub Actions or Jenkins) triggered by your project's Git repository.

### 3. Step-by-Step Instructions

#### Part 1: Linting (Automated Style Checking)
1.  **Define a Style Guide:** Agree on a team-wide style guide. For Python, this is **PEP 8**.
2.  **Choose a Linter:** Select a command-line tool that can enforce your style guide.
    *   **For Python:** \`flake8\` is a popular choice. \`black\` is an auto-formatter that can also be used.
    *   **For SQL:** Tools like \`sqlfluff\` are available.
3.  **Integrate into CI/CD:**
    *   In your CI/CD pipeline's script, add a new "Lint" stage that runs before any other tests.
    *   This stage will run the linter command on the code files in your project.
    *   If the linter finds any style violations, it should exit with an error code, which will fail the CI build and prevent the code from being merged.

#### Part 2: Unit Testing
1.  **Write Testable Code:** In your Dataiku project's **Library**, write your core logic as pure Python functions that can be tested in isolation.
2.  **Use a Testing Framework:** Use a standard Python testing framework like \`pytest\`.
3.  **Write Unit Tests:** Create test files (e.g., \`test_my_utils.py\`) that import your functions and use \`assert\` statements to check that they produce the expected output for a given input.
4.  **Integrate into CI/CD:**
    *   Add a "Unit Test" stage to your CI/CD pipeline script.
    *   This stage runs the \`pytest\` command.
    *   If any test fails, \`pytest\` will exit with an error code, which will fail the CI build.

### 4. Resources and Tools
- **Linters:** \`flake8\`, \`black\`, \`sqlfluff\`.
- **Testing Frameworks:** \`pytest\`.
- **Your CI/CD tool (GitHub Actions, etc.).**

### 5. Next Steps and Progression
- **Pre-Commit Hooks:** You can set up Git pre-commit hooks that automatically run the linter on a developer's machine *before* they are even allowed to commit their code. This catches style issues at the earliest possible moment.
- **Test Coverage:** Use tools like \`pytest-cov\` to measure what percentage of your code is covered by unit tests. Aim for high coverage on your most critical and complex functions.

### 6. Common Challenges and Solutions
- **Challenge:** "Developers are complaining that the linter is too strict."
- **Solution:** A consistent style is important for readability. However, most linters can be configured. You can have a team discussion to decide if a specific rule should be disabled or adjusted.
- **Challenge:** "Our CI pipeline is failing because of a unit test failure."
- **Solution:** This is a good thing! The CI pipeline has done its job. It has automatically caught a regression or a bug in your code before it could be merged and deployed to production. The developer needs to fix their code to make the test pass.
`,
  },
  {
    id: 603,
    slug: 'leveraging-project-sharing-home-folder-structure',
    question: 'How to get started with leveraging Dataiku’s project sharing and Home folder structure for multi-team environments.',
    answer: `
### 1. Introduction/Overview
In a large organization with many teams using a single Dataiku instance, keeping the projects organized is essential for security and navigability. Dataiku provides two main features for this: **Project Folders** to organize the homepage, and a **Shared Objects** model for cross-project collaboration.

### 2. Prerequisites
- **A multi-team Dataiku instance.**
- **Administrator rights** to create project folders and manage permissions.

### 3. Step-by-Step Instructions

#### Part 1: Organizing with Project Folders
1.  **Plan Your Folder Structure:** Design a folder hierarchy that makes sense for your organization. A common structure is to have top-level folders for each major department or business unit.
    *   \`/Finance\`
    *   \`/Marketing\`
    *   \`/Shared_Services\`
2.  **Create the Folders (Admin Task):** An administrator can create these folders directly from the Dataiku homepage.
3.  **Set Permissions on Folders:**
    *   For each folder, you can set permissions.
    *   For example, you can set the permissions on the \`/Finance\` folder so that only members of the "Finance Team" group can even *see* it.
    *   This is a powerful way to control project visibility at a high level.
4.  **Move Projects into Folders:** Users can then create new projects within, or move existing projects into, the appropriate folder.

#### Part 2: Sharing Between Projects
1.  **Create a "Shared" Project:**
    *   Create a dedicated project called \`SHARED_DATASETS\` or \`GOLDEN_DATA\`.
    *   This project's purpose is to contain the authoritative, cleaned, "golden" datasets that many other projects will need (e.g., your master customer table).
2.  **Set Permissions on the Shared Project:**
    *   Grant **Reader** access to this shared project to all the developer groups.
3.  **How to Use the Shared Data:**
    *   Now, in any other project, a developer can click **+ DATASET > Import Dataset from another project**.
    *   They can then select a dataset from the \`SHARED_DATASETS\` project to use as a read-only input in their own Flow.
    *   This ensures that all teams are building on the same, consistent, single source of truth.

### 4. Resources and Tools
- **Project Folders:** The tool for organizing the Dataiku homepage.
- **Folder Permissions:** For controlling project visibility.
- **Shared Projects and the "Import Dataset" feature:** For reusing data assets across projects.

### 5. Next Steps and Progression
- **Shared Code Libraries:** You can use the same pattern to create a shared project for reusable Python functions, and have other projects add it as a dependency.

### 6. Common Challenges and Solutions
- **Challenge:** "A user can't find a project I shared with them."
- **Solution:** They may not have permission to see the **folder** the project is in. You need to ensure they have at least "Read" access to the entire folder path.
- **Challenge:** "A user changed a dataset in the shared project and broke everyone else's flow."
- **Solution:** This is why you should grant only **Reader** permissions on the shared project to most users. Only a small, designated "data steward" or "data engineering" team should have contributor rights to modify the golden datasets.
`,
  },
  {
    id: 604,
    slug: 'ensuring-auditability-with-logging-version-snapshots',
    question: 'How to get started with ensuring auditability of Dataiku workflows by enabling detailed logging and version snapshots.',
    answer: `
### 1. Introduction/Overview
Auditability—the ability to trace and prove how a result was produced—is a critical requirement for any governed analytics platform. Dataiku provides a powerful, multi-layered audit trail automatically. The key is to combine Dataiku's built-in logging with disciplined use of version control.

### 2. Prerequisites
- **A Dataiku project.**
- **Git integration** set up for your project.

### 3. Step-by-Step Instructions: The Pillars of Auditability

#### Pillar 1: Detailed Logging (Automatic)
- **What it is:** Dataiku automatically logs every job run and every significant user action.
- **How to use:**
    - **Job Logs:** For any scenario or recipe run, you can go to the **Jobs** menu and find a detailed log showing what was executed, how long it took, and any errors.
    - **Project Timeline:** In your project, go to **... > Timeline** to see a high-level, human-readable log of all changes made to the project (who created what, and when).
    - **Global Audit Log (Admin):** An admin can see a log of all security-related events for the entire instance.

#### Pillar 2: Version Snapshots of Logic (Git)
- **What it is:** This provides an immutable, point-in-time history of your project's *logic* (recipes, schemas, etc.).
- **How to use:**
    - Connect your project to a **Git** repository.
    - As you make changes, **commit** them with clear messages explaining the change.
    - The **commit history** in your Git provider (e.g., GitHub) is now your definitive audit trail for all code and configuration changes. You can see exactly what was changed, by whom, and when. You can also revert to a previous version if needed.

#### Pillar 3: Version Snapshots of Data (Partitioning)
- **What it is:** This provides a point-in-time history of your *data*.
- **How to use:**
    - For any time-based dataset, use Dataiku's **Partitioning** feature (e.g., partition by day).
    - Each partition is an immutable snapshot of the data for that specific day.
    - This allows you to go back and reproduce a result from a specific point in time using the exact data from that day.

### 4. Resources and Tools
- **Dataiku's built-in logging features.**
- **Git Integration:** For versioning your project logic.
- **Partitioning:** For versioning your data.
- **The Lineage Graph:** A visual tool that complements the logs, showing the data flow for any given output.

### 5. Next Steps and Progression
- **Formal Documentation:** For a formal audit, supplement the automated trails with a written document in the **Project Wiki** that explains the business logic and how it complies with relevant policies.
- **Automated Log Analysis:** For advanced auditing, you can ship all the Dataiku logs to an external system like Splunk or ELK for centralized analysis and alerting.

### 6. Common Challenges and Solutions
- **Challenge:** "An auditor wants to know how a specific number was calculated."
- **Solution:** This is the perfect use case for the **column-level lineage** graph. You can visually trace the calculation from the final number back to the raw source data, providing definitive proof.
- **Challenge:** "Our Git commit history is a mess."
- **Solution:** This is a team discipline issue. You must train and enforce the practice of writing clear, descriptive commit messages that explain the business reason for a change. A good commit message is a crucial part of the audit trail.
`,
  }
];

export const getQuestionBySlug = (slug: string): Question | undefined => {
  return questions.find(q => q.slug === slug);
}

export const getQuestionById = (id: number): Question | undefined => {
  return questions.find(q => q.slug === id);
}
