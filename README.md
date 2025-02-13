# 99Tech Code Challenge #1  

## Problem 1: Sum Calculation Approaches  

In this problem, I implemented three different methods to calculate the sum of numbers from 1 to *n*:  

1. **Looping from 1 to *n***  
   - **Time Complexity:** 𝑂(𝑛)  
   - **Space Complexity:** O(1)  

2. **Using the *n*-th triangular number formula (Recommended)**  
   - **Time Complexity:** 𝑂(1)  
   - **Space Complexity:** O(1)  

3. **Using Recursion**  
   - **Time Complexity:** 𝑂(𝑛)  
   - **Space Complexity:** O(n)  

## Problem 2: Areas for Improvement  

Due to time constraints, there are some areas that could be further optimized:  

- **Dropdown search functionality**: Implementing a search feature to filter currencies dynamically.  
- **API factory pattern**: Improving code structure by centralizing API calls for better maintainability.  
- **State management setup (e.g., Redux)**: Useful for managing complex state in larger applications.  

### How to Run Problem 2  

To set up and run Problem 2, follow these steps:  

1. **Clone the repository**  
   ```sh  
   cd src/problem_2/fancy-form
   ```  

2. **Install dependencies**  
   ```sh  
   yarn install  
   ```  

3. **Start the development server**  
   ```sh  
   yarn dev  
   ```  

4. **Access the application**  
   - Open [http://localhost:3000](http://localhost:3000) in your browser.  

## Problem 3: Solution Explanation  

### Overview  
In this problem, the goal was to optimize and correct a React functional component that processes wallet balances. The component:  
- Fetches wallet balances and cryptocurrency prices.  
- Filters and sorts balances based on predefined blockchain priority rules.  
- Formats and renders the wallet balance data in a UI component.  

### Issues Identified & Solutions  

#### 1. Incorrect Filtering Logic  
- **Issue:** The condition referenced an undefined variable (`lhsPriority`), causing a runtime error.  
- **Solution:** Used `balancePriority` instead to ensure proper filtering of balances based on blockchain priority.  

#### 2. Inefficient Sorting Logic  
- **Issue:** Sorting was performed every time `balances` or `prices` changed, even though `prices` were not used in sorting.  
- **Solution:** Optimized `useMemo` dependencies to only trigger when `balances` change, reducing unnecessary sorting.  

#### 3. Incorrect Type Usage in Mapping  
- **Issue:** `sortedBalances` contained `WalletBalance`, but it was mapped as `FormattedWalletBalance`, leading to type errors.  
- **Solution:** Introduced a transformation step before rendering to correctly convert `WalletBalance` to `FormattedWalletBalance`.  

#### 4. Hardcoded Priority Values  
- **Issue:** Used a `switch-case` statement, making it difficult to maintain.  
- **Solution:** Replaced with a TypeScript `enum`, improving readability and maintainability.  

#### 5. Unnecessary Intermediate Computation (`formattedBalances`)  
- **Issue:** A separate mapping step was used just to add a formatted amount, which was redundant.  
- **Solution:** Integrated the formatting directly within the `map` function when rendering `WalletRow`.  
