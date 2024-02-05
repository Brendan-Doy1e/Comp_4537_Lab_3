//Chatgpt, github Copilot used for coding, debugging, refactoring, and documentation.

// Include the required modules: http for server creation and URL for URL parsing.
const http = require('http');
const url = require('url');
// Include custom modules for utility functions and greeting messages.
const utils = require('./modules/utils');
const greetings = require('./lang/en/en');

// Define a function to handle incoming HTTP requests.
function handleRequest(req, res) {
    // Parse the URL from the request to extract its parts.
    const parsedUrl = url.parse(req.url, true);
    // Retrieve the pathname part of the URL (e.g., "/COMP4537/labs/3/getDate").
    const pathname = parsedUrl.pathname;
    // Retrieve the query part of the URL as an object (e.g., { name: "Brendan" }).
    const query = parsedUrl.query;

    // Check if the pathname and query parameters meet the expected criteria for a valid request.
    if (isValidPathAndQuery(pathname, query)) {
        // If valid, respond with a personalized greeting message.
        respondWithGreeting(query.name, res);
    } else {
        // If not valid, respond with a 404 Not Found error message.
        respondWithNotFound(res);
    }
}

// Define a function to check the validity of the request's path and query.
function isValidPathAndQuery(pathname, query) {
    // Return true if the pathname matches the expected path and the query contains a 'name' key.
    return pathname === '/COMP4537/labs/3/getDate' && 'name' in query;
}

// Define a function to send a personalized greeting as the response.
function respondWithGreeting(name, res) {
    // Get the current date and time from the utility module.
    const currentTime = utils.getDate();
    // Get the personalized greeting message from the greetings module.
    const greeting = greetings.greetMessage(name);
    // Combine the greeting and current time into a single HTML string.
    const fullMessage = '<h1 style="color: blue;">' + greeting + ' ' + currentTime + '</h1>';
    // Set the HTTP response header with a 200 OK status and content type as HTML.
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // Send the combined message and end the response.
    res.end(fullMessage);
}

// Define a function to respond with a 404 Not Found error.
function respondWithNotFound(res) {
    // Define an error message to be sent back to the client.
    const errorMessage = 'The requested resource was not found. Please check the URL and try again.';
    // Set the HTTP response header with a 404 Not Found status and content type as plain text.
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    // Send the error message and end the response.
    res.end(errorMessage);
}

// Create an HTTP server with the request handler function.
var server = http.createServer(handleRequest);
// Start the server and listen on the port provided by the environment or default to port 8000.
server.listen(process.env.PORT || 8000);
