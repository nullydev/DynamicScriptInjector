# **Dynamic Script Injector API**

Table of Contents
- [**Dynamic Script Injector API**](#dynamic-script-injector-api)
  - [**Introduction**](#introduction)
  - [**Features**](#features)
  - [**Getting Started**](#getting-started)
  - [**Usage**](#usage)
    - [**Endpoint**](#endpoint)
    - [**Query Parameters**](#query-parameters)
  - [**Example**](#example)
  - [**Error Handling**](#error-handling)
  - [**Dependencies**](#dependencies)
  - [**Contributing**](#contributing)
  - [**License**](#license)

## **Introduction**

This Node.js API allows you to inject custom code into JavaScript libraries fetched from remote sources. It's a useful tool for modifying the behavior of client-side code without having to modify the source directly. The API provides flexibility in renaming and redirecting resources as needed. It also includes a custom 404 error page for enhanced user experience.

## **Features**

- Fetches external JavaScript files using Axios.
- Injects custom code into any external JavaScript file.
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
    ```
4. Access the application by navigating to **'http://localhost:3000'** in your web browser.

## **Usage**

### **Endpoint**

The API endpoint is structured as follows:
> ```ruby
> GET http://localhost:3000/:obfuscationString?src=:sourceURL&inj=:injectionParameters
> ```
- `:obfuscationString` (optional): An optional parameter for obfuscation purposes. You can add a random string here `(without slashes "/")` to make the API endpoint less predictable. This parameter does not affect the API's functionality.

### **Query Parameters**
`src=:sourceURL:` The URL of the JavaScript library you want to fetch and modify.

`inj=:injectionParameters:` Comma-separated injection parameters that define how you want to modify the library. Each injection parameter should follow this format: `originalResource,newResource`. You can use multiple injection parameters to rename or redirect resources within the fetched library.

## **Example**
Let's say you want to inject custom code into the "jquery" library fetched from "**https://cdn.jsdelivr.net/npm/jquery**". You also want to rename some resources. Here's how you can structure the API call:
```ruby
GET http://localhost:3000
/your-obfuscation-string
?src=https://https://cdn.jsdelivr.net/npm/jquery
&inj=target string,replace with this text
,second target string,replace with this second text
```
In this example, `your-obfuscation-string` is a placeholder for your obfuscation string, and the `src` and `inj` parameters define the source URL and injection parameters, respectively.

## **Error Handling**
The application includes a custom 404 error page with a CSS-based animated text effect. This error page is displayed when:
- The specified external script URL is invalid.
- The external script cannot be fetched.
- Any other errors occur during the process.

## **Dependencies**
- <u>**Express.js**</u>: Fast, unopinionated, minimalist web framework for Node.js.
- <u>**Axios**</u>: Promise-based HTTP client for the browser and Node.js.

## **Contributing**
Contributions to this project are welcome! If you have any suggestions, improvements, or bug fixes, please submit an issue or a pull request.

## **License**
This project is licensed under the MIT License.