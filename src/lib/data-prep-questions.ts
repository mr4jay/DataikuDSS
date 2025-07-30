import type { Question } from './questions';

export const dataPrepQuestions: Question[] = [
  {
    id: 26,
    slug: 'how-to-parse-dates',
    question: 'How do I parse a date that is stored as text?',
    answer: `### 1. Introduction/Overview
It's common for dates to be imported as text (string) columns. The Prepare recipe has a powerful "Parse date" processor to convert them to a proper date format that Dataiku can understand.

### 2. Step-by-Step Instructions
1.  In a **Prepare recipe**, select the column containing the text dates.
2.  In the functions search bar, type "Parse date" and select the processor.
3.  Dataiku is very good at automatically detecting the date format (e.g., \`YYYY-MM-DD\`, \`MM/DD/YYYY\`). It will show you a preview.
4.  If it fails to detect the format, you can manually enter it using standard date format codes.
5.  After running the step, the column's type will change from string to date, and you can perform date-specific operations on it.`,
  },
  {
    id: 27,
    slug: 'what-is-the-formula-processor',
    question: 'What is the Formula processor and how do I use it?',
    answer: `### 1. Introduction/Overview
The **Formula** processor in the Prepare recipe allows you to create a new column or modify an existing one using an Excel-like expression language. It's incredibly powerful for custom transformations.

### 2. Step-by-Step Instructions
1.  In a **Prepare recipe**, click **+ ADD A NEW STEP** and select **Formula**.
2.  Give your new column a name in the **Output column** field.
3.  In the **Expression** box, write your formula. You can reference other columns by their names.
    - **Example 1 (Math):** \`revenue - cost\`
    - **Example 2 (String manipulation):** \`substring(customer_name, 0, 5)\`
    - **Example 3 (Conditional logic):** \`if(country == 'USA', 'Domestic', 'International')\`
4.  The interface provides a full list of available functions and syntax help.`,
  },
  {
    id: 28,
    slug: 'how-to-split-a-column',
    question: 'How can I split a single column into multiple columns?',
    answer: `### 1. Introduction/Overview
You can easily split a column based on a delimiter using the "Split column" processor in the Prepare recipe.

### 2. Step-by-Step Instructions
1.  In a **Prepare recipe**, select the column you want to split (e.g., a column named \`full_name\` with values like "Doe,John").
2.  Search for and select the **Split column** processor.
3.  Enter the **delimiter**. For our example, this would be a comma \`,\`.
4.  Dataiku will automatically suggest names for the new columns (e.g., \`full_name_0\`, \`full_name_1\`). You can rename them.
5.  Run the step, and you will have two new columns: one for the last name and one for the first name.`,
  },
  {
    id: 29,
    slug: 'how-to-use-python-in-prepare-recipe',
    question: 'Can I use Python code inside a Prepare recipe?',
    answer: `### 1. Introduction/Overview
Yes, you can. While the Formula processor is powerful, sometimes you need more complex logic. The **Python function** processor allows you to run custom Python code on a row-by-row basis within a visual Prepare recipe.

### 2. How to Use It
1.  In a **Prepare recipe**, add a new step and select **Python function**.
2.  You will be given a code template:
    \`\`\`python
    def process(row):
        # 'row' is a dictionary-like object of the current row's values
        # Example: val = row['column_name']
        return "your_computed_value"
    \`\`\`
3.  Write your Python code inside the function. The function takes the current row as input and must return the new value for your output column. This is very efficient for complex custom logic without needing a full Python recipe.`,
  },
  {
    id: 30,
    slug: 'what-are-window-functions',
    question: 'How do I use Window functions?',
    answer: `### 1. Introduction/Overview
The **Window** recipe is a visual tool for computing aggregations over a "window" or a group of rows related to the current row. It's like a Group recipe, but it doesn't collapse the rows; it adds the calculation to each row.

### 2. Common Use Cases
- **Ranking:** Rank sales within each region.
- **Moving Averages:** Calculate the 7-day moving average of a stock price.
- **Cumulative Sum:** Calculate the cumulative sum of sales over time.

### 3. Step-by-Step Instructions
1.  Select a dataset and choose the **Window** recipe.
2.  Define the **Partitioning** (the "group by" columns, e.g., \`Region\`).
3.  Define the **Ordering** (the column to sort by within each partition, e.g., \`Date\`).
4.  Define your **Aggregations**, such as a cumulative sum of \`Sales\` or a moving average.`,
  },
  {
    id: 31,
    slug: 'how-to-flag-duplicate-rows',
    question: 'How can I flag or remove duplicate rows?',
    answer: `### 1. Introduction/Overview
The **Distinct** (or Deduplicate) recipe is designed for this purpose.

### 2. Step-by-Step Instructions
1.  In the Flow, select the dataset you want to deduplicate.
2.  In the right-hand panel, select the **Distinct** recipe.
3.  In the recipe settings, select the column(s) you want to use to define uniqueness. For example, if you select \`customer_id\`, the recipe will keep only the first occurrence of each customer.
4.  Click **Run**. The output dataset will contain only unique rows based on your selected columns.`,
  },
  {
    id: 32,
    slug: 'how-to-pivot-a-table',
    question: 'How do I pivot a table?',
    answer: `### 1. Introduction/Overview
The **Pivot** recipe lets you transform a "long" table into a "wide" table by turning unique values from a column into new columns.

### 2. Step-by-Step Instructions
1.  Select your dataset and choose the **Pivot** recipe.
2.  **Rows to keep:** Select the column(s) that will remain as rows (e.g., \`Date\`).
3.  **Column to create columns from:** Select the column whose values will become the new column headers (e.g., \`Product_Category\`).
4.  **Values:** Select the column whose values will populate the new pivoted columns (e.g., \`Sales\`).
5.  Choose an **aggregation** method (e.g., sum, average).
6.  Running this would transform a long table of Date, Category, and Sales into a wide table where each product category has its own sales column.`,
  },
  {
    id: 33,
    slug: 'what-are-regular-expressions',
    question: 'How do I use regular expressions (regex) in a Prepare recipe?',
    answer: `### 1. Introduction/Overview
Regular expressions are a powerful way to find and extract patterns in text. Several processors in the Prepare recipe support regex.

### 2. Common Processors
- **Filter:** You can filter rows where a column matches a specific regex pattern.
- **Find and Replace:** Use a regex to find a pattern and replace it with something else.
- **Extract with regular expression:** The most powerful one. You can define a regex with capture groups, and it will create new columns from the captured text. For example, you could extract the domain name from an email address.`,
  },
  {
    id: 34,
    slug: 'what-is-the-stack-recipe',
    question: 'What is the Stack recipe used for?',
    answer: `### 1. Introduction/Overview
The **Stack** recipe is used to append or concatenate multiple datasets vertically. It's equivalent to a \`UNION ALL\` in SQL.

### 2. Key Requirements
- The datasets you want to stack should have the same or similar schemas (i.e., the same column names and types).
- Dataiku can automatically align columns by name, so they don't have to be in the same order.

### 3. How to Use It
1.  Select one of the datasets you want to stack.
2.  Choose the **Stack** recipe.
3.  Click **+ Add Dataset to Stack** and select the other datasets.
4.  Run the recipe. The output will contain all the rows from all the input datasets.`,
  },
  {
    id: 35,
    slug: 'how-to-geographically-enrich-data',
    question: 'How can I enrich my data with geographical information?',
    answer: `### 1. Introduction/Overview
Dataiku has built-in processors for geo-enrichment. If you have latitudes and longitudes, or geographic names like cities or countries, you can enrich your data.

### 2. Common Geo-processors in the Prepare Recipe
- **Create GeoPoint from lat/lon:** Combines separate latitude and longitude columns into a single GeoPoint object that Dataiku can map.
- **Resolve GeoIP:** Converts an IP address into an approximate location (city, country).
- **Enrich with administrative divisions:** From a GeoPoint, it can extract the city, state, or country it belongs to. This uses an internal geo-database.`,
  },
  {
    id: 36,
    slug: 'what-is-a-sync-recipe',
    question: 'What is a Sync recipe?',
    answer: `### 1. Introduction/Overview
The **Sync** recipe is a simple but useful recipe for moving or copying data from one storage connection to another without any transformation.

### 2. Common Use Cases
- **Moving data from cloud storage to a database:** You might land a raw CSV file in Amazon S3, then use a Sync recipe to load it into a high-performance Snowflake or PostgreSQL database for querying.
- **Changing data formats:** Syncing from one filesystem connection to another but changing the format from CSV to Parquet for better performance.`,
  },
  {
    id: 37,
    slug: 'how-to-filter-data',
    question: 'What is the best way to filter data?',
    answer: `### 1. Introduction/Overview
Filtering is a fundamental data preparation step. Dataiku offers several ways to do it.

### 2. Filtering Methods
- **Filter processor in a Prepare recipe:** This is the most common method. It's visual, powerful, and allows for complex conditions. You can filter on values, date ranges, or use formulas.
- **Filter recipe:** There is a dedicated **Filter** recipe that is a simplified version of the Prepare recipe, useful if filtering is the only thing you need to do.
- **SQL recipe:** For datasets in a database, writing a \`WHERE\` clause in a SQL recipe is often the most performant way to filter, as the work is pushed down to the database.
- **Sampling:** In the **Explore** tab of a dataset, you can apply a filter to your current view of the data, but this is just for exploration and doesn't create a new dataset.`,
  },
  {
    id: 38,
    slug: 'how-to-handle-json-data',
    question: 'How do I work with data stored in a JSON column?',
    answer: `### 1. Introduction/Overview
Dataiku has specific tools for handling semi-structured JSON data.

### 2. How to Use
1.  In the **Explore** tab, for a column that contains JSON, Dataiku will often auto-detect it and show you a "View as JSON" option.
2.  In a **Prepare recipe**, you can use the **Unnest object** or **Unnest array** processors.
3.  If a column contains a JSON object with keys, **Unnest object** will create new columns for each key.
4.  If a column contains a JSON array, **Unnest array** will create new rows for each item in the array.
5.  This allows you to flatten complex JSON into a standard tabular format.`,
  },
  {
    id: 39,
    slug: 'what-are-column-coders',
    question: 'What are column coders in the Prepare recipe?',
    answer: `### 1. Introduction/Overview
Coders are processors used to transform categorical or text columns into numerical representations, which is a required step for most machine learning algorithms.

### 2. Common Coders
- **Dummy-encode:** This is also known as one-hot encoding. It takes a column with N categories and creates N-1 new binary (0/1) columns.
- **Label-encode:** This assigns a unique integer to each category (e.g., "USA" -> 0, "UK" -> 1, "France" -> 2).
- **Hashing:** Converts text into a fixed-size numerical vector.`,
  },
  {
    id: 40,
    slug: 'how-to-use-the-binning-processor',
    question: 'How do I use the Binning processor?',
    answer: `### 1. Introduction/Overview
Binning (or discretization) is the process of converting a continuous numerical variable into a discrete categorical one. This can help some machine learning models perform better.

### 2. How to Use
1.  In a **Prepare recipe**, select a numerical column (e.g., \`Age\`).
2.  Choose the **Bin column** processor.
3.  You can choose the binning mode:
    - **Equal-width:** Creates bins of the same size (e.g., 0-10, 11-20, 21-30).
    - **Equal-frequency:** Creates bins with the same number of records in each.
    - **Custom:** Manually define the boundaries for your bins.
4.  This will create a new column with labels for each bin (e.g., "0-10", "11-20").`,
  },
];
