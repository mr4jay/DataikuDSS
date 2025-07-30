
import type { Question } from './questions';

export const governanceSecurityPerformanceQuestions: Question[] = [
  {
    id: 376,
    slug: 'what-is-dataiku-governor',
    question: 'What is the Dataiku Governor and what problem does it solve?',
    answer: `### 1. Introduction/Overview
The Dataiku Governor is a separate, dedicated product for centralized, enterprise-wide AI governance. It addresses the challenge of managing and monitoring a large portfolio of ML models and projects across multiple Dataiku instances.

### 2. Key Problems Solved
- **Lack of Central Visibility:** It provides a single dashboard to see all deployed models, their versions, and their health across the entire organization.
- **Inconsistent Standards:** It allows you to design and enforce standardized model review, validation, and approval workflows that must be completed before deployment.
- **Risk Management:** It provides tools for compliance and risk teams to assess the overall risk and business impact of the company's AI initiatives from a central location.`,
  },
  {
    id: 377,
    slug: 'implementing-approval-workflows',
    question: 'How do you implement a formal model approval workflow before production deployment?',
    answer: `### 1. Introduction/Overview
A formal approval workflow ensures that models are reviewed by multiple stakeholders (e.g., technical reviewers, business owners, compliance officers) before they are put into production.

### 2. Implementation
- **Using the Dataiku Governor:** This is the native tool for this. You can design a multi-stage workflow where each stage requires sign-off from a specific user group. A project cannot be bundled for production until all approvals are granted.
- **Manual/External Process:** Without the Governor, you can use a combination of tools. For example, use the **Sign-off** feature in a project's settings, and then manage the approval process externally in a tool like Jira. The CI/CD pipeline would be configured to check the Jira ticket's status before proceeding with the production deployment.`,
  },
  {
    id: 378,
    slug: 'data-privacy-and-pii-management',
    question: 'What are the best practices for managing data privacy and PII within Dataiku?',
    answer: `### 1. Introduction/Overview
Protecting Personally Identifiable Information (PII) is a critical governance requirement.

### 2. Best Practices
1.  **Data Masking:** Use Prepare recipe processors to hash, encrypt, or anonymize PII columns at the source.
2.  **Role-Based Access Control:** Use Dataiku's permission system to restrict access to datasets containing raw PII to only a few authorized users.
3.  **Purpose-Based Datasets:** Create multiple versions of a dataset: one fully anonymized for general analysis, one pseudonymized for modeling, and the raw version with restricted access.
4.  **Tagging:** Use the Data Catalog to tag datasets containing PII, making them easy to identify and audit.
5.  **Audit Trail:** Regularly review the audit trail to monitor who is accessing sensitive data.`,
  },
  {
    id: 379,
    slug: 'network-security-for-dss',
    question: 'What are the key network security considerations for a Dataiku instance?',
    answer: `### 1. Introduction/Overview
Network security involves controlling traffic to and from the Dataiku server.

### 2. Key Considerations
- **Firewall Rules:** The Dataiku server should be placed in a secure network zone (e.g., a private subnet in a VPC). Firewall rules should be configured to only allow incoming traffic on specific ports (like the main application port) from trusted IP ranges.
- **Egress Control:** Outgoing traffic from the Dataiku server should also be restricted, allowing it to connect only to necessary external services like databases or cloud APIs.
- **Load Balancer/Reverse Proxy:** Place a load balancer or reverse proxy (like Nginx) in front of the Dataiku server to handle SSL/TLS termination and provide an additional layer of security.`,
  },
  {
    id: 380,
    slug: 'cpu-vs-memory-intensive-recipes',
    question: 'Which Dataiku recipes are typically CPU-intensive versus memory-intensive, and how does this affect performance tuning?',
    answer: `### 1. Introduction/Overview
Understanding the resource profile of different recipes is key to performance optimization.

### 2. Recipe Profiles
- **Memory-Intensive:**
    - **Python/R Recipes:** These are the most common memory users, as they typically load entire datasets into memory as Pandas/R data frames.
    - **Visual ML Training:** The training process often requires loading the entire dataset into memory.
- **CPU-Intensive:**
    - **Visual Recipes (running in-memory):** The standard Prepare, Join, and Group recipes can be CPU-intensive when running on the Dataiku backend's internal engine.
    - **Model Training:** The actual algorithm training is very CPU-intensive (or GPU-intensive for deep learning).
- **Network/IO-Intensive:**
    - **Sync Recipe:** A Sync recipe is primarily limited by the network speed between the source and destination and the read/write speed of the storage.
    - **SQL Recipes:** The performance is almost entirely dependent on the performance of the external database.`,
  },
  {
    id: 381,
    slug: 'optimizing-python-memory',
    question: 'What are advanced techniques for optimizing memory usage in Python recipes?',
    answer: `### 1. Introduction/Overview
Beyond the basics, several techniques can dramatically reduce the memory footprint of Python recipes.

### 2. Advanced Techniques
1.  **Process in Chunks:** Instead of \`dataset.get_dataframe()\`, use an iterator to process the data in chunks: \`for df in dataset.iter_dataframes(chunksize=100000): ...\`. This is the single most effective technique.
2.  **Downcast Numeric Types:** After loading data, use \`pd.to_numeric(df['col'], downcast='integer')\` or \`downcast='float'\` to convert columns to the smallest possible numeric type.
3.  **Use Categorical Type:** For string columns with low cardinality (few unique values), convert them to Pandas' \`category\` dtype: \`df['col'] = df['col'].astype('category')\`. This can result in huge memory savings.
4.  **Use Performant Libraries:** For certain operations, libraries like \`Polars\` or \`Dask\` can be more memory-efficient than Pandas for out-of-core processing.`,
  },
  {
    id: 382,
    slug: 'cost-optimization-in-cloud',
    question: 'What are some key strategies for cost optimization when running Dataiku in the cloud?',
    answer: `### 1. Introduction/Overview
Cloud costs can escalate quickly if not managed properly.

### 2. Key Strategies
1.  **Use Ephemeral Clusters for Spark:** Configure your Spark integration (with Dataproc or EMR) to use ephemeral clusters that are created on-demand for a job and terminated immediately after. This avoids paying for idle Spark clusters.
2.  **Use Spot/Preemptible Instances:** For non-critical batch jobs or development work, use Spot Instances (AWS) or Preemptible VMs (GCP). This can reduce compute costs by up to 90%, but you must design your jobs to be fault-tolerant as these instances can be reclaimed at any time.
3.  **Right-Size Instances:** Regularly monitor the resource usage of your Dataiku nodes and adjust the instance sizes to match the actual workload. Avoid over-provisioning.
4.  **Storage Lifecycle Policies:** Implement lifecycle policies on your cloud storage (S3, GCS) to automatically move older data to cheaper storage tiers (e.g., from Standard to Infrequent Access or Glacier).`,
  },
  {
    id: 383,
    slug: 'auditing-user-activity',
    question: 'How can I perform a detailed audit of user activity in Dataiku?',
    answer: `### 1. Introduction/Overview
Dataiku provides several tools for auditing user actions for security and compliance.

### 2. Auditing Tools
- **Timeline (Project Level):** The project homepage timeline shows a high-level feed of all recent changes within that project.
- **Global Audit Trail (Admin Level):** In **Administration > Security > Audit Trail**, administrators can see a global, searchable log of significant events across the entire instance, such as logins, project creation, permission changes, and connection updates.
- **Detailed Logs:** For every job run, Dataiku keeps a detailed log that includes the user who ran it and the exact time of execution. These logs can be exported or ingested into an external logging system for analysis.`,
  },
  {
    id: 384,
    slug: 'diagnosing-slow-flow-builds',
    question: 'My Flow build is very slow. How do I diagnose the bottleneck?',
    answer: `### 1. Introduction/Overview
Diagnosing performance issues requires a systematic approach.

### 2. Diagnostic Steps
1.  **Analyze the Job Timings:** Go to the **Jobs** menu and look at the Gantt chart view of your scenario run. This will visually show you which steps are taking the longest to execute. This is your starting point.
2.  **Check the Execution Engine:** For the slowest step, check which engine it used. Is it running in-memory on the Dataiku backend? Could it be pushed down to a database or Spark?
3.  **Inspect the Recipe Code/Configuration:** If a Python recipe is slow, it could be inefficient code. If a Join recipe is slow, it could be an inefficient join key or a data skew problem.
4.  **Look at Resource Monitoring:** Check the resource monitoring dashboards in the administration settings. Was the Dataiku server's CPU or memory maxed out during the build? This could indicate that the server itself is undersized for the workload.`,
  },
  {
    id: 385,
    slug: 'flow-documentation-governance',
    question: 'How do you enforce documentation standards as part of a governance policy?',
    answer: `### 1. Introduction/Overview
Good documentation is a cornerstone of governance, but it often gets neglected.

### 2. Enforcement Strategies
1.  **Project Templates:** Create project templates that include a pre-defined Wiki structure with sections for "Business Goal," "Data Sources," "Key Outputs," etc. Users starting a new project are prompted to fill this out.
2.  **Checklists in Approval Workflows:** As part of a formal approval workflow (e.g., in the Dataiku Governor or Jira), include checklist items like "All key datasets have descriptions" and "The project Wiki is complete." The reviewer must verify these before approving.
3.  **Automated Audits:** Write a script using the Dataiku API that periodically scans projects. The script can check if datasets or columns are missing descriptions and flag non-compliant projects on a governance dashboard.`,
  },
  {
    id: 386,
    slug: 'data-quality-rules-across-projects',
    question: 'How do I implement and enforce data quality rules across multiple projects?',
    answer: `### 1. Introduction/Overview
Enforcing consistent data quality rules is essential for reliable analytics.

### 2. Implementation
1.  **Central "Golden Source" Project:** Create a central Dataiku project responsible for ingesting and cleaning core business entities (e.g., customers, products).
2.  **Define Metrics and Checks:** In this central project, define a comprehensive set of metrics and checks on these "golden" datasets.
3.  **Use Shared Datasets:** In other projects, users should not connect to the raw data sources directly. Instead, they should consume the validated, cleaned datasets from the central project using the **Shared Dataset** feature.
4.  **CI/CD Pipeline Integration:** The CI/CD pipeline for the central project should be configured to fail if any of its data quality checks fail, preventing bad data from ever reaching the downstream consumer projects.`,
  },
  {
    id: 387,
    slug: 'model-risk-management',
    question: 'What is model risk management and how does Dataiku support it?',
    answer: `### 1. Introduction/Overview
Model Risk Management (MRM) is a framework used, especially in financial services, to manage the risks associated with using ML models for decision-making.

### 2. How Dataiku Supports MRM
- **Transparency and Documentation:** Dataiku automatically generates detailed documentation for each model, including its performance, features, and training parameters. This transparency is the foundation of MRM.
- **Version Control and Auditability:** The ability to version models, track all changes, and audit who did what is crucial for regulatory compliance.
- **Fairness and Bias Analysis:** Dataiku's tools for analyzing model fairness and subpopulation performance help identify and mitigate compliance risks.
- **Monitoring and Alerts:** Automated monitoring for performance and data drift helps manage the risk of model degradation in production.
- **Approval Workflows:** The Dataiku Governor allows organizations to implement the formal review and approval workflows required by MRM policies.`,
  },
  {
    id: 388,
    slug: 'securing-the-api-node',
    question: 'What are the specific security best practices for the API node?',
    answer: `### 1. Introduction/Overview
The API node is often exposed to more network traffic than other nodes, so its security is paramount.

### 2. Best Practices
1.  **Network Segmentation:** Place the API node in a separate, more restricted network zone (e.g., a public-facing subnet or DMZ) than the design and automation nodes.
2.  **Use an API Gateway:** Place an API Gateway in front of the API node to handle authentication, rate limiting, and traffic logging. This provides a critical security layer.
3.  **Certificate-based Authentication:** Use TLS certificates to secure communication between the API gateway and the API node.
4.  **Least-Privilege Model Overrides:** Use model overrides to ensure that API endpoints run with the minimum necessary permissions and in locked-down, production-only code environments.`,
  },
  {
    id: 389,
    slug: 'in-database-vs-in-memory-performance',
    question: 'Can you provide a concrete example of the performance difference between in-database and in-memory processing?',
    answer: `### 1. Scenario
Let's say you have a 1 billion row transaction table in a Snowflake database, and you want to get the total sales for a single product category.

### 2. In-Database Approach (SQL Recipe)
- **Action:** You write a SQL recipe: \`SELECT SUM(sales) FROM transactions WHERE category = 'Electronics';\`
- **Execution:** Dataiku sends this single query to Snowflake. Snowflake's massively parallel engine scans the data, performs the aggregation, and returns a single number.
- **Performance:** Extremely fast. This could take seconds. Very little data is transferred over the network.

### 3. In-Memory Approach (Python Recipe)
- **Action:** You write a Python recipe: \`df = dataset.get_dataframe()\` followed by \`df[df['category'] == 'Electronics']['sales'].sum()\`
- **Execution:** Dataiku tries to read all 1 billion rows from Snowflake, transfer them over the network to the Dataiku server, and load them into a Pandas DataFrame in memory.
- **Performance:** This will almost certainly fail. The Dataiku server will run out of memory long before it can load the data. Even if it could, the data transfer and in-memory processing would take hours.`,
  },
  {
    id: 390,
    slug: 'choosing-the-right-instance-size',
    question: 'How do I choose the right instance size for the different Dataiku nodes?',
    answer: `### 1. Introduction/Overview
The optimal instance size depends on the node's specific role.

### 2. Sizing Guidelines
- **Design Node:** Prioritize **memory (RAM)**. This node needs to support multiple concurrent users running interactive sessions, which can be memory-intensive. CPU is important, but memory is usually the first bottleneck.
- **Automation Node:** Needs a balance of **CPU and memory**. It runs batch jobs which can be both CPU-bound (for processing) and memory-bound (for large in-memory steps). The ideal size depends on the number and size of your production scenarios.
- **API Node:** Prioritize **CPU and network throughput**. This node needs to handle many small, fast requests. Memory requirements are often lower than the other nodes, unless the models themselves are very large.
- **General Tip:** It's often better to start with a reasonable size and then monitor the actual resource usage over a few weeks. Use this data to "right-size" the instances, adjusting them up or down as needed.`,
  },
  {
    id: 391,
    slug: 'parquet-file-optimization',
    question: 'How can I optimize the structure of Parquet files for better performance?',
    answer: `### 1. Introduction/Overview
While Parquet is already performant, its internal structure can be tuned.

### 2. Optimization Techniques
1.  **Row Group Size:** Parquet files are composed of "row groups." The size of these groups is a key tuning parameter. A larger row group size (e.g., 256MB or 512MB) allows for better compression and is more efficient for sequential scans, but uses more memory when writing.
2.  **Sorting/Clustering:** Before writing a Parquet file, sort your data by the columns that you will most frequently filter on. This co-locates similar data, which dramatically improves compression and allows query engines to use "predicate pushdown" more effectively by skipping entire row groups.
3.  **Partitioning:** At a higher level, partitioning the dataset (e.g., by date) is the most effective optimization, as it allows the query engine to completely ignore files that are not relevant to the query.`,
  },
  {
    id: 392,
    slug: 'backup-and-restore-strategy',
    question: 'What is a robust backup and restore strategy for a production Dataiku instance?',
    answer: `### 1. Introduction/Overview
A robust strategy involves backing up both the Dataiku application state and the underlying data.

### 2. Strategy Components
1.  **Backup the Dataiku Data Directory:** This is the most critical component. The entire Dataiku Data Directory, which contains all project designs, configurations, and metadata, must be backed up regularly (e.g., nightly). This is typically done by taking a snapshot of the underlying storage volume (e.g., an AWS EBS snapshot).
2.  **Backup the External Database:** If you are using an external PostgreSQL database for the Dataiku backend, this must be backed up using standard database backup procedures (e.g., \`pg_dump\` or managed RDS backups).
3.  **Backup Data Sources:** Remember that Dataiku does not store the actual data for database or cloud storage datasets. You must have a separate backup strategy for your source databases and data lakes.
4.  **Restore Procedure:** A restore involves provisioning new infrastructure, restoring the Data Directory and external database from backups, and then reinstalling the same version of the Dataiku software to point to the restored directories. This process should be documented and tested regularly.`,
  },
  {
    id: 393,
    slug: 'chaos-engineering-for-pipelines',
    question: 'How could one apply chaos engineering principles to test the resilience of Dataiku data pipelines?',
    answer: `### 1. Introduction/Overview
Chaos engineering is about proactively testing a system's resilience by intentionally injecting failures.

### 2. Testing Data Pipelines
- **Inject Bad Data:** Create a scenario that intentionally introduces malformed data or null values into a source dataset and verify that your downstream data quality checks catch the issue and fail the pipeline as expected.
- **Simulate Service Unavailability:** Temporarily block network access from the Dataiku server to a critical database. Test if your scenario fails gracefully and sends the correct alert, rather than hanging indefinitely.
- **Resource Contention:** Run a "stress test" scenario that consumes a large amount of CPU or memory to see how it affects other concurrently running jobs and to test if your resource quotas are working correctly.
- **Node Failure (in HA setup):** In a high-availability setup, intentionally terminate one of the Dataiku backend nodes and verify that the load balancer correctly redirects traffic and the instance remains operational.`,
  },
  {
    id: 394,
    slug: 'data-encryption-at-rest-and-in-transit',
    question: 'How does Dataiku handle data encryption at rest and in transit?',
    answer: `### 1. Introduction/Overview
Encryption is a fundamental security requirement. Dataiku relies on the underlying infrastructure for this.

### 2. Encryption Layers
- **Encryption in Transit:** All communication between a user's browser and the Dataiku server should be encrypted using HTTPS (TLS). This is configured on the reverse proxy (e.g., Nginx) or load balancer that sits in front of Dataiku. Communication between Dataiku and external databases should also use encrypted connections (e.g., SSL/TLS), which is configured in the connection settings.
- **Encryption at Rest:** This refers to encrypting data stored on disk.
    - **Dataiku Data Directory:** This should be hosted on an encrypted storage volume (e.g., an encrypted AWS EBS volume or Azure Disk).
    - **External Data Sources:** Your cloud storage (S3, GCS) and databases (RDS, Snowflake) should all be configured to encrypt their data at rest.
Dataiku itself doesn't perform the encryption but operates securely on top of an encrypted infrastructure.`,
  },
  {
    id: 395,
    slug: 'canary-releasing-for-batch-pipelines',
    question: 'How can you apply the concept of a canary release to a batch data pipeline?',
    answer: `### 1. Introduction/Overview
While canary releases are common for APIs, the concept can be adapted for batch pipelines. It's about testing a new pipeline version on a small subset of production data before a full rollout.

### 2. Batch Canary Workflow
1.  **Deploy New Version:** Deploy the new version of your project to the automation node, but don't schedule it to run on all the data yet.
2.  **Run on a Subset:** Create a new scenario that runs the new pipeline, but only on a small, representative subset of the input data (e.g., for one small region or one partition).
3.  **Compare Outputs:** The scenario should then compare the output of this canary run with the output from the existing production pipeline for the same data subset.
4.  **Automated Validation:** The comparison can be done with a Python recipe that checks for differences. If there are no unexpected discrepancies, the canary test passes.
5.  **Promote:** After a successful canary run, you can then schedule the new pipeline to run on the full dataset.`,
  },
  {
    id: 396,
    slug: 'performance-tuning-spark-joins',
    question: 'What are the most common strategies for performance tuning a slow Spark Join in Dataiku?',
    answer: `### 1. Introduction/Overview
Slow joins are a frequent bottleneck in Spark jobs.

### 2. Tuning Strategies
1.  **Broadcast Hash Join:** If one of your datasets is significantly smaller than the other (e.g., < 100MB), you can force Spark to use a broadcast join. This sends the small dataset to every worker node, which then performs a very fast local join. This is often the most effective optimization. You can set this in the recipe's Advanced settings or with global Spark configuration.
2.  **Address Data Skew:** If your join key is skewed (a few key values appear much more often than others), one Spark task will get a huge amount of data and become a bottleneck. You can mitigate this by "salting" the join key—adding a random suffix to the skewed keys to distribute the data more evenly across partitions. This usually requires a custom PySpark recipe.
3.  **Bucketing:** You can pre-process your datasets by "bucketing" them on the join key. This pre-sorts and partitions the data so that Spark can perform the join without a costly "shuffle" step.`,
  },
  {
    id: 397,
    slug: 'governance-for-code-notebooks',
    question: 'Code notebooks can sometimes be "black boxes". What are some governance best practices for them?',
    answer: `### 1. Introduction/Overview
While notebooks are great for exploration, they need to be governed in a production environment.

### 2. Governance Best Practices
1.  **Notebooks for Exploration, Recipes for Production:** Enforce a policy that notebooks are for exploration only. Any code that is part of a production pipeline must be refactored into a version-controlled Python or SQL recipe.
2.  **Convert to Recipe:** Use Dataiku's "Convert to Recipe" feature to easily turn a notebook into a recipe in the Flow. This makes the code a formal part of the project's lineage.
3.  **Code Reviews:** For complex Python recipes, implement a code review process (e.g., using Git pull requests) before merging them into the main branch.
4.  **Linting and Style Guides:** Use automated linting tools in your CI/CD pipeline to enforce a consistent code style, making the code easier to read and maintain.`,
  },
  {
    id: 398,
    slug: 'git-lfs-with-dss',
    question: 'How does Dataiku handle large files like trained models in a Git-linked project?',
    answer: `### 1. Introduction/Overview
Standard Git is not designed to handle large binary files. The solution is Git LFS (Large File Storage).

### 2. How it Works with Dataiku
1.  **Admin Configuration:** A Dataiku administrator installs Git LFS on the Dataiku server and configures it in the global settings. They define which file patterns should be tracked by LFS (e.g., \`*.pkl\`, \`*.model\`).
2.  **Transparent Usage:** For the user, the process is transparent. When you commit your project, Dataiku automatically uses Git LFS for the large files.
3.  **Behind the Scenes:** Instead of storing the large model file directly in the Git history, Git LFS stores a small text pointer file. The actual model file is uploaded to a separate large file store. This keeps the Git repository small and fast. When you check out a branch, Git LFS downloads the large files corresponding to the pointers.`,
  },
  {
    id: 399,
    slug: 'dss-api-authentication',
    question: 'What are the different ways to authenticate with the Dataiku API?',
    answer: `### 1. Introduction/Overview
The Dataiku API supports several authentication methods.

### 2. Authentication Methods
1.  **API Keys (Most Common):** Each user can generate personal API keys from their profile. This is the standard method for scripts and CI/CD tools. The key is provided as the username in Basic Authentication.
2.  **Username/Password:** You can use a username and password with Basic Authentication. This is generally discouraged for automated systems in favor of API keys.
3.  **Kerberos:** In a Kerberos-enabled environment, the API can be configured to accept Kerberos tickets for authentication.
4.  **SSO (via Reverse Proxy):** If Dataiku is behind a reverse proxy that handles SSO, the proxy can forward the authenticated user's identity to the Dataiku API.`,
  },
  {
    id: 400,
    slug: 'dss-and-terraform-provider',
    question: 'Is there a Terraform Provider for Dataiku?',
    answer: `### 1. Introduction/Overview
Yes, there is a community-supported Terraform Provider for Dataiku. This allows you to manage Dataiku resources using Terraform's declarative syntax.

### 2. What Can You Manage with It?
- **Projects:** Create, update, and delete Dataiku projects.
- **Users and Groups:** Manage users and their group memberships.
- **Connections:** Define and manage data connections.
- **Project Variables:** Set variables for a project.
- **Code Environments:** Define and manage code environments.

### 3. Use Case
Using the Terraform Provider allows you to manage your entire Dataiku configuration as code. You can define your projects, users, and connections in \`.tf\` files and store them in version control. This is a very advanced Infrastructure-as-Code practice that ensures your Dataiku setup is reproducible and auditable.`,
  },
  {
    id: 401,
    slug: 'global-vs-project-variables',
    question: 'What is the difference between global and project variables, and what is the governance model for them?',
    answer: `### 1. Introduction/Overview
Variables store parameters, but their scope and governance differ.

### 2. Comparison
- **Project Variables:**
    - **Scope:** Specific to a single project.
    - **Governance:** Managed by the project administrator. They are for project-specific settings (e.g., a filter value for a specific region). They are included in project bundles.
- **Global Variables:**
    - **Scope:** Available to all projects across the entire Dataiku instance.
    - **Governance:** Managed by the global Dataiku administrator in the instance settings. They are for instance-wide parameters that should be consistent everywhere (e.g., the name of the production database server). They are NOT included in project bundles.

The best practice is to use project variables for most things and only use global variables for truly instance-wide, static configurations.`,
  },
  {
    id: 402,
    slug: 'disaster-recovery-plan',
    question: 'What are the key components of a disaster recovery (DR) plan for a Dataiku installation?',
    answer: `### 1. Introduction/Overview
A DR plan outlines the process for recovering Dataiku in a secondary location if the primary data center fails.

### 2. Key Components
1.  **Replication:**
    - The Dataiku Data Directory snapshot and the external database backup must be regularly replicated to a secondary DR site (e.g., a different cloud region).
2.  **Infrastructure as Code:** The infrastructure in the DR site (VMs, networking, etc.) should be defined in Terraform so it can be spun up quickly and consistently.
3.  **Recovery Point Objective (RPO):** How much data can you afford to lose? This is determined by the frequency of your backup replication (e.g., if you replicate every 4 hours, your RPO is 4 hours).
4.  **Recovery Time Objective (RTO):** How quickly do you need to be back online? This determines how much automation you build into your failover process.
5.  **Failover Procedure:** A documented, step-by-step plan for bringing the Dataiku instance online in the DR site. This includes restoring the backups, running the Terraform/Ansible scripts, and updating DNS records to point to the new location.
6.  **Regular Testing:** The DR plan must be tested regularly (e.g., once a quarter) to ensure it works.`,
  },
  {
    id: 403,
    slug: 'tracking-ml-experiments',
    question: 'How do you effectively track ML experiments, and what information should be logged?',
    answer: `### 1. Introduction/Overview
Effective experiment tracking is crucial for reproducibility and comparing models.

### 2. Information to Log
- **Code Version:** The Git commit hash of the code used for training.
- **Parameters:** All hyperparameters of the model.
- **Dataset Version:** A pointer to the specific version of the training dataset used (e.g., by using a partitioned dataset and logging the partition ID).
- **Performance Metrics:** All relevant metrics (AUC, F1-score, RMSE, etc.) on both the training and validation sets.
- **Model Artifacts:** The saved, trained model file itself.
- **Feature Importance:** The list of feature importances.

### 3. How to Track in Dataiku
Dataiku's Visual ML lab automatically tracks most of this information for you. For code-based models, you should use a tool like **MLflow** (which can be integrated with Dataiku) to explicitly log all this information to a central tracking server.`,
  },
  {
    id: 404,
    slug: 'managing-python-env-size',
    question: 'My Python code environments are becoming very large and slow to build. What can I do?',
    answer: `### 1. Introduction/Overview
Large code environments can slow down job startup times and consume a lot of disk space.

### 2. Optimization Strategies
1.  **Use a Centralized Package Cache:** An administrator can configure Dataiku to use a centralized cache for Python packages. This way, a package is only downloaded once and is shared across all environments that need it.
2.  **Create Base Images:** For containerized execution, create a "base" Docker image that contains the most common, large libraries (like PyTorch or TensorFlow). Then, create smaller, project-specific environments that inherit from this base image and only add the few extra packages they need. This avoids having to reinstall the large libraries for every environment.
3.  **Split Environments:** If a project has very different needs (e.g., a heavy deep learning part and a light data prep part), you can create two separate, smaller code environments and assign them to different recipes within the same project.`,
  },
  {
    id: 405,
    slug: 'what-are-static-api-endpoints',
    question: 'What are static API endpoints in the API Deployer, and when are they useful?',
    answer: `### 1. Introduction/Overview
A static API endpoint allows you to serve a static file or a folder of files via the API node.

### 2. Use Cases
- **Serving Model Documentation:** You could have a Python recipe that generates an HTML report about a model. You can serve this HTML report and its associated CSS/JS files via a static endpoint.
- **Providing Sample Data:** You could serve a sample CSV file that shows users how to format their requests for a prediction endpoint.
- **Serving Webapp Frontends:** For a decoupled web application, you could have a Python backend running in a custom endpoint, and use a static endpoint to serve the React/Vue.js frontend files.`,
  },
  {
    id: 406,
    slug: 'optimizing-visual-recipes',
    question: 'What is the most common performance mistake when using visual recipes?',
    answer: `### 1. The Mistake
The most common mistake is chaining together many separate visual recipes when the same logic could be accomplished in a single recipe.

### 2. Example
- **Bad:** A user has a \`Prepare\` recipe, followed by a \`Join\` recipe, followed by another \`Prepare\` recipe, and then a \`Group\` recipe. If this is all running in-memory on the DSS backend, Dataiku has to write and read an intermediate dataset to disk between each of these steps, which is very inefficient.
- **Good:** Combine the logic. The \`Join\` recipe itself allows you to do pre- and post-join computations. You can often perform the data cleaning, joining, and some final transformations all within a single, powerful Join recipe or Prepare recipe. This minimizes I/O and is much more performant.
- **Best (for DBs):** If the data is in a database, use a single SQL recipe to perform all the steps.`,
  },
  {
    id: 407,
    slug: 'data-quality-governance-dashboard',
    question: 'How would you build a global data quality governance dashboard?',
    answer: `### 1. Introduction/Overview
A global dashboard provides a single view of data quality across the entire organization.

### 2. Implementation Steps
1.  **Central Metrics Dataset:** Create a central Dataiku project. In this project, create a scenario that runs a Python script.
2.  **Use API to Collect Metrics:** The script uses the Dataiku API to iterate through all projects and key datasets. For each dataset, it fetches the latest computed metrics (e.g., row count, validity percentages) and the results of any data quality checks.
3.  **Write to a DB Table:** The script writes this collected data into a single table in a database, with columns for project, dataset name, metric name, value, and timestamp.
4.  **Build Dashboard:** Connect a BI tool (like Tableau or Power BI) or use a Dataiku Dashboard on top of this central metrics table. You can now build charts showing data quality trends over time, highlight failing checks, and filter by project or data domain.`,
  },
  {
    id: 408,
    slug: 'dss-in-a-vpc',
    question: 'What is the recommended VPC/VNet architecture for a Dataiku installation in the cloud?',
    answer: `### 1. Introduction/Overview
A well-designed network architecture isolates components and enhances security.

### 2. Recommended Architecture
- **Use Multiple Subnets:** Don't place everything in one public subnet.
- **Public Subnet:** This subnet is accessible from the internet. Place your load balancers/API gateways here.
- **Private App Subnet:** Place the Dataiku Design, Automation, and API nodes here. These instances should not have public IP addresses. They are accessed via the load balancer. Their outbound traffic should go through a NAT Gateway to access the internet (e.g., for downloading packages).
- **Private Data Subnet:** Place your databases (e.g., the RDS instance for the Dataiku backend) in an even more restricted subnet. This subnet should only allow traffic from the App Subnet, not from the internet.
This layered approach significantly improves your security posture.`,
  },
  {
    id: 409,
    slug: 'model-explainability-vs-interpretability',
    question: 'What is the difference between model explainability and interpretability?',
    answer: `### 1. Introduction/Overview
These terms are related but distinct.

### 2. Definitions
- **Interpretability:** This refers to the intrinsic property of a model. An interpretable model is one whose internal mechanics are simple enough for a human to understand.
    - **Example:** A small decision tree or a linear regression model. You can look at the model's structure or coefficients and understand exactly how it makes decisions.
- **Explainability:** This refers to the use of external techniques to explain the predictions of a model, especially a "black box" model whose internal mechanics are too complex to understand directly.
    - **Example:** Using SHAP values to explain why a complex Gradient Boosting model made a certain prediction. You don't understand the model's internals, but you can explain its behavior.

Dataiku supports both: you can train simple, interpretable models, and it provides powerful explainability tools for complex ones.`,
  },
  {
    id: 410,
    slug: 'cold-start-problem-for-models',
    question: 'How do you handle the "cold start" problem for a new recommendation model?',
    answer: `### 1. Introduction/Overview
The "cold start" problem occurs when you need to make recommendations for new users or new items that you have no historical interaction data for.

### 2. Strategies
1.  **Content-Based Fallback:** For new items, you can recommend them based on their attributes (e.g., recommend a new movie based on its genre and actors, not on user ratings).
2.  **Popularity-Based Fallback:** For new users, the simplest strategy is to recommend the most popular items overall until you have gathered some data about their preferences.
3.  **Hybrid Approach:** In Dataiku, you could implement this with a Join recipe. Try to join the user to the recommendation table (from your collaborative filtering model). For users who have no match, join them to a pre-computed "top popular items" table instead.
4.  **Exploration/Exploitation:** Intentionally show new items to some users to gather interaction data, even if they are not predicted to be the most popular.`,
  },
  {
    id: 411,
    slug: 'what-is-a-sidecar-container',
    question: 'In a Kubernetes context, what is a sidecar container and how might it be used with Dataiku?',
    answer: `### 1. Introduction/Overview
A sidecar is a secondary container that runs alongside the main application container within the same Kubernetes pod. It's used to add or extend functionality without changing the main application.

### 2. Use Case with Dataiku
- A common use case is for **logging and monitoring**.
- You could have your main Dataiku recipe running in one container.
- Alongside it, in the same pod, you could run a sidecar container with a logging agent (like Fluentd or Logstash).
- This sidecar's job is to collect the log files generated by the main recipe container and forward them to a centralized logging system (like Elasticsearch or Splunk).
This decouples the logging logic from the main application logic, making the system more modular and manageable.`,
  },
  {
    id: 412,
    slug: 'dss-and-zero-trust-security',
    question: 'How do you apply Zero Trust security principles to a Dataiku environment?',
    answer: `### 1. Introduction/Overview
Zero Trust is a security model based on the principle of "never trust, always verify." It assumes that threats can exist both inside and outside the network.

### 2. Applying Zero Trust to Dataiku
- **Micro-segmentation:** Instead of having a single trusted "internal network," you create fine-grained network policies that only allow communication between specific components that need to talk to each other (e.g., the Dataiku backend can talk to the database, but not to other random servers).
- **Strong Identity and Authentication:** Every request must be authenticated. This means enforcing SSO for all users and using certificate-based authentication for service-to-service communication.
- **Least Privilege Access:** Users and service accounts are only granted the absolute minimum permissions they need to perform their jobs.
- **Continuous Monitoring:** All activity is logged and continuously monitored for anomalous behavior.`,
  },
  {
    id: 413,
    slug: 'dss-and-finops',
    question: 'How can Dataiku be used as part of a FinOps (Cloud Financial Operations) strategy?',
    answer: `### 1. Introduction/Overview
FinOps is about bringing financial accountability to the variable spending model of the cloud.

### 2. Dataiku's Role
1.  **Cost Monitoring and Analysis:** You can use Dataiku to ingest your detailed cloud billing data (e.g., from AWS CUR or Azure Cost Management). You can then build Dataiku projects to analyze these massive datasets, identify cost drivers, and create dashboards to show which teams or projects are consuming the most resources.
2.  **Tagging and Allocation:** Enforce a strict tagging policy on all resources. The Dataiku project that analyzes the billing data can then use these tags to accurately allocate costs back to the appropriate business units.
3.  **Optimizing Workloads:** Data scientists can use Dataiku to analyze workloads and find opportunities for cost savings, for example by identifying Spark jobs that could be rewritten more efficiently in SQL.`,
  },
  {
    id: 414,
    slug: 'managing-technical-debt-in-dss',
    question: 'What are some strategies for managing technical debt in Dataiku projects?',
    answer: `### 1. Introduction/Overview
Technical debt in Dataiku can manifest as messy Flows, undocumented recipes, or inefficient pipelines created for short-term gains.

### 2. Management Strategies
1.  **Refactoring Sessions:** Schedule regular time for the team to explicitly address technical debt. This could involve refactoring a complex Python recipe, simplifying a messy part of the Flow, or improving documentation.
2.  **Automated Audits:** Write a Dataiku API script that scans projects for signs of technical debt, such as recipes with no descriptions, projects not linked to Git, or the use of deprecated processors.
3.  **Code Reviews:** Implement a formal code review process for all new Python/SQL recipes. This helps catch issues early.
4.  **Use Flow Zones:** Keep your Flows clean and organized by grouping items into logical, well-named Flow Zones. This prevents the "spaghetti Flow" problem.
5.  **Documentation:** Enforce a "documentation-as-you-go" policy. Don't let the team save documentation for the end of the project.`,
  },
  {
    id: 415,
    slug: 'dss-and-gitops',
    question: 'How can GitOps principles be applied to managing Dataiku?',
    answer: `### 1. Introduction/Overview
GitOps is a paradigm for managing infrastructure and applications where Git is the single source of truth.

### 2. Applying GitOps to Dataiku
- **Infrastructure:** The infrastructure that Dataiku runs on should be defined declaratively in Terraform files and stored in a Git repository. An automated process (like a Terraform Cloud pipeline) applies the changes from Git to the cloud environment.
- **Dataiku Configuration:** The configuration of Dataiku itself (users, connections, projects) can be managed using the Dataiku Terraform Provider, with the configuration files also stored in Git.
- **Project Deployment:** The deployment of Dataiku projects is driven by commits to the project's Git repository, which triggers a CI/CD pipeline.
In a full GitOps model, no one makes manual changes to the environment directly. All changes are made via a pull request in Git, which provides a full audit trail and a single source of truth for the state of the entire system.`,
  },
  {
    id: 416,
    slug: 'synthetic-data-generation',
    question: 'How can I use Dataiku for synthetic data generation?',
    answer: `### 1. Introduction/Overview
Synthetic data is artificially generated data that mimics the statistical properties of real data. It's useful when you have data privacy concerns or an insufficient amount of real data.

### 2. Implementation in Dataiku
1.  **Statistical Methods:** In a Python recipe, you can analyze the distribution of your real data and then use libraries like NumPy to generate new data by sampling from those same distributions.
2.  **Generative Models:** For more complex data, you can train a generative model.
    - For tabular data, you can train a Generative Adversarial Network (GAN) using a library like \`CTGAN\`.
    - For images, you can use a GAN or a diffusion model.
3.  **Workflow:** The workflow would involve a Python recipe that takes the real data as input, trains a generative model, and then uses that model to generate a new synthetic dataset as output.`,
  },
  {
    id: 417,
    slug: 'what-is-federated-learning',
    question: 'What is federated learning and can it be implemented with Dataiku?',
    answer: `### 1. Introduction/Overview
Federated learning is a machine learning technique where a model is trained across multiple decentralized devices or servers holding local data samples, without exchanging the raw data itself. This is a powerful approach for privacy-preserving ML.

### 2. Implementation with Dataiku
- This is a very advanced pattern that requires custom development. Dataiku can act as the **central coordinator**.
1.  **Model Distribution:** A central Dataiku scenario would distribute the initial model to multiple, separate "edge" environments (which could be other Dataiku instances or simple Python environments).
2.  **Local Training:** The model is trained locally in each edge environment on its own private data.
3.  **Aggregate Updates:** Instead of sending raw data back, each edge environment sends only the model updates (e.g., the weight changes) back to the central Dataiku coordinator.
4.  **Update Global Model:** The central Dataiku scenario aggregates these updates to produce a new, improved global model.
5.  This process is repeated for multiple rounds. The orchestration would be managed by a series of Python recipes and API calls.`,
  },
  {
    id: 418,
    slug: 'dss-and-event-driven-architecture',
    question: 'How can Dataiku participate in an event-driven architecture?',
    answer: `### 1. Introduction/Overview
In an event-driven architecture, services communicate via asynchronous events rather than direct API calls. Dataiku can act as both a producer and a consumer of events.

### 2. Dataiku's Role
- **As a Consumer:** Dataiku can listen to an event stream (like a Kafka topic or an AWS Kinesis stream) using a **streaming dataset**. When a specific event occurs (e.g., "new customer created"), it can trigger a real-time data processing or prediction pipeline.
- **As a Producer:** A Dataiku scenario or recipe can be configured to produce events. For example, after a model retraining scenario completes, it could publish a "model_retrained" event to a Kafka topic. Downstream services can then subscribe to this topic and react accordingly (e.g., by clearing their caches or running their own validation tests).`,
  },
  {
    id: 419,
    slug: 'blue-green-for-batch-pipelines',
    question: 'How would you implement a blue-green deployment strategy for a daily batch pipeline?',
    answer: `### 1. Introduction/Overview
Blue-green for batch pipelines involves running two parallel versions of the pipeline and then atomically switching to the new one.

### 2. Implementation Strategy
1.  **Duplicate Output Tables:** In your database, have two sets of output tables: \`sales_summary_blue\` and \`sales_summary_green\`. Have a view called \`sales_summary_prod\` that points to one of them (e.g., the blue one). Downstream consumers only query the prod view.
2.  **Parallel Runs:** Your daily scenario runs two parallel flows. The current production version writes to the blue tables, and the new version of the pipeline writes to the green tables.
3.  **Validation:** After the green pipeline completes, run automated validation checks to ensure its output is correct.
4.  **Atomic Switch:** If validation passes, run a final SQL command that atomically re-points the \`sales_summary_prod\` view to the \`sales_summary_green\` tables.
This ensures that downstream users experience zero downtime and are protected from a faulty pipeline run, as the switch only happens after the new version has been fully run and validated.`,
  },
  {
    id: 420,
    slug: 'dss-and-observability',
    question: 'Beyond monitoring, what does "observability" mean in the context of Dataiku?',
    answer: `### 1. Introduction/Overview
Observability is a superset of monitoring. While monitoring tells you *whether* a system is working, observability helps you understand *why* it isn't working. It's about being able to ask arbitrary questions about your system's state without having to pre-define a metric for it.

### 2. Observability in Dataiku
- **Monitoring (The "What"):** A dashboard shows that your scenario's success rate has dropped.
- **Observability (The "Why"):** To achieve observability, you need to collect rich, high-cardinality data.
    - **Structured Logs:** Ingest Dataiku's detailed job logs into a tool like Splunk or Elasticsearch. This allows you to search and filter logs to find the specific error message causing the failure.
    - **Distributed Tracing:** In a complex microservices-based pipeline that calls Dataiku APIs, you can use distributed tracing tools to see the entire lifecycle of a request as it flows through different services, pinpointing the exact location of a bottleneck.
    - **Rich Metrics:** Expose not just high-level metrics but also detailed, tagged metrics (e.g., recipe execution time broken down by project, recipe type, and user) to a system like Prometheus. This allows you to slice and dice the data to find the root cause of a performance issue.`,
  },
  {
    id: 421,
    slug: 'using-data-contracts-for-governance',
    question: 'How do "data contracts" serve as a governance tool?',
    answer: `### 1. Introduction/Overview
A data contract is a formal agreement between a data producer and a data consumer, defining the schema, semantics, and quality guarantees of a dataset.

### 2. Role in Governance
- **Shifts Responsibility Left:** It makes data quality a responsibility of the data producer, not the consumer. The producing team "promises" that the data will adhere to the contract.
- **Enables Automation:** The contract is not just a document; it's code. In Dataiku, this is implemented as a suite of automated checks on the dataset. The CI/CD pipeline for the producing team's project will run these checks. If a change would violate the contract, the build fails, preventing the bad data from ever being published.
- **Builds Trust:** Consumers know they can rely on the data, as it is guaranteed by an automated, enforceable contract. This reduces the need for downstream defensive data cleaning.`,
  },
  {
    id: 422,
    slug: 'optimizing-container-image-size',
    question: 'What are some techniques for optimizing the size of Docker images used for containerized execution?',
    answer: `### 1. Introduction/Overview
Large Docker images can slow down job startup times as they take longer to pull.

### 2. Optimization Techniques
1.  **Use a Slim Base Image:** Start with a slim base image (like \`python:3.9-slim-bullseye\`) instead of a full OS image.
2.  **Multi-Stage Builds:** Use a multi-stage build. In the first stage, you might install build-time dependencies and compile any necessary code. In the final stage, you copy only the necessary runtime artifacts and libraries from the first stage, leaving the build tools behind.
3.  **Clean up Caches:** In your Dockerfile, combine your \`apt-get update\`, \`install\`, and \`clean\` commands into a single \`RUN\` layer. This prevents the package manager's cache from being stored in an intermediate layer.
4.  **Use \`.dockerignore\`:** Add a \`.dockerignore\` file to exclude unnecessary files and folders (like documentation, test data, or local virtual environments) from being copied into the image.`,
  },
  {
    id: 423,
    slug: 'what-is-a-service-mesh',
    question: 'What is a service mesh (like Istio or Linkerd) and how would it relate to a Dataiku deployment on Kubernetes?',
    answer: `### 1. Introduction/Overview
A service mesh is a dedicated infrastructure layer for managing service-to-service communication in a microservices architecture. It provides features like traffic management, security, and observability.

### 2. Use with Dataiku
When Dataiku is deployed on Kubernetes, especially in a complex environment with many API nodes and containerized jobs, a service mesh can be very valuable.
- **mTLS Encryption:** It can automatically encrypt all traffic between Dataiku pods using mutual TLS (mTLS), providing strong security.
- **Traffic Management:** It can handle advanced traffic routing for canary deployments or A/B testing of Dataiku APIs without needing a separate API gateway.
- **Observability:** It automatically captures detailed metrics, logs, and traces for all traffic flowing between Dataiku components, providing deep insights into performance and errors.
- **Resilience:** It can automatically handle retries and circuit breaking if one of the Dataiku pods becomes unresponsive.`,
  },
  {
    id: 424,
    slug: 'ai-act-compliance',
    question: 'How can Dataiku help an organization prepare for compliance with regulations like the EU AI Act?',
    answer: `### 1. Introduction/Overview
The EU AI Act classifies AI systems by risk and imposes strict requirements, especially on high-risk systems, focusing on transparency, human oversight, and robustness.

### 2. How Dataiku Helps
- **Risk Assessment and Documentation:** Dataiku's collaborative environment and Wiki can be used to document the intended purpose of an AI system, which is key to its risk classification.
- **Data Governance:** Strong data governance features are crucial. You must be able to document your data sources, lineage, and any data preparation steps.
- **Transparency and Explainability:** Dataiku's automatic model documentation and XAI features (like SHAP) are essential for meeting transparency requirements and being able to explain model decisions.
- **Robustness and Accuracy:** The Visual ML lab provides a rigorous framework for testing model accuracy and robustness. The results are logged and auditable.
- **Human Oversight:** Dataiku's MLOps features allow for humans-in-the-loop, with formal approval workflows and the ability to monitor and, if necessary, deactivate a model in production.`,
  },
  {
    id: 425,
    slug: 'quantifying-technical-debt',
    question: 'How can you quantify technical debt in a Dataiku project to justify refactoring efforts to business stakeholders?',
    answer: `### 1. Introduction/Overview
To get buy-in for refactoring, you need to translate technical debt into business impact.

### 2. Quantification Methods
1.  **Measure Pipeline Runtimes:** Track the execution time of your production scenarios. If the runtime is steadily increasing due to inefficient design, you can quantify this in terms of delayed data availability or increased cloud compute costs. "This pipeline now takes 3 hours to run, costing us $X per day. A refactor could cut this to 30 minutes."
2.  **Track Failure Rates:** Monitor the failure rate of your production scenarios. If a brittle, poorly designed Flow fails frequently, you can quantify the cost of the manual interventions required to fix it each time. "The marketing pipeline fails on average twice a week, requiring 4 hours of a data scientist's time to fix it manually each time."
3.  **Measure Time to Change:** When a business stakeholder requests a change, track how long it takes to implement in a debt-ridden project versus a clean one. "A simple logic change took 3 days to implement because of the complex, undocumented Python recipe. In a clean project, this would be a 2-hour task."`,
  },
];
