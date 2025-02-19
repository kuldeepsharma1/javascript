### Exercise 1: DOM Manipulation - Change Text Content
- **Objective**: Change the text of an HTML element with ID `greeting` to "Hello, World!" when a button is clicked.
- **Hint**: Use `document.getElementById()` and `.textContent`.

### Exercise 2: Event Handling - Color Changer
- **Objective**: Create a button that changes the background color of the page to a random color when clicked.
- **Hint**: Utilize `Math.random()` for color generation and `.style.backgroundColor`.

### Exercise 3: Asynchronous JavaScript - Fetch API
- **Objective**: Fetch data from a public API (like `https://api.github.com/users/octocat`) and display the user's name and bio in the page.
- **Hint**: Use `fetch()` with `.then()` for handling promises.

### Exercise 4: Local Storage - To-Do List
- **Objective**: Build a simple to-do list where tasks can be added, and saved in local storage. Tasks should persist across page reloads.
- **Hint**: Use `localStorage.setItem()` and `localStorage.getItem()`.

### Exercise 5: Functions and Scope - Currency Converter
- **Objective**: Create a function that converts USD to EUR using a fixed exchange rate. Use closure to maintain the exchange rate within the function.
- **Hint**: Define the exchange rate inside another function.

### Exercise 6: Array Manipulation - Filtering
- **Objective**: Given an array of numbers, filter out numbers less than 10 using JavaScript's `filter()` method and display the result.
- **Hint**: Use `.filter()` to create a new array.

### Exercise 7: Event Delegation - Dynamic Content
- **Objective**: Add event listeners to dynamically added list items. Clicking an item should alert its text content.
- **Hint**: Attach one event listener to the parent element and check `event.target`.

### Exercise 8: Error Handling - API Request
- **Objective**: Fetch data from a non-existent API endpoint and handle the error gracefully by showing a message to the user.
- **Hint**: Use `.catch()` to manage errors.

### Exercise 9: Form Handling - Validation
- **Objective**: Create a form with an email input. Validate the email using a simple regex and alert if it's not valid when the form is submitted.
- **Hint**: Use `.match()` with a regex for email validation.

### Exercise 10: DOM Traversal - Nested Elements
- **Objective**: Given an HTML structure with nested `div` elements, find and highlight the innermost `div` element when a button is clicked.
- **Hint**: Use methods like `.children`, `.firstElementChild`, or `.querySelector()` with CSS selectors to navigate down the tree.

For each exercise, you should:

- Write HTML to structure the content or interface.
- Use CSS if necessary for styling.
- Implement JavaScript to handle the logic according to the exercise's objective.

Remember to test your code in a browser environment where you can see the results of your DOM manipulation and event handling. If you need to test API calls, consider using mock data or a browser's network tab to simulate responses for quick testing.