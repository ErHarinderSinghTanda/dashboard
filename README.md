E-commerce Product Dashboard

Overview --

This is a product dashboard application built using React and React-Bootstrap. It allows users to view and filter a list of products from a mock API (https://fakestoreapi.com/products) with features like sorting by price, filtering by category and rating, and viewing product details in a modal.

Features -- 

Product Listing: Displays a list of products fetched from an external API.
Filters: Filter products by category, price range, and rating.
Sorting: Sort products by price (low to high or high to low).
Pagination/Load More: Show more products as the user clicks "Load More".
Product Details Modal: Display detailed information about a product when the user clicks the "View Details" button.

Design Decisions & Patterns -- 

1. Component-Based Architecture
The app follows a modular, component-based design where each part of the application is encapsulated in a functional component.
ProductDashboard is the main component that manages state and handles data fetching, filtering, sorting, and pagination.
2. State Management
React's useState and useEffect hooks are used for managing local component states like products, filters, loading states, and errors.
The filteredProducts state dynamically updates based on applied filters and sorting criteria.
3. Data Fetching
Axios is used to make HTTP requests to the external API. The loadProducts function is responsible for fetching and storing the product data in state.
The useEffect hook is used to trigger the loading of products when the component mounts and re-applies filters and sorting whenever the relevant states change.
4. Filtering & Sorting
Filters are applied to products based on the category, priceRange, and rating values in the filters state.
Sorting is achieved by comparing the prices of products and using JavaScript’s sort() method to rearrange the list.
5. Lazy Loading & Pagination
Load More Button: Initially, only 10 products are displayed, and additional products are loaded in batches when the user clicks the "Load More" button.
Lazy Loading: The product images are loaded lazily to improve performance.
6. Responsive Design
The layout uses Bootstrap's grid system, ensuring that the application is responsive across various screen sizes.
The product cards adjust based on the screen width, and forms are well-aligned for a seamless experience.
7. Modal for Product Details
A modal component from React-Bootstrap is used to display product details when the user clicks the "View Details" button. It enhances the user experience by showing more information without navigating away from the current page.

Optimizations --

Error Handling: Proper error messages are displayed if the data fails to load from the API.
Debouncing Filters: To optimize performance, debounce techniques could be applied for filter changes to avoid re-rendering on every keystroke.
Pagination Enhancement: If the data size were larger, implementing proper pagination (with page numbers) instead of "Load More" could help improve performance.
Image Optimization: The images are set to lazy-load (loading="lazy") to reduce the initial page load time.

Known Limitations -- 

Static Product Data: The product data is mocked using an external API (https://fakestoreapi.com/products). In a real-world application, this would be replaced by dynamic data from a backend or database.
No User Authentication: There is no authentication or user management system implemented, which would be required for user-specific features (like saving favorite products or adding items to a cart).
Limited Filter Options: The filters only apply basic criteria like category, price, and rating. Additional filters (e.g., brand, availability) could be added for a more refined experience.
No Server-Side Filtering/Sorting: All filtering and sorting are done on the client side. For large datasets, it is better to apply these operations on the server side to avoid performance issues.

Potential Enhancements (Future Work) -- 

User Authentication and Cart System:

Implement login/logout functionality with a cart system where users can add products and check out.
Advanced Search and Filter Options:

Expand filter options to allow multi-criteria filtering (e.g., by brand, size, color, etc.).
API Integration for Real Data:

Replace the mock API with a real product API or integrate a backend system with a database for dynamic content.
Performance Enhancements:

Implement pagination or infinite scrolling to further enhance the user experience and optimize performance when displaying a large number of products.
Responsive Modal Layout:

Improve the modal's responsiveness for smaller screen sizes, ensuring that users can view product details easily on mobile devices.

Technologies Used -- 

React for the front-end framework.
React-Bootstrap for UI components and grid layout.
Axios for HTTP requests to fetch product data from the external API.
Bootstrap for styling and responsiveness.


How to Run Locally -- 

1 - Clone the repository.
2 - Navigate to the project folder and run:

npm install
npm start
Open http://localhost:3000 in your browser to view the app.