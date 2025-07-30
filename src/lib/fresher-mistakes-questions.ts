
export interface Question {
  id: number;
  slug: string;
  question: string;
  answer: string;
}

export const questions: Question[] = [
  {
    id: 301,
    slug: 'when-to-use-prepare-vs-python-recipe',
    question: 'How to get started with understanding when to use a Prepare recipe vs. a Python recipe?',
    answer: `
### 1. Introduction/Overview
Choosing between a visual Prepare recipe and a code-based Python recipe is a fundamental architectural decision in Dataiku. The general principle is **"visual first."** This guide helps you understand the decision framework, enabling you to build pipelines that are both powerful and maintainable.

### 2. Prerequisites
- **A clear transformation goal:** Know what you need to do to the data.
- **Familiarity with the Prepare recipe's processors.**
- **Basic Python and Pandas knowledge** (if considering the Python recipe).

### 3. Step-by-Step Instructions
1.  **Default to the Prepare Recipe:** Always start by trying to implement your logic in a Prepare recipe. Its visual nature makes it transparent and easy for others to understand.
2.  **Identify Your Task's Category:**
    *   **Data Cleaning:** (e.g., handling nulls, filtering rows, standardizing text). Use **Prepare**.
    *   **Feature Engineering:** (e.g., creating new columns with formulas, parsing dates, splitting strings). Use **Prepare**.
    *   **Complex Custom Logic:** (e.g., iterative calculations, custom algorithms, complex conditional logic). Use **Python**.
    *   **External Integration:** (e.g., calling an external REST API, using a specific library not in Dataiku). Use **Python**.
3.  **Evaluate Complexity:** If your Prepare recipe script grows to over 30-40 steps, consider if a Python recipe would be more concise and readable for that specific, complex part of the logic.

### 4. Resources and Tools
- **Prepare Recipe Processor Library:** Your first stop for any transformation.
- **Python Recipe:** Your tool for ultimate flexibility.
- **Team's Coding Standards:** A guide for when and how to write code.

### 5. Next Steps and Progression
- **Hybrid Approach:** A common pattern is to use a Prepare recipe for 90% of the cleaning and then a Python recipe for one specific, complex step. The output of the Python recipe can then be fed into another visual recipe.
- **Custom Processors:** For reusable logic, a senior developer can create a custom processor in Python that can then be used visually within a Prepare recipe.

### 6. Common Challenges and Solutions
- **Challenge:** "My logic is possible in Prepare, but it takes many steps."
- **Solution:** This is a judgment call. If the logic is clearer and more maintainable as a 10-line Python function than as 20 complex visual steps, then Python is the right choice.
- **Challenge:** "Which is more performant?"
- **Solution:** A Prepare recipe running on a database (SQL) or Spark engine will almost always be more performant than a Python recipe processing large data in-memory. Performance should be a key factor in your decision.
`,
  },
  {
    id: 302,
    slug: 'parsing-dates-when-dataiku-misdetects-format',
    question: 'How to get started with parsing dates when Dataiku misdetects format?',
    answer: `
### 1. Introduction/Overview
Dates often come in non-standard string formats, and Dataiku's automatic detection might not guess the format correctly. Manually specifying the date format in a Prepare recipe is a fundamental data cleaning skill.

### 2. Prerequisites
- **A dataset with a date column** that is currently a "string" data type.
- **Knowledge of the date format** used in the string (e.g., is it \`Month-Day-Year\` or \`Day/Month/Year hh:mm:ss\`?).

### 3. Step-by-Step Instructions
1.  **Open a Prepare Recipe:** Start a new Prepare recipe on your dataset.
2.  **Select the "Parse date" Processor:** Click the header of your string-based date column. From the processor list, choose **Parse date**.
3.  **Manually Specify the Format:**
    *   The processor will try to auto-detect the format. If it fails or is incorrect, uncheck the "auto-detect" option.
    *   An input field will appear. Here, you must type the format that matches your data.
    *   **Example:** If your data looks like "25-Dec-2023", the format is \`dd-MMM-yyyy\`.
    *   **Example:** If your data is "01/15/2024 14:30", the format is \`MM/dd/yyyy HH:mm\`.
4.  **Preview and Run:** The preview pane will show if the parsing was successful. If the output column looks correct, run the recipe.

### 4. Resources and Tools
- **"Parse date" Processor:** The primary tool for this task.
- **Date Format Cheatsheet:** In the "Parse date" processor UI, there is often a link to a help page that shows all the possible format codes (\`yyyy\`, \`MM\`, \`dd\`, \`HH\`, etc.). This is an essential reference.

### 5. Next Steps and Progression
- **Handling Multiple Formats:** If a single column contains dates in multiple different formats, you may need to use a more advanced approach with multiple "Parse date" steps, each filtering for a specific pattern.
- **Time Zone Handling:** After parsing a date, you can use other processors to handle time zone conversions if necessary.

### 6. Common Challenges and Solutions
- **Challenge:** "The processor creates all null values."
- **Solution:** This means the format you specified does not match the data. Check your format string very carefully for typos. Even a small difference (like a hyphen vs. a slash) will cause the parsing to fail.
- **Challenge:** "Some dates parse correctly, but others don't."
- **Solution:** Your column likely contains mixed formats. Use a **Filter** step to isolate the rows that are failing and inspect their format. You may need a separate "Parse date" step just for them.
`,
  },
  {
    id: 303,
    slug: 'handling-nulls-when-find-replace-fails',
    question: 'How to get started with handling nulls when the Find & Replace processor fails?',
    answer: `
### 1. Introduction/Overview
A "null" value in a database or dataset is a special state representing the absence of data. It is not the same as an empty string ("") or the string "null". The "Find & Replace" processor works on string values and therefore cannot find or replace nulls. This guide shows you the correct tools for handling nulls.

### 2. Prerequisites
- **A dataset with missing (null) values.**
- **A clear strategy** for what to do with the nulls (e.g., remove them, fill them).

### 3. Step-by-Step Instructions
1.  **Open a Prepare Recipe** on your dataset. Dataiku's data quality bars will immediately show you which columns contain nulls.
2.  **Choose the Correct Processor based on your goal:**
    *   **To Remove Rows with Nulls:**
        *   Click the column header.
        *   Select the processor: **Remove rows where value is empty**.
    *   **To Fill Nulls with a Specific Value (Imputation):**
        *   Click the column header.
        *   Select the processor: **Impute missing values**.
        *   You can then choose to fill with the mean, median, a constant value (like 0 or "Unknown"), etc.
    *   **To Filter for Null or Non-Null Rows:**
        *   Add a **Filter** step.
        *   In the filter options, choose the column and select the condition **is empty** or **is not empty**.

### 4. Resources and Tools
- **The Data Quality Bar:** Your first indicator of null values.
- **Correct Processors:** \`Impute missing values\`, \`Remove rows where value is empty\`, \`Filter\`.
- **Incorrect Processor:** \`Find & Replace\`.

### 5. Next Steps and Progression
- **Conditional Logic with Nulls:** In a **Formula** step, you can use functions like \`isNULL(column)\` or \`isBlank(column)\` to create conditional logic that behaves differently for null values.
- **Indicator Columns:** Use the "Create indicator for missing values" processor to create a new binary column that flags whether the original value was missing before you fill it in.

### 6. Common Challenges and Solutions
- **Challenge:** "I used 'Impute' but the nulls are still there."
- **Solution:** Make sure you clicked the "Run" button on the recipe. The changes are only applied to the output dataset when the recipe is executed.
- **Challenge:** "My column contains both nulls and empty strings. How do I handle both?"
- **Solution:** You can chain processors. First, use a "Find & Replace" to replace empty strings with nulls. Then, use the "Impute missing values" processor to handle all the nulls consistently.
`,
  },
  {
    id: 304,
    slug: 'splitting-multi-value-columns',
    question: 'How to get started with splitting multi-value columns using Split recipe?',
    answer: `
### 1. Introduction/Overview
It's common to find data where a single text field contains multiple values separated by a delimiter (e.g., "action,comedy,drama"). To analyze this properly, you need to split this string into separate columns or rows. The **Split column** processor in a Prepare recipe is the perfect tool for this.

### 2. Prerequisites
- **A dataset with a multi-value column.**
- **Knowledge of the delimiter** used to separate the values (e.g., a comma, a semicolon, a pipe character).

### 3. Step-by-Step Instructions
1.  **Open a Prepare Recipe** on your dataset.
2.  **Select the "Split column" Processor:** Click the header of the multi-value column and choose **Split column**.
3.  **Configure the Splitting:**
    *   **Delimiter:** Enter the character that separates your values (e.g., \`,\`).
    *   **Output Format:** You have a choice:
        *   **Split into columns:** This will create new columns named \`your_column_1\`, \`your_column_2\`, etc. This is good if you always have a fixed number of values.
        *   **Split into rows:** This will "unfold" the data, creating a new row for each value. This is often more flexible for analysis and is the recommended approach.
4.  **Preview and Run:** The preview pane will show the result. If it looks correct, run the recipe.

### 4. Resources and Tools
- **Prepare Recipe:** The home of the splitting tool.
- **"Split column" Processor:** The specific tool for this task.

### 5. Next Steps and Progression
- **Post-Split Cleaning:** After splitting, you will likely need to add more steps to trim whitespace from the new values.
- **One-Hot Encoding:** If you split into columns, you can then use the **Dummify** processor to one-hot encode these categories for use in machine learning models.
- **Aggregation:** If you split into rows, you can now use a **Group** recipe to perform aggregations on the individual values (e.g., "count how many times each genre appears").

### 6. Common Challenges and Solutions
- **Challenge:** "The split is not working as expected."
- **Solution:** Double-check your delimiter. Is it just a comma, or is it a comma followed by a space? You can specify multi-character delimiters.
- **Challenge:** "My data has a variable number of values in each row."
- **Solution:** In this case, you should almost always use the **Split into rows** option. Splitting into columns will result in many empty columns for the rows that have fewer values.
`,
  },
  {
    id: 305,
    slug: 'configuring-fuzzy-join-when-exact-match-fails',
    question: 'How to get started with configuring fuzzy join when exact match fails?',
    answer: `
### 1. Introduction/Overview
When you need to join two datasets but the join keys have typos or slight variations (e.g., "My Company, Inc." vs. "My Company"), a standard join will fail. The **Fuzzy Join** recipe allows you to join these records based on string similarity, which is a powerful technique for data reconciliation.

### 2. Prerequisites
- **Two datasets to join** with "messy" but similar key columns.
- **An understanding of what makes a "good match"** in your business context.

### 3. Step-by-Step Instructions
1.  **Select the Fuzzy Join Recipe:** In your Flow, select your "left" dataset and from the right-hand panel, find and choose the **Fuzzy Join** recipe. Select your "right" dataset as the second input.
2.  **Select Key Columns:** In the recipe settings, choose the text columns from each dataset that you want to join on.
3.  **Choose a Similarity Metric:** This is the most important setting. It's the algorithm used to compare the strings.
    *   **Levenshtein:** Good for short strings and typos.
    *   **Jaccard:** Good for comparing sets of words where the order might be different.
    *   Experiment to see which works best for your data.
4.  **Set the Similarity Threshold:** Choose a value between 0 and 1. This defines how "similar" two strings must be to be considered a match. A higher value (e.g., 0.9) means a stricter match, while a lower value (e.g., 0.7) is more lenient.
5.  **Review Matches:** The preview pane will show you the matches found and their similarity scores. Adjust the threshold and metric until you are satisfied with the quality of the matches.
6.  **Run the Recipe:** Execute the recipe to generate the joined dataset.

### 4. Resources and Tools
- **Fuzzy Join Recipe:** The dedicated visual tool for this task.
- **Prepare Recipe:** It is highly recommended to use a Prepare recipe on your key columns *before* the fuzzy join to clean them (e.g., convert to lowercase, remove punctuation). This significantly improves match quality.

### 5. Next Steps and Progression
- **Manual Review:** The output of a fuzzy join should often be reviewed by a human to confirm the accuracy of the matches, especially in critical applications.
- **Combining with Exact Joins:** You can perform an exact join first to handle the easy matches, and then use a fuzzy join only on the records that did not match.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm getting too many bad matches."
- **Solution:** Your similarity threshold is too low. Increase it to require a stronger match.
- **Challenge:** "It's missing matches that are obviously correct."
- **Solution:** Your threshold may be too high, or you have not sufficiently cleaned the key columns before the join. Pre-processing is key.
`,
  },
  {
    id: 306,
    slug: 'grouping-by-multiple-keys-correctly',
    question: 'How to get started with grouping by multiple keys correctly in Group recipe?',
    answer: `
### 1. Introduction/Overview
Grouping (or aggregating) data is a fundamental data manipulation task. The **Group** recipe in Dataiku allows you to calculate summary statistics (like sum, count, average) for different segments of your data. A common requirement is to group by a combination of several columns at once.

### 2. Prerequisites
- **A dataset ready for aggregation.**
- **A clear understanding of what you want to calculate** (e.g., "the total sales per country per month").

### 3. Step-by-Step Instructions
1.  **Select the Group Recipe:** In your Flow, select your dataset and choose the **Group** recipe from the right-hand panel.
2.  **Define Your Group Keys:**
    *   This is the crucial step. In the "Group by" section, you can add multiple columns.
    *   For the goal "total sales per country per month," you would add both the \`country\` column and the \`month\` column to the "Group by" keys.
3.  **Define Your Aggregations:**
    *   For all the other columns you want to compute, you must specify an aggregation function.
    *   For our example, you would select the \`sales\` column and choose the **Sum** aggregation.
4.  **Preview and Run:** The output preview will show the aggregated data, with one row for each unique combination of country and month, along with their total sales. Run the recipe to generate the output.

### 4. Resources and Tools
- **Group Recipe:** The primary visual tool for all aggregation tasks.
- **SQL:** The Group recipe is the visual equivalent of a SQL \`GROUP BY\` clause with aggregate functions.

### 5. Next Steps and Progression
- **Multiple Aggregations:** You can compute multiple aggregations at once. For example, you could calculate the **Sum** of sales and the **Average** of sales in the same recipe.
- **Post-Aggregation Calculations:** Add a **Prepare** recipe after the Group recipe to perform further calculations on your aggregated data (e.g., calculate the "average transaction value" by dividing the sum of sales by the count of orders).

### 6. Common Challenges and Solutions
- **Challenge:** "My output has fewer columns than I expected."
- **Solution:** Any column from your input that is not either a group key or included in an aggregation will be dropped from the output. Make sure you have defined an aggregation for every column you want to keep.
- **Challenge:** "The numbers in my aggregation seem wrong."
- **Solution:** Double-check your group keys. Have you included all the necessary keys to define the correct level of granularity? Also, ensure you have chosen the correct aggregation function (e.g., Sum vs. Average).
`,
  },
  {
    id: 307,
    slug: 'getting-unexpected-results-in-window-recipe',
    question: 'How to get started with getting unexpected results in a Window recipe frame?',
    answer: `
### 1. Introduction/Overview
A **Window** recipe performs calculations across a sliding set of rows related to the current row. It's powerful for tasks like calculating running totals or moving averages. Unexpected results almost always stem from two things: incorrect partitioning or incorrect ordering.

### 2. Prerequisites
- **A dataset for window calculations** (e.g., time-series data).
- **A clear goal** (e.g., "calculate a 7-day moving average of sales for each store").

### 3. Step-by-Step Instructions
1.  **Select the Window Recipe:** Choose your input dataset and select the **Window** recipe.
2.  **Define the Partition (Optional but common):**
    *   If you want the calculation to restart for different groups, define a **Partition**.
    *   For our example ("...for each store"), you would partition by the \`store_id\` column.
3.  **Define the Order (CRITICAL):**
    *   You **must** specify the order of the rows for the window function to work correctly.
    *   For our example, you must **Order by** the \`date\` column in ascending order. This is the most common mistake.
4.  **Define the Window Frame:**
    *   This defines which rows (relative to the current row) are included in the calculation.
    *   For a 7-day moving average, the frame would be: **6 preceding rows** to **0 following rows** (a total of 7 rows).
5.  **Define the Aggregation:**
    *   Choose the column to aggregate (e.g., \`sales\`) and the function (**Average**).

### 4. Resources and Tools
- **Window Recipe:** The dedicated visual recipe for window functions.
- **SQL Window Functions:** This recipe is the visual equivalent of SQL's powerful \`OVER (PARTITION BY ... ORDER BY ...)\` clause.

### 5. Next Steps and Progression
- **Running Totals:** To calculate a running total, set the window frame to be "unbounded preceding" to the "current row".
- **Lag/Lead Functions:** Use the "Lag" or "Lead" aggregations to get a value from a previous or future row, which is useful for calculating period-over-period changes.

### 6. Common Challenges and Solutions
- **Challenge:** "My running total is not correct."
- **Solution:** **You forgot to set the Order.** The most common error is failing to define the ordering of the rows. Without an explicit order, the concept of "preceding" rows is meaningless.
- **Challenge:** "My moving average is being calculated across all stores at once."
- **Solution:** **You forgot to set the Partition.** If you don't partition by \`store_id\`, the recipe will treat the entire dataset as a single group.
`,
  },
  {
    id: 308,
    slug: 'interpreting-top-n-recipe-with-duplicates',
    question: 'How to get started with interpreting Top N recipe when ranking duplicates?',
    answer: `
### 1. Introduction/Overview
The **Top N** recipe is used to filter your dataset to keep only the top or bottom records based on the values in a specific column. A common point of confusion is how the recipe handles ties (duplicate values in the ordering column). Understanding the different ranking strategies is key to getting the expected output.

### 2. Prerequisites
- **A dataset to rank.**
- **A clear goal** (e.g., "find the top 10 best-selling products").

### 3. Step-by-Step Instructions
1.  **Select the Top N Recipe:** Choose your input dataset and select the **Top N** recipe.
2.  **Configure the Ranking:**
    *   **Order by:** Select the column to rank by (e.g., \`sales_total\`). Choose **Descending** for "Top N".
    *   **Retrieve:** Select "Top" and enter the number you want (e.g., 10).
3.  **Configure the Ranking Strategy (The Key Step):**
    *   This setting controls how ties are handled.
    *   **"Rows with same value have same rank (dense)" (Standard Competition Ranking):** This is usually what people expect. If two products are tied for 3rd place, they both get rank 3, and the next product gets rank 4.
    *   **"No duplicate ranks (sequential)":** If two products are tied, they will get different ranks based on their original order in the data.
4.  **Decide How to Handle Ties:**
    *   After choosing a ranking strategy, you must decide what to do if multiple rows have the same rank within the Top N.
    *   **"Retrieve all rows":** If you ask for the Top 10, but 3 products are tied for 10th place, this option will return all 3, resulting in 12 total rows.
    *   **"Select first N rows":** This will strictly return only 10 rows, potentially cutting off some of the tied records.

### 4. Resources and Tools
- **Top N Recipe:** The dedicated visual tool for this purpose.
- **Window Recipe:** For more complex ranking scenarios (e.g., ranking within groups), you can use the Window recipe to first compute a rank, and then use a Filter recipe on the rank column.

### 5. Next Steps and Progression
- **Grouped Ranking:** In the Top N recipe, you can also define "Per" groups. This allows you to find the "Top 10 products *per country*," for example.

### 6. Common Challenges and Solutions
- **Challenge:** "I asked for the Top 10, but I got 15 rows back."
- **Solution:** You have chosen the "Retrieve all rows" option for handling ties. This is expected behavior. If you need exactly 10 rows, change the setting to "Select first N rows".
- **Challenge:** "The ranking seems arbitrary when values are the same."
- **Solution:** You are likely using the "No duplicate ranks" strategy. Change this to the "dense" ranking strategy to ensure items with the same value get the same rank.
`,
  },
  {
    id: 309,
    slug: 'stacking-datasets-and-preserving-schema',
    question: 'How to get started with stacking datasets and preserving schema with Stack recipe?',
    answer: `
### 1. Introduction/Overview
The **Stack** recipe is used to append datasets on top of each other, similar to a \`UNION ALL\` in SQL. For the stack to work correctly, the schemas (column names and types) of the input datasets need to be aligned. This guide explains how to manage schemas during a stack.

### 2. Prerequisites
- **Two or more datasets** that you want to append. They should represent the same kind of data (e.g., sales data from two different regions).

### 3. Step-by-Step Instructions
1.  **Select the Stack Recipe:** Choose one of your input datasets, and from the right-hand panel, select the **Stack with...** recipe. Add your other dataset(s) as inputs.
2.  **Review the Automatic Schema Matching:**
    *   In the Stack recipe settings, Dataiku will automatically try to align the columns based on their names.
    *   The preview will show the combined schema. Columns that exist in all datasets and have the same name will be matched perfectly.
3.  **Manually Adjust Schema (If Necessary):**
    *   If your column names are inconsistent (e.g., \`cust_id\` in one dataset and \`customer_id\` in another), Dataiku may not match them correctly.
    *   In the schema mapping table, you can manually drag and drop columns to align them. You can drag the \`cust_id\` column and drop it onto the \`customer_id\` column to tell Dataiku they are the same thing.
4.  **Handle Data Types:** The recipe will also try to find a common data type. If there are conflicts (e.g., a column is a string in one dataset and a number in another), you may need to go back and use a **Prepare recipe** on one of the inputs to fix the type before stacking.
5.  **Run the Recipe:** Once the schema is aligned correctly, run the recipe to create the final, stacked dataset.

### 4. Resources and Tools
- **Stack Recipe:** The primary visual tool for appending data.
- **Schema Mapping UI:** The interface within the Stack recipe for manually aligning columns.
- **Prepare Recipe:** An essential pre-processing tool to clean up schemas *before* you stack.

### 5. Next Steps and Progression
- **Adding a Source Column:** It's often a good practice to add a column that indicates the original source of each row before you stack the datasets. This allows you to trace the data back to its origin.
- **Stacking Many Files:** You can point a single dataset to a folder of files. If the files have the same structure, Dataiku will automatically stack them, which can be simpler than using a Stack recipe on many individual datasets.

### 6. Common Challenges and Solutions
- **Challenge:** "The output has extra columns I didn't expect."
- **Solution:** This happens when column names are not identical. For example, a small typo (\`sales\` vs. \`sale\`) will cause Dataiku to treat them as two separate columns. You must either fix the name in the source or manually align them in the Stack recipe's schema mapping view.
- **Challenge:** "My stacked data is a mess of different data types."
- **Solution:** You must enforce a consistent schema *before* stacking. Use a Prepare recipe on each input to ensure the column types are the same.
`,
  },
  {
    id: 310,
    slug: 'syncing-two-datasets-with-sync-recipe',
    question: 'How to get started with syncing two datasets with Sync recipe and matching granular keys?',
    answer: `
### 1. Introduction/Overview
The **Sync recipe** has a very specific purpose that is often misunderstood by beginners. It is **not** for joining or merging two different datasets based on a key. Its purpose is to synchronize the *entire content* of one dataset to a different storage location. Think of it as a "copy/paste" for datasets.

### 2. Prerequisites
- **A source dataset** you want to copy.
- **A target storage location,** such as a different database or a cloud storage location.

### 3. Step-by-Step Instructions
1.  **Understand the Use Case:** The primary use case for Sync is to move data between different systems. For example, you might perform all your transformations on data in a Snowflake data warehouse, and then use a Sync recipe to copy the final, aggregated result table to a simpler PostgreSQL database that feeds a web application.
2.  **Select the Sync Recipe:** In your Flow, select the source dataset you want to copy. From the right-hand panel, choose the **Sync** recipe.
3.  **Configure the Output:**
    *   The "Output" of the Sync recipe is not a new dataset in your Flow, but rather the configuration of the destination.
    *   You will need to change the "Connection" for the output to point to your target storage system (e.g., your PostgreSQL connection).
    *   You can also specify the name of the new table to be created in the destination.
4.  **Run the Recipe:** When you run the Sync recipe, Dataiku will read the data from the source dataset and write it to the destination, ensuring the schema and data are identical.

### 4. Resources and Tools
- **Sync Recipe:** The dedicated tool for copying datasets between storage locations.
- **Join Recipe:** The tool you should use if you are trying to combine two datasets based on a key.

### 5. Next Steps and Progression
- **Partitioned Sync:** You can use the Sync recipe on partitioned datasets to copy only the latest partitions, which is efficient for incremental updates.
- **Automated Replication:** You can use a scenario to run a Sync recipe on a schedule, creating an automated replication job between two systems.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm trying to join two datasets, but the Sync recipe isn't working."
- **Solution:** You are using the wrong tool for the job. The Sync recipe does not have any concept of a "join key". You need to use the **Join recipe** to combine two datasets based on matching values in their columns.
- **Challenge:** "The sync to my database is failing."
- **Solution:** This is likely a permissions issue on the *destination*. The credentials Dataiku is using for the target connection need to have permissions to \`CREATE TABLE\` and \`INSERT\` data in the target database.
`,
  },
  {
    id: 311,
    slug: 'reordering-columns-and-maintaining-order',
    question: 'How to get started with reordering columns and maintaining order?',
    answer: `
### 1. Introduction/Overview
The order of columns in a dataset can be important for readability or for systems that expect a specific schema order. While some recipes might change column order, the definitive way to set and maintain a specific order is by using a **Prepare recipe**.

### 2. Prerequisites
- **A dataset** whose columns you want to reorder.
- **A clear idea of the desired final column order.**

### 3. Step-by-Step Instructions
1.  **Open a Prepare Recipe:** Create a new **Prepare** recipe on your dataset.
2.  **Reorder via Drag-and-Drop:**
    *   In the main data table view, you can simply click on a column header and drag it left or right to a new position. This is the quickest way to reorder a few columns.
3.  **Reorder via the Columns View:**
    *   For more complex reordering, click the **Columns** button at the top right of the recipe editor (it looks like \`[#]\`).
    *   This opens a list of all your columns. You can drag and drop the column names in this list to reorder them. You can also select multiple columns and move them together.
4.  **Run the Recipe:** After arranging the columns in your desired order, run the recipe. The output dataset will now have the new, enforced column order. This order will be maintained by downstream recipes unless they explicitly change it.

### 4. Resources and Tools
- **Prepare Recipe:** The primary tool for this task.
- **The Columns View:** A useful interface for managing the order and names of many columns at once.
- **The Sort Recipe:** **Do not use the Sort recipe for this.** The Sort recipe reorders *rows* based on column values; it does not reorder columns.

### 5. Next Steps and Progression
- **Standardized Schemas:** For critical output datasets, it's a good practice to have a final Prepare recipe whose only job is to select the necessary columns and put them in the correct, standard order before exporting the data.
- **Scripting:** In a Python recipe, you can also reorder columns by providing a list of column names in the desired order when you select from your DataFrame: \`df = df[['col_C', 'col_A', 'col_B']]\`.

### 6. Common Challenges and Solutions
- **Challenge:** "I reordered my columns, but the next recipe in the Flow changed the order again."
- **Solution:** Some recipes, particularly the Join recipe, can change column order (e.g., by bringing in new columns at the end). To guarantee the final order, you should place your "reordering" Prepare recipe as the very last step in your pipeline, right before the final output dataset.
- **Challenge:** "It's tedious to reorder many columns."
- **Solution:** Use the "Columns" view in the Prepare recipe. You can quickly sort the columns alphabetically by name and then make minor manual adjustments, which is often faster than dragging them one by one.
`,
  },
  {
    id: 312,
    slug: 'applying-pivot-recipe-and-preventing-missing-columns',
    question: 'How to get started with applying Pivot recipe and preventing missing columns?',
    answer: `
### 1. Introduction/Overview
The **Pivot** recipe is a powerful tool for reshaping data from a "long" to a "wide" format. A common challenge is that if a category you expect to become a column is not present in the input data for a specific run, that column will be missing from the output, which can break downstream processes. This guide explains how to handle this.

### 2. Prerequisites
- **A dataset in "long" format** (e.g., with columns for \`Date\`, \`Category\`, \`Value\`).
- **Knowledge of all the possible categories** that should become columns.

### 3. Step-by-Step Instructions
1.  **The Problem:** Imagine you are pivoting on a \`Category\` column that has values "A", "B", and "C". If, on one day, your input data only contains "A" and "B", the Pivot recipe output will only have columns for "A" and "B". The "C" column will be missing.
2.  **The Solution: Use a "Scaffold" Dataset.**
    *   **Create a Scaffold:** Create a separate dataset (e.g., from an inline table) that contains a single column with *all possible* values for your category column. For our example, this "scaffold" would have three rows: "A", "B", and "C".
    *   **Join Before Pivoting:** Before your Pivot recipe, use a **Join** recipe to perform a **Full Outer Join** between your main data and this scaffold dataset. This ensures that all categories are present in the data, even if they have null values for a particular run.
3.  **Perform the Pivot:**
    *   Now, apply the **Pivot** recipe to the output of the join.
    *   Because the data now contains rows for every possible category (even if some are null), the Pivot recipe will reliably create a column for every category every time it runs.
    *   You will likely need to use a **Prepare** recipe after the pivot to fill the nulls created by the join with zeros.

### 4. Resources and Tools
- **Pivot Recipe:** The core reshaping tool.
- **Join Recipe:** The key tool for creating the "scaffold" structure.
- **Prepare Recipe:** Used for post-pivot cleanup (e.g., filling nulls).

### 5. Next Steps and Progression
- **Automate the Scaffold:** Instead of a static inline table, you can create a flow that generates the scaffold dataset by taking the distinct values of the category column from the *entire historical dataset*.

### 6. Common Challenges and Solutions
- **Challenge:** "This seems like a lot of extra work."
- **Solution:** It is an extra step, but it is essential for creating robust, production-grade pipelines. If a downstream process (like a BI tool or a model) is expecting a fixed set of columns, a missing column will cause the entire pipeline to fail. The scaffold method prevents this.
- **Challenge:** "My pivot is creating too many columns."
- **Solution:** This means the column you are pivoting has too many unique values. You may need to use a Prepare recipe to group or clean up the categories before you pivot.
`,
  },
  {
    id: 313,
    slug: 'filtering-vs-sampling-confusion',
    question: 'How to get started with filtering vs sampling confusion in Sample/Filter recipe?',
    answer: `
### 1. Introduction/Overview
The **Sample/Filter** recipe in Dataiku contains two distinct functionalities: **Sampling** and **Filtering**. While they both reduce the number of rows in your dataset, they have fundamentally different purposes. This guide clarifies when to use each.

### 2. Prerequisites
- **A dataset** you want to reduce in size.
- **A clear goal:** Are you trying to select a random subset, or are you trying to select rows based on a specific rule?

### 3. Step-by-Step Instructions

#### When to use FILTER:
- **Purpose:** To select a subset of rows based on a **deterministic rule or condition**.
- **How it works:** You write a condition (e.g., \`country == 'USA'\` or \`price > 100\`). The recipe keeps only the rows that satisfy this condition. The same filter on the same data will always produce the exact same output.
- **Use Cases:**
    - Removing invalid or irrelevant data.
    - Focusing your analysis on a specific segment (e.g., a particular region or time frame).
    - Splitting data into different streams for separate processing.

#### When to use SAMPLE:
- **Purpose:** To select a **random subset** of your data.
- **How it works:** You specify a percentage (e.g., 10%) or a fixed number of rows. The recipe will then randomly select that many rows from your dataset. Running the same sample again may produce a different set of rows (unless you fix the random seed).
- **Use Cases:**
    - **Prototyping:** When working with a very large dataset, you can create a smaller random sample to build and test your flow quickly before running it on the full data.
    - **Machine Learning:** Creating training and test sets.
    - **Statistical Analysis:** Ensuring that a sample is representative of the whole population.

### 4. Resources and Tools
- **Sample/Filter Recipe:** The visual recipe that contains both functionalities.
- **Prepare Recipe:** The "Filter" processor in the Prepare recipe provides the same functionality as the filter in the dedicated recipe and is often more convenient to use as part of a larger cleaning script.

### 5. Next Steps and Progression
- **Stratified Sampling:** In the Sample recipe, you can use stratified sampling to ensure that the random sample maintains the same distribution of a key categorical column (e.g., the same percentage of male/female customers) as the original dataset.

### 6. Common Challenges and Solutions
- **Challenge:** "I need to split my data into a training set and a testing set."
- **Solution:** Use the **Split** recipe. This single recipe can divide your data into two or more sets (e.g., an 80% training set and a 20% testing set) and is the standard tool for this machine learning task.
- **Challenge:** "I want to get the first 100 rows of my dataset."
- **Solution:** Use the "Filter" part of the recipe and choose the "First N rows" option. This is a deterministic selection, not a random sample.
`,
  },
  {
    id: 314,
    slug: 'deduplicating-rows-with-distinct-recipe',
    question: 'How to get started with deduplicating rows using Distinct recipe but missing duplicates?',
    answer: `
### 1. Introduction/Overview
The **Distinct** recipe is designed to remove rows that are **100% identical** across all columns. A common mistake is to try to use it to deduplicate a dataset based on a specific key (like a customer ID), where other columns might be different. This guide explains why that doesn't work and shows the correct tool for the job.

### 2. Prerequisites
- **A dataset with duplicate records.**
- **A clear understanding of what defines a duplicate** in your context.

### 3. Step-by-Step Instructions

#### The Problem with the Distinct Recipe
- Imagine you have two rows for the same customer, but they have different transaction dates.
- \`[customer_id: 123, transaction_date: 2023-01-05]\`
- \`[customer_id: 123, transaction_date: 2023-02-10]\`
- The **Distinct recipe will not remove either of these rows**, because they are not completely identical (the dates are different).

#### The Correct Solution: The Group Recipe
- **Goal:** To keep only one record per unique value of a specific column (the key).
- **How:**
    1.  Select your dataset and choose the **Group** recipe.
    2.  **Group by:** In the "Key" section, select the column that defines your unique entity (e.g., \`customer_id\`).
    3.  **Aggregations:** For all the other columns you want to keep, you must tell Dataiku how to pick one value from the group.
        *   To simply keep the values from the *first* row encountered for each customer, add each other column (like \`transaction_date\`) and choose the **First** aggregation.
        *   To be more intentional, you could choose the **Max** of the \`transaction_date\` to keep the most recent record for each customer.
    4.  Run the recipe. The output will have exactly one row per unique \`customer_id\`.

### 4. Resources and Tools
- **Distinct Recipe:** Only for removing full-row duplicates.
- **Group Recipe:** The correct, powerful tool for deduplicating based on a key.

### 5. Next Steps and Progression
- **Deduplicating on Multiple Keys:** You can add multiple columns to the "Group by" section to deduplicate on a composite key (e.g., keep one record per \`customer_id\` and \`product_id\` combination).

### 6. Common Challenges and Solutions
- **Challenge:** "The Group recipe dropped some of my columns."
- **Solution:** You forgot to specify an aggregation for them. Any column not in the "Group by" key must have an aggregation function (like "First", "Last", "Sum", "Max") defined for it to be included in the output.
- **Challenge:** "How do I know which row the 'First' aggregation is keeping?"
- **Solution:** The "first" row depends on the default ordering of your data. If you need to keep a specific row (e.g., the one with the latest date), you should first use a **Sort** recipe to order your data by date descending, and *then* use the Group recipe with the "First" aggregation.
`,
  },
  {
    id: 315,
    slug: 'chaining-multiple-visual-recipes',
    question: 'How to get started with chaining multiple visual recipes while maintaining lineage?',
    answer: `
### 1. Introduction/Overview
Chaining recipes is the fundamental process of building a data pipeline in Dataiku. It involves connecting the output of one recipe to the input of another, creating a sequence of transformations. Dataiku automatically manages the connections and visualizes the entire chain as a lineage graph in your Flow.

### 2. Prerequisites
- **A Dataiku project with at least one dataset.**
- **A multi-step transformation plan** (e.g., "First, I need to clean the data, then join it with another table, then aggregate it.").

### 3. Step-by-Step Instructions
1.  **Create the First Link:**
    *   Start with your raw dataset (e.g., \`raw_sales\`).
    *   Select it and add your first recipe, for example, a **Prepare** recipe to clean it.
    *   Run the recipe. This creates a new dataset (e.g., \`sales_cleaned\`). Your chain is now \`[raw] -> (prepare) -> [cleaned]\`.
2.  **Add the Second Link:**
    *   **Crucially, select the output of the previous step.** Click on the \`sales_cleaned\` dataset.
    *   From the right-hand panel, choose your next recipe, for example, a **Join** recipe to combine it with a \`customers\` dataset.
    *   Run the recipe. This creates a new \`sales_joined_customers\` dataset.
3.  **Continue the Chain:**
    *   Select the \`sales_joined_customers\` dataset.
    *   Add a **Group** recipe to aggregate the data.
    *   Run the recipe to create your final \`sales_aggregated\` dataset.
4.  **View the Lineage:** Your Flow now clearly shows the entire chain: \`[raw] -> (prepare) -> [cleaned] -> (join) -> [joined] -> (group) -> [aggregated]\`. This visual lineage is created automatically.

### 4. Resources and Tools
- **The Flow:** The canvas where you build and see your recipe chains.
- **The Actions Panel:** The right-hand menu you use to select new recipes to add to the chain.

### 5. Next Steps and Progression
- **Branching:** A single dataset can be the input for multiple recipes, creating branches in your flow.
- **Organization:** For long chains, use **Flow Zones** to group logical segments (e.g., a "Cleaning" zone and a "Reporting" zone).
- **Automation:** Once your chain is complete, create a **Scenario** to build the final dataset (\`sales_aggregated\`) on a schedule. You only need to build the last item; Dataiku will automatically run the entire upstream chain.

### 6. Common Challenges and Solutions
- **Challenge:** "I connected my new recipe to the raw data by mistake."
- **Solution:** Open the recipe. In its settings, go to the "Input/Output" tab. You can click to change the input and select the correct intermediate dataset.
- **Challenge:** "My Flow is a mess."
- **Solution:** Use the **Arrange** button to automatically tidy the layout. For complex flows, manually dragging items to create a clean, left-to-right visual progression is a good practice.
`,
  },
  {
    id: 316,
    slug: 'setting-up-a-python-recipe-environment',
    question: 'How to get started with setting up a Python recipe environment (libraries, dependencies)?',
    answer: `
### 1. Introduction/Overview
A code environment is an isolated space that contains a specific version of Python and a specific set of libraries (packages). Using environments is essential for reproducibility and avoiding dependency conflicts. This guide explains how to create and manage them. This is typically an administrative task.

### 2. Prerequisites
- **Administrator rights** on the Dataiku instance.
- **Knowledge of the Python packages** required for your project (e.g., \`pandas\`, \`scikit-learn\`, \`requests\`).

### 3. Step-by-Step Instructions
1.  **Navigate to Code Environments:** As an admin, go to **Administration > Code Envs**.
2.  **Create a New Environment:**
    *   Click **+ NEW PYTHON ENV**.
    *   Give it a clear, descriptive name (e.g., \`python-3-9-geospatial\`).
    *   Choose the Python version to use.
3.  **Add Required Packages:**
    *   In the "Packages to install" section, click **Add**.
    *   Enter the name of the package you need as it appears on PyPI (e.g., \`pandas\`).
    *   **Best Practice:** Specify an exact version for reproducibility (e.g., \`pandas==1.4.2\`).
4.  **Save and Build:**
    *   Click **Save and update**. Dataiku will now create the isolated environment and install all the specified packages using a tool like \`pip\`. This may take a few minutes.
5.  **Use the Environment in a Project (Developer Task):**
    *   In a project, when you create a Python recipe or notebook, you can select which code environment to use.
    *   In a recipe's **Advanced** settings, choose your newly created environment from the "Code Env" dropdown.

### 4. Resources and Tools
- **Administration > Code Envs:** The central management UI for all code environments.
- **PyPI (pypi.org):** The public repository where you can find the names and versions of Python packages.

### 5. Next Steps and Progression
- **Standardized Environments:** Create a set of standard, pre-approved code environments for your organization to use (e.g., a "General Purpose" one with common data science libraries).
- **Exporting Environments:** You can export the definition of a code environment as a JSON file. This can be checked into Git to version control your dependencies.
- **GPU Environments:** For deep learning, you can create environments that include GPU-enabled libraries like TensorFlow and are configured to run on GPU-powered machines.

### 6. Common Challenges and Solutions
- **Challenge:** "The environment build fails."
- **Solution:** This is often due to dependency conflicts, where two packages require different versions of the same underlying library. You may need to experiment with the package versions in your list to find a compatible set. Reading the build log will provide detailed error messages.
- **Challenge:** "I installed a package, but my recipe can't find it."
- **Solution:** Make sure your recipe is actually configured to use the correct code environment. Check the recipe's "Advanced" settings.
`,
  },
  {
    id: 317,
    slug: 'importing-pandas-in-python-recipes',
    question: 'How to get started with importing pandas in Python recipes without runtime errors?',
    answer: `
### 1. Introduction/Overview
Pandas is the workhorse library for data manipulation in Python, and it's the primary way you'll interact with data inside a Dataiku Python recipe. A runtime error when importing pandas usually indicates a problem with the code environment configuration.

### 2. Prerequisites
- **A Dataiku project with a Python recipe.**
- **A code environment** associated with the project.

### 3. Step-by-Step Instructions
1.  **Check the Code Environment:**
    *   The error \`ModuleNotFoundError: No module named 'pandas'\` means the Python environment your recipe is using does not have pandas installed.
2.  **Navigate to the Environment Settings:**
    *   In your project, go to **Settings > Code Env**. Note the name of the Python environment being used.
    *   An administrator must then go to **Administration > Code Envs** and select that environment.
3.  **Ensure Pandas is in the Package List:**
    *   In the environment's "Packages to install" section, make sure \`pandas\` is listed.
    *   If it's not, add it. It's best practice to pin the version (e.g., \`pandas==1.4.2\`).
    *   If it is listed but you still get an error, the environment may be corrupted. Try clicking "Rebuild environment".
4.  **Write the Import Statement Correctly:**
    *   At the top of your Python recipe, the standard convention is to import pandas with the alias \`pd\`.
    > \`import pandas as pd\`
5.  **Use the Dataiku API to get a DataFrame:**
    *   Remember that the correct way to get your data into pandas is via the Dataiku API, which handles all the connection and parsing for you.
    > \`\`\`python
    > import dataiku
    > import pandas as pd
    > 
    > # Read the input dataset into a pandas DataFrame
    > my_dataset = dataiku.Dataset("your_input_name")
    > my_df = my_dataset.get_dataframe()
    > \`\`\`
### 4. Resources and Tools
- **Code Environment Package List:** The single source of truth for what libraries are installed.
- **The \`import\` statement:** The standard Python syntax for loading a library.

### 5. Next Steps and Progression
- **Managing Versions:** Be mindful of which version of pandas your environment uses, as functions and behaviors can change between major versions. Pinning the version in your code environment settings is crucial for reproducibility.
- **Optimizing Performance:** For very large datasets that don't fit in memory, loading them into a single pandas DataFrame will cause errors. You should switch to using iterators or a PySpark recipe.

### 6. Common Challenges and Solutions
- **Challenge:** "The recipe fails with the import error."
- **Solution:** 99% of the time, this is purely an environment issue. The package is either not listed in the environment's requirements, or the environment is not correctly built. Contact your Dataiku administrator to verify the environment's configuration.
- **Challenge:** "The import works, but a pandas function fails."
- **Solution:** This is likely a code error, not an import error. It could also be a versioning issue, where your code was written for a different version of pandas than the one installed in your environment.
`,
  },
  {
    id: 318,
    slug: 'debugging-python-recipes',
    question: 'How to get started with debugging Python recipes when exceptions occur in execution?',
    answer: `
### 1. Introduction/Overview
When a Python recipe fails, Dataiku provides detailed logs to help you find and fix the problem. Debugging is a systematic process of reading the error, understanding it, and using various techniques to isolate and resolve the issue in your code.

### 2. Prerequisites
- **A failed Python recipe run.**
- **Access to the job log.**

### 3. Step-by-Step Instructions
1.  **Go to the Job Log:**
    *   From the "Jobs" menu, find the failed job and click on it.
    *   Click on the red, failed Python recipe step to open its log.
2.  **Read the Traceback:**
    *   Scroll to the very bottom of the log. Python provides a "traceback," which is a detailed report of the error.
    *   **Read it from the bottom up.** The last line will tell you the type of error (e.g., \`TypeError\`, \`KeyError\`, \`ValueError\`).
    *   The lines above will show you the exact file and line number in your recipe code where the error occurred.
3.  **Form a Hypothesis:** Based on the error type and the line of code, try to understand the problem.
    *   \`KeyError\`: You tried to access a dictionary key or DataFrame column that doesn't exist. Check for typos.
    *   \`TypeError\`: You tried to perform an operation on the wrong type of data (e.g., adding a string to a number).
    *   \`IndentationError\`: Your Python code has incorrect indentation.
4.  **Use "Print" Debugging:**
    *   The simplest way to debug is to add \`print()\` statements to your recipe code to inspect the state of variables.
    *   Print the \`df.info()\` or \`df.head()\` of your DataFrame at various points to see how it's being transformed.
    *   Rerun the recipe and check the new log to see the output of your print statements.
5.  **Test Interactively in a Notebook:**
    *   For complex bugs, copy the recipe code and the failing data into a Jupyter notebook.
    *   In the notebook, you can run the code line by line, inspect variables at every step, and quickly iterate until you find the solution. Once fixed, copy the corrected code back into the recipe.

### 4. Resources and Tools
- **The Job Log and Traceback:** Your most important source of information.
- **\`print()\` statements:** A simple but effective debugging tool.
- **Jupyter Notebooks:** An interactive environment for more complex debugging.

### 5. Next Steps and Progression
- **Error Handling:** Instead of letting your recipe crash, add \`try...except\` blocks to your code to catch expected errors and handle them gracefully (e.g., by logging a warning or skipping a bad row).
- **Unit Testing:** For critical library functions, write formal unit tests to ensure they behave as expected with different inputs.

### 6. Common Challenges and Solutions
- **Challenge:** "I don't understand the error message."
- **Solution:** Copy and paste the error message (e.g., \`TypeError: unsupported operand type(s) for +: 'int' and 'str'\`) into a search engine. You will find countless explanations and examples on sites like Stack Overflow.
- **Challenge:** "The code works on a sample but fails on the full dataset."
- **Solution:** This almost always means there is a data quality issue in the full dataset that was not present in your sample (e.g., an unexpected null value or a string in a numerical column). Your code needs to be made more robust to handle these edge cases.
`,
  },
  {
    id: 319,
    slug: 'accessing-dataiku-datasets-via-api',
    question: 'How to get started with accessing Dataiku datasets via DSS API in code recipes?',
    answer: `
### 1. Introduction/Overview
The Dataiku Python API is the bridge between your custom code and the Dataiku Flow. It provides a simple, high-level way to read data from your input datasets into common Python data structures like Pandas DataFrames, and to write your results back to output datasets.

### 2. Prerequisites
- **A Python recipe** with at least one input and one output dataset configured.
- **Basic knowledge of Pandas DataFrames.**

### 3. Step-by-Step Instructions
1.  **Import the Library:** The first line in your recipe should always be to import the Dataiku library.
    > \`import dataiku\`
2.  **Get a Handle on Your Input Dataset:** Use the \`dataiku.Dataset()\` function, passing the *name* of your input dataset (as seen in the Flow). This creates a dataset object.
    > \`input_dataset = dataiku.Dataset("my_raw_data")\`
3.  **Read the Data into a Pandas DataFrame:** The most common action is to read the entire dataset into a Pandas DataFrame using the \`.get_dataframe()\` method.
    > \`df = input_dataset.get_dataframe()\`
4.  **Perform Your Transformations:** Now you can use standard Pandas code to manipulate this DataFrame.
5.  **Get a Handle on Your Output Dataset:** Similar to the input, create an object for your output dataset.
    > \`output_dataset = dataiku.Dataset("my_prepared_data")\`
6.  **Write the DataFrame to the Output:** Use the \`.write_with_schema()\` method to save your transformed DataFrame to the output dataset. Dataiku will handle creating the table and defining the schema.
    > \`output_dataset.write_with_schema(final_df)\`

### 4. Resources and Tools
- **Dataiku Python API documentation:** The official reference, accessible from the Help menu in DSS. It details all the available classes and methods.
- **Code Recipe Boilerplate:** When you create a new Python recipe, Dataiku automatically provides this boilerplate code, so you just need to fill in your logic.

### 5. Next Steps and Progression
- **Iterating Over Rows:** For very large datasets that don't fit in memory, don't use \`.get_dataframe()\`. Instead, use \`input_dataset.iter_rows()\` to process the data row by row with low memory usage.
- **Reading and Writing to/from Other Systems:** The API can also interact with SQL databases, cloud storage, and more, allowing you to build complex data movement pipelines in code.
- **Managing Multiple Inputs/Outputs:** A single recipe can read from multiple inputs and write to multiple outputs. Just create a separate dataset object for each.

### 6. Common Challenges and Solutions
- **Challenge:** "I get an error: 'Dataset not found'."
- **Solution:** You have a typo in the dataset name inside the \`dataiku.Dataset("...")\` call. The name must exactly match the dataset name in the Flow. It is case-sensitive.
- **Challenge:** "The recipe is using a lot of memory."
- **Solution:** You are using \`.get_dataframe()\` on a dataset that is too large. You must refactor your code to use an iterator or switch to a PySpark recipe for distributed processing.
`,
  },
  {
    id: 320,
    slug: 'writing-sql-recipes-with-special-chars-in-names',
    question: 'How to get started with writing SQL recipes when field names contain spaces or special chars?',
    answer: `
### 1. Introduction/Overview
While it's a best practice to have column names without spaces or special characters, you will inevitably encounter them in source data. To query these columns in a SQL recipe, you must use your database's specific "quoting" characters to tell the SQL parser to treat the name as a single identifier.

### 2. Prerequisites
- **A SQL dataset** that has columns with spaces or special characters (e.g., "Customer Name", "sales-amount").
- **Knowledge of your database's specific SQL dialect.**

### 3. Step-by-Step Instructions
1.  **Identify the Quoting Character for Your Database:** Different SQL databases use different characters for quoting identifiers.
    *   **Standard SQL (PostgreSQL, Snowflake, Oracle):** Double quotes (\`"\`).
    *   **SQL Server:** Square brackets (\`[]\`).
    *   **MySQL:** Backticks (\\\`\\\`).
2.  **Write the SQL Query:** In your SQL recipe, when you refer to a column with a special character, enclose it in the appropriate quoting characters.

    *   **Example for Snowflake/PostgreSQL:**
        > \`\`\`sql
        > SELECT
        >   "Customer Name",
        >   "sales-amount" * 1.1 AS "amount_incl_tax"
        > FROM my_input_dataset;
        > \`\`\`
    *   **Example for SQL Server:**
        > \`\`\`sql
        > SELECT
        >   [Customer Name],
        >   [sales-amount] * 1.1 AS [amount_incl_tax]
        > FROM my_input_dataset;
        > \`\`\`
3.  **Validate and Run:** Use the "Validate" button to ensure your syntax is correct for your database.

### 4. Resources and Tools
- **SQL Recipe Editor:** Your workspace for writing the query.
- **Your Database's SQL Documentation:** The definitive source for its syntax rules.

### 5. Next Steps and Progression
- **Rename Columns:** The best long-term solution is to add a **Prepare recipe** early in your flow to rename the problematic columns to a standard format (e.g., rename "Customer Name" to \`customer_name\`). This makes all downstream querying much simpler.
- **Use Aliases:** You can use table aliases to make your queries cleaner. \`SELECT t1."Customer Name" FROM my_table t1 ...\`

### 6. Common Challenges and Solutions
- **Challenge:** "I'm still getting a syntax error."
- **Solution:** Double-check that you are using the correct quoting character for your specific database. Also, ensure that the quoting is consistent. If you quote an identifier in the \`SELECT\` clause, you must also quote it if you use it in the \`WHERE\` or \`GROUP BY\` clause.
- **Challenge:** "Why can't I use single quotes (' ')?"
- **Solution:** In SQL, single quotes are used exclusively for defining string literals (e.g., \`WHERE country = 'USA'\`). They cannot be used for quoting column or table names.
`,
  },
  {
    id: 321,
    slug: 'handling-large-data-in-memory-errors',
    question: 'How to get started with handling large data in-memory causing out-of-memory errors?',
    answer: `
### 1. Introduction/Overview
"Out of Memory" (OOM) errors are a common challenge when working with large datasets. They happen when you try to load more data into a server's RAM than it can hold. The solution is not to simply add more memory, but to change your processing strategy to avoid loading all the data at once. This involves "pushing down" computation to a more powerful engine.

### 2. Prerequisites
- **A large dataset** (e.g., many gigabytes or tens of millions of rows).
- **A recipe that is failing** with an OOM error.

### 3. Step-by-Step Instructions: The Optimization Framework
1.  **Identify the Failing Recipe:** The job log will clearly show which recipe failed. It will almost always be a recipe running with the **"In-Memory"** execution engine.
2.  **Choose the Correct Engine (Push Down):** The goal is to move the work from the Dataiku server's memory to a system designed for large-scale processing.
    *   **If your data is in a SQL Database (Snowflake, BigQuery, etc.):**
        *   **Solution:** Open the failing recipe, go to **Advanced** settings, and change the **Execution engine** to **Run on database (SQL)**. This is the most common and effective solution.
    *   **If your data is on a distributed filesystem (S3, HDFS, etc.):**
        *   **Solution:** Change the execution engine to **Spark**. This will distribute the processing across a cluster.
    *   **If you *must* use a Python recipe:**
        *   **Solution:** You cannot use \`dataset.get_dataframe()\` which loads everything. You must refactor your code to use \`dataset.iter_rows()\` to process the data in a streaming fashion, one row at a time, with very low memory usage.

### 4. Resources and Tools
- **The Execution Engine Dropdown:** Your most powerful tool for solving OOM errors.
- **The Dataiku Python API's \`.iter_rows()\` method:** The tool for memory-efficient processing in Python recipes.
- **The Job Log:** The place where you will see the OOM error message.

### 5. Next Steps and Progression
- **Proactive Design:** When starting a new project, if you know the data will be large, design your flow from the beginning to use push-down execution. Don't wait for it to fail.
- **Resource Allocation:** If even a Spark or database job fails with a memory error, you may need to allocate more resources to that engine (e.g., use a larger Snowflake warehouse or increase the executor memory in Spark). This is an administrative task.

### 6. Common Challenges and Solutions
- **Challenge:** "The 'Run on database' option is not available."
- **Solution:** This means your input and output datasets for that recipe are not on the same database connection. You may need to use a **Sync recipe** first to move your data into the database before you can process it there.
- **Challenge:** "My Python recipe is too complex to rewrite with an iterator."
- **Solution:** Consider using a **PySpark recipe**. The Spark DataFrame API is very similar to Pandas and allows you to perform complex transformations in a distributed way.
`,
  },
  {
    id: 322,
    slug: 'correcting-python-syntax-errors',
    question: 'How to get started with correcting indentation or syntax errors in Python code?',
    answer: `
### 1. Introduction/Overview
Python syntax errors, especially \`IndentationError\`, are common for beginners. These errors prevent your code from running at all. Learning to read the error message and use your code editor's features is the key to fixing them quickly.

### 2. Prerequisites
- **A Python recipe or notebook** with a syntax error.
- **The error message** from the job log or notebook output.

### 3. Step-by-Step Instructions
1.  **Read the Error Message Carefully:**
    *   Python's error messages are very helpful. For a syntax error, it will usually show you the exact line (and sometimes point to the specific character) where it got confused.
    *   **Example \`IndentationError: expected an indented block\`:** This means you have a line with a colon (\`:\`) like an \`if\` statement or \`for\` loop, and the very next line is not indented.
2.  **Understand Python's Indentation:**
    *   Unlike many other languages, Python uses whitespace (indentation) to define code blocks. It is not optional.
    *   The standard is to use **4 spaces** for each level of indentation.
    *   All lines within the same block must have the exact same level of indentation.
3.  **Use Your Editor's Features:**
    *   The Dataiku code recipe editor has syntax highlighting, which can help you spot issues.
    *   **Mixing Tabs and Spaces:** This is a common, invisible cause of indentation errors. Configure your editor to **use spaces instead of tabs** to prevent this.
4.  **Use a Linter:**
    *   A linter is a tool that automatically checks your code for style and syntax errors.
    *   Integrating a linter like \`flake8\` into your workflow can catch these errors before you even run the code.

### 4. Resources and Tools
- **The Python Traceback:** The error message is your best guide.
- **A good text editor:** Configure it to show whitespace characters and use spaces for indentation.
- **A Linter (\`flake8\`, \`black\`):** Automated tools to help enforce correct syntax and style.

### 5. Next Steps and Progression
- **Develop Muscle Memory:** Over time, you will develop a feel for correct Python indentation.
- **Review Code:** Reading well-formatted Python code is a great way to internalize the correct style.

### 6. Common Challenges and Solutions
- **Challenge:** "I fixed the indentation on that line, but now I get an error on the next line."
- **Solution:** This often happens when you fix one indentation level, but the following lines are still at the wrong level. Remember that all lines in a block must be aligned. You may need to fix the indentation for the entire block of code.
- **Challenge:** "I'm getting a generic \`SyntaxError: invalid syntax\`."
- **Solution:** This is a more general error. Look closely at the line indicated. Common causes include a missing colon (\`:\`) at the end of an \`if\`, \`for\`, or \`def\` statement, or an unclosed parenthesis or quote.
`,
  },
  {
    id: 323,
    slug: 'integrating-scikit‑learn-pipelines-in-python-recipes',
    question: 'How to get started with integrating scikit‑learn pipelines in Python recipes?',
    answer: `
### 1. Introduction/Overview
Scikit-learn's \`Pipeline\` object is a powerful tool for chaining together multiple data preprocessing and modeling steps into a single, reusable component. You can easily integrate these pipelines into a Dataiku Python recipe to create a clean, robust, and reproducible machine learning workflow.

### 2. Prerequisites
- **Knowledge of the Scikit-learn \`Pipeline\` API.**
- **A prepared dataset** for modeling.
- **A code environment** with \`scikit-learn\` installed.

### 3. Step-by-Step Instructions
1.  **Create a Python Recipe:** Set up a Python recipe that takes your prepared data as input and has an output for the predictions and a managed folder for the saved model.
2.  **Write the Pipeline Definition:** In your Python recipe, import the necessary modules (\`Pipeline\`, transformers, and your chosen estimator). Define the steps of your pipeline.
    > \`\`\`python
    > from sklearn.pipeline import Pipeline
    > from sklearn.preprocessing import StandardScaler
    > from sklearn.impute import SimpleImputer
    > from sklearn.linear_model import LogisticRegression
    >
    > # Define the pipeline
    > my_pipeline = Pipeline(steps=[
    >     ('imputer', SimpleImputer(strategy='median')),
    >     ('scaler', StandardScaler()),
    >     ('classifier', LogisticRegression())
    > ])
    > \`\`\`
3.  **Train the Pipeline:**
    *   Read your data into a Pandas DataFrame.
    *   Split your data into features (X) and target (y).
    *   Train the entire pipeline with a single \`.fit()\` call.
    > \`my_pipeline.fit(X_train, y_train)\`
4.  **Save the Trained Pipeline:**
    *   The entire trained pipeline object can be saved. Use a library like \`joblib\` to serialize the object.
    *   Save the serialized file to a Dataiku **Managed Folder**.
5.  **Use the Pipeline for Predictions:**
    *   In a separate "scoring" recipe, load the saved pipeline from the managed folder.
    *   Use \`loaded_pipeline.predict(new_data)\` to make predictions.

### 4. Resources and Tools
- **Scikit-learn Documentation:** The official guide for the \`Pipeline\` object.
- **Python Recipe:** The environment for your code.
- **Managed Folder:** The correct place to store your saved model/pipeline artifacts.
- **\`joblib\` library:** The standard way to save and load Scikit-learn objects.

### 5. Next Steps and Progression
- **ColumnTransformer:** Use \`ColumnTransformer\` within your pipeline to apply different preprocessing steps to different columns (e.g., scale numerical features and one-hot encode categorical features).
- **GridSearchCV:** Wrap your pipeline in a \`GridSearchCV\` object to automatically search for the best hyperparameters for all steps in your pipeline.
- **Dataiku's Visual ML:** For many standard use cases, Dataiku's visual machine learning lab automatically creates and manages these pipelines for you. Use a custom Python recipe when you need a level of customization that the visual tools don't offer.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm getting a 'data leakage' warning."
- **Solution:** This can happen if you fit your preprocessors (like an imputer or scaler) on the entire dataset before splitting into train and test sets. A key benefit of the Scikit-learn Pipeline is that it prevents this. It correctly fits the transformers on only the training data during the \`.fit()\` call.
- **Challenge:** "How do I see what the pipeline is doing?"
- **Solution:** You can access the individual steps of a fitted pipeline by name. For example, \`my_pipeline.named_steps['classifier'].coef_\` would let you inspect the coefficients of the trained logistic regression model.
`,
  },
  {
    id: 324,
    slug: 'connecting-to-external-apis-securely',
    question: 'How to get started with connecting to external APIs securely in code recipes?',
    answer: `
### 1. Introduction/Overview
Connecting to external APIs is a common task for enriching data or automating processes. Doing this securely is critical. The most important rule is to **never hardcode credentials** like API keys directly in your code. Dataiku provides a secure way to manage these secrets using Project Variables.

### 2. Prerequisites
- **API Documentation:** You need the URL and authentication details for the external API.
- **An API Key** or other credential from the service provider.
- **A project in Dataiku.**

### 3. Step-by-Step Instructions
1.  **Store the Secret in Project Variables:**
    *   In your project, go to **... > Variables**.
    *   Click **Edit** and **+ ADD VARIABLE**.
    *   Give the variable a name (e.g., \`MY_SERVICE_API_KEY\`).
    *   **Crucially, set the type to "Password".** This will encrypt the secret and hide its value from being displayed in the UI or logs.
    *   Paste your API key into the value field and save.
2.  **Create a Python Recipe:** This is where you will write your API call logic.
3.  **Retrieve the Secret in Your Code:**
    *   In your Python recipe, use the Dataiku API to get the secret from the project variables.
    > \`\`\`python
    > import dataiku
    > variables = dataiku.get_custom_variables()
    > api_key = variables.get("MY_SERVICE_API_KEY")
    > \`\`\`
4.  **Make the API Call:** Use a library like \`requests\`. Pass your retrieved API key in the request headers, as required by the API's documentation.
    > \`\`\`python
    > import requests
    > headers = {
    >     "Authorization": f"Bearer {api_key}"
    > }
    > response = requests.get("https://api.externalservice.com/data", headers=headers)
    > \`\`\`
### 4. Resources and Tools
- **Project Variables (Password type):** The secure, standard way to manage secrets in Dataiku.
- **Python \`requests\` library:** The standard library for making HTTP calls.
- **API Documentation** from the external service provider.

### 5. Next Steps and Progression
- **Central Secrets Management:** For enterprise-level security, a Dataiku administrator can integrate the instance with a dedicated secrets vault like HashiCorp Vault or Azure Key Vault. Your code can then retrieve secrets directly from this central vault.
- **Error Handling:** Wrap your API calls in \`try...except\` blocks to handle network errors or authentication failures gracefully.

### 6. Common Challenges and Solutions
- **Challenge:** "I've committed my project to Git, is the API key exposed?"
- **Solution:** No. The *values* of your project variables are not committed to Git, only their names. This is a key security feature. The values are stored securely within the Dataiku instance itself.
- **Challenge:** "I'm getting a 401 or 403 authentication error."
- **Solution:** This means your key is invalid or you are not presenting it correctly. Double-check that you copied the key correctly. Read the API's documentation carefully to see the exact format required for the Authorization header.
`,
  },
  {
    id: 325,
    slug: 'parameterizing-code-recipes-with-variables',
    question: 'How to get started with parameterizing code recipes using project variables?',
    answer: `
### 1. Introduction/Overview
Hardcoding values like thresholds, file paths, or filter conditions directly in your recipes makes them inflexible and difficult to maintain. **Project Variables** allow you to externalize these parameters, so you can change the behavior of a recipe without editing its code.

### 2. Prerequisites
- **A code recipe (Python or SQL)** with a hardcoded value you want to parameterize.
- **A Dataiku project.**

### 3. Step-by-Step Instructions
1.  **Create a Project Variable:**
    *   Go to your project's **... > Variables** page.
    *   Click **Edit** and **+ ADD VARIABLE**.
    *   Give it a name (e.g., \`price_threshold\`) and a value (e.g., \`100.0\`). Save your changes.
2.  **Use the Variable in a SQL Recipe:**
    *   In a SQL recipe, you can directly reference the variable using the \`\${variable_name}\` syntax. Dataiku performs a simple text substitution before executing the query.
    > \`\`\`sql
    > SELECT * FROM my_input WHERE price > \${price_threshold}
    > \`\`\`
3.  **Use the Variable in a Python Recipe:**
    *   **Method A (Substitution):** You can use the same \`\${...}\` syntax for simple cases.
        > \`threshold = \${price_threshold}\`
    *   **Method B (API - Recommended):** A more robust method is to fetch the variables as a dictionary using the Dataiku API. This is better because it avoids syntax errors and makes it clear that the values are coming from an external configuration.
    > \`\`\`python
    > import dataiku
    > variables = dataiku.get_custom_variables()
    > threshold = float(variables.get('price_threshold')) # All variables are strings, so cast if needed
    > filtered_df = df[df['price'] > threshold]
    > \`\`\`
### 4. Resources and Tools
- **Project Variables page:** The central place to define and manage your parameters.
- **The \`\${...}\` syntax:** For simple substitution in SQL and Python.
- **The \`dataiku.get_custom_variables()\` function:** The robust API method for Python.

### 5. Next Steps and Progression
- **Scenario Overrides:** The real power of variables comes from automation. In a **Scenario**, you can set different values for your variables for a specific run. This allows you to run the same recipe with different parameters (e.g., run the pipeline for different regions by changing a \`region_filter\` variable).
- **Environment Promotion:** Use variables for things that change between environments, like database names. When you deploy your project from dev to prod, you can easily update the variable values without touching your code.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm getting a syntax error in my SQL recipe."
- **Solution:** If your variable is a string, you need to remember to put quotes around it in your SQL query: \`WHERE country = '\${country_name}'\`.
- **Challenge:** "I'm getting a \`TypeError\` in Python."
- **Solution:** When you retrieve variables using the Dataiku API, they are always returned as strings. If you need to use it as a number, you must explicitly cast it: \`my_number = int(variables.get('my_number_var'))\`.
`,
  },
  {
    id: 326,
    slug: 'committing-code-recipes-to-git',
    question: 'How to get started with committing code recipes to Git and handling diff conflicts?',
    answer: `
### 1. Introduction/Overview
Using Git to version control your Dataiku project is a best practice for collaboration and reproducibility. When you make a change to a code recipe, you should commit it to your Git repository with a clear message explaining the change. This creates a full audit trail of your work.

### 2. Prerequisites
- **Your Dataiku project must be linked to a Git repository.**
- **You have made a change** to a Python or SQL recipe.

### 3. Step-by-Step Instructions: The Commit Workflow
1.  **Navigate to the Git Page:** After saving your changes to the recipe, click the **Git** icon in your project's top navigation bar.
2.  **Review Your Changes (Diff):**
    *   Dataiku will show your modified recipe in the "Changes" panel.
    *   Click on it. Dataiku will display a "diff" view, highlighting the exact lines you have added (in green) or removed (in red). Review this to make sure the changes are what you expect.
3.  **Stage Your Changes:**
    *   Select the checkbox next to the recipe you want to commit. This moves it from "Changes" to the "Staged changes" area.
4.  **Write a Commit Message:**
    *   In the text box at the bottom, write a clear and concise message describing your change.
    *   **Bad message:** "updates"
    *   **Good message:** "Fix bug in sales tax calculation for EU region"
5.  **Commit and Push:**
    *   Click the **Commit** button. This saves the change to your *local* Git repository on the Dataiku server.
    *   Click the **Push** button to send your commit to the *remote* repository (e.g., GitHub), making it visible to your teammates.

### 4. Resources and Tools
- **Dataiku's Git Page:** Your UI for staging, committing, pushing, and pulling.
- **The "Diff" Viewer:** The tool for reviewing your changes before you commit.
- **Your Git Provider's Website (GitHub, etc.):** Where you can view the full commit history and create pull requests.

### 5. Next Steps and Progression
- **Pull Requests:** Instead of pushing directly to the main branch, push your changes to a feature branch. Then, create a **Pull Request** on GitHub. This allows a teammate to review your code and provide feedback before it's merged.
- **Handling Merge Conflicts:** If you and a teammate change the same lines in the same recipe, you will get a merge conflict when you try to pull their changes. Dataiku provides a visual merge tool to help you resolve these conflicts by choosing which version of the code to keep.

### 6. Common Challenges and Solutions
- **Challenge:** "I committed something by mistake."
- **Solution:** If you haven't pushed it yet, you can use the Git "Revert" feature in Dataiku to undo the commit. If you've already pushed, the standard Git practice is to create a new commit that reverts the changes from the previous one.
- **Challenge:** "The diff is hard to read."
-   **Solution:** This can happen with large changes. It's a best practice to make small, frequent commits, each focused on a single logical change. This makes the history much easier to read and review.
`,
  },
  {
    id: 327,
    slug: 'using-r-recipes-with-missing-packages',
    question: 'How to get started with using R recipes when R packages are not installed?',
    answer: `
### 1. Introduction/Overview
Similar to Python, R recipes in Dataiku rely on **code environments** to manage dependencies. If you try to use a package in your R code that isn't installed in the recipe's environment, you will get a "package not found" error. The solution is to add the missing package to the environment's configuration.

### 2. Prerequisites
- **R configured on your Dataiku instance** (an admin task).
- **An R recipe** where you want to use a specific package (e.g., \`dplyr\`).
- **Administrator rights** to modify code environments.

### 3. Step-by-Step Instructions
1.  **Identify the Error:** When you run your R recipe, the job log will show an error like: \`Error in library(dplyr) : there is no package called 'dplyr'\`. This clearly tells you what is missing.
2.  **Find the Code Environment:** In your project, go to **Settings > Code Env** and find the name of the R environment your project is using.
3.  **Add the Package (Admin Task):**
    *   An administrator must go to **Administration > Code Envs** and select the R environment.
    *   In the "Packages to install" section, click **Add**.
    *   Enter the name of the package as it appears on CRAN (the R package repository), for example, \`dplyr\`.
    *   You can also specify a version if needed.
4.  **Save and Build:** Click **Save and update**. Dataiku will now install the R package and its dependencies into the isolated environment.
5.  **Rerun the Recipe:** Once the environment has finished building, you can go back to your R recipe and run it again. The \`library(dplyr)\` call should now succeed.

### 4. Resources and Tools
- **Administration > Code Envs:** The central UI for managing R package dependencies.
- **CRAN (The Comprehensive R Archive Network):** The public repository for finding R packages.
- **The Job Log:** The place where you will find the error message indicating a missing package.

### 5. Next Steps and Progression
- **Standard Environments:** Create a standard, shared R environment for your organization that includes the most commonly used packages (\`tidyverse\`, \`data.table\`, etc.) so that developers don't have to request new packages as often.
- **Version Management:** For reproducibility, it's a good practice to specify the versions of the R packages in your code environment, just as you would for Python.

### 6. Common Challenges and Solutions
- **Challenge:** "The package installation is failing."
- **Solution:** Some R packages have system-level dependencies (e.g., they need a specific library installed on the operating system). The build log will provide details. You may need to work with your Dataiku administrator to install these system dependencies on the server before the R package can be installed.
- **Challenge:** "I added the package, but the recipe still can't find it."
- **Solution:** Double-check that your recipe is actually configured to use the code environment that you modified. Go to the recipe's **Advanced** settings and verify the "Code Env" selection.
`,
  },
  {
    id: 328,
    slug: 'breaking-long-sql-queries',
    question: 'How to get started with breaking long SQL queries by proper line continuation?',
    answer: `
### 1. Introduction/Overview
Writing your entire SQL query as one long line is bad for readability and maintainability. SQL is very flexible with whitespace, and you should use this to your advantage by breaking your query into logical, indented sections. This makes it much easier for you and your teammates to understand and debug.

### 2. Prerequisites
- **A long SQL query** in a Dataiku SQL recipe.

### 3. Step-by-Step Instructions: A Style Guide for Readability
There is no single "correct" style, but the following is a very common and highly readable convention.

1.  **One Clause Per Line:** Start each major SQL clause (\`SELECT\`, \`FROM\`, \`WHERE\`, \`GROUP BY\`, \`ORDER BY\`) on a new line.
2.  **Indent Field Lists:** If your \`SELECT\` statement has many columns, put each column on its own line, indented under the \`SELECT\` keyword.
3.  **Align Keywords:** Align all the major clause keywords vertically.
4.  **Use Comments:** Use SQL comments (\`--\` for a single line, \`/* ... */\` for a block) to explain complex parts of your logic.

#### Example
- **Bad, Unreadable Query:**
> \`SELECT customer_id, name, COUNT(order_id) FROM customers c JOIN orders o ON c.id = o.customer_id WHERE c.country = 'USA' GROUP BY c.customer_id, c.name ORDER BY COUNT(order_id) DESC;\`

- **Good, Readable Query:**
> \`\`\`sql
> -- Calculate the total number of orders for each US-based customer
> SELECT
>     c.customer_id,
>     c.name,
>     COUNT(o.order_id) AS number_of_orders
> FROM
>     customers c
> LEFT JOIN
>     orders o ON c.customer_id = o.customer_id
> WHERE
>     c.country = 'USA'
> GROUP BY
>     c.customer_id,
>     c.name
> ORDER BY
>     number_of_orders DESC;
> \`\`\`

### 4. Resources and Tools
- **The SQL Recipe Editor:** Your workspace for writing and formatting your queries.
- **SQL Formatters:** There are many online tools and editor plugins that can automatically format your SQL code according to a standard style.

### 5. Next Steps and Progression
- **Common Table Expressions (CTEs):** For very complex queries, use CTEs (\`WITH\` clauses) to break the logic down into named, sequential steps. This is the best way to make a highly complex query understandable. Each CTE can act like a temporary, intermediate recipe.

### 6. Common Challenges and Solutions
- **Challenge:** "Does all this extra whitespace affect performance?"
- **Solution:** No. The database's SQL parser ignores whitespace like spaces, tabs, and newlines. Formatting has zero impact on performance; its only purpose is human readability.
- **Challenge:** "My team uses a different style."
- **Solution:** Consistency is more important than any single style. The best style guide is the one your team agrees on and uses consistently. Document your chosen style in your team's Wiki.
`,
  },
  {
    id: 329,
    slug: 'testing-code-logic-in-notebooks',
    question: 'How to get started with testing code logic locally using notebooks before recipe run?',
    answer: `
### 1. Introduction/Overview
Before you create a formal, production-ready recipe, it's often useful to experiment with your code in a more interactive environment. **Jupyter Notebooks** in Dataiku are the perfect tool for this. They allow you to write and run code in small chunks (cells), see the output immediately, and iteratively develop your logic.

### 2. Prerequisites
- **A data analysis or transformation idea** that involves code.
- **A dataset** to test your logic on.
- **A configured code environment** (Python or R).

### 3. Step-by-Step Instructions: The Notebook-to-Recipe Workflow
1.  **Create a New Notebook:**
    *   In your project, go to the **Notebooks** tab.
    *   Click **+ New Notebook** and choose your language (e.g., Python).
    *   Make sure to select the correct code environment.
2.  **Load a Sample of Your Data:**
    *   In the first cell of the notebook, use the Dataiku API to read your input dataset.
    *   **Crucially, only read a sample.** You don't need the full dataset for development. This makes your interactive tests much faster.
    > \`\`\`python
    > import dataiku
    > df = dataiku.Dataset("my_large_dataset").get_dataframe(sampling='head', limit=10000)
    > \`\`\`
3.  **Develop and Test Interactively:**
    *   In subsequent cells, write your code one logical step at a time.
    *   Run each cell to see the intermediate results. Use \`print()\`, \`df.head()\`, or plotting libraries to inspect your data at each stage.
    *   This interactive loop of writing code, running it, and seeing the output is what makes notebooks so powerful for development.
4.  **"Productionize" into a Recipe:**
    *   Once you are confident that your code is correct and complete, it's time to move it into a recipe.
    *   Create a new **Python recipe**.
    *   Copy the finalized code from your notebook cells into the recipe's editor.
    *   Remove the sampling from the data loading step to ensure the recipe runs on the full dataset.
    *   Add code to write the final DataFrame to the recipe's output.

### 4. Resources and Tools
- **Jupyter Notebooks:** Your interactive development environment.
- **The \`.get_dataframe()\` sampling parameters:** Key for fast iteration on large data.
- **Python Recipes:** The final, production-ready home for your code.

### 5. Next Steps and Progression
- **Document as You Go:** Use Markdown cells in your notebook to document your thought process. When you're done, the notebook serves as a record of how you developed the final recipe logic.
- **Share Notebooks:** You can share your notebooks with colleagues for them to review your exploratory analysis.

### 6. Common Challenges and Solutions
- **Challenge:** "My code works in the notebook but fails when I move it to a recipe."
- **Solution:** This is often an environment or data issue. First, double-check that the recipe is using the exact same code environment as the notebook. Second, remember that the recipe runs on the *full* dataset. Your code might be failing on an edge case or a data quality issue that was not present in your small sample.
- **Challenge:** "My notebook is becoming a mess of unordered cells."
- **Solution:** It's a good practice to periodically use the "Restart Kernel and Run All Cells" command. This runs your entire notebook from top to bottom, ensuring that the logic is sequential and reproducible.
`,
  },
  {
    id: 330,
    slug: 'capturing-execution-logs-from-code-recipes',
    question: 'How to get started with capturing execution logs from code recipes for troubleshooting?',
    answer: `
### 1. Introduction/Overview
When a code recipe runs as part of an automated scenario, you can't see the output directly. The **Job Log** is the primary way to understand what happened during the execution. Capturing custom log messages is essential for debugging failures and monitoring the recipe's behavior.

### 2. Prerequisites
- **A Python or R code recipe.**
- **A need to record information** during the recipe's execution.

### 3. Step-by-Step Instructions

#### Method 1: Using Basic \`print()\` Statements (Simple & Effective)
- **What it is:** The simplest way to log information. Anything you \`print()\` in your recipe will be captured and displayed in the job log.
- **How to use:**
    *   Sprinkle \`print()\` statements throughout your code to track its progress.
    *   Print the shape of a DataFrame, the value of a key variable, or a simple status message.
    > \`\`\`python
    > print("Starting recipe execution...")
    > df = input_dataset.get_dataframe()
    > print(f"Input dataframe has {df.shape[0]} rows.")
    > # ... your logic here ...
    > print("Recipe execution finished successfully.")
    > \`\`\`
- **How to view:** Run the recipe. Go to the **Jobs** menu, find the run, and open the log for the recipe step. You will see all your printed messages.

#### Method 2: Using Python's \`logging\` Module (More Advanced)
- **What it is:** Python's built-in logging module offers more control, including different log levels (DEBUG, INFO, WARNING, ERROR).
- **How to use:**
    *   Import the \`logging\` module.
    *   Use the different logging functions to record messages with different severity levels.
    > \`\`\`python
    > import logging
    > logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    >
    > logging.info("This is an informational message.")
    > logging.warning("This is a warning message.")
    > \`\`\`
- **Why it's useful:** It allows you to configure the log verbosity. In development, you might show all DEBUG messages, but in production, you might only log INFO and higher.

### 4. Resources and Tools
- **The Job Log:** The place where all your logs are stored and viewed.
- **The \`print()\` function:** The simplest logging tool.
- **Python's \`logging\` module:** For more structured, level-based logging.

### 5. Next Steps and Progression
- **Custom Log Dataset:** For critical pipelines, you can create a dedicated log dataset. Your Python recipe can write structured log entries (e.g., with columns for timestamp, message, status) to this dataset in "append" mode. This creates an audit trail that you can analyze and build dashboards on.
- **Error Handling:** In a \`try...except\` block, use \`logging.error()\` to capture the details of any exceptions that occur.

### 6. Common Challenges and Solutions
- **Challenge:** "My logs are too noisy; I can't find anything."
- **Solution:** You are printing too much. Be strategic about what you log. Log key milestones, variable states, and errors. Using the \`logging\` module can help you filter for only the most important messages.
- **Challenge:** "Where do the logs go?"
- **Solution:** They are automatically captured by Dataiku. Every time you run a recipe, a job is created. Find that job in the "Jobs" menu, and you will find the log attached to the recipe step within that job.
`,
  },
  {
    id: 331,
    slug: 'organizing-datasets-into-flow-zones',
    question: 'How to get started with organizing datasets into Flow Zones?',
    answer: `
### 1. Introduction/Overview
As a project grows, your Flow can become a complex web of datasets and recipes. **Flow Zones** are the essential tool for managing this complexity. They are visual containers that allow you to group related items, creating a clean, high-level, and understandable project architecture.

### 2. Prerequisites
- **A Dataiku project with a Flow** that has more than a few items.
- **A logical understanding of your pipeline's stages.**

### 3. Step-by-Step Instructions
1.  **Plan Your Zone Structure:** Before you start, think about the logical stages of your pipeline. A very common and effective structure is based on data maturity:
    *   **Zone 1: Raw Data / Ingestion:** Where all your source datasets live.
    *   **Zone 2: Data Preparation:** Where cleaning, joining, and transformation happens.
    *   **Zone 3: Feature Engineering / Modeling:** For machine learning projects.
    *   **Zone 4: Final Outputs:** For the final, aggregated datasets ready for consumption.
2.  **Create Your First Zone:**
    *   In the Flow, right-click on an empty part of the canvas.
    *   Select **Create Flow Zone**.
    *   Give it a name. It's a best practice to number them to enforce order (e.g., \`1_Data_Ingestion\`).
3.  **Move Items into the Zone:**
    *   Select the datasets and recipes that belong in that zone by holding down the \`Shift\` key and clicking on them.
    *   Drag the entire group of selected items and drop them anywhere inside the new zone's boundary.
4.  **Repeat for All Stages:** Create the other zones (\`2_Data_Preparation\`, etc.) and move the appropriate items into them.
5.  **Collapse the Zones:** Click the minus (\`-\`) icon on a zone to collapse it. This hides the internal details and shows only the connections between zones. This gives you a clean, high-level view of your entire project architecture.

### 4. Resources and Tools
- **The Flow canvas:** The interface for creating and managing zones.
- **Project Wiki:** Document your standard Flow Zone structure here so all team members build their projects in a consistent way.

### 5. Next Steps and Progression
- **Nested Zones:** You can even create Flow Zones inside other Flow Zones for more granular organization in very complex projects.
- **Communication:** Use the collapsed Flow Zone view when presenting your project to stakeholders. It allows you to explain the overall process without getting lost in the technical details.

### 6. Common Challenges and Solutions
- **Challenge:** "My Flow still looks messy even with zones."
- **Solution:** Manually arrange the zones on the canvas to create a clean, left-to-right flow of data. You can also use the "Arrange" button *inside* a zone to automatically tidy up the items within it.
- **Challenge:** "An item seems to belong in two different zones."
- **Solution:** An item can only be in one zone. A dataset's zone is determined by the recipe that creates it. Place it in the zone that best represents its stage of maturity.
`,
  },
  {
    id: 332,
    slug: 'renaming-datasets-without-breaking-recipes',
    question: 'How to get started with renaming datasets without breaking recipes?',
    answer: `
### 1. Introduction/Overview
As projects evolve, you may need to rename a dataset to be more descriptive or to conform to new naming conventions. In many traditional coding environments, this would be a risky operation requiring a manual "find and replace" across many scripts. In Dataiku, this process is safe and easy, as the platform automatically manages these dependencies.

### 2. Prerequisites
- **A dataset in your Flow** that you wish to rename.

### 3. Step-by-Step Instructions
1.  **Locate the Dataset in the Flow:** Find the dataset you want to rename.
2.  **Open the Summary Panel:** Click on the dataset. The summary panel will open on the right.
3.  **Click the Name to Edit:** The name of the dataset at the top of the summary panel is editable.
    *   Click on the name.
    *   Type the new name for your dataset.
    *   Press **Enter**.
4.  **Observe the Automatic Update:** Dataiku will automatically update all the recipes that use this dataset as an input or output. You do not need to manually go into each recipe and change the name. The lineage and all connections are preserved.

### 4. Resources and Tools
- **The Summary Panel:** The side panel in the Flow view where you can see and edit an object's properties.

### 5. Next Steps and Progression
- **Standardize Naming:** Use this feature to enforce your team's naming conventions. If you see a poorly named dataset, you can confidently rename it to something clearer.
- **Renaming Recipes:** The same process applies to renaming recipes. Just click on the recipe, and edit its name in the summary panel. Dataiku will maintain the connections.

### 6. Common Challenges and Solutions
- **Challenge:** "I renamed a dataset, but a code recipe failed with 'Dataset not found'."
- **Solution:** This can happen if your code recipe refers to the dataset by its name as a hardcoded string.
    *   **Bad Code:** \`my_dataset = dataiku.Dataset("old_dataset_name")\`
    *   **The Fix:** You must update the string in your code to reflect the new name.
    *   **Best Practice:** A better way is to use the Dataiku API to get the inputs and outputs programmatically without hardcoding names, which makes the recipe more robust to renaming.
    > \`\`\`python
    > # In a recipe with one input and one output
    > input_name = dataiku.get_recipe_config()['inputs']['main']['items'][0]['ref']
    > input_dataset = dataiku.Dataset(input_name)
    > \`\`\`
- **Challenge:** "I can't edit the name."
- **Solution:** You may not have the necessary permissions. You typically need "Contributor" or "Administrator" rights on the project to rename objects.
`,
  },
  {
    id: 333,
    slug: 'visual-clutter-in-flow',
    question: 'How to get started with visual clutter in Flow and grouping logical zones?',
    answer: `
### 1. Introduction/Overview
A visually cluttered Flow with tangled lines is difficult to understand and maintain. The primary tools for managing this clutter and creating a clean, professional-looking pipeline are **Flow Zones** for grouping and the **Arrange** button for automatic layout.

### 2. Prerequisites
- **A messy, cluttered Dataiku Flow.**

### 3. Step-by-Step Instructions
1.  **Group with Flow Zones:**
    *   First, impose a high-level structure on your flow.
    *   Create logical **Flow Zones** for the major stages of your project (e.g., \`1_Ingestion\`, \`2_Preparation\`, \`3_Modeling\`).
    *   Drag and drop the related items into these zones.
2.  **Arrange Items Within a Zone:**
    *   After moving items into a zone, they might still be messy inside it.
    *   Click the "three dots" menu on the Flow Zone itself and select **Arrange zone items**. Dataiku will automatically lay out the items inside that zone for better readability.
3.  **Arrange the Entire Flow:**
    *   You can also use the global **Arrange** button (usually in the bottom right of the Flow view) to tidy up all items in your Flow that are not inside a zone.
4.  **Collapse Zones for a High-Level View:**
    *   Once your zones are organized, **collapse** them by clicking the minus (\`-\`) icon.
    *   This hides all the internal complexity and shows you a clean, simple diagram of how your major stages connect to each other.
5.  **Manual Tweaking:**
    *   While the automatic arrangement is good, you should still manually drag your zones and key datasets to create a clear, left-to-right visual narrative of your data's journey.

### 4. Resources and Tools
- **Flow Zones:** The most powerful tool for grouping and managing complexity.
- **The "Arrange" button:** For automatic, one-click layout cleaning.

### 5. Next Steps and Progression
- **Standardized Layouts:** Establish a standard Flow Zone structure for your team to ensure all projects are organized in a consistent and predictable way.
- **Presentations:** Use the collapsed zone view when presenting your pipeline to stakeholders. It provides a perfect high-level overview without getting bogged down in technical details.

### 6. Common Challenges and Solutions
- **Challenge:** "The automatic 'Arrange' button made my layout worse."
- **Solution:** This can sometimes happen in very complex flows. Use it as a starting point. After the automatic arrange, you can manually drag individual items to fine-tune the layout to your preference.
- **Challenge:** "The connection lines between my collapsed zones are crossing and look confusing."
- **Solution:** You may need to re-think which datasets are the "outputs" of a zone. Try to have a single, primary dataset that exits a zone and connects to the next one. This simplifies the connections between zones.
`,
  },
  {
    id: 334,
    slug: 'troubleshooting-broken-links-from-deleted-datasets',
    question: 'How to get started with troubleshooting broken links due to deleted datasets?',
    answer: `
### 1. Introduction/Overview
In Dataiku, a "broken link" occurs when a recipe's required input dataset is missing or has been deleted. The Flow clearly visualizes this problem, making it easy to identify and fix.

### 2. Prerequisites
- **A recipe in the Flow** that is showing an error for a missing input.

### 3. Step-by-Step Instructions
1.  **Identify the Broken Link:**
    *   In the Flow, the recipe with the missing input will often be highlighted in red.
    *   The link between the missing dataset (which may appear as a red, ghosted item) and the recipe will be broken.
2.  **Understand the Cause:**
    *   The most common reason is that the input dataset was accidentally deleted.
    *   Another possibility is that the project was imported from another instance, and the input dataset (which might come from a different project) was not imported with it.
3.  **Fix the Link:** You have two main options:
    *   **Option A: Re-create the Missing Dataset.** If the dataset was deleted by mistake, you may need to rebuild it. Find the upstream recipe that was supposed to create it and run it. If the raw source dataset was deleted, you will need to re-import it.
    *   **Option B: Re-wire the Recipe to a Different Input.** If the deleted dataset was obsolete and has been replaced by a new one, you can edit the recipe to use the new input.
        1.  Open the recipe with the broken link.
        2.  Go to the **Input/Output** tab.
        3.  You will see the missing input listed in red. Click on it and choose **Change input**.
        4.  Select the new, correct dataset to use as the input.
        5.  Save the recipe. The link in the Flow will now be fixed.

### 4. Resources and Tools
- **The Visual Flow:** It clearly highlights the broken dependencies.
- **The Input/Output Tab:** The settings page inside a recipe where you can change its inputs and outputs.

### 5. Next Steps and Progression
- **Dependency Checking:** Before deleting any dataset, always use the **View downstream dependencies** feature (by right-clicking on the dataset). This will show you exactly what will break if you delete it, preventing the problem in the first place.
- **Git History:** If you are using Git and are unsure why a dataset was deleted, you can check the commit history to find the commit where the deletion happened and who did it.

### 6. Common Challenges and Solutions
- **Challenge:** "I deleted a dataset and can't get it back."
- **Solution:** If the project is not on Git and you have no backups, you may have to rebuild the dataset from scratch. This highlights the importance of using version control and having a backup strategy for critical projects.
- **Challenge:** "I fixed the input, but now the recipe fails with a schema error."
- **Solution:** The new input dataset you wired up does not have the same schema (column names and types) as the original one. You will need to edit the recipe's code or transformation steps to work with the new schema.
`,
  },
  {
    id: 335,
    slug: 'viewing-dataset-lineage',
    question: 'How to get started with viewing dataset lineage and recipe dependencies clearly?',
    answer: `
### 1. Introduction/Overview
Data lineage is the "family tree" of your data. It answers the question, "Where did this data come from and how was it made?". Dataiku automatically captures and visualizes lineage at both a high level (the Flow) and a very detailed level (column-level). Understanding how to read this lineage is essential for debugging, auditing, and impact analysis.

### 2. Prerequisites
- **A Dataiku project** with a flow of connected recipes and datasets.

### 3. Step-by-Step Instructions

#### Method 1: The Flow (High-Level Lineage)
1.  **Understand the Flow:** The Flow itself is a lineage diagram. It shows the dependencies between recipes and datasets.
2.  **View Upstream Dependencies:**
    *   To see how a specific dataset was created, right-click on it in the Flow.
    *   Select **View upstream dependencies**.
    *   Dataiku will highlight the entire chain of recipes and datasets that were used to produce it, all the way back to the raw sources.
3.  **View Downstream Dependencies (Impact Analysis):**
    *   To see what would be affected by a change, right-click on a dataset.
    *   Select **View downstream dependencies**.
    *   Dataiku will highlight every recipe, model, and dashboard that depends on this dataset.

#### Method 2: The Lineage Tab (Column-Level Lineage)
1.  **Open a Dataset:** In your Flow, open any dataset that is the output of a recipe.
2.  **Navigate to the Lineage Tab:** Click the **Lineage** tab in the top menu.
3.  **Select a Column:** On the right side of the screen, you will see the list of columns in your current dataset. Click on one of them.
4.  **Trace the Column's Origin:** The main panel will now display a detailed graph. This graph shows you exactly which columns from which source datasets were used, and which specific transformations were applied, to create the final column you selected.

### 4. Resources and Tools
- **The Flow view:** Your tool for high-level dependency and impact analysis.
- **The Lineage Tab:** Your tool for detailed, column-by-column auditing and debugging.

### 5. Next Steps and Progression
- **Debugging:** When you find an error in a specific column, the column-level lineage is the fastest way to trace the problem back to the recipe that created it.
- **Auditing and Compliance:** Use screenshots of the column-level lineage graph as definitive proof of data provenance for auditors.
- **Understanding Complex Logic:** Use the lineage graph to deconstruct and understand complex data pipelines built by others.

### 6. Common Challenges and Solutions
- **Challenge:** "My column-level lineage seems incomplete or broken."
- **Solution:** This almost always happens when a code recipe (Python/R/SQL) accesses data without formally declaring it as an input. To ensure full lineage, your code must use the Dataiku APIs to read and write data, and all sources must be added as formal inputs to the recipe.
`,
  },
  {
    id: 336,
    slug: 'refreshing-schema-metadata',
    question: 'How to get started with refreshing schema metadata when source changes?',
    answer: `
### 1. Introduction/Overview
When the schema of an external data source changes (e.g., a new column is added or a column is renamed in a source database table), you need to update Dataiku's metadata to reflect this change. This ensures that your pipelines don't fail due to unexpected schema mismatches.

### 2. Prerequisites
- **A dataset in Dataiku** that connects to an external source (like a SQL database or a cloud file).
- **A known change in the source schema.**

### 3. Step-by-Step Instructions
1.  **Navigate to the Dataset:** Open the dataset whose source schema has changed.
2.  **Go to the Settings Tab:** Click on the **Settings** tab.
3.  **Check for Schema Mismatches:**
    *   Dataiku often proactively checks for schema changes. You may see a warning message indicating that the schema is out of sync.
    *   In the "Schema" section, you can review the columns that Dataiku currently "thinks" the dataset has.
4.  **Refresh the Schema:**
    *   There is typically a button labeled **Check Now** or **Refresh schema from source**.
    *   Click this button. Dataiku will reconnect to the external source, re-read its schema, and show you a "diff" view comparing the old schema with the new one.
5.  **Confirm the Changes:**
    *   Review the changes. Dataiku will show you which columns have been added, deleted, or have had their types changed.
    *   If you are happy with the changes, click the **Update Schema** or **Save** button. Dataiku's metadata for this dataset is now up-to-date.

### 4. Resources and Tools
- **The Dataset Settings page:** The central place for managing a dataset's schema.
- **The "Check Schema" or "Refresh Schema" button:** The tool for triggering a re-scan of the source.

### 5. Next Steps and Progression
- **Propagate Schema Changes:** After updating a source dataset's schema, you will likely need to update your downstream recipes to account for the changes (e.g., to use a new column or handle a deleted one). Dataiku often provides a "Propagate schema changes" utility to help with this.
- **Automated Schema Checks:** For critical pipelines, you could create a scenario with a Python step that uses the API to programmatically check for schema changes and sends an alert if an unexpected change is detected.

### 6. Common Challenges and Solutions
- **Challenge:** "I refreshed the schema, but now my downstream recipe is failing."
- **Solution:** This is expected. If a column was renamed or deleted from the source, any recipe that was using that column will now fail with a "column not found" error. You must edit the recipe to either remove the reference to the old column or update it to use the new column name.
- **Challenge:** "The schema check is very slow."
- **Solution:** This can happen if the source is a folder containing a very large number of files. Dataiku may need to read the headers of many files to infer the schema.
`,
  },
  {
    id: 337,
    slug: 'tracking-downstream-effects',
    question: 'How to get started with tracking downstream effects when modifying upstream logic?',
    answer: `
### 1. Introduction/Overview
Before you make a change to any dataset or recipe in a Dataiku Flow, it is critical to understand the potential impact on all downstream processes. This "impact analysis" prevents you from making a small change that inadvertently breaks a critical report or model. Dataiku's automatic lineage makes this easy and visual.

### 2. Prerequisites
- **A Dataiku project** with a connected Flow.
- **A plan to modify** an "upstream" object (a dataset or recipe early in the flow).

### 3. Step-by-Step Instructions
1.  **Locate the Object to be Changed:** In your Flow, find the dataset or recipe you are planning to modify.
2.  **Right-Click and Select "View downstream dependencies":** This is the key action.
3.  **Analyze the Highlighted Path:**
    *   Dataiku will instantly highlight every single object in the Flow that depends on the item you selected.
    *   This includes all downstream recipes, datasets, machine learning models, dashboards, and webapps.
    *   The highlighted path shows you the complete "blast radius" of your potential change.
4.  **Review the Impacted Objects:**
    *   Look at the highlighted items. Are any of them critical?
    *   For example, does your change affect the input to a production model or the final dataset used by an executive dashboard?
5.  **Plan Your Changes and Communication:**
    *   Now that you understand the impact, you can plan accordingly.
    *   You will need to test all the highlighted downstream objects after you make your change.
    *   You may need to communicate with the owners of the impacted dashboards or models to let them know about the upcoming change.

### 4. Resources and Tools
- **The "View downstream dependencies" feature:** Your primary tool for impact analysis. It is accessible via a right-click on any object in the Flow.
- **The Lineage Tab:** For a more detailed view, you can use the lineage tab to see how a change to a specific *column* might affect downstream columns.

### 5. Next Steps and Progression
- **Making it a Habit:** Make impact analysis a mandatory first step before any modification. It should become a natural reflex for any Dataiku developer.
- **Change Management Process:** For critical production projects, use this feature as part of a formal change management process. A developer might need to include a screenshot of the downstream dependencies in their change request ticket to show they have assessed the impact.

### 6. Common Challenges and Solutions
- **Challenge:** "The downstream dependency path is huge. I don't know what all these things are."
- **Solution:** This indicates the project may be poorly documented. This is where good descriptions on all objects are essential. Hover over the highlighted items to read their descriptions and understand their purpose. You may need to talk to other team members who own the downstream components.
- **Challenge:** "Does this feature work for code recipes?"
- **Solution:** Yes, as long as the code recipe correctly declares its inputs and outputs using the Dataiku API. If it does, it will be part of the lineage graph like any other recipe.
`,
  },
  {
    id: 338,
    slug: 'resolving-circular-dependencies',
    question: 'How to get started with resolving circular dependencies in Flow?',
    answer: `
### 1. Introduction/Overview
A circular dependency (or cycle) is a situation where A depends on B, and B also depends on A. This creates an impossible loop. Dataiku Flows are required to be **Directed Acyclic Graphs (DAGs)**, meaning these cycles are not allowed. Dataiku's UI will prevent you from creating them and will show a clear error if one exists.

### 2. Prerequisites
- **An understanding of dependencies:** A recipe depends on its inputs to create an output.

### 3. Step-by-Step Instructions
1.  **How a Cycle is Created:**
    *   Imagine you have: \`Dataset_A -> Recipe_1 -> Dataset_B\`.
    *   Now, you try to create a new recipe (\`Recipe_2\`) that takes \`Dataset_B\` as input and tries to write back to \`Dataset_A\`.
    *   This creates a cycle: \`A -> 1 -> B -> 2 -> A\`.
2.  **Identifying the Cycle:**
    *   Dataiku will not let you create this. When you try to configure \`Recipe_2\` to write to \`Dataset_A\`, it will show an error message like "Circular dependency detected."
    *   The Flow will often draw the problematic dependency with a red, dashed line.
3.  **Resolving the Cycle:**
    *   You must rethink your logic. A cycle means your pipeline's logic is fundamentally flawed.
    *   You cannot have a dataset that is both an ancestor and a descendant of another dataset.
    *   **The solution is almost always to create a new dataset.** Instead of having \`Recipe_2\` write back to \`Dataset_A\`, it should write to a new dataset, for example, \`Dataset_A_updated\`.
    *   Your new, valid flow would be: \`A -> 1 -> B -> 2 -> A_updated\`. This is a linear, acyclic graph.

### 4. Resources and Tools
- **The Dataiku Flow Validator:** The built-in mechanism that detects and prevents cycles.
- **Logical Flow Design:** The best tool is to plan your flow logically before you build, ensuring a clear, one-way progression of data.

### 5. Next Steps and Progression
- **Refactoring:** If you inherit a project with a very tangled flow, you may need to refactor it to make the data dependencies clearer and more linear, which will help prevent accidental attempts to create cycles.
- **Understanding Partitions:** With partitioned datasets, you can have a recipe that reads from partition N-1 of a dataset to build partition N of the same dataset. This is a special, valid case of self-dependency that Dataiku handles correctly.

### 6. Common Challenges and Solutions
- **Challenge:** "I really need to update the original dataset with new calculations."
- **Solution:** You can't have a recipe that reads from and writes to the exact same dataset. The standard pattern is to read from \`Dataset_A\`, apply your logic, and write the result to \`Dataset_A_prepared\`. Then, all downstream processes should use the new, prepared version.
- **Challenge:** "Dataiku is not letting me connect the recipe, and I don't understand why."
- **Solution:** Stop and trace the lineage carefully. Look at the inputs and outputs. You have almost certainly created a logical loop. Whiteboard the flow to see the dependency graph more clearly.
`,
  },
  {
    id: 339,
    slug: 'archiving-stale-datasets-safely',
    question: 'How to get started with archiving stale datasets safely without losing lineage?',
    answer: `
### 1. Introduction/Overview
Over time, projects can accumulate datasets that are no longer actively used. These "stale" datasets can clutter your Flow and consume storage space. Archiving is the process of safely saving the data and then removing the dataset from the active flow.

### 2. Prerequisites
- **A Dataiku project** with potentially stale or obsolete datasets.
- **A designated long-term storage location** (e.g., a specific folder in S3 or a network drive).
- **Project administrator rights** to delete datasets.

### 3. Step-by-Step Instructions
1.  **Identify Stale Datasets:**
    *   A dataset is stale if it is no longer used by any downstream recipe, model, or dashboard.
    *   **Use Impact Analysis:** Right-click on the dataset in the Flow and select **View downstream dependencies**. If there are none, it is a candidate for archiving.
2.  **Export the Data for Archive:**
    *   Before deleting, save the data.
    *   Select the dataset and use an **Export recipe**.
    *   Configure the recipe to export the data to your designated long-term archive location. It's a good practice to use an efficient storage format like Parquet and include a date in the filename.
3.  **Export the Schema:**
    *   Open the dataset, go to **Settings > Schema**, and use the option to download the schema as a JSON file. Save this in your archive folder alongside the data.
4.  **Delete the Dataset from the Flow:**
    *   Once you have safely exported the data and schema, you can delete the dataset from your project.
    *   Right-click on the dataset and choose **Delete**. Confirm the deletion. This will remove the dataset from the Flow and delete its data from Dataiku's active storage.
5.  **Document the Archive:**
    *   In your project's **Wiki**, create a page called "Archive Log."
    *   For each dataset you archive, add an entry noting its original name, the date it was archived, and the path to where the data is now stored.

### 4. Resources and Tools
- **"View downstream dependencies" feature:** Your safety check before deletion.
- **Export Recipe:** The tool for creating the data archive.
- **Project Wiki:** The place to document what has been archived and where it can be found.

### 5. Next Steps and Progression
- **Automated Archiving:** You could create a scenario with a Python step that periodically scans the project, identifies stale datasets based on their last build time and lack of dependencies, and then automatically runs the export and deletion process.
- **Data Retention Policies:** Implement an enterprise data retention policy that defines how long different types of data should be kept in active storage before being archived.

### 6. Common Challenges and Solutions
- **Challenge:** "I deleted a dataset that I needed."
- **Solution:** If you have archived the data and schema, you can re-import it. If not, you may need to restore it from a Dataiku backup. This emphasizes the importance of the impact analysis and export steps. Never delete without saving first.
- **Challenge:** "How is archiving different from just clearing the data?"
- **Solution:** "Clearing" a dataset removes its data but leaves the dataset object in the Flow. It is still an active part of the pipeline. "Archiving" involves exporting the data and then deleting the dataset object from the Flow entirely, as it is no longer part of the active pipeline.
`,
  },
  {
    id: 340,
    slug: 'multi-user-collaboration-flow-conflicts',
    question: 'How to get started with multi-user collaboration causing Flow conflicts?',
    answer: `
### 1. Introduction/Overview
When multiple developers work on the same Dataiku project simultaneously, they can sometimes overwrite each other's changes. The solution to this is to use a structured, collaborative workflow based on **Git integration**, which is designed specifically for managing concurrent development.

### 2. Prerequisites
- **A Dataiku project linked to a Git repository.**
- **A team of two or more developers.**
- **All team members should be familiar with basic Git concepts** (branch, commit, push, pull, merge).

### 3. Step-by-Step Instructions: A Safe Collaborative Workflow
1.  **Never Work Directly on the \`main\` Branch:** The \`main\` branch should represent the stable, production-ready version of the project. It should be protected.
2.  **Create a Feature Branch:**
    *   Before starting a new task, each developer must create their own **branch** from the latest version of \`main\`.
    *   In Dataiku's Git page, use the "Create branch" feature. Give the branch a descriptive name (e.g., \`feature/JIRA-123-new-sales-report\`).
3.  **Work in Isolation on Your Branch:**
    *   Each developer now works on their own branch. Any changes they make (editing recipes, creating datasets) are isolated to their branch and will not affect their teammates.
    *   They should commit and push their changes to their feature branch regularly.
4.  **Update Your Branch with Changes from \`main\`:**
    *   Periodically, developers should pull the latest changes from the shared \`main\` branch into their feature branch. This is done by using the **Pull** button on the Git page.
    *   This helps to integrate changes from other team members early and often, reducing the chance of large merge conflicts later.
5.  **Create a Pull Request for Review:**
    *   When a developer has finished their feature, they go to the Git provider's website (e.g., GitHub) and create a **Pull Request (PR)**.
    *   A PR is a formal request to merge the changes from their feature branch into the \`main\` branch.
6.  **Code Review and Merge:**
    *   Another team member must review the PR. They can see all the changes and provide comments.
    *   Once the PR is approved, the feature branch is merged into \`main\`. The new feature is now part of the stable project.

### 4. Resources and Tools
- **Dataiku's Git Integration:** The UI for branching and committing.
- **Your Git Provider (GitHub, GitLab, etc.):** The platform for managing pull requests and code reviews.
- **A defined branching strategy** (like GitFlow).

### 5. Next Steps and Progression
- **Handling Merge Conflicts:** If two developers edit the same recipe, a merge conflict can occur. Dataiku provides a visual merge tool to help you resolve these conflicts by choosing which version of the code to keep.

### 6. Common Challenges and Solutions
- **Challenge:** "Two developers edited the same visual recipe, and the merge is a mess."
- **Solution:** This is the primary challenge of visual tool collaboration. The best solution is to **break down tasks** so that two people are not working on the exact same recipe at the same time. If they must, they should communicate frequently.
- **Challenge:** "This seems like a lot of process."
- **Solution:** It is, but it is the industry-standard process for safe, scalable, collaborative software and data development. It prevents developers from overwriting work and ensures that all changes are reviewed before they go into production.
`,
  },
  {
    id: 341,
    slug: 'building-a-basic-scenario',
    question: 'How to get started with building a basic Scenario to schedule recipe execution?',
    answer: `
### 1. Introduction/Overview
A **Scenario** is Dataiku's tool for automation and orchestration. It allows you to define a sequence of actions (like running a pipeline) and then schedule it to run automatically. This is how you move a project from manual development to automated production.

### 2. Prerequisites
- **A Dataiku Flow** that you want to automate. For example, a flow that produces a final dataset.
- **A clear automation goal** (e.g., "I want to rebuild my final report every day").

### 3. Step-by-Step Instructions
1.  **Navigate to the Scenarios Page:** In your project's top menu bar, click **Scenarios**.
2.  **Create a New Scenario:** Click the **+ NEW SCENARIO** button and give it a clear, descriptive name (e.g., \`Build_Daily_Sales_Report\`).
3.  **Define the Steps (The "What"):**
    *   Go to the **Steps** tab. This is where you tell the scenario what to do.
    *   Click **+ ADD STEP**. The most common step is **Build / Train**.
    *   In the step's configuration, select the **final output dataset** of your flow. You only need to select the last item; Dataiku will automatically build all of its upstream dependencies.
4.  **Define the Trigger (The "When"):**
    *   Go to the **Settings** tab.
    *   Click **+ ADD TRIGGER**. The most common type is **Time-based**.
    *   Configure the schedule (e.g., "Daily" at "02:00").
    *   Enable the trigger using the toggle switch.
5.  **Define the Alerts (The "What If"):**
    *   Go to the **Reporters** tab.
    *   Click **+ ADD REPORTER**. Select **Mail**.
    *   Configure it to send an email **On failure** to your team.
6.  **Activate and Save:** Ensure the main toggle at the top of the scenario is set to **Active**, and then **Save** your changes. The scenario is now live and will run on the schedule you defined.

### 4. Resources and Tools
- **The Scenarios Page:** Your central hub for all project automation.
- **The Step Library:** The list of actions your scenario can perform.
- **Triggers and Reporters:** The tools for scheduling and alerting.

### 5. Next Steps and Progression
- **Manual Run:** Before you leave it to run on a schedule, it's a good practice to click the **Run** button to test the scenario manually.
- **Chained Scenarios:** You can have one scenario trigger another upon completion, allowing for more complex orchestrations.
- **Data Quality Gates:** Add a "Run checks" step after your build step to ensure the data is valid before the scenario finishes successfully.

### 6. Common Challenges and Solutions
- **Challenge:** "My scenario didn't run."
- **Solution:** Check the basics first: Is the main scenario toggle on? Is the trigger's toggle on? Check the "Last runs" tab for any error messages that might have prevented it from starting.
- **Challenge:** "My scenario builds the whole flow every time and is slow."
- **Solution:** In the "Build" step settings, change the build mode from the default to **Smart rebuild**. This will intelligently only rebuild the parts of the flow that have changed, which is much more efficient.
`,
  },
  {
    id: 342,
    slug: 'setting-triggers-based-on-dataset-update',
    question: 'How to get started with setting triggers based on dataset update timing?',
    answer: `
### 1. Introduction/Overview
In addition to time-based schedules, Dataiku scenarios can be launched by **event-based triggers**. The most common event is a change in a dataset. This allows you to create reactive pipelines that automatically run whenever new data becomes available.

### 2. Prerequisites
- **A Dataiku Scenario.**
- **An input dataset** whose update should trigger the pipeline (e.g., a dataset connected to a folder where new files are dropped daily).

### 3. Step-by-Step Instructions
1.  **Navigate to Scenario Settings:** Open the scenario you want to trigger. Go to the **Settings** tab.
2.  **Add a New Trigger:** In the "Triggers" section, click **+ ADD TRIGGER**.
3.  **Select "Dataset change":** Choose this option from the trigger type list.
4.  **Configure the Trigger:**
    *   **Dataset:** Select the specific dataset that should be watched for changes.
    *   **Trigger when:** You can choose to trigger the scenario when the dataset's data changes, its schema changes, or both. For most ingestion workflows, you will choose "Data changes".
5.  **Enable and Save:**
    *   Enable the trigger using the toggle switch next to it.
    *   **Save** the scenario.
6.  **How it Works:** The scenario is now active. Dataiku will periodically check the status of the selected dataset. As soon as it detects that the dataset has been updated (e.g., a new partition has appeared, or an upstream job has rebuilt it), it will automatically launch your scenario.

### 4. Resources and Tools
- **The "Dataset change" Trigger:** The primary tool for creating event-driven workflows.
- **Scenarios:** The orchestration engine where the trigger is configured.

### 5. Next Steps and Progression
- **File-based Triggers:** This pattern is very powerful when combined with datasets that point to folders in cloud storage (S3, GCS, ADLS) or SFTP servers. When an external process drops a new file in the folder, your Dataiku scenario will automatically wake up and process it.
- **Chaining Scenarios:** A common pattern is to have one scenario (e.g., \`process_data\`) be triggered by the completion of an upstream dataset, which in turn was built by another scenario (e.g., \`ingest_data\`).

### 6. Common Challenges and Solutions
- **Challenge:** "My trigger is firing too often."
- **Solution:** The trigger will fire every single time the source dataset is modified. If the upstream process is very "chatty" and rebuilds the dataset frequently, your scenario will also run frequently. You may need to adjust the logic of the upstream process or add a "quiet period" condition to your trigger.
- **Challenge:** "The trigger didn't fire even though the data changed."
- **Solution:** Dataiku's check for changes is not instantaneous; it runs on a periodic background task. There may be a delay of a few minutes between the data changing and the scenario being triggered. Also, verify that the dataset was actually modified in a way that Dataiku detects (e.g., a new partition appeared).
`,
  },
  {
    id: 343,
    slug: 'configuring-retries-on-failure',
    question: 'How to get started with configuring retries on failure without infinite loops?',
    answer: `
### 1. Introduction/Overview
Transient failures, like a temporary network hiccup or a database deadlock, can cause a scenario to fail. Instead of requiring manual intervention, you can build an automatic retry mechanism. While Dataiku doesn't have a simple "retry N times" button, you can implement this logic reliably using a **Python scenario step**.

### 2. Prerequisites
- **A scenario** that you want to make more resilient.
- **Basic Python skills** and familiarity with the Dataiku API.

### 3. Step-by-Step Instructions: The "Wrapper" Scenario Pattern
1.  **Isolate the Action:** Your main scenario (let's call it \`build_my_report\`) should contain only the build steps.
2.  **Create a "Wrapper" Scenario:** Create a new, separate scenario called \`wrapper_retry_build\`. This scenario's only purpose is to call the main scenario and handle the retries.
3.  **Add a Python Step:** In the wrapper scenario, add a single step of type **Execute Python code**.
4.  **Write the Retry Script:**
    *   The script will use a \`for\` loop to try running the main scenario a fixed number of times.
    *   It uses a \`try...except\` block to catch any failures.
    *   If the main scenario succeeds, the loop breaks. If it fails, it waits for a moment and tries again.
    *   A counter is essential to prevent infinite loops.
    > \`\`\`python
    > import dataiku
    > import time
    > 
    > MAX_RETRIES = 3
    > RETRY_DELAY_SECONDS = 60 # Wait 1 minute between retries
    > 
    > scenario_to_run = dataiku.api_client().get_project("MY_PROJECT").get_scenario("build_my_report")
    > 
    > for i in range(MAX_RETRIES):
    >     try:
    >         print(f"Attempt {i+1} of {MAX_RETRIES}...")
    >         job = scenario_to_run.run_and_wait() # run_and_wait is key
    >         
    >         if job.get_info()["result"] == "SUCCESS":
    >             print("Scenario succeeded.")
    >             dataiku.scenario.set_scenario_outcome(True, "Successfully completed.")
    >             break
    >         else:
    >             # This case handles if the job runs but ends in a FAILED state
    >             print("Scenario ran but failed.")
    >     except Exception as e:
    >         print(f"An exception occurred: {e}")
    >     
    >     # If not the last attempt, wait before retrying
    >     if i < MAX_RETRIES - 1:
    >         print(f"Waiting {RETRY_DELAY_SECONDS} seconds before next retry.")
    >         time.sleep(RETRY_DELAY_SECONDS)
    > else: # This 'else' belongs to the 'for' loop
    >     # This block executes only if the loop completed without a 'break'
    >     dataiku.scenario.set_scenario_outcome(False, f"Scenario failed after {MAX_RETRIES} attempts.")
    > \`\`\`
5.  **Schedule the Wrapper:** You now schedule the \`wrapper_retry_build\` scenario, not the original one.

### 4. Resources and Tools
- **Python Scenario Step:** The environment for your custom orchestration logic.
- **Dataiku Python API:** Specifically the functions for running scenarios (\`scenario.run_and_wait()\`) and setting outcomes (\`set_scenario_outcome()\`).
- **Python's \`time\` module:** For adding delays between retries.

### 5. Next Steps and Progression
- **Exponential Backoff:** Make your script smarter by increasing the delay between retries (e.g., 1 min, then 5 mins, then 15 mins).
- **Conditional Retries:** Analyze the error message inside the \`except\` block. You could choose to only retry on specific, known transient errors (like "Connection timeout") but fail immediately for fatal errors ("Table not found").

### 6. Common Challenges and Solutions
- **Challenge:** "This is too complicated for a simple retry."
- **Solution:** This is an advanced pattern. It should only be used for critical production scenarios where you expect occasional, recoverable failures. For most scenarios, a simple failure alert that notifies a human to rerun it is sufficient.
- **Challenge:** "I created an infinite loop."
- **Solution:** The \`for i in range(MAX_RETRIES)\` structure is your primary safety mechanism. It guarantees the loop cannot run more than \`MAX_RETRIES\` times.
`,
  },
  {
    id: 344,
    slug: 'handling-global-variables-in-scenarios',
    question: 'How to get started with handling global variables within Scenarios effectively?',
    answer: `
### 1. Introduction/Overview
Project Variables act as global parameters for your project. Scenarios provide two powerful ways to interact with them: you can **retrieve** their values to control scenario logic, and you can **override** their values for a specific run, which is key for creating dynamic, reusable pipelines.

### 2. Prerequisites
- **A Dataiku project** with pre-defined Project Variables (e.g., \`region\`, \`start_date\`).
- **A Scenario.**

### 3. Step-by-Step Instructions

#### Method 1: Retrieving Variables in a Python Step
- **Use Case:** Making a decision in your scenario based on a project's configuration.
- **How:**
    1.  Add a **Execute Python code** step to your scenario.
    2.  Use the \`dataiku.get_custom_variables()\` API call to fetch all variables as a dictionary.
    > \`\`\`python
    > import dataiku
    > variables = dataiku.get_custom_variables()
    > target_region = variables.get('region')
    > 
    > print(f"Running pipeline for region: {target_region}")
    > # ... add logic based on the region ...
    > \`\`\`
#### Method 2: Overriding Variables for a Scenario Run
- **Use Case:** Running the same flow with different parameters without changing the project itself. For example, running a monthly report for January, then February, then March.
- **How:**
    1.  Open your scenario.
    2.  In the "Steps" tab, find the "Build" step. You can often set parameters here.
    3.  A more powerful way is to define **Run-as-you-go parameters** for the scenario itself. In the scenario's "Settings" tab, you can define parameters that will override the project variables only for the duration of this scenario's run.
    4.  When triggering a scenario via the API, you can also pass in a JSON payload with new variable values.

### 4. Resources and Tools
- **Project Variables:** The source of your parameters.
- **Python Scenario Step:** The tool for programmatically retrieving and acting on variables.
- **Scenario Parameters / API Payload:** The mechanisms for overriding variables for a specific run.

### 5. Next Steps and Progression
- **Looping with Variables:** A common pattern is to have a scenario loop. In each iteration, a Python step updates a project variable (e.g., \`run_date\`), and then a "Build" step runs the parameterized flow using that new date.
- **Dynamic Configuration:** Use variables to control every aspect of your flow, from filter conditions to source filenames to database connections.

### 6. Common Challenges and Solutions
- **Challenge:** "I updated the variable in my Python step, but the next 'Build' step in the scenario didn't use the new value."
- **Solution:** You need to use the correct API call. The \`dataiku.get_custom_variables()\` call reads the variables. To *set* them, you must use the full API client:
    > \`\`\`python
    > client = dataiku.api_client()
    > project = client.get_project("MY_PROJECT")
    > current_vars = project.get_variables()
    > current_vars['standard']['my_variable'] = "new_value"
    > project.set_variables(current_vars)
    > \`\`\`
    This updates the variable for all subsequent steps in the scenario.
`,
  },
  {
    id: 345,
    slug: 'setting-up-email-alerts',
    question: 'How to get started with setting up email alerts when a step fails?',
    answer: `
### 1. Introduction/Overview
Email alerts are a fundamental part of monitoring automated pipelines. They ensure that you are notified immediately when a job fails, allowing you to investigate and resolve the issue quickly. In Dataiku, this is configured using **Reporters** in a Scenario.

### 2. Prerequisites
- **A Scenario** that you want to monitor.
- **Mail Server Configuration:** A Dataiku administrator must have configured the connection to your company's mail server in **Administration > Settings**.

### 3. Step-by-Step Instructions
1.  **Open Your Scenario:** Navigate to the **Scenarios** page in your project and select the scenario you want to add alerts to.
2.  **Go to the "Reporters" Tab:** This is the dedicated section for all notifications.
3.  **Add a New Reporter:** Click **+ ADD REPORTER**.
4.  **Select "Mail":** Choose this from the channel dropdown list.
5.  **Configure the Reporter:**
    *   **Name:** Give it a clear name, like "Failure Alert to Dev Team".
    *   **Run condition:** This is the most important setting. For failure alerts, choose **On failure**.
    *   **Recipients:** Enter the email address or distribution list that should receive the alert.
    *   **Subject and Body:** Customize the message. It is **critical** to include context variables to make the alert actionable.
        *   **Good Subject:** \`Dataiku Job FAILED: \${projectKey} - \${scenarioName}\`
        *   **Good Body:** Include details and, most importantly, a direct link to the logs: \`The job log is available here: \${jobURL}\`
6.  **Save:** Save the scenario. The reporter is now live. The next time this scenario fails, the configured email will be sent automatically.

### 4. Resources and Tools
- **Reporters Tab:** The UI for configuring all alerts.
- **Built-in Variables:** Use variables like \`\${jobURL}\` to make your alerts useful. A full list is available in the editor.

### 5. Next Steps and Progression
- **Multiple Reporters:** You can add multiple reporters. For example, a detailed technical alert on failure, and a simple high-level summary on success.
- **Slack/Teams Integration:** If your team uses a chat application, configure a Slack or Teams reporter for more immediate notifications.
- **Attach Reports:** You can configure a reporter to attach a dashboard export (as a PDF) or a dataset (as a CSV) to the email.

### 6. Common Challenges and Solutions
- **Challenge:** "We are not receiving the emails."
- **Solution:** First, double-check that a scenario has actually failed. Second, verify with your Dataiku administrator that the instance's mail server is configured correctly and that there are no firewalls blocking the emails.
- **Challenge:** "We get the email, but we don't know what to do."
- **Solution:** The alert message is not actionable enough. You must include the \`\${jobURL}\` variable. This provides a direct link to the job log, which is the starting point for any investigation.
`,
  },
  {
    id: 346,
    slug: 'passing-parameters-into-scenario-jobs',
    question: 'How to get started with passing parameters into Scenario jobs correctly in Python?',
    answer: `
### 1. Introduction/Overview
Passing parameters into a scenario run allows you to create highly dynamic and reusable automation. This is most powerfully done when triggering a scenario from an external system via the REST API. The external system can include a JSON payload with values that will override the project variables for that specific run.

### 2. Prerequisites
- **A parameterized Dataiku project:** The project should use Project Variables to control its behavior (e.g., in recipe filters).
- **A Scenario** that builds the parameterized flow.
- **A tool to call the REST API** (like \`curl\` or a Python script).

### 3. Step-by-Step Instructions
1.  **Identify the API Endpoint:** The endpoint for running a scenario is:
    > \`YOUR_DSS_URL/public/api/projects/PROJECT_KEY/scenarios/SCENARIO_ID/run\`
2.  **Construct the JSON Payload:**
    *   Create a JSON object that specifies the variables you want to override.
    *   The structure should be: \`{"variables": {"standard": {"variable_name": "new_value"}}}\`.
    > \`\`\`json
    > {
    >   "variables": {
    >     "standard": {
    >       "region": "EMEA",
    >       "start_date": "2023-01-01"
    >     }
    >   }
    > }
    > \`\`\`
3.  **Make the API Call with the Payload:**
    *   You will make an **HTTP POST** request to the endpoint.
    *   The JSON payload is sent as the body of the request.
    *   **Example using \`curl\`:**
    > \`\`\`bash
    > API_KEY="your_api_key"
    > PAYLOAD_JSON='{"variables":{"standard":{"region":"EMEA"}}}'
    >
    > curl -X POST -u "\${API_KEY}:" \\
    >      -H "Content-Type: application/json" \\
    >      -d "\${PAYLOAD_JSON}" \\
    >      "https://dss.mycompany.com/public/api/projects/MYPROJ/scenarios/run_report/run"
    > \`\`\`
4.  **Execution:** When Dataiku receives this request, it will start the "run_report" scenario. For this specific run, the value of the project variable \`region\` will be temporarily set to "EMEA", and any recipe that uses \`\${region}\` will use this new value.

### 4. Resources and Tools
- **Dataiku REST API Documentation:** It provides details on the "run scenario" endpoint and the expected payload format.
- **\`.json\` file:** For complex payloads, it's easier to write the JSON in a file and pass it to curl (\`-d @payload.json\`).
- **Python \`requests\` library:** The ideal tool for making these API calls from a controlling application.

### 5. Next Steps and Progression
- **Dynamic Parameter Calculation:** The controlling application can dynamically calculate the parameters before making the API call. For example, it could calculate yesterday's date and pass that as the \`run_date\` parameter.
- **Orchestration:** This is the core pattern for integrating Dataiku with external orchestrators like Airflow. The Airflow DAG can calculate the parameters and then use an operator to make the API call to Dataiku.

### 6. Common Challenges and Solutions
- **Challenge:** "The scenario ran, but it didn't use the parameters I sent."
- **Solution:** Check the syntax of your JSON payload very carefully. It must match the exact structure Dataiku expects. Also, verify that your content-type header is set to \`application/json\`.
- **Challenge:** "How do I do this from a Python script?"
- **Solution:**
    > \`\`\`python
    > import requests
    > payload = {"variables": {"standard": {"region": "EMEA"}}}
    > response = requests.post(url, auth=(api_key, ""), json=payload)
    > \`\`\`
`,
  },
  {
    id: 347,
    slug: 'organizing-scenario-steps',
    question: 'How to get started with organizing scenario steps and dependencies visually?',
    answer: `
### 1. Introduction/Overview
A scenario is a sequence of steps that run in order. Organizing these steps logically is key to creating automation that is easy to understand, debug, and maintain. The best practice is to keep scenarios focused on a single business purpose and to name steps clearly.

### 2. Prerequisites
- **A Dataiku Scenario.**
- **A multi-step process** you need to automate (e.g., build data, run quality checks, train a model, send a report).

### 3. Step-by-Step Instructions
1.  **Give Your Scenario a Clear Name:** The scenario name should describe its business goal (e.g., \`Retrain_Churn_Model_Weekly\`, not \`Scenario_1\`).
2.  **Add Steps in Logical Order:**
    *   Scenario steps execute sequentially from top to bottom. Add them in the order they need to run.
    *   **Example Order:**
        *   Step 1: Build the training dataset.
        *   Step 2: Run data quality checks on the training data.
        *   Step 3: Train the model.
        *   Step 4: Evaluate the new model.
        *   Step 5: Send a report with the results.
3.  **Give Each Step a Descriptive Name:**
    *   Just like the scenario name, the name of each step is important documentation.
    *   Instead of the default "Build / Train", rename it to "Build Final Training Data". Instead of "Run python code", rename it to "Deploy Model if Better".
4.  **Use the "Continue on error" Setting Carefully:**
    *   By default, if a step fails, the entire scenario stops.
    *   You can check the "Continue on error" box for a step if you want the scenario to proceed even if that specific step fails. This should be used sparingly, for non-critical steps like an optional cleanup task.

### 4. Resources and Tools
- **The Scenario "Steps" Tab:** Your main workspace for organizing your automation logic.
- **The Step Library:** The list of all available actions you can add to your sequence.

### 5. Next Steps and Progression
- **Conditional Logic:** For more complex dependencies, use a **Python step** to implement if/else logic. The script can check a condition and then programmatically trigger different build steps based on the outcome.
- **Chaining Scenarios:** For very complex workflows, break them down into multiple, simpler scenarios. One "master" scenario can then be responsible for triggering the other scenarios in the correct order. This is excellent for modularity.

### 6. Common Challenges and Solutions
- **Challenge:** "My scenario has 20 steps and is hard to follow."
- **Solution:** Your scenario is likely doing too many different things. Consider breaking it down into smaller, more focused scenarios. For example, have one scenario for data ingestion and another for reporting. You can then chain them together.
- **Challenge:** "A step failed, but the scenario was still marked as a 'SUCCESS'."
- **Solution:** You have likely checked the "Continue on error" box for that failing step. This tells the scenario to ignore the failure. Uncheck this box for any step that is critical to the pipeline's success.
`,
  },
  {
    id: 348,
    slug: 'executing-conditional-steps',
    question: 'How to get started with executing conditional steps depending on dataset checks?',
    answer: `
### 1. Introduction/Overview
Standard scenario steps run sequentially. To execute steps conditionally (i.e., an "if/then" logic), you need to use a **Python scenario step**. This gives you the full power of Python to check any condition—such as the result of a data quality check—and then programmatically decide which part of your flow to execute next.

### 2. Prerequisites
- **A Dataiku Scenario.**
- **A condition to check** (e.g., "does my input dataset have more than 1000 rows?").
- **A basic understanding of the Dataiku Python API.**

### 3. Step-by-Step Instructions
1.  **Build Your Different Logical Paths:** In your Flow, build out the different recipe chains you might want to execute. For example, a "standard" processing flow and a separate "alerting" flow.
2.  **Add a Python Step for the Condition:**
    *   In your scenario, add a new step of type **Execute Python code**. This step will act as your "if" statement.
3.  **Write the Conditional Script:**
    *   In the Python script, use the Dataiku API to get the information you need to check your condition.
    *   Then, use a standard Python \`if...else\` block to decide which job to run.
    *   **Example: Run a build only if the input dataset is not empty.**
    > \`\`\`python
    > import dataiku
    >
    > client = dataiku.api_client()
    > project = client.get_project("MY_PROJECT")
    >
    > # Get the row count of the input dataset
    > input_dataset = project.get_dataset("my_input")
    > row_count = input_dataset.get_metadata()["metrics"]["recordsCount"]
    >
    > # The conditional logic
    > if row_count > 0:
    >     print(f"Input has {row_count} rows. Running main pipeline.")
    >     project.get_dataset("final_output").build()
    > else:
    >     print("Input dataset is empty. Skipping build and sending alert.")
    >     # You could add code here to trigger an alerting scenario instead
    > \`\`\`
4.  **Place the Step Correctly:** This Python step should come *before* any of the steps it is controlling. The rest of the pipeline logic is now contained within this single Python step.

### 4. Resources and Tools
- **Python Scenario Step:** Your environment for writing the custom conditional logic.
- **Dataiku Python API Documentation:** Essential for learning how to get dataset metrics, project variables, and trigger jobs programmatically.

### 5. Next Steps and Progression
- **Checking Data Quality Check Results:** You can have a scenario step that runs data quality checks, and then a subsequent Python step can use the API to get the results of those checks and make a decision.
- **Complex Branching:** Your Python script can implement complex \`if/elif/else\` chains to orchestrate very sophisticated, multi-path workflows.

### 6. Common Challenges and Solutions
- **Challenge:** "This seems complicated. Can't I just use a visual 'if' step?"
- **Solution:** Dataiku does not have a visual "if" step in scenarios. The Python step is the designated tool for this kind of custom control flow. While it requires code, it provides enormous flexibility.
- **Challenge:** "How do I get the outcome of a data quality check in Python?"
- **Solution:** After running a "Run checks" step, you can use \`dataset.get_last_checks_results()\` in your Python step. This will return a detailed object that you can inspect to see which checks passed or failed.
`,
  },
  {
    id: 349,
    slug: 'exporting-logs-from-scenarios',
    question: 'How to get started with exporting logs from Scenarios for debugging?',
    answer: `
### 1. Introduction/Overview
When a scenario fails, its log is the most important piece of information for debugging. Dataiku provides several ways to access and export these logs, from downloading them directly from the UI to forwarding them automatically to an external logging system.

### 2. Prerequisites
- **A scenario that has been run at least once.**

### 3. Step-by-Step Instructions

#### Method 1: Manual Download from the UI (Most Common)
1.  **Navigate to the Scenario Run:**
    *   In your project, go to **Scenarios**.
    *   Click on the "Last runs" tab for your scenario.
    *   Find the specific run you want to investigate and click on it. This will take you to the main Job Log page for that run.
2.  **View the Step Log:**
    *   In the job log, you will see the list of steps. Click on the specific recipe or code step whose log you want to view.
3.  **Download the Log:**
    *   In the log viewer pane, there is usually a **Download** button.
    *   Clicking this will save the full log for that step as a \`.txt\` file, which you can then analyze offline or share with a colleague.

#### Method 2: Automatic Export via Reporters
1.  **Configure a Reporter:** In your scenario, go to the **Reporters** tab.
2.  **Attach the Log to an Email:**
    *   Create a **Mail** reporter that triggers **On failure**.
    *   In the reporter's configuration, you can often find an option to attach the job log to the email. This is not always available or recommended for very large logs.
    *   **Better Practice:** Instead of attaching the log, include the \`\${jobURL}\` variable in the email body. This gives the recipient a direct, one-click link to view the log in the Dataiku UI.

#### Method 3: Forwarding to an External System (Admin Task)
1.  **Configure Log Shipping:** A Dataiku administrator can configure the instance to automatically ship all its logs (including scenario logs) to an external logging platform like Splunk, Datadog, or an ELK stack.
2.  **Analyze Externally:** This allows for long-term storage, advanced searching, and correlation of Dataiku logs with logs from other applications.

### 4. Resources and Tools
- **The Job Log UI:** The primary place to view and download logs.
- **Reporters:** For automatically sending notifications with links to logs.
- **External Logging Platforms (Splunk, etc.):** For enterprise-grade, centralized log management.

### 5. Next Steps and Progression
- **Programmatic Access:** Using the Dataiku Python API, you can get a handle on a job object and then call methods to retrieve the log contents programmatically, allowing you to build custom monitoring and alerting scripts.

### 6. Common Challenges and Solutions
- **Challenge:** "The log file is huge and hard to read."
- **Solution:** Use the search function (\`Ctrl+F\`) in your text editor to search for keywords like "ERROR", "Exception", or "failed". When troubleshooting, it's often best to start at the bottom of the log and work your way up.
- **Challenge:** "I don't have access to the global log settings."
- **Solution:** Forwarding logs to an external system is a global, administrative setting. You will need to work with your platform administrators to have this set up.
`,
  },
  {
    id: 350,
    slug: 'scheduling-incremental-runs',
    question: 'How to get started with scheduling incremental runs without redundant full refresh?',
    answer: `
### 1. Introduction/Overview
For large, time-based datasets, rebuilding the entire table every day is inefficient and slow. An incremental run, which only processes the newest data, is the standard best practice. In Dataiku, the easiest and most robust way to achieve this is with **partitioned datasets**.

### 2. Prerequisites
- **A large, time-based dataset** (e.g., daily transaction logs).
- **Your dataset must be partitioned**, typically by day. This is configured in the dataset's **Settings > Partitioning** tab.

### 3. Step-by-Step Instructions
1.  **Ensure Your Flow is Partitioned:**
    *   Start by partitioning your raw input dataset (e.g., by day).
    *   When you build recipes downstream from this, Dataiku will automatically propagate the partitioning. Your entire flow should be partitioned.
2.  **Create a Scenario:** Go to **Scenarios** and create a new scenario to automate the job.
3.  **Configure the Build Step:**
    *   Add a **Build / Train** step and select your final, partitioned output dataset.
4.  **Specify Partitions to Build (The Key Step):**
    *   In the build step's configuration, you will see a field for **Partitions to build**.
    *   Do not leave this blank (which defaults to "ALL").
    *   Instead, enter a dynamic identifier. The most common one is **LATEST**.
    *   This single keyword tells Dataiku: "Find the latest available partition in the source datasets, and run the entire flow to build only the corresponding partition in the final output."
5.  **Schedule the Scenario:**
    *   Go to the **Settings > Triggers** tab and add a **Time-based** trigger to run daily.
    *   Each day, this scenario will wake up, see the new "LATEST" day's worth of data, and process only that slice through your entire pipeline.

### 4. Resources and Tools
- **Dataset Partitioning:** The core feature that enables incremental runs.
- **Scenario Build Step:** The place where you specify the dynamic partition (\`LATEST\`) to build.
- **Job Inspector:** You can view the job log to confirm that the run only processed a single partition, not the whole dataset.

### 5. Next Steps and Progression
- **Backfilling:** To build all the historical partitions for the first time, launch a manual build from the Flow. The build dialog will allow you to specify a date range (e.g., "build all partitions from 2022-01-01 to yesterday").
- **Handling Late-Arriving Data:** You can use more advanced partition identifiers, like \`LATEST-1\` to rebuild yesterday's partition, or specify a date range to rebuild the last N days.
- **Non-Partitioned Sources:** If your source is a single large table without partitions, you must implement a manual incremental load using a "high-water mark" approach with SQL and project variables.

### 6. Common Challenges and Solutions
- **Challenge:** "My incremental job is rebuilding the whole dataset."
- **Solution:** You have misconfigured the "Build" step in your scenario. You must ensure the "Partitions to build" field is set to \`LATEST\` or another dynamic identifier. Leaving it blank defaults to building "ALL" partitions.
- **Challenge:** "What if I need to rebuild a specific day from the past?"
- **Solution:** Do not change the scenario. Go to the Flow, click on the final dataset, click the "Build" button, and manually specify the single partition (date) that you want to rebuild.
`,
  },
  {
    id: 351,
    slug: 'installing-new-plugins',
    question: 'How to get started with installing new plugins to access custom recipes?',
    answer: `
### 1. Introduction/Overview
Plugins are add-ons that extend Dataiku's core functionality. They can provide new dataset connectors, visual recipes, processors for the Prepare recipe, and more. Installing plugins from the Dataiku store allows you to easily add new capabilities to your instance. This is an administrative task.

### 2. Prerequisites
- **Dataiku Administrator rights.**
- **An idea of the functionality you are missing.**

### 3. Step-by-Step Instructions
1.  **Navigate to the Plugins Page:** As an administrator, go to **Administration** (the nine-dots icon) and select **Plugins**.
2.  **Browse the Plugin Store:**
    *   Click on the **Store** tab.
    *   Here you will find a catalog of plugins built and maintained by Dataiku, as well as contributions from the user community.
    *   You can search for plugins or browse by category (e.g., "Connectors", "Code recipes").
3.  **Install the Plugin:**
    *   Find a plugin that meets your needs (e.g., the "Geospatial" plugin for map-based analysis, or the "Tableau Hyper Export" plugin).
    *   Click on the plugin to see its details and documentation.
    *   Click the **Install** button.
4.  **Build the Plugin's Environment:**
    *   After installing, the plugin will appear in your "Installed" list.
    *   Most plugins have their own Python or R code environments with specific library dependencies. You must build this environment.
    *   Click the **Build** button next to the plugin's code environment. This may take a few minutes.
5.  **Start Using the New Features:**
    *   Once the environment is built, the features from the plugin are now available to all users on the instance.
    *   For example, if you installed a plugin with a new visual recipe, users will now see that recipe in the "+ Recipe" menu in their projects.

### 4. Resources and Tools
- **Administration > Plugins:** The central UI for managing all plugins.
- **The Plugin Store:** The marketplace for discovering new functionality.

### 5. Next Steps and Progression
- **Developing Your Own Plugins:** For advanced use cases, you can develop your own custom plugins to encapsulate reusable logic specific to your company. This allows you to turn a complex Python script into a simple, reusable visual recipe for others to use.
- **Plugin Updates:** Periodically check the Plugin store for updates to the plugins you have installed to get the latest features and bug fixes.

### 6. Common Challenges and Solutions
- **Challenge:** "I installed a plugin, but I can't find its features."
- **Solution:** The most common reason is that you forgot to **build the plugin's code environment**. Go back to the Plugins page and ensure the environment is successfully built. In some rare cases, you may need to restart the Dataiku backend for the new components to be fully registered.
- **Challenge:** "The plugin environment fails to build."
- **Solution:** This can happen if the plugin has complex dependencies or conflicts with other libraries. Check the build log for detailed error messages. You may need to contact the plugin's developer (often via a GitHub repository linked from the plugin page) or Dataiku support for help.
`,
  },
  {
    id: 352,
    slug: 'using-a-plugin-to-wrap-code',
    question: 'How to get started with using a plugin to wrap your own code visually?',
    answer: `
### 1. Introduction/Overview
Developing a custom plugin is an advanced technique that allows you to make your own code accessible as a visual, reusable component in the Dataiku UI. This is the ultimate way to enable self-service and scale your team's best practices, turning a complex Python script into a simple visual recipe that anyone can use.

### 2. Prerequisites
- **A piece of reusable Python or R code** that you want to share.
- **Administrator access to a development Dataiku instance,** including filesystem access.
- **Familiarity with JSON.**

### 3. Step-by-Step Instructions (High-Level)
Developing a plugin is a detailed process, but here is the conceptual workflow for creating a custom visual recipe.

1.  **Enable Developer Mode:** On your dev instance, an admin must enable "dev mode" to allow you to create plugin files.
2.  **Create the Plugin Folder:** On the server's filesystem, in the Dataiku installation directory, create a new folder for your plugin (e.g., \`my-company-plugin\`).
3.  **Define the UI in \`recipe.json\`:**
    *   Inside your plugin, create a folder for your new recipe. In it, create a file named \`recipe.json\`.
    *   This JSON file defines what the user will see in the UI: the recipe's name, its icon, how many inputs and outputs it has, and any custom fields (like text boxes or dropdowns) you want to present to the user.
4.  **Write the Backend in \`recipe.py\`:**
    *   Create a corresponding \`recipe.py\` file.
    *   This script contains the Python class that defines the recipe's execution logic.
    *   It will have methods to read from the inputs, get the values of the custom parameters the user entered in the UI, perform your core logic, and write to the outputs.
5.  **Test and Iterate:** As you save changes to these files, you can refresh the Dataiku UI to see your visual recipe appear. You can test it on sample data and debug your Python code just like a regular recipe.
6.  **Package the Plugin:** Once development is complete, zip the entire plugin folder. This \`.zip\` file is your distributable plugin, ready to be installed on a production instance by an administrator.

### 4. Resources and Tools
- **The Dataiku Developer Guide:** The official documentation provides a detailed, step-by-step tutorial on creating your first plugin. This is an essential resource.
- **Source Code of Existing Plugins:** Many official plugins are open-source on GitHub. Reading their code is an excellent way to learn advanced techniques.

### 5. Next Steps and Progression
- **Custom Processors:** You can also create custom processors that will appear in the Prepare recipe, allowing users to apply your custom logic as a single step in a visual data cleaning flow.
- **Custom Charts:** Develop new, custom chart types for Dataiku's visualization engine.

### 6. Common Challenges and Solutions
- **Challenge:** "This is too complex."
- **Solution:** It is an advanced topic. Start with the "hello world" plugin tutorial in the developer guide. This will walk you through creating the simplest possible recipe, which teaches you the fundamental file structure and concepts.
- **Challenge:** "My recipe UI doesn't look right or is giving an error."
- **Solution:** The \`recipe.json\` file is very sensitive to syntax errors. Use an online JSON validator to check your file. Carefully read the developer guide for the correct syntax for defining different UI components.
`,
  },
  {
    id: 353,
    slug: 'generating-visual-recipes-via-ai-sql-assistant',
    question: 'How to get started with generating visual recipes via AI SQL assistant?',
    answer: `
### 1. Introduction/Overview
The AI-assisted features in Dataiku can significantly accelerate development by generating code or recipe steps from natural language prompts. This guide focuses on using the AI Assistant to generate SQL queries, which you can then use or convert into visual recipes.

### 2. Prerequisites
- **A Dataiku instance with AI features enabled and configured** by an administrator.
- **SQL datasets** in your Flow.
- **A clear question** you want to ask of your data in plain English.

### 3. Step-by-Step Instructions
1.  **Open a SQL Recipe:** The primary interface for the SQL assistant is within a SQL recipe. Create a new **SQL recipe** with your tables as input.
2.  **Launch the AI Assistant:** Look for a button or icon to "Generate with AI" or similar.
3.  **Write a Natural Language Prompt:**
    *   In the prompt box, write a clear, specific instruction.
    *   **Bad prompt:** "join data"
    *   **Good prompt:** "Write a SQL query that does a left join from the 'customers' table to the 'orders' table on the 'customer_id' column, and then counts the number of orders for each customer."
4.  **Review and Use the Generated SQL:**
    *   The AI will generate a SQL query based on your prompt.
    *   **This code is a suggestion, not a final answer.** You must read it and verify that it is correct and matches your intent.
    *   You can then use this SQL directly in your recipe.
5.  **Convert to Visual Recipes (Optional):**
    *   While there is no direct "SQL to Visual" conversion, you can now manually create the equivalent visual recipes (e.g., a Join recipe followed by a Group recipe) based on the logic provided by the generated SQL. This can be faster than figuring out the visual steps from scratch.

### 4. Resources and Tools
- **The AI Assistant feature** within the SQL recipe editor.
- **Prompt Engineering Skills:** The quality of the output depends heavily on the quality of your input prompt. Be specific.

### 5. Next Steps and Progression
- **AI-Powered Prepare Recipe:** Some versions of Dataiku have an AI assistant directly in the Prepare recipe, which can suggest entire sequences of cleaning steps based on a high-level goal.
- **Code Explanation:** Use the AI features to explain a complex piece of existing SQL or Python code in natural language.

### 6. Common Challenges and Solutions
- **Challenge:** "The generated SQL is wrong or inefficient."
- **Solution:** This is expected from time to time. AI is a powerful assistant, not an infallible expert. You must use your own knowledge to review and correct the generated code. If it's incorrect, try rephrasing your prompt to be more specific.
- **Challenge:** "The AI feature is not available for me."
- **Solution:** These features are part of Dataiku's AI offerings and may require specific licenses and administrator configuration. Contact your platform administrator to see if they can be enabled.
`,
  },
  {
    id: 354,
    slug: 'enabling-natural-language-recipe-generation',
    question: 'How to get started with enabling natural language recipe generation in paid edition?',
    answer: `
### 1. Introduction/Overview
Dataiku's Generative AI capabilities can translate natural language prompts into recipes and code, significantly speeding up development. Enabling these features is an administrative task that involves configuring a connection to a backend Large Language Model (LLM) service.

### 2. Prerequisites
- **A Dataiku instance with the appropriate license** for Generative AI features.
- **An API key for an LLM service,** such as OpenAI, Azure OpenAI, or Google's Vertex AI.
- **Dataiku Administrator rights.**

### 3. Step-by-Step Instructions (Admin Task)
1.  **Navigate to Administration Settings:** Go to **Administration > Settings**.
2.  **Find the LLM Configuration Section:** Look for a section related to "Generative AI" or "LLMs".
3.  **Create a New LLM Connection:**
    *   Click to add a new connection.
    *   Select your provider (e.g., **OpenAI**).
    *   You will need to provide your **API key** and potentially other details like the specific model to use (e.g., \`gpt-4\`).
4.  **Configure Permissions:**
    *   Once the connection is created, you need to grant permission to user groups to use this LLM connection for the AI-assisted features.
5.  **How Users Access the Feature:**
    *   Once enabled, users will see new "Generate with AI" buttons or options appear in various parts of the UI, such as the Prepare recipe, code recipes, and charts.
    *   They can then type a prompt (e.g., "remove rows where the country is USA and the price is less than 100"), and the AI will suggest the corresponding recipe steps.

### 4. Resources and Tools
- **Administration > Settings:** The location for the LLM connection configuration.
- **An LLM API Key:** The credential needed to connect to the backend AI service.

### 5. Next Steps and Progression
- **Using the Feature:** Train your users on how to write effective prompts to get the most out of the feature.
- **Monitoring Usage and Cost:** Keep an eye on the usage of the underlying LLM API, as it is often a metered service that incurs costs.

### 6. Common Challenges and Solutions
- **Challenge:** "The AI feature is not working or is greyed out."
- **Solution:** This means the administrator has not configured the LLM connection or has not granted your user group permission to use it. Contact your platform administrator.
- **Challenge:** "The generated recipe steps are not correct."
- **Solution:** The quality of the suggestions depends on the LLM and the prompt. Users must always review the AI-generated steps to ensure they are correct before applying them. It's an assistant, not a replacement for a developer.
`,
  },
  {
    id: 355,
    slug: 'prompting-ai-to-explain-recipe-logic',
    question: 'How to get started with prompting generative AI to explain existing recipe logic?',
    answer: `
### 1. Introduction/Overview
One of the powerful applications of Generative AI in Dataiku is code and recipe explanation. When you encounter a complex piece of code or a long visual recipe built by someone else, you can use the AI assistant to generate a natural language summary of what it does. This is incredibly useful for onboarding, debugging, and documentation.

### 2. Prerequisites
- **A Dataiku instance with AI features enabled** and connected to a Large Language Model (LLM).
- **A complex recipe or code snippet** you want to understand.

### 3. Step-by-Step Instructions
1.  **Navigate to the Code or Recipe:** Open the Python recipe, SQL recipe, or visual Prepare recipe that you want to have explained.
2.  **Find the "Explain" Feature:** Look for a button or menu option labeled **Explain with AI** or similar.
3.  **Generate the Explanation:**
    *   Click the button. Dataiku will send the code or the definition of the visual recipe steps to the configured LLM.
    *   The LLM will process the logic and generate a natural language summary.
    *   This explanation will appear in a side panel or dialog box.
4.  **Review the Explanation:**
    *   Read the AI-generated summary. It should describe the purpose of the code, what it takes as input, the key transformation steps it performs, and what it produces as output.
5.  **Use the Explanation:**
    *   You can use this generated text as a starting point for your own documentation. Copy the explanation and paste it into the recipe's **Description** field to help future developers understand it.

### 4. Resources and Tools
- **The "Explain with AI" feature** within the recipe editors.
- **A configured LLM connection** (an admin task).

### 5. Next Steps and Progression
- **Explaining Other Objects:** This feature is often available for more than just recipes. You can use it to explain machine learning model results, charts, and more.
- **Code Refactoring:** After getting an explanation of a complex script, you can ask the AI Assistant to refactor it to make it more efficient or readable.

### 6. Common Challenges and Solutions
- **Challenge:** "The explanation is too generic or misses some nuance."
- **Solution:** The quality of the explanation depends on the power of the underlying LLM. For very complex or domain-specific logic, the AI might miss some of the subtle business context. The explanation should be treated as a very good starting point for understanding, but it may still require a human developer to fully grasp all the details.
- **Challenge:** "Is my code being sent to an external company?"
- **Solution:** Yes. This feature works by sending your code to an external LLM provider (like OpenAI or Google). Your company's administrator should have configured this with your security and legal teams' approval. For sensitive code, ensure you are using a provider that meets your company's data privacy standards (e.g., an Azure OpenAI instance that does not store prompts).
`,
  },
  {
    id: 356,
    slug: 'customizing-ai-prompts-to-get-accurate-sql-code',
    question: 'How to get started with customizing AI prompts to get accurate SQL code?',
    answer: `
### 1. Introduction/Overview
When using Dataiku's AI Assistant to generate SQL, the quality of the generated code is directly proportional to the quality of your prompt. "Prompt engineering" is the skill of writing clear, specific, and context-rich instructions to get the most accurate and efficient results from the language model.

### 2. Prerequisites
- **A Dataiku instance with the AI Assistant enabled.**
- **A clear analytical question** you want to answer with SQL.

### 3. Step-by-Step Instructions: Principles of Good Prompting
1.  **Be Specific and Unambiguous:**
    *   **Bad Prompt:** "Join customers and orders."
    *   **Good Prompt:** "Write a SQL query that performs a **left join** from the **customers** table to the **orders** table, using the **customer_id** column in both tables as the join key."
2.  **Provide Context and Constraints:**
    *   Tell the AI about your data and any rules.
    *   **Bad Prompt:** "Find top customers."
    *   **Good Prompt:** "Find the top 10 customer names by total sales amount. The sales amount is in the 'price' column of the orders table. Only include orders from the year 2023."
3.  **Specify the Desired Output:**
    *   Tell the AI exactly which columns you want in the final output and what they should be named.
    *   **Good Prompt:** "...The final output should have two columns: 'customer_name' and 'total_sales'."
4.  **Iterate and Refine:**
    *   Don't expect the perfect query on the first try.
    *   If the AI generates something that's not quite right, modify your prompt to give it more specific guidance. For example, if it uses the wrong aggregate function, you can add: "...and calculate the **sum** of the price, not the average."

### 4. Resources and Tools
- **The AI Assistant Prompting Interface.**
- **Your database schema:** Knowing the exact table and column names is crucial for writing a good prompt.

### 5. Next Steps and Progression
- **Few-Shot Prompting:** You can provide an example in your prompt.
    > "/* I need to find active users. For example: SELECT name FROM users WHERE status = 'active' */. Now, write a similar query to find inactive users."
- **Requesting Specific Dialects:** You can ask the AI to generate code for a specific SQL dialect, e.g., "Write this query using Snowflake SQL syntax."

### 6. Common Challenges and Solutions
- **Challenge:** "The AI is 'hallucinating' and using columns that don't exist."
- **Solution:** Your prompt was likely not specific enough. You must provide the exact column names you want it to use. For example, "...join on the \`customers.id\` column and the \`orders.customer_fk\` column."
- **Challenge:** "The query works, but it's very inefficient."
- **Solution:** The AI may not always choose the most optimal query plan. You can try to guide it by adding constraints to your prompt, such as "Use a window function instead of a self-join to calculate the running total." However, for deep performance tuning, you will likely need to rely on your own SQL expertise to refine the AI-generated code.
`,
  },
  {
    id: 357,
    slug: 'avoiding-over-dependence-on-ai-assistants',
    question: 'How to get started with avoiding over-dependence on AI assistants when wrong?',
    answer: `
### 1. Introduction/Overview
AI Assistants are powerful tools for accelerating development, but they are not infallible. They can make mistakes, generate inefficient code, or misunderstand context. Avoiding over-dependence means treating the AI as a knowledgeable junior partner, not as an ultimate authority. You must always remain the expert in the loop.

### 2. Prerequisites
- **Access to AI-assisted features** in Dataiku.
- **A critical mindset.**

### 3. Step-by-Step Instructions: A Framework for Responsible AI Use
1.  **Treat AI Output as a Suggestion, Not a Command:**
    *   Never blindly copy and paste AI-generated code or accept AI-suggested recipe steps without understanding them.
    *   The AI's output is a first draft or a starting point, not a finished product.
2.  **Always Review and Verify:**
    *   **Read the code:** Go through the AI-generated code line by line. Do you understand what each line does?
    *   **Check the logic:** Does the code correctly implement your business logic?
    *   **Test the output:** Run the code or recipe on a sample of your data and check the results. Do they make sense? Are there any unexpected edge cases?
3.  **Maintain Your Own Skills:**
    *   Don't let the AI assistant cause your own skills to atrophy. Continue to learn and practice the underlying technologies (Python, SQL, Dataiku's features).
    *   When the AI generates a solution, take the time to understand *why* it works. This is a learning opportunity.
4.  **Know When Not to Use AI:**
    *   For very simple tasks that you know how to do, it's often faster to just do them yourself than to write a prompt and review the output.
    *   For highly sensitive or critical production code, the level of human review required should be extremely high.

### 4. Resources and Tools
- **Your own brain:** Critical thinking is your most important tool.
- **The Dataiku documentation and your own knowledge:** Use these to validate the AI's suggestions.

### 5. Next Steps and Progression
- **Use AI for Brainstorming:** AI can be excellent for exploring different ways to solve a problem. You can ask it, "What are three different ways to calculate a running total in SQL?" and then use your expertise to choose the best approach.
- **Use AI for Learning:** If the AI generates a function or a technique you've never seen before, use it as a prompt to go and learn more about that technique from the official documentation.

### 6. Common Challenges and Solutions
- **Challenge:** "The AI-generated code looks right, but it gives the wrong answer."
- **Solution:** This is why testing is non-negotiable. The code might be syntactically correct but logically flawed for your specific business context. This highlights the fact that the AI does not understand your business; you do.
- **Challenge:** "It's faster to just let the AI do it."
- **Solution:** It may be faster in the short term, but it's much slower in the long term when you have to debug a subtle error in production caused by un-reviewed AI code. The time spent on review is an investment in quality and stability.
`,
  },
  {
    id: 358,
    slug: 'verifying-ai-generated-logic',
    question: 'How to get started with verifying AI-generated logic via manual review?',
    answer: `
### 1. Introduction/Overview
AI-generated code and recipes are powerful accelerators, but they must be treated with caution. Verifying the logic before you use it is a critical, non-negotiable step to ensure correctness, security, and efficiency. This manual review process is your quality gate.

### 2. Prerequisites
- **AI-generated output:** A piece of code (SQL, Python) or a set of visual recipe steps suggested by Dataiku's AI Assistant.
- **Understanding of the business goal.**

### 3. Step-by-Step Instructions: A Verification Checklist
Before accepting any AI suggestion, go through this checklist:

1.  **Does it Solve the Right Problem?**
    *   Read the generated code or steps. Does the overall logic match your original intent and the business requirement? It's possible the AI misunderstood your prompt.
2.  **Is the Code Correct and Safe?**
    *   **For Code:** Go through it line by line. Are there any subtle bugs? Does it handle edge cases (like null values) correctly? Does it contain any insecure patterns (like being vulnerable to SQL injection, though this is rare)?
    *   **For Visual Recipes:** Click on each suggested step. Are the parameters correct? Is the filter condition right? Is the join type correct?
3.  **Is it Efficient?**
    *   The AI might generate code that works but is very inefficient.
    *   For SQL, does the query plan look reasonable? For Python, is it using vectorized operations where possible instead of slow loops?
4.  **Does it Adhere to Your Team's Standards?**
    *   Does the generated code follow your team's style guide and naming conventions?
    *   You will likely need to refactor the code to match your standards.
5.  **Does it Work on Real Data?**
    *   Apply the recipe or run the code on a representative sample of your data.
    *   Inspect the output carefully. Does it look correct? Calculate a few examples by hand to verify the results.

### 4. Resources and Tools
- **Your expertise:** Your own knowledge of your data and your business logic is the most important verification tool.
- **Dataiku's Preview Pane:** Instantly see the results of visual recipe steps.
- **Jupyter Notebooks:** A good place to paste and test AI-generated code snippets on sample data before putting them into a recipe.

### 5. Next Steps and Progression
- **Refine the Prompt:** If the AI's first attempt is not good, don't just fix the code. Go back and refine your prompt to be more specific. This helps the AI learn and provides better results next time.
- **Peer Review:** For critical pieces of logic, even if they were AI-generated, they should still go through your team's standard peer review process. A second set of human eyes is an invaluable safety check.

### 6. Common Challenges and Solutions
- **Challenge:** "The AI code is too complex for me to understand."
- **Solution:** This is a red flag. Do not use code that you do not understand. You can ask the AI assistant to "explain this code," which can help. If it's still too complex, it's better to discard it and write a simpler solution that you do understand and can maintain.
- **Challenge:** "Verifying the code takes almost as long as writing it myself."
- **Solution:** This can be true, especially for experienced developers. The primary benefit of AI assistance is often not in writing the final production code, but in quickly prototyping, brainstorming different approaches, and learning new techniques.
`,
  },
  {
    id: 359,
    slug: 'integrating-plugin-recipes-into-your-flow',
    question: 'How to get started with integrating plugin recipes into your flow for modularity?',
    answer: `
### 1. Introduction/Overview
Plugins extend Dataiku's capabilities with new components, the most common of which are **visual recipes**. Once a plugin is installed by an administrator, its recipes become available to all users and can be integrated into a Flow just like any standard, built-in recipe. This allows you to use powerful, pre-packaged logic for tasks like geospatial analysis or connecting to specific services.

### 2. Prerequisites
- **A plugin installed** on your Dataiku instance by an administrator.
- **An input dataset** suitable for the plugin recipe.

### 3. Step-by-Step Instructions
1.  **Find the Plugin Recipe:**
    *   In your Flow, click the **+ RECIPE** button in the top menu.
    *   The menu that appears will now contain the new recipes from your installed plugin, often grouped under their own heading. You can also use the search bar to find the recipe by name.
2.  **Select the Recipe:**
    *   Click on the plugin recipe you want to use (e.g., "Geocode" from the Geospatial plugin).
3.  **Configure the Inputs and Outputs:**
    *   Just like a standard recipe, you will be prompted to select your input dataset(s).
    *   Dataiku will propose an output dataset name. Click **CREATE RECIPE**.
4.  **Use the Custom UI:**
    *   The recipe settings page will now open. This UI is custom-defined by the plugin.
    *   Fill in the required parameters. For the Geocode recipe, for example, you would select the column containing the addresses you want to geocode.
5.  **Run and Use the Output:**
    *   Run the recipe. It will execute the plugin's underlying code and generate the output dataset.
    *   You can now chain other recipes to this output, fully integrating the plugin's functionality into your Flow.

### 4. Resources and Tools
- **The "+ RECIPE" Menu:** Where you will find all available recipes, including those from plugins.
- **Plugin Documentation:** Good plugins have documentation that explains what each recipe does and how to configure its parameters. This is often accessible from the plugin's page in the Administration section.

### 5. Next Steps and Progression
- **Chaining Plugin Recipes:** You can create powerful pipelines by chaining multiple plugin recipes together or by combining them with standard Dataiku recipes.
- **Explore the Plugin Store:** Periodically browse the plugin store in the Administration section to discover new tools that could help with your projects.

### 6. Common Challenges and Solutions
- **Challenge:** "I can't find the recipe from a plugin I just installed."
- **Solution:** After an admin installs a plugin, they must also **build the plugin's code environment**. If this step was missed, the recipes won't be available. Contact your administrator to ensure the plugin is fully installed and its environment is built.
- **Challenge:** "The plugin recipe is failing with a strange error."
- **Solution:** Since plugins are add-ons, their quality can vary. Check the job log for the error message. If you can't solve it, the best place to get help is often the plugin's dedicated support channel, which is usually a GitHub repository linked from the plugin's store page.
`,
  },
  {
    id: 360,
    slug: 'debugging-plugin-recipe-failures',
    question: 'How to get started with debugging plugin recipe failures and exceptions?',
    answer: `
### 1. Introduction/Overview
When a recipe from a plugin fails, debugging it can be slightly different from a standard recipe because the underlying code is not immediately visible. However, the troubleshooting process is similar: start with the log to identify the error and then investigate the cause.

### 2. Prerequisites
- **A failed job** that involves a plugin recipe.
- **Access to the job log.**

### 3. Step-by-Step Instructions
1.  **Read the Job Log:**
    *   Navigate to the failed job and open the log for the specific plugin recipe step.
    *   Scroll to the bottom to find the error message and the Python or R traceback. This is your most important clue.
2.  **Categorize the Error:**
    *   **Configuration Error:** The error message might indicate that you have configured the recipe incorrectly. For example, "API Key is missing" or "Input column 'address' not found."
        *   **Solution:** Go back to the recipe's settings page and carefully review all the parameters you entered.
    *   **Data Error:** The error might be caused by the data itself. For example, a geocoding recipe might fail if it encounters an address string that it cannot parse.
        *   **Solution:** Isolate the failing row(s) and try to understand why they are problematic. You may need to add a Prepare recipe to clean the data *before* it enters the plugin recipe.
    *   **Bug in the Plugin:** The error might be a genuine bug in the plugin's code. The traceback will point to a line in the plugin's source code.
        *   **Solution:** This is more difficult to solve. See the "Next Steps" below.
3.  **Check the Plugin's Documentation:**
    *   Good plugins have documentation that may include a section on common errors or troubleshooting. Find the plugin in the **Administration > Plugins** section to see if it has a link to its documentation.

### 4. Resources and Tools
- **The Job Log:** Your primary source for the error message.
- **The Plugin's Documentation:** Your guide to correct configuration.
- **The Plugin's GitHub Repository:** The place to report bugs and get support from the developer.

### 5. Next Steps and Progression
- **Viewing the Source Code:** If you suspect a bug, a Dataiku administrator can view the plugin's source code directly from the filesystem of the Dataiku server. This can help in understanding the logic and confirming the issue.
- **Reporting an Issue:** The best place to report a bug in a plugin is via the "Issues" tab on its GitHub repository (if it's open source). Provide a clear description of the problem, the full error log, and a way to reproduce the issue.

### 6. Common Challenges and Solutions
- **Challenge:** "The error message is generic and not helpful."
- **Solution:** Increase the log verbosity. In the failed job's log view, you can sometimes find an option to rerun the job with more detailed logging, which might provide more clues.
- **Challenge:** "I don't have access to the plugin's source code or documentation."
- **Solution:** Contact your Dataiku administrator. They can access the plugin's files and find more information about it from the central Plugins page.
`,
  },
  {
    id: 361,
    slug: 'creating-charts-from-datasets',
    question: 'How to get started with creating charts from datasets and customizing axes?',
    answer: `
### 1. Introduction/Overview
Charts are the primary way to visually explore your data and present findings. Dataiku has a powerful, drag-and-drop charting engine that allows you to create a wide variety of visualizations without writing any code.

### 2. Prerequisites
- **A dataset** in your project that you want to visualize.
- **A question** you want to answer with your data (e.g., "What are the sales per category?", "How have sales trended over time?").

### 3. Step-by-Step Instructions
1.  **Open the Charts Tab:** In your Flow, open the dataset you want to visualize. Click on the **Charts** tab.
2.  **Select a Chart Type:** On the left side, you'll see a list of available chart types (Bar, Line, Pie, Scatter, etc.). Click on the one that best suits your question. For "sales per category," a **Bar Chart** is a good choice.
3.  **Drag and Drop to Configure:**
    *   The chart editor has "bins" for different chart dimensions, like X-axis, Y-axis, and groups.
    *   A list of your dataset's columns is on the left.
    *   **Drag** the column you want on the X-axis (e.g., \`product_category\`) and **drop** it into the "X" bin.
    *   **Drag** the column you want on the Y-axis (e.g., \`sales\`) and **drop** it into the "Y" bin.
    *   Dataiku will automatically aggregate the Y-axis value (e.g., as a SUM). You can click on it to change the aggregation to Average, Count, etc.
4.  **Customize the Axes and Appearance:**
    *   Click on the **Format** tab in the chart editor.
    *   Here you can change chart titles, axis labels, colors, and many other visual properties.
5.  **Save the Chart:** Once you are happy with your chart, give it a name and click the **Save** button. This makes it available to be added to a dashboard.

### 4. Resources and Tools
- **The Charts Tab:** Your main workspace for creating all visualizations.
- **The Drag-and-Drop Interface:** The intuitive way to build and configure charts.
- **The Format Tab:** The panel for customizing the look and feel of your chart.

### 5. Next Steps and Progression
- **Create More Chart Types:** Experiment with other chart types. Use a **Line Chart** to show trends over time. Use a **Scatter Plot** to see the relationship between two numerical variables.
- **Add to a Dashboard:** Go to the **Dashboards** section of your project and add your saved chart as a new tile to create a report.
- **Interactive Filters:** On a dashboard, you can add filters that apply to your charts, allowing users to explore the data interactively.

### 6. Common Challenges and Solutions
- **Challenge:** "My chart is showing a single bar, but I expected multiple bars."
- **Solution:** Check the aggregation on your Y-axis. You may also need to use a "Group by" dimension. For example, to see sales by category over time, you would put "Date" on the X-axis, "Sales" on the Y-axis, and "Category" in the "Group by" (color) bin.
- **Challenge:** "My numerical column is being treated as a category."
- **Solution:** Your column's data type might be incorrect. Go back to the dataset and use a Prepare recipe to ensure the column is correctly parsed as a number. In the chart editor, you can also sometimes change how a column is treated (e.g., "treat as numerical" vs. "treat as categorical").
`,
  },
  {
    id: 362,
    slug: 'building-dashboards',
    question: 'How to get started with building dashboards and arranging visuals coherently?',
    answer: `
### 1. Introduction/Overview
A dashboard is a collection of charts, metrics, and other insights, arranged on a single screen to tell a story or monitor a process. Building a dashboard in Dataiku is a simple, drag-and-drop process of arranging pre-built "tiles" of content.

### 2. Prerequisites
- **Insights to display:** You must first create the content you want to show. This means you should have already saved some **Charts** from your datasets and computed some **Metrics** on their Status tabs.
- **A narrative or goal** for the dashboard.

### 3. Step-by-Step Instructions
1.  **Navigate to the Dashboards Page:** In your project's top menu bar, click on **Dashboards**.
2.  **Create a New Dashboard:** Click the **+ NEW DASHBOARD** button. Give it a name.
3.  **Add Your First Tile:**
    *   Your new dashboard is a blank canvas. In "Edit" mode, click **+ ADD A TILE**.
    *   A dialog will appear. Choose the type of content you want to add. For example, select **Chart**.
    *   A list of all the charts you have saved in the project will appear. Select the one you want to add.
4.  **Add More Tiles:** Continue adding tiles for all your content.
    *   **Metric tiles:** To show key performance indicators (KPIs).
    *   **Text tiles:** To add titles, section headers, and explanatory comments.
    *   **Dataset views:** To show a preview of a table.
5.  **Arrange the Tiles:**
    *   Once the tiles are on the dashboard, you can **drag and drop** them to arrange their position.
    *   You can **resize** them by dragging their bottom-right corner.
    *   A good layout tells a story. Place the most important KPIs at the top, followed by summary charts, and then more detailed views.
6.  **Save and View:** Click the **Save** button. Then switch from "Edit" mode to "View" mode to see how the final dashboard will look to your audience.

### 4. Resources and Tools
- **The Dashboards Page:** Your canvas for building reports.
- **The "Add a Tile" dialog:** Your tool for adding content.
- **Text Tiles:** An essential tool for providing context and turning a collection of charts into a coherent report.

### 5. Next Steps and Progression
- **Interactive Filters:** Add dashboard-level filters. Go to the "Filters" panel in edit mode to add a filter (e.g., on a date column or a category). This will allow viewers to interact with the dashboard and slice all the data at once.
- **Automation:** Create a **Scenario** to automatically rebuild the datasets that feed your dashboard and then refresh the dashboard's cache, ensuring the information is always up-to-date.
- **Distribution:** Use a scenario **Reporter** to email a PDF export of the dashboard to stakeholders on a schedule.

### 6. Common Challenges and Solutions
- **Challenge:** "My dashboard is slow to load."
- **Solution:** The data for the charts is cached. If the underlying datasets are very large, the initial computation can be slow. Ensure your data pipelines are optimized. You can also manually trigger a refresh of the dashboard caches from the scenario.
- **Challenge:** "My dashboard looks cluttered and confusing."
- **Solution:** You are probably trying to show too much information at once. A good dashboard should be focused on a specific purpose. Use multiple dashboards for different topics. Use whitespace and text headers to create clear visual separation between sections.
`,
  },
  {
    id: 363,
    slug: 'refreshing-cached-charts',
    question: 'How to get started with refreshing cached charts when datasets update?',
    answer: `
### 1. Introduction/Overview
For performance reasons, the data used to render charts on a Dataiku dashboard is **cached**. This means that if the underlying dataset is updated, the chart will not automatically show the new data. You must explicitly tell Dataiku to refresh this cache. This is typically done as part of an automated scenario.

### 2. Prerequisites
- **A Dataiku dashboard** with charts.
- **A scenario** that rebuilds the datasets used by those charts.

### 3. Step-by-Step Instructions
1.  **Understand the Caching Mechanism:** When you view a dashboard, Dataiku doesn't re-query the full dataset every time. It uses a pre-computed cache of the chart's data. This makes loading fast, but it can become stale.
2.  **Locate Your Automation Scenario:** Open the scenario that is responsible for updating the data for your dashboard (e.g., your daily data ingestion and processing pipeline).
3.  **Add the "Refresh Caches" Step:**
    *   In the scenario's **Steps** tab, go to the very end of the sequence.
    *   After the step that builds the final datasets, click **+ ADD STEP**.
    *   From the step library, choose **Update dashboard caches**.
4.  **Configure the Step:**
    *   In the step's settings, you can choose to refresh all dashboards in the project or select specific ones.
5.  **Run the Scenario:** Now, when your scenario runs, it will follow this sequence:
    1.  Build the fresh data.
    2.  Once the data is built, it will re-compute the cached data required for your dashboard charts.
    3.  When a user next loads the dashboard, they will see the latest data.

### 4. Resources and Tools
- **"Update dashboard caches" Scenario Step:** The specific tool for this automation task.
- **The Job Log:** You can see the "Update caches" step in your scenario log to confirm that it ran.

### 5. Next Steps and Progression
- **Manual Refresh:** If you need to refresh a dashboard immediately without running the whole scenario, you can go to the **Dashboards** page, click the "three dots" menu on your dashboard, and choose **Refresh Caches**.
- **Conditional Refresh:** You could put the cache refresh step in a separate scenario and have it triggered by the completion of your main build scenario.

### 6. Common Challenges and Solutions
- **Challenge:** "My dashboard data is still stale even after my scenario ran."
- **Solution:** The most likely reason is that the steps in your scenario are in the wrong order. You **must** build the datasets *first*, and only then run the "Update dashboard caches" step. If you refresh the caches before the data is rebuilt, you are just re-caching the old data.
- **Challenge:** "The cache refresh step is taking a long time."
- **Solution:** This can happen if your dashboard has many complex charts built on very large datasets. Ensure the underlying data pipelines are optimized. For very large dashboards, you may need to schedule the refresh during off-peak hours.
`,
  },
  {
    id: 364,
    slug: 'controlling-dashboard-access-permissions',
    question: 'How to get started with controlling access permissions for dashboards?',
    answer: `
### 1. Introduction/Overview
Controlling who can view or edit a dashboard is a key governance requirement. In Dataiku, dashboard permissions are not set on the dashboard itself, but are **inherited** from the **project** that contains the dashboard. This means you control access by managing the project's permissions.

### 2. Prerequisites
- **A Dataiku project** containing a dashboard.
- **Project administrator rights** to manage permissions.
- **User groups** defined by a Dataiku administrator.

### 3. Step-by-Step Instructions
1.  **Navigate to Project Permissions:** In your project, go to **Settings** (the gear icon) and then to the **Permissions** tab.
2.  **Add a Group:** Click **+ ADD GROUP** and select the group of users you want to give access to (e.g., \`Finance_Analysts\`).
3.  **Assign the Correct Permission Level:**
    *   **To allow users to VIEW the dashboard:** Grant the group **Reader** permissions. This will let them see the dashboard and interact with filters, but they cannot edit it or see the underlying Flow. This is the standard permission level for business consumers.
    *   **To allow users to EDIT the dashboard:** Grant the group **Contributor** or **Administrator** permissions. This will let them add, remove, and configure tiles on the dashboard. This is for developers.
4.  **Save the Changes:** The permissions are applied immediately. Users in the group you added will now be able to see the project and its dashboards in their workspace.

### 4. Resources and Tools
- **Project Settings > Permissions:** The single place to manage access control for all objects within a project, including dashboards.
- **User Groups:** The mechanism for applying permissions to roles rather than individuals.

### 5. Next Steps and Progression
- **Sharing a Direct Link:** Once a user has permission, you can send them a direct URL to the dashboard. When they open it, they will see the dashboard content without needing to navigate through the project structure.
- **Isolating Dashboards:** If you need to give a user access to *only one specific dashboard* and nothing else, you must use a different project structure. Create a separate, dedicated "dashboard-only" project. Share the final, necessary data into it with a Sync recipe, and build the dashboard there. Then, grant the user "Reader" access to only that isolated project.

### 6. Common Challenges and Solutions
- **Challenge:** "I gave a group 'Reader' access, but they say they can't see the dashboard."
- **Solution:** The user might not be logged in, or they may not be a member of the group you think they are. Another possibility is that the project is inside a "Project Folder" that the user does not have permission to view.
- **Challenge:** "A user with 'Reader' access can see the dashboard but the charts are empty."
- **Solution:** This is a more complex permissions issue. The user has permission to see the dashboard, but they may not have permission to use the underlying **Data Connection** that the datasets are built on. Connection-level permissions are managed separately by a Dataiku administrator.
`,
  },
  {
    id: 365,
    slug: 'scheduling-pdf-or-excel-reports-from-dashboards',
    question: 'How to get started with scheduling PDF or Excel reports from dashboards?',
    answer: `
### 1. Introduction/Overview
Automating the distribution of reports is a common business requirement. Dataiku allows you to schedule a recurring job that will export a dashboard as a PDF (or individual charts as images/Excel files) and automatically email it to a list of stakeholders.

### 2. Prerequisites
- **A Dataiku dashboard** that you want to export.
- **A scenario** to run the automation.
- **Mail server configured** on the Dataiku instance (admin task).

### 3. Step-by-Step Instructions
1.  **Create an Automation Scenario:** Go to **Scenarios** and create a new scenario (e.g., \`Email_Weekly_Sales_Dashboard\`).
2.  **Add a Build Step:**
    *   The first step in your scenario should be to ensure the dashboard's data is up-to-date.
    *   Add a **Build / Train** step that builds all the datasets used by the dashboard.
    *   Follow this with a **Update dashboard caches** step.
3.  **Add a Reporter Step:**
    *   Go to the **Reporters** tab of the scenario.
    *   Click **+ ADD REPORTER** and select **Mail**.
4.  **Configure the Email and Attachment:**
    *   **Run condition:** Set this to **On success** or **On completion**.
    *   **Recipients:** Enter the email distribution list.
    *   **Attachments:** This is the key part.
        *   Click **+ Add an attachment**.
        *   Choose the **Type:** **Dashboard**.
        *   Select your dashboard from the dropdown list.
        *   Choose the **Export format:** **PDF (all tabs)** is common for a full report. You can also choose to export individual charts as images.
5.  **Schedule the Scenario:**
    *   Go back to the **Settings** tab and add a **Time-based** trigger to run the scenario on your desired schedule (e.g., every Monday at 8 AM).
    *   Activate the scenario.

### 4. Resources and Tools
- **Scenarios and Reporters:** The core automation and distribution framework.
- **Dashboard Export Formats:** PDF, PNG, or exporting chart data as Excel/CSV.

### 5. Next Steps and Progression
- **Exporting Datasets:** If stakeholders want the raw data, you can have the reporter attach a dataset as a CSV file instead of a dashboard PDF.
- **Custom Filenames:** The exported file will have a default name. If you need a custom name, you can use a Python step with the API to perform the export, which gives you more control over the filename.
- **Conditional Reporting:** Use a Python step to check a condition, and only have the scenario send the report if the condition is met (e.g., "only send the report if total sales were above a certain threshold").

### 6. Common Challenges and Solutions
- **Challenge:** "The PDF export of my dashboard looks poorly formatted."
- **Solution:** The PDF rendering is sensitive to the dashboard's layout. You may need to design your dashboard with the PDF export in mind. Use standard slide sizes (like 16:9), avoid very long scrolling pages, and ensure tiles are neatly aligned within the grid.
- **Challenge:** "The attachment is too large and the email is being rejected."
- **Solution:** Dashboards with many high-resolution charts can create large PDFs. Instead of attaching the file, a better approach is to use a scenario step to export the dashboard to a shared location (like SharePoint or S3) and then have the email reporter send a *link* to the file.
`,
  },
  {
    id: 366,
    slug: 'embedding-dashboards-in-external-tools',
    question: 'How to get started with embedding dashboards in external tools or portals?',
    answer: `
### 1. Introduction/Overview
You can embed a Dataiku dashboard or a single chart into another web-based application, such as a company intranet, a Confluence page, or another BI tool. This is done using a standard web technology called an **iframe**.

### 2. Prerequisites
- **A Dataiku dashboard** or chart that you want to embed.
- **An external web page** that supports embedding HTML iframes.
- **Authentication Considerations:** The user viewing the external page must also have an active Dataiku session and permission to view the dashboard.

### 3. Step-by-Step Instructions
1.  **Navigate to your Dashboard:** Open the dashboard you want to embed.
2.  **Find the "Share" Option:** In the top right corner of the dashboard, click the **Share** button.
3.  **Get the Embed Code:**
    *   In the sharing dialog, go to the **Embed** tab.
    *   Dataiku will provide a snippet of HTML code. It will look like: \`<iframe src="https://YOUR_DSS_URL/public/embedded-dashboard/..."></iframe>\`.
    *   Click the button to **Copy** this code snippet.
4.  **Paste into the External Tool:**
    *   Go to your external application (e.g., a Confluence page editor or a SharePoint web part).
    *   Find the option to insert or embed "HTML" or "Web Content".
    *   Paste the iframe code you copied from Dataiku.
5.  **Save and View:** Save the external page. When you view it, you should now see your Dataiku dashboard rendered inside a frame within the page.

### 4. Resources and Tools
- **The Share/Embed feature:** The tool in Dataiku that generates the necessary iframe code.
- **Iframe HTML element:** The standard web technology that makes embedding possible.

### 5. Next Steps and Progression
- **Single Sign-On (SSO):** For a seamless user experience in a corporate environment, your administrator should set up SSO between Dataiku and your other company applications. This means that if a user is logged into the main company portal, they will be automatically logged into Dataiku, and the embedded dashboard will appear without requiring a separate login.
- **Passing Filters via URL:** For advanced use cases, it is possible to pass filter values from the parent page into the embedded Dataiku dashboard by modifying the \`src\` URL in the iframe. This requires custom JavaScript development.

### 6. Common Challenges and Solutions
- **Challenge:** "The embedded frame shows a Dataiku login screen instead of the dashboard."
- **Solution:** This is the most common issue. It means the user viewing the page is not logged into Dataiku or does not have permission to see that specific dashboard. Embedding does not bypass Dataiku's security. The user must have a valid session and "Reader" access to the project.
- **Challenge:** "The embedded dashboard doesn't fit well or has double scrollbars."
- **Solution:** You may need to adjust the \`width\` and \`height\` attributes of the iframe code snippet to better fit the layout of your external page.
`,
  },
  {
    id: 367,
    slug: 'adding-kpi-cards',
    question: 'How to get started with adding KPI cards using statistical summaries?',
    answer: `
### 1. Introduction/Overview
KPI (Key Performance Indicator) cards are dashboard widgets that display a single, important number in a large, prominent way. They are perfect for showing high-level summary metrics. In Dataiku, you create these by first computing a **Metric** on a dataset and then adding that metric to a dashboard.

### 2. Prerequisites
- **A dataset containing your KPI value.** This is often a dataset with just a single row and a single column containing the number you want to display (e.g., "Total Sales this Month").
- **A Dataiku dashboard.**

### 3. Step-by-Step Instructions

#### Part 1: Create the Metric
1.  **Calculate the KPI:** Use a recipe (like **Group**) to create a dataset that contains your KPI value. Let's call it \`kpi_data\`.
2.  **Navigate to the Status Tab:** Open the \`kpi_data\` dataset and go to the **Status** tab.
3.  **Add a New Metric:**
    *   Click on the **Metrics** section.
    *   Click **+ ADD METRIC**.
    *   Choose the "Column statistics" metric.
    *   Select the column that holds your KPI number. For the aggregation, choose **Value of first row**.
    *   Give the metric a clear, descriptive name (e.g., \`Metric_Total_Sales\`).
    *   Click **SAVE AND COMPUTE**.

#### Part 2: Add the Metric to the Dashboard
1.  **Open Your Dashboard:** Go to the **Dashboards** page and open your dashboard in "Edit" mode.
2.  **Add a Metric Tile:**
    *   Click **+ ADD A TILE**.
    *   Choose the **Metric** tile type.
3.  **Configure the Tile:**
    *   **Source:** Choose "Dataset Metric".
    *   **Dataset:** Select your \`kpi_data\` dataset.
    *   **Metric:** Select the \`Metric_Total_Sales\` metric you just created.
    *   You can then customize the tile's appearance, adding a label, changing the color, etc.
4.  **Arrange and Save:** Place the KPI card prominently on your dashboard (usually at the top) and save your changes.

### 4. Resources and Tools
- **The Status Tab > Metrics:** The UI for defining and computing the KPI values.
- **The Metric Tile:** The specific dashboard widget for displaying a single number.

### 5. Next Steps and Progression
- **Automation:** Create a **Scenario** that rebuilds your \`kpi_data\` dataset and then runs an "Update Metrics" step to keep the KPI value fresh.
- **Trend Indication:** In the metric tile's settings, you can compare the current value to a historical one (e.g., from a different partition) to show a "sparkline" or a red/green arrow indicating the trend.
- **Alerting on KPIs:** In a scenario, you can add a "Run checks" step that checks if your KPI metric has crossed a certain threshold and send an alert if it has.

### 6. Common Challenges and Solutions
- **Challenge:** "My KPI card is showing the wrong number or is blank."
- **Solution:** Check the metric's configuration. Did you select the correct column and the correct aggregation ("Value of first row")? Also, ensure that you have computed the metric on the dataset's Status tab.
- **Challenge:** "The number is not updating."
- **Solution:** Your automation scenario needs to have a specific **Update metrics** step after the step that rebuilds the data. Without this, the metric value will not be re-calculated.
`,
  },
  {
    id: 368,
    slug: 'resolving-missing-chart-errors',
    question: 'How to get started with resolving missing chart errors due to incompatible field types?',
    answer: `
### 1. Introduction/Overview
A common issue when creating charts is that the chart fails to render or shows an error. This is often because you are trying to use a column with an incorrect data type for a specific chart axis. For example, trying to plot a "string" on a numerical axis. Resolving this involves correcting the data type in a Prepare recipe.

### 2. Prerequisites
- **A Dataiku chart** that is showing an error or behaving unexpectedly.
- **A dataset** that feeds the chart.

### 3. Step-by-Step Instructions
1.  **Identify the Problematic Column:** Look at your chart's configuration. Which column is causing the issue?
    *   **Example 1:** You are trying to create a line chart with a "date" column on the X-axis, but the chart is treating each date as a separate category instead of a continuous timeline.
    *   **Example 2:** You are trying to create a bar chart with a "price" column on the Y-axis, but you can only "count" it, not "sum" or "average" it.
2.  **Check the Column's Data Type:**
    *   Go back to the dataset used by the chart.
    *   Look at the column header. Dataiku shows an icon indicating the type (\`A\` for string, \`#\` for number, a calendar for date).
    *   In the examples above, you would likely see that your "date" column is a string, and your "price" column is also a string.
3.  **Fix the Data Type with a Prepare Recipe:**
    *   You need to insert a **Prepare recipe** upstream of the dataset your chart is using.
    *   **For the date column:** Use the **Parse date** processor to convert the string into a proper date type.
    *   **For the price column:** Use the **Parse to decimal number** processor. You may also need to first use a "Find & Replace" processor to remove currency symbols or commas.
4.  **Rebuild and Refresh:**
    *   Run the new Prepare recipe.
    *   Go back to your chart. You may need to refresh it or rebuild it. The chart should now recognize the correct data types and render properly.

### 4. Resources and Tools
- **The Data Type Icons:** Quickly see the type of a column in the dataset view.
- **Prepare Recipe:** Your primary tool for fixing data types.
- **"Parse date" and "Parse to..." processors:** The specific tools for data type conversion.

### 5. Next Steps and Progression
- **Proactive Cleaning:** It's a best practice to always parse and set the correct data types for all your columns as one of the first steps in your data preparation flow. This prevents charting and modeling issues later on.
- **Analyze Tool:** Use the "Analyze" feature on a column to get a detailed view of its current type, format, and any invalid values.

### 6. Common Challenges and Solutions
- **Challenge:** "The 'Parse date' processor failed."
- **Solution:** The date format of your string does not match what Dataiku expects. You need to manually specify the correct format in the processor's settings.
- **Challenge:** "I fixed the type, but the chart is still wrong."
- **Solution:** You may need to explicitly tell the chart how to treat the column. In the chart editor, you can sometimes click on a column in a bin and change its interpretation (e.g., "treat as numerical"). You may also need to clear the chart's cache.
`,
  },
  {
    id: 369,
    slug: 'exporting-visuals-to-power-bi-or-tableau',
    question: 'How to get started with exporting visuals to Power BI or Tableau properly?',
    answer: `
### 1. Introduction/Overview
While you can embed Dataiku charts into external tools, the most robust and performant way to integrate with dedicated BI tools like Power BI or Tableau is to export the clean, prepared **data**, not the visual itself. You use Dataiku for the heavy data preparation and then use the BI tool's native capabilities for visualization.

### 2. Prerequisites
- **A final, prepared dataset** in Dataiku, ready for visualization.
- **A shared database** that both Dataiku and your BI tool can connect to (e.g., Snowflake, SQL Server, BigQuery).
- **A configured connection** to this database in Dataiku.

### 3. Step-by-Step Instructions
1.  **Do the ETL in Dataiku:** Use a Dataiku Flow to perform all your complex data ingestion, cleaning, joining, and aggregation. The final output should be a dataset that is perfectly shaped for your dashboard—ideally a single, aggregated summary table.
2.  **Use an Export Recipe:**
    *   In your Flow, select this final summary dataset.
    *   Choose the **Export** recipe from the right-hand panel.
3.  **Export to the Shared Database:**
    *   Configure the Export recipe to write to your shared SQL database connection.
    *   Give the destination table a clear name, like \`POWER_BI_SALES_AGGREGATED\`.
    *   Set the write mode to "Overwrite" to ensure the data is refreshed each time.
    *   Run the recipe.
4.  **Connect Your BI Tool to the Database:**
    *   Open Power BI or Tableau.
    *   Create a new data source connection, pointing to your shared SQL database.
    *   Import the \`POWER_BI_SALES_AGGREGATED\` table.
5.  **Build Your Visuals Natively:** Now, use the powerful native visualization capabilities of your BI tool to build your charts and dashboards from this clean, pre-processed data.

### 4. Resources and Tools
- **The Export Recipe:** The key Dataiku tool for this workflow.
- **A SQL Database:** The critical "bridge" between the two platforms.
- **Your BI Tool's Data Connector.**

### 5. Next Steps and Progression
- **Automate the Data Refresh:** In Dataiku, create a **Scenario** that runs your entire pipeline, ending with the Export recipe. Schedule this to run daily. This will automatically update the table that your Power BI or Tableau dashboard reads from. In your BI tool, you can also configure its data source to refresh on a schedule.
- **Tableau Hyper Export:** For Tableau users, Dataiku provides a specific plugin that allows you to export directly to Tableau's high-performance \`.hyper\` file format, which can then be published to Tableau Server.

### 6. Common Challenges and Solutions
- **Challenge:** "My BI dashboard is slow."
- **Solution:** You are trying to do too much work in the BI tool. **This is the most common anti-pattern.** Do not export raw, un-aggregated data. Perform all the heavy joins and aggregations in Dataiku, leveraging its push-down capabilities. The BI tool should receive a small, clean summary table. Its job is visualization, not complex ETL.
- **Challenge:** "The export to the database failed with a permissions error."
- **Solution:** The database user account that Dataiku is using needs \`CREATE TABLE\` and \`INSERT\` permissions in the target schema. Contact your database administrator to have these permissions granted.
`,
  },
  {
    id: 370,
    slug: 'troubleshooting-dashboard-layout-issues',
    question: 'How to get started with troubleshooting layout issues across screen sizes?',
    answer: `
### 1. Introduction/Overview
Creating a dashboard that looks good on different screen sizes and resolutions can be challenging. Dataiku dashboards use a grid-based layout system. Understanding how this grid reflows and using best practices for arrangement can help you build clean, responsive reports.

### 2. Prerequisites
- **A Dataiku dashboard** with several tiles.
- **Access to different screen sizes** for testing (or you can simply resize your browser window).

### 3. Step-by-Step Instructions
1.  **Understand the Grid System:**
    *   When you are in "Edit" mode on a dashboard, you can see the underlying grid. All tiles snap to this grid.
    *   The grid has a fixed number of columns (usually 12 or 24). When the screen gets narrower, the tiles will "reflow"—they may stack vertically instead of sitting side-by-side.
2.  **Design for a Standard Width:**
    *   Design your dashboard primarily for a standard desktop monitor width.
    *   Use the "Fit to width" option in the dashboard settings to make the content scale.
3.  **Group and Align:**
    *   Keep related charts and metrics together.
    *   Try to align the tops and bottoms of adjacent tiles to create clean horizontal lines.
    *   Use **Text** tiles as headers to create clear visual sections. This helps guide the viewer's eye.
4.  **Use Containers (Advanced):**
    *   For very complex layouts, you can use "Container" tiles. A container is a tile that can have its own internal grid, allowing you to nest layouts.
5.  **Test for Responsiveness:**
    *   After arranging your dashboard, exit "Edit" mode.
    *   Slowly make your browser window narrower and observe how the tiles reflow. Do they stack in a logical order? Or does the layout become jumbled?
    *   Go back to "Edit" mode and adjust the tile placement and size to improve the reflow behavior.

### 4. Resources and Tools
- **The Dashboard Grid:** Your guide for aligning tiles.
- **Your Browser:** The best tool for testing responsiveness by resizing the window.
- **Text Tiles:** An essential tool for creating visual structure and separation.

### 5. Next Steps and Progression
- **Design for PDF/Export:** If you know a dashboard will be regularly exported to PDF, design it with a fixed page size in mind (e.g., a 16:9 slide). Avoid very long, scrolling dashboards, as they don't export well to a paged format.
- **Create Separate Views:** For a truly optimized experience on mobile, you might consider creating a separate, simplified version of the dashboard with fewer tiles, specifically designed for a narrow screen.

### 6. Common Challenges and Solutions
- **Challenge:** "My tiles are overlapping or leaving weird gaps."
- **Solution:** This usually means the tiles are not perfectly snapped to the grid. In "Edit" mode, try nudging the tiles until they snap cleanly into the grid cells. Ensure there are no single-grid-unit gaps between them.
- **Challenge:** "When the screen gets smaller, the order of the stacked tiles is illogical."
- **Solution:** The stacking order is determined by the tile's position from top-to-bottom and left-to-right. To control the order, you may need to adjust the vertical and horizontal placement of your tiles in the main desktop layout.
`,
  },
  {
    id: 371,
    slug: 'setting-roles-and-permissions',
    question: 'How to get started with setting roles and permissions for team collaboration?',
    answer: `
### 1. Introduction/Overview
Setting up roles and permissions is fundamental to secure and governed collaboration in Dataiku. The platform uses a Role-Based Access Control (RBAC) model, where you assign permissions to **groups** of users, and those permissions dictate what they can do within a specific **project**.

### 2. Prerequisites
- **Clearly defined user roles** in your organization (e.g., Business Analyst, Data Scientist, Developer, Project Admin).
- **A Dataiku instance** where an administrator has created user groups corresponding to these roles.
- **Project administrator rights** to manage permissions for a project.

### 3. Step-by-Step Instructions
1.  **Understand the Core Concepts:**
    *   **Users** are individual people.
    *   **Groups** are collections of users (e.g., the "Finance Team" group).
    *   **Permissions** (like "Reader" or "Contributor") are assigned to a group *on a specific project*.
2.  **Navigate to Project Permissions:** In the project you want to secure, go to **Settings > Permissions**.
3.  **Add Groups to the Project:**
    *   Click **+ ADD GROUP**.
    *   Select the group you want to grant access to (e.g., \`data_scientists_team\`).
4.  **Assign the Appropriate Role (Permission Level):**
    *   For the group you just added, choose a permission level from the dropdown. The key roles are:
        *   **Reader:** Can view everything (datasets, flows, dashboards) but cannot edit or run anything. **Best for:** Business consumers.
        *   **Contributor:** Can do most things, including creating and editing recipes and datasets. **Best for:** The core development team.
        *   **Administrator:** Can do everything a contributor can, plus manage project settings and permissions. **Best for:** The project owner or tech lead.
5.  **Save and Verify:** Save your changes. The permissions are effective immediately. Ask a user from the group to check if they can now see and access the project with the correct rights.

### 4. Resources and Tools
- **Project Settings > Permissions:** The UI for managing who can do what in your project.
- **Administration > Security > Groups:** The admin-level UI for creating the user groups.

### 5. Next Steps and Progression
- **Principle of Least Privilege:** Always grant the minimum permission level required for a user to do their job. Don't make everyone an administrator.
- **Connection-Level Permissions:** Remember that access to data also depends on permissions granted to the underlying data **Connections**, which is managed by a global administrator.
- **Regular Audits:** Periodically review the permissions on your critical projects to ensure they are up-to-date and that people who have left the team have been removed.

### 6. Common Challenges and Solutions
- **Challenge:** "How do I give a user access to only one dashboard but not the rest of the project?"
- **Solution:** Dataiku's security model is primarily at the project level. The standard solution is to create a **separate project** just for that dashboard. Use a Sync recipe to share the final data to the new dashboard project, and then grant the user "Reader" access to only that new, isolated project.
- **Challenge:** "A user with 'Contributor' rights can't use a specific database."
- **Solution:** The user's group needs to be granted "Read" and/or "Write" access on the specific **Data Connection** in the global Administration settings. Project-level permissions and connection-level permissions work together.
`,
  },
  {
    id: 372,
    slug: 'applying-read-write-datasets-access',
    question: 'How to get started with applying read/write datasets access appropriately?',
    answer: `
### 1. Introduction/Overview
In Dataiku, a user's ability to read or write to a dataset is not controlled on the individual dataset itself. Instead, it is determined by two layers of permissions: their **project-level role** and the permissions on the underlying **data connection**. Understanding this two-level system is key to managing data access correctly.

### 2. Prerequisites
- **A Dataiku project** with datasets.
- **Understanding of Dataiku's permission model** (Users, Groups, Project Roles).

### 3. Step-by-Step Instructions: The Two Layers of Access

#### Layer 1: Project Role
- **What it is:** The user's permission level on the project containing the dataset.
- **How it works:**
    *   A user with a **Reader** role on a project can *view* the data in any dataset within that project but cannot run any recipe that would *write* to or modify a dataset.
    *   A user with a **Contributor** role can both read from and write to datasets within the project (by running recipes).
- **Where to configure:** **Project > Settings > Permissions**.

#### Layer 2: Connection Permissions
- **What it is:** The permissions granted to a user's group on the underlying data connection (e.g., the connection to your Snowflake or S3 data source). This is managed by a global administrator.
- **How it works:**
    *   Even if a user is a "Contributor" on a project, they cannot write data to a Snowflake dataset if their user group has not been granted "Write" access on the Snowflake connection itself.
    *   This provides a crucial, global safety gate. The connection-level permissions override the project-level ones.
- **Where to configure:** **Administration > Connections > (Your Connection) > Security**.

### 4. Resources and Tools
- **Project Permissions:** Controls what a user can do *within* a project.
- **Connection Permissions:** Controls what a user can do *on an external storage system* via Dataiku.

### 5. Next Steps and Progression
- **Scenario Execution:** When a scenario runs, it typically runs with the permissions of the user who started it or a dedicated service account. You must ensure this user has the necessary read/write permissions on both the project and the connections.
- **Auditing:** Use the project timeline and global audit logs to track who is reading from and writing to key datasets.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm a Contributor on the project, but my Export recipe to our database is failing with a permissions error."
- **Solution:** This is a classic example of the two-level system. You have permission to create and run the recipe in the project, but your user group lacks "Write" permission on the target database connection. You need to ask a Dataiku administrator to grant your group write access to that connection.
- **Challenge:** "I want to make a specific dataset read-only for everyone."
- **Solution:** The best way to do this is to place that dataset in its own dedicated, "locked" project. Grant all other developers only "Reader" access to this project. They can then import this certified, read-only dataset into their own projects to use as an input.
`,
  },
  {
    id: 373,
    slug: 'versioning-analysis-artifacts-in-git',
    question: 'How to get started with versioning analysis artifacts in Git?',
    answer: `
### 1. Introduction/Overview
Versioning your analysis artifacts—your recipes, notebooks, and pipeline definitions—is a critical practice for reproducibility and collaboration. Dataiku's native Git integration allows you to connect your entire project to a Git repository, providing a robust system for tracking changes, reviewing code, and managing different versions of your work.

### 2. Prerequisites
- **A Dataiku project.**
- **An empty Git repository** on a provider like GitHub or GitLab.
- **Git configured** on the Dataiku server.

### 3. Step-by-Step Instructions
1.  **Connect the Project to Git:**
    *   In your project, go to **Settings > Git**.
    *   Click **Convert to Git project** and provide the URL of your remote repository.
2.  **Understand What is Versioned:**
    *   When you commit, Dataiku saves the *definition* of all your project artifacts. This includes:
        *   The code in your Python and SQL recipes.
        *   The sequence of steps in your visual Prepare recipes.
        *   The code and outputs in your Jupyter notebooks.
        *   The structure of your Flow.
        *   The configuration of your charts and dashboards.
    *   **It does not version the actual data in your datasets.**
3.  **Adopt a Git Workflow:**
    *   **Branch:** Before starting new work, create a new **branch**.
    *   **Commit:** As you make changes, make small, frequent **commits** with clear messages. Use the Git page in Dataiku to stage and commit your changes.
    *   **Push:** Regularly **push** your branch to the remote repository to back it up and share it.
    *   **Pull Request:** When your feature is complete, create a **Pull Request** on your Git provider's website. This is a formal request for a teammate to review your changes before they are merged into the main branch.

### 4. Resources and Tools
- **Dataiku's Git Integration:** The UI for managing your Git workflow from within Dataiku.
- **Git Branching:** The mechanism for working on changes in isolation.
- **Pull Requests:** The framework for collaborative code review.

### 5. Next Steps and Progression
- **CI/CD Integration:** Use the Git commits and pull requests to trigger automated CI/CD pipelines for testing and deployment.
- **Visual Diffs:** When reviewing a pull request or a merge conflict, Dataiku provides a "visual diff" tool that shows you the changes to visual recipes and flows, not just code.

### 6. Common Challenges and Solutions
- **Challenge:** "I made a change to a notebook, but the output in the commit looks like a huge, unreadable JSON file."
- **Solution:** This is how notebook files (\`.ipynb\`) are structured. The diff can be hard to read on GitHub. Some browser extensions and tools are available to render notebook diffs more cleanly. The key is to make small changes and write very clear commit messages to explain what changed.
- **Challenge:** "We have a merge conflict on a visual recipe."
- **Solution:** This happens when two people edit the same recipe on different branches. Dataiku's visual merge tool will show you the two conflicting versions. You will have to manually choose which version to keep or combine the logic from both into a new version. This highlights the importance of good communication and breaking down tasks to avoid concurrent editing of the same object.
`,
  },
  {
    id: 374,
    slug: 'documenting-recipes-with-in-flow-annotations',
    question: 'How to get started with documenting recipes with in-flow annotations?',
    answer: `
### 1. Introduction/Overview
Effective documentation is key to maintainable pipelines. "In-flow annotations" refer to the practice of adding descriptions and context directly onto the objects in your Dataiku Flow. This makes your pipeline self-documenting and easy for others to understand at a glance.

### 2. Prerequisites
- **A Dataiku Flow.**
- **A commitment from the team** to document their work.

### 3. Step-by-Step Instructions

#### 1. Use Descriptions on Everything
- **This is the most important habit.** Every object in the Flow (datasets, recipes, models) has a "Description" field.
- **How:** Click on any recipe. In the summary panel on the right, there is a field for a description. Write a clear, one-sentence summary of what the recipe does.
- **Example:** For a Join recipe, a good description is: "Joins customer data with transaction data to create a unified view."
- **Benefit:** This description appears when anyone hovers their mouse over the recipe in the Flow, providing immediate context.

#### 2. Use Clear, Standardized Names
- The name of the recipe itself is a form of documentation.
- **Bad Name:** \`Prepare_1\`
- **Good Name:** \`prepare_customers_for_modeling\`
- Use a consistent naming convention that your team agrees on.

#### 3. Use Text Boxes for High-Level Comments
- You can add annotations directly to the Flow canvas.
- **How:** Right-click on an empty area of the Flow and select **Add text box**.
- **Benefit:** Use these text boxes to create headers for different sections of your Flow or to add a more detailed explanation for a complex series of recipes.

### 4. Resources and Tools
- **The Description Field:** Your primary tool for in-flow documentation.
- **Text Boxes:** For adding larger comments and section headers to the Flow canvas.
- **Flow Zones:** While not just for documentation, organizing your flow into clearly named zones is a powerful way to document the high-level architecture.

### 5. Next Steps and Progression
- **Make it a Standard:** Include "All recipes must have a description" as a mandatory item in your team's "definition of done" for any development task.
- **Review for Documentation:** During peer reviews (e.g., in a Pull Request), check not only the code but also the quality of the descriptions and annotations.

### 6. Common Challenges and Solutions
- **Challenge:** "It takes too long to document everything."
- **Solution:** It doesn't have to be a novel. A single, well-written sentence is often enough. The time it takes to write that sentence is minimal compared to the time a future developer will waste trying to understand an undocumented recipe.
- **Challenge:** "My descriptions get out of date when the recipe changes."
- **Solution:** Make updating the description part of the change process. When you modify a recipe's logic, take the extra 10 seconds to update its description to match.
`,
  },
  {
    id: 375,
    slug: 'attaching-metadata-to-datasets-for-lineage',
    question: 'How to get started with attaching metadata to datasets for lineage tracking?',
    answer: `
### 1. Introduction/Overview
Data lineage in Dataiku is tracked automatically. However, you can significantly enrich this lineage and improve governance by attaching business and operational metadata to your datasets. This provides crucial context that makes the lineage graph more meaningful.

### 2. Prerequisites
- **A dataset** in your Dataiku Flow.
- **Information about the dataset's origin, purpose, and quality.**

### 3. Step-by-Step Instructions
1.  **Open the Dataset and Go to Summary:** Click on the dataset in your Flow to open its summary panel on the right.
2.  **Add a Clear Description:**
    *   This is the most important piece of metadata. In the "Description" field, write a clear sentence explaining what the dataset represents.
    *   **Example:** "Raw customer data from the Salesforce CRM, updated daily."
    *   This description will appear in the lineage graph, providing immediate context.
3.  **Use Tags for Classification:**
    *   In the "Tags" section, add keywords to classify the dataset. This is essential for governance and search.
    *   **Example Tags:** \`Source:Salesforce\`, \`Sensitivity:PII\`, \`Status:Raw\`, \`Owner:SalesTeam\`.
4.  **Use Custom Metadata for Structured Info:**
    *   For more structured metadata, click the "+ Add metadata" button.
    *   This allows you to add key-value pairs.
    *   **Example:** Key: \`Source_Table\`, Value: \`dbo.customers\`. Key: \`Refresh_Frequency\`, Value: \`Daily\`.
5.  **Review the Enriched Lineage:** Now, when you view the lineage graph for a downstream dataset, you can click on any ancestor dataset and see all the rich metadata you've attached, giving you a complete picture of its origin and context.

### 4. Resources and Tools
- **The Dataset Summary Panel:** The UI for adding all types of metadata.
- **Tags:** For searchable, keyword-based classification.
- **Custom Metadata:** For structured key-value information.
- **The Lineage Graph:** Where your enriched metadata provides context to the technical lineage.

### 5. Next Steps and Progression
- **Establish a Metadata Standard:** Create a company-wide policy on what metadata (which tags and custom properties) is mandatory for different types of datasets.
- **Automate Metadata Tagging:** Use a Python script in a scenario to automatically scan datasets and apply tags based on rules (e.g., if a column name is 'email', add the 'PII' tag).
- **Data Catalog:** This metadata feeds directly into Dataiku's Data Catalog, making all your data assets searchable and discoverable based on their business context.

### 6. Common Challenges and Solutions
- **Challenge:** "It's too much manual work to tag everything."
- **Solution:** Focus on what's important. Start by ensuring your critical, "golden" source datasets have rich metadata. The value of this metadata will propagate downstream through the lineage.
- **Challenge:** "What's the difference between tags and custom metadata?"
- **Solution:** Use tags for simple, non-unique classifications (many datasets can have the 'PII' tag). Use custom metadata for specific, structured attributes where you have a clear key and a single value (a dataset has only one 'Refresh_Frequency').
`,
  },
  {
    id: 376,
    slug: 'applying-project-level-tags',
    question: 'How to get started with applying project-level tags and description consistently?',
    answer: `
### 1. Introduction/Overview
Just as you add metadata to datasets, you should also add metadata to your projects. Applying a consistent set of tags and a clear description at the project level is essential for managing, finding, and governing projects in a large, multi-user Dataiku instance.

### 2. Prerequisites
- **A Dataiku project.**
- **A standard taxonomy** for project tags defined by your organization.

### 3. Step-by-Step Instructions
1.  **Navigate to the Project Homepage:** Open the project you want to annotate.
2.  **Edit the Project Description:**
    *   The project description is displayed prominently at the top of the project homepage.
    *   Click on it to edit.
    *   Write a clear, one-to-two sentence summary of the project's business purpose.
    *   **Example:** "This project analyzes customer churn and contains the production model for predicting at-risk customers."
3.  **Add Project Tags:**
    *   On the right side of the project homepage, you will see a panel for "Project Tags".
    *   Click to add tags. These tags should classify the entire project.
    *   **Example Tags:** \`Domain:Marketing\`, \`Status:Production\`, \`Criticality:High\`.
4.  **Save Your Changes.**

### 4. Resources and Tools
- **The Project Homepage:** The UI for editing the project-level description and tags.
- **The Dataiku Homepage (Projects List):** This is where your project-level metadata becomes powerful. You can search and filter your list of all projects based on their tags, making it easy to find what you're looking for.

### 5. Next Steps and Progression
- **Enforce Consistency:** Make it a mandatory step in your project creation process for the project owner to add the standard set of tags and a clear description.
- **Project Governance:** A Dataiku administrator can write a script using the API that periodically scans all projects and generates a report of projects that are missing required tags or descriptions.
- **Project Folders:** Use project folders on the Dataiku homepage to group related projects (e.g., a "Finance" folder for all finance-related projects).

### 6. Common Challenges and Solutions
- **Challenge:** "We have hundreds of projects, and none of them have tags."
- **Solution:** You will need to undertake a one-time cleanup effort. This can be done programmatically. A script using the Dataiku API can loop through all projects, and based on their name or other properties, apply a default set of tags to get you started.
- **Challenge:** "What's the difference between project tags and dataset tags?"
- **Solution:** Project tags classify the entire project (e.g., its business domain). Dataset tags are more granular and classify the specific data within the project (e.g., its source or sensitivity). A project tagged as \`Domain:Finance\` might contain datasets tagged as \`Source:SAP\` and \`Source:Salesforce\`.
`,
  },
  {
    id: 377,
    slug: 'exporting-project-documentation',
    question: 'How to get started with exporting project documentation for reviews?',
    answer: `
### 1. Introduction/Overview
When you need to share your project's documentation with external stakeholders, auditors, or team members who may not have full access to Dataiku, you need a way to export it. Dataiku provides several methods for exporting different types of documentation.

### 2. Prerequisites
- **A well-documented Dataiku project.** This means you have already added descriptions to objects, created a Wiki, etc.

### 3. Step-by-Step Instructions

#### Method 1: Exporting the Wiki
- **What it is:** Exports the entire project Wiki as a set of HTML files.
- **How:**
    1.  Go to the **Wiki** in your project.
    2.  Click the "three dots" menu and select **Export**.
    3.  This will download a \`.zip\` file containing the HTML of all your Wiki pages, which can be shared and viewed in a browser.

#### Method 2: Exporting Dashboards
- **What it is:** Exports a dashboard as a PDF or image file.
- **How:**
    1.  Open the **Dashboard** you want to export.
    2.  Click the "three dots" menu and select **Export**.
    3.  You can choose to export as PDF or PNG.

#### Method 3: Exporting the Entire Project (for technical review)
- **What it is:** Creates a complete, portable bundle of your entire project.
- **How:**
    1.  From the project homepage, click the **...** menu and select **Export**.
    2.  This downloads a \`.zip\` file.
- **Why it's useful:** This bundle can be imported into another Dataiku instance, allowing another developer to see your entire project, including all recipes, the Flow, and all documentation, exactly as you built it.

#### Method 4: Automated Documentation Generation (Advanced)
- **What it is:** Writing a script to extract all metadata and create a custom document.
- **How:**
    1.  Create a **Python recipe**.
    2.  Use the Dataiku API to get handles on all your project's objects (datasets, recipes).
    3.  Loop through the objects, get their metadata (name, description, tags, schema), and write this information to a file (e.g., a Markdown or HTML file).
    4.  Save the final document to a managed folder.

### 4. Resources and Tools
- **The Export features** on the Wiki and Dashboards.
- **The Project Bundle export feature.**
- **The Dataiku Python API** for advanced, custom documentation generation.

### 5. Next Steps and Progression
- **Scenario Automation:** You can create a scenario that automatically runs your documentation-generation script and emails the result, creating a self-updating documentation process.
- **Static Site Generator:** Your script could generate a set of Markdown files that can be used as the source for a static website generator like Jekyll or Hugo, creating a professional-looking documentation website for your project.

### 6. Common Challenges and Solutions
- **Challenge:** "The PDF export of my dashboard doesn't look right."
- **Solution:** You need to design your dashboard with the export in mind. Use fixed-size layouts (like 16:9) and avoid long, scrolling pages.
- **Challenge:** "The project bundle \`.zip\` file is huge."
- **Solution:** When you export a project, you have the option to include the data from your datasets or not. For sharing documentation and logic, you should choose to export **without** the data to keep the file size small.
`,
  },
  {
    id: 378,
    slug: 'enforcing-governance-policies-in-dataset-access',
    question: 'How to get started with enforcing governance policies in dataset access?',
    answer: `
### 1. Introduction/Overview
Data governance in Dataiku is about controlling who can access what data and under what conditions. This is enforced through a multi-layered security model that combines project-level permissions, connection-level permissions, and clear metadata tagging to ensure your company's policies are followed.

### 2. Prerequisites
- **A clear data governance policy** (e.g., "Only the Finance team can see raw financial data," "PII data must be masked for general analysts").
- **A Dataiku instance** with configured user groups.
- **Administrator rights** to manage permissions.

### 3. Step-by-Step Instructions: A Governance Framework

1.  **Tag Your Data:**
    *   The foundation of governance is knowing what you have. Go through your key datasets and apply **Tags** to classify them.
    *   **Example:** Tag datasets with \`Sensitivity:PII\`, \`Sensitivity:Confidential\`, or \`Sensitivity:Public\`.
2.  **Isolate by Project:**
    *   The primary mechanism for access control is the **project**.
    *   Place highly sensitive data in its own dedicated, highly restricted project. For example, a \`RAW_FINANCIAL_DATA\` project.
    *   Only grant access (even "Reader" access) to this project to the small number of users who are authorized to see the raw data (e.g., the \`Finance_Admins\` group).
3.  **Control Connection Access (Admin Task):**
    *   An administrator must go to **Administration > Connections**.
    *   For connections to sensitive systems, they must configure the "Security" tab to only allow specific groups to read from or write to that system. This is a powerful global control.
4.  **Provide Sanitized Versions:**
    *   In a separate, less-restricted project, create a pipeline that reads from the sensitive project (this requires a service account with special permissions).
    *   This pipeline's job is to create a sanitized version of the data (e.g., with PII columns masked or removed).
    *   Grant wider access to this "clean" project, allowing general analysts to use the safe, anonymized data without ever seeing the raw sensitive information.

### 4. Resources and Tools
- **Tags:** For classifying data sensitivity.
- **Project-level Permissions:** The primary tool for restricting access.
- **Connection-level Permissions:** A global safety gate controlled by administrators.
- **Prepare Recipes:** For creating the sanitized or masked versions of datasets.

### 5. Next Steps and Progression
- **Automated Governance Checks:** Create a scenario with a Python script that uses the API to scan all projects. The script can check for policy violations (e.g., "alert if a dataset tagged as \`PII\` is in a project that is open to all users") and send a report to the governance team.
- **Formal Sign-offs:** For regulated industries, use Dataiku's features for formal project sign-offs to create an auditable trail of who approved the pipeline and its security model.

### 6. Common Challenges and Solutions
- **Challenge:** "A user can't access a dataset even though they are a Contributor on the project."
- **Solution:** This is likely a Connection permission issue. The user's group needs to be granted access to the underlying data connection in the global Administration settings.
- **Challenge:** "This project-level security model seems too coarse."
- **Solution:** It is by design. If you need to enforce different permissions on different datasets, the correct pattern is to separate them into different projects with different permission sets. This makes the security model explicit and easy to audit.
`,
  },
  {
    id: 379,
    slug: 'auditing-recipe-changes',
    question: 'How to get started with auditing recipe changes via project history logs?',
    answer: `
### 1. Introduction/Overview
Auditing is the process of reviewing a history of changes to understand who changed what, and when. This is essential for compliance, debugging, and accountability. Dataiku automatically logs all changes to recipes, and you can access this audit trail through the Project Timeline or, more powerfully, through Git integration.

### 2. Prerequisites
- **A Dataiku project** where recipes have been modified.

### 3. Step-by-Step Instructions

#### Method 1: Using the Project Timeline (Simple Audit)
1.  **Navigate to the Timeline:** In your project, go to the **...** menu in the top navigation bar and select **Timeline**.
2.  **Filter for Recipe Changes:**
    *   The Timeline shows a chronological feed of all project events.
    *   Use the filter bar at the top to narrow down the view. You can filter by the user who made the change, the type of object (e.g., "Recipe"), or a date range.
3.  **Review the Log:** The log will show entries like "User 'John Doe' modified recipe 'prepare_customers' at 2023-10-27 10:30 AM". While this tells you who and when, it doesn't show the exact change.

#### Method 2: Using Git History (Detailed Audit)
- **This is the gold standard for auditing recipe changes.**
1.  **Ensure Project is on Git:** Your project must be linked to a Git repository. All changes must be committed.
2.  **Go to Your Git Provider:** Navigate to your project's repository on GitHub, GitLab, etc.
3.  **View the Commit History:** Go to the "Commits" section. This shows a detailed list of every change.
4.  **Inspect a Commit:** Click on a specific commit to see the "diff".
    *   **For Code Recipes (Python/SQL):** The diff will show the exact lines of code that were added, removed, or changed.
    *   **For Visual Recipes:** The diff will show changes to the underlying JSON file that defines the recipe's steps. This can be technical, but it provides a complete and precise record of the change.
    *   Dataiku's own diff viewer on the Git page is optimized to show these visual recipe changes in a more human-readable format.

### 4. Resources and Tools
- **Project Timeline:** For a high-level, user-friendly audit trail.
- **Git and your Git Provider:** For a detailed, line-by-line, and immutable audit trail.
- **Pull Requests:** The review process of a pull request is itself a form of audit, creating a record of who reviewed and approved a change.

### 5. Next Steps and Progression
- **Enforce Good Commit Messages:** A Git history is only as good as its commit messages. Mandate that your team writes clear messages explaining the *why* behind each change.
- **Webhook to JIRA:** You can set up a webhook to automatically add a comment to a JIRA ticket every time a commit is made that references that ticket number, linking your development work directly to your project management audit trail.

### 6. Common Challenges and Solutions
- **Challenge:** "The Project Timeline doesn't give me enough detail."
- **Solution:** You are correct. The Timeline is for high-level tracking. For detailed, code-level auditing, you must use Git integration.
- **Challenge:** "I don't understand the JSON diff for a visual recipe."
- **Solution:** Use the diff viewer inside Dataiku's Git page. It is designed to interpret this JSON and show the changes in a more understandable way (e.g., "Step 'Filter' was modified").
`,
  },
  {
    id: 380,
    slug: 'aligning-usage-with-compliance-standards',
    question: 'How to get started with aligning usage with organizational compliance standards?',
    answer: `
### 1. Introduction/Overview
Aligning your Dataiku usage with your organization's compliance standards (whether internal policies or external regulations like GDPR) is a critical responsibility. It requires a proactive approach, using Dataiku's governance features to implement controls and document your processes to prove adherence.

### 2. Prerequisites
- **A clear understanding of the compliance standards** you must meet. This requires close collaboration with your organization's legal, security, and compliance teams.
- **A Dataiku project** that handles data covered by these standards.

### 3. Step-by-Step Instructions: A Compliance Checklist
1.  **Data Classification:**
    *   **Action:** Work with the compliance team to define a data classification policy (e.g., \`Public\`, \`Internal\`, \`Confidential\`, \`PII\`).
    *   **Implementation:** Use Dataiku **Tags** to apply these classifications to all your datasets.
2.  **Access Control:**
    *   **Action:** Apply the "Principle of Least Privilege."
    *   **Implementation:** Use **Project-level Permissions** to ensure only authorized groups can access projects containing sensitive data. Use **Connection-level Permissions** as a global safeguard.
3.  **Data Minimization and Retention:**
    *   **Action:** Only process the data you need, and delete it when it's no longer required.
    *   **Implementation:** Use **Prepare recipes** to select only necessary columns. Use automated **Scenarios** with Python steps to delete old data partitions according to your company's retention policy.
4.  **Privacy Protection:**
    *   **Action:** Anonymize or mask sensitive data where appropriate.
    *   **Implementation:** Use **Prepare recipes** with hashing functions or regex replacements to create sanitized versions of datasets for wider use.
5.  **Auditability and Provenance:**
    *   **Action:** Be able to prove where your data came from and how it was transformed.
    *   **Implementation:** Rely on Dataiku's automatic **Lineage** graphs. Use screenshots of column-level lineage as proof for auditors. Use **Git integration** to maintain an immutable audit trail of all changes to your pipeline's logic.
6.  **Documentation:**
    *   **Action:** Document your compliance controls.
    *   **Implementation:** In your project's **Wiki**, create a "Compliance" page. For each relevant clause of the standard, explain the specific technical control you have implemented in Dataiku to meet it.

### 4. Resources and Tools
- **Dataiku's Governance Features:** Tags, Permissions, Lineage, and the Wiki are your primary tools.
- **Collaboration:** Regular meetings with your compliance team are essential.

### 5. Next Steps and Progression
- **Automated Governance Checks:** Create a "governance" scenario that uses the API to scan projects for compliance violations (e.g., "alert if a dataset tagged as \`PII\` is in a public project") and sends an alert.
- **Formal Sign-offs:** For regulated industries, use Dataiku's formal sign-off features to create an auditable approval trail for your pipeline's design and deployment.

### 6. Common Challenges and Solutions
- **Challenge:** "The compliance rules are complex and hard to translate into technical controls."
- **Solution:** This requires close partnership with your compliance team. You bring the knowledge of what's technically possible in Dataiku; they bring the knowledge of the legal requirements. Work together to design a solution that is both compliant and practical.
- **Challenge:** "This seems like it will slow down our development."
- **Solution:** Building with compliance in mind from the start is much more efficient than having to fix a non-compliant pipeline after an audit. Integrating these steps into your standard development workflow makes them a normal part of building high-quality, trustworthy data products.
`,
  },
  {
    id: 381,
    slug: 'profiling-long-running-recipes',
    question: 'How to get started with profiling long-running recipes for performance issues?',
    answer: `
### 1. Introduction/Overview
When a data pipeline is slow, the first step is to profile it to find the bottleneck. Profiling means identifying which specific recipe or step is consuming the most time. Dataiku's **Job Inspector** provides a visual Gantt chart that makes it easy to spot these long-running recipes.

### 2. Prerequisites
- **A slow-running scenario** or job in Dataiku.
- **Access to the "Jobs" menu** in your project.

### 3. Step-by-Step Instructions
1.  **Find a Recent Run:** Go to the **Jobs** menu and find a recent execution of the slow pipeline. Click on it to open the Job Inspector.
2.  **Analyze the Gantt Chart:**
    *   The main view of the Job Inspector is a Gantt chart. This chart shows every recipe that was run as a horizontal bar along a timeline.
    *   **The length of the bar is proportional to the time it took that recipe to run.**
    *   Visually scan the chart. Look for the longest bar(s). This is your bottleneck. This is the recipe you need to optimize.
3.  **Investigate the Slow Recipe:**
    *   Click on the long bar in the Gantt chart to see the detailed log for that specific recipe. The log might contain warnings or other clues.
    *   Go back to the Flow and open the recipe itself.
4.  **Diagnose the Root Cause:** Ask critical questions about the recipe.
    *   **Where is it running?** Check the **Advanced** settings. If the **Execution engine** is "In-Memory" and it's processing a large dataset, you've found the problem.
    *   **What is it doing?** Is it a very complex Join? Is it a Python recipe with an inefficient loop?
5.  **Apply Optimizations:** Based on your diagnosis, apply a fix. The most common fix is to change the execution engine to **Run on database (SQL)** or **Spark** to push down the computation.

### 4. Resources and Tools
- **The Job Inspector and Gantt Chart:** Your primary tool for identifying bottlenecks visually.
- **The Recipe Log:** Provides detailed execution information for a single step.
- **The Execution Engine setting:** The most powerful lever for performance optimization.

### 5. Next Steps and Progression
- **Iterative Tuning:** Performance tuning is a cycle. After you fix the biggest bottleneck, run the job again. A new recipe might now be the slowest part. Repeat the profiling process until the overall pipeline speed meets your requirements.
- **Engine-Specific Tools:** If a pushed-down SQL or Spark recipe is still slow, you need to use the native tools for that engine (like a database's \`EXPLAIN\` plan analyzer or the Spark UI) to do a deeper performance analysis.

### 6. Common Challenges and Solutions
- **Challenge:** "The whole job is slow, not just one recipe."
- **Solution:** This often points to a fundamental architectural issue. It could be that your Dataiku server is under-resourced, or that you are reading a huge amount of data from a very slow source system (e.g., over a slow network connection).
- **Challenge:** "The Gantt chart shows a lot of time between recipes."
- **Solution:** This "gap" time can represent data movement. For example, the time it takes Dataiku to write the output of one recipe to disk before the next recipe can start reading it. Using more efficient storage formats (like Parquet) and faster storage systems can help reduce this overhead.
`,
  },
  {
    id: 382,
    slug: 'switching-visual-to-code-recipes-for-efficiency',
    question: 'How to get started with switching visual recipes to code recipes for efficiency?',
    answer: `
### 1. Introduction/Overview
A common misconception is that code recipes (Python/SQL) are always more performant than visual recipes. This is often **not true**. Visual recipes are powerful because they can be pushed down to high-performance engines like Spark or a SQL database. This guide explains the correct framework for deciding when to switch to code for efficiency.

### 2. Prerequisites
- **A slow or inefficient visual recipe.**
- **An understanding of Dataiku's execution engines.**

### 3. Step-by-Step Instructions: The Decision Framework

**Scenario 1: Your data is in a SQL Database.**
- **Problem:** Your visual Prepare recipe is slow.
- **Incorrect Solution:** Re-writing it in a Python recipe using Pandas. This will be *slower*, because you will be pulling all the data out of the database into the Dataiku server's memory.
- **Correct Solution:** Keep it as a visual recipe, but go to its **Advanced** settings and change the **Execution engine** to **Run on database (SQL)**. Dataiku will translate your visual steps into a single SQL query and run it directly on the database, which is extremely efficient.

**Scenario 2: Your data is on a distributed filesystem (S3, HDFS).**
- **Problem:** Your visual Join recipe on two very large datasets is slow.
- **Incorrect Solution:** Re-writing it in a Python recipe using Pandas. This will crash with an Out of Memory error.
- **Correct Solution:** Keep it as a visual recipe and change the **Execution engine** to **Spark**. Dataiku will run the join as a distributed Spark job.

**Scenario 3: You have logic that CANNOT be expressed visually OR pushed down.**
- **Problem:** You need to use a specific Python library or perform a complex, iterative calculation that is not available in visual processors or translatable to SQL/Spark.
- **Correct Solution:** This is the correct time to switch to a **Python recipe**. You accept that the data will be processed in-memory on the Dataiku server, because your custom logic requires it. The key is to do as much of the filtering and preparation as possible in upstream visual, pushed-down recipes, so that the Python recipe receives the smallest possible dataset.

### 4. Resources and Tools
- **The Execution Engine Setting:** Your most important performance lever.
- **Code Recipes (Python/SQL/PySpark):** The tools for custom logic that cannot be pushed down.

### 5. Next Steps and Progression
- **Hybrid Approach:** The most efficient pipelines often use a hybrid approach. They use pushed-down visual recipes for the heavy lifting (filtering, joining large tables) and then use in-memory Python recipes only for the final, specific steps that require custom code.

### 6. Common Challenges and Solutions
- **Challenge:** "I re-wrote my slow visual recipe in Python and now it's even slower."
- **Solution:** You have likely fallen into the trap described in Scenario 1. You have moved from an engine-based process to an in-memory process. You should almost always try to push down a visual recipe before you consider re-writing it in Python.
`,
  },
  {
    id: 383,
    slug: 'enabling-spark-mode',
    question: 'How to get started with enabling Spark mode for large dataset processing?',
    answer: `
### 1. Introduction/Overview
For processing datasets that are too large to fit in memory, Apache Spark is the industry-standard distributed computing engine. Dataiku allows you to seamlessly switch the execution of your recipes to a Spark cluster, enabling you to process massive amounts of data in parallel.

### 2. Prerequisites
- **Dataiku integrated with a Spark cluster:** An administrator must have configured your Dataiku instance to connect to a Spark cluster (e.g., a standalone cluster, or a managed one like AWS EMR or Dataproc).
- **Data on Spark-compatible storage:** Your input datasets must be on a distributed filesystem that Spark can access, such as HDFS, S3, GCS, or ADLS.

### 3. Step-by-Step Instructions

#### For Visual Recipes (Prepare, Join, Group, etc.)
1.  **Open the Recipe:** Select a visual recipe in your Flow that is processing a large dataset.
2.  **Navigate to Advanced Settings:** In the recipe editor, click on the **Advanced** tab in the settings panel.
3.  **Change the Execution Engine:**
    *   Find the dropdown menu labeled **Execution engine**.
    *   Change the selection from the default (likely "DSS engine" or "In-Memory") to **Spark**.
4.  **Run the Recipe:** Click **Run**. Dataiku will now translate the visual steps of your recipe into an optimized Spark application and submit it to your cluster.

#### For Code Recipes
1.  **Choose a Spark Recipe Type:**
    *   When you create a new code recipe (**+ RECIPE**), choose one of the native Spark recipe types:
        *   **PySpark:** For writing custom logic using Python with the Spark DataFrame API.
        *   **SparkR:** For using R with Spark.
        *   **SparkSQL:** For writing SQL queries to be executed by the SparkSQL engine.
2.  **Write Your Spark Code:** The editor will open with a pre-configured Spark session. You can write standard Spark API code to perform your transformations.
3.  **Run the Recipe:** Running the recipe will execute your script as a Spark application on the cluster.

### 4. Resources and Tools
- **The Execution Engine Dropdown:** The key to enabling Spark for visual recipes.
- **Spark Code Recipes:** For writing custom distributed applications.
- **The Spark UI:** The web interface for your Spark cluster, which is essential for monitoring the progress and performance of the jobs submitted by Dataiku.

### 5. Next Steps and Progression
- **Performance Tuning:** In the recipe's advanced settings, you can pass custom Spark configurations to tune the job's performance (e.g., setting the number of executors, driver memory, etc.).
- **User Defined Functions (UDFs):** In PySpark, you can define custom Python functions and use them as UDFs to apply complex logic at scale on your Spark DataFrames.

### 6. Common Challenges and Solutions
- **Challenge:** "The Spark engine option is greyed out."
- **Solution:** This means your input or output datasets for the recipe are not on a Spark-compatible storage system. For example, a dataset from an uploaded CSV file lives on the local Dataiku server filesystem and cannot be directly accessed by a Spark cluster. You must first use a **Sync recipe** to move the data to a location like S3 or HDFS.
- **Challenge:** "My Spark job is failing."
- **Solution:** Debugging Spark jobs can be complex. The first step is to go to the native Spark UI, find your application, and look at the logs for the failed executors. The root cause is often found there. Common issues include Out of Memory errors or data skew.
`,
  },
  {
    id: 384,
    slug: 'leveraging-push-down-sql',
    question: 'How to get started with leveraging push‑down SQL instead of in-memory compute?',
    answer: `
### 1. Introduction/Overview
"Push-down" is the single most important performance optimization strategy in Dataiku when working with data stored in a database. It means sending the computation *to* the data, rather than pulling the data into Dataiku's memory. This leverages the power of your database and dramatically reduces data movement and processing time.

### 2. Prerequisites
- **Your data is stored in a SQL database** that Dataiku is connected to (e.g., Snowflake, Redshift, BigQuery, PostgreSQL).
- **A visual recipe** (like Prepare or Join) that is processing this data.

### 3. Step-by-Step Instructions
1.  **Identify In-Memory Processing:**
    *   Open your visual recipe.
    *   Go to the **Advanced** settings panel.
    *   Look at the **Execution engine**. If it says "DSS engine" or "In-Memory," you are not using push-down. This means Dataiku is loading the entire input dataset into its own memory to perform the transformations. This is very inefficient for large data.
2.  **Enable Push-down Execution:**
    *   Click on the **Execution engine** dropdown.
    *   Change the selection to **Run on database (SQL)**.
3.  **What Happens Now?**
    *   When you run the recipe, Dataiku will not pull any data.
    *   Instead, it will act as a "compiler," translating the visual steps of your recipe (e.g., your filters, formulas, joins) into a single, complex SQL query.
    *   It then sends this SQL query to your database, which executes it using its own powerful, optimized engine. The result is then stored in a new table in the database.
4.  **Verify the Push-down:**
    *   Run the recipe. In the job log, you can often see the actual SQL query that Dataiku generated and executed on the database.

### 4. Resources and Tools
- **The Execution Engine Dropdown:** This is the on/off switch for push-down execution.
- **SQL Recipes:** For ultimate control, you can write the SQL query yourself in a SQL recipe. This also uses push-down execution.

### 5. Next Steps and Progression
- **Design for Push-down:** When building new flows with database sources, make it a habit to set the engine to "Run on database" for all your visual recipes from the start.
- **Check Compatibility:** Not all processors in the Prepare recipe can be translated to SQL. Dataiku will show a warning if a step is not compatible with the SQL engine. You may need to split your logic into multiple recipes if you have an incompatible step.

### 6. Common Challenges and Solutions
- **Challenge:** "The 'Run on database' option is not available."
- **Solution:** This means the recipe's inputs and outputs are not all from the same database connection. Push-down requires all the data to be in one place. You cannot, for example, push down a join between a Snowflake table and a CSV file.
- **Challenge:** "The pushed-down query is slow."
- **Solution:** The performance is now dependent on your database. You may need to work with a database administrator to ensure the tables are properly indexed and that the database's query optimizer is creating an efficient plan for the SQL generated by Dataiku.
`,
  },
  {
    id: 385,
    slug: 'optimizing-join-recipes',
    question: 'How to get started with optimizing join recipes to minimize data duplication?',
    answer: `
### 1. Introduction/Overview
The **Join** recipe is a fundamental tool, but if used incorrectly on large datasets, it can be a major source of performance bottlenecks and logical errors. Optimizing joins involves choosing the right execution engine and ensuring the join keys are clean and unique.

### 2. Prerequisites
- **Two or more datasets** to be joined.
- **A clear understanding of the join keys** and the relationship between the tables.

### 3. Step-by-Step Instructions: Optimization Checklist

#### 1. Choose the Right Execution Engine
- **This is the most important optimization.**
- Open your Join recipe and go to the **Advanced** settings.
- If your input datasets are from a **SQL database**, set the engine to **Run on database (SQL)**.
- If your input datasets are from **S3/HDFS**, set the engine to **Spark**.
- **Avoid the "In-Memory" engine** for joins on any large dataset.

#### 2. Pre-filter and Pre-aggregate Your Inputs
- A join's performance is highly dependent on the size of the input tables.
- Before the Join recipe, add **Prepare** or **Group** recipes to filter out any unnecessary rows and columns from your input datasets. Send the smallest possible datasets into the join.

#### 3. Ensure the "Right-side" Key is Unique
- In a typical left join, if the key in your "right-hand" table is not unique, you can get a "row explosion" where the output has many more rows than the left table. This is a common logical error and performance killer.
- **Solution:** Before the Join recipe, add a **Group** recipe on your right-hand dataset. Group by the join key to ensure it is unique. You will need to decide how to aggregate the other columns (e.g., take the "First" or "Max" value).

#### 4. Select Only the Columns You Need
- In the Join recipe's settings, at the bottom, there is a "Selected Columns" panel.
- Deselect any columns from the input datasets that you do not need in the final output. This reduces the amount of data that needs to be written.

### 4. Resources and Tools
- **The Execution Engine Setting:** Your primary performance tool.
- **The Group Recipe:** Essential for deduplicating join keys.
- **The Job Inspector:** To measure the performance of your join before and after optimization.

### 5. Next Steps and Progression
- **Refactor to SQL:** For complex, multi-table joins on database data, it can be more performant to refactor the logic into a single, comprehensive **SQL recipe**. This allows the database's query optimizer to create the best possible execution plan.
- **Check Database Indexes:** If a pushed-down SQL join is still slow, work with a DBA to ensure that the join key columns are indexed in the source database.

### 6. Common Challenges and Solutions
- **Challenge:** "My join created millions of extra rows."
- **Solution:** You have a non-unique key on the right side of your join. You must use a Group recipe to deduplicate it before the join.
- **Challenge:** "My join is running out of memory."
- **Solution:** You are using the in-memory engine. You must change the execution engine to push down the computation to your database or Spark cluster.
`,
  },
  {
    id: 386,
    slug: 'caching-intermediate-datasets',
    question: 'How to get started with caching intermediate datasets to avoid recompute?',
    answer: `
### 1. Introduction/Overview
In Dataiku, you don't need to implement a special caching strategy because **every dataset in the Flow is a form of cache**. When you run a recipe, its output is physically written to storage. Dataiku's "smart rebuild" system then uses this cached, materialized result to avoid recomputing unchanged upstream parts of a pipeline.

### 2. Prerequisites
- **A Dataiku Flow** with a chain of recipes.

### 3. Step-by-Step Instructions: Understanding the Built-in Caching
1.  **Datasets are Materialized Results:**
    *   Think of each blue dataset square in your Flow as a saved, intermediate result. When you run \`Recipe_A\` to produce \`Dataset_B\`, the contents of \`Dataset_B\` are saved to disk (or a database table). This is your cache.
2.  **Smart Rebuild in Action:**
    *   Imagine a flow: \`A -> B -> C\`. You run the flow to build C.
    *   Now, you change the recipe between B and C.
    *   You ask Dataiku to build C again.
    *   Dataiku sees that dataset B and its parent recipe have not changed. It will **not** rerun the recipe that creates B. It will read the cached, materialized data directly from B and then run only the changed recipe to create C. This is the "smart rebuild."
3.  **Controlling the Cache:**
    *   **To use the cache:** In your scenario's "Build" step, use the **Smart rebuild** mode. This is the default and most efficient mode.
    *   **To ignore the cache:** If you need to force a full refresh of the entire pipeline from the very beginning, change the build mode to **Forced rebuild**.
4.  **Optimizing the Cache:**
    *   You can improve the performance of reading from the cache by changing the storage format.
    *   Open a dataset, go to **Settings**, and change the **Format** from CSV to a columnar format like **Parquet**. This is much faster for downstream analytical recipes to read.

### 4. Resources and Tools
- **The Flow:** The visual representation of your cached pipeline.
- **Build Modes (Smart vs. Forced):** Your control over how the cache is used.
- **Dataset Format Settings:** Your tool for optimizing the cache's performance.

### 5. Next Steps and Progression
- **Clearing the Cache:** To manually clear the cache for a specific dataset, open it, go to the **Actions** menu, and select **Clear data**. The dataset will become empty, and the next job will have to recompute it.
- **Sync Recipe as an Explicit Cache Point:** You can use a **Sync** recipe to create an explicit, major checkpoint in your flow. This is often used to materialize the results of a complex preparation phase before moving on to modeling.

### 6. Common Challenges and Solutions
- **Challenge:** "My job is recomputing the whole flow every time."
- **Solution:** Your scenario's build step is likely set to "Forced rebuild." Change it to "Smart rebuild" to take advantage of the caching.
- **Challenge:** "My colleague changed a recipe, but my flow is still using the old results."
- **Solution:** You need to "pull" their changes from Git and then run a build. Simply pulling the changes doesn't automatically recompute the downstream datasets. You must explicitly run a job to update the cached results.
`,
  },
  {
    id: 387,
    slug: 'partitioning-data-to-speed-up-group-by',
    question: 'How to get started with partitioning data to speed up group-by operations?',
    answer: `
### 1. Introduction/Overview
Partitioning is a powerful technique for managing and processing large datasets, especially time-series data. By splitting a large table into smaller, independent chunks (partitions), you can significantly speed up aggregations because recipes only need to read and process the specific partitions they need, rather than scanning the entire table.

### 2. Prerequisites
- **A large dataset** suitable for partitioning (i.e., it has a date or discrete category column).
- **An aggregation task** (like a Group By) that is running slowly.

### 3. Step-by-Step Instructions
1.  **Partition Your Source Dataset:**
    *   Open your large input dataset.
    *   Go to **Settings > Partitioning**.
    *   Activate partitioning. The most common strategy is to partition by a **time dimension** (e.g., by "Day" or "Month") using a date column.
2.  **Propagate the Partitioning:**
    *   When you build recipes downstream from your partitioned dataset, Dataiku will automatically make the output datasets partitioned as well. Your **Group** recipe should take a partitioned dataset as input and will produce a partitioned output.
3.  **Run the Group By on a Single Partition:**
    *   In your **Group** recipe, the logic remains the same (e.g., group by \`customer_id\`, sum \`sales\`).
    *   However, when you run the job, you can now specify to build only a single partition (e.g., only yesterday's data).
    *   The Group recipe will now only read the data for that single day, perform the aggregation, and write the result to the corresponding output partition. This is dramatically faster than running the aggregation on the entire multi-year dataset.
4.  **Automate Incremental Aggregations:**
    *   Create a **Scenario**.
    *   In the "Build" step, specify to build the **LATEST** partition of your final aggregated dataset.
    *   Schedule this to run daily. Each day, it will perform the Group By operation on only the newest day's worth of data.

### 4. Resources and Tools
- **Dataset Partitioning Settings:** The UI for defining how your data is chunked.
- **Scenario Build Step:** Where you specify which partitions to process.
- **The Job Inspector:** Use this to verify that your job only read and processed the data for a single partition.

### 5. Next Steps and Progression
- **Window Functions on Partitions:** Window functions also benefit enormously from partitioning. A running total can be calculated incrementally, only processing the latest partition and carrying over the last value from the previous one.
- **Partitioning by Category:** You can also partition on a discrete string column, like \`country\`. This would physically separate your data by country, and you could then run a job to process only the data for a specific country.

### 6. Common Challenges and Solutions
- **Challenge:** "My Group By is still slow even with partitions."
- **Solution:** Ensure you are actually running the job on a single partition. If you ask a scenario to build "ALL" partitions, it will still have to process the entire dataset (though it can do it more efficiently). Also, ensure the execution engine is set to **Spark** or **Run on database** for best performance.
- **Challenge:** "How do I get the total aggregation across all time?"
- **Solution:** You have two options. You can run a job that builds "ALL" partitions of your grouped dataset, and then add another Group recipe on top of that (with no group key) to sum up the results from all partitions. Alternatively, you can write a separate, non-partitioned pipeline for calculating global aggregates.
`,
  },
  {
    id: 388,
    slug: 'deleting-obsolete-datasets',
    question: 'How to get started with deleting obsolete datasets to free storage space?',
    answer: `
### 1. Introduction/Overview
As projects evolve, they can accumulate datasets that are temporary, outdated, or no longer used. Deleting these obsolete datasets is good housekeeping. It frees up storage space, reduces clutter in your Flow, and makes the project easier to understand. However, you must do it safely to avoid breaking your pipelines.

### 2. Prerequisites
- **A Dataiku project** that may contain unused datasets.
- **Project administrator rights** to delete objects.

### 3. Step-by-Step Instructions
1.  **Identify a Candidate for Deletion:**
    *   Look for datasets that are at the "end" of a flow—that is, no recipes use them as an input.
    *   Look for old test or debug datasets that were created during development and are no longer needed.
2.  **Perform an Impact Analysis (CRITICAL STEP):**
    *   **Never delete a dataset without checking its dependencies.**
    *   In the Flow, right-click on the dataset you want to delete.
    *   Select **View downstream dependencies**.
3.  **Review the Dependencies:**
    *   A dialog will show you every object (recipe, model, dashboard, webapp) that uses this dataset.
    *   **If this list is empty**, the dataset is truly obsolete and safe to delete.
    *   **If the list is not empty**, you must not delete the dataset, as it will break these downstream processes.
4.  **Delete the Dataset:**
    *   If and only if the downstream dependency check is clear, you can proceed.
    *   Right-click on the dataset and select **Delete**.
    *   A confirmation dialog will appear. It will warn you again if there are any dependencies you missed. Confirm the deletion.
    *   This action removes the dataset from the Flow and deletes its underlying data from storage.

### 4. Resources and Tools
- **"View downstream dependencies" feature:** Your essential safety check.
- **The Delete action:** Available from the right-click context menu.

### 5. Next Steps and Progression
- **Archiving:** If you think you *might* need the data again someday, don't just delete it. First, use an **Export recipe** to save a copy of the data to a long-term archive location (like S3). Then you can safely delete the dataset from the project.
- **Automated Cleanup:** For advanced use cases, you can write a Python scenario that uses the API to periodically scan for and delete datasets that have no dependencies and haven't been rebuilt in a long time.

### 6. Common Challenges and Solutions
- **Challenge:** "I deleted a dataset by mistake. How do I get it back?"
- **Solution:** If your project is integrated with **Git**, you can revert the commit that deleted the dataset. This will restore the dataset's *definition* to the Flow, but the data itself will be gone. You will need to re-run the upstream recipe to rebuild the data. If you don't use Git, you will have to restore the project from a backup.
- **Challenge:** "The delete option is greyed out."
- **Solution:** You do not have sufficient permissions. You must be a project administrator to delete objects.
`,
  },
  {
    id: 389,
    slug: 'comparing-runtime-metrics-across-environments',
    question: 'How to get started with comparing runtime metrics across environments?',
    answer: `
### 1. Introduction/Overview
When you deploy a project from a development environment to a production environment, you should compare its performance to ensure it runs as expected. A significant slowdown in production can indicate a configuration or resource issue. This comparison involves checking the job runtimes in both environments.

### 2. Prerequisites
- **Separate Dataiku instances** for development and production.
- **The same project deployed** on both instances.
- **Access to the "Jobs" menu** on both instances.

### 3. Step-by-Step Instructions
1.  **Run the Job on the Development Instance:**
    *   On your dev instance, run the main scenario for your project.
    *   Go to the **Jobs** menu and find the run.
    *   Record the total duration of the scenario and the duration of the key, long-running recipes. This is your baseline.
2.  **Deploy to Production:**
    *   Export your project from the dev instance as a bundle.
    *   Import the bundle into the production instance, remapping the connections to use the production data sources.
3.  **Run the Job on the Production Instance:**
    *   On the prod instance, run the same main scenario.
    *   Go to the **Jobs** menu and find the run.
    *   Record the durations for the same scenario and recipes.
4.  **Compare the Metrics:**
    *   Create a simple table comparing the runtimes from dev and prod.
    *   **Expected outcome:** The production environment is usually more powerful than the development one, so you might expect the runtimes to be faster.
    *   **Potential problem:** If the production run is significantly *slower*, this is a red flag that needs investigation.

### 4. Resources and Tools
- **The Job Inspector:** Your tool for getting the runtime metrics on both instances.
- **Project Bundles:** The mechanism for moving the project between environments.

### 5. Next Steps and Progression
- **Automated Benchmarking:** You can build this comparison into your CI/CD pipeline. The deployment script could run a test scenario on the prod instance after deployment and then use the Dataiku API to fetch the job duration and compare it against a known baseline.
- **Resource Monitoring:** If you see a performance discrepancy, the next step is to use your cloud provider's monitoring tools to compare the CPU, memory, and I/O utilization of the dev and prod environments during the job run.

### 6. Common Challenges and Solutions
- **Challenge:** "The production run is much slower. Why?"
- **Solution:** There are several possible causes:
    *   **Resource Allocation:** The production Dataiku server or its database/Spark cluster may be under-provisioned compared to the dev environment.
    *   **Configuration Mismatch:** Check that the recipe execution engines are set the same way in both environments. A recipe might be correctly pushed down to the database in dev but accidentally set to run in-memory in prod.
    *   **Data Volume:** Are you running on the same amount of data? The production data might be much larger, which would naturally lead to a longer runtime.
    *   **"Noisy Neighbors":** The production server might be busy running many other jobs at the same time, leading to resource contention.
`,
  },
  {
    id: 390,
    slug: 'tuning-resource-config-of-dss-nodes',
    question: 'How to get started with tuning resource config of DSS nodes for heavy loads?',
    answer: `
### 1. Introduction/Overview
Tuning the resource configuration of Dataiku nodes is an advanced administrative task aimed at optimizing performance, stability, and cost. It involves allocating the right amount of memory and CPU to the different services that make up a Dataiku deployment, especially when handling heavy workloads.

### 2. Prerequisites
- **Administrator access** to the Dataiku instance and its underlying infrastructure (the servers or Kubernetes cluster).
- **A deep understanding of your platform's workload** (e.g., many concurrent users, large in-memory jobs, real-time scoring).
- **Infrastructure monitoring tools** (e.g., Grafana, Datadog).

### 3. Step-by-Step Instructions: Key Tuning Areas

#### 1. The Main Backend Node (Design Node)
- **What it is:** The server that runs the main Dataiku web interface and coordinates jobs.
- **What to tune:** The main parameter is the **Java Heap Size**, which controls the memory available to the main Dataiku process.
- **How (Admin Task):**
    1.  Edit the \`install.ini\` configuration file in the Dataiku installation directory.
    2.  Increase the value for \`dss.jvm.heap.max\`.
- **Caution:** Over-allocating memory here can starve other processes. It's often better to offload heavy work to other nodes rather than scaling up the backend indefinitely.

#### 2. Job Execution Nodes (Execution Recipes)
- **What it is:** The environment where your recipes actually run.
- **How to tune:** The best practice is to use **containerized execution** with Kubernetes.
    1.  In **Administration > Containerized Execution**, an admin defines different container configurations.
    2.  Each configuration can specify different **CPU and Memory requests and limits**. This allows you to create different "t-shirt sizes" for jobs (e.g., a "high-memory" profile for a specific Python recipe).
    3.  Users then select the appropriate profile for their recipe.

#### 3. API Nodes (Real-time Scoring)
- **What it is:** The nodes that serve your deployed real-time models.
- **How to tune:**
    1.  **Vertical Scaling:** Increase the CPU and memory allocated to the API node server or pod.
    2.  **Horizontal Scaling:** This is more common. Increase the **number of replicas** (pods) of the API node to handle more concurrent prediction requests. If using Kubernetes, this can be automated with a Horizontal Pod Autoscaler (HPA).

### 4. Resources and Tools
- **Dataiku's \`install.ini\` file.**
- **The Containerized Execution settings page.**
- **Kubernetes configuration files (YAML).**
- **Infrastructure monitoring tools** to see the actual resource utilization and identify bottlenecks.

### 5. Next Steps and Progression
- **Load Testing:** Before going to production with a critical API, use a load testing tool (like JMeter or Locust) to simulate high traffic and see how the system behaves. Use the results to fine-tune your resource allocation and autoscaling rules.

### 6. Common Challenges and Solutions
- **Challenge:** "My jobs are failing with 'Out of Memory' errors."
- **Solution:** If using containerized execution, you need to increase the memory limit in the container configuration for that job type. If running in-memory on the backend, you may need to increase the Java heap size, but the better solution is to offload the job to a container or a different engine.
- **Challenge:** "How do I know what values to set for CPU and memory?"
- **Solution:** There is no magic number. It requires an iterative process. Start with a reasonable baseline, monitor the actual usage of your jobs and services, and then adjust the requests and limits based on that real-world data.
`,
  },
  {
    id: 391,
    slug: 'using-dataiku-academy',
    question: 'How to get started with using Dataiku Academy’s Visual Recipes free videos?',
    answer: `
### 1. Introduction/Overview
The Dataiku Academy is the official, free online training platform for Dataiku. The "Visual Recipes" courses are specifically designed to help you master the powerful, code-free transformation tools at the heart of the platform. This guide explains how to get the most out of this resource.

### 2. Prerequisites
- **A web browser.**
- **A free Dataiku Academy account.**
- **Access to a Dataiku instance** for hands-on practice (the free online edition is perfect).

### 3. Step-by-Step Instructions
1.  **Register for the Academy:** Go to the Dataiku Academy website and sign up.
2.  **Find the "Core Designer" Learning Path:** This is the foundational learning path for all new users. The courses on visual recipes are a key part of it.
3.  **Find the "Visual Recipes" Courses:** Within the Core Designer path, or by searching the catalog, you will find specific courses on recipes. Key courses to watch include:
    *   **Prepare Recipe Basics:** Covers filtering, formulas, and data cleaning.
    *   **Joining and Stacking Data:** Covers the Join and Stack recipes.
    *   **Grouping and Aggregating Data:** Covers the Group and Pivot recipes.
4.  **Watch the Videos:** The courses are broken down into short, focused videos (usually 2-5 minutes each) that explain a single concept or feature.
5.  **Do the Hands-On Tutorials (Most Important Step):**
    *   After each video, there is a hands-on tutorial.
    *   **Download the provided starting project** and upload it to your own Dataiku instance.
    *   Follow the tutorial's step-by-step instructions to replicate what was shown in the video. This active learning is crucial for building real skills.
6.  **Take the Quizzes:** Test your understanding with the short quizzes at the end of each course.

### 4. Resources and Tools
- **Dataiku Academy:** The learning platform itself.
- **Learning Paths:** Structured curricula to guide your learning.
- **Hands-on Tutorials:** The practical exercises that turn knowledge into skill.
- **A Sandbox Dataiku Instance:** Your personal environment for doing the tutorials.

### 5. Next Steps and Progression
- **Get Certified:** Completing the Core Designer learning path prepares you for the **Core Designer Certification exam**, which is a great way to formally validate your skills.
- **Explore Advanced Recipes:** After mastering the basics, explore the Academy's content on more advanced visual recipes like Window, Fuzzy Join, and the text analysis recipes.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm just watching the videos, but I'm not retaining the information."
- **Solution:** You must do the hands-on tutorials. Passive learning by watching is not effective. You need to actively use the recipes and click the buttons yourself for the knowledge to stick.
- **Challenge:** "I'm stuck on a tutorial step."
- **Solution:** First, re-watch the preceding video carefully. It almost always explains the concept needed for the tutorial. If you're still stuck, you can ask for help on the Dataiku Community forums, mentioning the specific Academy course and tutorial you are working on.
`,
  },
  {
    id: 392,
    slug: 'browsing-dataikus-knowledge-base',
    question: 'How to get started with browsing Dataiku’s Knowledge Base for specific feature issues?',
    answer: `
### 1. Introduction/Overview
The Dataiku Knowledge Base is a part of the official documentation that contains practical, "how-to" articles, tutorials, and solutions to common problems. It's a valuable resource for troubleshooting specific issues or learning how to implement a particular feature.

### 2. Prerequisites
- **A specific question or problem** you are trying to solve in Dataiku.
- **A web browser.**

### 3. Step-by-Step Instructions
1.  **Access the Documentation:** Navigate to the official Dataiku documentation website.
2.  **Use the Search Bar:** This is the most effective way to use the Knowledge Base.
    *   Enter specific keywords related to your issue.
    *   **Bad Search:** "join"
    *   **Good Search:** "fuzzy join address data" or "error out of memory python recipe"
3.  **Filter for Knowledge Base Articles:** The search results will include content from the reference manual, developer guides, and the Knowledge Base. You can often filter the results to show only articles from the Knowledge Base.
4.  **Read the Article:** Knowledge Base articles are typically structured as a problem/solution or a step-by-step guide. They often include screenshots and code snippets.
5.  **Apply the Solution:** Use the information from the article to solve your problem in your Dataiku project.

### 4. Resources and Tools
- **The Official Dataiku Documentation Website.**
- **The Search Bar:** Your primary tool for finding relevant articles.

### 5. Next Steps and Progression
- **Browse by Topic:** If you don't have a specific problem, you can also browse the Knowledge Base by category (e.g., "Data Preparation," "Machine Learning") to discover new tips and techniques.
- **Combine with the Community Forum:** If you can't find a solution in the Knowledge Base, the next step is to search the Dataiku Community forum. If you still can't find an answer, you can post a new question, and you might even reference the Knowledge Base article you already read.

### 6. Common Challenges and Solutions
- **Challenge:** "The solution in the article is for an older version of Dataiku."
- **Solution:** The documentation is versioned. Make sure you are viewing the documentation that corresponds to the version of Dataiku you are using. There is usually a version selector at the top of the page. While the core concepts often remain the same, UI elements and specific features can change between versions.
- **Challenge:** "I can't find an article about my specific, niche problem."
- **Solution:** The Knowledge Base covers common issues. For very specific or new problems, it's possible nobody has written an article about it yet. This is the perfect time to turn to the **Dataiku Community forum** to ask your question. Your question and its eventual solution may become the basis for a future Knowledge Base article.
`,
  },
  {
    id: 393,
    slug: 'posting-questions-in-dataiku-community-forum',
    question: 'How to get started with posting questions and search in Dataiku Community forum?',
    answer: `
### 1. Introduction/Overview
The Dataiku Community forum is a public platform where you can get help from other Dataiku users, partners, and employees. Learning how to use it effectively—by searching first and then asking good questions—is a key skill for any Dataiku developer.

### 2. Prerequisites
- **A specific, well-defined question or problem.**
- **A free Dataiku Community account.**

### 3. Step-by-Step Instructions

#### 1. Search First!
- **Before you post, always search.** It is very likely someone has had the same problem before.
- Use the search bar with specific keywords from your error message or the feature you are using.
- Reading an existing answer is the fastest way to solve your problem.

#### 2. How to Ask a Good Question
If you can't find an answer, post a new question. To get a good answer, you must ask a good question.
1.  **Choose a Clear, Descriptive Title:**
    *   **Bad:** "Help with recipe"
    *   **Good:** "How can I fix a \`KeyError\` in a Python recipe when processing JSON?"
2.  **Provide Context:** In the body of your post, explain:
    *   **What are you trying to achieve?** (Your high-level goal).
    *   **What have you already tried?** (Shows you've made an effort).
3.  **Include Specific Details:**
    *   **The full error message:** Copy and paste the entire traceback from the job log.
    *   **Screenshots:** A screenshot of your recipe's configuration is incredibly helpful.
    *   **Code Snippets:** If it's a code recipe, include the relevant parts of your code. Use the code formatting tools in the forum editor.
    *   **Anonymize your data:** Make sure your screenshots and code do not contain any sensitive company or personal information.
4.  **Be Courteous:** Remember that people are helping you for free. Be polite and thank them for their time.

### 4. Resources and Tools
- **The Community Forum Website.**
- **The Search Bar:** Your most important tool.
- **Code Formatting Tools:** To make your posts readable.

### 5. Next Steps and Progression
- **Accept an Answer:** If someone provides a solution that works, click the "Accept Solution" button. This helps future users with the same problem quickly find the correct answer.
- **Give Back:** As you gain experience, start answering questions yourself. This is a great way to solidify your knowledge and build your reputation in the community.

### 6. Common Challenges and Solutions
- **Challenge:** "I posted a question but didn't get a response."
- **Solution:** Your question was probably not clear enough. Go back and edit it. Can you add more details? Can you provide a screenshot or a code sample? The more information you provide, the more likely you are to get a helpful answer.
- **Challenge:** "I'm a beginner, and I'm afraid to ask a 'stupid' question."
- **Solution:** There are no stupid questions. The community is very welcoming to new users. It's perfectly fine to state that you are a beginner, as it helps others tailor their answers to your level.
`,
  },
  {
    id: 394,
    slug: 'testing-sample-projects',
    question: 'How to get started with testing sample projects to understand layout and flow?',
    answer: `
### 1. Introduction/Overview
Dataiku provides a set of pre-built sample projects that are designed to showcase best practices and demonstrate how to solve common business problems. Exploring and deconstructing these sample projects is one of the most effective ways to learn how a professional, well-structured Dataiku project should be built.

### 2. Prerequisites
- **Access to a Dataiku instance.**

### 3. Step-by-Step Instructions
1.  **Create a Project from a Sample:**
    *   From the Dataiku homepage, click **+ NEW PROJECT**.
    *   Select the **Sample projects / Tutorials** tab.
    *   Choose a sample that interests you. The **Customer Churn Prediction** project is an excellent, comprehensive example. Click **CREATE**.
2.  **Explore the Flow:**
    *   Open the newly created project and go to the **Flow**.
    *   **Observe the organization:** Notice the use of **Flow Zones** to group the pipeline into logical stages (\`Data preparation\`, \`Feature Engineering\`, etc.). This is a key best practice.
    *   **Trace the lineage:** Follow the data from the raw input datasets on the left to the final outputs on the right.
3.  **Deconstruct the Recipes:**
    *   Open some of the recipes to see how they are configured.
    *   Look at the **Prepare** recipes to see the sequence of data cleaning steps.
    *   Look at the **Join** and **Group** recipes to understand how the data is blended and aggregated.
4.  **Run the Pipeline:**
    *   Go to the **Jobs** menu or simply build the final datasets. Watch how Dataiku executes the entire dependency graph.
    *   This helps you understand how the different parts of the flow connect and run in the correct order.
5.  **Review the Outputs:**
    *   Explore the final datasets.
    *   Go to the **Dashboards** section to see how the project's results are presented to business stakeholders.

### 4. Resources and Tools
- **The Sample Projects library** within Dataiku.
- **The Project Wiki:** The sample projects are usually well-documented, with a Wiki that explains the project's goals and methods.

### 5. Next Steps and Progression
- **Modify and Experiment:** This is your own copy of the project, so don't be afraid to change it. Try adding a new step to a recipe, changing a parameter, or building a new chart. See how your changes affect the outcome.
- **Rebuild from Scratch:** For a true test of your understanding, try to rebuild the entire sample project yourself in a new, blank project. This forces you to understand every single step.

### 6. Common Challenges and Solutions
- **Challenge:** "The sample project is huge and overwhelming."
- **Solution:** Don't try to understand it all at once. Focus on one part at a time. Start with the first Flow Zone, "Data Ingestion," and make sure you understand every dataset and recipe in that zone before moving on to the next.
- **Challenge:** "When I run a scenario, it fails."
- **Solution:** This can occasionally happen if the sample project has dependencies that are not perfectly compatible with your Dataiku instance's version. This is a good learning opportunity. Open the job log, find the error message, and try to debug it just as you would with a real project.
`,
  },
  {
    id: 395,
    slug: 'experimenting-in-free-edition',
    question: 'How to get started with experimenting in a trial or free edition environment?',
    answer: `
### 1. Introduction/Overview
A "sandbox" is a safe environment for learning and experimentation where you don't have to worry about breaking anything important. Using a free edition of Dataiku as a personal sandbox is the single best way to build hands-on skills and explore the platform's capabilities without any risk.

### 2. Prerequisites
- **Access to a free edition:** This can be **Dataiku Online** (cloud-based) or a local installation of the **Free Edition**.

### 3. Step-by-Step Instructions: A Sandbox Mindset
1.  **Embrace Freedom and Curiosity:**
    *   The goal of a sandbox is to play. Don't be afraid to click every button and try every recipe. If you break something, you can just delete the project and start over. This freedom is essential for learning.
2.  **Follow Along with Tutorials:**
    *   Use your sandbox to do the hands-on exercises from the **Dataiku Academy**. This active learning is much more effective than just watching videos.
3.  **Start a Personal Project:**
    *   This is the best way to learn. Find a public dataset that interests you (e.g., about movies, sports, or a social topic).
    *   Define a question you want to answer and try to build a project from start to finish. For example, "Can I analyze this dataset of video game sales to see which genre is most popular?".
4.  **Test the Limits:**
    *   Try to do things you haven't done before. Can you connect to a public API? Can you build a webapp? Can you use a text analysis recipe? The sandbox is the place to try.
5.  **Replicate and Debug:**
    *   If you encounter a problem in a real work project, try to create a small, simplified version of the problem in your sandbox using dummy data. This allows you to debug and test solutions in isolation before applying them to your production pipeline.

### 4. Resources and Tools
- **Dataiku Online Free Edition:** The easiest way to get a personal, cloud-hosted sandbox.
- **Public Data Sources:** Websites like Kaggle, Awesome Public Datasets on GitHub, or data.gov are great sources of data for your personal projects.

### 5. Next Steps and Progression
- **Build a Portfolio:** The projects you build in your sandbox can become a personal portfolio to showcase your skills.
- **Test New Features:** When a new version of Dataiku is released, use your sandbox to try out the new features before they are available in your company's production environment.

### 6. Common Challenges and Solutions
- **Challenge:** "The free edition has limitations."
- **Solution:** Yes, free editions have limitations on project size, data volume, and some enterprise features. However, they contain all the core functionality you need to learn 95% of the platform's capabilities. The limitations force you to learn to work with samples of data, which is a good practice anyway.
- **Challenge:** "I don't know what kind of project to work on."
- **Solution:** Pick a topic you are personally passionate about. Your natural curiosity will drive your learning more effectively than any assigned task.
`,
  },
  {
    id: 396,
    slug: 'following-dataiku-tips-and-tricks',
    question: 'How to get started with following top tips & tricks emails from Dataiku?',
    answer: `
### 1. Introduction/Overview
Staying current with a rapidly evolving platform like Dataiku can be a challenge. Following official channels for tips, tricks, and feature updates is an easy and effective way to continuously improve your skills and learn about new, more efficient ways to work.

### 2. Prerequisites
- **A desire to continuously learn.**
- **An email address and a web browser.**

### 3. Step-by-Step Instructions: Your Information Sources
1.  **Subscribe to the Dataiku Newsletter and Blog:**
    *   Go to the official Dataiku website. They will have a blog and a newsletter you can subscribe to.
    *   The blog often features articles that do a deep dive on specific features or showcase interesting use cases from which you can learn new techniques.
2.  **Read the Release Notes:**
    *   This is the most important source. With every major version update, Dataiku publishes detailed release notes.
    *   When your company updates its Dataiku instance, take 30 minutes to scan the release notes. You will discover new features, new recipe processors, and performance improvements that you can start using immediately.
3.  **Be Active on the Dataiku Community:**
    *   Make it a habit to browse the Dataiku Community forum once a week.
    *   You will see the real-world problems other users are facing and the creative solutions they come up with. This is a great source of practical tips and tricks.
4.  **Follow Dataiku on Social Media:**
    *   Follow Dataiku on platforms like LinkedIn. They often post short videos, tips, and links to useful articles.

### 4. Resources and Tools
- **The Dataiku Website:** For the blog and newsletter.
- **The Official Documentation:** For the release notes.
- **The Dataiku Community Forum.**

### 5. Next Steps and Progression
- **Try it Yourself:** When you read about a new trick or feature, don't just file it away. Go to your sandbox project and try it out immediately. The hands-on practice is what makes the knowledge stick.
- **Share What You Learn:** If you learn a cool new trick, share it with your team. You can do this in a team chat, or by doing a short demo in a team meeting.

### 6. Common Challenges and Solutions
- **Challenge:** "It's too much information to keep up with."
- **Solution:** You don't have to read every single article in detail. Develop a habit of quickly scanning the headlines and titles. If something looks particularly relevant to a problem you are currently facing, then you can do a deep dive on that specific article.
- **Challenge:** "The tip is for a newer version of Dataiku than what my company uses."
- **Solution:** This is still useful! It gives you a preview of what's coming. You can use this knowledge to build a business case for why your company should upgrade to the latest version.
`,
  },
  {
    id: 397,
    slug: 'leveraging-mentor-or-peer-reviews',
    question: 'How to get started with leveraging mentor or peer reviews on beginner projects?',
    answer: `
### 1. Introduction/Overview
One of the fastest ways to accelerate your learning is to get feedback on your work from a more experienced peer or mentor. A review is not a test; it's a collaborative process designed to catch errors, share knowledge, and ensure that best practices are being followed.

### 2. Prerequisites
- **A completed piece of work** (e.g., a Dataiku flow, a Python recipe).
- **A mentor or peer** who is willing to review your work.
- **A mindset that is open to constructive feedback.**

### 3. Step-by-Step Instructions
1.  **Prepare for the Review:**
    *   Before you ask for a review, review your own work first.
    *   Ensure it is clean, well-organized, and documented. Add descriptions to your recipes. This shows respect for your reviewer's time.
2.  **Ask for a Review:**
    *   Reach out to your mentor or a senior teammate. Be specific in your request.
    *   **Bad request:** "Can you look at my project?"
    *   **Good request:** "I've finished the first version of the customer preparation flow. Could you please take 20 minutes to review my Prepare recipe and let me know if I'm following our team's best practices?"
3.  **Use the Right Tools for the Review:**
    *   **For Visual Flows:** A live screen-sharing session is often best. You can walk your reviewer through the flow and they can provide feedback in real-time.
    *   **For Code:** The best practice is to use a **Pull Request (PR)** if your project is on Git. This allows the reviewer to see your exact changes and leave comments on specific lines of code.
4.  **Receive the Feedback Gracefully:**
    *   Remember that feedback is about the work, not about you. Its purpose is to help you improve.
    *   Listen carefully. Ask clarifying questions. Thank the reviewer for their time and insights.
5.  **Act on the Feedback:**
    *   The review is only useful if you act on the suggestions. Go back to your project and make the recommended changes. This is how you learn and grow.

### 4. Resources and Tools
- **Git and Pull Requests:** The industry standard for formal code reviews.
- **Screen-sharing tools (Zoom, Teams):** For interactive reviews of visual flows.
- **A team culture** that values collaboration and feedback.

### 5. Next Steps and Progression
- **Become a Reviewer:** As you become more experienced, you should start reviewing the work of other junior team members. Teaching is the best way to solidify your own knowledge.
- **Review Checklists:** Your team can create a simple checklist for reviews to ensure that key things (like documentation, naming conventions, and error handling) are checked every time.

### 6. Common Challenges and Solutions
- **Challenge:** "I'm afraid my work will be heavily criticized."
- **Solution:** A good mentor provides constructive feedback, not destructive criticism. If you feel the feedback is unfair or personal, you should speak with your team lead. However, most of the time, the feedback is well-intentioned. Try to see it as a valuable learning opportunity.
- **Challenge:** "My senior teammates are too busy to review my work."
- **Solution:** This is a management and process issue. Code/flow reviews should be considered a mandatory part of the development process for any critical project. Talk to your team lead about how to formally build review time into your project planning.
`,
  },
  {
    id: 398,
    slug: 'building-reusable-personal-template-flows',
    question: 'How to get started with building reusable personal template flows for practice?',
    answer: `
### 1. Introduction/Overview
As you build more projects in Dataiku, you will notice that you often repeat the same structural patterns. Creating a personal "template" project allows you to capture these best practices. You can then duplicate this template to kickstart any new project, saving time and ensuring consistency.

### 2. Prerequisites
- **Experience with building a few Dataiku projects.**
- **A sandbox Dataiku instance.**

### 3. Step-by-Step Instructions
1.  **Identify Your Common Patterns:**
    *   Look back at the projects you've built. What are the common elements?
    *   This often includes a standard set of **Flow Zones**, a consistent **naming convention**, and a set of common utility **Python functions**.
2.  **Create a New "Template" Project:**
    *   In your sandbox, create a new, blank project. Name it something like \`TEMPLATE - Standard Analytics Project\`.
3.  **Build the Reusable Structure:**
    *   **Flow Zones:** In the Flow, create your standard zone structure (e.g., \`1_Ingestion\`, \`2_Preparation\`, \`3_Analysis\`, \`4_Outputs\`). Leave them empty.
    *   **Wiki:** In the Wiki, create placeholder pages for your standard documentation, like "Project Brief," "Data Dictionary," and "Meeting Notes."
    *   **Code Library:** If you have common Python helper functions (e.g., for cleaning specific data types), add them to the project's **Library**.
    *   **Scenarios:** You could include template scenarios for common tasks, like "Build All" or "Run Quality Checks."
4.  **Keep it Clean:** The template project should not contain any actual data or project-specific logic. It is just the empty, well-organized shell.
5.  **Use the Template:**
    *   When you need to start a new project, instead of creating a blank one, find your template project.
    *   Click the **...** menu and choose **Duplicate project**.
    *   Give the new project a name. You now have a new project that already has your best-practice structure built in.

### 4. Resources and Tools
- **The "Duplicate project" feature:** The key to using your template.
- **Flow Zones, Wiki, and Libraries:** The components that make up a good template.

### 5. Next Steps and Progression
- **Team Templates:** Share your personal template with your team. You can collaborate to create a single, shared team template that everyone uses. This is a powerful way to enforce consistency and best practices across an entire organization.
- **Specialized Templates:** You could create different templates for different types of projects, for example, a "Template - ML Project" that includes zones for feature engineering and modeling, and a "Template - Reporting Project" that is focused on data prep and dashboards.

### 6. Common Challenges and Solutions
- **Challenge:** "My template is becoming too complex and specific."
- **Solution:** A template should be generic. It should provide the structure, not the specific implementation. If you find yourself adding project-specific recipes to your template, you are probably making it too specialized.
- **Challenge:** "How do I update the template?"
- **Solution:** Your template should be a living project. As your team develops new best practices, you should update the template project to reflect them.
`,
  },
  {
    id: 399,
    slug: 'debugging-stuck-steps-by-cleaning-recipe-caches',
    question: 'How to get started with debugging stuck steps by cleaning recipe caches?',
    answer: `
### 1. Introduction/Overview
Sometimes, a job in Dataiku can get "stuck" or fail in a strange way. A potential cause can be a corrupted or inconsistent cache for an intermediate dataset. Forcing Dataiku to re-run a recipe from scratch by clearing its output cache can often resolve these issues.

### 2. Prerequisites
- **A Dataiku job** that is failing or behaving unexpectedly.
- **A hypothesis** that the issue might be with a cached intermediate result.

### 3. Step-by-Step Instructions
1.  **Identify the Suspect Dataset:**
    *   Look at your flow and the job log. Identify the output dataset of the recipe that seems to be causing the problem.
2.  **Navigate to the Dataset:** In the Flow, click on the suspect dataset to open it.
3.  **Find the "Clear data" Action:**
    *   In the top right corner of the dataset view, click on the **Actions** menu.
    *   Select the option **Clear data**.
4.  **Confirm the Action:**
    *   A dialog will appear, warning you that this will delete the data associated with this dataset.
    *   Confirm the action. The dataset icon in the Flow will now often change to indicate that it is "empty".
5.  **Rerun the Upstream Recipe:**
    *   Now, you must re-run the recipe that produces this cleared dataset.
    *   You can do this by selecting the dataset and clicking the **Build** button.
    *   Dataiku will now re-execute the parent recipe from scratch, creating a fresh version of the data.
6.  **Rerun the Downstream Failing Job:** After the upstream data has been rebuilt, try running the original job that was failing. The fresh cache may have resolved the issue.

### 4. Resources and Tools
- **The "Clear data" Action:** The primary tool for clearing a dataset's cache.
- **The "Build" Action:** The tool for re-populating the cache.

### 5. Next Steps and Progression
- **Forced Rebuild:** A more comprehensive way to ignore all caches is to run a job with the **Forced rebuild** mode. This tells Dataiku to rerun every single recipe in the pipeline from the very beginning, ignoring all intermediate cached results. This is often a good step when debugging complex dependency issues.

### 6. Common Challenges and Solutions
- **Challenge:** "When should I use this?"
- **Solution:** This is a debugging technique, not a standard operation. You should use it when you suspect that the state of an intermediate dataset is the cause of a problem. For example, if a job failed halfway through writing to a dataset, the output might be in a corrupted, partial state. Clearing it ensures you start fresh.
- **Challenge:** "I cleared the data, but the job still fails."
- **Solution:** This means the cache was not the root cause of the problem. The issue is likely a persistent bug in your recipe logic or an issue with the source data. You need to continue with standard debugging techniques, like reading the job log and inspecting the data.
`,
  },
  {
    id: 400,
    slug: 'tracking-common-issues-to-build-troubleshooting-checklist',
    question: 'How to get started with tracking your common issues to build your troubleshooting checklist?',
    answer: `
### 1. Introduction/Overview
As you gain experience with Dataiku, you will encounter and solve the same types of problems repeatedly. Building a personal troubleshooting checklist or "cookbook" is a powerful way to accelerate your own debugging process and to help onboard new team members.

### 2. Prerequisites
- **Experience with solving at least a few problems** in Dataiku.
- **A place to store your checklist** (e.g., a personal Wiki page, a text file, a tool like Notion or OneNote).

### 3. Step-by-Step Instructions
1.  **Start a New Document:** Create your checklist document. Give it a clear title like "My Dataiku Troubleshooting Guide".
2.  **Adopt a Problem/Solution Format:** For each issue you encounter and solve, add a new entry to your checklist. A good format is:
    *   **Problem/Error Message:** Briefly describe the symptom or paste the specific error message.
    *   **Common Causes:** List the one or two most likely root causes for this error.
    *   **Resolution Steps:** Write down the exact steps you took to fix it.
3.  **Start Populating Your Checklist:** Think back to the last few problems you solved.
    *   **Example Entry 1:**
        *   **Problem:** Python recipe fails with \`ModuleNotFoundError\`.
        *   **Causes:** The required package is not in the code environment, or the recipe is not using the correct environment.
        *   **Resolution:** Check the recipe's "Advanced" settings. Go to "Administration > Code Envs" and add the missing package.
    *   **Example Entry 2:**
        *   **Problem:** A join produces duplicate rows.
        *   **Causes:** The join key is not unique in the right-hand dataset.
        *   **Resolution:** Add a "Group" recipe before the join to deduplicate the right-hand table on the key.
    *   **Example Entry 3:**
        *   **Problem:** A scenario didn't run at its scheduled time.
        *   **Causes:** The scenario's master toggle or the trigger's toggle was turned off.
        *   **Resolution:** Open the scenario and check that both switches are enabled.
4.  **Make it a Habit:** Every time you solve a new or interesting problem, take five minutes to add it to your checklist while the solution is fresh in your mind.

### 4. Resources and Tools
- **A personal note-taking tool** or a page in your project's Wiki.
- **Your own experience and memory.**

### 5. Next Steps and Progression
- **Share with Your Team:** Your personal checklist can become the foundation for a team-wide troubleshooting guide. Create a shared Wiki page where everyone on the team can contribute their own solutions.
- **Categorize the Checklist:** As your list grows, organize it into categories (e.g., "Python Recipe Errors," "Scenario Failures," "Performance Issues") to make it easier to find what you're looking for.

### 6. Common Challenges and Solutions
- **Challenge:** "I forget to write things down."
- **Solution:** This is a discipline. Try to make it part of your "definition of done" for fixing a bug. The task isn't truly complete until you've documented the solution.
- **Challenge:** "This seems like extra work."
- **Solution:** It is a small investment of time that will pay huge dividends. The next time you encounter the same error six months later, you won't have to waste time re-discovering the solution. You can just look it up in your own guide.
`,
  },
];

export const getQuestionBySlug = (slug: string): Question | undefined => {
  return questions.find(q => q.slug === slug);
}

export const getQuestionById = (id: number): Question | undefined => {
  return questions.find(q => q.id === id);
}
