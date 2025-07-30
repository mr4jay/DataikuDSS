export interface Question {
  id: number;
  slug: string;
  question: string;
  answer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    slug: 'getting-started-with-projects',
    question: 'How to get started with Projects in Dataiku DSS?',
    answer: 'To get started with Projects in Dataiku DSS, navigate to the homepage and click on the "+ New Project" button. You can choose to create a blank project, import an existing project, or use a sample project. Give your project a name and a description, and you are ready to start adding datasets, recipes, and models.',
  },
  {
    id: 2,
    slug: 'importing-data',
    question: 'How to get started with importing data?',
    answer: 'Importing data is the first step in any analysis. In Dataiku DSS, you can import data from various sources like files (CSV, Excel), SQL databases, cloud storage (S3, GCS, Azure Blob), and various applications. From your project, click on "+ Import Your First Dataset" or go to the Flow and click "+ Dataset" to choose your data source and configure the connection.',
  },
  {
    id: 3,
    slug: 'visual-recipes',
    question: 'How to get started with Visual Recipes?',
    answer: 'Visual Recipes are a powerful, code-free way to transform your data. Select a dataset in your Flow, and from the right-hand panel, click on the recipe you need (e.g., Prepare, Join, Group). The Prepare recipe is the most common, allowing you to clean, normalize, and enrich your data through a series of interactive steps. DSS provides over 80 visual processors to handle most data preparation tasks.',
  },
  {
    id: 4,
    slug: 'using-notebooks',
    question: 'How to get started with using Notebooks?',
    answer: 'For code-based analysis, Dataiku DSS integrates with Jupyter notebooks (for Python and R) and provides a SQL notebook. To create one, go to your project, click on the "+ Recipe" or "+ Notebook" button and select the appropriate notebook type. You can easily read and write datasets from your Flow using the Dataiku API, blending code and visual components seamlessly.',
  },
  {
    id: 5,
    slug: 'building-charts',
    question: 'How to get started with building Charts?',
    answer: 'Visualizing your data is key to understanding it. In any dataset, click on the "Charts" tab. Dataiku provides a drag-and-drop interface to create various chart types like bar charts, line graphs, scatter plots, and maps. You can explore your data, identify trends, and save your charts to a dashboard for reporting.',
  },
  {
    id: 6,
    slug: 'machine-learning-models',
    question: 'How to get started with machine learning models?',
    answer: 'Dataiku DSS automates much of the machine learning workflow. In the Flow, select a dataset, and from the right panel, click on "Lab". Inside the Lab, click "New Analysis" and choose "Prediction" or "Clustering". Select your target variable and let the AutoML engine train and compare multiple algorithms, providing you with a detailed performance report.',
  },
  {
    id: 7,
    slug: 'deploying-models',
    question: 'How to get started with deploying models?',
    answer: 'Once you have a trained model you are happy with, you can deploy it to production. From the model results page, click the "Deploy" button. This will create a "saved model" in your Flow. You can then use this saved model to score new data using a "Score" recipe, or you can deploy it as a real-time API endpoint on the API Deployer.',
  },
  {
    id: 8,
    slug: 'creating-dashboards',
    question: 'How to get started with creating Dashboards?',
    answer: 'Dashboards are used to share insights with stakeholders. In your project, navigate to the "Dashboards" section. You can create a new dashboard and start adding content by clicking "Add Tile". You can add charts, metrics, dataset previews, project information, and even web applications to create a comprehensive view of your project.',
  },
  {
    id: 9,
    slug: 'collaboration-features',
    question: 'How to get started with collaboration features?',
    answer: 'Dataiku DSS is built for teams. Key collaboration features include wikis for project documentation, discussions on any object (dataset, recipe, etc.), and a timeline of all changes. You can also use Git for version control of your projects. To start, explore the "Wiki" and "Discussions" tabs within your project.',
  },
  {
    id: 10,
    slug: 'automation-scenarios',
    question: 'How to get started with automation scenarios?',
    answer: 'To automate your data pipelines, you use Scenarios. Go to the "Scenarios" section of your project and create a new one. A scenario is a sequence of steps, like rebuilding a dataset or running a model. You can trigger scenarios based on a time schedule (e.g., every day at 8 AM) or other conditions, ensuring your data and insights are always up-to-date.',
  },
  {
    id: 11,
    slug: 'data-quality-rules',
    question: 'How to get started with data quality rules?',
    answer: 'Ensuring data quality is crucial. From any dataset, go to the "Status" tab and then "Metrics". Here you can define what constitutes valid data (e.g., values in a column must be within a certain range). You can then run these metrics regularly and use scenarios to alert you if data quality drops.',
  },
  {
    id: 12,
    slug: 'using-plugins',
    question: 'How to get started with using Plugins?',
    answer: 'Plugins extend the functionality of Dataiku DSS. Go to "Administration" > "Plugins" to browse the store and install plugins. Plugins can add new dataset connectors, recipes, processors, or even full-fledged web applications. For example, you can install plugins for connecting to specific marketing APIs or for advanced NLP tasks.',
  },
];

export const getQuestionBySlug = (slug: string): Question | undefined => {
  return questions.find(q => q.slug === slug);
}

export const getQuestionById = (id: number): Question | undefined => {
  return questions.find(q => q.id === id);
}
