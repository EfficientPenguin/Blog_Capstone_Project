/**
 * The goal of this project is to create a Blog web application using Node.js, Express.js, and EJS. 
 * The application will allow users to create and view blog posts. 
 * Posts will not persist between sessions as no database. 
 * Styling will be an important aspect of this project to ensure a good user experience.
 */

import express from "express";

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});