import type { Question } from './questions';

export const mlQuestions: Question[] = [
  {
    id: 41,
    slug: 'what-is-visual-ml',
    question: 'What is Visual ML?',
    answer: `### 1. Introduction/Overview
**Visual ML** is Dataiku's guided, interactive framework for creating machine learning models. It automates much of the ML workflow, from feature engineering to algorithm selection and tuning, allowing both beginners and experts to build powerful models quickly.

### 2. Key Steps in the Visual ML Interface
1.  **Select Task:** Choose your ML task (e.g., Prediction, Classification, Clustering).
2.  **Select Target:** Define the variable you want to predict.
3.  **Design:** Configure the model design, including feature handling, algorithm selection, and training settings.
4.  **Train:** Train multiple algorithms in parallel.
5.  **Analyze Results:** Compare model performance using various metrics, charts, and interpretation tools.
6.  **Deploy:** Deploy the best-performing model to the Flow.`,
  },
  {
    id: 42,
    slug: 'classification-vs-regression',
    question: 'What is the difference between a classification and a regression model?',
    answer: `### 1. Introduction/Overview
Both are types of supervised machine learning, but they predict different kinds of outputs.

### 2. Key Differences
- **Classification:** Predicts a discrete category or class. The output is a label.
    - **Examples:**
        - Will this customer churn? (Yes/No)
        - Is this email spam or not spam?
        - What is the product category? (Books, Electronics, Clothing)
- **Regression:** Predicts a continuous numerical value. The output is a number.
    - **Examples:**
        - What will be the price of this house?
        - How many units will this product sell?
        - What will the temperature be tomorrow?`,
  },
  {
    id: 43,
    slug: 'how-to-interpret-model-results',
    question: 'How do I interpret the results of a model?',
    answer: `### 1. Introduction/Overview
After training a model in Visual ML, the **Results** page offers many tools for interpretation.

### 2. Key Interpretation Tools
- **Model Summary:** Shows the main performance metric (e.g., AUC for classification, R² for regression).
- **Feature Importance:** Ranks the features by how much they contributed to the model's predictions. This is key for understanding what drives the outcome.
- **Confusion Matrix (Classification):** Shows where the model was correct and where it made mistakes (e.g., predicting "Yes" when the reality was "No").
- **Partial Dependence Plots:** Shows the marginal effect of a single feature on the model's prediction, holding all other features constant.
- **Individual Explanations:** Explains why the model made a specific prediction for a single row of data.`,
  },
  {
    id: 44,
    slug: 'what-is-feature-engineering',
    question: 'What is feature engineering and how is it handled in DSS?',
    answer: `### 1. Introduction/Overview
**Feature engineering** is the process of creating new input features for your model from existing raw data. It is often the most critical factor in a model's performance.

### 2. How DSS Handles It
- **Visually (Prepare recipe):** Most feature engineering is done here. Examples include binning numerical variables, creating interaction terms with the Formula processor, or extracting date components.
- **Automated (Visual ML):** In the **Design** tab of the Visual ML interface, you can enable automated feature handling:
    - **Numerical features:** Can be rescaled (e.g., normalized).
    - **Categorical features:** Can be dummy-encoded or hashed.
    - **Text features:** Can be vectorized using TF-IDF.`,
  },
  {
    id: 45,
    slug: 'how-to-handle-unbalanced-classes',
    question: 'My classification target is highly unbalanced. How do I handle this?',
    answer: `### 1. Introduction/Overview
An unbalanced dataset is one where the classes in the target variable are not represented equally (e.g., 99% "No Churn" and 1% "Churn"). This can cause the model to be biased towards the majority class.

### 2. How to Handle it in Visual ML
1.  In the **Design** tab of your classification model, go to the **Training** section.
2.  Find the **Class rebalancing** strategy.
3.  You can enable strategies like:
    - **Class weights:** This tells the algorithm to pay more attention to the minority class during training.
    - **Oversampling (e.g., SMOTE):** This creates synthetic new samples of the minority class.
    - **Undersampling:** This removes samples from the majority class.
4.  It's a good practice to try different strategies and see which one improves your chosen performance metric (like Recall or F1-score).`,
  },
  {
    id: 46,
    slug: 'what-is-the-score-recipe',
    question: 'What does the Score recipe do?',
    answer: `### 1. Introduction/Overview
The **Score recipe** takes a deployed model and a dataset to be scored, and it outputs a new dataset containing the model's predictions.

### 2. Step-by-Step Instructions
1.  In the Flow, select the deployed model (the green diamond) that you want to use.
2.  In the right-hand panel, click **Score**.
3.  Select the input dataset that has the same features as the training data.
4.  Click **CREATE RECIPE**.
5.  The output dataset will contain all the columns from the input, plus new columns for the prediction, probabilities for each class (if classification), and individual prediction explanations.`,
  },
  {
    id: 47,
    slug: 'what-is-hyperparameter-tuning',
    question: 'What is hyperparameter tuning?',
    answer: `### 1. Introduction/Overview
**Hyperparameters** are the settings of a machine learning algorithm that are not learned from the data but are set prior to training (e.g., the depth of a decision tree, the learning rate of a gradient boosting model). **Hyperparameter tuning** is the process of finding the optimal combination of these settings.

### 2. How to do it in Visual ML
1.  In the **Design > Algorithms** section of your model, you can select which algorithms to train.
2.  For each algorithm, you can click on its name to see its hyperparameters.
3.  Visual ML trains a version with default parameters, but you can also enable **Grid Search** or **Random Search** to automatically train many versions with different hyperparameter combinations and find the best one.`,
  },
  {
    id: 48,
    slug: 'how-to-do-clustering',
    question: 'How do I perform clustering analysis?',
    answer: `### 1. Introduction/Overview
Clustering is an **unsupervised** machine learning task that groups similar data points together into clusters without a predefined target variable.

### 2. Step-by-Step Instructions
1.  In the Flow, select your dataset and go to the **Lab**.
2.  Choose **Clustering** as the ML task.
3.  Select the features you want to use to create the clusters.
4.  Choose the clustering algorithms to train (e.g., K-Means, Hierarchical). For K-Means, you'll need to specify the number of clusters to find.
5.  Train the models. The result will be a new column in your dataset that assigns a cluster ID to each row. You can then analyze the characteristics of each cluster.`,
  },
  {
    id: 49,
    slug: 'what-is-a-train-test-split',
    question: 'What is a train/test split and why is it important?',
    answer: `### 1. Introduction/Overview
When training a model, the data is typically split into two sets:
- **Training Set:** The majority of the data, used to train the model.
- **Test Set (or Validation Set):** A smaller, held-out portion of the data that the model has never seen. It's used to evaluate the model's performance on unseen data.

### 2. Why it's important
This process is crucial to avoid **overfitting**. A model that is overfitted has learned the training data too well (including its noise) and will not perform well on new, real-world data. Evaluating on the test set gives you a realistic estimate of how the model will generalize. Dataiku's Visual ML handles this split automatically.`,
  },
  {
    id: 50,
    slug: 'what-is-cross-validation',
    question: 'What is K-fold cross-validation?',
    answer: `### 1. Introduction/Overview
**K-fold cross-validation** is a more robust technique for model evaluation than a simple train/test split, especially with smaller datasets.

### 2. How it works
1.  The data is split into K "folds" or subsets (e.g., 5 or 10).
2.  The model is trained K times.
3.  In each run, one fold is used as the test set, and the other K-1 folds are used for training.
4.  The final performance metric is the average of the metrics from all K runs.

This gives a more stable and reliable estimate of the model's performance. You can enable cross-validation in the **Design > Training** settings of Visual ML.`,
  },
  {
    id: 51,
    slug: 'how-to-code-your-own-model',
    question: 'Can I code my own model instead of using Visual ML?',
    answer: `### 1. Introduction/Overview
Yes, absolutely. For maximum flexibility, you can create your own prediction model in a Python notebook and deploy it to the Flow.

### 2. How to Do It
1.  Develop your model in a Jupyter notebook in Dataiku. Use a library like \`scikit-learn\`, \`TensorFlow\`, or \`PyTorch\`.
2.  When your model is ready, save the trained model object (e.g., as a pickle file) into a **managed folder**.
3.  Create a **Python recipe** that takes a new dataset as input. This recipe will load your saved model from the managed folder and use it to score the new data, writing the predictions to an output dataset.
4.  This code-based approach gives you full control over the modeling process.`,
  },
  {
    id: 52,
    slug: 'what-is-model-drift',
    question: 'What is model drift and how can I monitor it?',
    answer: `### 1. Introduction/Overview
**Model drift** (or concept drift) is the degradation of a model's predictive performance over time. This happens because the statistical properties of the real-world data the model sees in production change from the data it was trained on.

### 2. How to Monitor in DSS
1.  When you deploy a model and use it to score new data, Dataiku can automatically compute **data drift** metrics.
2.  On your deployed model in the Flow, go to the **Versions** tab.
3.  You can set up regular **performance checks** that compare the statistical distributions of the scoring data against the training data.
4.  You can also track the model's performance over time if you have the actual outcomes.
5.  If significant drift is detected, it's a signal that the model needs to be retrained on more recent data.`,
  },
  {
    id: 53,
    slug: 'what-are-deep-learning-models',
    question: 'Does Dataiku support deep learning models?',
    answer: `### 1. Introduction/Overview
Yes, Dataiku supports deep learning for tasks like image classification and natural language processing.

### 2. How it Works
- **Visual ML:** For some tasks like image classification, there are pre-built deep learning models (using Keras/TensorFlow) available directly in the Visual ML interface. You can use transfer learning to fine-tune pre-trained models like InceptionV3 or ResNet50.
- **Code Environments:** The primary way to use deep learning is through code. You can set up a code environment with GPUs and the necessary libraries (TensorFlow, PyTorch) and build your models in Python notebooks and recipes.`,
  },
  {
    id: 54,
    slug: 'how-to-explain-a-black-box-model',
    question: 'My model is a "black box" (e.g., Gradient Boosting). How can I explain its predictions?',
    answer: `### 1. Introduction/Overview
Explaining complex models is crucial for building trust with stakeholders. Dataiku provides several model-agnostic interpretation tools.

### 2. Key Tools for Explainability
- **Feature Importance:** Even for complex models, this shows which features had the biggest impact overall.
- **Partial Dependence Plots:** These show how the model's prediction changes as you vary a single feature.
- **Individual Prediction Explanations (SHAP):** For any single prediction, Dataiku can use the SHAP (SHapley Additive exPlanations) algorithm to show which feature values pushed the prediction up or down from the average. This is extremely powerful for explaining individual decisions.
- **Subpopulation Analysis:** You can check if your model performs differently for different segments of your data (e.g., for different regions or customer types).`,
  },
  {
    id: 55,
    slug: 'what-are-saved-models',
    question: 'What is the difference between a Lab model and a Saved Model (green diamond)?',
    answer: `### 1. Introduction/Overview
It's important to understand the model lifecycle in Dataiku.

### 2. Key Differences
- **Lab Model (in the Visual Analysis Lab):** This is an *experiment*. It's a trained model version that lives inside the Lab. You can create dozens of these as you experiment with different features and algorithms. They are not part of the automated Flow.
- **Saved Model (or Deployed Model, the green diamond):** This is a *production-ready asset*. It is created when you click **Deploy** on a specific Lab model version. This deployed model becomes an object in the Flow, and it's the one that can be used by other recipes (like Score) and put into production scenarios. It has versions, and you can retrain it.`,
  },
  {
    id: 56,
    slug: 'what-is-the-evaluation-recipe',
    question: 'What is the Model Evaluation recipe?',
    answer: `### 1. Introduction/Overview
The **Evaluate** recipe is used to assess the performance of a trained model on a new, labeled dataset. This is useful for validating a model's performance on out-of-time data.

### 2. How to Use
1.  In the Flow, select the deployed model you want to evaluate.
2.  Choose the **Evaluate** recipe.
3.  As input, provide a dataset that contains both the features and the actual ground-truth labels (the target variable).
4.  The recipe will score the data and then compare the predictions to the actual labels.
5.  The output is a metrics dataset that contains performance metrics like AUC, R², precision, recall, etc., allowing you to track performance over time.`,
  },
  {
    id: 57,
    slug: 'how-to-use-a-model-in-a-python-recipe',
    question: 'How do I load and use a saved model in a Python recipe?',
    answer: `### 1. Introduction/Overview
You can programmatically interact with deployed models using the Dataiku Python API.

### 2. Sample Code
\`\`\`python
import dataiku
import pandas as pd

# Load the model and the dataset to score
model = dataiku.Model("YOUR_MODEL_ID") # Get the ID from the model's URL or settings
dataset_to_score = dataiku.Dataset("your_input_dataset")
df = dataset_to_score.get_dataframe()

# Use the model to make predictions
predictor = model.get_predictor()
predictions_df = predictor.predict(df)

# Write the output
output_dataset = dataiku.Dataset("your_output_dataset")
output_dataset.write_with_schema(predictions_df)
\`\`\`
This allows you to integrate a visually-built model into a more complex, code-based workflow.`,
  },
  {
    id: 58,
    slug: 'what-is-unsupervised-learning',
    question: 'What is unsupervised learning?',
    answer: `### 1. Introduction/Overview
**Unsupervised learning** is a type of machine learning where the algorithm learns patterns from data that has not been labeled or categorized. There is no "target" variable.

### 2. Common Tasks
- **Clustering:** Automatically grouping similar data points together (e.g., customer segmentation).
- **Dimensionality Reduction (e.g., PCA):** Reducing the number of features in a dataset while retaining as much information as possible.
- **Anomaly Detection:** Identifying rare or unusual data points that don't fit the normal patterns.

In Dataiku, Clustering and Dimensionality Reduction are available as tasks in the Visual ML Lab.`,
  },
  {
    id: 59,
    slug: 'how-to-set-a-cost-matrix',
    question: 'How do I use a cost matrix in a classification model?',
    answer: `### 1. Introduction/Overview
A **cost matrix** is used in classification when the costs of different kinds of errors are not equal. For example, failing to predict a fraudulent transaction (a false negative) might be 100 times more costly than incorrectly flagging a legitimate transaction as fraud (a false positive).

### 2. How to Use in Visual ML
1.  In the **Design > Training** settings of your classification model, you can set a custom performance metric.
2.  One of the options is to define a **Cost Matrix**.
3.  You can specify the cost for each cell of the confusion matrix (True Positives, True Negatives, False Positives, False Negatives).
4.  Dataiku will then optimize the model's prediction threshold to minimize the total cost, rather than just optimizing for accuracy.`,
  },
  {
    id: 60,
    slug: 'what-is-interactive-scoring',
    question: 'What is interactive scoring and what-if analysis?',
    answer: `### 1. Introduction/Overview
On the **Results** page of a trained model, Dataiku provides an interactive scoring panel for "what-if" analysis.

### 2. How to Use
1.  Go to the **Interactive Scoring** tab.
2.  You will see a form with all the input features.
3.  You can manually change the values of the features and click **Predict** to see in real-time how the model's prediction changes.
4.  This is a powerful tool for business users to get a feel for the model's behavior and understand the relationships it has learned without needing to score an entire dataset.`,
  },
];
