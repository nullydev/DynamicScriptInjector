# **Dynamic Script Injector**

The Dynamic Script Injector is a Node.js application built using the Express.js framework that allows you to dynamically fetch and inject external JavaScript files into your web application. It also includes a custom 404 error page for enhanced user experience.

## **Features**

- Fetches external JavaScript files using Axios.
- Injects the fetched JavaScript content into your application's response.
- Handles 404 errors gracefully with a custom error page.

## **Getting Started**

To use this project, follow these steps:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/nullydev/dynamic-script-injector.git
    ```
2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Start the server:
    ```bash
    node index.js
    npm install
    ```
4. Access the application by navigating to **'http://localhost:3000'** in your web browser.

## **Usage**
To dynamically fetch and inject an external JavaScript file, make a GET request to the root endpoint with the src query parameter containing the URL of the JavaScript file you want to fetch and inject. For example:
```
http://localhost:3000/?src=https://example.com/external-script.js
```

## **Error Handling**
The application includes a custom 404 error page with a CSS-based animated text effect. This error page is displayed when:
- The specified external script URL is invalid.
- The external script cannot be fetched.
- Any other errors occur during the process.

## **Dependencies**
- <u>**Express.js**</u>: Fast, unopinionated, minimalist web framework for Node.js.
- <u>**Axios**</u>: Promise-based HTTP client for the browser and Node.js.