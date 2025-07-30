import type { Question } from './questions';

export const mlopsQuestions: Question[] = [
  {
    id: 101,
    slug: 'deploying-a-model-to-the-flow',
    question: 'How to get started with deploying a model to the Flow?',
    answer: `### 1. Introduction/Overview
Deploying a model to the Flow is the first step in using it for batch scoring. This creates a "trained model" object in your Flow that can be connected to a **Score** recipe.

### 2. Prerequisites
- A trained model in the Visual ML Lab (e.g., a prediction model).
- A dataset you want to score (the "unseen" data).

### 3. Step-by-Step Instructions
1.  **Open the Trained Model:** In the Visual ML lab, go to the model you want to deploy (e.g., the one with the highest AUC).
2.  **Click "Deploy":** In the top-right corner of the model view, click the **Deploy** button.
3.  **Create the Model:** A dialog will appear. Give your deployed model a name and click **Create**.
4.  **View in Flow:** Go back to your Flow. You will now see a new, green, diamond-shaped object representing your trained model.

### 4. Resources and Tools
- **Dataiku Documentation on Deploying Models:** [https://doc.dataiku.com/latest/machine-learning/models/deploy.html](https://doc.dataiku.com/latest/machine-learning/models/deploy.html)

### 5. Next Steps and Progression
- Now that the model is in the Flow, the next step is to use it with a **Score** recipe to make predictions on new data.

### 6. Common Challenges and Solutions
- **Challenge:** The "Deploy" button is greyed out.
- **Solution:** You must have a trained model version selected. Make sure you have trained your model and have selected a specific version from the list on the left in the lab.
- **Challenge:** I deployed the wrong version of the model.
- **Solution:** You can delete the deployed model from the Flow and re-deploy the correct version. Alternatively, you can retrain your model in the lab and then, from the deployed model in the Flow, choose "Update" to use the newly trained version.`,
  },
  {
    id: 102,
    slug: 'using-the-score-recipe',
    question: 'How to get started with using the Score recipe?',
    answer: `### 1. Introduction/Overview
The **Score** recipe takes a trained model and a dataset and produces a new dataset containing the model's predictions. This is how you apply your model to new, unseen data in a batch process.

### 2. Prerequisites
- A deployed model in your Flow (the green diamond).
- A dataset with the same columns that the model was trained on (the "unseen" data).

### 3. Step-by-Step Instructions
1.  **Select the Deployed Model:** Click on the deployed model object in your Flow.
2.  **Create Score Recipe:** In the right-hand panel, click **Score**.
3.  **Select Input Dataset:** Choose the dataset you want to score and click **Create Recipe**.
4.  **Configure Output:** The recipe settings page will open. By default, Dataiku will output the original columns plus new columns for predictions, probabilities, and explanations. You can customize this.
5.  **Run the Recipe:** Click **Run**. A new dataset will be created in your Flow containing the scored data.

### 4. Resources and Tools
- **Dataiku Documentation on the Score Recipe:** [https://doc.dataiku.com/latest/machine-learning/models/score.html](https://doc.dataiku.com/latest/machine-learning/models/score.html)

### 5. Next Steps and Progression
- Automate the scoring process by creating a scenario that rebuilds the scored dataset on a schedule.

### 6. Common Challenges and Solutions
- **Challenge:** The recipe fails with a schema mismatch error.
- **Solution:** The input dataset for scoring must have the exact same column names and types as the dataset used to train the model. Use a **Prepare** recipe to align the schema if needed.
- **Challenge:** The recipe is slow.
- **Solution:** In the recipe's settings, go to the **Advanced** tab. If your model and data support it, you may be able to change the engine (e.g., from Python to Spark) to improve performance.`,
  },
];
